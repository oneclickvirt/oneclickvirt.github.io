---
name: oneclickvirt-cockpit
description: "Install or remove the Cockpit setup maintained in this repository."
metadata:
  repository: oneclickvirt/cockpit
  integration-version: "1.0.0"
---

# cockpit

## Scope

Install or remove the Cockpit setup maintained in this repository.

- Review scripts/install.sh or scripts/uninstall.sh first. Respect the target distribution and preserve existing Cockpit configuration.

## Install and update

```bash
curl -fL --retry 3 https://raw.githubusercontent.com/oneclickvirt/cockpit/main/scripts/install_agent.py -o install_agent.py
python3 install_agent.py --client codex
```

The installer is also mirrored at `https://cnb.cool/oneclickvirt/cockpit/-/git/raw/main/scripts/install_agent.py`; add `--source cnb` to install from an immutable CNB snapshot (requires Git).

Use `--client claude` or `--client openclaw` for another client. Download and run again to update; `--ref` pins a source tag/commit. The installer verifies all SHA-256 checksums before replacing its files, preserves extra local files/client settings, and records the source commit in `install.json`.

This repository distributes a Skill without an MCP server; use its existing scripts or development APIs.

## Source and documentation

- [`scripts/install.sh`](https://github.com/oneclickvirt/cockpit/blob/main/scripts/install.sh)
- [`scripts/lib/runtime.sh`](https://github.com/oneclickvirt/cockpit/blob/main/scripts/lib/runtime.sh)
- [`scripts/uninstall.sh`](https://github.com/oneclickvirt/cockpit/blob/main/scripts/uninstall.sh)

- [集成安装说明 / Integration guide](https://www.spiritlhl.net/guide/agent_integrations.html)

Check the relevant source and current documentation before giving commands. Preserve requested version pins, data paths and native host identifiers. Distinguish actual program execution, isolated tests and unverified environments.
