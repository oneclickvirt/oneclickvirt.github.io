---
outline: deep
---

# 前言

以下为非自定义部分的介绍，自定义部分有自己对应的介绍，勿弄混了

如果宿主机没有 IPv6 子网但你希望给容器分配 IPv6 地址，请先查看 ```incus``` 模块 ```自定义``` 分区中的 ```给宿主机附加免费的IPv6地址段```，先给宿主机附加 IPv6 子网后再进行环境安装。

欢迎给项目一个```Star```进行免费的支持-->[https://github.com/oneclickvirt/incus](https://github.com/oneclickvirt/incus)

## 要求

硬件要求:
- 系统：Ubuntu 20+, Debian 11+, RockyLinux 9+, AlmaLinux 9+, CentOS 9+, Alpine(自行安装bash后), Arch
- 虚拟化：推荐KVM、VMWARE虚拟化
- CPU：内核数最好大于或等于2，否则可能出现内核空转切片循环导致占用100%
- 内存：内存至少512MB
- 硬盘：硬盘(系统盘)至少10G
- 网络：独立的 IPv4 地址，IPv6 可有可无；只要带宽可下载脚本且网络可访问 GitHub Raw 页面即可。

PS: 如果硬件非常好资源很多，可使用PVE批量开KVM虚拟化的虚拟机 [跳转](https://github.com/oneclickvirt/pve)

PS: 如果硬件资源更烂，虚拟化不支持，可使用docker版本的，适配面更广 [跳转](https://github.com/oneclickvirt/docker)

## 项目特点

- 本套脚本开发使用的**Ubuntu24**和**Debian12**，别的长期维护版本应该也没问题，某个存储类型无法使用时自动切换(优先级: btrfs > lvm > zfs > ceph > dir )

- 已设置同时进行TCP和UDP转发，除了SSH端口其他的映射内网外网端口一致

- 已设置支持开出的LXC容器进行docker嵌套虚拟，默认普通版本和纯探针版本使用debian11系统

- 已设置默认启用lxcfs，使得在容器内的查询资源时使用的是配置的视图而不是宿主机的视图

- 已屏蔽容器内可能用于滥用的工具包和IPV4网络的TCP/UDP协议的端口( 3389 8888 54321 65432 )，以防止容器被用于扫描和爆破，且可外置进程检查有问题自动停机

- 已支持一键为LXC容器配置IPV6地址(前提是宿主机有IPV6子网，无IPV6地址则不配置)，自动适配子网大小

- 已增加各种第三方镜像源，如果官方镜像丢失时，将使用镜像源下载容器镜像(含自修复镜像)

- 保证你要开的盘为默认的系统盘(sda或者sda1)而不是挂载的盘(sdb之类的)，不确定的使用```fdisk -l```和```df```查看

- 挂载其他盘的详看 [其他说明](https://github.com/oneclickvirt/incus/blob/main/README_other.md)

- 一键脚本支持自定义限制所有内容，普通版本支持多次运行批量生成不覆盖先前生成的配置

## 检测环境

**执行后续脚本前，务必先运行本命令检测宿主机是否符合要求。**

国际

```
bash <(curl -sSLk https://raw.githubusercontent.com/oneclickvirt/incus/main/scripts/pre_check.sh)
```

国内

```
bash <(curl -sSLk https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/incus/main/scripts/pre_check.sh)
```
