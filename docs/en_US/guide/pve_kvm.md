---
outline: deep
---

# KVM虚拟化

## SSH登录说明

The virtual machines created through KVM virtualization do not have the username'''root'''by default. To switch to the root user, you need to execute'''sudo -i'''.

**Of course, some templates actually allow logging in with the username ```root```, and the default root password is ```password```. You can give it a try.**

Once you've logged in via SSH and switched to root privileges, it's crucial to change the root password. You can use the following command to do so.

Command:

```bash
bash <(curl -sSL https://raw.githubusercontent.com/fscarmen/tools/main/root.sh) [PASSWORD]
```
## Partial Notes

**Commands to set up the testing environment for executing this project are as follows:**

![图片](https://github.com/oneclickvirt/oneclickvirt.github.io/blob/main/docs/images/pve_kvm/pve_kvm_1.png?raw=true)

To perform the above-mentioned query, you only need to use the one-click script below to automatically create a virtual machine. There is no need to manually modify settings on the web interface.

![图片](https://github.com/oneclickvirt/oneclickvirt.github.io/blob/main/docs/images/pve_kvm/pve_kvm_2.png?raw=true)

After creating the virtual machines using the subsequent script as mentioned above, it **may** be necessary to manually modify the settings on the web interface. You will need to disable hardware nested virtualization for each respective virtual machine, as shown in the following diagram.

![图片](https://github.com/oneclickvirt/oneclickvirt.github.io/blob/main/docs/images/pve_kvm/pve_kvm_3.png?raw=true)

Stop the virtual machine before making modifications. After the modifications are done, you can start the machine to use NOVNC. Failure to close it **may** result in bugs that render this virtual machine unusable.

If you forcibly install PVE to enable KVM, even if the startup fails, you can also disable this option and try to start the virtual machine to see if it works.
:::tip
Please use the "screen" command to suspend execution before launching the virtual machine, in order to avoid prolonged startup times. Unstable SSH connections could lead to interruptions during the intermediate execution.
:::

## Images available for creating KVM virtual machines

- Pre-installed with cloud-init enabled.
- Enabled SSH login.
- Pre-configured SSH to listen on ports 22 for both IPv4 and IPv6.
- Enabled password authentication for login.
- Enabled root login.
- Partially pre-installed QEMU guest agent.

The list of currently available image names is as follows:

[https://github.com/oneclickvirt/kvm_images/blob/main/list.text](https://github.com/oneclickvirt/kvm_images/blob/main/list.text)

## Virtual machines with standalone NAT configuration in KVM virtualization.

- Automatically deploy NAT servers with the default Debian 10 image, chosen for its minimal footprint.
- It's possible to customize the image used through the command, and pre-configured images are available. These images come with storage settings ranging from 2 to 10 GB of disk space. For regular use, **at least 10 GB** of disk space is recommended. You can increase the disk size if certain images fail to start.
- The command allows for specifying the storage disk location. When not specified, it defaults to the local disk, which is the system disk. It can also be set to a mount disk as displayed in PVE.
- Recommended custom memory size is 512 MB.
- Automatic internal and external port mapping, including ports 22, 80, 443, and 25 other port numbers shared between internal and external networks.
- After generation, there's a wait time for the virtual machine's internal cloud-init configuration to establish network and login information. This process takes approximately 5 minutes.
- Pertinent virtual machine information will be stored in the NOTES section of the corresponding VM on the web interface, accessible for viewing through the web portal.
- If the host machine has an IPV6 subnet, IPV6 networking will be automatically added. However, there won't be any public IPV6 addresses.

Command:

```shell
curl -L https://raw.githubusercontent.com/spiritLHLS/pve/main/scripts/buildvm.sh -o buildvm.sh && chmod +x buildvm.sh
```

### Usage Instructions

- System Support:
- For x86_64 architecture systems listed in [this link](https://github.com/oneclickvirt/kvm_images/releases/tag/v1.0), simply use the filename without the .qcow2 extension when using. 
- For arm architecture systems listed at [this link](http://cloud-images.ubuntu.com/), use the system name and version number, such as ubuntu20 or ubuntu22.

:::tip
Note that usernames consisting of only numbers may cause issues with cloud-init. It's preferable to use usernames that are entirely in English or start with an English character.
:::

```shell
./buildvm.sh VMID Username Password Number_of_CPU_Cores Memory Disk SSH_Port Port_80 Port_443 Public_Port_Start Public_Port_End System Storage_Disk
```

### Test Example

```shell
./buildvm.sh 102 test1 oneclick123 1 512 10 40001 40002 40003 50000 50025 debian11 local
```

After setup is completed, you can execute ```cat vm102``` to view the information or check the NOTES section for the corresponding VM on the WEB interface.

Below is the information for the example VM that has been set up:

| Attribute                | Value          |
|-------------------------|----------------|
| VMID                     | 102            |
| SSH Username             | test1          |
| SSH Password             | oneclick123    |
| Number of CPU Cores      | 1              |
| Memory Size              | 512MB          |
| Disk Size                | 10G            |
| SSH Port                 | 40001          |
| Port 80                  | 40002          |
| Port 443                 | 40003          |
| Port Range for NAT       | 50000 to 50025 |
| Operating System         | debian11       |
| Host Storage Disk        | local          |

### 删除示例

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

Command:

```shell
curl -L https://raw.githubusercontent.com/spiritLHLS/pve/main/scripts/create_vm.sh -o create_vm.sh && chmod +x create_vm.sh && bash create_vm.sh
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
rm -rf vmlog
rm -rf vm*
```

:::tip
PVE修改VM配置前都得停机先，再修改配置，修改完再启动，免得出现配置重载错误
:::

## 开设独立IPV4地址的虚拟机

两个版本，各取所需

### 自动选择IPV4地址无需手动指定的版本

:::warning
使用前需要保证当前宿主机的IP段带了至少2个IP，且有空余的IP未配置，该空余的IP未绑定宿主机
:::

- 自动检测可用的IP区间，通过ping检测空余可使用的IP，选取其中之一绑定到虚拟机上
- 如果宿主机自带IPV6子网将可选择是否附加上IPV6地址
- 系统的相关信息将会存储到对应的虚拟机的NOTE中，可在WEB端查看

Command:

```shell
curl -L https://raw.githubusercontent.com/spiritLHLS/pve/main/scripts/buildvm_extraip.sh -o buildvm_extraip.sh && chmod +x buildvm_extraip.sh
```

#### 创建示例

```shell
./buildvm_extraip.sh VMID 用户名 密码 CPU核数 内存大小以MB计算 硬盘大小以GB计算 系统 存储盘 是否附加IPV6(默认为N)
```

```shell
./buildvm_extraip.sh 152 test1 oneclick123 1 1024 10 debian12 local N
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

### 需要手动指定IPV4地址的版本

- 需要手动在命令中指定IPV4地址，且带上子网长度
- 如果宿主机自带IPV6子网将可选择是否附加上IPV6地址
- 如果商家有给IPV4地址和子网长度，请仔细比对，按照下面示例的命令写参数
- 系统的相关信息将会存储到对应的虚拟机的NOTE中，可在WEB端查看

Command:

```shell
curl -L https://raw.githubusercontent.com/spiritLHLS/pve/main/scripts/buildvm_manual_ip.sh -o buildvm_manual_ip.sh && chmod +x buildvm_manual_ip.sh
```

#### 创建示例

```shell
./buildvm_manual_ip.sh VMID 用户名 密码 CPU核数 内存大小以MB计算 硬盘大小以GB计算 系统 存储盘 IPV4地址 是否附加IPV6(默认为N)
```

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

## 开设纯IPV6地址的虚拟机

前提是宿主机给的是IPV6子网而不是单独一个IPV6地址，且宿主机未开启MAC地址校验

### 自动选择IPV6地址无需手动指定

- 自动检测可用的IPV6区间，对应虚拟机编号的V6地址绑定到虚拟机上
- 系统的相关信息将会存储到对应的虚拟机的NOTE中，可在WEB端查看

Command:

```shell
curl -L https://raw.githubusercontent.com/spiritLHLS/pve/main/scripts/buildvm_onlyv6.sh -o buildvm_onlyv6.sh && chmod +x buildvm_onlyv6.sh
```

#### 创建示例

```shell
./buildvm_onlyv6.sh VMID 用户名 密码 CPU核数 内存大小以MB计算 硬盘大小以GB计算 系统 存储盘
```

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


## 删除vm152示例

```shell
qm stop 152
qm destroy 152
rm -rf vm152
```
