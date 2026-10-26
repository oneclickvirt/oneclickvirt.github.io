---
name: oneclickvirt-pve-kvm-images
description: "Find and verify current pve_kvm_images operating-system image release assets for a compatible virtualization runtime."
metadata:
  repository: oneclickvirt/pve_kvm_images
  integration-version: "1.0.0"
---

# pve_kvm_images

## Scope

Find and verify current pve_kvm_images operating-system image release assets for a compatible virtualization runtime.

- Resolve the requested operating-system tag with release_assets; latest is only the most recent release, not a complete catalogue of distributions.
- Filter asset names using the requested OS and architecture; an empty match means unavailable, never substitute amd64 for ARM64.
- Keep rootfs/LXC, Incus/LXD metadata pairs, QCOW2/KVM and ISO artifacts distinct. Review published checksum/validation metadata before importing; do not execute templates as programs.

## Install and update

```bash
curl -fL --retry 3 https://raw.githubusercontent.com/oneclickvirt/pve_kvm_images/main/scripts/install_agent.py -o install_agent.py
python3 install_agent.py --client codex
```

The installer is also mirrored at `https://cnb.cool/oneclickvirt/pve_kvm_images/-/git/raw/main/scripts/install_agent.py`; add `--source cnb` to install from an immutable CNB snapshot (requires Git).

Use `--client claude` or `--client openclaw` for another client. Download and run again to update; `--ref` pins a source tag/commit. The installer verifies all SHA-256 checksums before replacing its files, preserves extra local files/client settings, and records the source commit in `install.json`.

## MCP

Requires Python 3.9+. The adapter uses existing local commands and their existing permissions; it does not install a virtualization runtime. Merge the generated `mcp.codex.toml`, `mcp.claude.json`, or `mcp.openclaw.json` into that client's existing configuration. For a remote host, run its adapter over noninteractive SSH.

Call `integration_info` first for capabilities and prerequisites.

`release_assets` returns the actual version, filenames, sizes, digests and download URLs. Pass an exact tag for a pinned release. After a product update, verify help and an actual call rather than treating file presence as a successful test.

## Source and documentation

- [`rebuild_qcow2.sh`](https://github.com/oneclickvirt/pve_kvm_images/blob/main/rebuild_qcow2.sh)
- [`test.sh`](https://github.com/oneclickvirt/pve_kvm_images/blob/main/test.sh)

- [集成安装说明 / Integration guide](https://www.spiritlhl.net/guide/agent_integrations.html)

Check the relevant source and current documentation before giving commands. Preserve requested version pins, data paths and native host identifiers. Distinguish actual program execution, isolated tests and unverified environments.
