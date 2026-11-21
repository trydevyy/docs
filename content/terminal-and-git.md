---
title: Terminal and Git
description: Open a project shell, inspect diffs, stage changes, and review commit history.
section: Workbench
order: 30
---

Open the project folder in Devyy first. For Git features, have Git installed and open a folder in an existing repository.

## Open a terminal

Press **⌘ + backtick** on macOS or **Ctrl + backtick** on Windows and Linux to focus the terminal. Use its toolbar to create another session, split the current session, or choose an installed shell. Hiding the panel keeps its processes running. Close a session when you want to stop its shell.

Check the terminal prompt before running a project command. A shell in an [SSH workspace](remote-workspaces.md) runs on the remote host.

## Review and commit changes

1. Open **Source Control** and select the repository you want to work on if the workspace has more than one.
2. Open a file under **Changes** to inspect its diff. The working tree comparison uses the saved file on disk, so save the editor tab if you want to review its current text.
3. Stage the files you intend to commit, then check the staged list.
4. Enter a commit message and commit. Devyy uses the Git identity and hooks configured for the repository.

Use **History → Open commit graph** to see commits and their changed files. Opening a historical diff is a read-only operation. Use the terminal for workflows that the panel does not expose, such as resolving a merge conflict.
