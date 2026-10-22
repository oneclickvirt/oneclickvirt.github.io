---
outline: deep
---

# 前言

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

## 环境安装

```bash
bash <(wget -qO- https://raw.githubusercontent.com/oneclickvirt/podman/main/podmaninstall.sh)
```

无交互安装可使用：

```bash
export noninteractive=true
bash <(wget -qO- https://raw.githubusercontent.com/oneclickvirt/podman/main/podmaninstall.sh)
```

可选环境变量：

| 变量 | 说明 | 默认值 |
|------|------|--------|
| noninteractive | 设为 true 时跳过所有交互提示 | false |
| WITHOUTCDN | 设为 true 时禁用 CDN 探测与加速 | false |
| NEED_DISK_LIMIT | 是否启用 btrfs 容器磁盘限制 | n |
| PODMAN_INSTALL_PATH | Root Podman 存储路径，会写入 `storage.conf` 的 `graphroot` | /var/lib/containers/storage |
| PODMAN_POOL_SIZE | btrfs loop 存储池大小 GB | 20 |
| PODMAN_LOOP_FILE | btrfs loop 镜像文件路径 | /opt/podman-pool.img |
| PODMAN_ROOTLESS_USER | 安装阶段为指定用户配置 rootless Podman 的 subuid/subgid | 空 |
| PODMAN_ROOTLESS_CREATE_USER | 配合 PODMAN_ROOTLESS_USER 自动创建缺失用户 | false |
| PODMAN_ROOTLESS_SUBUID_START | rootless subuid 起始值 | 100000 |
| PODMAN_ROOTLESS_SUBGID_START | rootless subgid 起始值 | 100000 |
| PODMAN_IPV6_SUBNET | 可选：显式指定已路由的公网 IPv6 子网；不能包含宿主机已绑定地址 | 自动从本机前缀选择 |
| NDPRESPONDER_SOURCE_URL | responder 镜像拉取失败或架构不符时使用的 Git 构建源 | https://github.com/oneclickvirt/ndpresponder.git |

## 卸载 Podman 环境

一键卸载 Podman 全套环境，包括所有容器、镜像、网络、辅助文件：

```bash
bash <(wget -qO- https://raw.githubusercontent.com/oneclickvirt/podman/main/podmanuninstall.sh)
```

脚本会在执行前要求输入 `yes` 确认，操作不可逆。无交互卸载可先执行 `export noninteractive=true`，也兼容 `FORCE_UNINSTALL=true`。

## 安装检查

```bash
podman ps -a
```

安装时间较长时建议在 screen 或 tmux 中运行，避免 SSH 中断。

## 国内下载入口

上述 GitHub Raw 安装、卸载及开设脚本的地址均可加上 `https://cdn.spiritlhl.net/` 前缀。例如安装：

```bash
bash <(curl -sSL https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/podman/main/podmaninstall.sh)
```

无需加速时使用原始 GitHub 地址；`export WITHOUTCDN=TRUE` 可禁用脚本内部 CDN 探测。
