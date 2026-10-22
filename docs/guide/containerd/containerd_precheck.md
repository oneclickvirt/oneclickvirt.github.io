---
outline: deep
---

# 前言

本方案创建 Linux 容器，不要求 KVM，不用于创建 QEMU 虚拟机。

## 项目特点

- 使用 [nerdctl-full](https://github.com/containerd/nerdctl) 安装 containerd + runc + nerdctl + CNI + buildkitd 全套组件
- 使用本仓库自编译的基础镜像，默认从 GitHub Releases 离线包加载；如配置 `CONTAINERD_IMAGE_REGISTRY`，则在离线包不可用时回退尝试该 registry
- 默认创建非特权容器，支持端口映射、IPv6 和资源限制；宿主机安装 lxcfs 后可挂载容器内的资源视图。

## 支持的系统

| 系统 | amd64 | arm64 |
| --- | --- | --- |
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
- 网络可访问 GitHub Raw、Releases 及本方案使用的镜像仓库
- 空闲硬盘有 3G 以上即可
- **不需要 KVM 硬件支持**

## 使用入口与更新

继续阅读[环境安装](containerd_install.md)和[实例开设](containerd_build.md)。版本变更见[更新日志](https://github.com/oneclickvirt/containerd/blob/main/CHANGELOG.md)。
