---
name: oneclickvirt-nt3
description: "使用内置省份和运营商目标执行有时限的 TCP 延迟探测。"
metadata:
  repository: oneclickvirt/nt3
  integration-version: "1.0.0"
---

# nt3

## 使用范围

使用内置省份和运营商目标执行有时限的 TCP 延迟探测。

- 先用 probe_help 核对已安装程序的实际帮助。程序支持 JSON 时返回原生 JSON，否则返回原生文本。
- 区分部分结果、网络失败和确定结论；通过 release_assets 查询当前真实产物及架构。

## 安装和更新

```bash
curl -fL --retry 3 https://raw.githubusercontent.com/oneclickvirt/nt3/main/scripts/install_agent.py -o install_agent.py
python3 install_agent.py --client codex
```

可将下载地址改为 `https://cnb.cool/oneclickvirt/nt3/-/git/raw/main/scripts/install_agent.py`，并使用 `--source cnb` 从 CNB 的固定提交安装；此模式另需 Git。

用 `--client claude` 或 `--client openclaw` 选择其他客户端。重新下载并执行可更新；`--ref` 固定源码标签或提交。安装前校验全部 SHA-256，保留额外本地文件及已有客户端设置，`install.json` 记录来源提交。

## MCP

运行需要 Python 3.9 以上版本；MCP 使用本机已有程序及其权限，不自动安装虚拟化环境。将安装目录内对应客户端的 `mcp.codex.toml`、`mcp.claude.json` 或 `mcp.openclaw.json` 合并到已有配置。远端宿主机应通过无交互 SSH 运行该主机上的适配器。

```bash
python3 install_agent.py --client codex --install-binary
```

`--version` 可指定检测程序的正式 Release 标签，`--ref` 则指定 Skill/MCP 源码版本，两者独立。默认从 GitHub 解析一次最新正式版，选择本机系统/架构的真实产物并校验 SHA-256；没有匹配产物时停止。已有程序可用 `--binary /完整路径/程序` 复用。

先调用 `integration_info` 查看能力和运行要求。

可用检测预设：

- `province`: `nt3 -province-registry -json -province-attempts 1 -province-timeout 500ms -province-concurrency 4`

`release_assets` 返回实际版本、文件名、大小、摘要及下载地址；需要固定版本时传完整标签。更新产物后应重新安装并验证帮助和实际调用，不能只因文件存在便判定可用。

## 对应源码与说明

- [`cmd/main.go`](https://github.com/oneclickvirt/nt3/blob/main/cmd/main.go)
- [`go.mod`](https://github.com/oneclickvirt/nt3/blob/main/go.mod)
- [`nt3_install.sh`](https://github.com/oneclickvirt/nt3/blob/main/nt3_install.sh)

- [集成安装说明 / Integration guide](https://www.spiritlhl.net/guide/agent_integrations.html)

给出操作命令前核对这些源码文件及当前文档，保留现有版本固定、数据路径和宿主机标识。报告测试时区分真实程序执行、隔离测试及未验证的环境。
