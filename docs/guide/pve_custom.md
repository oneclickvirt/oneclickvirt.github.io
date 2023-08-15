---
outline: deep
---

# 一些自定义脚本

每个脚本可能有对应的系统要求，自行查看

## 在非Debian系统上安装 Proxmox VE 7

需要先安装docker

```
curl -sSL https://get.docker.com/ | sh
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-linux-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
docker-compose --version
```

然后使用```uname -m```查询架构，使用对应架构对应区域的镜像配置

开设出的PVE面板登录用户名和密码都是```root```，使用宿主机SSH时务必登录对应```https://IPV4地址:8006```，在web面板上使用SSH，不要使用宿主机的22端口使用

面板上宿主机的SSH是在Docker内的，所以不支持后续的一键配置，请自行配置网关等进行使用

非中国境内服务器 - x86_64架构

```
docker run -idt --network host \
--privileged \
--name pve \
--add-host pve:10.13.14.101 \
--hostname pve \
spiritlhl/proxmoxve:x86_64
```

中国境内服务器 - x86_64架构

```
docker run -idt --network host \
--privileged \
--name pve \
--add-host pve:10.13.14.101 \
--hostname pve \
spiritlhl/proxmoxve:cn_x86_64
```
