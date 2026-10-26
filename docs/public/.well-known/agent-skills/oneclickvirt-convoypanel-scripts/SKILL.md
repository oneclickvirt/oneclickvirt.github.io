---
name: oneclickvirt-convoypanel-scripts
description: "Deploy and maintain Convoy using this repository's reviewed shell scripts."
metadata:
  repository: oneclickvirt/convoypanel-scripts
  integration-version: "1.0.0"
---

# convoypanel-scripts

## Scope

Deploy and maintain Convoy using this repository's reviewed shell scripts.

- Read installconvoy.sh before installation and build_swap.sh before changing swap. Uninstallation changes services and data; inspect uninstallconvoy.sh and preserve required backups.

## Install and update

```bash
curl -fL --retry 3 https://raw.githubusercontent.com/oneclickvirt/convoypanel-scripts/main/scripts/install_agent.py -o install_agent.py
python3 install_agent.py --client codex
```

The installer is also mirrored at `https://cnb.cool/oneclickvirt/convoypanel-scripts/-/git/raw/main/scripts/install_agent.py`; add `--source cnb` to install from an immutable CNB snapshot (requires Git).

Use `--client claude` or `--client openclaw` for another client. Download and run again to update; `--ref` pins a source tag/commit. The installer verifies all SHA-256 checksums before replacing its files, preserves extra local files/client settings, and records the source commit in `install.json`.

This repository distributes a Skill without an MCP server; use its existing scripts or development APIs.

## Source and documentation

- [`build_swap.sh`](https://github.com/oneclickvirt/convoypanel-scripts/blob/main/build_swap.sh)
- [`installconvoy.sh`](https://github.com/oneclickvirt/convoypanel-scripts/blob/main/installconvoy.sh)
- [`uninstallconvoy.sh`](https://github.com/oneclickvirt/convoypanel-scripts/blob/main/uninstallconvoy.sh)

- [集成安装说明 / Integration guide](https://www.spiritlhl.net/guide/agent_integrations.html)

Check the relevant source and current documentation before giving commands. Preserve requested version pins, data paths and native host identifiers. Distinguish actual program execution, isolated tests and unverified environments.
