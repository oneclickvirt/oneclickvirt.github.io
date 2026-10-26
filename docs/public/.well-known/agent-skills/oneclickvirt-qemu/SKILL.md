---
name: oneclickvirt-qemu
description: "Operate and troubleshoot qemu instances deployed with the OneClickVirt scripts."
metadata:
  repository: oneclickvirt/qemu
  integration-version: "1.0.0"
---

# qemu

## Scope

Operate and troubleshoot qemu instances deployed with the OneClickVirt scripts.

- Read the platform precheck and installation pages before changing a host.
- Use the existing host runtime and its credentials. Instance IDs and names remain the native runtime identifiers.
- MCP starts read-only. Set ONECLICKVIRT_MCP_ALLOW_WRITE=1 on the intended host to expose start, graceful stop and restart; deletion, reinstall and arbitrary shell commands are not exposed.
- Use local libvirt; ONECLICKVIRT_LIBVIRT_URI accepts qemu:///system or qemu:///session.

## Install and update

```bash
curl -fL --retry 3 https://raw.githubusercontent.com/oneclickvirt/qemu/main/scripts/install_agent.py -o install_agent.py
python3 install_agent.py --client codex
```

The installer is also mirrored at `https://cnb.cool/oneclickvirt/qemu/-/git/raw/main/scripts/install_agent.py`; add `--source cnb` to install from an immutable CNB snapshot (requires Git).

Use `--client claude` or `--client openclaw` for another client. Download and run again to update; `--ref` pins a source tag/commit. The installer verifies all SHA-256 checksums before replacing its files, preserves extra local files/client settings, and records the source commit in `install.json`.

## MCP

Requires Python 3.9+. The adapter uses existing local commands and their existing permissions; it does not install a virtualization runtime. Merge the generated `mcp.codex.toml`, `mcp.claude.json`, or `mcp.openclaw.json` into that client's existing configuration. For a remote host, run its adapter over noninteractive SSH.

Call `integration_info` first for capabilities and prerequisites.

## Source and documentation

- [`qemuinstall.sh`](https://github.com/oneclickvirt/qemu/blob/main/qemuinstall.sh)
- [`qemuuninstall.sh`](https://github.com/oneclickvirt/qemu/blob/main/qemuuninstall.sh)
- [`scripts/create_qemu.sh`](https://github.com/oneclickvirt/qemu/blob/main/scripts/create_qemu.sh)
- [`scripts/delete_qemu.sh`](https://github.com/oneclickvirt/qemu/blob/main/scripts/delete_qemu.sh)
- [`scripts/manage_qemu.sh`](https://github.com/oneclickvirt/qemu/blob/main/scripts/manage_qemu.sh)
- [`scripts/oneqemu.sh`](https://github.com/oneclickvirt/qemu/blob/main/scripts/oneqemu.sh)

- [集成安装说明 / Integration guide](https://www.spiritlhl.net/guide/agent_integrations.html)
- [平台准备与安装 / Platform prerequisites](https://www.spiritlhl.net/guide/qemu/qemu_precheck.html)

Check the relevant source and current documentation before giving commands. Preserve requested version pins, data paths and native host identifiers. Distinguish actual program execution, isolated tests and unverified environments.
