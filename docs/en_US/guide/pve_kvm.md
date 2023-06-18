## 部分注意事项

**执行本项目的第一个检测环境的命令**，展示如下

<br/>
![coode](./images/pve_kvm/pve_kvm_1.png)  
<br/>

查询如上的只需使用下面的一键脚本自动创建虚拟机即可，无需手动再修改WEB端设置

<br/>
![coode](./images/pve_kvm/pve_kvm_2.png)  
<br/>

查询如上的在使用后续脚本创建了虚拟机后，**可能**需要手动修改WEB端设置，需要关闭对应每个虚拟机的硬件嵌套虚拟化，如下图

<br/>
![coode](./images/pve_kvm/pve_kvm_3.png)  
<br/>

先停止虚拟机再修改，修改完后再开机才能使用NOVNC，不关闭**可能**导致这个虚拟机有BUG无法使用

如果强行安装PVE开KVM，启动不了的也可以关闭这个选项试试能不能启动虚拟机

### 单独开设KVM虚拟化的VM

- 自动开设NAT服务器，默认使用Debian10镜像，因为该镜像占用最小
- 可在命令中自定义需要使用的镜像，这里有给出配置好的镜像，镜像自带空间设置是2~10G硬盘，日常使用**至少10G以上**即可，除非某些镜像开不起来再增加硬盘大小
- 可在命令中指定存储盘位置，默认不指定时为local盘即系统盘，可指定为PVE中显示的挂载盘
- 自定义内存大小推荐512MB内存
:::tip
需要注意的是宿主机内存记得开点swap免得机器炸了[开SWAP点我跳转](https://github.com/spiritLHLS/addswap)
:::
- 自动进行内外网端口映射，含22，80，443端口以及其他25个内外网端口号一样的端口
- 生成后需要等待一段时间虚拟机内部的cloud-init配置好网络以及登陆信息，大概需要5分钟
- 虚拟机的相关信息将会存储到WEB端对应VM的NOTES中，可在WEB端查看

国际

```shell
curl -L https://raw.githubusercontent.com/spiritLHLS/pve/main/scripts/buildvm.sh -o buildvm.sh && chmod +x buildvm.sh
```

国内

```shell
curl -L https://ghproxy.com/https://raw.githubusercontent.com/spiritLHLS/pve/main/scripts/buildvm.sh -o buildvm.sh && chmod +x buildvm.sh
```

#### 使用方法

- 系统支持：详见 [跳转](https://github.com/spiritLHLS/Images/releases/tag/v1.0) 中列出的系统，使用时只需写文件名字，不需要.qcow2尾缀
:::tip
注意这里的用户名不能是纯数字，会造成cloudinit出问题，最好是纯英文或英文开头
:::

```shell
./buildvm.sh VMID 用户名 密码 CPU核数 内存 硬盘 SSH端口 80端口 443端口 外网端口起 外网端口止 系统 存储盘
```

#### 测试示例

* 以下为开设的示例VM的信息：  
`VMID` - 102
`SSH登录的用户名` - test1
`SSH登录的密码` - 1234567
`CPU核数` - 1   
`内存大小` - 512MB
`磁盘大小` - 10G   
`SSH端口` - 40001
`80端口` - 40002
`443端口` - 40003
`内外网映射端口一致的区间` - 50000到50025
`系统` - ubuntu20
`宿主机的存储盘` - local

```shell
./buildvm.sh 102 test1 1234567 1 512 10 40001 40002 40003 50000 50025 ubuntu20 local
```

开设完毕可执行```cat vm102```查看信息，或到WEB端对应VM的NOTES中查看

#### 删除示例

- 停止VM
- 删除VM
- 删除端口映射
- 重启网络
- 删除log文件

```shell
qm stop 102
qm destroy 102
iptables -t nat -F
iptables -t filter -F
service networking restart
systemctl restart networking.service
rm -rf vm102
```

#### 相关qcow2镜像

- 已预安装开启cloudinit，开启SSH登陆，预设值SSH监听V4和V6的22端口，开启允许密码验证登陆，开启允许ROOT登陆

目前使用的镜像列表为

[https://github.com/spiritLHLS/Images/releases/tag/v1.0](https://github.com/spiritLHLS/Images/releases/tag/v1.0)

### 批量开设NAT的KVM虚拟化的VM

:::warning
初次使用前需要保证当前PVE纯净且宿主机未进行过任何端口映射，否则设置冲突可能出现BUG
开设前请使用screen挂起执行，避免批量开设时间过长，SSH不稳定导致中间执行中断
:::
- 可多次运行批量生成VM
- 自动开设NAT服务器，选项留空默认使用debian11镜像，可自定义使用镜像名字，支持的系统名字详见上文支持的镜像列表
- 自动进行内外网端口映射，含22，80，443端口以及其他25个内外网端口号一样的端口
- 生成后需要等待一段时间虚拟机内部的cloudinit配置好网络以及登陆信息，大概需要5分钟，每个虚拟机创建之间有间隔等待60秒避免突发性能不足
- 默认批量开设的虚拟机网络配置为：22，80，443端口及一个25个端口区间的内外网映射
- 可自定义批量开设的核心数，内存大小，硬盘大小，使用宿主机哪个存储盘，记得自己计算好空闲资源开设
- 虚拟机的相关信息将会存储到WEB端对应VM的NOTES中，可在WEB端查看

国际

```shell
curl -L https://raw.githubusercontent.com/spiritLHLS/pve/main/scripts/create_vm.sh -o create_vm.sh && chmod +x create_vm.sh && bash create_vm.sh
```

国内

```shell
curl -L https://ghproxy.com/https://raw.githubusercontent.com/spiritLHLS/pve/main/scripts/create_vm.sh -o create_vm.sh && chmod +x create_vm.sh && bash create_vm.sh
```

开设完毕可执行```cat vmlog```查看信息，或到WEB端对应VM的NOTES中查看

#### 删除所有VM

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
rm -rf vmlog
```

:::tip
PVE修改VM配置前都得停机先，再修改配置，修改完再启动，免得出现配置重载错误
:::

### 开设独立IPV4地址的VM

:::warning
使用前需要保证当前宿主机的IP段带了至少2个IP，且有空余的IP未配置，该空余的IP未绑定宿主机
开设前请使用screen挂起执行，避免开设时间过长，SSH不稳定导致中间执行中断
:::
- 自动检测可用的IP区间，通过ping检测空余可使用的IP，选取其中之一绑定到虚拟机上
- 系统的相关信息将会存储到对应的虚拟机的NOTE中，可在WEB端查看

国际

```shell
curl -L https://raw.githubusercontent.com/spiritLHLS/pve/main/scripts/buildvm_extraip.sh -o buildvm_extraip.sh && chmod +x buildvm_extraip.sh
```

国内

```shell
curl -L https://ghproxy.com/https://raw.githubusercontent.com/spiritLHLS/pve/main/scripts/buildvm_extraip.sh -o buildvm_extraip.sh && chmod +x buildvm_extraip.sh
```

#### 创建示例

```shell
./buildvm_extraip.sh VMID 用户名 密码 CPU核数 内存大小以MB计算 硬盘大小以GB计算 系统 存储盘
```

```shell
./buildvm_extraip.sh 152 test1 1234567 1 1024 10 ubuntu20 local
```

上述命令意义为开设一个带独立IPV4地址的虚拟机，VMID是152，用户名是test1，密码是1234567，CPU是1核，内存是1024MB，硬盘是10G，系统是Ubuntu20，存储盘是local盘也就是系统盘

### 删除示例

```shell
qm stop 152
qm destroy 152
rm -rf vm152
```