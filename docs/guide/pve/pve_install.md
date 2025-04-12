---
outline: deep
---

# PVE主体安装

安装过程中遇到选项不会选的可无脑按回车，本项目所有脚本内置国内外IP自动判断，使用的是不同的安装源与配置文件，有使用CDN加速镜像下载

:::tip
低配置的宿主机，建议所有内容安装完毕后，查看```自定义```分区的内容，进行内存调优，减少内存占用。
:::

## 一键安装PVE

:::tip
建议debian12，实测部分独立服务器的debian11系统会出现一重启网络就失联的情况，debian12没有这种问题
:::

- 安装的是当下apt源最新的PVE
- 比如debian10则是pve6.4，debian11则是pve7.x，debian12则是pve8.x
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

所有修改过的文件均已设置为只读模式，避免重启后文件被覆写

如需修改请使用```chattr -i 文件路径```取消只读锁定，修改完毕请执行```chattr +i 文件路径```进行只读锁定

执行过程中会提示重启系统一次，**重启后务必等待起码20秒确保系统未再次自动重启**

因为原始环境可能缺失```ifupdown```或```ifupdown2```环境，有加载自安装的守护进程进行安装，安装后会再次自动重启系统，等待20秒未自重启确保这个安装已运行完毕

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

## 预配置环境

- 创建资源池mypool(local)
- 移除订阅弹窗
- 尝试开启硬件直通
- 对AppArmor模块检测和自动安装
- 重启系统前推荐挂上[nezha探针](https://github.com/naiba/nezha)方便在后台不通过SSH使用命令行，避免SSH可能因为商家奇葩的预设可能导致重启后root密码丢失
- 执行```reboot```前需要等待后台任务执行完毕，一些宿主机的系统apt命令执行很慢，得等一会才能执行完毕，当然大部分的机器没这么烂

国际

```shell
bash <(wget -qO- --no-check-certificate https://raw.githubusercontent.com/oneclickvirt/pve/main/scripts/build_backend.sh)
```

国内

```shell
bash <(wget -qO- --no-check-certificate https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/pve/main/scripts/build_backend.sh)
```

## 自动配置宿主机的网关

:::warning
**使用前请保证重启过服务器且此时PVE能正常登录进WEB端再执行，重启机器后不要立即执行此命令，待WEB端启动并可登录成功后至少等1分钟再执行本命令**
如果WEB端起不来，执行```systemctl status pveproxy```查看是否启动，如果卡住未启动，执行```systemctl start pveproxy```启动WEB端
:::

:::tip
这一步是最容易造成SSH断开的，原因是未等待PVE内核启动就修改网络会造成设置冲突，所以至少等几分钟待内核启动也就是WEB端启动成功后再执行
:::

:::tip
在执行本命令前如果宿主机需要附加IPV6隧道的地址，请查看```incus的自定义分区```部分的内容附加到对应文件中，但**请忽略它的初始环境修改部分的内容**
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
