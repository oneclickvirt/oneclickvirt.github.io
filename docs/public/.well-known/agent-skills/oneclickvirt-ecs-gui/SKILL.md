---
name: oneclickvirt-ecs-gui
description: "Build, install and troubleshoot the Fyne ECS desktop/mobile application."
metadata:
  repository: oneclickvirt/ecs-gui
  integration-version: "1.0.0"
---

# ecs-gui

## Scope

Build, install and troubleshoot the Fyne ECS desktop/mobile application.

- Use the exact platform release assets; Android APK, macOS app, Windows EXE and Linux archive are different products. Keep VERSION and FyneApp.toml aligned when modifying builds. For headless MCP, use the ecs integration.

## Install and update

```bash
curl -fL --retry 3 https://raw.githubusercontent.com/oneclickvirt/ecs-gui/main/scripts/install_agent.py -o install_agent.py
python3 install_agent.py --client codex
```

The installer is also mirrored at `https://cnb.cool/oneclickvirt/ecs-gui/-/git/raw/main/scripts/install_agent.py`; add `--source cnb` to install from an immutable CNB snapshot (requires Git).

Use `--client claude` or `--client openclaw` for another client. Download and run again to update; `--ref` pins a source tag/commit. The installer verifies all SHA-256 checksums before replacing its files, preserves extra local files/client settings, and records the source commit in `install.json`.

This repository distributes a Skill without an MCP server; use its existing scripts or development APIs.

## Source and documentation

- [`build.sh`](https://github.com/oneclickvirt/ecs-gui/blob/main/build.sh)
- [`go.mod`](https://github.com/oneclickvirt/ecs-gui/blob/main/go.mod)

- [集成安装说明 / Integration guide](https://www.spiritlhl.net/guide/agent_integrations.html)

Check the relevant source and current documentation before giving commands. Preserve requested version pins, data paths and native host identifiers. Distinguish actual program execution, isolated tests and unverified environments.
