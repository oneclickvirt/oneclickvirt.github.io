# 系统要求与配置

## 各种要求

建议debian在使用前尽量使用最新的稳定版本的系统

非debian11可使用 [debian一键升级](https://github.com/spiritLHLS/one-click-installation-script#%E4%B8%80%E9%94%AE%E5%8D%87%E7%BA%A7%E4%BD%8E%E7%89%88%E6%9C%ACdebian%E4%B8%BAdebian11) 来升级系统

本项目只适配Debian系统(非Debian无法通过APT源安装，官方只给了Debian的镜像，其他系统只能使用ISO安装)

::tip
建议debian11而不是debian12，因为后者是beta版本，debian11安装的才是稳定版
::
::warning
内存开点swap免得机器炸了[开SWAP点我跳转](https://github.com/spiritLHLS/addswap)
::

- 系统要求：Debian 8+ 
- 硬件要求：2核2G内存x86_64架构服务器硬盘至少20G
- 可开KVM的硬件要求：VM-X或AMD-V支持 (部分VPS和全部独服支持)
- 如果硬件或系统需求不满足，可使用LXD批量开LXC容器[跳转](https://github.com/spiritLHLS/lxc)

**遇到选项不会选的可无脑回车安装，本项目所有脚本内置国内外IP自动判断，使用的是不同的安装源与配置文件，有使用CDN加速镜像下载**

## 检测环境

- 本项目相关脚本执行前务必执行本脚本检测环境，如果不符合安装PVE的要求则无法使用后续的脚本
- 检测硬件配置是否满足最低要求
- 检测硬件环境是否可嵌套虚拟化KVM类型的服务器
- 检测系统环境是否可嵌套虚拟化KVM类型的服务器
- 不可嵌套虚拟化KVM类型的服务器也可以开LXC虚拟化的服务器，但不推荐安装PVE，不如使用[LXD](https://github.com/spiritLHLS/lxc)

国际

::: v-pre
```
bash <(wget -qO- --no-check-certificate https://raw.githubusercontent.com/spiritLHLS/pve/main/scripts/check_kernal.sh)
```
:::

国内

```
bash <(wget -qO- --no-check-certificate https://ghproxy.com/https://raw.githubusercontent.com/spiritLHLS/pve/main/scripts/check_kernal.sh)
```
