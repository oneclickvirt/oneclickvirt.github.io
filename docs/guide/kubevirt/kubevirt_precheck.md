---
outline: deep
---

# 前言

## 项目特点

- 使用 K3s 作为轻量级 Kubernetes，自动安装单节点集群
- 使用 KubeVirt 提供虚拟机能力（基于 KVM/QEMU）
- 使用 CDI（Containerized Data Importer）导入云镜像
- 新建虚拟机通过 Kubernetes NodePort Service 实现稳定的 SSH 及额外 TCP/UDP 端口映射；旧映射可用 `update-port-rules.sh` 迁移
- 支持系统：Ubuntu 22.04/24.04, Debian 11/12, AlmaLinux 9, RockyLinux 9, CentOS 7, CentOS Stream 8/9, openSUSE Leap 15.5
- 支持架构：amd64 (x86_64)

## 支持的系统（宿主机）

Ubuntu 20.04/22.04/24.04、Debian 11/12，新安装建议使用仍在维护的版本。当前脚本仅支持amd64/x86_64架构，其他宿主机系统会提示未经测试并尝试继续，需要自行验证。

## 配置要求

- 推荐宿主机支持 KVM 虚拟化（`/dev/kvm` 可用）；加载模块后仍缺少设备时，安装器启用较慢的 QEMU TCG 模拟
- 最低配置：2 核 CPU，4GB RAM，20GB 可用磁盘
- root 权限运行
- 需要联网下载 K3s、KubeVirt 组件和虚拟机镜像，或提前准备对应的本地文件和镜像

## 工作原理

```text
宿主机：K3s + KubeVirt
├── KubeVirt Operator：虚拟机生命周期
├── CDI：导入云镜像到 PVC
├── virt-launcher Pod：QEMU/KVM 客体
└── 归属 VM 的 NodePort Service
    ├── 宿主机:25000 -> vm1 SSH:22
    └── 宿主机:34975-35000 -> vm1 额外 TCP/UDP 端口
```

Service 端点跟随替换后的 Pod 更新，避免 VM 重启换地址后映射失效。

## 使用入口与更新

继续阅读[环境安装](kubevirt_install.md)和[实例开设](kubevirt_build.md)。版本变更见[更新日志](https://github.com/oneclickvirt/kubevirt/blob/main/CHANGELOG.md)。
