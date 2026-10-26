---
name: oneclickvirt-dd
description: "在受控测试中使用内嵌 dd 依赖的 Go 库。"
metadata:
  repository: oneclickvirt/dd
  integration-version: "1.0.0"
---

# dd

## 使用范围

在受控测试中使用内嵌 dd 依赖的 Go 库。

- 先核对导出 API 及目标系统和架构的嵌入产物选择。只使用可丢弃的测试文件，不指向裸块设备或生产数据。

## 安装和更新

```bash
curl -fL --retry 3 https://raw.githubusercontent.com/oneclickvirt/dd/main/scripts/install_agent.py -o install_agent.py
python3 install_agent.py --client codex
```

可将下载地址改为 `https://cnb.cool/oneclickvirt/dd/-/git/raw/main/scripts/install_agent.py`，并使用 `--source cnb` 从 CNB 的固定提交安装；此模式另需 Git。

用 `--client claude` 或 `--client openclaw` 选择其他客户端。重新下载并执行可更新；`--ref` 固定源码标签或提交。安装前校验全部 SHA-256，保留额外本地文件及已有客户端设置，`install.json` 记录来源提交。

此仓库发布 Skill，不安装 MCP 服务端；按原有脚本或开发接口操作。

## 对应源码与说明

- [`go.mod`](https://github.com/oneclickvirt/dd/blob/main/go.mod)

- [集成安装说明 / Integration guide](https://www.spiritlhl.net/guide/agent_integrations.html)

给出操作命令前核对这些源码文件及当前文档，保留现有版本固定、数据路径和宿主机标识。报告测试时区分真实程序执行、隔离测试及未验证的环境。
