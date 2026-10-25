---
outline: deep
---

# 自定义分区

## 在非Debian系统上通过Docker运行 Proxmox VE 7 / 8 / 9

需要先安装Docker，宿主机使用原生Linux的X86_64或ARM64架构，使用```uname -m```查询。X86_64版本使用官方PVE软件包，PVE 7、8、9分别使用Debian 11、12、13。ARM64版本使用社区分支[PXVIRT](https://github.com/jiangcuo/pxvirt)的软件包，8、9分别使用Debian 12、13，并非Proxmox官方ARM版本。

此方式用于实验环境。容器共用宿主机内核，不能在容器内安装或切换PVE内核；HA和硬件watchdog服务不启用。X86_64和ARM64使用不同镜像标签。原有```7_aarch64```为历史镜像，上游旧ARM项目已停止维护，不随这套流程更新。

### 版本选择

| 版本 | 架构 | 容器基础系统 | Docker Hub镜像 | Release下载页面 |
|------|------|-------------|----------------|-----------------|
| PVE 7 | X86_64 | Debian 11 | `spiritlhl/pve:7` | [docker-pve7](https://github.com/oneclickvirt/pve/releases/tag/docker-pve7) |
| PVE 8 | X86_64 | Debian 12 | `spiritlhl/pve:8` | [docker-pve8](https://github.com/oneclickvirt/pve/releases/tag/docker-pve8) |
| PVE 9 | X86_64 | Debian 13 | `spiritlhl/pve:9` | [docker-pve9](https://github.com/oneclickvirt/pve/releases/tag/docker-pve9) |
| PXVIRT 8 | ARM64 | Debian 12 | `spiritlhl/pve:8_aarch64` | [docker-pve8](https://github.com/oneclickvirt/pve/releases/tag/docker-pve8) |
| PXVIRT 9 | ARM64 | Debian 13 | `spiritlhl/pve:9_aarch64` | [docker-pve9](https://github.com/oneclickvirt/pve/releases/tag/docker-pve9) |

各版本和架构分别更新。X86_64也可使用```7_x86_64```、```8_x86_64```、```9_x86_64```，ARM64也可使用```8_arm64```、```9_arm64```。```7```、```8```、```9```标签仍为amd64镜像。PVE 7已结束官方支持，仅用于旧环境兼容，新部署建议选择PVE 9。

### 下载镜像

下面以PVE 9为例，需要其他版本时将第一行的```9```改为```7```或```8```即可。

```bash
PVE_VERSION=9
PVE_IMAGE="spiritlhl/pve:${PVE_VERSION}"
docker pull "$PVE_IMAGE"
```

ARM64宿主机使用下面的命令，版本选择```8```或```9```：

```bash
PVE_VERSION=9
PVE_IMAGE="spiritlhl/pve:${PVE_VERSION}_aarch64"
docker pull "$PVE_IMAGE"
```

也可从对应GitHub Release下载压缩包，校验后导入。镜像和校验文件需要使用同一个版本的Release。下面以amd64为例，ARM64将```PVE_ARCH```改为```arm64```，版本选择```8```或```9```，校验文件名和镜像标签会自动选择。

```bash
PVE_VERSION=9
PVE_ARCH=amd64
PVE_CHECKSUMS=SHA256SUMS
PVE_IMAGE="spiritlhl/pve:${PVE_VERSION}"
if [ "$PVE_ARCH" = arm64 ]; then
  PVE_CHECKSUMS=SHA256SUMS-arm64
  PVE_IMAGE="spiritlhl/pve:${PVE_VERSION}_aarch64"
fi
curl -fL --retry 3 "https://github.com/oneclickvirt/pve/releases/download/docker-pve${PVE_VERSION}/pve${PVE_VERSION}-${PVE_ARCH}.tar.gz" -o "pve${PVE_VERSION}-${PVE_ARCH}.tar.gz"
curl -fL --retry 3 "https://github.com/oneclickvirt/pve/releases/download/docker-pve${PVE_VERSION}/${PVE_CHECKSUMS}" -o "$PVE_CHECKSUMS"
sha256sum -c "$PVE_CHECKSUMS"
gzip -dc "pve${PVE_VERSION}-${PVE_ARCH}.tar.gz" | docker load
```

amd64压缩包导入后同时包含```spiritlhl/pve:${PVE_VERSION}```、```spiritlhl/pve:${PVE_VERSION}_x86_64```和原有的```oneclickvirt/pve:${PVE_VERSION}```本地标签，指向同一个镜像。ARM64压缩包包含```spiritlhl/pve:${PVE_VERSION}_aarch64```、```spiritlhl/pve:${PVE_VERSION}_arm64```和```oneclickvirt/pve:${PVE_VERSION}_aarch64```。

镜像在GitHub Actions中构建，每周自动检查更新，也可在[构建工作流](https://github.com/oneclickvirt/pve/actions/workflows/pve-docker.yml)中手动运行。构建和隔离虚拟机内的验证全部通过后，推送[Docker Hub](https://hub.docker.com/r/spiritlhl/pve)，再校验远端镜像并更新对应GitHub Release。运行验证失败时不会推送新镜像。Release中的```build.json```和```build-arm64.json```分别记录amd64、ARM64的软件包版本、源码提交、镜像ID、Docker Hub摘要和压缩包校验值。ARM8源目前缺少最新qemu-server所需的```python3-virt-firmware```，构建使用依赖完整的兼容qemu-server，并保留APT版本约束，具体版本见镜像内```/usr/share/pve-container/build-info.json```。

[CNB集中构建仓库](https://cnb.cool/oneclickvirt/virtualization-images)也提供手动入口，触发同一套amd64 PVE 7、8、9和ARM64 PXVIRT 8、9构建与发布流程。实际构建使用对应架构的GitHub Runner。amd64在使用KVM的隔离虚拟机内验证；ARM64将候选镜像传入另一台一次性的GitHub托管ARM虚拟机验证，验证任务不传入发布密钥，通过后由独立任务推送。任务间的临时文件保留1天，不使用CNB对象存储。

### 设置密码并启动

不再提供默认密码，需要先生成自己的root密码文件。以下命令在宿主机上执行。

```bash
install -d -m 700 /opt/pve-docker
(umask 077; openssl rand -base64 24 > /opt/pve-docker/root-password)
modprobe -a fuse tun
docker run -d \
  --name pve --hostname pve \
  --dns-search=. \
  --privileged --cgroupns=private \
  --restart unless-stopped \
  --tmpfs /run --tmpfs /run/lock --tmpfs /tmp \
  --mount type=bind,src=/opt/pve-docker/root-password,dst=/run/secrets/pve-root,readonly \
  -e PVE_ROOT_PASSWORD_FILE=/run/secrets/pve-root \
  -p 8006:8006 \
  "$PVE_IMAGE"
```

使用```https://宿主机IP:8006```访问面板，选择Linux PAM认证，用户名为```root```。使用```cat /opt/pve-docker/root-password```查看生成的密码。首次启动会生成本容器的证书和SSH主机密钥，面板准备完成需要一些时间。

```--dns-search=.```用于避免继承宿主机的DNS搜索后缀，后缀过长会导致PVE节点证书生成失败，不影响使用DNS服务器。

需要修改密码时，执行```docker exec -it pve passwd root```。密码文件只在首次初始化时使用，后续在容器内修改的密码不会被重启覆盖。

### 使用和保存

使用```docker exec -it pve bash```进入容器操作PVE，宿主机的SSH仍用于管理宿主机。网桥、网关和虚拟机的端口映射需要自行配置，不直接使用原有针对实体PVE宿主机的一键配置。

构建检查包括ARM64签名软件源更新和面板历史统计、HTTPS/PAM登录、创建并导入虚拟机、使用TCG启动和重启虚拟机，以及容器重启后的密码、证书和虚拟机配置保留。amd64隔离测试的外层虚拟机使用KVM，ARM64使用独立的GitHub托管ARM虚拟机，容器内的客体均使用TCG，尚未验证容器内的嵌套KVM。KVM加速需要宿主机提供```/dev/kvm```。没有此设备时，需要在虚拟机选项中关闭KVM硬件虚拟化，使用TCG。LXC、PCI直通、集群和迁移不在本镜像的验证范围内。

停止和重新启动使用下面的命令：

```bash
docker stop pve
docker start pve
```

同一个容器重启会保留配置和虚拟磁盘。删除或重建容器前，需要另行备份```/var/lib/pve-cluster```、```/var/lib/vz```、网络配置及账号配置；不能把```docker rm```当作升级步骤直接执行。

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
echo "*/5 * * * * echo 1 > /proc/sys/vm/drop_caches" >> $TEMP_CRON
echo "*/5 * * * * sleep 60; echo 2 > /proc/sys/vm/drop_caches" >> $TEMP_CRON
echo "*/5 * * * * sleep 120; echo 3 > /proc/sys/vm/drop_caches" >> $TEMP_CRON
echo "*/5 * * * * sleep 180; fstrim -av" >> $TEMP_CRON
sudo crontab $TEMP_CRON
rm $TEMP_CRON
```

上面的命令需要宿主机本身有```sudo```和```crontab```命令才可使用。

## 自行映射公网端口到开设出的NAT的KVM虚拟机上

下面所有操作在PVE宿主机上进行操作

使用```nano```或```vim```命令修改文件增加端口映射：

```shell
/etc/iptables/rules.v4
```

例如我有一台内网IP为```172.16.1.152```的KVM虚拟机(虚拟机不管是什么系统的，web端都能查看到内网IP地址)，虚拟机内已经开设MYSQL监听了```3306```，我需要使用```tcp```协议映射出来到宿主机IP上的```33306```端口上进行使用，那么需要在上面的那个文件中的```COMMIT```行以上增加如下行

```shell
-A PREROUTING -i vmbr0 -p tcp -m tcp -dport 33306 -j DNAT --to-destination 172.16.1.152:3306
```

如果是udp协议，上面的代码中的```tcp```修改为```udp```即可

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

## 开设Linux虚拟机的时候自定义CPU的TYPE

在宿主机上使用类似

```shell
echo "kvm64" > /usr/local/bin/cpu_type
```

这样的方式指定默认的CPU的TYPE，可将```kvm64```替换为你需要的类型

## 使用自定义的IPV6列表

开设虚拟机或容器的时候需要使用自定义的IPV6列表，不想要自动计算并分配IPV6

可在 ```/usr/local/bin/pve_appended_content.txt``` 中一行一个写入你待分配的IPV6地址，如

```shell
2a01:4f8:1c1c:94de::2
2a01:4f8:1c1c:94de::3
2a01:4f8:1c1c:94de::4
2a01:4f8:1c1c:94de::5
2a01:4f8:1c1c:94de::6
```


这种方式可用于宿主机未完整分配/80以上大小的子网的时候，仅带几个IPV6的时候，又需要开设独立的IPV6地址的实例
