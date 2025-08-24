---
outline: deep
---


# 前言

支持开设 Docker 虚拟化的各系统，含 Linux、Android、Windows 系统

如果你的宿主机本身没有IPV6的子网又想给容器分配IPV6地址，那么请先查看```incus```模块中的```自定义```分区中的```给宿主机附加免费的IPV6地址段```的内容，给宿主机附加上IPV6子网后再进行环境安装

## 开设虚拟内存

:::tip
内存开点swap免得机器炸了
:::

单位换算：输入 1024 产生 1G SWAP-虚拟内存，虚拟内存占用硬盘空间，当实际内存不够用时将自动使用虚拟内存做内存使用，但随之带来IO高占用以及CPU性能占用

建议只开实际内存大小两倍大小的虚拟内存

国际

```shell
curl -L https://raw.githubusercontent.com/spiritLHLS/addswap/main/addswap.sh -o addswap.sh && chmod +x addswap.sh && bash addswap.sh
```

国内

```shell
curl -L https://cdn.spiritlhl.net/https://raw.githubusercontent.com/spiritLHLS/addswap/main/addswap.sh -o addswap.sh && chmod +x addswap.sh && bash addswap.sh
```

## 环境安装

- 检测系统环境，安装对应组件
- 安装docker和docker-compose，这里有判断为国际服务器还是国内服务器，自动安装对应源的docker
- 下载默认需要的一些配置脚本，设置默认的网络配置
- 检测如果存在IPV6地址，检测其是否大于或等于/112，如果符合条件，则配置docker的ipv6的网络
- 如果上述条件都符合，创建ndpresponder的docker和radvd，使得IPV6的分配支持ndp广播和自动分配
- 支持x86_64和ARM架构的服务器
- 安装过程中会要求你输入一些选项，选择Docker安装路径，选择Docker安装是否可限制硬盘

国际

```shell
curl -L https://raw.githubusercontent.com/oneclickvirt/docker/main/scripts/dockerinstall.sh -o dockerinstall.sh && chmod +x dockerinstall.sh && bash dockerinstall.sh
```

国内

```shell
curl -L https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/docker/main/scripts/dockerinstall.sh -o dockerinstall.sh && chmod +x dockerinstall.sh && bash dockerinstall.sh
```

或

```
bash dockerinstall.sh
```

:::tip
环境安装过程中可能要求你重启服务器后再次执行脚本，详见脚本运行后的说明
:::

## 检测Docker是否支持限制容器硬盘大小

国际

```shell
curl -L https://raw.githubusercontent.com/oneclickvirt/docker/refs/heads/main/extra_scripts/disk_test.sh -o disk_test.sh && chmod +x disk_test.sh && bash disk_test.sh
```

国内

```shell
curl -L https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/docker/refs/heads/main/extra_scripts/disk_test.sh -o disk_test.sh && chmod +x disk_test.sh && bash disk_test.sh
```

或者指定不同的存储限制大小（单位：MB），默认测试500MB限制的容器是否限制成功

```shell
# 1GB限制
bash disk_test.sh 1000
```