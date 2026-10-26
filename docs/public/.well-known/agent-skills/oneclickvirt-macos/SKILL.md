---
name: oneclickvirt-macos
description: "Create the offline macOS ISO artifacts maintained by this repository."
metadata:
  repository: oneclickvirt/macos
  integration-version: "1.0.0"
---

# macos

## Scope

Create the offline macOS ISO artifacts maintained by this repository.

- Read the current image-production scripts and platform requirements. Verify the exact macOS version and output checksums; ISO creation is not proof that the guest boots on every host.

## Install and update

```bash
curl -fL --retry 3 https://raw.githubusercontent.com/oneclickvirt/macos/main/scripts/install_agent.py -o install_agent.py
python3 install_agent.py --client codex
```

The installer is also mirrored at `https://cnb.cool/oneclickvirt/macos/-/git/raw/main/scripts/install_agent.py`; add `--source cnb` to install from an immutable CNB snapshot (requires Git).

Use `--client claude` or `--client openclaw` for another client. Download and run again to update; `--ref` pins a source tag/commit. The installer verifies all SHA-256 checksums before replacing its files, preserves extra local files/client settings, and records the source commit in `install.json`.

This repository distributes a Skill without an MCP server; use its existing scripts or development APIs.

## Source and documentation

- [`back/compress_and_cleanup.sh`](https://github.com/oneclickvirt/macos/blob/main/back/compress_and_cleanup.sh)

- [集成安装说明 / Integration guide](https://www.spiritlhl.net/guide/agent_integrations.html)

Check the relevant source and current documentation before giving commands. Preserve requested version pins, data paths and native host identifiers. Distinguish actual program execution, isolated tests and unverified environments.
