---
name: oneclickvirt-pterodactyl
description: "Deploy Pterodactyl panel/Wings and manage the repository's node import and egg workflows."
metadata:
  repository: oneclickvirt/pterodactyl
  integration-version: "1.0.0"
---

# pterodactyl

## Scope

Deploy Pterodactyl panel/Wings and manage the repository's node import and egg workflows.

- Distinguish panel installation, Wings installation and existing-node import. Read scripts/install_pterodactyl.sh, scripts/install_wings.sh or scripts/import_node.sh for the requested operation. Preserve existing database, node credentials and game data.

## Install and update

```bash
curl -fL --retry 3 https://raw.githubusercontent.com/oneclickvirt/pterodactyl/main/scripts/install_agent.py -o install_agent.py
python3 install_agent.py --client codex
```

The installer is also mirrored at `https://cnb.cool/oneclickvirt/pterodactyl/-/git/raw/main/scripts/install_agent.py`; add `--source cnb` to install from an immutable CNB snapshot (requires Git).

Use `--client claude` or `--client openclaw` for another client. Download and run again to update; `--ref` pins a source tag/commit. The installer verifies all SHA-256 checksums before replacing its files, preserves extra local files/client settings, and records the source commit in `install.json`.

This repository distributes a Skill without an MCP server; use its existing scripts or development APIs.

## Source and documentation

- [`back/rsync_eggs.sh`](https://github.com/oneclickvirt/pterodactyl/blob/main/back/rsync_eggs.sh)
- [`eggs/debian/entrypoint.sh`](https://github.com/oneclickvirt/pterodactyl/blob/main/eggs/debian/entrypoint.sh)
- [`eggs/debian/ssh.sh`](https://github.com/oneclickvirt/pterodactyl/blob/main/eggs/debian/ssh.sh)
- [`eggs/debian/start.sh`](https://github.com/oneclickvirt/pterodactyl/blob/main/eggs/debian/start.sh)
- [`eggs/ssh.sh`](https://github.com/oneclickvirt/pterodactyl/blob/main/eggs/ssh.sh)
- [`eggs/ubuntu/entrypoint.sh`](https://github.com/oneclickvirt/pterodactyl/blob/main/eggs/ubuntu/entrypoint.sh)
- [`eggs/ubuntu/ssh.sh`](https://github.com/oneclickvirt/pterodactyl/blob/main/eggs/ubuntu/ssh.sh)
- [`eggs/ubuntu/start.sh`](https://github.com/oneclickvirt/pterodactyl/blob/main/eggs/ubuntu/start.sh)
- [`scripts/import_node.sh`](https://github.com/oneclickvirt/pterodactyl/blob/main/scripts/import_node.sh)
- [`scripts/install_pterodactyl.sh`](https://github.com/oneclickvirt/pterodactyl/blob/main/scripts/install_pterodactyl.sh)
- [`scripts/install_wings.sh`](https://github.com/oneclickvirt/pterodactyl/blob/main/scripts/install_wings.sh)

- [集成安装说明 / Integration guide](https://www.spiritlhl.net/guide/agent_integrations.html)

Check the relevant source and current documentation before giving commands. Preserve requested version pins, data paths and native host identifiers. Distinguish actual program execution, isolated tests and unverified environments.
