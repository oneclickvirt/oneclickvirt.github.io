---
outline: deep
---

# 前言

以下为非自定义部分的介绍，自定义部分有自己对应的介绍，勿弄混了

如果有未适配的商家或机器欢迎联系[@spiritlhl_bot](https://t.me/spiritlhl_bot)，有空会尝试支持一下

:::warning
会改变宿主机的网络结构，请保证宿主机随时可重置系统，且运行前无重要数据在宿主机上
:::

欢迎给项目一个```Star```进行免费的支持-->[https://github.com/oneclickvirt/pve](https://github.com/oneclickvirt/pve)

## 各种要求

建议debian在使用前尽量使用最新的稳定版本的系统

**不要在动态IP的服务器上使用本套脚本(重启机器后自动切换本机IP的服务器暂不支持，重启机器后IP不自动切换的支持)**

本项目的一键安装脚本只适配Debian系统，非Debian无法通过APT源安装，官方只给了Debian的镜像，其他系统只能使用ISO安装，或使用自定义分区和常见问题分区中的其他方式解决问题。

- 系统要求：Debian 8+

:::tip
建议debian12而不是debian11，debian11在部分独立服务器上有网络重启的BUG。
:::

- 硬件要求：2核2G内存```x86_64```或```arm```架构服务器硬盘至少20G
- 可开KVM的硬件要求：VM-X或AMD-V支持 (部分VPS和全部独服支持)
- 如果硬件或系统需求不满足，可使用LXD批量开LXC容器[跳转](https://github.com/spiritLHLS/lxd)

如果使用IPV6隧道进行宿主机的IPV6子网附加，务必在PVE安装成功但网关未自动设置时在对应文件添加内容，不要在一开始(未安装PVE)就进行IPV6隧道的添加。

## 开设虚拟内存(SWAP)

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

## 检测环境

- 本项目相关脚本执行前务必执行本脚本检测环境，如果不符合安装PVE的要求则无法使用后续的脚本
- 检测本机IPV6的网络配置情况(有无IPV6都可安装，只是查询一下罢了)
- 检测硬件配置是否满足最低要求
- 检测硬件环境是否可嵌套虚拟化KVM类型的服务器
- 检测系统环境是否可嵌套虚拟化KVM类型的服务器
- 不可嵌套虚拟化KVM类型的服务器也可以开LXC虚拟化的服务器，但不推荐安装PVE，不如使用[incus](https://github.com/oneclickvirt/incus)

国际

```bash
bash <(wget -qO- --no-check-certificate https://raw.githubusercontent.com/oneclickvirt/pve/main/scripts/check_kernal.sh)
```

国内

```bash
bash <(wget -qO- --no-check-certificate https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/pve/main/scripts/check_kernal.sh)
```

如果你需要更新IPV6信息再查询，那么执行以下命令后再查询

```bash
rm -rf /usr/local/bin/pve_ipv6*
rm -rf /usr/local/bin/pve_check_ipv6*
rm -rf /usr/local/bin/pve_last_ipv6*
```

<br/>
<br/>

