---
title: Remote workspaces over SSH
description: Connect to a remote project, verify the host fingerprint, and forward a development port.
section: Remote development
order: 60
---

Use **Remote Explorer** when the project files and tools live on another machine. You need a reachable SSH server, an account on that server, and access to the remote project directory.

## Add a server

1. Open **Remote Explorer** and choose **Add server**.
2. Enter the host, SSH port, username, and project directory on the remote host. Port `22` is conventional unless your SSH server uses a different port.
3. Choose password or private-key authentication and provide the corresponding credential.
4. Connect. Compare the host fingerprint with a trusted value from the server administrator before accepting it. Investigate unexpected changes before proceeding.

Once connected, open a file and verify the remote path in the project tree. Files, terminal sessions, and Git operations in the workspace use the remote host. Install project tooling on that host if the remote terminal cannot find it.

## Forward a remote service

Start the service in the remote terminal. For example, if it listens on port `3000` on the server, add a forward with **Remote port** set to `3000`. Choose a free **Local port**, such as `3001`, then visit `http://127.0.0.1:3001` on your computer.

If the SSH connection works but the page does not open, check that the service is running on the configured remote port and that the local port is free. Stop the forward when you no longer need it.

## Share a local service with a Devyy address

Use the editor’s **Ports** panel to publish a local HTTP or HTTPS service at an address such as `https://<id>.devyy.xyz`. The editor manages the forward through `api.devyy.dev`. For a **Private** forward, open the address in a browser already signed in to the owning Devyy account at [www.devyy.dev](https://www.devyy.dev). Public forwards can be opened without an account.
