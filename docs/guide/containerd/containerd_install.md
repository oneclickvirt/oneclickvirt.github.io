---
outline: deep
---

# 安装与卸载 containerd

统一的无交互开关和交互流程见[节点环境的交互与自动化](../oneclickvirt/environment_modes.md)。

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

## 安装 containerd 环境

```bash
bash <(wget -qO- https://raw.githubusercontent.com/oneclickvirt/containerd/main/containerdinstall.sh)
```

无交互安装统一使用：

```bash
export noninteractive=true
bash <(wget -qO- https://raw.githubusercontent.com/oneclickvirt/containerd/main/containerdinstall.sh)
```

可配合环境变量覆盖默认值：

```bash
export noninteractive=true
export NEED_DISK_LIMIT=y
export CONTAINERD_POOL_SIZE=20
export CONTAINERD_INSTALL_PATH=/var/lib/containerd
export CONTAINERD_LOOP_FILE=/opt/containerd-pool.img
export CONTAINERD_MAIN_INTERFACE=eth0
export CONTAINERD_IPV6_SUBNET_PREFIX=80
export CONTAINERD_IPV6_SUBNET_INDEX=1
bash <(wget -qO- https://raw.githubusercontent.com/oneclickvirt/containerd/main/containerdinstall.sh)
```

常用安装环境变量：

| 变量 | 说明 | 默认值 |
|------|------|--------|
| noninteractive | 设为 `true` 时使用默认值跳过交互提示 | unset |
| WITHOUTCDN | 设为 `TRUE` 时禁用 CDN 加速 | unset |
| NEED_DISK_LIMIT | 是否启用 btrfs 磁盘限制，支持 `y/yes/true/1` | n |
| CONTAINERD_INSTALL_PATH | containerd 数据目录 | /var/lib/containerd |
| CONTAINERD_POOL_SIZE | btrfs loop 存储池大小 GB | 20 |
| CONTAINERD_LOOP_FILE | btrfs loop 文件路径 | /opt/containerd-pool.img |
| CONTAINERD_MAIN_INTERFACE | 指定宿主机出口网卡，供 NAT/NDP 使用 | 自动检测 |
| CONTAINERD_IPV6_SUBNET_PREFIX | 从宿主机 IPv6 父网段切出的 CNI 子网前缀 | 80 |
| CONTAINERD_IPV6_SUBNET_INDEX | 优先选择的 IPv6 CNI 子网序号（从 0 开始；显式设置时不会自动换号） | 1 |
| NDPRESPONDER_SOURCE_URL | responder 官方镜像不可用或架构不符时用于本地构建的 Git 源码地址 | https://github.com/oneclickvirt/ndpresponder.git |

## 卸载（完整清理）

一键卸载 containerd 全套环境，包括所有容器、镜像、CNI 网络、systemd 服务、二进制文件：

```bash
bash <(wget -qO- https://raw.githubusercontent.com/oneclickvirt/containerd/main/containerduninstall.sh)
```

脚本会在执行前要求输入 `yes` 确认，操作不可逆。

无交互卸载统一使用：

```bash
export noninteractive=true
bash <(wget -qO- https://raw.githubusercontent.com/oneclickvirt/containerd/main/containerduninstall.sh)
```

## 安装检查

```bash
nerdctl ps -a
```

安装时间较长时建议在 screen 或 tmux 中运行，避免 SSH 中断。

## 国内下载入口

上述 GitHub Raw 安装、卸载及开设脚本的地址均可加上 `https://cdn.spiritlhl.net/` 前缀。例如安装：

```bash
bash <(curl -sSL https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/containerd/main/containerdinstall.sh)
```

无需加速时使用原始 GitHub 地址；`export WITHOUTCDN=TRUE` 可禁用脚本内部 CDN 探测。
