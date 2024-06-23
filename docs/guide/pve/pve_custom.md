---
outline: deep
---

# 自定义分区

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

以下优化可以减少至少400M内存左右的占用，部分机器能减少6GB以上，实际减少多少内存占用自行测试

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

### 停用Spiceproxy服务

如果不需要使用Spice进行虚拟机/容器链接(arm下暂不支持Spice)，可执行下述命令停用服务

```
systemctl stop spiceproxy.service 
systemctl disable spiceproxy.service 
```

### 使用定时任务删除内存缓存

清理不同类型的缓存以及对文件系统进行TRIM操作

```shell
TEMP_CRON=$(mktemp)
sudo crontab -l > $TEMP_CRON
echo "*/5 * * * * echo 1 > /proc/sys/vm/drop_caches >> /root/checkio.log" >> $TEMP_CRON
echo "*/5 * * * * sleep 60; echo 2 > /proc/sys/vm/drop_caches >> /root/checkio.log" >> $TEMP_CRON
echo "*/5 * * * * sleep 120; echo 3 > /proc/sys/vm/drop_caches >> /root/checkio.log" >> $TEMP_CRON
echo "*/5 * * * * sleep 180; fstrim -av >> /root/checkio.log >> /root/checkio.log" >> $TEMP_CRON
sudo crontab $TEMP_CRON
rm $TEMP_CRON
```

上面的命令需要宿主机本身有```sudo```和```crontab```命令才可使用。

## 在开设出的NAT的KVM虚拟机上自行映射公网端口

使用```nano```或```vim```命令修改文件增加端口映射：

```
/etc/iptables/rules.v4
```

例如我有一台内网IP为```172.16.1.152```的KVM虚拟机，虚拟机内已经开设MYSQL监听了```3306```，我需要使用```tcp```协议映射出来到宿主机IP上的```33306```端口上进行使用，那么需要在上面的那个文件中的```COMMIT```行以上增加如下行

```
-A PREROUTING -p tcp -m tcp -dport 33306 -j DNAT --to-destination 172.16.1.152:3306
```

保存文件退出文件编辑后执行

```
service netfilter-persistent restart
```

重载端口映射

此时在宿主机上执行

```
lsof -i:33306
```

可见端口映射规则是否生效