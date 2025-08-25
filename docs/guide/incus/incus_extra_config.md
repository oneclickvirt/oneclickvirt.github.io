---
outline: deep
---

# 其他自定义配置

:::tip
以下的配置安装会加重宿主机的负担，非必要不要安装
:::

## 自动配置IPV6地址

- (***非必须***，不使用的也没问题)
- **该脚本仅适用于宿主机有给```IPV6```子网且是至少```/112```的，且宿主机绑定了子网的```第一个IP```做```宿主机的IPV6地址或IPV6的gateway```**
- 自动为incus创建的LXC容器配置```IPV6```地址
- 已集成到```buildct.sh```中可使用变量控制且无需事先下载，该脚本可不手动使用，在使用```buildct.sh```时配置Y开启即可

下载脚本

国际

```bash
curl -L https://raw.githubusercontent.com/oneclickvirt/incus/main/scripts/build_ipv6_network.sh -o build_ipv6_network.sh && chmod +x build_ipv6_network.sh
```

国内

```shell
curl -L https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/incus/main/scripts/build_ipv6_network.sh -o build_ipv6_network.sh && chmod +x build_ipv6_network.sh
```

自动为容器配置IPV6映射地址(默认不使用iptables进行映射)

```bash
bash build_ipv6_network.sh 容器名称
```

映射完毕会打印信息

示例(给test容器自动配置IPV6地址，配置完成会写入一个test_v6的文件信息)

```bash
bash build_ipv6_network.sh test
```

**PS：增加ipv6处理过程中可选择是否使用ip6tables进行映射，默认不使用ip6tables方式进行映射而使用新增网络设备的方式进行映射**

使用ip6tables进行映射

```bash
bash build_ipv6_network.sh 容器名称 Y
```

若使用了ip6tables进行映射，则删除所有IPV6已映射的规则可用：

```bash
ip6tables -t nat -F PREROUTING
ip6tables-legacy -t nat -F PREROUTING
ip6tables-save > /etc/iptables/rules.v6
netfilter-persistent save
netfilter-persistent reload
service netfilter-persistent restart
```

卸载IPV6地址绑定的守护进程和对应的文件可用：

```shell
systemctl stop add-ipv6.service
systemctl disable add-ipv6.service
rm /etc/systemd/system/add-ipv6.service
systemctl daemon-reload
rm /usr/local/bin/add-ipv6.sh
```

## 一键安装开incus宿主机所需要的带vnstat环境的常用预配置环境

- (***非必须***，该脚本仅仅是为了站点对接监控方便，不装的也没问题)

国际

```shell
curl -L https://raw.githubusercontent.com/oneclickvirt/incus/main/scripts/backend.sh -o backend.sh && chmod +x backend.sh && bash backend.sh
```

国内

```shell
curl -L https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/incus/main/scripts/backend.sh -o backend.sh && chmod +x backend.sh && bash backend.sh
```

## 安装incus的官方可视化控制面板

- (***非必须***，只是为了方便可视化操作，没有也没问题)

```shell
apt-get install -y incus-ui-canonical
incus config set core.https_address [::]
```

然后你可以在浏览器中输入

```https://你的公网IPV4地址:8443```

即可进入官方可视化操作面板，后续的操作配置按照UI提示操作即可