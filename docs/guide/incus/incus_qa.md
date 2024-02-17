---
outline: deep
---

# 解惑

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

## 目前已验证可开带独立IPV6地址容器的VPS商家

[kuroit](https://my.kuroit.com/aff.php?aff=5) 中的 美国凤凰城 regular

[datalix](https://t.me/vps_reviews/338) 中的 德国AMD 促销款