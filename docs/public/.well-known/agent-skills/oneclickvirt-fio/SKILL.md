---
name: oneclickvirt-fio
description: "Use the Go library that embeds fio dependencies for controlled disk benchmarks."
metadata:
  repository: oneclickvirt/fio
  integration-version: "1.0.0"
---

# fio

## Scope

Use the Go library that embeds fio dependencies for controlled disk benchmarks.

- Inspect the exported configuration and embedded asset selection. Bound runtime/file size, use disposable files and preserve explicit paths.

## Install and update

```bash
curl -fL --retry 3 https://raw.githubusercontent.com/oneclickvirt/fio/main/scripts/install_agent.py -o install_agent.py
python3 install_agent.py --client codex
```

The installer is also mirrored at `https://cnb.cool/oneclickvirt/fio/-/git/raw/main/scripts/install_agent.py`; add `--source cnb` to install from an immutable CNB snapshot (requires Git).

Use `--client claude` or `--client openclaw` for another client. Download and run again to update; `--ref` pins a source tag/commit. The installer verifies all SHA-256 checksums before replacing its files, preserves extra local files/client settings, and records the source commit in `install.json`.

This repository distributes a Skill without an MCP server; use its existing scripts or development APIs.

## Source and documentation

- [`go.mod`](https://github.com/oneclickvirt/fio/blob/main/go.mod)

- [集成安装说明 / Integration guide](https://www.spiritlhl.net/guide/agent_integrations.html)

Check the relevant source and current documentation before giving commands. Preserve requested version pins, data paths and native host identifiers. Distinguish actual program execution, isolated tests and unverified environments.
