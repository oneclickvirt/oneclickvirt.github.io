---
outline: deep
---

# 在 Incus 中运行 LXC 容器

## 开设LXC容器可使用的镜像

这里展示一部分可使用的系统参数供你参考：

- debian10，debian11，debian12, debian13
- ubuntu18，ubuntu20，ubuntu22
- centos8，centos9 (实际开设出来都是Stream版本)
- alpine3.15，alpine3.16，alpine3.17，alpine3.18
- openwrt21，openwrt22，fedora37，fedora38，fedora39
- rockylinux8，rockylinux9，oralce8，oracle9
- oralce7，centos7 (都需要在GRUB中启用CGroupV1否则无法启动，详细介绍见常见问题答疑)
- kali，archlinux

* 注意都是**小写字母+数字**的组合或**仅小写字母**，自行尝试，如果搜索无该系统则会自动退出脚本
* 版本号可以带英文小数点，为了适配alpine的版本号已支持
* 开不起来的可能是硬盘或内存不够大或者本身就不适配宿主机，自行尝试查看开不起来的报错
* 目前使用的容器系统有三重筛选，优先级：[自编译](https://github.com/oneclickvirt/incus_images)、[官方](https://images.linuxcontainers.org/)、[opsmaru](https://images.opsmaru.com/)
* 自编译镜像完整的支持系统的列表：[x86_64_all_images.txt](https://github.com/oneclickvirt/incus_images/blob/main/x86_64_all_images.txt) 和 [arm64_all_images.txt](https://github.com/oneclickvirt/incus_images/blob/main/arm64_all_images.txt)

## 单独生成一个NAT服务器

- 只生成一个NAT服务器，可自定义限制所有内容

### 下载脚本

下载开机脚本是**非必须**的，如果你使用过一键安装incus的命令，自动已下载对应的开机脚本，不需要重复下载该脚本

国际

```shell
curl -L https://raw.githubusercontent.com/oneclickvirt/incus/main/scripts/buildone.sh -o buildone.sh && chmod +x buildone.sh && dos2unix buildone.sh
```

国内

```shell
curl -L https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/incus/main/scripts/buildone.sh -o buildone.sh && chmod +x buildone.sh && dos2unix buildone.sh
```

### 使用方法

```
./buildone.sh 服务器名称 CPU核数 内存大小 硬盘大小 SSH端口 外网起端口 外网止端口 下载速度 上传速度 是否启用IPV6(Y or N) 系统(留空则为debian11)
```

CPU核数需要小于或等于宿主机的核数，内存大小以MB计算，硬盘大小以GB计算，下载速度上传速度以Mbit计算，是否启用IPV6不一定要填Y或者N，没有这个参数也行，留空默认不开启IPV6

如果```外网起端口```和```外网止端口```都设置为0则不做区间外网端口映射了，只映射基础的SSH端口，注意```不能为空```，不进行映射需要设置为0

支持自定义服务器的系统，不填写留空时默认使用debian11，注意传入参数为系统名字+版本号

### 示例

以下为开设的示例服务器的信息：

| 属性                        | 值             |
|---------------------------|----------------|
| 服务器名字                  | test           |
| SSH登录的用户名            | root           |
| SSH登录的密码              | 随机生成       |
| CPU核数                   | 1              |
| 内存大小                  | 256MB          |
| 磁盘大小                  | 2G             |
| 内外网映射端口一致的区间  | 20002到20025   |
| 上传带宽                   | 500Mbit        |
| 下载带宽                   | 500Mbit        |
| 自动设置外网IPV6地址      | N              |
| 系统                       | debian11       |

```
./buildone.sh test 1 256 2 20001 20002 20025 500 500 N debian11
```

需要进入容器内部则执行

```
incus exec test /bin/bash
```

退出则输入exit回车即可

需要查看信息则执行

```shell
cat 服务器名字
```

比如查询示例的信息就是

```shell
cat test
```

如果已通过以上方法生成过服务器，还需要批量生成服务器，可使用自定义批量生成版本的脚本，但注意先删除测试服务器再进行批量生成服务器

### 删除测试服务器

```shell
incus stop test
incus delete test
rm -rf test
rm -rf test_v6
ls
```

## 普通版本批量生成

开出的服务器配置：

- 1核256MB内存1GB硬盘限速300Mbit带宽
- 带1个SSH端口，24个外网端口
- 默认内存和硬盘大小

:::tip
lxc若命令无问题，执行初始化开服务器，这一步最好放```screen```中后台挂起执行，开服务器时长与你开几个和宿主机配置相关
:::

执行下面命令加载开机脚本

国际

```shell
curl -L https://raw.githubusercontent.com/oneclickvirt/incus/main/scripts/init.sh -o init.sh && chmod +x init.sh && dos2unix init.sh
```

国内

```shell
curl -L https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/incus/main/scripts/init.sh -o init.sh && chmod +x init.sh && dos2unix init.sh
```

下面命令为开服务器名字前缀为**tj**的**10**个服务器

```shell
./init.sh tj 10
```

有时候init.sh的运行路径有问题，此时建议前面加上sudo强制根目录执行

## 纯SSH端口版本批量生成

开出的服务器配置：

- 1核128MB内存1GB硬盘限速300Mbit带宽
- 只有一个SSH端口
- 无法挂载warp

:::tip
lxc若命令无问题，执行初始化开服务器，这一步最好放```screen```中后台挂起执行，开服务器时长与你开几个和宿主机配置相关
:::

加载开机脚本

国际

```shell
curl -L https://raw.githubusercontent.com/oneclickvirt/incus/main/scripts/least.sh -o least.sh && chmod +x least.sh && dos2unix least.sh
```

国内

```shell
curl -L https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/incus/main/scripts/least.sh -o least.sh && chmod +x least.sh && dos2unix least.sh
```

下列命令最后一行为开服务器名字前缀为**tj**的**10**个服务器

```shell
./least.sh tj 10
```

有时候least.sh的运行路径有问题，此时建议前面加上sudo强制根目录执行

## 自定义批量生成版本

- 可自定义内存和硬盘大小
- 有执行过上面的手动批量生成过也没问题，配置是继承的不覆盖

如果需要多次批量生成服务器，可使用

国际

```
curl -L https://github.com/oneclickvirt/incus/raw/main/scripts/add_more.sh -o add_more.sh && chmod +x add_more.sh && bash add_more.sh
```

国内

```shell
curl -L https://cdn.spiritlhl.net/https://github.com/oneclickvirt/incus/raw/main/scripts/add_more.sh -o add_more.sh && chmod +x add_more.sh && bash add_more.sh
```

可多次运行批量生成服务器，且继承前面已生成的部分在后面添加，可自定义内存和硬盘大小

## 查看已批量开设的信息

开完服务器后，具体信息会生成在当前目录下的log文件中，格式如下

```shell
1号服务器名称 密码 ssh端口 外网端口起始 外网端口终止
2号服务器名称 密码 ssh端口 外网端口起始 外网端口终止
```

如果想要查看，只需在当前目录执行以下命令打印log文件即可

```shell
cat log
```

:::warning
不要拿该脚本开出的服务器当生产环境，LXC虚拟化不支持换内核，dd，开启bbr等操作
:::

## 部分常用incus命令

查看所有

```bash
incus list
```

查看个例

```bash
incus info 服务器名字
```

启动个例

```bash
incus start 服务器名字
```

停止个例

```bash
incus stop 服务器名字
```

删除个例

```bash
incus delete -f 服务器名字
```

进入内部

```bash
incus exec 服务器名字 /bin/bash
```

:::tip
在alpine中不用/bin/bash而是用/bin/sh，常规的系统都是/bin/bash
:::

退出则输入```exit```回车即可

删除所有LXC容器

```bash
incus list -c n --format csv | xargs -I {} incus delete -f {}
```

在容器内执行删除无用日志

```bash
sudo apt-get autoremove
sudo apt-get clean
sudo find /var/log -type f -delete
sudo find /var/tmp -type f -delete
sudo find /tmp -type f -delete
sudo find /var/cache/apt/archives -type f -delete
```

## 更新上述所有一键脚本的相关命令

删除原始配置脚本

```bash
rm -rf /usr/local/bin/ssh_sh.sh
rm -rf /usr/local/bin/config.sh
rm -rf /usr/local/bin/ssh_bash.sh
rm -rf /usr/local/bin/check-dns.sh
rm -rf /root/ssh_sh.sh
rm -rf /root/config.sh
rm -rf /root/ssh_bash.sh
rm -rf /root/buildone.sh
rm -rf /root/add_more.sh
rm -rf /root/build_ipv6_network.sh
```

下载回新版本的相关配置脚本

```bash
wget https://raw.githubusercontent.com/oneclickvirt/incus/main/scripts/check-dns.sh -O /usr/local/bin/check-dns.sh && chmod +x /usr/local/bin/check-dns.sh
wget https://raw.githubusercontent.com/oneclickvirt/incus/main/scripts/config.sh -O /usr/local/bin/config.sh && chmod +x /usr/local/bin/config.sh
wget https://raw.githubusercontent.com/oneclickvirt/incus/main/scripts/ssh_bash.sh -O /usr/local/bin/ssh_bash.sh && chmod +x /usr/local/bin/ssh_bash.sh
wget https://raw.githubusercontent.com/oneclickvirt/incus/main/scripts/ssh_sh.sh -O /usr/local/bin/ssh_sh.sh && chmod +x /usr/local/bin/ssh_sh.sh
wget https://raw.githubusercontent.com/oneclickvirt/incus/main/scripts/build_ipv6_network.sh -O /root/build_ipv6_network.sh && chmod +x /root/build_ipv6_network.sh
wget https://raw.githubusercontent.com/oneclickvirt/incus/main/scripts/buildone.sh -O /root/buildone.sh && chmod +x /root/buildone.sh
```

其他一键脚本自己对应下载回来就行了
