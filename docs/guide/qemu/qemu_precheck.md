---
outline: deep
---

# 前言

## 项目特点

- 使用 [QEMU/KVM](https://www.qemu.org/) + [libvirt](https://libvirt.org/) 安装完整虚拟化环境
- 使用 qcow2 云镜像，依次尝试组织镜像仓库和发行版上游，自动下载并使用 cloud-init 初始化
- 支持系统：Debian 10/11/12/13、Ubuntu 18/20/22/24、AlmaLinux 8/9、RockyLinux 8/9、OpenEuler 22
- 支持架构：amd64、arm64
- 网络模式：libvirt NAT（virbr0），通过 nftables 或 iptables 进行端口映射；新安装网络支持 ULA IPv6 NAT
- 虚拟机信息记录在 `/root/vmlog`

## 支持的系统（宿主机）

建议使用维护中的Debian、Ubuntu系统。安装器也包含CentOS、AlmaLinux、RockyLinux、Oracle Linux、Amazon Linux、Fedora、Arch和Alpine分支，需要对应系统的软件源能提供所需依赖。开设虚拟机支持amd64和arm64架构。

## 配置要求

| 项目 | 最低要求 |
|------|---------|
| CPU | 推荐 VT-x/AMD-V 或嵌套虚拟化以启用 KVM 加速；缺少 KVM 时可能使用较慢的 QEMU 模拟 |
| 内存 | 宿主机剩余 >= 虚拟机内存 + 512MB |
| 磁盘 | 宿主机剩余 >= 虚拟机磁盘 × 台数，另预留镜像缓存空间 |

## 检查 KVM

x86 宿主机可检查 CPU 虚拟化标志和设备；ARM64 宿主机直接检查 KVM 设备。缺少 KVM 时 QEMU 模拟速度较慢。

```bash
egrep -c '(vmx|svm)' /proc/cpuinfo
ls -l /dev/kvm
```

## 使用入口与更新

继续阅读[环境安装](qemu_install.md)和[实例开设](qemu_build.md)。版本变更见[更新日志](https://github.com/oneclickvirt/qemu/blob/main/CHANGELOG.md)。
