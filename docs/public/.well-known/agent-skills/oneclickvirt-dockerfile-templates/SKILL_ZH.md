---
name: oneclickvirt-dockerfile-templates
description: "选择并构建仓库中实际需要的 Dockerfile 模板。"
metadata:
  repository: oneclickvirt/dockerfile-templates
  integration-version: "1.0.0"
---

# dockerfile-templates

## 使用范围

选择并构建仓库中实际需要的 Dockerfile 模板。

- 检查选定目录的 Dockerfile 和入口程序，使用明确的构建上下文及基础镜像架构，不默认构建全部镜像。

## 安装和更新

```bash
curl -fL --retry 3 https://raw.githubusercontent.com/oneclickvirt/dockerfile-templates/main/scripts/install_agent.py -o install_agent.py
python3 install_agent.py --client codex
```

可将下载地址改为 `https://cnb.cool/oneclickvirt/dockerfile-templates/-/git/raw/main/scripts/install_agent.py`，并使用 `--source cnb` 从 CNB 的固定提交安装；此模式另需 Git。

用 `--client claude` 或 `--client openclaw` 选择其他客户端。重新下载并执行可更新；`--ref` 固定源码标签或提交。安装前校验全部 SHA-256，保留额外本地文件及已有客户端设置，`install.json` 记录来源提交。

此仓库发布 Skill，不安装 MCP 服务端；按原有脚本或开发接口操作。

## 对应源码与说明


- [集成安装说明 / Integration guide](https://www.spiritlhl.net/guide/agent_integrations.html)

给出操作命令前核对这些源码文件及当前文档，保留现有版本固定、数据路径和宿主机标识。报告测试时区分真实程序执行、隔离测试及未验证的环境。
