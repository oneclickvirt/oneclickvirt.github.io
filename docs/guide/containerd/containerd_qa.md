---
outline: deep
---

# 常见问题答疑

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

1. 确认宿主机有公网 IPv6 地址
2. 检查 containerd-ipv6 CNI 网络是否存在：

```shell
cat /etc/cni/net.d/20-containerd-ipv6.conflist
```

3. 检查 ndpresponder 容器是否运行：

```shell
nerdctl ps | grep ndpresponder
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

磁盘限制需要 xfs 或 btrfs snapshotter 支持，默认 overlay snapshotter 不支持容器级磁盘限制。

如需磁盘限制，请查看 docker 方案或 incus 方案中对应的说明。

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

