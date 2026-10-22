---
outline: deep
---

# 前言

本方案创建 Linux 容器，不要求 KVM，不用于创建 QEMU 虚拟机。

## 项目特点

- 使用各发行版官方软件包安装 Podman（无守护进程，daemonless 架构）
- 使用本仓库自编译的基础镜像，优先从 ghcr.io 拉取，无法获取时回退到 GitHub Releases 离线包
- 支持端口映射、IPv6 和资源限制；宿主机已安装 lxcfs 时，可挂载容器内的资源视图。

## 架构

```text
podmaninstall.sh -> Podman 与依赖 -> 存储、网络和内核配置 -> podman-net / podman-ipv6
create_podman.sh -> onepodman.sh -> GHCR 镜像或 Releases 离线包
                               -> 容器 entrypoint 与 SSH 初始化 -> ctlog
podmanuninstall.sh -> 清理容器、镜像、网络和项目状态
```

## 与 containerd/docker 版本对比

| 特性 | 本项目（Podman） | oneclickvirt/containerd | oneclickvirt/docker |
|------|----------------|------------------------|---------------------|
| 守护进程 | 无（daemonless） | containerd | Docker daemon |
| 运行时 | crun/runc | runc | runc |
| rootless 支持 | 原生支持 | 不支持 | 需配置 |
| 镜像格式 | OCI | OCI | OCI |
| 网络后端 | netavark/CNI | CNI | Docker bridge |
| 构建工具 | Buildah/podman-build | buildkitd | Docker buildx |
| 安装方式 | 系统包管理器 | nerdctl-full bundle | Docker 官方脚本 |

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

继续阅读[环境安装](podman_install.md)和[实例开设](podman_build.md)。版本变更见[更新日志](https://github.com/oneclickvirt/podman/blob/main/CHANGELOG.md)。
