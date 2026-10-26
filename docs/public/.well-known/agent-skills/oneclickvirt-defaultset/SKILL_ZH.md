---
name: oneclickvirt-defaultset
description: "在 Go 检测模块中使用共享配置库，并保持调用兼容。"
metadata:
  repository: oneclickvirt/defaultset
  integration-version: "1.0.0"
---

# defaultset

## 使用范围

在 Go 检测模块中使用共享配置库，并保持调用兼容。

- 先阅读 go.mod 和导出类型，保持当前检测模块的调用兼容。此库不作为独立检测程序运行。

## 安装和更新

```bash
curl -fL --retry 3 https://raw.githubusercontent.com/oneclickvirt/defaultset/main/scripts/install_agent.py -o install_agent.py
python3 install_agent.py --client codex
```

可将下载地址改为 `https://cnb.cool/oneclickvirt/defaultset/-/git/raw/main/scripts/install_agent.py`，并使用 `--source cnb` 从 CNB 的固定提交安装；此模式另需 Git。

用 `--client claude` 或 `--client openclaw` 选择其他客户端。重新下载并执行可更新；`--ref` 固定源码标签或提交。安装前校验全部 SHA-256，保留额外本地文件及已有客户端设置，`install.json` 记录来源提交。

此仓库发布 Skill，不安装 MCP 服务端；按原有脚本或开发接口操作。

## 对应源码与说明

- [`go.mod`](https://github.com/oneclickvirt/defaultset/blob/main/go.mod)

- [集成安装说明 / Integration guide](https://www.spiritlhl.net/guide/agent_integrations.html)

给出操作命令前核对这些源码文件及当前文档，保留现有版本固定、数据路径和宿主机标识。报告测试时区分真实程序执行、隔离测试及未验证的环境。
