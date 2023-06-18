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

国际

```shell
curl -L https://raw.githubusercontent.com/spiritLHLS/pve/main/scripts/buildct.sh -o buildct.sh && chmod +x buildct.sh
```

国内

```shell
curl -L https://ghproxy.com/https://raw.githubusercontent.com/spiritLHLS/pve/main/scripts/buildct.sh -o buildct.sh && chmod +x buildct.sh
```

#### 使用方法

- 系统支持：debian10，debian11，ubuntu18，ubuntu20，ubuntu22，centos8，almalinux9等
- 系统参数一律是小写的系统名字拼接版本号，具体可执行```pveam available --section system```查看可用的系统名字和版本号(注意脚本使用的参数只有小写的英文系统名字拼接版本号)
- 其他系统可能支持可能不支持，自行测试
- 默认用户名是root

```shell
./buildct.sh CTID 密码 CPU核数 内存 硬盘 SSH端口 80端口 443端口 外网端口起 外网端口止 系统 存储盘
```

#### 测试示例

* 以下为开设的示例CT的信息：  
`VMID` - 102
`SSH登录的用户名` - root
`SSH登录的密码` - 1234567
`CPU核数` - 1   
`内存大小` - 512MB
`磁盘大小` - 5G   
`SSH端口` - 20001
`80端口` - 20002
`443端口` - 20003
`内外网映射端口一致的区间` - 30000到30025
`系统` - debian11
`宿主机的存储盘` - local

```shell
./buildct.sh 102 1234567 1 512 5 20001 20002 20003 30000 30025 debian11 local
```

开设完毕可执行```cat ct102```查看信息，或在web端的NOTES查看

#### 删除示例

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
```

## 批量开设NAT的LXC虚拟化的CT

:::warning
初次使用前需要保证当前PVE纯净且宿主机未进行过任何端口映射，否则设置冲突可能出现BUG
开设前请使用screen挂起执行，避免批量开设时间过长，SSH不稳定导致中间执行中断
:::

- 可多次运行批量生成CT容器，但需要注意的是母鸡内存记得开点swap免得机器炸了[开SWAP点我跳转](https://github.com/spiritLHLS/addswap)
- 每个容器创建之间有间隔等待60秒避免突发性能不足
- 可自定义批量开设的核心数，内存大小，硬盘大小，使用宿主机哪个存储盘，记得自己计算好空闲资源开设
- 开设的CT默认已启用SSH且允许root登陆，且已设置支持使用docker的嵌套虚拟化
- 容器的相关信息将会存储到对应的容器的NOTE中，可在WEB端查看

国际

```shell
curl -L https://raw.githubusercontent.com/spiritLHLS/pve/main/scripts/create_ct.sh -o create_ct.sh && chmod +x create_ct.sh && bash create_ct.sh
```

国内

```shell
curl -L https://ghproxy.com/https://raw.githubusercontent.com/spiritLHLS/pve/main/scripts/create_ct.sh -o create_ct.sh && chmod +x create_ct.sh && bash create_ct.sh
```

开设完毕可执行```cat ctlog```查看信息，或在web端的NOTES查看


#### 删除所有CT

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
```