---
outline: deep
---

# 解惑

## 执行脚本不到30秒机器就掉线了

原装系统执行

```
systemctl restart networking
```

看看是不是直接掉线，如果是那就是机器原生有问题，热插拔或者dhcp导致的网络无法自重启，此时建议更换宿主机的系统或DD一个新系统尝试

一般来说这种情况都是出现在独服的Debian11系统上，切换为Debian12系统就没问题了

## 安装PVE失败且报错显示某些安装包不存在

执行下述命令查询apt的源

```shell
grep -r "deb " /etc/apt/sources.list /etc/apt/sources.list.d/
```

如果看到

```
deb file://
deb cdrom:[
```

这种开头的行，那么证明宿主机使用的是本地源而不是网络源，需要替换```/etc/apt/sources.list```的源，如

![图片](https://github.com/oneclickvirt/oneclickvirt.github.io/assets/103393591/c2a8d7ce-d2ae-439e-9875-3ef756e9a8a3)

一样替换为网络源才可使用PVE一键安装脚本进行安装。

替换网络源

国内服务器可使用

```
bash <(curl -sSL https://gitee.com/SuperManito/LinuxMirrors/raw/main/ChangeMirrors.sh)
```

国外服务器可使用

```
bash <(curl -sSL https://raw.githubusercontent.com/SuperManito/LinuxMirrors/main/ChangeMirrors.sh) --abroad
```

进行apt源的替换

## 安装PVE成功但重启后失联

如果什么机器安装PVE成功后WEB可用，但重启失联，请安装成功PVE后，重启前执行以下命令再重启

```bash
auto_interface=$(grep '^auto ' /etc/network/interfaces | grep -v '^auto lo' | awk '{print $2}' | head -n 1)
if ! grep -q "^post-up /sbin/ethtool" /etc/network/interfaces; then
    chattr -i /etc/network/interfaces
    echo "post-up /sbin/ethtool -K $auto_interface tx off rx off" >> /etc/network/interfaces
    chattr +i /etc/network/interfaces
fi
```

然后将重启失联的机器报给 [@spiritlhl_bot](https://t.me/spiritlhl_bot) 待更新脚本自动修复

## 安装PVE成功但重启后无法解析网址

常见于低版本的Debian系统(云服务器)安装PVE重启后无论访问什么网址都报错

```
curl: (6) Could not resolve host:
```

此时查看文件

```
cat /etc/resolv.conf
```

可发现无```nameserver```开头的语句

需要在web端这个页面设置DNS

![screenshot-1708136079861](https://github.com/oneclickvirt/oneclickvirt.github.io/assets/103393591/2431b94e-fc84-4a9d-9ddc-bf7da9a2054f)

设置完成后再次查看文件会发现有如下内容

```
search .
nameserver 8.8.8.8
nameserver 8.8.4.4
```

此时再去请求网址就能解析成功了

## 安装PVE失败或非Debian系统

如果有什么机器安装不了，着急的可以尝试使用以下仓库的脚本先重装为debian12先

```
bash <(curl -sSL https://raw.githubusercontent.com/leitbogioro/Tools/master/Linux_reinstall/InstallNET.sh) -debian 12 -pwd 'oneclickvirt139' --network "static"
```

此时dd后的系统用户名为```root```，密码为```oneclickvirt139```

如果不成功，请查看 https://github.com/leitbogioro/Tools 中的issues和说明，一个常见的问题是机器是raid0不是raid10，需要加参数指定raid的值

如果有空或者还是不行，请联系 [@spiritlhl_bot](https://t.me/spiritlhl_bot) 尝试

非Debian系统也可使用自定义分区的内容自行尝试

## 开设centos7发现报错CGroupV1不支持怎么办

启用CGroup V1：要在Ubuntu系统上启用CGroup V1，需要编辑内核启动参数。

请注意，在更改内核启动参数之前，请务必备份重要的数据和设置，以防止意外的问题。

编辑```/etc/default/grub```文件，将```GRUB_CMDLINE_LINUX_DEFAULT```中的参数末尾加上```systemd.unified_cgroup_hierarchy=0```，如

```
GRUB_CMDLINE_LINUX_DEFAULT="quiet splash systemd.unified_cgroup_hierarchy=0"
```

保存文件并运行以下命令更新GRUB引导。

```bash
sudo update-grub
```

重启系统，使更改生效

如果上述更改仍旧不支持开设centos7，那么请使用别的宿主机系统尝试

## 不小心删除了NAT的映射规则怎么办

先查看

```
cat /etc/iptables/rules.v4
```

检测是否有问题，且备份数据到本地避免被覆盖

然后再使用下面的命令映射回来

```shell
iptables -t nat -F
iptables -t filter -F
service networking restart
systemctl restart networking.service
cat /etc/iptables/rules.v4 | iptables-restore
```

## 目前已验证的VPS商家

### 可开设KVM虚拟化的NAT的商家

[spartanhost](https://billing.spartanhost.net/aff.php?aff=1705) 中的独立服务器的Debian12(Debian11有问题)

[interserver](https://www.interserver.net/r/802990) 中的VPS或独立服务器

[frantech](https://my.frantech.ca/aff.php?aff=5522) 中的拉斯维加斯第二档

[eugamehost](https://www.eugamehost.com/clients/aff.php?aff=194) 中的美国凤凰城黑五促销款

[amhost](http://amhost.net/vps/?cid=29317) 中的测试款

[digitalocean](https://m.do.co/c/e9712622ee89) 中的 Perminu Intel 和 Regular 4核款

[skrime](https://skrime.eu/a/server) 中的 AMD Ryzen KVM Server 最低配款

[webdock](https://webdock.io/en?maff=wdaff--150) 中的 AMD KVM Server

[4vps](https://clck.ru/33VQmc) 中的 俄罗斯和希腊 测试款

[adtaq](https://www.adtaq.com/) 中的最低配存储KVM服务器

[nocix](https://www.nocix.net/) 中的独立服务器

[online.net](https://www.scaleway.com/en/dedibox/) 中的低配独立服务器的Debian12(Debian11有问题)

[OVH](https://www.ovhcloud.com/en/public-cloud/) 中的 Public Cloud 服务器 需要使用以下命令dd为纯净系统后安装

```shell
bash <(curl -sSL https://raw.githubusercontent.com/leitbogioro/Tools/master/Linux_reinstall/InstallNET.sh) -debian 12 -pwd 'oneclickvirt139' --network "static"
```

此时dd后的系统用户名为```root```，密码为```oneclickvirt139```，如果不成功，请查看 https://github.com/leitbogioro/Tools 中的issues和说明，一个常见的问题是机器是raid0不是raid10，需要加参数指定raid的值

### 只可开设LXC虚拟化的NAT的商家

[腾讯云](https://curl.qcloud.com/tPrMnfZm) 中的无忧款和特惠款(学生机)

[spectraip](https://my.spectraip.net/aff.php?aff=35) 中的KVM服务器

[Linode](https://www.linode.com/lp/refer/?r=9296554d01ecacaa0be56892fd969b557722becd) 中美国专用CPU的最低配

[hosthatch](https://cloud.hosthatch.com/a/2450) 中的特价高配服务器

[hetzner](https://hetzner.cloud/?ref=CnWVr0FGneUl) 的cloud服务器

[rackdog](https://cloud.rackdog.com/referral/bx8fms) 的浮动IP的服务器

[vultr](https://www.vultr.com/?ref=9124520-8H) 的Cloud普通服务器

[azure](https://portal.azure.com/#create/Microsoft.VirtualMachine-ARM) 的普通机器

[scaleway](https://www.scaleway.com/en/) 中的ARM架构的服务器

[aws](https://aws.amazon.com/lightsail/) 中的ec2实例

[Google cloud platform - GCP](https://console.cloud.google.com/) 的 AMD 服务器
