---
outline: deep
---

# 前言

以下为非自定义部分的介绍，自定义部分有自己对应的介绍，勿弄混了

如果你的宿主机本身没有IPV6的子网又想给容器分配IPV6地址，那么请先查看```LXD```模块中的```自定义```分区中的```给宿主机附加免费的IPV6地址段```的内容，给宿主机附加上IPV6子网后再进行环境安装

欢迎给项目一个```Star```进行免费的支持-->[https://github.com/oneclickvirt/lxd](https://github.com/oneclickvirt/lxd)

## 要求

硬件要求:
- 系统：Debian 8+, Ubuntu 18+(推荐20.04)
- 虚拟化：推荐KVM、VMWARE虚拟化
- 内存：内存至少512MB
- 硬盘：硬盘(系统盘)至少10G
- 网络：独立的IPV4地址，IPV6可有可无，带宽能下载脚本就行，网络能连接Github的raw页面就行

PS: 如果硬件非常好资源很多，可使用PVE批量开KVM虚拟化的虚拟机 [跳转](https://github.com/oneclickvirt/pve)

PS: 如果硬件资源更烂，虚拟化不支持，可使用docker版本的，适配面更广 [跳转](https://github.com/oneclickvirt/docker)

## 项目特点

- 本套脚本开发使用的**Ubuntu20**，Ubuntu别的长期维护版本应该也没问题，某个存储类型无法使用时自动切换

- 已设置同时进行TCP和UDP转发，除了SSH端口其他的映射内网外网端口一致

- 已设置支持开出的LXC容器进行docker嵌套虚拟，默认普通版本和纯探针版本使用debian11系统

- 已设置默认启用lxcfs，使得在容器内的查询资源时使用的是配置的视图而不是宿主机的视图

- 已屏蔽容器内可能用于滥用的工具包和IPV4网络的TCP/UDP协议的端口( 3389 8888 54321 65432 )，以防止容器被用于扫描和爆破，且可外置进程检查有问题自动停机

- 已支持一键为LXC容器配置IPV6地址(前提是宿主机有IPV6子网，无IPV6地址则不配置)，自动适配子网大小

- 已增加清华镜像源，如果官方镜像丢失时，将使用镜像源下载容器镜像

- 保证你要开的盘为默认的系统盘(sda或者sda1)而不是挂载的盘(sdb之类的)，不确定的使用```fdisk -l```和```df```查看

- 挂载其他盘的详看 [其他说明](https://github.com/oneclickvirt/lxd/blob/main/README_other.md)

- 一键脚本支持自定义限制所有内容，普通版本支持多次运行批量生成不覆盖先前生成的配置

## 检测环境

**使用后续脚本的务必执行本命令检测宿主机是否符合要求**

国际

```
bash <(wget -qO- --no-check-certificate https://raw.githubusercontent.com/oneclickvirt/lxd/main/scripts/pre_check.sh)
```

国内

```
bash <(wget -qO- --no-check-certificate https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/lxd/main/scripts/pre_check.sh)
```
