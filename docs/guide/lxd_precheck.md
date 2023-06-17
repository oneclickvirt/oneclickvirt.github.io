## 配置要求

硬件要求:
- 系统：Debian 8+, Ubuntu 18+(推荐)，系统越新越好
- 虚拟化：推荐KVM、VMWARE虚拟化
- 内存：内存至少512MB
- 硬盘：硬盘(系统盘)至少10G
- 网络：独立的IPV4地址，IPV6可有可无，带宽能下载脚本就行，网络能连接Github的raw页面就行

PS: 如果硬件非常好资源很多，可使用PVE批量开KVM虚拟化的虚拟机 [跳转](https://github.com/spiritLHLS/pve)

PS: 如果硬件资源更烂，虚拟化不支持，可使用docker版本的，适配面更广 [跳转](https://github.com/spiritLHLS/docker)

## 项目特点

- 本套脚本开发使用的Ubuntu20，Ubuntu别的长期维护版本应该也没问题，Debian无法使用zfs时自动切换别的存储类型

- 已设置同时进行TCP和UDP转发，除了SSH端口其他的映射内网外网端口一致

- 已设置支持开出的LXC容器进行docker嵌套虚拟，默认普通版本和纯探针版本使用debian11系统

- 已屏蔽容器内可能用于滥用的工具包和IPV4网络的TCP/UDP协议的端口( 3389 8888 54321 65432 )，以防止容器被用于扫描和爆破，且可外置进程检查有问题自动停机

- 已支持一键为LXC容器配置IPV6地址(前提是母鸡有IPV6子网，无IPV6地址则不配置)

- 一定要在 ```/root``` 的路径下运行本仓库脚本，且使用```一键脚本```的**不要删除**路径下的```ssh.sh```和```config.sh```文件

- 保证你要开的盘为默认的系统盘(sda或者sda1)而不是挂载的盘(sdb之类的)，不确定的使用```fdisk -l```和```df```查看

- 挂载其他盘的详看 [其他说明](https://github.com/spiritLHLS/lxc/blob/main/README_other.md)

- 一键脚本支持自定义限制所有内容，普通版本支持多次运行批量生成不覆盖先前生成的配置

## 检测环境

**使用后续脚本的务必执行本命令检测母鸡是否符合要求**

国际

```
bash <(wget -qO- --no-check-certificate https://raw.githubusercontent.com/spiritLHLS/lxc/main/scripts/pre_check.sh)
```

国内

```
bash <(wget -qO- --no-check-certificate https://ghproxy.com/https://raw.githubusercontent.com/spiritLHLS/lxc/main/scripts/pre_check.sh)
```
