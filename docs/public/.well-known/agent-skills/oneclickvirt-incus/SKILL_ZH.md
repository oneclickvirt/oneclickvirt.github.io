---
name: oneclickvirt-incus
description: "管理和排查 Incus 实例、节点运行环境及 OneClickVirt 部署。"
metadata:
  repository: oneclickvirt/incus
  integration-version: "1.0.0"
---

# incus

## 使用范围

管理和排查 Incus 实例、节点运行环境及 OneClickVirt 部署。

- 变更宿主机前，先阅读平台准备和安装页。
- 使用本机已有运行环境及凭据；实例名称和 ID 保持原运行环境的标识。
- MCP 默认只读。在目标主机设置 ONECLICKVIRT_MCP_ALLOW_WRITE=1 后才提供启动、正常关机和重启；不提供删除、重装或任意 Shell 执行。
- 使用本机 incus 客户端和现有项目，不混用 LXD 的 lxc 命令。

## 安装和更新

```bash
curl -fL --retry 3 https://raw.githubusercontent.com/oneclickvirt/incus/main/scripts/install_agent.py -o install_agent.py
python3 install_agent.py --client codex
```

可将下载地址改为 `https://cnb.cool/oneclickvirt/incus/-/git/raw/main/scripts/install_agent.py`，并使用 `--source cnb` 从 CNB 的固定提交安装；此模式另需 Git。

用 `--client claude` 或 `--client openclaw` 选择其他客户端。重新下载并执行可更新；`--ref` 固定源码标签或提交。安装前校验全部 SHA-256，保留额外本地文件及已有客户端设置，`install.json` 记录来源提交。

## MCP

运行需要 Python 3.9 以上版本；MCP 使用本机已有程序及其权限，不自动安装虚拟化环境。将安装目录内对应客户端的 `mcp.codex.toml`、`mcp.claude.json` 或 `mcp.openclaw.json` 合并到已有配置。远端宿主机应通过无交互 SSH 运行该主机上的适配器。

先调用 `integration_info` 查看能力和运行要求。

## 对应源码与说明

- [`extra_scripts/coexistence.sh`](https://github.com/oneclickvirt/incus/blob/main/extra_scripts/coexistence.sh)
- [`extra_scripts/docker-coexistence.sh`](https://github.com/oneclickvirt/incus/blob/main/extra_scripts/docker-coexistence.sh)
- [`extra_scripts/incus_fixed_restart.sh`](https://github.com/oneclickvirt/incus/blob/main/extra_scripts/incus_fixed_restart.sh)
- [`panel_scripts/modify.sh`](https://github.com/oneclickvirt/incus/blob/main/panel_scripts/modify.sh)
- [`panel_scripts/panel_init.sh`](https://github.com/oneclickvirt/incus/blob/main/panel_scripts/panel_init.sh)
- [`scripts/add-ipv6.sh`](https://github.com/oneclickvirt/incus/blob/main/scripts/add-ipv6.sh)
- [`scripts/add_more.sh`](https://github.com/oneclickvirt/incus/blob/main/scripts/add_more.sh)
- [`scripts/backend.sh`](https://github.com/oneclickvirt/incus/blob/main/scripts/backend.sh)
- [`scripts/build_ipv6_network.sh`](https://github.com/oneclickvirt/incus/blob/main/scripts/build_ipv6_network.sh)
- [`scripts/build_monitor.sh`](https://github.com/oneclickvirt/incus/blob/main/scripts/build_monitor.sh)
- [`scripts/buildct.sh`](https://github.com/oneclickvirt/incus/blob/main/scripts/buildct.sh)
- [`scripts/buildvm.sh`](https://github.com/oneclickvirt/incus/blob/main/scripts/buildvm.sh)
- [`scripts/check-dns.sh`](https://github.com/oneclickvirt/incus/blob/main/scripts/check-dns.sh)
- [`scripts/config.sh`](https://github.com/oneclickvirt/incus/blob/main/scripts/config.sh)
- [`scripts/image_lookup.sh`](https://github.com/oneclickvirt/incus/blob/main/scripts/image_lookup.sh)
- [`scripts/incus_install.sh`](https://github.com/oneclickvirt/incus/blob/main/scripts/incus_install.sh)
- [`scripts/init.sh`](https://github.com/oneclickvirt/incus/blob/main/scripts/init.sh)
- [`scripts/instance_ops.sh`](https://github.com/oneclickvirt/incus/blob/main/scripts/instance_ops.sh)

- [集成安装说明 / Integration guide](https://www.spiritlhl.net/guide/agent_integrations.html)
- [平台准备与安装 / Platform prerequisites](https://www.spiritlhl.net/guide/incus/incus_precheck.html)

给出操作命令前核对这些源码文件及当前文档，保留现有版本固定、数据路径和宿主机标识。报告测试时区分真实程序执行、隔离测试及未验证的环境。
