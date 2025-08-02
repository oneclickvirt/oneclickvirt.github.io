---
outline: deep
---

# PVE主体安装

安装过程中遇到选项不会选的可无脑按回车，本项目所有脚本内置国内外IP自动判断，使用的是不同的安装源与配置文件，有使用CDN加速镜像下载

:::tip
低配置的宿主机，建议所有内容安装完毕后，查看```自定义```分区的内容，进行内存调优，减少内存占用。
:::

## 在非物理机器上进行安装

本方法安装的Proxmox可后续使用本项目的所有脚本。

### 一键安装PVE

:::tip
建议debian12，实测部分独立服务器的debian11系统会出现一重启网络就失联的情况，debian12没有这种问题
:::

- 安装的是当下apt源最新的PVE
- 比如debian10则是pve6.4，debian11则是pve7.x，debian12则是pve8.x，debian13则是pve9.x
- ```/etc/hosts```文件修改(修正商家hostname设置错误以及新增PVE所需的内容)
- ```/etc/cloud/cloud.cfg```文件修改(避免覆写已修改的hostname等配置)
- ```/etc/network/interfaces```文件修改(修复auto、dhcp类型为static、增加vmbr0网关)
- 检测是否为中国IP，如果为中国IP使用清华镜像源，否则使用官方源，同时处理apt的源和对应的nameserver，避免断网
- 创建vmbr0(独立IP网关)，宿主机允许addr和gateway为内网IP或外网IP，已自动识别
- vmbr0创建支持开设纯IPV4、纯IPV6、双栈虚拟机，自动识别IPV4地址和IPV6地址，自动识别对应的IP区间
- 安装PVE开虚拟机需要的必备工具包
- x86_64的替换apt源中的企业订阅为社区源，arm的使用第三方修复的补丁构建的源
- 打印查询Linux系统内核和PVE内核是否已安装
- 设置DNS检测```8.8.8.8```的开机自启添加DNS的systemd服务
- 新增PVE的APT源链接后，下载PVE并打印输出登陆信息

所有修改过的文件均已设置为只读模式，避免重启后文件被覆写，如需修改请使用```chattr -i 文件路径```取消只读锁定，修改完毕请执行```chattr +i 文件路径```进行只读锁定

执行过程中会提示重启系统一次，**重启后务必等待起码20秒确保系统未再次自动重启**，因为原始环境可能缺失```ifupdown```或```ifupdown2```环境，有加载安装的守护进程进行安装，安装后会再次自动重启系统，等待20秒未自重启确保这个安装已运行完毕.

如果你需要将新安装的PVE纳管进入已有的集群，那么这块安装的时候，名字就不能回车默认使用```pve```，需要换一个名字避免和集群内的pve本身的hostname冲突.

若宿主机本身存在SLAAC分配的IPV6地址，将可选择是否使用最大的IPV6子网范围，默认回车不使用最大的IPV6子网范围仅使用本机IPV6，若后续需要给虚拟机/容器附加独立的IPV6地址，该选项务必选择```y```.

国际

```shell
curl -L https://raw.githubusercontent.com/oneclickvirt/pve/main/scripts/install_pve.sh -o install_pve.sh && chmod +x install_pve.sh && bash install_pve.sh
```

国内

```shell
curl -L https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/pve/main/scripts/install_pve.sh -o install_pve.sh && chmod +x install_pve.sh && bash install_pve.sh
```

或

```shell
bash install_pve.sh
```

:::tip
安装成功后打开网页可能提示不安全，点击高级或更多选项，坚持访问即可
:::

登录的信息是你SSH的账户和密码

### 预配置环境

- 创建资源池mypool(local)
- 移除订阅弹窗
- 尝试开启硬件直通
- 对AppArmor模块检测和自动安装
- 重启系统前推荐挂上[nezha探针](https://github.com/naiba/nezha)方便在后台不通过SSH使用命令行，避免SSH可能因为商家奇葩的预设可能导致重启后root密码丢失
- 执行```reboot```前需要等待后台任务执行完毕，一些宿主机的系统apt命令执行很慢，得等一会才能执行完毕，当然大部分的机器没这么烂，如果很久都起不来ssh无法连接，那么尝试通过控制面板重启一下服务器

国际

```shell
bash <(wget -qO- --no-check-certificate https://raw.githubusercontent.com/oneclickvirt/pve/main/scripts/build_backend.sh)
```

国内

```shell
bash <(wget -qO- --no-check-certificate https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/pve/main/scripts/build_backend.sh)
```

### 自动配置宿主机的网关

:::warning
**使用前请保证重启过服务器且此时PVE能正常登录进WEB端再执行，重启机器后不要立即执行此命令，待WEB端启动并可登录成功后至少等1分钟再执行本命令**
如果WEB端起不来，执行```systemctl status pveproxy```查看是否启动，如果卡住未启动，执行```systemctl start pveproxy```启动WEB端。
:::

:::tip
这一步是最容易造成SSH断开的，原因是未等待PVE内核启动就修改网络会造成设置冲突，所以至少等几分钟待内核启动也就是WEB端启动成功后再执行。
:::

:::tip
在执行本命令前如果宿主机需要附加IPV6隧道(给没有IPV6地址的宿主机添加IPV6子网)，请查看[IPV6免费子网附加](https://www.spiritlhl.net/guide/incus/incus_custom.html#%E7%BB%99%E5%AE%BF%E4%B8%BB%E6%9C%BA%E9%99%84%E5%8A%A0%E5%85%8D%E8%B4%B9%E7%9A%84ipv6%E5%9C%B0%E5%9D%80%E6%AE%B5)部分的内容附加到对应的配置文件中，但请**忽略**<初始环境修改>的操作，直接进行附加，附加后验证有IPV6地址了再执行下面的一键配置网关的命令。
:::

- 如果vmbr0未创建，则自动创建，逻辑同主体安装一致
- 创建vmbr1(NAT网关)，支持开设NAT的IPV6网络的NAT的IPV4的服务器
- 创建vmbr2(独立IPV6网关)，使用ndppd解决宿主机对IPV6地址进行MAC校验的问题，支持开设带独立IPV6网络的服务器
- 想查看完整设置可以执行```cat /etc/network/interfaces```查看，如需修改网关需要修改该文件，web端已经无法修改
- 加载iptables并设置回源且允许NAT端口转发

简单的说，```vmbr0```负责v4的独立IP，```vmbr1```负责复杂v4/v6的NAT，```vmbr2```负责v6的独立IP

开独立IPV4的虚拟机时使用的vmbr0，gateway同宿主机，IPV4/CIDR使用同一网段的地址和相同的子网掩码，使用宿主机未绑定的IPV4地址做IPV4/CIDR，当然如果后续使用本套脚本无需关注这点细枝末节的东西

开NAT的IPV4的虚拟机时使用vmbr1，gateway使用```172.16.1.1```，IPV4/CIDR使用```172.16.1.x/24```，这里的x不能是1，当然如果后续使用本套脚本无需关注这点细枝末节的东西

国际

```shell
bash <(wget -qO- --no-check-certificate https://raw.githubusercontent.com/oneclickvirt/pve/main/scripts/build_nat_network.sh)
```

国内

```shell
bash <(wget -qO- --no-check-certificate https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/pve/main/scripts/build_nat_network.sh)
```

:::tip
这一步是可能需要你执行成功几分钟后重启系统，详见脚本最后执行完毕的提示，但重启可以保证部分隐藏设置加载成功，有条件务必重启一次服务器
:::

到这一步主体安装完毕。

## 在物理机器上进行安装

本方法安装的Proxmox**不可**后续使用本项目的所有脚本。

本方法未大规模测试和适配，仅本人在本地机器上安装了PVE8.4，路由器本身使用的不是```自动获取IP地址```而是```固定IP地址连接```的方式，如有问题对应仓库开issues.

### U盘刻录官方ISO

官方ISO下载地址：

https://www.proxmox.com/en/downloads/proxmox-virtual-environment/iso

需要提前下载到本地

同时还需要一个读写速率比较好的U盘，用于制作启动盘，由于启动盘需要使用rufus进行启动盘制作，所以需要U盘格式化，需要确保U盘制作前为空U盘

rufus下载地址(下载到你的本地，不是U盘中)：

https://rufus.ie/zh/

或

https://github.com/pbatard/rufus

刻录需要使用DD方式进行刻录，刻录完毕后U盘原数据会被完全擦除。

### PVE主体安装

查找宿主机本身如何进入BIOS，进入BIOS后修改两处地方

1. 安全启动需要关闭

2. Boot的顺序需要将USB的顺序移动到第一位

然后保存设置，然后插入U盘，重新启动系统，选择使用图形界面进行安装

FQDN需要填写一个网址，可以填写类似 pve.spiritlhl.net 这样的网址，最好是你拥有的域名的一个子域名，不是实际的域名的话写成类似 pve.localsite.com 也行，后续不一定用得到

安装完毕后会自动关机重启，重启黑屏后可以拔掉USB，避免又从U盘重启安装了，当然如果忘了又重启到安装页面了，关闭机器后拔掉U盘再启动也行

### 无线网络配置

下载所需的压缩文件和shell脚本

https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/pve/refs/heads/main/extra_scripts/wireless/wireless.zip

https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/pve/refs/heads/main/extra_scripts/wireless/wireless.sh

下载完成后，解压压缩包，将```wireless```的文件夹拖入一个新的U盘的根目录，同时```wireless.sh```文件也得放到根目录。

U盘插到物理机器后，需要挂载U盘，这里的sdx1是第一条命令查询到的U盘的实际路径，需要自行修改

```shell
fdisk -l
mount /dev/sdx1 /mnt
```

U盘内的```wireless.zip```需要确保已解压，打开可见其中的deb文件

此时直接执行一键配置

```shell
bash /mnt/wireless.sh
```

配置完毕会自动重启系统，重启后会有公共网络

配置脚本执行过程中会提示输入WIFI的名字和密码，由于纯CI环境无中文输入法，WIFI的名字必须仅英文数字组成，密码也是

### 其他相关默认配置

下载脚本，类似上面一步那样导入文件

https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/pve/refs/heads/main/extra_scripts/wireless/default.sh

使用前务必确保```curl ip.sb```无问题

```shell
bash default.sh
```

执行会非常耗时，但装完后会自带xfce的桌面环境，且换源阿里云，且去除无效订阅，且设置合并local和loacl-lvm，且设置清华镜像容器源

### 注意事项

物理机安装无限模块后不可使用NAT直接连接虚拟机接入网络，所以本项目后续的教程不支持该方法接入的网桥，本项目后续脚本不支持本方法安装的Proxmox.

目前可行的无线模块在PVE上使用的成功案例，都要求WIFI路由器接入网络的方式是```自动获取IP地址(DHCP)```(后续使用openwrt或ikuai或直接nat后虚拟机内网络可用)，或可在路由器上修改静态路由表，如果WIFI路由器使用```固定IP地址连接网络```，暂时未找到成功案例。
