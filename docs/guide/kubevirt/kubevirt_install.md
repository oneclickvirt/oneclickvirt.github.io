---
outline: deep
---

# 前言

安装 KubeVirt 环境，包含 k3s + KubeVirt + 网络配置 + 端口转发全套组件

## 开设虚拟内存

:::tip
内存开点 swap 免得机器炸了
:::

单位换算：输入 1024 产生 1G SWAP-虚拟内存，虚拟内存占用硬盘空间，当实际内存不够用时将自动使用虚拟内存做内存使用，但随之带来IO高占用以及CPU性能占用

建议只开实际内存大小两倍大小的虚拟内存

国际

```shell
curl -L https://raw.githubusercontent.com/spiritLHLS/addswap/main/addswap.sh -o addswap.sh && chmod +x addswap.sh && bash addswap.sh
```

国内

```shell
curl -L https://cdn.spiritlhl.net/https://raw.githubusercontent.com/spiritLHLS/addswap/main/addswap.sh -o addswap.sh && chmod +x addswap.sh && bash addswap.sh
```

## 环境安装

- 支持系统：Debian 11+、Ubuntu 20.04+
- 自动安装 k3s（轻量级 Kubernetes）
- 自动部署 KubeVirt operator 和 CDI（Containerized Data Importer）
- 自动配置网络插件（Flannel）和端口转发
- 自动检测公网 IPv6 地址并配置 IPv6 网络（如存在）
- 支持 x86_64 和 ARM64 架构的服务器

国际

```shell
bash <(wget -qO- https://raw.githubusercontent.com/oneclickvirt/kubevirt/main/scripts/kubevirtinstall.sh)
```

国内

```shell
bash <(wget -qO- https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/kubevirt/main/scripts/kubevirtinstall.sh)
```

:::tip
安装完成后建议执行 `kubectl get pods -n kubevirt` 验证 KubeVirt 环境是否正常运行，所有 Pod 应处于 `Running` 状态。
:::

:::warning
k3s + KubeVirt 安装时间较长（通常 5~15 分钟），请在 screen 或 tmux 中执行，避免 SSH 断开导致安装失败。
:::

## 卸载 KubeVirt 环境

一键卸载全套环境，包括所有虚拟机、k3s、KubeVirt 及辅助文件：

国际

```shell
bash <(wget -qO- https://raw.githubusercontent.com/oneclickvirt/kubevirt/main/scripts/kubevirtuninstall.sh)
```

国内

```shell
bash <(wget -qO- https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/kubevirt/main/scripts/kubevirtuninstall.sh)
```

:::warning
脚本会在执行前要求输入 `yes` 确认，操作不可逆。删除内容包括所有虚拟机、镜像、k3s 及 KubeVirt 全部组件。
复测流程：先执行卸载，再执行安装，即可从零验证整个安装流程。
:::
