---
outline: deep
---

# 前言

两种开设方式

## 单独开设

- 只生成一台 KVM/QEMU 虚拟机，自动判断国际服务器还是国内服务器
- 可配置绑定独立的 IPv6 地址（需宿主机已有公网 IPv6 且安装脚本已配置 IPv6 网络）
- 支持 x86_64 和 ARM64 架构的服务器

### 下载脚本

国际

```shell
curl -sSLO https://raw.githubusercontent.com/oneclickvirt/qemu/main/scripts/oneqemu.sh
chmod +x oneqemu.sh
```

国内

```shell
curl -sSLO https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/qemu/main/scripts/oneqemu.sh
chmod +x oneqemu.sh
```

### 示例

运行支持的变量如下

```bash
./oneqemu.sh <name> <cpu> <memory_mb> <disk_gb> <password> <sshport> <startport> <endport> [independent_ipv6:y/n] [system]
```

目前 system 仅支持选择：

- debian
- ubuntu

默认不填则是 debian

```shell
./oneqemu.sh vm1 1 1024 10 passwordhere 25000 34975 35000 n debian13
```

以下为开设的示例虚拟机的信息：

| 属性 | 值 |
|------|----|
| 虚拟机名字 | vm1 |
| SSH 登录的用户名 | root |
| SSH 登录的密码 | MyPassword |
| CPU 核数 | 1 |
| 内存大小 | 1024MB |
| 硬盘大小 | 10GB |
| SSH 端口 | 25000 |
| 内外网映射端口一致的区间 | 34975 到 35000 |
| 系统 | debian |
| 是否绑定独立的 IPv6 地址 | N |

### 相关操作

查看所有虚拟机

```shell
virsh list --all
```

启动虚拟机

```shell
virsh start vm1
```

停止虚拟机

```shell
virsh shutdown vm1
```

强制停止虚拟机

```shell
virsh destroy vm1
```

进入虚拟机控制台

```shell
virsh console vm1
```

要退出控制台请按 `Ctrl + ]`。

删除示例

```shell
virsh destroy vm1
virsh undefine vm1 --remove-all-storage
```

查看虚拟机信息

```shell
virsh dominfo vm1
```

## 批量开设

- 批量多次运行继承配置生成
- 自动递增虚拟机名（vm1, vm2, ...）、SSH 端口、公网端口
- 虚拟机信息记录到 `vmlog` 文件
- 生成多个时为避免 SSH 连接中断建议在 screen 中执行
- 支持 x86_64 和 ARM64 架构的服务器

### 运行

国际

```shell
curl -sSLO https://raw.githubusercontent.com/oneclickvirt/qemu/main/scripts/create_qemu.sh
chmod +x create_qemu.sh
./create_qemu.sh
```

国内

```shell
curl -sSLO https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/qemu/main/scripts/create_qemu.sh
chmod +x create_qemu.sh
./create_qemu.sh
```

### 查询批量开设的信息

```shell
cat vmlog
```

输出格式

```
虚拟机名字 SSH端口 登陆的root密码 核数 内存 硬盘 外网端口起 外网端口止
```

一行一个虚拟机对应的信息

## 删除所有虚拟机和镜像

```shell
for vm in $(virsh list --all --name); do virsh destroy "$vm" 2>/dev/null; virsh undefine "$vm" --remove-all-storage; done
rm -rf vmlog
```

## 宿主机重启后重启所有虚拟机

QEMU/KVM 支持通过 libvirt 设置虚拟机自启动：

```shell
# 为指定虚拟机设置开机自启
virsh autostart vm1

# 查看自启动状态
virsh dominfo vm1 | grep Autostart

# 取消自启动
virsh autostart vm1 --disable
```

或者手动启动所有已停止的虚拟机：

```shell
for vm in $(virsh list --all --name); do virsh start "$vm" 2>/dev/null; done
```
