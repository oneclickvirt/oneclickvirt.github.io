---
name: oneclickvirt-docker
description: "管理和排查 OneClickVirt Docker 容器及宿主机环境。"
metadata:
  repository: oneclickvirt/docker
  integration-version: "1.0.0"
---

# docker

## 使用范围

管理和排查 OneClickVirt Docker 容器及宿主机环境。

- 变更宿主机前，先阅读平台准备和安装页。
- 使用本机已有运行环境及凭据；实例名称和 ID 保持原运行环境的标识。
- MCP 默认只读。在目标主机设置 ONECLICKVIRT_MCP_ALLOW_WRITE=1 后才提供启动、正常关机和重启；不提供删除、重装或任意 Shell 执行。
- 使用当前 Docker context，查询结果不返回容器 Config.Env 中的敏感变量。

## 安装和更新

```bash
curl -fL --retry 3 https://raw.githubusercontent.com/oneclickvirt/docker/main/scripts/install_agent.py -o install_agent.py
python3 install_agent.py --client codex
```

可将下载地址改为 `https://cnb.cool/oneclickvirt/docker/-/git/raw/main/scripts/install_agent.py`，并使用 `--source cnb` 从 CNB 的固定提交安装；此模式另需 Git。

用 `--client claude` 或 `--client openclaw` 选择其他客户端。重新下载并执行可更新；`--ref` 固定源码标签或提交。安装前校验全部 SHA-256，保留额外本地文件及已有客户端设置，`install.json` 记录来源提交。

## MCP

运行需要 Python 3.9 以上版本；MCP 使用本机已有程序及其权限，不自动安装虚拟化环境。将安装目录内对应客户端的 `mcp.codex.toml`、`mcp.claude.json` 或 `mcp.openclaw.json` 合并到已有配置。远端宿主机应通过无交互 SSH 运行该主机上的适配器。

先调用 `integration_info` 查看能力和运行要求。

## 对应源码与说明

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

给出操作命令前核对这些源码文件及当前文档，保留现有版本固定、数据路径和宿主机标识。报告测试时区分真实程序执行、隔离测试及未验证的环境。
