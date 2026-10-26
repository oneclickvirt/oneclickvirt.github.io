---
name: oneclickvirt-kubevirt
description: "Operate and troubleshoot kubevirt instances deployed with the OneClickVirt scripts."
metadata:
  repository: oneclickvirt/kubevirt
  integration-version: "1.0.0"
---

# kubevirt

## Scope

Operate and troubleshoot kubevirt instances deployed with the OneClickVirt scripts.

- Read the platform precheck and installation pages before changing a host.
- Use the existing host runtime and its credentials. Instance IDs and names remain the native runtime identifiers.
- MCP starts read-only. Set ONECLICKVIRT_MCP_ALLOW_WRITE=1 on the intended host to expose start, graceful stop and restart; deletion, reinstall and arbitrary shell commands are not exposed.
- Use the existing kubeconfig; ONECLICKVIRT_KUBE_NAMESPACE defaults to default. Writes also require virtctl.

## Install and update

```bash
curl -fL --retry 3 https://raw.githubusercontent.com/oneclickvirt/kubevirt/main/scripts/install_agent.py -o install_agent.py
python3 install_agent.py --client codex
```

The installer is also mirrored at `https://cnb.cool/oneclickvirt/kubevirt/-/git/raw/main/scripts/install_agent.py`; add `--source cnb` to install from an immutable CNB snapshot (requires Git).

Use `--client claude` or `--client openclaw` for another client. Download and run again to update; `--ref` pins a source tag/commit. The installer verifies all SHA-256 checksums before replacing its files, preserves extra local files/client settings, and records the source commit in `install.json`.

## MCP

Requires Python 3.9+. The adapter uses existing local commands and their existing permissions; it does not install a virtualization runtime. Merge the generated `mcp.codex.toml`, `mcp.claude.json`, or `mcp.openclaw.json` into that client's existing configuration. For a remote host, run its adapter over noninteractive SSH.

Call `integration_info` first for capabilities and prerequisites.

## Source and documentation

- [`kubevirtinstall.sh`](https://github.com/oneclickvirt/kubevirt/blob/main/kubevirtinstall.sh)
- [`kubevirtuninstall.sh`](https://github.com/oneclickvirt/kubevirt/blob/main/kubevirtuninstall.sh)
- [`scripts/create_vm.sh`](https://github.com/oneclickvirt/kubevirt/blob/main/scripts/create_vm.sh)
- [`scripts/deletevm.sh`](https://github.com/oneclickvirt/kubevirt/blob/main/scripts/deletevm.sh)
- [`scripts/firewall.sh`](https://github.com/oneclickvirt/kubevirt/blob/main/scripts/firewall.sh)
- [`scripts/install_multus.sh`](https://github.com/oneclickvirt/kubevirt/blob/main/scripts/install_multus.sh)
- [`scripts/listvms.sh`](https://github.com/oneclickvirt/kubevirt/blob/main/scripts/listvms.sh)
- [`scripts/onevm.sh`](https://github.com/oneclickvirt/kubevirt/blob/main/scripts/onevm.sh)
- [`scripts/resizevm.sh`](https://github.com/oneclickvirt/kubevirt/blob/main/scripts/resizevm.sh)
- [`scripts/snapshotvm.sh`](https://github.com/oneclickvirt/kubevirt/blob/main/scripts/snapshotvm.sh)
- [`scripts/update-port-rules.sh`](https://github.com/oneclickvirt/kubevirt/blob/main/scripts/update-port-rules.sh)

- [集成安装说明 / Integration guide](https://www.spiritlhl.net/guide/agent_integrations.html)
- [平台准备与安装 / Platform prerequisites](https://www.spiritlhl.net/guide/kubevirt/kubevirt_precheck.html)

Check the relevant source and current documentation before giving commands. Preserve requested version pins, data paths and native host identifiers. Distinguish actual program execution, isolated tests and unverified environments.
