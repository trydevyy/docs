---
title: Install Devyy
description: Choose a Windows, macOS, or Linux build and open your first project.
section: Get started
order: 10
---

Devyy is a desktop code editor. Local editing, search, and the terminal work without signing in. You can connect an account or AI provider later if you need it.

## Download and install

Go to [Devyy downloads](https://www.devyy.dev/download/) and select your operating system. Download the package that matches your machine when the release offers multiple architectures.

| Platform | Package | What to do |
| --- | --- | --- |
| Windows | EXE installer | Run the setup program and open Devyy from Start when installation finishes. The editor uses the Microsoft Edge WebView2 runtime. |
| macOS | DMG | Open the disk image, drag Devyy to Applications, and launch it from there. |
| Linux | DEB or AppImage | Install the DEB through a compatible package manager, or mark the AppImage executable and run it. |

On Linux, if you're using an AppImage, replace the sample filename with the exact file you downloaded.

```sh
chmod +x ./Devyy.AppImage
./Devyy.AppImage
```

## Open a project

1. Launch Devyy. You can complete the setup flow or adjust those preferences later in Settings.
2. Press **⌘ O** on macOS or **Ctrl O** on Windows and Linux, then select your project folder.
3. Choose a file from the project explorer, or press **⌘ P** or **Ctrl P** and type part of its name.
4. Make a change and press **⌘ S** or **Ctrl S** to save it.

Use the workspace name in the title bar to switch recent folders. See [Editing and navigation](editing-and-navigation.md) for search, splits, themes, and keyboard shortcuts.

## If you cannot open the app

- Match the release package to your operating system and CPU. An ARM64 Mac and an Intel Mac need compatible builds.
- On Windows, check that WebView2 is installed if the editor window fails to render.
- On Linux, if the AppImage cannot start on your distro, try the DEB on a compatible system or check your distro’s AppImage runtime requirements.
