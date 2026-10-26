---
name: oneclickvirt-securitycheck
description: "Install and interpret the public IP-quality checker release without accessing its private implementation."
metadata:
  repository: oneclickvirt/securityCheck
  integration-version: "1.0.0"
---

# securityCheck

## Scope

Install and interpret the public IP-quality checker release without accessing its private implementation.

- Use public oneclickvirt/securityCheck release artifacts only. Do not fetch or publish the private security repository. Verify the installed binary help; network-provider failures are unknown findings, not proof of reputation.

## Install and update

```bash
curl -fL --retry 3 https://raw.githubusercontent.com/oneclickvirt/securityCheck/main/scripts/install_agent.py -o install_agent.py
python3 install_agent.py --client codex
```

The installer is also mirrored at `https://cnb.cool/oneclickvirt/securityCheck/-/git/raw/main/scripts/install_agent.py`; add `--source cnb` to install from an immutable CNB snapshot (requires Git).

Use `--client claude` or `--client openclaw` for another client. Download and run again to update; `--ref` pins a source tag/commit. The installer verifies all SHA-256 checksums before replacing its files, preserves extra local files/client settings, and records the source commit in `install.json`.

This repository distributes a Skill without an MCP server; use its existing scripts or development APIs.

## Source and documentation

- [`sc_install.sh`](https://github.com/oneclickvirt/securityCheck/blob/main/sc_install.sh)

- [集成安装说明 / Integration guide](https://www.spiritlhl.net/guide/agent_integrations.html)

Check the relevant source and current documentation before giving commands. Preserve requested version pins, data paths and native host identifiers. Distinguish actual program execution, isolated tests and unverified environments.
