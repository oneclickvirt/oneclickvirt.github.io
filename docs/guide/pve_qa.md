## 目前已验证的VPS商家

### 可开设KVM虚拟化的NAT的商家

[nocix](https://www.nocix.net/) 中的特价最低配15美元独服 (IPV6不自带，需要找客服要)

[amhost](http://amhost.net/vps/?cid=29317) 中的测试款

[digitalocean](https://m.do.co/c/e9712622ee89) 中的 Perminu Intel 和 Regular 4核款

[skrime](https://hosting.skrime.eu/a/server) 中的 AMD Ryzen KVM Server 最低配款

[webdock](https://webdock.io/en?maff=wdaff--150) 中的 AMD KVM Server

[4vps](https://clck.ru/33VQmc) 中的 俄罗斯和希腊 测试款

[hostaris](https://deploy.hostaris.com/) 中的 德国款 (商家的系统模板有问题，IPV6已失效和Github的连通稳定性很差)

[adtaq](https://www.adtaq.com/) 中的最低配存储KVM服务器

### 只可开设LXC虚拟化的NAT的商家

[腾讯云](https://curl.qcloud.com/tPrMnfZm) 中的无忧款和特惠款(学生机)

[spectraip](https://my.spectraip.net/aff.php?aff=35) 中的KVM服务器

[Linode](https://www.linode.com/lp/refer/?r=9296554d01ecacaa0be56892fd969b557722becd) 中美国专用CPU的最低配

[hetzner](https://hetzner.cloud/?ref=CnWVr0FGneUl) 的cloud服务器，需要使用

```shell
wget --no-check-certificate -qO InstallNET.sh 'https://raw.githubusercontent.com/leitbogioro/Tools/master/Linux_reinstall/InstallNET.sh' && chmod a+x InstallNET.sh && bash InstallNET.sh -pwd 'oneclickvirt'
```

重置为debian12系统再安装就没问题了，重置后密码为```oneclickvirt```

### 已知无法直接安装PVE的商家

[hetzner](https://hetzner.cloud/?ref=CnWVr0FGneUl) Debian11需要救援系统安装纯净的Debian，默认网络设置有冲突

[hosthatch](https://cloud.hosthatch.com/a/2450) 默认网络设置有问题
