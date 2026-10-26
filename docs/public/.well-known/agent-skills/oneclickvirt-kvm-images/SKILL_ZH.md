---
name: oneclickvirt-kvm-images
description: "查找并校验 kvm_images 中适用于目标虚拟化环境的系统镜像产物。"
metadata:
  repository: oneclickvirt/kvm_images
  integration-version: "1.0.0"
---

# kvm_images

## 使用范围

查找并校验 kvm_images 中适用于目标虚拟化环境的系统镜像产物。

- 用 release_assets 查询所需操作系统的实际标签；latest 仅代表最近一次发布，不代表全部发行版目录。
- 按系统及架构过滤真实文件名；结果为空即为不可用，不自动以 amd64 替代 ARM64。
- 区分 rootfs/LXC、Incus/LXD 元数据配对、QCOW2/KVM 和 ISO，导入前核对校验及验证信息，不将模板当作程序执行。

## 安装和更新

```bash
curl -fL --retry 3 https://raw.githubusercontent.com/oneclickvirt/kvm_images/main/scripts/install_agent.py -o install_agent.py
python3 install_agent.py --client codex
```

可将下载地址改为 `https://cnb.cool/oneclickvirt/kvm_images/-/git/raw/main/scripts/install_agent.py`，并使用 `--source cnb` 从 CNB 的固定提交安装；此模式另需 Git。

用 `--client claude` 或 `--client openclaw` 选择其他客户端。重新下载并执行可更新；`--ref` 固定源码标签或提交。安装前校验全部 SHA-256，保留额外本地文件及已有客户端设置，`install.json` 记录来源提交。

## MCP

运行需要 Python 3.9 以上版本；MCP 使用本机已有程序及其权限，不自动安装虚拟化环境。将安装目录内对应客户端的 `mcp.codex.toml`、`mcp.claude.json` 或 `mcp.openclaw.json` 合并到已有配置。远端宿主机应通过无交互 SSH 运行该主机上的适配器。

先调用 `integration_info` 查看能力和运行要求。

`release_assets` 返回实际版本、文件名、大小、摘要及下载地址；需要固定版本时传完整标签。更新产物后应重新安装并验证帮助和实际调用，不能只因文件存在便判定可用。

## 对应源码与说明


- [集成安装说明 / Integration guide](https://www.spiritlhl.net/guide/agent_integrations.html)

给出操作命令前核对这些源码文件及当前文档，保留现有版本固定、数据路径和宿主机标识。报告测试时区分真实程序执行、隔离测试及未验证的环境。
