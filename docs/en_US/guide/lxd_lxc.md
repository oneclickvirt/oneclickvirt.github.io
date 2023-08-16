---
outline: deep
---

# LXC virtualization

## Generate only one NAT server

- Generate only one NAT server, with customizable restrictions on all content.

Downloading the boot script is **NOT REQUIRED**, if you have used the command to install LXD with one click, the corresponding boot script will be downloaded automatically, so you don't need to download the script again.

Command:

```shell
curl -L https://ghproxy.com/https://raw.githubusercontent.com/spiritLHLS/lxd/main/scripts/buildone.sh -o buildone.sh && chmod +x buildone.sh && dos2unix buildone.sh
```

### How it's used

```
. /buildone.sh Chick name Memory size Hard disk size SSH port Extranet start port Extranet stop port Download speed Upload speed Whether IPV6 is enabled (Y or N) System (leave blank for debian11)
```

Memory size is calculated in MB, hard disk size is calculated in GB, download speed upload speed is calculated in Mbit, whether to enable IPV6 does not have to fill in Y or N, no this parameter can also be left blank default does not enable IPV6

If ```external start port`` and ```external stop port`` are both set to 0, then we don't do interval port mapping, only the basic SSH port is mapped, note that ```can't be null``, and it needs to be set to 0 if it's not to be mapped.

Support for customizing the system of the chicken, do not fill out the default use of debian11 when left blank, note that the incoming parameters for the system name + version number, such as:

- debian10, debian11, debian12
- ubuntu18, ubuntu20, ubuntu22
- centos8, centos9 (actually opened out of the Stream version)
- alpine3.15, alpine3.16, alpine3.17, alpine3.18

* Note that they are all lowercase letters + numbers of the combination of their own to try, if the search is not the system will automatically exit the script
* Version number can be with English decimal point, in order to adapt to the alpine version number has been supported.
* Note that some systems may not have cgroups loaded, so testing system resources in the container will show the system resources of the host, which are actually constrained, similar to Docker.

:::tip
The version number has ended the long-term maintenance of the general no longer have an official mirror, temporarily did not find the archive address of the historical mirror, if you find welcome to leave a message I will add support!
:::

#### 示例

以下为开设的示例小鸡的信息：

| 属性                        | 值             |
|---------------------------|----------------|
| 小鸡名字                  | test           |
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
./buildone.sh test 256 2 20001 20002 20025 500 500 N
```

If you need to see the information, run

```shell
cat 小鸡名字
```

For example, the information for the query example is

```shell
cat test
```

If you have already generated chicks through the above methods and still need to batch generate chicks, you can use a customized batch generation version of the script, but note that you should first delete the test chicks before batch generating chicks

#### Delete Test Chick

```shell
lxc stop test
lxc delete test
rm -rf test
rm -rf test_v6
ls
```

## Normal version batch generation

Opened Chick Configuration:

- 1 core 256MB RAM 1GB hard disk limited to 300Mbit bandwidth
- With 1 SSH port, 25 extranet ports
- Default memory and hard disk size

:::tip
lxc if the command is no problem, the execution of the initialization of the opening of the chickens, this step is best to put ```screen`` in the background to suspend the execution of the opening of the chickens, the length of time with you to open a few and the mother hen configuration-related
:::

Execute the following command to load the boot script

Command:

```shell
curl -L https://raw.githubusercontent.com/spiritLHLS/lxd/main/scripts/init.sh -o init.sh && chmod +x init.sh && dos2unix init.sh
```

The following command opens **10** chicks with the name prefix **tj**.

```shell
./init.sh tj 10
```

Sometimes there is a problem with the path where init.sh is run, in this case it is recommended to add sudo in front of it to force it to run in the root directory

## Bulk generation of pure SSH port versions

Opened Chick Configuration:

- 1 core 128MB RAM 300MB hard disk limited to 300Mbit bandwidth
- Only one SSH port
- Unable to mount warp

:::tip
lxc if the command is no problem, the execution of the initialization of the opening of the chick, this step is best to put the ```screen`` in the background to hang the execution of the opening of the chick, the length of time you open the chick with the opening of a few and the mother hen configuration-related
:::

Load boot script

Command:

```shell
curl -L https://raw.githubusercontent.com/spiritLHLS/lxd/main/scripts/least.sh -o least.sh && chmod +x least.sh && dos2unix least.sh
```

The last line of the following command opens **10** chicks with the chick name prefix **tj**

```shell
./least.sh tj 10
```

Sometimes there is a problem with the path where last.sh is run, in this case it is recommended to force the root directory to run by adding sudo in front of it.

## 自定义批量生成版本

- 可自定义内存和硬盘大小
- 有执行过上面的手动批量生成过也没问题，配置是继承的不覆盖

如果需要多次批量生成小鸡，可使用

Command:

```
curl -L https://github.com/spiritLHLS/lxd/raw/main/scripts/add_more.sh -o add_more.sh && chmod +x add_more.sh && bash add_more.sh
```

Can be run multiple times to batch generate chicks, and inherit the previous part has been generated in the back to add, customizable memory and hard disk size

## View the information of the batch opened chicks

After opening the chicks, the specific information will be generated in the log file in the current directory, with the following format

```shell
1号服务器名称 密码 ssh端口 外网端口起始 外网端口终止
2号服务器名称 密码 ssh端口 外网端口起始 外网端口终止
```

To view it, simply print the log file by executing the following command in the current directory

```shell
cat log
```

:::warning
Don't use the chicks opened by this script as a production environment, LXC virtualization doesn't support changing kernel, dd, turning on bbr, etc.
:::

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

:::tip
Instead of /bin/bash, you can use /bin/sh in alpine, which is /bin/bash on regular systems.
:::

To exit, type ```exit`` and enter.

Delete all LXC containers

```bash
lxc list | awk '{print $2}' | grep -v "^$" | xargs -I {} lxc delete -f {}
```

Perform deletion of useless logs within a container

```bash
sudo apt-get autoremove
sudo apt-get clean
sudo find /var/log -type f -delete
sudo find /var/tmp -type f -delete
sudo find /tmp -type f -delete
sudo find /var/cache/apt/archives -type f -delete
```

## Update all commands related to the above one-click scripts

Delete the original configuration script

```bash
rm -rf /usr/local/bin/alpinessh.sh
rm -rf /usr/local/bin/config.sh
rm -rf /usr/local/bin/ssh.sh
rm -rf /usr/local/bin/check-dns.sh
rm -rf /root/alpinessh.sh
rm -rf /root/config.sh
rm -rf /root/ssh.sh
rm -rf /root/buildone.sh
rm -rf /root/add_more.sh
```

Download back the relevant configuration scripts for the new version

```bash
wget https://raw.githubusercontent.com/spiritLHLS/lxd/main/scripts/check-dns.sh -O /usr/local/bin/check-dns.sh && chmod +x /usr/local/bin/check-dns.sh
wget https://raw.githubusercontent.com/spiritLHLS/lxd/main/scripts/config.sh -O /usr/local/bin/config.sh && chmod +x /usr/local/bin/config.sh
wget https://raw.githubusercontent.com/spiritLHLS/lxd/main/scripts/ssh.sh -O /usr/local/bin/ssh.sh && chmod +x /usr/local/bin/ssh.sh
wget https://raw.githubusercontent.com/spiritLHLS/lxd/main/scripts/alpinessh.sh -O /usr/local/bin/alpinessh.sh && chmod +x /usr/local/bin/alpinessh.sh
```

Just download the other one-click scripts yourself.
