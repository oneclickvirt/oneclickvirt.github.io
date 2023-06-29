# 解惑

## 如果LXD安装后lxc命令显示找不到怎么办

```
! lxc -h >/dev/null 2>&1 && echo 'alias lxc="/snap/bin/lxc"' >> /root/.bashrc && source /root/.bashrc
export PATH=$PATH:/snap/bin
```

执行这个命令后尝试

```
lxc -h
```

看看lxc命令是否已修复

## 目前已验证可开带独立IPV6地址容器的VPS商家

[kuroit](https://my.kuroit.com/aff.php?aff=5) 中的 美国凤凰城 regular

[datalix](https://t.me/vps_reviews/338) 中的 德国AMD 促销款

[luxvps](https://billing.luxvps.xyz/aff.php?aff=36) 中的 德国AMD 促销款
