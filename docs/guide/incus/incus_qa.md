---
outline: deep
---

# 解惑

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

## 需要Incus和Docker兼容同时存在

如果不做处理，docker会覆写iptables设置导致Incus无网络链接

需要安装一个定时任务定时检测和修复这个问题

国际

```shell
curl -L https://raw.githubusercontent.com/oneclickvirt/incus/main/extra_scripts/docker-coexistence.sh -o docker-coexistence.sh && chmod +x docker-coexistence.sh && bash docker-coexistence.sh
```

国内

```shell
curl -L https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/incus/main/extra_scripts/docker-coexistence.sh -o docker-coexistence.sh && chmod +x docker-coexistence.sh && bash docker-coexistence.sh
```

## Incus在单核的宿主机上长期使用后CPU占用过高

这个CPU占用过高系Incus原生问题，暂时没有解决方式，且仅在单核宿主机上可复现，多核宿主机不必理会

需要安装一个定时任务定时检测和修复这个问题，每5分钟检测一遍占用看看是否需要重启Incus后端

* 下载

国际

```shell
curl -L https://raw.githubusercontent.com/oneclickvirt/incus/main/extra_scripts/incus_fixed_restart.sh -o incus_fixed_restart.sh && chmod +x incus_fixed_restart.sh && bash incus_fixed_restart.sh
```

国内

```shell
curl -L https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/incus/main/extra_scripts/incus_fixed_restart.sh -o incus_fixed_restart.sh && chmod +x incus_fixed_restart.sh && bash incus_fixed_restart.sh
```

* 安装

```bash
bash incus_fixed_restart.sh install
```

会复制到 ```/usr/local/bin/incus_fixed_restart.sh``` 并写入 ```cron``` 每分钟执行。

* 卸载

```bash
bash incus_fixed_restart.sh uninstall
```

会删除 ```cron``` 任务、脚本文件、日志文件和计数文件。

* 正常运行（由 cron 调用）

```bash
/usr/local/bin/incus_fixed_restart.sh
```

## 目前已验证可开带独立IPV6地址容器的VPS商家

[kuroit](https://my.kuroit.com/aff.php?aff=5) 中的 美国凤凰城 regular

[datalix](https://t.me/+UHVoo2U4VyA5NTQ1/338) 中的 德国AMD 促销款