---
outline: deep
---

# 一些自定义脚本

有些脚本可能有对应的系统要求，自行查看

## 在非Debian系统上安装 Proxmox VE 7

本机硬件配置的最低要求同先前正常安装的要求一致

需要先安装docker

```
curl -sSL https://get.docker.com/ | sh
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-linux-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
docker-compose --version
```

然后使用```uname -m```查询架构，使用对应架构的命令

开设出的PVE面板信息为：

登录用户名和密码都是```root```，登录后务必使用web的SSH更改密码以免被爆破

用宿主机SSH时务必登录对应```https://IPV4地址:8006```在web面板上使用SSH，不要使用宿主机的22端口操控PVE

因为web面板上的SSH是在Docker内的，所以不支持后续的一键配置，请自行配置网关等进行使用

X86架构

```bash
docker run -idt --network host \
--privileged \
--name pve \
--add-host pve:10.13.14.101 \
--hostname pve \
spiritlhl/pve:7_x86_64
```

ARM架构

```bash
docker run -idt --network host \
--privileged \
--name pve \
--add-host pve:10.13.14.101 \
--hostname pve \
spiritlhl/pve:7_aarch64
```

开设出的面板实际是开设在容器内的，但网络已使用host模式，PVE的端口约等于就使用的宿主机的端口

有许多错误需要修复，欢迎PR解决问题，实测在Ubuntu系统的宿主机上安装```Proxmox VE```的面板成功，解决了通过网络安装```Proxmox VE```只能使用Debian系统做宿主机的问题

## 在低配置系统中优化Proxmox-VE的内存占用

以下优化可以减少400M内存左右的占用，聊胜于无。

### 减少max_workers数量

执行下述命令查询

```
cd /usr/share/perl5/PVE/Service
grep 'max_workers => 3' *
```

可见

```
pvedaemon.pm:    max_workers => 3,
pveproxy.pm:    max_workers => 3,
spiceproxy.pm:    max_workers => 3, # todo: do we need more?
```

默认的max_workers是3，可以修改对应的文件，最低max_workers可为1，可使用如下命令进行修改

```
sed -i "s/max_workers => 3/max_workers => 1/g" /usr/share/perl5/PVE/Service/*
```

### 停用HA服务

集群(多节点)可以使用HA服务，如果是单节点，或者没有HA使用的需求，可以执行下述命令禁用

```
systemctl stop pve-ha-lrm.service 
systemctl stop pve-ha-crm.service 
systemctl disable pve-ha-lrm.service 
systemctl disable pve-ha-crm.service 
```

### 停用防火墙服务

可执行下述命令停用服务

```
systemctl stop pve-firewall.service 
systemctl disable pve-firewall.service 
```

### 停用调度服务

如果不需要计划任务，如备份、同步之类的任务，可执行下述命令停用服务

```
systemctl stop pvescheduler.service
systemctl disable pvescheduler.service
```

### 停用Spiceproxy

如果不需要使用Spice进行虚拟机/容器链接(Arm版本本身不支持Spice)，可执行下述命令停用服务

```
systemctl stop spiceproxy.service 
systemctl disable spiceproxy.service 
```