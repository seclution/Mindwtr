<div align="center">

<img src="apps/mobile/assets/images/icon.png" width="120" alt="Mindwtr Logo">

# Mindwtr

English | [中文](./README_zh.md)

A complete Getting Things Done (GTD) productivity system for desktop and mobile. *Mind Like Water.*

*New to GTD? Read [GTD in 15 minutes](https://hamberg.no/gtd) for a quick introduction.*

[![CI](https://github.com/dongdongbh/Mindwtr/actions/workflows/ci.yml/badge.svg)](https://github.com/dongdongbh/Mindwtr/actions/workflows/ci.yml)
[![GitHub stars](https://img.shields.io/github/stars/dongdongbh/Mindwtr?style=social)](https://github.com/dongdongbh/Mindwtr/stargazers)
[![GitHub license](https://img.shields.io/github/license/dongdongbh/Mindwtr)](LICENSE)
[![GitHub last commit](https://img.shields.io/github/last-commit/dongdongbh/Mindwtr)](https://github.com/dongdongbh/Mindwtr/commits/main)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/dongdongbh/Mindwtr/pulls)
[![Sponsor](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86)](https://github.com/sponsors/dongdongbh)
[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/D1D01T20WK)


</div>

<div align="center">
  <video src="https://github.com/user-attachments/assets/8b067635-196e-4c9c-ad26-92ca92fef327" width="60%" autoplay loop muted playsinline></video>
  
  <video src="https://github.com/user-attachments/assets/08e4f821-0b1c-44f9-af58-0b727bc2bd91" width="25%" autoplay loop muted playsinline></video>

  <p>
    <i>Local-First GTD on Arch Linux & Android</i>
  </p>
</div>

## Philosophy

Mindwtr is built to be **simple by default and powerful when you need it**. We focus on reducing cognitive load, cutting the fat, and keeping you in flow. That means:

- **Progressive disclosure**: advanced options stay hidden until they matter.
- **Less by default**: fewer fields, fewer knobs, fewer distractions.
- **Avoid feature creep**: we prioritize clarity over clutter.

*Don't show me a cockpit when I just want to ride a bike.*

## Features

### GTD Workflow
- **Capture** - Quick add tasks from anywhere (global hotkey, tray, share sheet, voice)
- **Clarify** - Guided inbox processing with 2-minute rule
- **Organize** - Projects, contexts, and status lists
- **Reflect** - Weekly review wizard with reminders
- **Engage** - Context-filtered next actions
- **AI Assist (Optional)** - Clarify, break down, and review with BYOK AI (OpenAI, Gemini, Claude)

### Views
- 📥 **Inbox** - Capture zone with processing wizard
- 🎯 **Focus** - Agenda (time-based) + Next Actions in one view
- 📁 **Projects** - Multi-step outcomes with areas
- 🏷️ **Contexts** - Hierarchical contexts (@work/meetings)
- ⏳ **Waiting For** - Delegated items
- 💭 **Someday/Maybe** - Deferred ideas
- 📅 **Calendar** - Time-based planning
- 📋 **Board** - Kanban-style drag-and-drop
- 📝 **Review** - Daily + weekly review workflows
- 📦 **Archived** - Hidden history, searchable when needed

### Productivity Features
- 🔍 **Global Search** - Search operators (status:, context:, due:<=7d)
- 📦 **Bulk Actions** - Multi-select, batch move/tag/delete
- 🔗 **Task Dependencies** - Block tasks until prerequisites complete
- 📎 **Attachments** - Files and links on tasks
- ✏️ **Markdown Notes** - Rich text descriptions with preview
- 🗂️ **Project States** - Active, Waiting, Someday, Archived
- ♾️ **Fluid Recurrence** - Strict dates or “X days after completion”
- ♻️ **Reusable Lists** - Duplicate tasks or reset checklists
- ✅ **Checklist Mode** - Fast list-style checking for checklist tasks
- ✅ **Audio Capture** - Quick voice capture with automatic transcription and task creation
- 🧭 **Copilot Suggestions** - Optional context/tag/time hints while typing
- 🧘 **Focus / Zen Modes** - Reduce clutter and highlight top priorities
- 🔔 **Notifications** - Due date reminders with snooze
- 📊 **Daily Digest** - Morning briefing + evening review
- 📅 **Weekly Review** - Customizable weekly reminder

### Data & Sync
- 📁 **File Sync** - Dropbox, Google Drive, Syncthing, etc.
- 🌐 **WebDAV Sync** - Nextcloud, ownCloud, self-hosted
- 🔀 **Smart Merge** - Last-write-wins prevents data loss
- 📤 **Export/Backup** - Export data to JSON
- 🗓️ **External Calendars (ICS)** - View-only calendar overlay

### Automation
- 🔌 **CLI** - Add, list, complete, search from terminal
- 🌐 **REST API** - Local API server for scripting
- 🌍 **Web App (PWA)** - Browser access with offline support
- 🧠 **MCP Server** - Local Model Context Protocol server for LLM automation

### Cross-Platform
- 🖥️ **Desktop** - Tauri v2 (macOS, Linux, Windows)
- 📱 **Mobile** - React Native/Expo (~iOS~, Android)
- 📲 **Android Widget** - Home screen focus/next widget
- ⌨️ **Keyboard Shortcuts** - Vim and Emacs presets
- 🎨 **Themes** - Light/Dark
- 🌍 **i18n** - English, Chinese, Spanish, Hindi, Arabic, German, Russian, Japanese, French, Portuguese, Korean, Italian, Turkish
- 🐳 **Docker** - Run the PWA + self-hosted sync server with Docker

### Platform Notes
- **Desktop**: Global shortcuts, keyboard navigation, no swipe actions, no zen mode.
- **Mobile**: Swipe actions, zen mode, Android widget support; no global shortcuts.

## Installation

<p align="center">
  <a href="https://play.google.com/store/apps/details?id=tech.dongdongbh.mindwtr">
    <img src="https://img.shields.io/badge/Google_Play-Install-414141?logo=googleplay&logoColor=white" alt="Get it on Google Play">
  </a>

  <a href="https://winstall.app/apps/dongdongbh.Mindwtr">
    <img src="https://img.shields.io/winget/v/dongdongbh.Mindwtr?label=Winget&logo=windows&logoColor=white&color=00D2FF" alt="Winget Version">
  </a>

  <a href="https://apps.microsoft.com/detail/9n0v5b0b6frx?ocid=webpdpshare">
    <img src="https://img.shields.io/badge/Microsoft_Store-Install-0078D6?logo=microsoft&logoColor=white" alt="Microsoft Store">
  </a>

  <a href="https://github.com/dongdongbh/homebrew-mindwtr">
    <img src="https://img.shields.io/scoop/v/mindwtr?bucket=https://github.com/dongdongbh/homebrew-mindwtr&label=Scoop&logo=scoop&logoColor=white&color=E6E6E6" alt="Scoop Version">
  </a>

  <a href="https://github.com/dongdongbh/homebrew-mindwtr">
    <img src="https://img.shields.io/badge/Homebrew-Install-orange?logo=homebrew&logoColor=white" alt="Homebrew">
  </a>

  <a href="https://aur.archlinux.org/packages/mindwtr-bin">
    <img src="https://img.shields.io/aur/version/mindwtr-bin?logo=arch-linux&logoColor=white&color=1793d1&label=AUR" alt="AUR Version">
  </a>

  <a href="https://snapcraft.io/mindwtr">
    <img src="https://img.shields.io/badge/Snapcraft-Install-82BEA0?logo=snapcraft&logoColor=white" alt="Snapcraft">
  </a>
</p>

### Desktop (Linux)

**Arch Linux (AUR):**
```bash
# Using yay
yay -S mindwtr-bin

# Using paru
paru -S mindwtr-bin
```
📦 [AUR Package](https://aur.archlinux.org/packages/mindwtr-bin)

**Debian/Ubuntu:**
```bash
curl -fsSL https://dongdongbh.github.io/Mindwtr/mindwtr.gpg.key | sudo gpg --dearmor -o /usr/share/keyrings/mindwtr-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/mindwtr-archive-keyring.gpg] https://dongdongbh.github.io/Mindwtr/deb ./" | sudo tee /etc/apt/sources.list.d/mindwtr.list
sudo apt update
sudo apt install mindwtr
```
Manual install: download the `.deb` from [GitHub Releases](https://github.com/dongdongbh/Mindwtr/releases) and run `sudo dpkg -i mindwtr_*.deb`.

**AppImage (Universal):**
Download the `.AppImage` from [GitHub Releases](https://github.com/dongdongbh/Mindwtr/releases):
```bash
chmod +x mindwtr_*.AppImage
./mindwtr_*.AppImage
```

**Fedora/RHEL/openSUSE:**
```bash
cat <<'EOF' | sudo tee /etc/yum.repos.d/mindwtr.repo
[mindwtr]
name=Mindwtr Repository
baseurl=https://dongdongbh.github.io/Mindwtr/rpm
enabled=1
gpgcheck=0
EOF

sudo dnf install mindwtr
```
Manual install: download the `.rpm` from [GitHub Releases](https://github.com/dongdongbh/Mindwtr/releases) and run `sudo rpm -i mindwtr-*.rpm`.

### Desktop (Windows)
**Winget (recommended):**
```powershell
winget install dongdongbh.Mindwtr
```

**Alternative: Scoop**
```powershell
scoop bucket add mindwtr https://github.com/dongdongbh/homebrew-mindwtr
scoop install mindwtr
```

**Installer:**
Download the installer (`.msi` or `.exe`) from [GitHub Releases](https://github.com/dongdongbh/Mindwtr/releases) and run it.

### Desktop (macOS)
**Homebrew (recommended):**
```bash
brew tap dongdongbh/mindwtr
brew install --cask mindwtr
```

**DMG:**
Download the disk image (`.dmg`) from [GitHub Releases](https://github.com/dongdongbh/Mindwtr/releases), open it, and drag the application to your Applications folder.

> **Note:** If macOS says the app is "damaged" or from an "unidentified developer", run:
> ```bash
> xattr -cr /Applications/Mindwtr.app
> ```
> Then open the app normally. This is required because the app is not notarized with Apple.

### Mobile

**Android:**
<a href="https://play.google.com/store/apps/details?id=tech.dongdongbh.mindwtr">
  <img src="https://img.shields.io/badge/Google_Play-Install-414141?logo=googleplay&logoColor=white" alt="Get it on Google Play">
</a>

Mindwtr is available on Google Play:
https://play.google.com/store/apps/details?id=tech.dongdongbh.mindwtr

Download the APK from [GitHub Releases](https://github.com/dongdongbh/Mindwtr/releases).

**iOS:**
iOS builds require an Apple Developer account ($99/year). Currently available as simulator builds only. If you want iOS builds, please consider [sponsoring the developer](https://github.com/sponsors/dongdongbh) so we can fund the Apple Developer account.

### Docker (PWA + Cloud Sync)

Run the web app (PWA) and the self-hosted sync server with Docker:

- Guide: [`docker/README.md`](docker/README.md)

## Data Storage

Tasks and projects are stored locally on your device:
- **Desktop data (Linux)**: `~/.local/share/mindwtr/mindwtr.db` (SQLite) + `data.json` (sync/backup)
- **Desktop config (Linux)**: `~/.config/mindwtr/config.toml`
- **Mobile**: `mindwtr.db` (SQLite) + `data.json` (sync/backup)

Sync via File (Dropbox, etc.) or WebDAV (Nextcloud, etc.) can be configured in Settings.

## Documentation

- 📚 [Wiki](https://github.com/dongdongbh/Mindwtr/wiki) - Complete user guide
- 🚀 [Getting Started](https://github.com/dongdongbh/Mindwtr/wiki/Getting-Started)
- 💡 [GTD Best Practices](https://github.com/dongdongbh/Mindwtr/wiki/GTD-Best-Practices)
- 🔄 [Data & Sync](https://github.com/dongdongbh/Mindwtr/wiki/Data-and-Sync)
- 🤖 [AI Assistant](https://github.com/dongdongbh/Mindwtr/wiki/AI-Assistant)
- 🗓️ [Calendar Integration](https://github.com/dongdongbh/Mindwtr/wiki/Calendar-Integration)
- ☁️ [Cloud Sync (Self‑Hosted)](https://github.com/dongdongbh/Mindwtr/wiki/Cloud-Sync)
- 🔌 [Local API Server](https://github.com/dongdongbh/Mindwtr/wiki/Local-API)
- 🌐 [Web / PWA](https://github.com/dongdongbh/Mindwtr/wiki/Web-App-PWA)

## Roadmap

- ✅ Build an MCP server for Mindwtr (LLM integration and automation).
- ⏳ Add email capture (forward emails to create tasks).

## Development

For developers, see the [Contributing Guide](docs/CONTRIBUTING.md).
