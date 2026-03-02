---
outline: deep
---

# 前言

安装 Podman 环境，包含 podman + 网络配置 + DNS 保活服务全套组件

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
- 通过各发行版官方软件包安装 Podman（daemonless 架构，无需 Docker daemon）
- 自动配置 Podman 网络（podman-net：172.21.0.0/16）
- 检测公网 IPv6 地址，若存在则自动创建 podman-ipv6 网络并启动 NDP Responder
- 安装 DNS 保活服务（check-dns-podman.service），持续检测 DNS 可用性
- 支持 x86_64 和 ARM64 架构的服务器

国际

```shell
bash <(wget -qO- https://raw.githubusercontent.com/oneclickvirt/podman/main/podmaninstall.sh)
```

国内

```shell
bash <(wget -qO- https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/podman/main/podmaninstall.sh)
```

:::tip
安装完成后建议执行 `podman ps -a` 验证 Podman 环境是否正常运行
:::

## 卸载 Podman 环境

一键卸载 Podman 全套环境，包括所有容器、镜像、网络、辅助文件：

国际

```shell
bash <(wget -qO- https://raw.githubusercontent.com/oneclickvirt/podman/main/podmanuninstall.sh)
```

国内

```shell
bash <(wget -qO- https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/podman/main/podmanuninstall.sh)
```

:::warning
脚本会在执行前要求输入 `yes` 确认，操作不可逆。删除内容包括所有容器、镜像、Podman 网络配置。
复测流程：先执行卸载，再执行安装，即可从零验证整个安装流程。
:::
