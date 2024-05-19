---
outline: deep
---

# KVM虚拟化

## SSH登录说明

KVM虚拟化开设出的虚拟机，**默认生成的用户名不是```root```，你需要执行```sudo -i```切换为root用户**

**默认支持用户名```root```登录，默认的root密码是```password```或```oneclickvirt```，你也可以先试试**

**登录SSH切换为root权限后，一定要修改root密码**，可以使用以下命令修改

国际

```bash
bash <(curl -sSL https://raw.githubusercontent.com/fscarmen/tools/main/root.sh) [PASSWORD]
```

国内


```bash
bash <(curl -sSL https://cdn.spiritlhl.net/https://raw.githubusercontent.com/fscarmen/tools/main/root.sh) [PASSWORD]
```

## 部分注意事项

**执行本项目的检测环境的命令**，展示如下

![图片](https://github.com/spiritLHLS/pages/blob/main/pve_kvm_1.png?raw=true)

查询如上的只需使用下面的一键脚本自动创建虚拟机即可，无需手动再修改WEB端设置

![图片](https://github.com/spiritLHLS/pages/blob/main/pve_kvm_2.png?raw=true)

查询如上的在使用后续脚本创建了虚拟机后，**可能**需要手动修改WEB端设置，需要关闭对应每个虚拟机的硬件嵌套虚拟化，如下图

![图片](https://github.com/spiritLHLS/pages/blob/main/pve_kvm_3.png?raw=true)

先停止虚拟机再修改，修改完后再开机才能使用NOVNC，不关闭**可能**导致这个虚拟机有BUG无法使用

如果强行安装PVE开KVM，启动不了的也可以关闭这个选项试试能不能启动虚拟机

:::tip
开设虚拟机前请使用screen挂起执行，避免开设时间过长，SSH不稳定导致中间执行中断
:::

## 开设带IPV6地址的KVM虚拟机的注意事项

由于长期闲置IPV6不使用可能导致NDP广播缓存失效重置，一般闲置50分钟左右就会出现IPV6不可用的情况，俗称“IPV6断流”，此时需要设置一个定时任务

```shell
echo '*/1 * * * * curl -m 6 -s ipv6.ip.sb || curl -m 6 -s ipv6.ip.sb' | crontab -
```

在开设出的虚拟机中执行上述命令，可保证IPV6网络一直被使用，不会失效断流

## 开设KVM虚拟机可使用的镜像

- 已预安装开启cloudinit
- 开启SSH登陆
- 预设置SSH监听V4和V6的22端口
- 开启允许密码验证登陆
- 开启允许root登陆
- 部分预安装Qemu-guest-agent

目前可使用的镜像名字的列表为

[https://github.com/oneclickvirt/kvm_images/blob/main/list.text](https://github.com/oneclickvirt/kvm_images/blob/main/list.text)

以及

[https://github.com/oneclickvirt/pve_kvm_images](https://github.com/oneclickvirt/pve_kvm_images)

仓库的Release中存储的每日修补镜像

## 单独开设NAT的KVM虚拟化的虚拟机

- 自动开设NAT服务器，默认使用Debian10镜像，因为该镜像占用最小
- 可在命令中自定义需要使用的镜像，这里有给出配置好的镜像，镜像自带空间设置是2~10G硬盘，日常使用**至少10G以上**即可，除非某些镜像开不起来再增加硬盘大小
- 可在命令中指定存储盘位置，默认不指定时为local盘即系统盘，可指定为PVE中显示的挂载盘
- 自定义内存大小推荐512MB内存
- 自动进行内外网端口映射，含22，80，443端口以及其他25个内外网端口号一样的端口
- 生成后需要等待一段时间虚拟机内部的cloud-init配置好网络以及登陆信息，大概需要5分钟
- 虚拟机的相关信息将会存储到WEB端对应VM的NOTES中，可在WEB端查看
- 如果宿主机自带IPV6子网将自动附加上IPV6网络，但无公网IPV6地址
- 可选择是否开启独立IPV6，需要宿主机至少有一个/104的子网，最好是/64的子网

### 使用方法

- 系统支持：
  - x86_64架构的详见 [跳转](https://github.com/oneclickvirt/kvm_images/releases/tag/v1.0) 中列出的系统，使用时只需写文件名字，不需要.qcow2尾缀
  - arm架构的详见 [跳转](http://cloud-images.ubuntu.com/) 中列出的系统，使用时只需要写系统名字+系统版本号，如ubuntu20、ubutnu22这种

:::tip
注意这里的用户名不能是纯数字，会造成cloudinit出问题，最好是纯英文或英文开头
:::

**下载脚本**

国际

```shell
curl -L https://raw.githubusercontent.com/oneclickvirt/pve/main/scripts/buildvm.sh -o buildvm.sh && chmod +x buildvm.sh
```

国内

```shell
curl -L https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/pve/main/scripts/buildvm.sh -o buildvm.sh && chmod +x buildvm.sh
```

**各参数含义**

```shell
./buildvm.sh VMID 用户名 密码 CPU核数 内存 硬盘 SSH端口 80端口 443端口 外网端口起 外网端口止 系统 存储盘 独立IPV6地址(留空默认N)
```

:::tip
注意这里的密码最好仅英文与数字混合，且以英文开头，避免密码在设置过程中因为特殊字符被转义而设置失败
:::

### 测试示例

```shell
./buildvm.sh 102 test1 oneclick123 1 512 10 40001 40002 40003 50000 50025 debian11 local N
```

开设完毕可执行```cat vm102```查看信息，或到WEB端对应VM的NOTES中查看

以下为开设的示例VM的信息：

| 属性                     | 值             |
|-------------------------|----------------|
| VMID                    | 102            |
| SSH登录的用户名          | test1          |
| SSH登录的密码            | oneclick123    |
| CPU核数                  | 1              |
| 内存大小                 | 512MB          |
| 磁盘大小                 | 10G            |
| SSH端口                  | 40001          |
| 80端口                   | 40002          |
| 443端口                  | 40003          |
| 内外网映射端口一致的区间 | 50000到50025   |
| 系统                     | debian11       |
| 宿主机的存储盘           | local          |
| 绑定独立IPV6(留空默认N)  | N          |

## 删除指定虚拟机

- 停止VM
- 删除VM
- 删除端口映射
- 重启网络
- 删除log文件

**下载脚本**

国际

```shell
curl -L https://raw.githubusercontent.com/oneclickvirt/pve/main/scripts/pve_delete.sh -o pve_delete.sh && chmod +x pve_delete.sh
```

国内

```shell
curl -L https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/pve/main/scripts/pve_delete.sh -o pve_delete.sh && chmod +x pve_delete.sh
```

**使用方法**

可以删除对应VMID的虚拟机，这里用上文中的示例102做演示

```shell
./pve_delete.sh 102
```

实际删除数量不固定，空格分隔每个VMID即可，可一次性删除多个

## 批量开设NAT的KVM虚拟化的虚拟机

:::warning
初次使用前需要保证当前PVE纯净且宿主机未进行过任何端口映射，否则设置冲突可能出现BUG
:::

:::tip
开设前请使用screen挂起执行，避免批量开设时间过长，SSH不稳定导致中间执行中断
:::

- 可多次运行批量生成VM
- 自动开设NAT服务器，选项留空默认使用debian11镜像，可自定义使用镜像名字，支持的系统名字详见上文支持的镜像列表
- 自动进行内外网端口映射，含22，80，443端口以及其他25个内外网端口号一样的端口
- 生成后需要等待一段时间虚拟机内部的cloudinit配置好网络以及登陆信息，大概需要5分钟，每个虚拟机创建之间有间隔等待60秒避免突发性能不足
- 默认批量开设的虚拟机网络配置为：22，80，443端口及一个25个端口区间的内外网映射
- 可自定义批量开设的核心数，内存大小，硬盘大小，使用宿主机哪个存储盘，记得自己计算好空闲资源开设
- 虚拟机的相关信息将会存储到WEB端对应VM的NOTES中，可在WEB端查看
- 如果宿主机自带IPV6子网将自动附加上IPV6网络，但无公网IPV6地址
- 可选择是否开启独立IPV6，需要宿主机至少有一个/104的子网，最好是一个/64子网

国际

```shell
curl -L https://raw.githubusercontent.com/oneclickvirt/pve/main/scripts/create_vm.sh -o create_vm.sh && chmod +x create_vm.sh && bash create_vm.sh
```

国内

```shell
curl -L https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/pve/main/scripts/create_vm.sh -o create_vm.sh && chmod +x create_vm.sh && bash create_vm.sh
```

开设完毕可执行```cat vmlog```查看信息，或到WEB端对应VM的NOTES中查看

## 删除所有虚拟机

- 删除所有VM
- 删除所有nat的端口映射
- 重启网络
- 删除log文件

```shell
for vmid in $(qm list | awk '{if(NR>1) print $1}'); do qm stop $vmid; qm destroy $vmid; rm -rf /var/lib/vz/images/$vmid*; done
iptables -t nat -F
iptables -t filter -F
service networking restart
systemctl restart networking.service
systemctl restart ndpresponder.service
iptables-save | awk '{if($1=="COMMIT"){delete x}}$1=="-A"?!x[$0]++:1' | iptables-restore
iptables-save > /etc/iptables/rules.v4
rm -rf vmlog
rm -rf vm*
```

:::tip
PVE修改VM配置前都得停机先，再修改配置，修改完再启动，免得出现配置重载错误
:::

## 开设独立IPV4地址的虚拟机

三个脚本，各取所需，各有优缺点。

前两个脚本**不需要**额外的IPV4地址事先绑定到```vmbr0```接口上，开设的虚拟机将**直接**绑定额外的IPV4地址。

最后一个脚本**需要**额外的IPV4地址事先绑定到```vmbr0```接口上，开设的虚拟机将做**NAT全端口映射**内网IPV4地址，**不直接**绑定额外的IPV4地址。

### 自动选择宿主机同一子网内的额外IPV4地址开设虚拟机

:::warning
使用前需要保证当前宿主机的IP段带了至少2个IP，且有空余的IP未配置，该空余的IP未绑定宿主机。
:::

:::tip
此时附加的IPV4地址是宿主机目前的IPV4地址顺位后面的地址，
比如目前宿主机地址是```1.1.1.32```然后```1.1.1.33```已经有虚拟机了，那么本脚本附加IP地址为```1.1.1.34```
:::

- 自动检测可用的IP区间，通过ping检测空余可使用的IP，选取其中之一绑定到虚拟机上
- 如果宿主机自带IPV6子网将可选择是否附加上IPV6地址
- 系统的相关信息将会存储到对应的虚拟机的NOTE中，可在WEB端查看
- 自动附加的IPV4地址与宿主机的IPV4地址是在**同一个子网**内的(IP地址前缀相同)
- 在虚拟机内外进出流量都走绑定的额外IPV4的地址

#### 使用方法

**下载脚本**

国际

```shell
curl -L https://raw.githubusercontent.com/oneclickvirt/pve/main/scripts/buildvm_extra_ip.sh -o buildvm_extra_ip.sh && chmod +x buildvm_extra_ip.sh
```

国内

```shell
curl -L https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/pve/main/scripts/buildvm_extra_ip.sh -o buildvm_extra_ip.sh && chmod +x buildvm_extra_ip.sh
```

**各参数含义**

```shell
./buildvm_extra_ip.sh VMID 用户名 密码 CPU核数 内存大小以MB计算 硬盘大小以GB计算 系统 存储盘 独立IPV6(默认为N)
```

:::tip
注意这里的密码最好仅英文与数字混合，且以英文开头，避免密码在设置过程中因为特殊字符被转义而设置失败
:::

#### 测试示例

```shell
./buildvm_extra_ip.sh 152 test1 oneclick123 1 1024 10 debian12 local N
```

上述命令意义为开设一个带独立IPV4地址的虚拟机

| 属性       | 值             |
|------------|----------------|
| VMID       | 152            |
| 用户名     | test1          |
| 密码       | oneclick123    |
| CPU        | 1核            |
| 内存       | 1024MB         |
| 硬盘       | 10G            |
| 系统       | debian12       |
| 存储盘     | local盘        |
| IPV6附加   | 默认不附加     |

### 手动指定额外IPV4地址开设虚拟机

- 需要手动在命令中指定IPV4地址，且带上子网长度
- 如果宿主机自带IPV6子网将可选择是否附加上IPV6地址
- 如果商家有给IPV4地址和子网长度，请仔细比对，按照下面示例的命令写参数
- 系统的相关信息将会存储到对应的虚拟机的NOTE中，可在WEB端查看
- 可选择是否开启独立IPV6，需要宿主机至少有一个/104的子网，最好是一个/64子网
- 手动附加的IPV4地址与宿主机的IPV4地址是在**不同子网**内的(IP地址前缀不同)，将使用宿主机IP地址做网关
- 手动附加的IPV4地址与宿主机的IPV4地址是在**同一个子网**内的(IP地址前缀相同)，将使用宿主机的网关做网关
- 可选择是否指定虚拟机的MAC地址
- 在虚拟机内外进出流量都走绑定的额外IPV4的地址

:::tip
在**不同子网**内的IP地址，如果附加时不指定MAC地址，那么路由器无法识别源 MAC 地址，流量将被标记为“滥用”，并“可能”导致服务器被阻止。
(如果使用Hetzner的独立服务器务建议提供附加IPV4地址对应的MAC地址防止被报告滥用)
:::

#### 使用方法

**下载脚本**

国际

```shell
curl -L https://raw.githubusercontent.com/oneclickvirt/pve/main/scripts/buildvm_manual_ip.sh -o buildvm_manual_ip.sh && chmod +x buildvm_manual_ip.sh
```

国内

```shell
curl -L https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/pve/main/scripts/buildvm_manual_ip.sh -o buildvm_manual_ip.sh && chmod +x buildvm_manual_ip.sh
```

**各参数含义**

```shell
./buildvm_manual_ip.sh VMID 用户名 密码 CPU核数 内存大小以MB计算 硬盘大小以GB计算 系统 存储盘 IPV4地址 独立IPV6(默认为N) MAC地址(不提供时将不指定虚拟机的MAC地址)
```

:::tip
注意这里的密码最好仅英文与数字混合，且以英文开头，避免密码在设置过程中因为特殊字符被转义而设置失败
:::

#### 测试示例

```shell
./buildvm_manual_ip.sh 152 test1 oneclick123 1 1024 10 debian12 local a.b.c.d/24 N
```

上述命令意义为开设一个带独立IPV4地址的虚拟机

| 属性         | 值                |
|--------------|-------------------|
| VMID         | 152               |
| 用户名       | test1             |
| 密码         | oneclick123       |
| CPU          | 1核              |
| 内存         | 1024MB            |
| 硬盘         | 10G               |
| 系统         | debian12          |
| 存储盘       | local盘 (系统盘)  |
| IPV4地址     | a.b.c.d           |
| 子网         | /24 子网          |
| IPV6         | 无                |
| MAC地址      | 无                |

### 宿主机手动附加额外IPV4地址后再指定IPV4地址开设虚拟机

- 需要自己在```/etc/network/interfaces```中给```vmbr0```添加额外的IPV4地址(注意```chattr -i```解锁文件修改后再```chattr +i```加锁回去)
- 其他功能类似开设NAT的KVM虚拟机，只不过这里映射不再是部分端口映射，也不再是映射到宿主机的IPV4地址上，而是全端口一一映射到额外的IPV4地址上
- 在虚拟机之外，这个虚拟机进出流量走绑定的额外IPV4的地址，在虚拟机之内，流量走原有的宿主机的IPV4地址

:::tip
务必保证开设前你能使用额外的IPV4地址通过SSH登录宿主机，但```curl ip.sb```却仍显示原来的宿主机IPV4地址
:::

#### 使用方法

**下载脚本**

国际

```shell
curl -L https://raw.githubusercontent.com/oneclickvirt/pve/main/scripts/buildvm_fullnat_ip.sh -o buildvm_fullnat_ip.sh && chmod +x buildvm_fullnat_ip.sh
```

国内

```shell
curl -L https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/pve/main/scripts/buildvm_fullnat_ip.sh -o buildvm_fullnat_ip.sh && chmod +x buildvm_fullnat_ip.sh
```

**各参数含义**

```shell
./buildvm_fullnat_ip.sh VMID 用户名 密码 CPU核数 内存大小以MB计算 硬盘大小以GB计算 系统 存储盘 IPV4地址 独立IPV6(默认为N)
```

:::tip
注意这里的密码最好仅英文与数字混合，且以英文开头，避免密码在设置过程中因为特殊字符被转义而设置失败
:::

#### 测试示例

```shell
./buildvm_fullnat_ip.sh 152 test1 oneclick123 1 1024 10 debian12 local a.b.c.d N
```

上述命令意义为开设一个带独立IPV4地址的虚拟机

| 属性         | 值                |
|--------------|-------------------|
| VMID         | 152               |
| 用户名       | test1             |
| 密码         | oneclick123       |
| CPU          | 1核              |
| 内存         | 1024MB            |
| 硬盘         | 10G               |
| 系统         | debian12          |
| 存储盘       | local盘 (系统盘)  |
| IPV4地址     | a.b.c.d           |
| IPV6         | 无                |

## 开设纯IPV6地址的虚拟机

前提是宿主机给的是IPV6子网而不是单独一个IPV6地址，且宿主机未开启MAC地址校验

### 自动选择IPV6地址无需手动指定

- 纯IPV6指绑定的公共IPV6地址，实际虚拟机仍旧有宿主机的IPV4网络但无外网IPV4端口
- 自动检测可用的IPV6区间，对应虚拟机编号的V6地址绑定到虚拟机上
- 系统的相关信息将会存储到对应的虚拟机的NOTE中，可在WEB端查看

#### 使用方法

**下载脚本**

国际

```shell
curl -L https://raw.githubusercontent.com/oneclickvirt/pve/main/scripts/buildvm_onlyv6.sh -o buildvm_onlyv6.sh && chmod +x buildvm_onlyv6.sh
```

国内

```shell
curl -L https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/pve/main/scripts/buildvm_onlyv6.sh -o buildvm_onlyv6.sh && chmod +x buildvm_onlyv6.sh
```

**各参数含义**

```shell
./buildvm_onlyv6.sh VMID 用户名 密码 CPU核数 内存大小以MB计算 硬盘大小以GB计算 系统 存储盘
```

:::tip
注意这里的密码最好仅英文与数字混合，且以英文开头，避免密码在设置过程中因为特殊字符被转义而设置失败
:::

#### 创建示例

```shell
./buildvm_onlyv6.sh 152 test1 oneclick123 1 1024 10 debian12 local
```

上述命令意义为开设一个纯IPV6地址的虚拟机

| 参数         | 值               |
|--------------|------------------|
| VMID         | 152              |
| 用户名       | test1            |
| 密码         | oneclick123      |
| CPU          | 1核              |
| 内存         | 1024MB           |
| 硬盘         | 10G              |
| 系统         | debian12         |
| 存储盘       | local            |


### 删除vm152示例

```shell
qm stop 152
qm destroy 152
systemctl restart ndpresponder.service
rm -rf vm152
```