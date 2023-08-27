---
outline: deep
---

# LXD主体安装

## 手动安装

新手推荐，避免有bug不知道怎么修，当然如果只是图方便又是老手懂排查BUG，用后面的一键安装也行

### 关闭防火墙

```bash
apt update
apt install curl wget sudo dos2unix ufw jq -y
ufw disable
```

### 开设虚拟内存SWAP

内存看你开多少服务器，这里如果要开8个，换算需要2G内存，实际内存如果是512MB内存，还需要开1.5G，保守点开2G虚拟内存即可

执行下面命令，输入1，再输入2048，代表开2G虚拟内存

国际

```shell
curl -L https://raw.githubusercontent.com/spiritLHLS/lxd/main/scripts/swap.sh -o swap.sh && chmod +x swap.sh && bash swap.sh
```

国内

```shell
curl -L https://ghproxy.com/https://raw.githubusercontent.com/spiritLHLS/lxd/main/scripts/swap.sh -o swap.sh && chmod +x swap.sh && bash swap.sh
```

### 安装LXD

实际swap开的虚拟内存应该是实际内存的2倍，也就是开1G是合理的，上面我描述的情况属于超开了

```
apt install snapd -y
snap install lxd
/snap/bin/lxd init
```

如果上面的命令中出现下面的错误

(snap "lxd" assumes unsupported features: snapd2.39 (try to update snapd and refresh the core snap))

使用命令修补后再进行lxd的安装

```
snap install core
```

如果无异常，上面三行命令执行结果如下

![图片](https://user-images.githubusercontent.com/103393591/233270028-5a43d0f7-45f5-4175-969e-d4d182cb877a.png)

一般的选项回车默认即可

选择配置物理盘大小(提示默认最小1GB那个选项)，一般我填空闲磁盘大小减去内存大小后乘以0.95并向下取整，这里我填了10GB

提示带auto的更新image的选项记得选no，避免更新占用系统

测试lxc有没有软连接上

```
lxc -h
```

如果报错则执行以下命令软连接lxc命令

```bash
! lxc -h >/dev/null 2>&1 && echo 'alias lxc="/snap/bin/lxc"' >> /root/.bashrc && source /root/.bashrc
export PATH=$PATH:/snap/bin
```

连接后再测试lxc命令是否有报错找不到

## 一键安装

:::warning
如果是全新的服务器，务必保证apt update和apt install curl都无问题再执行本脚本
:::

:::tip
且自开机起最好等待5分钟后再执行以下命令，避免系统默认设置中就执行了本脚本导致apt源卡死
:::

- 环境要求：Ubuntu 18+(推荐)，Debian 8+(仅限x86_64架构)

**如果是Debian系的宿主机，务必在screen中执行本脚本，避免长期运行时SSH中断导致ZFS编译安装失败**

这里的虚拟内存是说要开的SWAP大小，存储池则是你所有要开的服务器占的盘的大小的总和

环境安装过程中**可能需要重启服务器以加载含zfs的内核，然后再次执行安装命令，一切以运行后命令行的提示为准**

如果脚本提示重启系统后需要再次执行脚本，第二次执行安装脚本仍提示重启系统加载内核，那么意味着内核在上一次加载中失败了，最好重装宿主机系统为ubuntu系解决这个问题

每次执行脚本都需要输入一次初始化的配置，所以遇到脚本提示需重启系统再次执行，那么就得再次输入初始化的配置

国际

```shell
curl -L https://raw.githubusercontent.com/spiritLHLS/lxd/main/scripts/lxdinstall.sh -o lxdinstall.sh && chmod +x lxdinstall.sh && bash lxdinstall.sh
```

国内

```shell
curl -L https://ghproxy.com/https://raw.githubusercontent.com/spiritLHLS/lxd/main/scripts/lxdinstall.sh -o lxdinstall.sh && chmod +x lxdinstall.sh && bash lxdinstall.sh
```

初始化配置的例子：

如果系统盘除去已占用空间还有18G硬盘空余，想开2G虚拟内存(2048MB的SWAP)，15G的存储池，按照命令行的提示则依次输入```2048```和```15```
