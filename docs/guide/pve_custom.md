# 一些自定义脚本

## 在非Debian系统上安装 Proxmox VE 7

需要先安装docker

```
curl -sSL https://get.docker.com/ | sh
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-linux-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
docker-compose --version
```

然后使用```uname -m```查询架构，使用对应架构对应区域的镜像配置

中国境内服务器 - x86_64架构

```
docker run -idt --network host \
--privileged \
--name pve \
--add-host pve:10.13.14.101 \
--hostname pve \
spiritlhl/proxmoxve:x86_64
```

非中国境内服务器 - x86_64架构

```
docker run -idt --network host \
--privileged \
--name pve \
--add-host pve:10.13.14.101 \
--hostname pve \
spiritlhl/proxmoxve:cn_x86_64
```
