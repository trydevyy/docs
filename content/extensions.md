---
title: Extensions and settings import
description: Install Open VSX or VSIX packages, check compatibility, and review imported preferences.
section: Workbench
order: 40
---

Open **Settings → Extensions** to search Open VSX and manage installed packages. You can also install a local `.vsix` from a source you trust.

## Install and verify an extension

1. Search by publisher and extension name in **Extensions**.
2. Open the matching entry and confirm the publisher before installing.
3. Check the **Installed** list for status or activation errors.
4. Open a file in the extension’s target language and try the feature you installed it for.

Devyy can use contributions such as TextMate grammars, snippets, themes, and file associations. Some extensions also run JavaScript using the Devyy extension host, which requires **Node.js 20 or later** on the desktop app’s PATH. Check `node --version`, restart Devyy after making PATH changes, and recheck the extension’s status.

Devyy implements a subset of the VS Code extension API. An extension can appear in the registry and still rely on unsupported workbench APIs. Check the activation error before troubleshooting the feature itself. Extension code runs with your user account’s permissions.

## Configure a language server

Open **Settings → Language servers** to see detected servers and add a manual configuration. A language server can supply features such as go to definition, formatting, and diagnostics independently of a theme or syntax grammar. If a command cannot be found, make sure the language server is installed and visible on the app’s PATH. Manual settings take priority over detected configurations.

## Import preferences

In **Settings → Setup & import**, choose a detected editor and review the proposed changes. Devyy can import compatible editor, appearance, saving, terminal, and global shortcut settings. It leaves the original settings files untouched. Suggested extensions still need to be installed separately.
