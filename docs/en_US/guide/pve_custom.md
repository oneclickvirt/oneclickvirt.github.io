---
outline: deep
---

# 一些自定义脚本

每个脚本可能有对应的系统要求，自行查看

## 在非Debian系统上安装 Proxmox VE 7

本机硬件配置的最低要求同先前正常安装的要求一致

需要先安装docker

```
curl -sSL https://get.docker.com/ | sh
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-linux-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
docker-compose --version
```

然后使用```uname -m```查询架构，使用对应架构的命令

开设出的PVE面板信息为：

登录用户名和密码都是```root```，登录后务必使用web的SSH更改密码以免被爆破

用宿主机SSH时务必登录对应```https://IPV4地址:8006```在web面板上使用SSH，不要使用宿主机的22端口操控PVE

因为web面板上的SSH是在Docker内的，所以不支持后续的一键配置，请自行配置网关等进行使用

X86架构

```bash
docker run -idt --network host \
--privileged \
--name pve \
--add-host pve:10.13.14.101 \
--hostname pve \
spiritlhl/pve:7_x86_64
```

ARM架构

```bash
docker run -idt --network host \
--privileged \
--name pve \
--add-host pve:10.13.14.101 \
--hostname pve \
spiritlhl/pve:7_aarch64
```

开设出的面板实际是开设在容器内的，但网络已使用host模式，PVE的端口约等于就使用的宿主机的端口，正常使用即可
