import { readdir, readFile } from "node:fs/promises";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { visit } from "unist-util-visit";
import { parse } from "yaml";

const content = new URL("../content/", import.meta.url);
const parser = unified().use(remarkParse).use(remarkGfm).use(remarkRehype).use(rehypeSlug);
const guides = new Map();
const errors = [];

for (const entry of await readdir(content, { withFileTypes: true })) {
  const file = `content/${entry.name}`;
  const report = (line, message) => errors.push(`${file}:${line}: ${message}`);
  if (!entry.isFile() || !/^[a-z0-9]+(?:-[a-z0-9]+)*\.md$/.test(entry.name)) {
    report(1, "Use a flat lowercase kebab-case .md filename for each guide.");
    continue;
  }

  const text = (await readFile(new URL(entry.name, content), "utf8"))
    .replace(/^\uFEFF/, "").replace(/\r\n/g, "\n");
  const frontmatter = /^---\n([\s\S]*?)\n---(?:\n|$)/.exec(text);
  if (!frontmatter) {
    report(1, "Start the file with YAML frontmatter between --- delimiters.");
    continue;
  }
  try {
    const data = parse(frontmatter[1]);
    for (const field of ["title", "description", "section"]) {
      if (typeof data?.[field] !== "string" || !data[field].trim()) {
        report(2, `${field} must be a nonempty string.`);
      }
    }
    if (!Number.isSafeInteger(data?.order)) report(2, "order must be an integer.");
  } catch (error) {
    report(2, `Invalid YAML: ${error.message}`);
  }

  const body = text.slice(frontmatter[0].length);
  const offset = frontmatter[0].split("\n").length - 1;
  if (!body.trim()) report(offset + 1, "Add guide content after the frontmatter.");
  const lines = body.split("\n");
  const tree = parser.parse(body);
  const links = [];
  const anchors = new Set();
  const definitions = new Map();
  const references = new Set();
  visit(tree, "definition", (node) => {
    if (!definitions.has(node.identifier)) definitions.set(node.identifier, node);
  });
  visit(tree, (node) => {
    const line = offset + node.position.start.line;
    switch (node.type) {
      case "heading":
        if (node.depth === 1) report(line, "Use the frontmatter title and start body headings at ##.");
        break;
      case "html":
        report(line, "Use Markdown instead of inline HTML, which the site skips.");
        break;
      case "code": {
        const { line: startLine, column } = node.position.start;
        const opener = /^(`{3,}|~{3,})/.exec(lines[startLine - 1].slice(column - 1));
        if (!opener) {
          report(line, "Use a fenced code block with a language label.");
          break;
        }
        if (!node.lang) report(line, "Add a language label to the code fence, such as text or bash.");
        const closer = new RegExp(`^[\\s>]*${opener[0][0]}{${opener[0].length},}[ \\t]*$`);
        if (node.position.end.line === node.position.start.line || !closer.test(lines[node.position.end.line - 1])) {
          report(line, "Close the code fence.");
        }
        break;
      }
      case "link":
      case "image":
        links.push({ url: node.url, line, image: node.type === "image" });
        break;
      case "linkReference":
      case "imageReference": {
        references.add(node.identifier);
        const definition = definitions.get(node.identifier);
        if (definition) links.push({ url: definition.url, line, image: node.type === "imageReference" });
        break;
      }
    }
  });
  for (const [identifier, node] of definitions) {
    if (!references.has(identifier)) links.push({ url: node.url, line: offset + node.position.start.line });
  }
  try {
    const html = await parser.run(tree);
    visit(html, "element", (node) => {
      if (typeof node.properties.id === "string") anchors.add(node.properties.id);
    });
  } catch (error) {
    report(offset + 1, `Markdown rendering failed: ${error.message}`);
  }
  guides.set(entry.name, { anchors, links, report });
}

if (!guides.size) errors.push("content/: Add at least one published guide.");

for (const [file, { links, report }] of guides) {
  for (const { url, line, image } of links) {
    if (image) {
      if (!URL.canParse(url) || new URL(url).protocol !== "https:") report(line, "Use an absolute HTTPS image URL.");
      continue;
    }
    if (/^(?:https?:\/\/|mailto:)/i.test(url) && URL.canParse(url)) continue;
    const match = /^(?:(?:\.\/)?([a-z0-9-]+\.md)(?:\?[^#]*)?)?(?:#(.*))?$/.exec(url);
    if (!match || !url) {
      report(line, `Use a guide filename, heading fragment, or absolute URL: ${url}`);
      continue;
    }
    const target = guides.get(match[1] ?? file);
    if (!target) {
      report(line, `Guide link does not exist: ${url}`);
      continue;
    }
    if (match[2]) {
      try {
        if (!target.anchors.has(decodeURIComponent(match[2]))) report(line, `Heading link does not exist: ${url}`);
      } catch {
        report(line, `Invalid URL encoding in heading link: ${url}`);
      }
    }
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Validated ${guides.size} Devyy guides.`);
}
