---
title: Use the coding agent
description: Connect a supported provider, choose what the agent can read, and review proposed edits.
section: Coding agent
order: 50
---

Devyy has a built-in agent in the right sidebar. Configure a provider in **Settings → AI providers** before starting a conversation. The setup depends on the provider. For example, ChatGPT uses an account authorization flow, while an API provider can require credentials and a model selection.

## Ask about a file

1. Open a project, then open the agent sidebar.
2. Select your configured model and start a new conversation.
3. Attach a file or selection for context. Inspect the attachments before sending, especially if the file contains credentials or private data.
4. Ask a specific question, such as “Where does this function handle an empty input, and what behavior should a test cover?”

An attached file is shared with the configured provider. If you switch providers, review what context the conversation will send.

## Choose workspace access

| Access | What it allows |
| --- | --- |
| Attachments only | Use the context you explicitly include in the conversation. |
| Read workspace | List, search, and read eligible saved files in the current project. |
| Full workspace | Request broader file access and propose changes, subject to the provider integration and the workspace grant. |

These grants are scoped to the current workspace session. Start with attachments for questions about one file and use read access when the answer depends on several files. Use the access control in the agent toolbar to change or revoke a grant.

## Review and save a proposed edit

Use **Review diff** to inspect the proposal. **Apply to editor** puts it in an unsaved buffer. Check the result, then save it using the normal editor command. If the file changed since the proposal was created, request a fresh proposal before applying.

AI code suggestions are a separate editor preference. You can use agent chat with AI completions disabled.
