---
outline: deep
---

# 常见问题答疑

## podman: command not found

Podman 环境未正确安装，请重新执行安装脚本：

国际

```shell
bash <(curl -sSL https://raw.githubusercontent.com/oneclickvirt/podman/main/podmaninstall.sh)
```

国内

```shell
bash <(curl -sSL https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/podman/main/podmaninstall.sh)
```

## 容器无法访问外网（IPv4）

检查 iptables NAT 规则是否存在：

```shell
iptables -t nat -L POSTROUTING -n -v | grep 172.21
```

如果没有，手动添加：

```shell
iptables -t nat -A POSTROUTING -s 172.21.0.0/16 ! -d 172.21.0.0/16 -j MASQUERADE
iptables -A FORWARD -s 172.21.0.0/16 -j ACCEPT
iptables -A FORWARD -d 172.21.0.0/16 -j ACCEPT
```

## 容器 IPv6 未生效

1. 确认宿主机有公网 IPv6 地址
2. 检查 podman-ipv6 网络是否存在：

```shell
podman network ls | grep ipv6
```

3. 检查 ndpresponder 容器是否运行：

```shell
podman ps | grep ndpresponder
```

## Podman 与 Docker 命令对比

| 功能 | Docker 命令 | Podman 命令 |
|------|------------|------------|
| 查看容器 | `docker ps -a` | `podman ps -a` |
| 进入容器 | `docker exec -it` | `podman exec -it` |
| 删除容器 | `docker rm -f` | `podman rm -f` |
| 查看镜像 | `docker images` | `podman images` |
| 删除镜像 | `docker rmi` | `podman rmi` |
| 查看日志 | `docker logs` | `podman logs` |

## 镜像拉取失败

优先通过 GitHub Releases 下载离线 tar 包，无法访问时回退到 ghcr.io：

```shell
ghcr.io/oneclickvirt/podman:<os>-amd64
ghcr.io/oneclickvirt/podman:<os>-arm64
ghcr.io/oneclickvirt/podman:<os>   # multi-arch manifest
```

手动拉取镜像示例：

```shell
podman pull ghcr.io/oneclickvirt/podman:debian-amd64
```

## 如何完全重置 Podman 环境

先卸载，再重新安装：

国际

```shell
bash <(curl -sSL https://raw.githubusercontent.com/oneclickvirt/podman/main/podmanuninstall.sh)
bash <(curl -sSL https://raw.githubusercontent.com/oneclickvirt/podman/main/podmaninstall.sh)
```

国内

```shell
bash <(curl -sSL https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/podman/main/podmanuninstall.sh)
bash <(curl -sSL https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/podman/main/podmaninstall.sh)
```

## Podman 与 containerd 如何选择

- 如需 daemonless 无守护进程架构，或希望使用系统包管理安装，选 **Podman**
- 如需更轻量的守护进程 + nerdctl 命令行体验，选 **containerd**
- 如需同时运行 KVM 虚拟机（Windows/macOS/Android），选 **docker** 或 **PVE/Incus/LXD** 方案

## DNS 问题

Podman 安装时会配置 check-dns-podman.service 服务，检查是否运行：

```shell
systemctl status check-dns-podman
```

手动修复 DNS：

```shell
echo "nameserver 8.8.8.8" >> /etc/resolv.conf
echo "nameserver 1.1.1.1" >> /etc/resolv.conf
```

## 无 CDN 模式（WITHOUTCDN）

如果服务器网络非常好无需加速，或希望完全禁用 CDN 加速，可在执行脚本前设置：

```shell
export WITHOUTCDN=TRUE
```

也可以只对单次命令生效：

```shell
WITHOUTCDN=TRUE
```

设置后，脚本执行过程中将不再尝试使用 CDN 加速地址。

