---
name: oneclickvirt-virtualizor-docker
description: "部署 Virtualizor Docker 环境并排查已有 Compose 服务。"
metadata:
  repository: oneclickvirt/virtualizor-docker
  integration-version: "1.0.0"
---

# virtualizor-docker

## 使用范围

部署 Virtualizor Docker 环境并排查已有 Compose 服务。

- 先检查实际 Compose 服务定义和安装器选项，再选择端口及数据卷。保留面板状态和授权配置。

## 安装和更新

```bash
curl -fL --retry 3 https://raw.githubusercontent.com/oneclickvirt/virtualizor-docker/master/scripts/install_agent.py -o install_agent.py
python3 install_agent.py --client codex
```

可将下载地址改为 `https://cnb.cool/oneclickvirt/virtualizor-docker/-/git/raw/master/scripts/install_agent.py`，并使用 `--source cnb` 从 CNB 的固定提交安装；此模式另需 Git。

用 `--client claude` 或 `--client openclaw` 选择其他客户端。重新下载并执行可更新；`--ref` 固定源码标签或提交。安装前校验全部 SHA-256，保留额外本地文件及已有客户端设置，`install.json` 记录来源提交。

此仓库发布 Skill，不安装 MCP 服务端；按原有脚本或开发接口操作。

## 对应源码与说明

- [`example-config.sh`](https://github.com/oneclickvirt/virtualizor-docker/blob/master/example-config.sh)
- [`s6/scripts/healthcheck.sh`](https://github.com/oneclickvirt/virtualizor-docker/blob/master/s6/scripts/healthcheck.sh)
- [`s6/scripts/install-virtualizor.sh`](https://github.com/oneclickvirt/virtualizor-docker/blob/master/s6/scripts/install-virtualizor.sh)
- [`virtualizor.sh`](https://github.com/oneclickvirt/virtualizor-docker/blob/master/virtualizor.sh)

- [集成安装说明 / Integration guide](https://www.spiritlhl.net/guide/agent_integrations.html)

给出操作命令前核对这些源码文件及当前文档，保留现有版本固定、数据路径和宿主机标识。报告测试时区分真实程序执行、隔离测试及未验证的环境。
