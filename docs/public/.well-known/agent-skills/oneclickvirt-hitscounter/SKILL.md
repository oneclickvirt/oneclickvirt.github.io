---
name: oneclickvirt-hitscounter
description: "Read and troubleshoot existing Cloudflare/D1 visit counters."
metadata:
  repository: oneclickvirt/hitscounter
  integration-version: "1.0.0"
---

# hitscounter

## Scope

Read and troubleshoot existing Cloudflare/D1 visit counters.

- counter_monthly reads /api/monthly and never increments the counter. ONECLICKVIRT_COUNTER_URL may set the HTTPS base URL of an existing deployment.
- Counter creation uses /api/create with the existing deployment's authCode; keep that secret out of source, prompts and documentation. MCP exposes monthly statistics only.

## Install and update

```bash
curl -fL --retry 3 https://raw.githubusercontent.com/oneclickvirt/hitscounter/main/scripts/install_agent.py -o install_agent.py
python3 install_agent.py --client codex
```

The installer is also mirrored at `https://cnb.cool/oneclickvirt/hitscounter/-/git/raw/main/scripts/install_agent.py`; add `--source cnb` to install from an immutable CNB snapshot (requires Git).

Use `--client claude` or `--client openclaw` for another client. Download and run again to update; `--ref` pins a source tag/commit. The installer verifies all SHA-256 checksums before replacing its files, preserves extra local files/client settings, and records the source commit in `install.json`.

## MCP

Requires Python 3.9+. The adapter uses existing local commands and their existing permissions; it does not install a virtualization runtime. Merge the generated `mcp.codex.toml`, `mcp.claude.json`, or `mcp.openclaw.json` into that client's existing configuration. For a remote host, run its adapter over noninteractive SSH.

Call `integration_info` first for capabilities and prerequisites.

## Source and documentation

- [`API.md`](https://github.com/oneclickvirt/hitscounter/blob/main/API.md)

- [集成安装说明 / Integration guide](https://www.spiritlhl.net/guide/agent_integrations.html)

Check the relevant source and current documentation before giving commands. Preserve requested version pins, data paths and native host identifiers. Distinguish actual program execution, isolated tests and unverified environments.
