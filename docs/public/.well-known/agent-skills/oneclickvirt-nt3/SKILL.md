---
name: oneclickvirt-nt3
description: "Query the built-in province/carrier targets with bounded TCP latency probes; detailed routes require separate explicit testing."
metadata:
  repository: oneclickvirt/nt3
  integration-version: "1.0.0"
---

# nt3

## Scope

Query the built-in province/carrier targets with bounded TCP latency probes; detailed routes require separate explicit testing.

- Read probe_help from the installed binary before assuming flags are supported. MCP returns native JSON when the program provides JSON, otherwise native text.
- Keep partial/network errors distinct from confirmed test outcomes. Current release assets and their actual architecture are available through release_assets.

## Install and update

```bash
curl -fL --retry 3 https://raw.githubusercontent.com/oneclickvirt/nt3/main/scripts/install_agent.py -o install_agent.py
python3 install_agent.py --client codex
```

The installer is also mirrored at `https://cnb.cool/oneclickvirt/nt3/-/git/raw/main/scripts/install_agent.py`; add `--source cnb` to install from an immutable CNB snapshot (requires Git).

Use `--client claude` or `--client openclaw` for another client. Download and run again to update; `--ref` pins a source tag/commit. The installer verifies all SHA-256 checksums before replacing its files, preserves extra local files/client settings, and records the source commit in `install.json`.

## MCP

Requires Python 3.9+. The adapter uses existing local commands and their existing permissions; it does not install a virtualization runtime. Merge the generated `mcp.codex.toml`, `mcp.claude.json`, or `mcp.openclaw.json` into that client's existing configuration. For a remote host, run its adapter over noninteractive SSH.

```bash
python3 install_agent.py --client codex --install-binary
```

`--version` selects the probe release tag; `--ref` selects Skill/MCP source independently. The default resolves the latest stable GitHub release once, selects a real asset for this OS/architecture, and verifies SHA-256. Missing assets fail without guessing. Reuse an existing executable with `--binary /absolute/path/to/program`.

Call `integration_info` first for capabilities and prerequisites.

Available probe presets:

- `province`: `nt3 -province-registry -json -province-attempts 1 -province-timeout 500ms -province-concurrency 4`

`release_assets` returns the actual version, filenames, sizes, digests and download URLs. Pass an exact tag for a pinned release. After a product update, verify help and an actual call rather than treating file presence as a successful test.

## Source and documentation

- [`cmd/main.go`](https://github.com/oneclickvirt/nt3/blob/main/cmd/main.go)
- [`go.mod`](https://github.com/oneclickvirt/nt3/blob/main/go.mod)
- [`nt3_install.sh`](https://github.com/oneclickvirt/nt3/blob/main/nt3_install.sh)

- [集成安装说明 / Integration guide](https://www.spiritlhl.net/guide/agent_integrations.html)

Check the relevant source and current documentation before giving commands. Preserve requested version pins, data paths and native host identifiers. Distinguish actual program execution, isolated tests and unverified environments.
