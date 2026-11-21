# Devyy documentation

The Devyy website publishes the Markdown files in `content/`. Add a guide there and rebuild the website to update the sidebar, search, sitemap, and Markdown exports.

Use a lowercase, hyphenated filename. It becomes the URL slug, so keep it stable after publishing. Each guide starts with YAML frontmatter:

```yaml
---
title: A clear guide title
description: One sentence that explains when to read the guide.
section: Get started
order: 15
---
```

`order` sorts guides across the site. The first guide in each section determines where the section appears. Start body headings at `##`, link to other guides by filename (for example, `[Install Devyy](installation.md)`), and use absolute HTTPS URLs for images. Use standard Markdown or GitHub Flavored Markdown, with language labels on fenced code blocks and descriptive text for links and images. Write for someone who has the desktop app open. Name the controls, state prerequisites, and distinguish what runs locally from what uses an external service.

The sibling website's development command reads this checkout. The production build fetches the GitHub repository and ref configured in the website’s build environment.
