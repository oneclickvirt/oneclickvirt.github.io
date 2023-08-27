---
outline: deep
---

# 前言

以下为非自定义部分的介绍，自定义部分有自己对应的介绍，勿弄混了

:::warning
如果宿主机带IPV6网络的话，安装会改变宿主机的网络结构，请保证宿主机随时可重置系统，且运行前无重要数据在宿主机上
:::

## 项目特点

通过docker批量或单独开设NAT服务器(Bulk or individual NAT server provisioning via docker)

默认使用debian系统可选alpine系统，每个容器自带1个外网ssh端口，25个内外网一致端口，可选择是否绑定IPV6地址

默认创建的是非特权容器，且不挂载与宿主机的docker的守护进程之间的通信，所以**宿主机创建的docker虚拟化的NAT服务器内无法再嵌套虚拟化docker**

由于只是在宿主机进行了CPU和内存的限制未在容器内使用cgroup驱动，所以在容器内使用服务器测试脚本检测容器的可用资源是无效的，显示的会是宿主机的资源

由于大部分云服务器是ext4文件系统，即便是xfs文件系统也不会启用pquota选项，所以**默认共享宿主机硬盘，无法限制每个容器的磁盘大小**

## 配置要求

系统可安装docker即可用，网络能连接Github的raw界面就能用，硬件配置只要不拉跨就行，空闲硬盘有3G就行

(如果需要绑定IPV6地址，那么请保证使用本套脚本的安装脚本进行docker安装，需要它自动预设部分设置)

如果硬件资源只是好了一点，需要限制更多东西并需要限制硬盘大小，可使用LXD分区的脚本批量开LXC虚拟化的容器

如果硬件非常好资源很多，可使用PVE分区的脚本批量开KVM虚拟化的虚拟机

## 开设虚拟内存(SWAP)

推荐在开设NAT服务器前先增加部分SWAP虚拟内存，避免突发的内存占用导致母鸡卡死

单位换算：输入 1024 产生 1G SWAP-虚拟内存，虚拟内存占用硬盘空间，当实际内存不够用时将自动使用虚拟内存做内存使用，但随之带来IO高占用以及CPU性能占用

建议只开实际内存大小两倍大小的虚拟内存

国际

```shell
curl -L https://raw.githubusercontent.com/spiritLHLS/addswap/main/addswap.sh -o addswap.sh && chmod +x addswap.sh && bash addswap.sh
```

国内

```shell
curl -L https://ghproxy.com/https://raw.githubusercontent.com/spiritLHLS/addswap/main/addswap.sh -o addswap.sh && chmod +x addswap.sh && bash addswap.sh
```