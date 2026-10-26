---
name: oneclickvirt-docker
description: "Operate and troubleshoot docker instances deployed with the OneClickVirt scripts."
metadata:
  repository: oneclickvirt/docker
  integration-version: "1.0.0"
---

# docker

## Scope

Operate and troubleshoot docker instances deployed with the OneClickVirt scripts.

- Read the platform precheck and installation pages before changing a host.
- Use the existing host runtime and its credentials. Instance IDs and names remain the native runtime identifiers.
- MCP starts read-only. Set ONECLICKVIRT_MCP_ALLOW_WRITE=1 on the intended host to expose start, graceful stop and restart; deletion, reinstall and arbitrary shell commands are not exposed.
- The adapter uses the configured Docker context. Inspecting containers never returns Config.Env secrets.

## Install and update

```bash
curl -fL --retry 3 https://raw.githubusercontent.com/oneclickvirt/docker/main/scripts/install_agent.py -o install_agent.py
python3 install_agent.py --client codex
```

The installer is also mirrored at `https://cnb.cool/oneclickvirt/docker/-/git/raw/main/scripts/install_agent.py`; add `--source cnb` to install from an immutable CNB snapshot (requires Git).

Use `--client claude` or `--client openclaw` for another client. Download and run again to update; `--ref` pins a source tag/commit. The installer verifies all SHA-256 checksums before replacing its files, preserves extra local files/client settings, and records the source commit in `install.json`.

## MCP

Requires Python 3.9+. The adapter uses existing local commands and their existing permissions; it does not install a virtualization runtime. Merge the generated `mcp.codex.toml`, `mcp.claude.json`, or `mcp.openclaw.json` into that client's existing configuration. For a remote host, run its adapter over noninteractive SSH.

Call `integration_info` first for capabilities and prerequisites.

## Source and documentation

- [`dockerfiles/entrypoint.sh`](https://github.com/oneclickvirt/docker/blob/main/dockerfiles/entrypoint.sh)
- [`dockerfiles/entrypoint_alpine.sh`](https://github.com/oneclickvirt/docker/blob/main/dockerfiles/entrypoint_alpine.sh)
- [`dockeruninstall.sh`](https://github.com/oneclickvirt/docker/blob/main/dockeruninstall.sh)
- [`extra_scripts/build_wds_image.sh`](https://github.com/oneclickvirt/docker/blob/main/extra_scripts/build_wds_image.sh)
- [`extra_scripts/check-dns.sh`](https://github.com/oneclickvirt/docker/blob/main/extra_scripts/check-dns.sh)
- [`extra_scripts/disk_test.sh`](https://github.com/oneclickvirt/docker/blob/main/extra_scripts/disk_test.sh)
- [`extra_scripts/guacamole.sh`](https://github.com/oneclickvirt/docker/blob/main/extra_scripts/guacamole.sh)
- [`extra_scripts/install_ifupdown.sh`](https://github.com/oneclickvirt/docker/blob/main/extra_scripts/install_ifupdown.sh)
- [`extra_scripts/mergew.sh`](https://github.com/oneclickvirt/docker/blob/main/extra_scripts/mergew.sh)
- [`extra_scripts/nohup-ws-scrcpy.sh`](https://github.com/oneclickvirt/docker/blob/main/extra_scripts/nohup-ws-scrcpy.sh)
- [`extra_scripts/splitandupload.sh`](https://github.com/oneclickvirt/docker/blob/main/extra_scripts/splitandupload.sh)
- [`extra_scripts/startup.sh`](https://github.com/oneclickvirt/docker/blob/main/extra_scripts/startup.sh)
- [`scripts/create_android.sh`](https://github.com/oneclickvirt/docker/blob/main/scripts/create_android.sh)
- [`scripts/create_docker.sh`](https://github.com/oneclickvirt/docker/blob/main/scripts/create_docker.sh)
- [`scripts/dockerinstall.sh`](https://github.com/oneclickvirt/docker/blob/main/scripts/dockerinstall.sh)
- [`scripts/oneandroid.sh`](https://github.com/oneclickvirt/docker/blob/main/scripts/oneandroid.sh)
- [`scripts/onechromium.sh`](https://github.com/oneclickvirt/docker/blob/main/scripts/onechromium.sh)
- [`scripts/onedocker.sh`](https://github.com/oneclickvirt/docker/blob/main/scripts/onedocker.sh)

- [集成安装说明 / Integration guide](https://www.spiritlhl.net/guide/agent_integrations.html)
- [平台准备与安装 / Platform prerequisites](https://www.spiritlhl.net/guide/docker/docker_precheck.html)

Check the relevant source and current documentation before giving commands. Preserve requested version pins, data paths and native host identifiers. Distinguish actual program execution, isolated tests and unverified environments.
