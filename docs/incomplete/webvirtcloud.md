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

```shell
curl -slk https://raw.githubusercontent.com/oneclickvirt/webvirtcloud/main/scripts/install_webvirt_cloud.sh -o install_webvirt_cloud.sh && chmod 777 install_webvirt_cloud.sh && bash install_webvirt_cloud.sh ctl
```

Hypervisor 安装

开发测试环境：2核4G内存50G空的硬盘

实际使用建议配置更高

```shell
curl -slk https://raw.githubusercontent.com/oneclickvirt/webvirtcloud/main/scripts/install_hypervisor1.sh -o install_hypervisor1.sh && chmod 777 install_hypervisor1.sh
```

替换```x.x.x.x```为实际的已部署了Controller的IP地址，然后再执行下述命令

```shell
bash install_hypervisor1.sh x.x.x.x
```

安装过程中可能会自动退出，提示当前的```NetworkManager```版本不符合要求，提示你需要重启服务器，大概提示如下：

```
Connection 'eth0' (bed050e9-ff49-4665-8112-24ddf2a1cd3c) successfully deleted.
Warning: nmcli (1.48.10) and NetworkManager (1.42.2) versions don't match. Restarting NetworkManager is advised.
Error: Failed to add 'br-ext' connection: connection.autoconnect-ports: unknown property
```

此时重启服务器后需要再次执行上述命令

安装完毕后会显示纳管所用的token，这是需要在Controller的Admin面板中的Computers页面添加的节点信息

安装过程大概需要20~25分钟，主要耗时在```/var/lib/libvirt/isos/finnix-125.iso```的下载，这块无法加速，建议挂在tmux或者screen中进行安装

# Thanks

[webvirt.cloud](https://webvirt.cloud/)
