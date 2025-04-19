---
outline: deep
---

## Repo

https://github.com/oneclickvirt/webvirtcloud

[![hits](https://hits.spiritlhl.net/webvirtcloud.svg?action=hit&title=hits&title_bg=%23555555&count_bg=%233aebee&edge_flat=false)](https://hits.spiritlhl.net)

## webvirtcloud-scripts

Controller安装

至少1核1G内存10G空的硬盘

username: ```admin@webvirt.cloud```

password: ```admin```

Client panel - https://192-168-0-114.nip.io

Admin panel - https://192-168-0-114.nip.io/admin

将192.168.0.114换成部署机的公网IP，上述地址就是面板地址

```
curl -slk https://raw.githubusercontent.com/oneclickvirt/webvirtcloud/main/scripts/install_webvirt_cloud.sh -o install_webvirt_cloud.sh && chmod 777 install_webvirt_cloud.sh && bash install_webvirt_cloud.sh ctl
```

Hypervisor 安装

开发测试环境：2核4G内存50G空的硬盘

实际使用建议配置更高

```
curl -slk https://raw.githubusercontent.com/oneclickvirt/webvirtcloud/main/scripts/install_hypervisor1.sh -o install_hypervisor1.sh && chmod 777 install_hypervisor1.sh
```

替换```x.x.x.x```为实际的已部署了Controller的IP地址，然后再执行下述命令

```
bash install_hypervisor1.sh x.x.x.x
```

安装完毕后会显示纳管所用的token，这是需要在Controller的Admin面板中的Computers页面添加的节点信息

安装过程大概需要20~25分钟，主要耗时在```/var/lib/libvirt/isos/finnix-125.iso```的下载，这块无法加速，建议挂在tmux或者screen中进行安装

# Thanks

[webvirt.cloud](https://webvirt.cloud/)
