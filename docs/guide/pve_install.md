# PVE主体安装

## 一键安装PVE

- 安装的是当下apt源最新的PVE
- 比如debian10则是pve6.4，debian11则是pve7.x，debian12则是pve8.x
:::tip
建议debian11而不是debian12，因为后者是beta版本，debian11安装的才是稳定版
:::
- /etc/hosts文件修改(修正商家hostname设置错误以及新增PVE所需的内容)
- 已设置```/etc/hosts```为只读模式，避免重启后文件被覆写，如需修改请使用```chattr -i /etc/hosts```取消只读锁定，修改完毕请执行```chattr +i /etc/hosts```只读锁定
- 检测```/etc/cloud/cloud.cfg```如果发现```preserve_hostname```是```false```，则改为```true```，同上，也用chattr命令进行了文件锁定避免重启覆盖设置
- 检测是否为中国IP，如果为中国IP使用清华镜像源，否则使用官方源
- 安装PVE开虚拟机需要的必备工具包
- 替换apt源中的企业订阅为社区源
- 打印查询Linux系统内核和PVE内核是否已安装
- 检测```/etc/resolv.conf```是否为空，为空则设置检测```8.8.8.8```的开机自启添加DNS的systemd服务
- 新增PVE的APT源链接后，下载PVE并打印输出登陆信息

国际

```shell
curl -L https://raw.githubusercontent.com/spiritLHLS/pve/main/scripts/install_pve.sh -o install_pve.sh && chmod +x install_pve.sh && bash install_pve.sh
```

国内

```shell
curl -L https://ghproxy.com/https://raw.githubusercontent.com/spiritLHLS/pve/main/scripts/install_pve.sh -o install_pve.sh && chmod +x install_pve.sh && bash install_pve.sh
```

或

```shell
bash install_pve.sh
```

## 预配置环境

- 创建资源池mypool
- 移除订阅弹窗
- 尝试开启硬件直通
- 检测AppArmor模块并试图安装
- 重启系统前推荐挂上[nezha探针](https://github.com/naiba/nezha)方便在后台不通过SSH使用命令行，避免SSH可能因为商家奇葩的预设导致重启后root密码丢失
- **执行完毕建议等待一分钟后再重启服务器**
- 执行```reboot```前需要等待后台任务执行完毕，一些宿主机的系统apt命令执行很慢，得等一会才能执行完毕，当然大部分的机器没这么烂

国际

```shell
bash <(wget -qO- --no-check-certificate https://raw.githubusercontent.com/spiritLHLS/pve/main/scripts/build_backend.sh)
```

国内

```shell
bash <(wget -qO- --no-check-certificate https://ghproxy.com/https://raw.githubusercontent.com/spiritLHLS/pve/main/scripts/build_backend.sh)
```

## 自动配置宿主机的网关

:::warning
使用前请保证重启过服务器且此时PVE能正常使用WEB端再执行，重启机器后不要立即执行此命令，待WEB端启动成功后至少等5分钟再执行本命令
:::

:::tip
这一步是最容易造成SSH断开的，原因是未等待PVE内核启动就修改网络会造成设置冲突，所以至少等几分钟待内核启动也就是WEB端启动成功后再执行
:::

- 创建vmbr0(独立IP网关)，宿主机允许addr和gateway为内网IP或外网IP，已自动识别
- vmbr0创建支持纯IPV4或双栈服务器，自动识别IPV4地址和IPV6地址，自动识别对应的IP区间
- 开独立IPV4的虚拟机时使用vmbr0，使用同宿主机一致的gateway，使用宿主机未绑定的IPV4地址做IPV4/CIDR，当然如果后续使用本套脚本无需关注这点细枝末节的东西
- 创建vmbr1(NAT网关)，暂不支持开设带独立IPV6地址的NAT的IPV4虚拟机
- 开NAT虚拟机时使用vmbr1，gateway使用```172.16.1.1```，IPV4/CIDR使用```172.16.1.x/24```，这里的x不能是1，当然如果后续使用本套脚本无需关注这点细枝末节的东西
- 想查看完整设置可以执行```cat /etc/network/interfaces```查看
- 加载iptables并设置回源且允许NAT端口转发

国际

```shell
bash <(wget -qO- --no-check-certificate https://raw.githubusercontent.com/spiritLHLS/pve/main/scripts/build_nat_network.sh)
```

国内

```shell
bash <(wget -qO- --no-check-certificate https://ghproxy.com/https://raw.githubusercontent.com/spiritLHLS/pve/main/scripts/build_nat_network.sh)
```

:::tip
这一步是可能需要你执行成功几分钟后重启系统，详见脚本最后执行完毕的提示
:::
