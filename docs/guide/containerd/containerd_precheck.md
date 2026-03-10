---
outline: deep
---

# 前言

以下为非自定义部分的介绍，自定义部分有自己对应的介绍，勿弄混了

如果你的宿主机本身没有IPV6的子网又想给容器分配IPV6地址，需要宿主机本身已有公网IPV6地址，安装脚本会自动检测并配置

:::warning
containerd 方案**不支持 KVM/QEMU 虚拟机**，仅支持 Linux 容器（LXC），适用于无 KVM 硬件虚拟化支持的环境。
:::

欢迎给项目一个 ```Star``` 进行免费的支持-->[https://github.com/oneclickvirt/containerd](https://github.com/oneclickvirt/containerd)

## 项目特点

基于 containerd + nerdctl 运行时，通过批量或单独开设 NAT 服务器

- 使用 [nerdctl-full](https://github.com/containerd/nerdctl) 安装 containerd + runc + nerdctl + CNI + buildkitd 全套组件
- 使用本仓库自编译的基础镜像（存储在 GitHub Releases），优先离线加载，无法获取时回退到官方镜像
- 每个容器自带 1 个外网 SSH 端口，25 个内外网一致端口，可选择是否绑定独立 IPV6 地址
- 默认创建非特权容器，支持 lxcfs 挂载（若宿主机安装了 lxcfs）
- 支持磁盘限制参数（需 xfs/btrfs snapshotter 支持 storage-opt）
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