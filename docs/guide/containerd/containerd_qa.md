---
outline: deep
---

# 常见问题答疑

## 镜像说明

本仓库常规镜像通过 GitHub Actions 构建并发布到 Releases：

| 系统 | amd64 | arm64 |
|------|-------|-------|
| Ubuntu 22.04 | spiritlhl_ubuntu_amd64.tar.gz | spiritlhl_ubuntu_arm64.tar.gz |
| Debian 12 | spiritlhl_debian_amd64.tar.gz | spiritlhl_debian_arm64.tar.gz |
| Alpine latest | spiritlhl_alpine_amd64.tar.gz | spiritlhl_alpine_arm64.tar.gz |
| AlmaLinux 9 | spiritlhl_almalinux_amd64.tar.gz | spiritlhl_almalinux_arm64.tar.gz |
| RockyLinux 9 | spiritlhl_rockylinux_amd64.tar.gz | spiritlhl_rockylinux_arm64.tar.gz |
| OpenEuler 22.03 | spiritlhl_openeuler_amd64.tar.gz | spiritlhl_openeuler_arm64.tar.gz |

在本仓库检出目录中检查本地镜像和远端 Releases 资产可用性：

```bash
bash scripts/containerd_manage.sh version-check debian
```

### CNB中的openEuler镜像

[CNB集中构建仓库](https://cnb.cool/oneclickvirt/virtualization-images)也会每日拉取本仓库main分支中的Dockerfile构建openEuler，可单独拉取：

```bash
nerdctl pull docker.cnb.cool/oneclickvirt/virtualization-images/containerd:openeuler-22.03
```

[CNB容器制品](https://cnb.cool/oneclickvirt/virtualization-images/-/packages)中可查看已发布标签。宿主机为X86_64且已安装对应运行环境时，也可直接开设：

```bash
install -d -m 700 /opt/oneclickvirt/containerd-openeuler
(umask 077; printf 'ROOT_PASSWORD=%s\n' "$(openssl rand -base64 24)" > /opt/oneclickvirt/containerd-openeuler/root.env)
nerdctl run -d --name containerd-openeuler --restart unless-stopped \
  --cpus 1 --memory 512m -p 25001:22 \
  --env-file /opt/oneclickvirt/containerd-openeuler/root.env \
  docker.cnb.cool/oneclickvirt/virtualization-images/containerd:openeuler-22.03
```

SSH连接宿主机```25001```端口，用户名为```root```，密码查看```/opt/oneclickvirt/containerd-openeuler/root.env```。已有同名容器或端口占用时需另行修改。本例仅映射IPv4端口，项目的IPv6网络配置仍按开设说明处理。

该标签按构建Runner的架构生成，不是多架构标签。现有开设脚本仍使用本仓库GitHub Release中的离线包，不会自动改用CNB镜像；原GitHub构建和发布工作流继续维护。

NDP responder另有[CNB源码及多架构镜像部署说明](../docker/docker_qa.md#cnb中的ndp-responder)。本运行环境的网络跟踪仍使用下方所述的CNI或兼容API方式，不能直接照搬静态地址示例替代安装器。

## 网络说明

- **IPv4**：通过 `-p` 端口映射（bridge 模式，CNI `containerd-net`）
- **出口网卡**：IPv4 NAT 沿用主出口；IPv6 NDP 按 IPv6 默认路由识别，缺少默认路由时才回退到已选 IPv6 前缀所在接口。PVE 上联 `/128` 与委派 `/38` 并存时，委派前缀仍可作为地址池。
- **IPv6（独立地址）**：安装时只接受宿主机本地绑定的公网 IPv6 父前缀，不把外部出口检测结果伪造成 `/64`。默认从父前缀切出 `/80` CNI 子网，并跳过包含任意宿主机地址的候选子网；父前缀的覆盖路由本身不会阻止 CNI 使用其不含宿主地址的子网，CNI 会安装更精确路由，因此 PVE 委派前缀和常规 NDP-backed `/64` 均可继续分配公网独立地址。单个 `/128`、过窄前缀或已有相同/更精确路由时会使用隔离 ULA NAT66，保留 IPv6 出站但不分配公网独立地址；发现其他 CNI 配置冲突时则保留原配置并停止独立 IPv6 设置。
- **NDP**：`containerd-ipv6` 使用 CNI `host-local` 租约，NDP responder 只读监听 `/var/lib/cni/networks/containerd-ipv6`，不依赖 Docker API。仅以太网 IPv6 上联需要它；NAT66 及 SIT、6in4、ip6tnl 等非以太网隧道不要求 responder，容器创建不会因此退回 IPv4。官方镜像不可拉取、架构错误或 ARMv7 无发布标签时，安装脚本会浅克隆 `NDPRESPONDER_SOURCE_URL` 后从本地上下文构建并重新校验镜像，构建失败时不会替换已有 responder。需要 NDP 的场景只有 CNI 配置创建、responder 启动和存活检查均成功时才启用独立 IPv6。
- **DNS 保活**：通过 `check-dns.service` 系统服务持续检测 DNS 可用性

## 独立 IPv6 的地址持久化

新建的独立 IPv6 容器通过 nerdctl `--ip6` 固定地址，停启和宿主重启后复用该地址。
分配记录保存在 `/var/lib/oneclickvirt/containerd-ipv6/`，仅 root 可访问；创建使用文件锁，避让已有记录及正在使用的 CNI 租约。
删除容器后保留记录，以便同名重建复用地址；请勿在仍有对应容器时清理记录。
旧容器不自动改网，需在备份后重建以应用固定地址。自定义 nerdctl/CNI 网络的静态地址应统一规划，避免与本脚本的地址池重叠。
如果当前 nerdctl 不支持 `--ip6`、分配记录损坏或地址池耗尽，创建会明确失败，不会宣称已获得持久 IPv6。

## nerdctl: command not found

containerd 环境未正确安装或 `/usr/local/bin` 不在 PATH 中

解决方法：

```shell
export PATH="/usr/local/bin:$PATH"
echo 'export PATH="/usr/local/bin:$PATH"' >> /etc/profile
source /etc/profile
```

如果仍然没有，请重新执行安装脚本：

国际

```shell
bash <(curl -sSL https://raw.githubusercontent.com/oneclickvirt/containerd/main/containerdinstall.sh)
```

国内

```shell
bash <(curl -sSL https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/containerd/main/containerdinstall.sh)
```

## containerd 服务未启动

```shell
systemctl status containerd
systemctl restart containerd
```

查看日志：

```shell
journalctl -u containerd -f
```

## 容器无法访问外网（IPv4）

检查 iptables NAT 规则是否存在：

```shell
iptables -t nat -L POSTROUTING -n -v | grep 172.20
```

如果没有，手动添加：

```shell
iptables -t nat -A POSTROUTING -s 172.20.0.0/16 ! -d 172.20.0.0/16 -j MASQUERADE
iptables -A FORWARD -s 172.20.0.0/16 -j ACCEPT
iptables -A FORWARD -d 172.20.0.0/16 -j ACCEPT
```

## 容器 IPv6 未生效

先按上方网络说明确认实际模式和容器地址：公网路由、手动路由和 ULA NAT66 的要求不同。只有需要 NDP 的以太网上联才必须检查 responder；NAT66 和非以太网隧道不要求它。

```bash
ip -6 route
cat /etc/cni/net.d/20-containerd-ipv6.conflist
nerdctl inspect ct1
nerdctl ps -a --filter name=ndpresponder
```

## 镜像拉取失败

优先尝试国内 CDN 加速，脚本内置 CDN 检测，也可手动切换：

```shell
# 测试 CDN 是否可用
curl -4 -sL -k "https://cdn0.spiritlhl.top/https://raw.githubusercontent.com/spiritLHLS/ecs/main/back/test" --max-time 6
```

## 如何完全重置 containerd 环境

先卸载，再重新安装：

国际

```shell
bash <(curl -sSL https://raw.githubusercontent.com/oneclickvirt/containerd/main/containerduninstall.sh)
bash <(curl -sSL https://raw.githubusercontent.com/oneclickvirt/containerd/main/containerdinstall.sh)
```

国内

```shell
bash <(curl -sSL https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/containerd/main/containerduninstall.sh)
bash <(curl -sSL https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/containerd/main/containerdinstall.sh)
```

## lxcfs 相关问题

如果宿主机未安装 lxcfs，容器内查询的 CPU/内存为宿主机视图。安装 lxcfs：

```shell
apt-get install -y lxcfs   # Debian/Ubuntu
yum install -y lxcfs       # CentOS/RHEL
```

## 磁盘限制不生效

本脚本通过 btrfs snapshotter 设置容器磁盘限制。安装时选择磁盘限制或设置 `NEED_DISK_LIMIT=y`，创建时传入大于 0 的 `disk_gb`。默认 overlay snapshotter 不支持该限制，脚本会提示并忽略磁盘参数。

```bash
nerdctl info
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
