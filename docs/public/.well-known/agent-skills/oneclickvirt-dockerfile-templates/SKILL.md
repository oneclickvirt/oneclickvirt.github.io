---
name: oneclickvirt-dockerfile-templates
description: "Build the specific Dockerfile template requested from this repository."
metadata:
  repository: oneclickvirt/dockerfile-templates
  integration-version: "1.0.0"
---

# dockerfile-templates

## Scope

Build the specific Dockerfile template requested from this repository.

- Inspect the selected image directory, Dockerfile and entrypoint. Select a concrete build context and check base-image architecture; do not build every image by default.

## Install and update

```bash
curl -fL --retry 3 https://raw.githubusercontent.com/oneclickvirt/dockerfile-templates/main/scripts/install_agent.py -o install_agent.py
python3 install_agent.py --client codex
```

The installer is also mirrored at `https://cnb.cool/oneclickvirt/dockerfile-templates/-/git/raw/main/scripts/install_agent.py`; add `--source cnb` to install from an immutable CNB snapshot (requires Git).

Use `--client claude` or `--client openclaw` for another client. Download and run again to update; `--ref` pins a source tag/commit. The installer verifies all SHA-256 checksums before replacing its files, preserves extra local files/client settings, and records the source commit in `install.json`.

This repository distributes a Skill without an MCP server; use its existing scripts or development APIs.

## Source and documentation


- [集成安装说明 / Integration guide](https://www.spiritlhl.net/guide/agent_integrations.html)

Check the relevant source and current documentation before giving commands. Preserve requested version pins, data paths and native host identifiers. Distinguish actual program execution, isolated tests and unverified environments.
