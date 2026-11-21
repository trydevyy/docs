# Contributing to Devyy docs

## Make a change

1. Fork the [docs repository](https://github.com/trydevyy/docs) and create a branch.
2. Edit an existing guide in `content/` or add a new one using the format below.
3. Verify instructions against Devyy. Record any platform or version you could not test.
4. Run the checks locally, then open a pull request. Link the issue if there is one.

## Guide format

Use a flat lowercase kebab-case filename in `content/`. The filename becomes a public URL, so keep it stable after publishing. Start each file with YAML frontmatter.

```yaml
---
title: A clear guide title
description: One sentence that explains when to read the guide.
section: Get started
order: 15
---
```

Use an existing section when it fits. The integer `order` sets navigation order, and the first guide in each section determines where that section appears. The website uses `title` for the page heading. Begin the body with prose or `##` headings.

- Write for someone with Devyy open. State prerequisites, name UI controls exactly, and say whether steps run locally or remotely.
- Use GitHub Flavored Markdown and fenced code blocks with language labels such as `sh`, `powershell`, or `text`.
- Link to other guides by filename, such as `[Install Devyy](installation.md)`. Add a fragment to link to a specific heading, such as `installation.md#open-a-project`.
- Use absolute HTTPS image URLs and descriptive alt text. Share screenshots and examples you have permission to publish, with credentials and private data removed.

## Validate and preview

Use Node.js 22 or later.

```sh
npm ci --ignore-scripts
npm run check
```

The **Docs checks** workflow runs when a pull request opens, receives new commits, is reopened, or becomes ready for review. It parses the resulting set of guides, including unchanged pages, so broken links caused by edits and deletions can be caught. It validates frontmatter, Markdown structure, rendered heading anchors, and internal links. It checks the format of external URLs without requesting them.

To preview the full site, place this checkout beside the [website repository](https://github.com/trydevyy/website) in a directory named `docs`. From the website directory, run `bun install --frozen-lockfile` and `bun run dev`, then open `/docs/`. The website’s development build reads the sibling checkout.

## License

This repository uses the [MIT License](LICENSE) for its documentation and supporting code. By submitting a contribution, you agree to license it under the same terms. Contribute material you wrote or have permission to distribute under those terms, and preserve any required notices.
