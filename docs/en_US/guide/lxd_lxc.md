## 普通的批量版本

开出的小鸡配置：

- 1核256MB内存1GB硬盘限速250Mbps带宽
- 带1个SSH端口，25个外网端口
- 默认内存和硬盘大小

:::tip
lxc若命令无问题，执行初始化开小鸡，这一步最好放```screen```中后台挂起执行，开小鸡时长与你开几个和母鸡配置相关
:::

执行下面命令加载开机脚本

国际

```shell
curl -L https://raw.githubusercontent.com/spiritLHLS/lxc/main/scripts/init.sh -o init.sh && chmod +x init.sh && dos2unix init.sh
```

国内

```shell
curl -L https://ghproxy.com/https://raw.githubusercontent.com/spiritLHLS/lxc/main/scripts/init.sh -o init.sh && chmod +x init.sh && dos2unix init.sh
```

下面命令为开小鸡名字前缀为**tj**的**10**个小鸡

```shell
./init.sh tj 10
```

有时候init.sh的运行路径有问题，此时建议前面加上sudo强制根目录执行

### 只有一个SSH端口的版本

开出的小鸡配置：

- 1核128MB内存300MB硬盘限速200Mbps带宽
- 只有一个SSH端口
- 无法挂载warp

:::tip
lxc若命令无问题，执行初始化开小鸡，这一步最好放```screen```中后台挂起执行，开小鸡时长与你开几个和母鸡配置相关
:::

加载开机脚本

国际

```shell
curl -L https://raw.githubusercontent.com/spiritLHLS/lxc/main/scripts/least.sh -o least.sh && chmod +x least.sh && dos2unix least.sh
```

国内

```shell
curl -L https://ghproxy.com/https://raw.githubusercontent.com/spiritLHLS/lxc/main/scripts/least.sh -o least.sh && chmod +x least.sh && dos2unix least.sh
```

下列命令最后一行为开小鸡名字前缀为**tj**的**10**个小鸡

```shell
./least.sh tj 10
```

有时候least.sh的运行路径有问题，此时建议前面加上sudo强制根目录执行

## 查看已批量开设的信息

开完小鸡后，具体信息会生成在当前目录下的log文件中，格式如下

```shell
1号服务器名称 密码 ssh端口 外网端口起始 外网端口终止
2号服务器名称 密码 ssh端口 外网端口起始 外网端口终止
```

如果想要查看，只需在当前目录执行以下命令打印log文件即可

```shell
cat log
```

::warning
不要拿该脚本开出的小鸡当生产环境，LXC虚拟化不支持换内核，dd，开启bbr等操作
::

## 部分常用LXD命令

查看所有

```bash
lxc list
```

查看个例

```bash
lxc info 服务器名字
```

启动个例

```bash
lxc start 服务器名字
```

停止个例

```bash
lxc stop 服务器名字
```

删除个例

```bash
lxc delete -f 服务器名字
```

进入内部

```bash
lxc exec 服务器名字 /bin/bash
```

退出则输入```exit```回车即可

删除所有LXC容器

```bash
lxc list | awk '{print $2}' | grep -v "^$" | xargs -I {} lxc delete -f {}
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
  
## 一键脚本老手推荐方便快捷

- 只生成一个NAT服务器，可自定义限制所有内容

### 只开一个NAT服务器

#### 下载开机脚本

- (***非必须***，如果你使用过一键安装LXD的命令，自动已下载对应的开机脚本，不用下载该脚本)

国际

```shell
curl -L https://ghproxy.com/https://raw.githubusercontent.com/spiritLHLS/lxc/main/scripts/buildone.sh -o buildone.sh && chmod +x buildone.sh && dos2unix buildone.sh
```

国内

```shell
curl -L https://ghproxy.com/https://ghproxy.com/https://raw.githubusercontent.com/spiritLHLS/lxc/main/scripts/buildone.sh -o buildone.sh && chmod +x buildone.sh && dos2unix buildone.sh
```

##### 开NAT服务器

内存大小以MB计算，硬盘大小以GB计算，下载速度上传速度以Mbit计算，是否启用IPV6不一定要填Y或者N，没有这个参数也行

如果```外网起端口```和```外网止端口```都设置为0则不做区间外网端口映射了，只映射基础的SSH端口，注意```不能为空```，不进行映射需要设置为0

支持自定义小鸡的系统，注意传入参数为系统名字+版本号，如：debian11、ubuntu20，centos8，注意都是小写字母+数字的组合

```
./buildone.sh 小鸡名称 内存大小 硬盘大小 SSH端口 外网起端口 外网止端口 下载速度 上传速度 是否启用IPV6(Y or N) 系统(留空则为debian11)
```

示例

```
./buildone.sh test 256 2 20001 20002 20025 300 300 N
```

* 以下为开设的示例小鸡的信息：  
`小鸡名字` - test
`SSH登录的用户名` - root
`SSH登录的密码` - 随机生成
`CPU核数` - 1   
`内存大小` - 256MB
`磁盘大小` - 2G   
`内外网映射端口一致的区间` - 20002到20025
`上传带宽` - 300Mbit
`下载带宽` - 300Mbit
`自动设置外网IPV6地址` - N
`系统` - debian11

需要查看信息则执行

```shell
cat 小鸡名字
```

比如查询示例的信息就是

```shell
cat test
```

如果已通过以上方法生成过小鸡，还需要批量生成小鸡，可使用手动安装部分的脚本，但注意先删除测试小鸡再进行批量生成小鸡

删除测试小鸡

```shell
lxc delete -f test
rm -rf test
ls
```
