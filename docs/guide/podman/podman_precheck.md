---
outline: deep
---

# 前言

以下为非自定义部分的介绍，自定义部分有自己对应的介绍，勿弄混了

如果你的宿主机本身没有IPV6的子网又想给容器分配IPV6地址，需要宿主机本身已有公网IPV6地址，安装脚本会自动检测并配置

:::warning
Podman 方案**不支持 KVM/QEMU 虚拟机**，仅支持 Linux 容器（LXC），适用于无 KVM 硬件虚拟化支持的环境。
:::

欢迎给项目一个 ```Star``` 进行免费的支持-->[https://github.com/oneclickvirt/podman](https://github.com/oneclickvirt/podman)

## 项目特点

基于 Podman（daemonless 架构）运行时，通过批量或单独开设 NAT 服务器

- 使用各发行版官方软件包安装 Podman（无守护进程，daemonless 架构）
- 使用本仓库自编译的基础镜像（存储在 GitHub Releases），优先离线加载，无法获取时回退到 ghcr.io 镜像
- 每个容器自带 1 个外网 SSH 端口，25 个内外网一致端口，可选择是否绑定独立 IPV6 地址
- 支持 lxcfs 挂载（若宿主机安装了 lxcfs），提供容器内真实 /proc 视图
- 原生支持 rootless（本方案使用 root 运行以简化网络配置）
- 支持国内 CDN 镜像加速

## 支持的系统

| 系统 | amd64 | arm64 |
|------|-------|-------|
| Ubuntu 22.04 | ✓ | ✓ |
| Debian 12 | ✓ | ✓ |
| Alpine latest | ✓ | ✓ |
| AlmaLinux 9 | ✓ | ✓ |
| RockyLinux 9 | ✓ | ✓ |
| OpenEuler 22.03 | ✓ | ✓ |

## 配置要求

- 宿主机系统：Ubuntu、Debian、RockyLinux 9+、AlmaLinux 9+、CentOS 9+、Alpine、Arch
- 架构：x86_64（amd64）或 ARM64
- 内核需支持 overlay 文件系统
- 网络能连接 Github 的 raw 界面即可
- 空闲硬盘有 3G 以上即可
- **不需要 KVM 硬件支持**