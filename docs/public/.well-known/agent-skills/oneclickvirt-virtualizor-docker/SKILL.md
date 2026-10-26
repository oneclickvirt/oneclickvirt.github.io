---
name: oneclickvirt-virtualizor-docker
description: "Deploy the Virtualizor Docker setup and diagnose its existing Compose services."
metadata:
  repository: oneclickvirt/virtualizor-docker
  integration-version: "1.0.0"
---

# virtualizor-docker

## Scope

Deploy the Virtualizor Docker setup and diagnose its existing Compose services.

- Inspect the repository's actual Compose/service definitions and installer options before choosing ports or volumes. Protect panel state and licensing configuration.

## Install and update

```bash
curl -fL --retry 3 https://raw.githubusercontent.com/oneclickvirt/virtualizor-docker/master/scripts/install_agent.py -o install_agent.py
python3 install_agent.py --client codex
```

The installer is also mirrored at `https://cnb.cool/oneclickvirt/virtualizor-docker/-/git/raw/master/scripts/install_agent.py`; add `--source cnb` to install from an immutable CNB snapshot (requires Git).

Use `--client claude` or `--client openclaw` for another client. Download and run again to update; `--ref` pins a source tag/commit. The installer verifies all SHA-256 checksums before replacing its files, preserves extra local files/client settings, and records the source commit in `install.json`.

This repository distributes a Skill without an MCP server; use its existing scripts or development APIs.

## Source and documentation

- [`example-config.sh`](https://github.com/oneclickvirt/virtualizor-docker/blob/master/example-config.sh)
- [`s6/scripts/healthcheck.sh`](https://github.com/oneclickvirt/virtualizor-docker/blob/master/s6/scripts/healthcheck.sh)
- [`s6/scripts/install-virtualizor.sh`](https://github.com/oneclickvirt/virtualizor-docker/blob/master/s6/scripts/install-virtualizor.sh)
- [`virtualizor.sh`](https://github.com/oneclickvirt/virtualizor-docker/blob/master/virtualizor.sh)

- [集成安装说明 / Integration guide](https://www.spiritlhl.net/guide/agent_integrations.html)

Check the relevant source and current documentation before giving commands. Preserve requested version pins, data paths and native host identifiers. Distinguish actual program execution, isolated tests and unverified environments.
