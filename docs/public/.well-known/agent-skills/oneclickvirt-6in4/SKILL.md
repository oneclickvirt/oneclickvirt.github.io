---
name: oneclickvirt-6in4
description: "Inspect and configure 6in4 IPv6 connectivity on the intended Linux host."
metadata:
  repository: oneclickvirt/6in4
  integration-version: "1.0.0"
---

# 6in4

## Scope

Inspect and configure 6in4 IPv6 connectivity on the intended Linux host.

- Use network_status for read-only IPv6 addresses and routes; it does not configure tunnels, proxy NDP or advertise new addresses.
- Confirm the real routed prefix, public IPv4, tunnel peer and interface names before applying the existing scripts. Never use documentation example prefixes on a live interface.
- Keep native routes, Docker/CNI tracking and existing responder services intact; do not start duplicate responders.

## Install and update

```bash
curl -fL --retry 3 https://raw.githubusercontent.com/oneclickvirt/6in4/main/scripts/install_agent.py -o install_agent.py
python3 install_agent.py --client codex
```

The installer is also mirrored at `https://cnb.cool/oneclickvirt/6in4/-/git/raw/main/scripts/install_agent.py`; add `--source cnb` to install from an immutable CNB snapshot (requires Git).

Use `--client claude` or `--client openclaw` for another client. Download and run again to update; `--ref` pins a source tag/commit. The installer verifies all SHA-256 checksums before replacing its files, preserves extra local files/client settings, and records the source commit in `install.json`.

## MCP

Requires Python 3.9+. The adapter uses existing local commands and their existing permissions; it does not install a virtualization runtime. Merge the generated `mcp.codex.toml`, `mcp.claude.json`, or `mcp.openclaw.json` into that client's existing configuration. For a remote host, run its adapter over noninteractive SSH.

Call `integration_info` first for capabilities and prerequisites.

## Source and documentation

- [`6in4-delete.sh`](https://github.com/oneclickvirt/6in4/blob/main/6in4-delete.sh)
- [`6in4.sh`](https://github.com/oneclickvirt/6in4/blob/main/6in4.sh)
- [`back/6in4.sh`](https://github.com/oneclickvirt/6in4/blob/main/back/6in4.sh)
- [`back/test.sh`](https://github.com/oneclickvirt/6in4/blob/main/back/test.sh)
- [`covert.sh`](https://github.com/oneclickvirt/6in4/blob/main/covert.sh)

- [集成安装说明 / Integration guide](https://www.spiritlhl.net/guide/agent_integrations.html)

Check the relevant source and current documentation before giving commands. Preserve requested version pins, data paths and native host identifiers. Distinguish actual program execution, isolated tests and unverified environments.
