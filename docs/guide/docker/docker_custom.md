---
outline: deep
---

# 使用Docker一键安装某些容器的脚本

每个容器都有对应的配置要求，自行查看，内存不够的用[https://github.com/spiritLHLS/addswap](https://github.com/spiritLHLS/addswap)的

```shell
curl -L https://cdn.spiritlhl.net/https://raw.githubusercontent.com/spiritLHLS/addswap/main/addswap.sh -o addswap.sh && chmod +x addswap.sh && bash addswap.sh
```

开设虚拟内存补足也行

注意，以下脚本使用前务必使用本套教程中的环境安装脚本进行前期环境安装

## 一键开设Firefox浏览器的容器

- 已设置崩溃自启
- 已设置带中文字体
- 自带web的校验，可自设置密码
- 可自定义容器最大的内存占用
- 可选是否开启VNC端口，默认不开启
- 无需考虑是否支持嵌套虚拟化和服务器的架构
- 不支持声音映射，无论是WEB端还是VNC端都无法传输声音

**宿主机需要至少1核2G内存5G硬盘，开设的容器大小将占用起码1G硬盘**

**开设**

如果未设置自定义密码，开设后默认的密码是```oneclick```。

默认的web端口是```3003```，开设后打开```本机IPV4:端口```即可

```shell
curl -L https://raw.githubusercontent.com/oneclickvirt/docker/main/scripts/onefirefox.sh -o onefirefox.sh && chmod +x onefirefox.sh && bash onefirefox.sh
```

**删除**

修改以下端口号```3003```为你实际的端口号，然后执行命令回车两次即可删除容器、配置文件、对应镜像

```shell
PORT="3003"
docker stop firefox_${PORT}
docker rm -f firefox_${PORT}
rm -rf /usr/local/bin/firefox_${PORT}
docker rmi jlesage/firefox
```

## 一键开设Chrome浏览器的容器

- 已设置崩溃自启
- 自带web的校验，可自设置密码
- 可自定义容器最大的内存占用
- 无需考虑是否支持嵌套虚拟化和服务器的架构
- 支持声音映射

**宿主机需要至少1核2G内存10G硬盘，开设的容器大小将占用起码1G硬盘**

**首次安装过程中最好在screen中挂起执行，避免长时间运行SSH连接断开**

**开设**

如果未设置自定义用户名，开设后默认的用户名是```oneclick```。

如果未设置自定义密码，开设后默认的密码是```oneclick```。

默认的http端口是```3004```，开设后打开```http://本机IPV4:端口```即可

默认的https端口是```3005```，开设后打开```https://本机IPV4:端口```即可

```shell
curl -L https://raw.githubusercontent.com/oneclickvirt/docker/main/scripts/onechromium.sh -o onechromium.sh && chmod +x onechromium.sh && bash onechromium.sh
```

**删除**

修改以下端口号```3004```为你实际的http端口号，然后执行命令回车两次即可删除容器、配置文件、对应镜像

```shell
PORT="3004"
docker stop chromium_${PORT}
docker rm -f chromium_${PORT}
rm -rf /usr/local/bin/config_${PORT}
rm -rf /usr/local/bin/password_${PORT}
docker rmi lscr.io/linuxserver/chromium
```

**注意事项**

- nginx，caddy等https映射的时候要映射3004的端口，不要映射3005端口
- 部署以后安静的等待15分钟，不然中文库没安装全，会出现不可预料的错误
- 进入远程桌面浏览器以后点击左侧的设置->点开输入法进行设置，不然没法输入中文

![图片](https://github.com/user-attachments/assets/b433d9e3-bd79-413c-8c97-15b29a4c1058)

## 一键开设Desktop的容器

- 已设置崩溃自启
- 已设置带中文字体
- 自带web的校验，可自设置用户名和密码
- 可自定义容器最大的内存占用
- 无需考虑是否支持嵌套虚拟化和服务器的架构
- 支持声音映射，WEB端可传输声音

完整的Linux桌面，可以在上面使用浏览器

**宿主机需要至少1核2G内存5G硬盘，开设的容器大小将占用起码3.2G硬盘**

**开设**

开设后默认的用户名是```onew```，密码是```oneclick```，默认的内存最大占用是2GB

默认的http协议的web端口是```3004```，默认的https协议的web端口是```3005```，开设后打开对应协议的```本机IPV4:端口```即可

```shell
curl -L https://raw.githubusercontent.com/oneclickvirt/docker/main/scripts/onewebtop.sh -o onewebtop.sh && chmod +x onewebtop.sh && bash onewebtop.sh
```

**删除**

执行

```shell
docker ps -a
```

查询name的前缀是webtop的容器，记录容器的ID用

```shell
docker rm -f 容器的ID
```

删除所有关联的容器后可用 

```shell
docker rmi lscr.io/linuxserver/webtop
```

删除对应镜像

## 一键安装guacamole

一个网页端连接SSH或RDP等协议控制服务器的玩意

网址：```http://你的IPV4地址:80/guacamole```

默认用户： ```guacadmin```

默认密码： ```guacadmin```

安装完毕登录后自行修改

**宿主机的配置至少要有1核2G内存10G硬盘，否则开设可能会导致宿主机卡死！**

国际

```shell
curl -L https://raw.githubusercontent.com/oneclickvirt/docker/main/extra_scripts/guacamole.sh -o guacamole.sh && chmod +x guacamole.sh && bash guacamole.sh
```

国内

```shell
curl -L https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/docker/main/extra_scripts/guacamole.sh -o guacamole.sh && chmod +x guacamole.sh && bash guacamole.sh
```

## 一键开设RustDesk的容器

- 已设置崩溃自启
- 无需考虑是否支持嵌套虚拟化和服务器的架构
- 传输质量看你的服务器和各端之间的连通性和延迟

一个跨端的远控中继端(非客户端)，支持双向控制

**宿主机需要至少1核1G内存10G硬盘，对带宽的需求极低**

**开设**

安装后客户端在这里找 [https://github.com/rustdesk/rustdesk/releases/latest](https://github.com/rustdesk/rustdesk/releases/latest)

在设置中设置中继服务器的IP即可，支持 Android、Windows、Linux、浏览器 端，支持电脑远控手机

```shell
curl -L https://raw.githubusercontent.com/oneclickvirt/docker/main/scripts/onerustdesk.sh -o onerustdesk.sh && chmod +x onerustdesk.sh && bash onerustdesk.sh
```

**删除**

删除容器

```shell
docker rm -f hbbs
docker rm -f hbbr
```

删除对应镜像

```shell
docker rmi rustdesk/rustdesk-server
```

