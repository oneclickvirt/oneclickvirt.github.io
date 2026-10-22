---
outline: deep
---

# 说明与常见问题

## 镜像说明

镜像依次尝试 `oneclickvirt/pve_kvm_images`、`oneclickvirt/kvm_images` 和发行版官方 Cloud Image。首次使用时缓存至 `/var/lib/libvirt/images/`；安装时设置 `QEMU_IMAGES_PATH` 可更改目录，后续创建会读取安装器保存的路径。后续同系统虚拟机复用缓存。存在 `sha256sum` 时，下载成功后会生成本地 `.sha256` 记录，复用缓存前检查 SHA256；不一致则删除旧缓存并重新下载。此记录用于校验本地缓存一致性，不代表验证了上游签名。

| 系统 | 镜像来源 |
|------|---------|
| Debian 10/11/12/13 | cloud.debian.org |
| Ubuntu 18/20/22/24 | cloud-images.ubuntu.com |
| AlmaLinux 8/9 | repo.almalinux.org |
| RockyLinux 8/9 | dl.rockylinux.org |
| OpenEuler 22 | repo.openeuler.org |

## 网络说明

- 使用 libvirt 的 `default` NAT 网络（`virbr0`，`192.168.122.0/24`）
- 安装时会检测已有 `virbr0` 是否由 libvirt 管理，避免和宿主机已有网桥冲突
- 优先从 `192.168.122.2`~`192.168.122.99` 分配 DHCP 预留地址，用尽后继续尝试 `.100`~`.254`
- 通过 nftables 或 iptables DNAT 实现宿主机端口到虚拟机端口的映射
- 新安装的 default 网络显式启用 libvirt IPv6 NAT，并包含 `fd42:122::/64` ULA IPv6 段；已有 default 网络会通过 `virsh net-update --live --config` 尝试补齐该段，失败时保留 IPv4 网络且不误报 IPv6 可用
- NAT66 只有在出口路由具有全局 IPv6 源地址、IPv6 转发已启用且 nftables/ip6tables 规则实际校验成功后才记录 `ipv6_nat=true`
- IPv6 地址来自 libvirt 的实际 DHCPv6 租约，不会再根据 IPv4 尾段推测；创建刚结束而尚未获得租约时记为 `pending`，可用 `manage_qemu.sh info <name>` 查询最新地址
- 创建中会临时预留 VM 名称、SSH 端口和额外端口范围，避免并发创建时复用同一资源
- SSH 端口映射：`宿主机:sshport` → `vm_ip:22`
- 额外端口映射：`宿主机:startport-endport` → `vm_ip:startport-endport`

## 日志文件

虚拟机信息保存在 `/root/vmlog`，并同步写入 `/var/lib/libvirt/qemu-vms.db` 作为结构化本地状态库。`/root/vmlog` 保持向后兼容，格式如下：

```
vm1 25001 passwd123 1 1024 20 35001 35025 debian 192.168.122.2
vm2 25002 passwd456 1 1024 20 35026 35050 ubuntu 192.168.122.3
```

字段顺序：`名称 SSH端口 密码 CPU核数 内存MB 磁盘GB 起始端口 结束端口 系统 内网IP`

新版本会在上述 10 个兼容字段后追加网络元数据，例如：

```
mac=52:54:xx:xx:xx:xx bridge=virbr0 fw=nft ipv6=fd42:122::102 ipv6_nat=true
```

创建、删除和 `manage_qemu.sh set-resources` 会同步维护 vmlog 与 SQLite 记录；若 vmlog 缺失，`manage_qemu.sh info all` 会回退读取 SQLite。

## KVM 不可用 / /dev/kvm 不存在

检查宿主机是否支持硬件虚拟化：

```bash
egrep -c '(vmx|svm)' /proc/cpuinfo
ls /dev/kvm
```

若在 VPS 上无法使用 KVM，可能是宿主机不支持嵌套虚拟化（Nested Virtualization），请联系 VPS 提供商确认。

## virsh: command not found

QEMU/KVM 环境未正确安装，请重新执行安装脚本：

国际

```shell
bash <(curl -sSL https://raw.githubusercontent.com/oneclickvirt/qemu/main/qemuinstall.sh)
```

国内

```shell
bash <(curl -sSL https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/qemu/main/qemuinstall.sh)
```

## 虚拟机无法访问外网（IPv4）

检查 iptables NAT 规则是否存在：

```shell
iptables -t nat -L POSTROUTING -n -v | grep virbr
```

如果没有，手动添加（假设 virbr0 网段为 192.168.122.0/24）：

```shell
iptables -t nat -A POSTROUTING -s 192.168.122.0/24 ! -d 192.168.122.0/24 -j MASQUERADE
iptables -A FORWARD -s 192.168.122.0/24 -j ACCEPT
iptables -A FORWARD -d 192.168.122.0/24 -j ACCEPT
```

## 虚拟机 IPv6 未生效

1. 确认宿主机有公网 IPv6 地址
2. 检查 IPv6 网桥是否已配置：

```shell
ip -6 addr show
```

3. 确认安装脚本已完整执行并配置了 IPv6 网络

## 虚拟机无法启动 / 状态为 shut off

查看虚拟机的错误日志：

```shell
virsh dominfo vm1
cat /var/log/libvirt/qemu/vm1.log
```

常见原因：
- 内存不足：检查宿主机可用内存 `free -h`
- 磁盘空间不足：检查磁盘 `df -h`
- KVM 权限问题：确认 `/dev/kvm` 权限正确

## 如何查看 SSH 登录信息

记录格式见上方日志说明。可查询最新地址和端口：

```bash
cat /root/vmlog
./manage_qemu.sh info all
```

## 如何完全重置 QEMU/KVM 环境

先卸载，再重新安装：

国际

```shell
bash <(curl -sSL https://raw.githubusercontent.com/oneclickvirt/qemu/main/qemuuninstall.sh)
bash <(curl -sSL https://raw.githubusercontent.com/oneclickvirt/qemu/main/qemuinstall.sh)
```

国内

```shell
bash <(curl -sSL https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/qemu/main/qemuuninstall.sh)
bash <(curl -sSL https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/qemu/main/qemuinstall.sh)
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
