# 其他自定义配置

:::tip
以下的配置安装会加重母鸡的负担，非必要不要安装
:::

:::tip
如果是个人使用，可忽略防滥用部分脚本的安装
:::

## 自动配置IPV6地址

- (***非必须***，不使用的也没问题)
- **该脚本仅适用于母鸡有给```IPV6```子网且是```/64```的，且母鸡绑定了子网的```第一个IP```做```母鸡的IPV6地址或IPV6的gateway```**
- 自动为LXD创建的LXC容器配置```IPV6```地址
- 已集成到```buildone.sh```中可使用变量控制且无需事先下载，该脚本可不手动使用，在使用```buildone.sh```时配置Y开启即可

下载脚本

国际

```bash
curl -L https://raw.githubusercontent.com/spiritLHLS/lxc/main/scripts/build_ipv6_network.sh -o build_ipv6_network.sh && chmod +x build_ipv6_network.sh
```

国内

```shell
curl -L https://ghproxy.com/https://raw.githubusercontent.com/spiritLHLS/lxc/main/scripts/build_ipv6_network.sh -o build_ipv6_network.sh && chmod +x build_ipv6_network.sh
```

自动为容器配置IPV6映射地址

```bash
bash build_ipv6_network.sh 容器名称
```

映射完毕会打印信息

示例(给test容器自动配置IPV6地址，配置完成会写入一个test_v6的文件信息)

```bash
bash build_ipv6_network.sh test
```

删除所有IPV6已映射的规则

```bash
ip6tables -t nat -F PREROUTING
ip6tables-legacy -t nat -F PREROUTING
ip6tables-save > /etc/iptables/rules.v6
netfilter-persistent save
netfilter-persistent reload
service netfilter-persistent restart
```

卸载IPV6地址绑定的守护进程和对应的文件

```shell
systemctl stop add-ipv6.service
systemctl disable add-ipv6.service
rm /etc/systemd/system/add-ipv6.service
systemctl daemon-reload
rm /usr/local/bin/add-ipv6.sh
```

## 屏蔽容易被滥用的端口的出入流量以屏蔽端口和屏蔽滥用工具包

- (***非必须***，该脚本仅仅是为了防止容器滥用方便，不装的也没问题)
- 事前预防

国际

```shell
curl -L https://raw.githubusercontent.com/spiritLHLS/lxc/main/scripts/rules.sh -o rules.sh && chmod +x rules.sh && bash rules.sh
```

国内

```shell
curl -L https://ghproxy.com/https://raw.githubusercontent.com/spiritLHLS/lxc/main/scripts/rules.sh -o rules.sh && chmod +x rules.sh && bash rules.sh
```

## 使用screen配置监控屏蔽某些进程的执行遇到某些进程的出现直接关闭容器

- 如需停止监控可使用```screen```命令停止```lxc_moniter```这个名字的窗口并删除
- (***非必须***，该脚本仅仅是为了防止容器滥用方便，不装的也没问题)
- 事后停机

国际

```shell
curl -L https://raw.githubusercontent.com/spiritLHLS/lxc/main/scripts/build_monitor.sh -o build_monitor.sh && chmod +x build_monitor.sh && bash build_monitor.sh
```

国内

```shell
curl -L https://ghproxy.com/https://raw.githubusercontent.com/spiritLHLS/lxc/main/scripts/build_monitor.sh -o build_monitor.sh && chmod +x build_monitor.sh && bash build_monitor.sh
```

## 一键安装开lxd母鸡所需要的带vnstat环境的常用预配置环境

- (***非必须***，该脚本仅仅是为了站点对接监控方便，不装的也没问题)

国际

```shell
curl -L https://raw.githubusercontent.com/spiritLHLS/lxc/main/scripts/backend.sh -o backend.sh && chmod +x backend.sh && bash backend.sh
```

国内

```shell
curl -L https://ghproxy.com/https://raw.githubusercontent.com/spiritLHLS/lxc/main/scripts/backend.sh -o backend.sh && chmod +x backend.sh && bash backend.sh
```

## 一键安装母鸡可视化操作的面板

- (***非必须***，该面板只是为了方便可视化操作，没有也没问题)
- 原作者仓库：[跳转](https://github.com/turtle0x1/LxdMosaic)

```shell
lxc config set core.https_address [::]
lxc config set core.trust_password some-secret-string
snap install lxdmosaic
```

安装完毕后打开母鸡IP地址，按照提示设置admin的密码，其他一路默认就能使用面板了
