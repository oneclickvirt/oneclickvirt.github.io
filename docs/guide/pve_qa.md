---
outline: deep
---

# 解惑

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

## 安装PVE失败

如果有什么机器安装不了，着急的可以尝试使用以下仓库的脚本先重装为debian11先

```
bash <(curl -sSL https://raw.githubusercontent.com/leitbogioro/Tools/master/Linux_reinstall/InstallNET.sh) -debian 11 -pwd 'oneclickvirt139'
```

此时dd后的系统用户名为```root```，密码为```oneclickvirt139```

如果有空或者还是不行，请联系 [@spiritlhl_bot](https://t.me/spiritlhl_bot) 尝试

## 不小心删除了NAT的映射规则怎么办

使用下面的命令映射回来

```shell
iptables -t nat -F
iptables -t filter -F
service networking restart
systemctl restart networking.service
iptables-save | awk '{if($1=="COMMIT"){delete x}}$1=="-A"?!x[$0]++:1' | iptables-restore
```

## 目前已验证的VPS商家

### 可开设KVM虚拟化的NAT的商家

[interserver](https://www.interserver.net/r/802990) 中的VPS或独立服务器

[frantech](https://my.frantech.ca/aff.php?aff=5522) 中的拉斯维加斯第二档

[eugamehost](https://www.eugamehost.com/clients/aff.php?aff=194) 中的美国凤凰城黑五促销款

[amhost](http://amhost.net/vps/?cid=29317) 中的测试款

[digitalocean](https://m.do.co/c/e9712622ee89) 中的 Perminu Intel 和 Regular 4核款

[skrime](https://hosting.skrime.eu/a/server) 中的 AMD Ryzen KVM Server 最低配款

[webdock](https://webdock.io/en?maff=wdaff--150) 中的 AMD KVM Server

[4vps](https://clck.ru/33VQmc) 中的 俄罗斯和希腊 测试款

[hostaris](https://deploy.hostaris.com/) 中的 德国款 (商家的系统模板有问题，IPV6已失效和Github的连通稳定性很差)

[adtaq](https://www.adtaq.com/) 中的最低配存储KVM服务器

[nocix](https://www.nocix.net/) 中的独立服务器

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

### 已知暂时不可用未适配的商家

OVH
