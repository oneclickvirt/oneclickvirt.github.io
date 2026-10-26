---
name: oneclickvirt-ndpresponder
description: "查看 Linux IPv6 地址和路由，并排查现有 NDP responder 部署。"
metadata:
  repository: oneclickvirt/ndpresponder
  integration-version: "1.0.0"
---

# ndpresponder

## 使用范围

查看 Linux IPv6 地址和路由，并排查现有 NDP responder 部署。

- network_status 仅查询 IPv6 地址和路由，不创建隧道、不启用 NDP 代理、不宣告地址。
- 执行原有脚本前核对真实路由前缀、公网 IPv4、隧道对端和接口名，不将示例地址直接配置到真实网卡。
- 保留现有路由、Docker/CNI 跟踪及 responder 服务，不重复启动同一代理。

## 安装和更新

```bash
curl -fL --retry 3 https://raw.githubusercontent.com/oneclickvirt/ndpresponder/main/scripts/install_agent.py -o install_agent.py
python3 install_agent.py --client codex
```

可将下载地址改为 `https://cnb.cool/oneclickvirt/ndpresponder/-/git/raw/main/scripts/install_agent.py`，并使用 `--source cnb` 从 CNB 的固定提交安装；此模式另需 Git。

用 `--client claude` 或 `--client openclaw` 选择其他客户端。重新下载并执行可更新；`--ref` 固定源码标签或提交。安装前校验全部 SHA-256，保留额外本地文件及已有客户端设置，`install.json` 记录来源提交。

## MCP

运行需要 Python 3.9 以上版本；MCP 使用本机已有程序及其权限，不自动安装虚拟化环境。将安装目录内对应客户端的 `mcp.codex.toml`、`mcp.claude.json` 或 `mcp.openclaw.json` 合并到已有配置。远端宿主机应通过无交互 SSH 运行该主机上的适配器。

先调用 `integration_info` 查看能力和运行要求。

## 对应源码与说明

- [`go.mod`](https://github.com/oneclickvirt/ndpresponder/blob/main/go.mod)
- [`scripts/publish-cnb.sh`](https://github.com/oneclickvirt/ndpresponder/blob/main/scripts/publish-cnb.sh)

- [集成安装说明 / Integration guide](https://www.spiritlhl.net/guide/agent_integrations.html)

给出操作命令前核对这些源码文件及当前文档，保留现有版本固定、数据路径和宿主机标识。报告测试时区分真实程序执行、隔离测试及未验证的环境。
