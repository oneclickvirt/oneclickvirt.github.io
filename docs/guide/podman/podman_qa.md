---
outline: deep
---

# 常见问题答疑

## 镜像说明

本仓库自编镜像通过 GitHub Actions 使用 Podman/Buildah 构建，发布到 Releases 及 ghcr.io：

| 系统 | amd64 | arm64 |
|------|-------|-------|
| Ubuntu 22.04 | spiritlhl_ubuntu_amd64.tar.gz | spiritlhl_ubuntu_arm64.tar.gz |
| Debian 12 | spiritlhl_debian_amd64.tar.gz | spiritlhl_debian_arm64.tar.gz |
| Alpine latest | spiritlhl_alpine_amd64.tar.gz | spiritlhl_alpine_arm64.tar.gz |
| AlmaLinux 9 | spiritlhl_almalinux_amd64.tar.gz | spiritlhl_almalinux_arm64.tar.gz |
| RockyLinux 9 | spiritlhl_rockylinux_amd64.tar.gz | spiritlhl_rockylinux_arm64.tar.gz |
| OpenEuler 22.03 | spiritlhl_openeuler_amd64.tar.gz | spiritlhl_openeuler_arm64.tar.gz |

同时推送至 ghcr.io，支持 multi-arch manifest：
- `ghcr.io/oneclickvirt/podman:<os>-amd64`
- `ghcr.io/oneclickvirt/podman:<os>-arm64`
- `ghcr.io/oneclickvirt/podman:<os>`（multi-arch manifest list）

创建容器时会优先拉取 `PODMAN_GHCR_IMAGE:<os>-<arch>`，拉取失败后再下载 `PODMAN_RELEASE_BASE_URL/<os>/spiritlhl_<os>_<arch>.tar.gz` 并加载为本地镜像。

## 网络说明

- IPv4 网络名: `podman-net`，bridge: `podman-br0`，subnet: `172.20.0.0/16`
- IPv6 网络名: `podman-ipv6`，bridge: `podman-br1`。安装器只使用宿主机本地绑定的公网 IPv6 CIDR，不会把外部出口 API 返回的单个地址伪造成可分配网段；多个地址同时存在时会优先选择可分配的较大前缀，例如 PVE 的委派 `/38` 不会被上联 `/128` 遮蔽。
- 安装器会从宿主机前缀中选择不包含宿主地址的更小 sibling 子网。若 Netavark 因 SLAAC 或其他宿主路由重叠而拒绝公网子网，会改用 `mode=manual`：CNI 侧使用隔离 ULA，容器启动后由安装器将公网父前缀中的独立 `/128` 路由到容器，不会再次把重叠网段交给 Netavark。
- 只有单个公网 `/128`、过窄前缀或手动路由模式不可用时，会改用 `mode=nat` 的 ULA NAT66。该模式保留容器 IPv6 出站，但不会承诺可从互联网直连的公网 `/128`。
- 手动路由和已有的 `mode=unmanaged` 网络会同时保留 `podman-net` 的 IPv4 NAT、`-p` 端口映射及 IPv4 默认路由；IPv6 网络只提供 IPv6 路由。公网 IPv6 不做 NAT 或 IPv6 端口转发，默认拒绝的防火墙需允许上联网卡与 `podman-br1` 间的 IPv6 转发。
- NDP responder 只在实际 IPv6 上联是以太网且需要邻居发现时启动，通过 Podman 的 Docker 兼容 API socket 跟踪 `podman-ipv6` 地址。NAT66 与 SIT、6in4、ip6tnl 等非以太网隧道不依赖 responder，创建容器时不会因其未运行而退回 IPv4。
- 使用独立于 containerd/docker 版本的网络和状态目录；共用宿主机时仍需规划端口、网段与资源，避免冲突

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

先检查实际网络与转发状态，再决定是否修复防火墙。`podman-net` 默认使用 `172.20.0.0/16`，自定义环境以 inspect 输出为准；Netavark 也可能使用 nftables，而非 iptables。

```bash
podman network inspect podman-net
sysctl net.ipv4.ip_forward
iptables -t nat -L POSTROUTING -n -v
nft list ruleset
```

## 容器 IPv6 未生效

先按上方网络说明确认实际模式和容器地址：公网路由、手动路由和 ULA NAT66 的要求不同。只有需要 NDP 的以太网上联才必须检查 responder；NAT66 和非以太网隧道不要求它。

```bash
ip -6 route
podman network inspect podman-ipv6
podman inspect ct1
podman ps -a --filter name=ndpresponder
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

脚本优先 GHCR，失败后加载 Releases 离线包。检查两类地址的连通性及系统别名是否受支持。手动拉取示例：

```bash
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
