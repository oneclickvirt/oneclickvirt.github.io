---
outline: deep
---

# incus主体安装

如果你的宿主机本身没有IPV6的子网又想给容器分配IPV6地址，那么请先查看```incus```模块中的```自定义```分区中的```给宿主机附加免费的IPV6地址段```的内容，给宿主机附加上IPV6子网后再进行环境安装

## 一键安装

:::warning
如果是全新的服务器，务必保证```curl```命令可用且```update```无问题再执行本脚本。
:::

- 环境要求：Ubuntu 20+(不推荐Incus请使用LXD), Debian 11+(推荐), RockyLinux 9+, AlmaLinux 9+, Centos 9+
- 这里的虚拟内存是说要开的SWAP大小，存储池则是你所有要开的服务器占的盘的大小的总和
- 环境安装过程后需要重启服务器以加载一些默认配置
- 默认启用lxd的lxcfs相关配置，使得容器内查询容器信息变更为容器本身的信息而不是宿主机信息
- 实测本安装程序在物理机器或非物理机器上都可使用

国际

```shell
curl -L https://raw.githubusercontent.com/oneclickvirt/incus/main/scripts/incus_install.sh -o incus_install.sh && chmod +x incus_install.sh && bash incus_install.sh
```

国内

```shell
curl -L https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/incus/main/scripts/incus_install.sh -o incus_install.sh && chmod +x incus_install.sh && bash incus_install.sh
```

或

```shell
bash incus_install.sh
```

初始化配置的例子：

如果系统盘除去已占用空间还有18G硬盘空余，想开2G虚拟内存(2048MB的SWAP)，15G的存储池，按照命令行的提示则依次输入```2048```和```15```

:::tip
执行过程中**可能**会要求**手动重启**加载存储类型到内核中，安装完毕执行到最后会**自动进行服务器重启**，首次完整安装完毕后的重启大概耗时400~500秒，请耐心等待
:::

:::warning
如果你需要在一台服务器上开启超过200个INCUS容器，那么不推荐你使用本项目，可能会出现lxcfs访问漂移的问题，产生IO占用无法释放。(系lxc原生问题无法修复)
:::

## 手动安装(备选)

不推荐，只是为了一些奇葩环境一键脚本跑不动的时候进行安装

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
curl -L https://raw.githubusercontent.com/oneclickvirt/incus/main/scripts/swap.sh -o swap.sh && chmod +x swap.sh && bash swap.sh
```

国内

```shell
curl -L https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/incus/main/scripts/swap.sh -o swap.sh && chmod +x swap.sh && bash swap.sh
```

### 安装incus

实际swap开的虚拟内存应该是实际内存的2倍，也就是开1G是合理的，上面我描述的情况属于超开了

```
sudo -i
mkdir -p /etc/apt/keyrings/
curl -fsSL https://pkgs.zabbly.com/key.asc | gpg --dearmor -o /etc/apt/keyrings/zabbly.gpg
sh -c 'cat <<EOF > /etc/apt/sources.list.d/zabbly-incus-stable.sources
Enabled: yes
Types: deb
URIs: https://pkgs.zabbly.com/incus/stable
Suites: $(. /etc/os-release && echo ${VERSION_CODENAME})
Components: main
Architectures: $(dpkg --print-architecture)
Signed-By: /etc/apt/keyrings/zabbly.gpg
EOF'
apt-get update
apt-get install incus -y
incus -h
```

如果无异常，继续执行

```
incus admin init
```

一般的选项回车默认即可

选择配置物理盘大小(提示默认最小1GB那个选项)，一般我填空闲磁盘大小减去内存大小后乘以0.95并向下取整，这里我填了10GB

提示带auto的更新image的选项记得选no，避免更新占用系统

```
incus -h
```
