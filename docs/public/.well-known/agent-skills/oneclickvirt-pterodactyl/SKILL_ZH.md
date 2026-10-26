---
name: oneclickvirt-pterodactyl
description: "部署 Pterodactyl 面板和 Wings，处理节点导入及 Egg 工作流。"
metadata:
  repository: oneclickvirt/pterodactyl
  integration-version: "1.0.0"
---

# pterodactyl

## 使用范围

部署 Pterodactyl 面板和 Wings，处理节点导入及 Egg 工作流。

- 区分面板安装、Wings 安装和导入现有节点，分别核对 scripts/install_pterodactyl.sh、scripts/install_wings.sh、scripts/import_node.sh。保留已有数据库、节点凭据和游戏数据。

## 安装和更新

```bash
curl -fL --retry 3 https://raw.githubusercontent.com/oneclickvirt/pterodactyl/main/scripts/install_agent.py -o install_agent.py
python3 install_agent.py --client codex
```

可将下载地址改为 `https://cnb.cool/oneclickvirt/pterodactyl/-/git/raw/main/scripts/install_agent.py`，并使用 `--source cnb` 从 CNB 的固定提交安装；此模式另需 Git。

用 `--client claude` 或 `--client openclaw` 选择其他客户端。重新下载并执行可更新；`--ref` 固定源码标签或提交。安装前校验全部 SHA-256，保留额外本地文件及已有客户端设置，`install.json` 记录来源提交。

此仓库发布 Skill，不安装 MCP 服务端；按原有脚本或开发接口操作。

## 对应源码与说明

- [`back/rsync_eggs.sh`](https://github.com/oneclickvirt/pterodactyl/blob/main/back/rsync_eggs.sh)
- [`eggs/debian/entrypoint.sh`](https://github.com/oneclickvirt/pterodactyl/blob/main/eggs/debian/entrypoint.sh)
- [`eggs/debian/ssh.sh`](https://github.com/oneclickvirt/pterodactyl/blob/main/eggs/debian/ssh.sh)
- [`eggs/debian/start.sh`](https://github.com/oneclickvirt/pterodactyl/blob/main/eggs/debian/start.sh)
- [`eggs/ssh.sh`](https://github.com/oneclickvirt/pterodactyl/blob/main/eggs/ssh.sh)
- [`eggs/ubuntu/entrypoint.sh`](https://github.com/oneclickvirt/pterodactyl/blob/main/eggs/ubuntu/entrypoint.sh)
- [`eggs/ubuntu/ssh.sh`](https://github.com/oneclickvirt/pterodactyl/blob/main/eggs/ubuntu/ssh.sh)
- [`eggs/ubuntu/start.sh`](https://github.com/oneclickvirt/pterodactyl/blob/main/eggs/ubuntu/start.sh)
- [`scripts/import_node.sh`](https://github.com/oneclickvirt/pterodactyl/blob/main/scripts/import_node.sh)
- [`scripts/install_pterodactyl.sh`](https://github.com/oneclickvirt/pterodactyl/blob/main/scripts/install_pterodactyl.sh)
- [`scripts/install_wings.sh`](https://github.com/oneclickvirt/pterodactyl/blob/main/scripts/install_wings.sh)

- [集成安装说明 / Integration guide](https://www.spiritlhl.net/guide/agent_integrations.html)

给出操作命令前核对这些源码文件及当前文档，保留现有版本固定、数据路径和宿主机标识。报告测试时区分真实程序执行、隔离测试及未验证的环境。
