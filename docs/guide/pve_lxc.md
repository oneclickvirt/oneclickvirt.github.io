---
outline: deep
---

# LXC虚拟化

## 单独开设LXC虚拟化的CT

:::warning
初次使用前需要保证当前PVE纯净且宿主机未进行过任何端口映射，否则设置冲突可能出现BUG
:::

:::tip
开设前请使用screen挂起执行，避免批量开设时间过长，SSH不稳定导致中间执行中断
:::

- 自动开设NAT服务器，默认使用Debian11镜像，也可自定义系统
- 自动进行内外网端口映射，含22，80，443端口以及其他25个内外网端口号一样的端口
- 生成后需要等待一段时间虚拟机内部配置好网络以及登陆信息，大概需要3分钟
- 默认开设的网络配置为：22，80，443端口及一个25个端口区间的内外网映射
- 可自定义开设的核心数，内存大小，硬盘大小，使用宿主机哪个存储盘，记得自己计算好空闲资源开设
- 可在命令中指定存储盘位置，默认不指定时为local盘即系统盘，可指定为PVE中显示的挂载盘
- 开设的CT默认已启用SSH且允许root登陆，且已设置支持使用docker的嵌套虚拟化
- 容器的相关信息将会存储到对应的容器的NOTE中，可在WEB端查看
- 如果宿主机自带IPV6子网将自动附加上IPV6网络，但无公网IPV6地址
- 可选择是否开启独立IPV6，需要宿主机至少有一个/64的子网

### 使用方法

下载脚本

国际

```shell
curl -L https://raw.githubusercontent.com/spiritLHLS/pve/main/scripts/buildct.sh -o buildct.sh && chmod +x buildct.sh
```

国内

```shell
curl -L https://ghproxy.com/https://raw.githubusercontent.com/spiritLHLS/pve/main/scripts/buildct.sh -o buildct.sh && chmod +x buildct.sh
```

* 系统支持：
- debian10，debian11
- ubuntu18，ubuntu20，ubuntu22
- centos8，almalinux9
- 其他系统可能支持可能不支持，自行测试

:::tip
系统参数一律是小写的系统名字拼接版本号，x86_64的具体可执行```pveam available --section system```查看可用的系统名字和版本号，arm的可在[https://mirror.tuna.tsinghua.edu.cn/lxc-images/images/](https://mirror.tuna.tsinghua.edu.cn/lxc-images/images/)中查看支持的系统，版本号类同执行```pveam available --section system```查看到的版本号。
(注意脚本使用的参数只有小写的英文系统名字拼接版本号)
:::

所有系统的CT默认用户名是root

```shell
./buildct.sh CTID 密码 CPU核数 内存 硬盘 SSH端口 80端口 443端口 外网端口起 外网端口止 系统 存储盘 独立IPV6(默认为N)
```

### 测试示例

```shell
./buildct.sh 102 oneclick123 1 512 5 20001 20002 20003 30000 30025 debian11 local N
```

开设完毕可执行```cat ct102```查看信息，或在web端的NOTES查看

以下为开设的示例CT的信息：

| 属性                       | 值          |
|---------------------------|-------------|
| VMID                      | 102         |
| SSH登录的用户名            | root        |
| SSH登录的密码              | oneclick123 |
| CPU核数                    | 1           |
| 内存大小                  | 512MB       |
| 磁盘大小                  | 5G          |
| SSH端口                    | 20001       |
| 80端口                     | 20002       |
| 443端口                    | 20003       |
| 内外网映射端口一致的区间    | 30000到30025|
| 系统                       | debian11    |
| 宿主机的存储盘              | local       |
| IPV6         | 无                |

### 删除示例

- 停止CT
- 删除CT
- 删除端口映射
- 重启网络
- 删除log文件

```shell
pct stop 102
pct destroy 102
rm -rf ct102
iptables -t nat -F
iptables -t filter -F
service networking restart
systemctl restart networking.service
systemctl restart ndpresponder.service
iptables-save | awk '{if($1=="COMMIT"){delete x}}$1=="-A"?!x[$0]++:1' | iptables-restore
```

## 批量开设NAT的LXC虚拟化的CT

:::warning
初次使用前需要保证当前PVE纯净且宿主机未进行过任何端口映射，否则设置冲突可能出现BUG
:::

:::tip
开设前请使用screen挂起执行，避免批量开设时间过长，SSH不稳定导致中间执行中断
:::

- 可多次运行批量生成CT容器，但需要注意的是母鸡内存记得开点swap免得机器炸了[开SWAP点我跳转](https://github.com/spiritLHLS/addswap)
- 每个容器创建之间有间隔等待60秒避免突发性能不足
- 可自定义批量开设的核心数，内存大小，硬盘大小，使用宿主机哪个存储盘，记得自己计算好空闲资源开设
- 开设的CT默认已启用SSH且允许root登陆，且已设置支持使用docker的嵌套虚拟化
- 容器的相关信息将会存储到对应的容器的NOTE中，可在WEB端查看
- 如果宿主机自带IPV6子网将自动附加上IPV6网络，但无公网IPV6地址

国际

```shell
curl -L https://raw.githubusercontent.com/spiritLHLS/pve/main/scripts/create_ct.sh -o create_ct.sh && chmod +x create_ct.sh && bash create_ct.sh
```

国内

```shell
curl -L https://ghproxy.com/https://raw.githubusercontent.com/spiritLHLS/pve/main/scripts/create_ct.sh -o create_ct.sh && chmod +x create_ct.sh && bash create_ct.sh
```

开设完毕可执行```cat ctlog```查看信息，或在web端的NOTES查看


### 删除所有CT

- 删除所有CT
- 删除所有nat的端口映射
- 重启网络
- 删除log文件

```shell
pct list | awk 'NR>1{print $1}' | xargs -I {} sh -c 'pct stop {}; pct destroy {}'
rm -rf ct*
iptables -t nat -F
iptables -t filter -F
service networking restart
systemctl restart networking.service
systemctl restart ndpresponder.service
iptables-save | awk '{if($1=="COMMIT"){delete x}}$1=="-A"?!x[$0]++:1' | iptables-restore
```

## 开设纯IPV6地址的虚拟机

前提是宿主机给的是IPV6子网而不是单独一个IPV6地址，且宿主机未开启MAC地址校验

### 自动选择IPV6地址无需手动指定

- 自动检测可用的IPV6区间，对应容器编号的V6地址绑定到容器上
- 系统的相关信息将会存储到对应的容器的NOTE中，可在WEB端查看

国际

```shell
curl -L https://raw.githubusercontent.com/spiritLHLS/pve/main/scripts/buildct_onlyv6.sh -o buildct_onlyv6.sh && chmod +x buildct_onlyv6.sh
```

国内

```shell
curl -L https://ghproxy.com/https://raw.githubusercontent.com/spiritLHLS/pve/main/scripts/buildct_onlyv6.sh -o buildct_onlyv6.sh && chmod +x buildct_onlyv6.sh
```

#### 创建示例

```shell
./buildct_onlyv6.sh CTID 密码 CPU核数 内存大小以MB计算 硬盘大小以GB计算 系统 存储盘
```

```shell
./buildct_onlyv6.sh 152 oneclick123 1 1024 10 debian12 local
```

上述命令意义为开设一个纯IPV6地址的容器

| 属性         | 值               |
|--------------|-----------------|
| 容器类型       | CT              |
| CTID         | 152             |
| 用户名         | root            |
| 密码          | oneclick123     |
| CPU核心数     | 1               |
| 内存          | 1024MB          |
| 硬盘          | 10G             |
| 系统          | debian12        |
| 存储盘         | local盘 (系统盘) |

#### 删除示例

```shell
rm -rf ct*
pct stop 152 
pct destroy 152
systemctl restart ndpresponder.service
```
