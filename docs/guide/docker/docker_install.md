---
outline: deep
---


# 前言

支持开设 Docker 虚拟化的各系统，含 Linux、Android、Windows 系统

如果宿主机没有 IPv6 子网但你希望给容器分配 IPv6 地址，可先参考 ```Incus``` 或 ```LXD``` 模块中 ```自定义``` 分区的 ```给宿主机附加免费的IPv6地址段```，先给宿主机附加 IPv6 子网后再进行环境安装。

## 开设虚拟内存

:::tip
建议适当增加 swap，避免内存不足导致宿主机失去响应。
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

- 支持系统：Ubuntu, Debian, RockyLinux 9+, AlmaLinux 9+, CentOS 9+, Alpine(自行安装bash后), Arch
- 检测系统环境，安装对应组件
- 安装docker和docker-compose，这里有判断为国际服务器还是国内服务器，自动安装对应源的docker
- 下载默认需要的一些配置脚本，设置默认的网络配置
- 若检测到 IPv6 地址且子网掩码大于或等于 /112，则自动配置 Docker 的 IPv6 网络。
- 满足上述条件时，会创建 `ndpresponder` 和 `radvd` 容器，使 IPv6 分配支持 NDP 广播和自动分配。
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

## 卸载 Docker 环境

一键卸载 Docker 全套环境，包括所有容器、镜像、网络、systemd 服务、二进制文件：

国际

```shell
bash <(curl -sSL https://raw.githubusercontent.com/oneclickvirt/docker/main/dockeruninstall.sh)
```

国内

```shell
bash <(curl -sSL https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/docker/main/dockeruninstall.sh)
```

:::warning
脚本会在执行前要求输入 `yes` 确认，操作不可逆。删除内容包括所有容器、镜像、网络配置。
复测流程：先执行卸载，再执行安装，即可从零验证整个安装流程。
:::