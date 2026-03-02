---
outline: deep
---

# 前言

安装 containerd 环境，包含 containerd + runc + nerdctl + CNI + buildkitd 全套组件

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

- 支持系统：Ubuntu、Debian、RockyLinux 9+、AlmaLinux 9+、CentOS 9+、Alpine、Arch
- 安装 containerd + runc + nerdctl + CNI + buildkitd（通过 nerdctl-full bundle）
- 自动配置 CNI 网络（containerd-net：172.20.0.0/16）并设置 iptables NAT 规则
- 检测公网 IPV6 地址，若存在则自动创建 containerd-ipv6 CNI 网络并启动 NDP Responder
- 安装 DNS 保活服务（check-dns.service），持续检测 DNS 可用性
- 支持 x86_64 和 ARM64 架构的服务器

国际

```shell
bash <(wget -qO- https://raw.githubusercontent.com/oneclickvirt/containerd/main/containerdinstall.sh)
```

国内

```shell
bash <(wget -qO- https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/containerd/main/containerdinstall.sh)
```

:::tip
安装完成后建议执行 `nerdctl ps -a` 验证 containerd 环境是否正常运行
:::

## 卸载 containerd 环境

一键卸载 containerd 全套环境，包括所有容器、镜像、CNI 网络、systemd 服务、nerdctl/containerd 二进制文件：

国际

```shell
bash <(wget -qO- https://raw.githubusercontent.com/oneclickvirt/containerd/main/containerduninstall.sh)
```

国内

```shell
bash <(wget -qO- https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/containerd/main/containerduninstall.sh)
```

:::warning
脚本会在执行前要求输入 `yes` 确认，操作不可逆。删除内容包括所有容器、镜像、CNI 网络配置。
复测流程：先执行卸载，再执行安装，即可从零验证整个安装流程。
:::
