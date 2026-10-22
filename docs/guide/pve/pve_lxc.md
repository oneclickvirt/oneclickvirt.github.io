---
outline: deep
---

# LXC容器

:::warning
如果你需要在一台服务器上开启超过200个LXC容器，那么不推荐你使用本项目，可能会出现lxcfs访问漂移的问题，产生IO占用无法释放。(系lxc原生问题无法修复)
:::

## 开设LXC容器可使用的镜像

**x86_64：**

自动修补镜像：https://github.com/oneclickvirt/lxc_amd64_images/blob/main/all_images.txt

:::tip
每日自动拉取进行编译和修补
:::

手动修补镜像: https://github.com/oneclickvirt/pve_lxc_images/blob/main/all_images.txt

:::tip
其中的部分镜像有缺陷，不保证所有PVE可用，名字为 ```ubuntu16.04```、```debian6```、```centos7```、```opensuse42.2```、```opensuse42.3``` 非必要不要使用。
:::

和

执行```pveam available --section system```查看官方可用的系统名字和版本号

优先级：自修补镜像(Proxmox-VE 5及其以下版本不支持) > 官方默认镜像(都支持)

已通过脚本自动识别版本使用对应镜像

**arm：**

[https://github.com/oneclickvirt/lxc_arm_images/blob/main/all_images.txt](https://github.com/oneclickvirt/lxc_arm_images/blob/main/all_images.txt)

可在上面的文件中查看支持的系统，其中列出的debian和ubuntu系统不要使用里面的别名，使用数字代号即可。

:::tip
系统参数一律是小写的系统名字拼接版本号，如：debian11，ubuntu22等。
(自修补镜像支持一些偏门系统，如 centos6、centos7、debian8、debian9 等)
:::

**所有系统的CT默认用户名是root**

:::tip
当然有时候会存在特殊情况，version可能是current/base，此时系统参数仅使用英文系统名字即可，如 archlinux、gentoo、kali。
:::

## 单独开设LXC虚拟化的CT

:::warning
初次使用前需要保证当前PVE纯净且宿主机未进行过任何端口映射，否则设置冲突可能出现BUG
:::

:::tip
开设前请使用screen挂起执行，避免批量开设时间过长，SSH不稳定导致中间执行中断
:::

- 自动开设NAT服务器，默认使用Debian11镜像，也可自定义系统
- 自动进行内外网端口映射，含22，80，443端口以及其他26个内外网端口号一样的端口
- 生成后需要等待一段时间虚拟机内部配置好网络以及登陆信息，大概需要3分钟
- 默认开设的网络配置为：22，80，443端口及一个26个端口区间的内外网映射
- 可自定义开设的核心数，内存大小，硬盘大小，使用宿主机哪个存储盘，记得自己计算好空闲资源开设
- 可在命令中指定存储盘位置，默认不指定时为local盘即系统盘，可指定为PVE中显示的挂载盘
- 开设的CT默认已启用SSH且允许root登陆，且已设置支持使用docker的嵌套虚拟化
- 容器的相关信息将会存储到对应的容器的NOTE中，可在WEB端查看
- 如果宿主机自带IPV6子网将自动附加上IPV6网络，但无公网IPV6地址
- 可选择是否开启独立IPV6，需要上游允许使用额外公网地址，并已按[环境安装](pve_install.md)配置对应网关

### 使用方法

**下载脚本**

国际

```shell
curl -L https://raw.githubusercontent.com/oneclickvirt/pve/main/scripts/buildct.sh -o buildct.sh && chmod +x buildct.sh
```

国内

```shell
curl -L https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/pve/main/scripts/buildct.sh -o buildct.sh && chmod +x buildct.sh
```

**各参数含义**

```shell
# ./buildct.sh CTID 密码 CPU核数 内存 硬盘 SSH端口 80端口 443端口 外网端口起 外网端口止 系统 存储盘 独立IPV6(默认为N)
```

内存单位为MB，硬盘单位为GB。最后还可选填第14个参数 `公网IPV4/CIDR` 或 `auto`，也可通过 `PVE_CT_PUBLIC_IPV4` 设置；留空继续使用上面的NAT方式。

填写后会在vmbr0上给容器直接配置公网IPV4，SSH使用22端口，不再创建IPV4端口映射。`auto` 会从宿主机同一子网选择空闲地址，手动指定时要带子网长度，并确认该地址由商家分配且未被占用。例如：

```shell
./buildct.sh 111 oneclick123 1 512 5 0 0 0 0 0 debian11 local N 203.0.113.10/24
```

这里的公网地址仅为示例，务必替换成自己的地址。

### 测试示例

```shell
./buildct.sh 111 oneclick123 1 512 5 20001 20002 20003 30000 30025 debian11 local N
```

开设完毕可执行```cat ct111```查看信息，或在web端的NOTES查看

以下为开设的示例CT的信息：

| 属性                     | 值           |
| ------------------------ | ------------ |
| CTID                     | 111          |
| SSH登录的用户名          | root         |
| SSH登录的密码            | oneclick123  |
| CPU核数                  | 1            |
| 内存大小                 | 512MB        |
| 磁盘大小                 | 5G           |
| SSH端口                  | 20001        |
| 80端口                   | 20002        |
| 443端口                  | 20003        |
| 内外网映射端口一致的区间 | 30000到30025 |
| 系统                     | debian11     |
| 宿主机的存储盘           | local        |
| IPV6                     | 无           |

:::tip
注意这里的CTID仅可使用100到256，其他数字不可用。上面的NAT脚本还要求ID不超过254，避免生成无效的IPV4地址。
:::

### 不创建入站端口映射

将 SSH、HTTP、HTTPS、端口范围起止五个端口参数全部设为 `0`，即可保留内网地址和出网能力，不创建入站端口映射。通过宿主机或可达内网连接实例的 SSH 22 端口。下载上述脚本后，例如：

```bash
./buildct.sh 111 MyPassword 1 512 5 0 0 0 0 0 debian11 local N
```

请求的端口映射写入失败时，脚本会报错，避免将不可连接的实例报告为成功。

## 自定义删除指定容器

- 停止CT
- 删除CT
- 删除端口映射
- 按需重启正在使用的ndpresponder服务
- 删除log文件

**下载脚本**

国际

```shell
curl -L https://raw.githubusercontent.com/oneclickvirt/pve/main/scripts/pve_delete.sh -o pve_delete.sh && chmod +x pve_delete.sh
```

国内

```shell
curl -L https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/pve/main/scripts/pve_delete.sh -o pve_delete.sh && chmod +x pve_delete.sh
```

**使用方法**

可以删除对应CTID的容器，这里用上文中的示例111做演示

```shell
./pve_delete.sh 111
```

实际删除数量不固定，空格分隔每个CTID即可，可一次性删除多个

## 批量开设NAT的LXC虚拟化的CT

:::warning
初次使用前需要保证当前PVE纯净且宿主机未进行过任何端口映射，否则设置冲突可能出现BUG
:::

:::tip
开设前请使用screen挂起执行，避免批量开设时间过长，SSH不稳定导致中间执行中断
:::

- 可多次运行批量生成CT容器，但需要注意的是宿主机内存记得开点swap免得机器炸了[开SWAP点我跳转](https://github.com/spiritLHLS/addswap)
- 每个容器创建之间有间隔等待60秒避免突发性能不足
- 可自定义批量开设的核心数，内存大小，硬盘大小，使用宿主机哪个存储盘，记得自己计算好空闲资源开设
- 开设的CT默认已启用SSH且允许root登陆，且已设置支持使用docker的嵌套虚拟化
- 容器的相关信息将会存储到对应的容器的NOTE中，可在WEB端查看
- 如果宿主机自带IPV6子网将自动附加上IPV6网络，但无公网IPV6地址
- 可选择是否开启独立IPV6，需要上游允许使用额外公网地址，并已按[环境安装](pve_install.md)配置对应网关

国际

```shell
curl -L https://raw.githubusercontent.com/oneclickvirt/pve/main/scripts/create_ct.sh -o create_ct.sh && chmod +x create_ct.sh && bash create_ct.sh
```

国内

```shell
curl -L https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/pve/main/scripts/create_ct.sh -o create_ct.sh && chmod +x create_ct.sh && bash create_ct.sh
```

开设完毕可执行```cat ctlog```查看信息，或在web端的NOTES查看


### 删除所有CT

- 删除所有CT
- 删除对应的端口映射和连接记录
- 按需重启正在使用的ndpresponder服务

先按上文下载pve_delete.sh，再执行：

```shell
for id in $(pct list | awk 'NR>1{print $1}'); do
  ./pve_delete.sh "$id" || break
done
```

## 开设纯IPV6地址的虚拟机

前提是宿主机给的是IPV6子网而不是单独一个IPV6地址，且宿主机未开启MAC地址校验

### 自动选择IPV6地址无需手动指定

- 只配置IPV6网卡，不配置IPV4地址和外网IPV4端口；有可用公网前缀时分配公网IPV6，否则按当前网关配置回退到NAT66出站
- 自动检测可用的IPV6区间，对应容器编号的V6地址绑定到容器上
- 系统的相关信息将会存储到对应的容器的NOTE中，可在WEB端查看

#### 使用方法

**下载脚本**

国际

```shell
curl -L https://raw.githubusercontent.com/oneclickvirt/pve/main/scripts/buildct_onlyv6.sh -o buildct_onlyv6.sh && chmod +x buildct_onlyv6.sh
```

国内

```shell
curl -L https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/pve/main/scripts/buildct_onlyv6.sh -o buildct_onlyv6.sh && chmod +x buildct_onlyv6.sh
```

**各参数含义**

```shell
# ./buildct_onlyv6.sh CTID 密码 CPU核数 内存大小以MB计算 硬盘大小以GB计算 系统 存储盘
```

#### 创建示例

```shell
./buildct_onlyv6.sh 152 oneclick123 1 1024 10 debian13 local
```

上述命令意义为开设一个纯IPV6地址的容器

| 属性      | 值               |
| --------- | ---------------- |
| 容器类型  | CT               |
| CTID      | 152              |
| 用户名    | root             |
| 密码      | oneclick123      |
| CPU核心数 | 1                |
| 内存      | 1024MB           |
| 硬盘      | 10G              |
| 系统      | debian13         |
| 存储盘    | local盘 (系统盘) |

:::tip
注意这里的CTID仅可使用100到256，其他数字不可用
:::
