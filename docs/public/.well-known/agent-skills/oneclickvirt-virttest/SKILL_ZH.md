---
name: oneclickvirt-virttest
description: "运行和维护虚拟化安装脚本的自动化测试环境。"
metadata:
  repository: oneclickvirt/virttest
  integration-version: "1.0.0"
---

# virttest

## 使用范围

运行和维护虚拟化安装脚本的自动化测试环境。

- 按目标环境使用 action_tests/run_env_test.sh，先阅读权限及环境要求，在隔离客户机测试，并区分模拟数据、真实安装和客户机启动证据。

## 安装和更新

```bash
curl -fL --retry 3 https://raw.githubusercontent.com/oneclickvirt/virttest/main/scripts/install_agent.py -o install_agent.py
python3 install_agent.py --client codex
```

可将下载地址改为 `https://cnb.cool/oneclickvirt/virttest/-/git/raw/main/scripts/install_agent.py`，并使用 `--source cnb` 从 CNB 的固定提交安装；此模式另需 Git。

用 `--client claude` 或 `--client openclaw` 选择其他客户端。重新下载并执行可更新；`--ref` 固定源码标签或提交。安装前校验全部 SHA-256，保留额外本地文件及已有客户端设置，`install.json` 记录来源提交。

此仓库发布 Skill，不安装 MCP 服务端；按原有脚本或开发接口操作。

## 对应源码与说明


- [集成安装说明 / Integration guide](https://www.spiritlhl.net/guide/agent_integrations.html)

给出操作命令前核对这些源码文件及当前文档，保留现有版本固定、数据路径和宿主机标识。报告测试时区分真实程序执行、隔离测试及未验证的环境。
