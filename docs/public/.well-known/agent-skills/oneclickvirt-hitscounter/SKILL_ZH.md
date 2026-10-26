---
name: oneclickvirt-hitscounter
description: "读取并排查已有 Cloudflare/D1 访问计数器。"
metadata:
  repository: oneclickvirt/hitscounter
  integration-version: "1.0.0"
---

# hitscounter

## 使用范围

读取并排查已有 Cloudflare/D1 访问计数器。

- counter_monthly 只读取 /api/monthly，不增加访问计数。可用 ONECLICKVIRT_COUNTER_URL 指定已有部署的 HTTPS 地址。
- 新建计数器的 /api/create 使用部署现有 authCode，该凭据不得写入源码、提示词或文档。MCP 仅提供月统计查询。

## 安装和更新

```bash
curl -fL --retry 3 https://raw.githubusercontent.com/oneclickvirt/hitscounter/main/scripts/install_agent.py -o install_agent.py
python3 install_agent.py --client codex
```

可将下载地址改为 `https://cnb.cool/oneclickvirt/hitscounter/-/git/raw/main/scripts/install_agent.py`，并使用 `--source cnb` 从 CNB 的固定提交安装；此模式另需 Git。

用 `--client claude` 或 `--client openclaw` 选择其他客户端。重新下载并执行可更新；`--ref` 固定源码标签或提交。安装前校验全部 SHA-256，保留额外本地文件及已有客户端设置，`install.json` 记录来源提交。

## MCP

运行需要 Python 3.9 以上版本；MCP 使用本机已有程序及其权限，不自动安装虚拟化环境。将安装目录内对应客户端的 `mcp.codex.toml`、`mcp.claude.json` 或 `mcp.openclaw.json` 合并到已有配置。远端宿主机应通过无交互 SSH 运行该主机上的适配器。

先调用 `integration_info` 查看能力和运行要求。

## 对应源码与说明

- [`API.md`](https://github.com/oneclickvirt/hitscounter/blob/main/API.md)

- [集成安装说明 / Integration guide](https://www.spiritlhl.net/guide/agent_integrations.html)

给出操作命令前核对这些源码文件及当前文档，保留现有版本固定、数据路径和宿主机标识。报告测试时区分真实程序执行、隔离测试及未验证的环境。
