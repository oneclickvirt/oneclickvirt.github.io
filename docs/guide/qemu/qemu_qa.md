---
outline: deep
---

# 常见问题答疑

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

查看 vmlog 文件获取批量开设时的信息：

```shell
cat vmlog
```

或通过以下命令查看端口转发规则：

```shell
iptables -t nat -L PREROUTING -n -v | grep 25000
```

## 如何完全重置 QEMU/KVM 环境

先卸载，再重新安装：

国际

```shell
bash <(curl -sSL https://raw.githubusercontent.com/oneclickvirt/qemu/main/scripts/qemuuninstall.sh)
bash <(curl -sSL https://raw.githubusercontent.com/oneclickvirt/qemu/main/qemuinstall.sh)
```

国内

```shell
bash <(curl -sSL https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/qemu/main/scripts/qemuuninstall.sh)
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

