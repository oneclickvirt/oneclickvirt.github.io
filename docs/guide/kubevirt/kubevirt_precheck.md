---
outline: deep
---

# 前言

以下为非自定义部分的介绍，自定义部分有自己对应的介绍，勿弄混了

欢迎给项目一个 ```Star``` 进行免费的支持-->[https://github.com/oneclickvirt/kubevirt](https://github.com/oneclickvirt/kubevirt)

## 项目特点

基于 KubeVirt 在 Kubernetes 集群（k3s）上一键部署并管理 KVM 虚拟机，通过批量或单独开设 KVM 虚拟机

- 一键部署 k3s + KubeVirt 全套环境
- 基于 KubeVirt CRD，在 Kubernetes 环境中管理虚拟机
- 每台虚拟机自带独立 SSH 端口及端口映射
- 支持 IPv4/IPv6 自动分配与端口转发
- 支持批量开设，信息自动记录至日志文件
- 支持 X86_64 和 ARM64 架构
- 支持国内 CDN 镜像加速

## 支持的系统（宿主机）

| 系统 | amd64 | arm64 |
|------|-------|-------|
| Debian 11 | ✓ | ✓ |
| Debian 12 | ✓ | ✓ |
| Ubuntu 20.04 | ✓ | ✓ |
| Ubuntu 22.04 | ✓ | ✓ |

## 配置要求

- 宿主机节点需支持 KVM 硬件虚拟化（`/dev/kvm` 可用）
- 内核版本：≥ 4.15
- 架构：x86_64（amd64）或 ARM64
- 内存：至少 4GB 可用内存（含 k3s + KubeVirt 自身占用）
- 存储：至少 20GB 可用磁盘空间
- 系统：Debian 11+、Ubuntu 20.04+

:::warning
使用本项目前请确保宿主机支持 KVM 虚拟化，可通过以下命令检测：

```bash
egrep -c '(vmx|svm)' /proc/cpuinfo
```

输出大于 0 即支持 KVM 虚拟化。也可执行 `ls /dev/kvm` 确认设备文件存在。
:::

:::tip
本项目会自动部署 k3s，无需提前准备 Kubernetes 集群。
:::

推荐在开设虚拟机前先增加部分 SWAP 虚拟内存，避免突发的内存占用导致宿主机卡死

国际

```shell
curl -L https://raw.githubusercontent.com/spiritLHLS/addswap/main/addswap.sh -o addswap.sh && chmod +x addswap.sh && bash addswap.sh
```

国内

```shell
curl -L https://cdn.spiritlhl.net/https://raw.githubusercontent.com/spiritLHLS/addswap/main/addswap.sh -o addswap.sh && chmod +x addswap.sh && bash addswap.sh
```
