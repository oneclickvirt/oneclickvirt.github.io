---
outline: deep
---

# 解惑

## LXD安装后lxc命令显示找不到

```
! lxc -h >/dev/null 2>&1 && echo 'alias lxc="/snap/bin/lxc"' >> /root/.bashrc && source /root/.bashrc
export PATH=$PATH:/snap/bin
```

执行这个命令后尝试

```
lxc -h
```

看看lxc命令是否已修复

## 开设centos7发现报错CGroupV1不支持

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

## 需要LXD和Docker兼容同时存在

如果不做处理，docker会覆写iptables设置导致LXD无网络链接

需要安装一个定时任务定时检测和修复这个问题

国际

```shell
curl -L https://raw.githubusercontent.com/oneclickvirt/incus/main/extra_scripts/docker-coexistence.sh -o docker-coexistence.sh && chmod +x docker-coexistence.sh && bash docker-coexistence.sh
```

国内

```shell
curl -L https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/incus/main/extra_scripts/docker-coexistence.sh -o docker-coexistence.sh && chmod +x docker-coexistence.sh && bash docker-coexistence.sh
```

## 目前已验证可开带独立IPV6地址容器的VPS商家

[kuroit](https://my.kuroit.com/aff.php?aff=5) 中的 美国凤凰城 regular

[datalix](https://t.me/+UHVoo2U4VyA5NTQ1/338) 中的 德国AMD 促销
