---
outline: deep
---

# 使用Docker一键安装某些容器的脚本

每个容器都有对应的配置要求，自行查看，内存不够的用[这个](https://virt.spiritlhl.net/guide/docker_install.html#%E5%BC%80%E8%AE%BE%E8%99%9A%E6%8B%9F%E5%86%85%E5%AD%98)开设虚拟内存补足也行

注意，以下脚本使用前务必使用本套教程中的环境安装脚本进行前期环境安装

## 一键开设Android系统的容器

- 自定义安卓版本
- 自动创建带校验的web网站
- 自动进行nginx安装和反向代理的配置，可选择是否绑定域名，默认回车不绑定使用80端口
- 无需考虑宿主机是否支持嵌套虚拟化
- 支持x86_64和ARM架构

**宿主机的配置至少要有1核2G内存15G硬盘，否则开设可能会导致宿主机卡死**

宿主机推荐 Ubuntu 系统，Debian 系统可能导致安卓屏幕白屏

安卓版本越新占用越大，以上的配置要求是最低版本安卓的配置要求 (个人测试到 12.0.0-latest 的tag可用，更高版本映射白屏了，自己测试哪个能用吧)

**开设**

国际

```shell
curl -L https://raw.githubusercontent.com/spiritLHLS/docker/main/scripts/create_android.sh -o create_android.sh && chmod +x create_android.sh && bash create_android.sh
```

国内

```shell
curl -L https://cdn.spiritlhl.net/https://raw.githubusercontent.com/spiritLHLS/docker/main/scripts/create_android.sh -o create_android.sh && chmod +x create_android.sh && bash create_android.sh
```

命令执行后按照提示输入即可，注意选择版本输入的是序号，对应选项的数字序号，安装完毕后打开```本机IPV4+80端口```可登录

如果需要查询生成的安卓信息和web登录信息，执行```cat /root/android_info```可查询信息

默认的用户名 ```onea```

默认密码 ```oneclick```

远程的桌面点击```H264 Converter```跳转就是了

**暂时只支持生成一个安卓容器，勿要重复生成，如需替换版本请执行后续命令删除后再次开设**

**删除**

- 删除容器
- 删除容器对应镜像
- 删除配置文件

```
docker rm -f android
docker rm -f scrcpy_web
docker rmi $(docker images | grep "redroid" | awk '{print $3}')
rm -rf /etc/nginx/sites-enabled/reverse-proxy
rm -rf /etc/nginx/sites-available/reverse-proxy
rm -rf /etc/nginx/passwd_scrcpy_web
rm -rf /root/android_info
```

## 一键开设Windows系统的容器

- 共享宿主机所有资源(CPU、内存、硬盘)，基于docker所以只占用系统的大小，适合多开
- 共享IP，做了docker的NAT映射，可选择是否映射到外网或仅内网
- 设置的win系统默认最多占用为1核2G内存50G硬盘，实际占用看使用情况
- 无需iptables进行NAT映射，删除容器时自动删除了端口的映射，方便维护
- 需要考虑宿主机是否支持嵌套虚拟化，暂时只支持X86_64架构的系统

**宿主机需要支持嵌套虚拟化，且暂时只支持X86_64架构的系统，手头没ARM机器编译对应的镜像**

执行

```
egrep -c '(vmx|svm)' /proc/cpuinfo
```

结果需要大于或等于1，不能为0

然后需要先设置docker切换使用v1版cgroup启动

```
sed -i 's/GRUB_CMDLINE_LINUX="\(.*\)"/GRUB_CMDLINE_LINUX="\1 systemd.unified_cgroup_hierarchy=0"/' /etc/default/grub
update-grub
ls
```

如果执行都无报错，执行```reboot```重启系统以使得设置生效

**支持的镜像**

使用的自建的镜像：[https://hub.docker.com/r/spiritlhl/wds](https://hub.docker.com/r/spiritlhl/wds)

| 镜像名字 | 镜像大小   |
|---------|--------|
| 10      | 20G    |
| 2022    | 17.5G  |
| 2019    | 17G    |

创建出的容器大小会比镜像大小大一丢丢，但不多

**下载脚本**

```
curl -L https://raw.githubusercontent.com/spiritLHLS/docker/main/scripts/onewindows.sh -o onewindows.sh && chmod +x onewindows.sh
```

**使用方法**

开设前务必在screen窗口中执行，避免SSH长期链接造成掉线卡死

```
./onewindows.sh 容器名字 系统版本 RDP的端口 是否为外网映射(留空则默认是N，可选Y)
```

开设前需要确认宿主机至少有镜像大小的两倍大小加10G硬盘的大小，因为docker在创建容器时得先将镜像拉到本地再创建

创建过程中，硬盘占用峰值为```宿主机系统+镜像大小+容器大小```

比如开设容器名字为```test```，占用最低的```Windows 2019```系统的容器，映射外网RDP端口为```13389```，设置为```外网映射```(映射到你的服务器外网IPV4地址)

```
./onewindows.sh test 2019 13389 Y
```

开设后默认的用户名是```Administrator```和```vagrant```

默认的密码是```vagrant```

如果你选择开设映射的外网端口，务必登录后修改对应账户的密码(两个账户都可能有，自行尝试)，否则可能被人爆破滥用

**删除**

需要删除对应镜像和容器，先执行```docker ps -a```和```docker images```查询镜像是```spiritlhl/wds```的ID，然后对应使用

```
docker rm -f 容器的ID
docker rmi 镜像的ID
```

删除后可开设别的版本的windows容器

(在宿主机上使用Docker安装Windows系统，好像绕过了某些商家不允许DD成Win系统的TOS限制)

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

如果未设置自定义用户名，开设后默认的用户名是```oneclick```。

如果未设置自定义密码，开设后默认的密码是```oneclick```

默认的web端口是```3003```，开设后打开```本机IPV4:端口```即可

```shell
curl -L https://raw.githubusercontent.com/spiritLHLS/docker/main/scripts/onefirefox.sh -o onefirefox.sh && chmod +x onefirefox.sh && bash onefirefox.sh
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

**宿主机需要至少1核2G内存5G硬盘，开设的容器大小将占用起码1G硬盘**

**开设**

开设后默认的密码是```oneclick```

默认的http端口是```3004```，开设后打开```http://本机IPV4:端口```即可

默认的https端口是```3005```，开设后打开```https://本机IPV4:端口```即可

```shell
curl -L https://raw.githubusercontent.com/spiritLHLS/docker/main/scripts/onechromium.sh -o onechromium.sh && chmod +x onechromium.sh && bash onechromium.sh
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
curl -L https://raw.githubusercontent.com/spiritLHLS/docker/main/scripts/onewebtop.sh -o onewebtop.sh && chmod +x onewebtop.sh && bash onewebtop.sh
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
curl -L https://raw.githubusercontent.com/spiritLHLS/docker/main/extra_scripts/guacamole.sh -o guacamole.sh && chmod +x guacamole.sh && bash guacamole.sh
```

国内

```shell
curl -L https://cdn.spiritlhl.net/https://raw.githubusercontent.com/spiritLHLS/docker/main/extra_scripts/guacamole.sh -o guacamole.sh && chmod +x guacamole.sh && bash guacamole.sh
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
curl -L https://raw.githubusercontent.com/spiritLHLS/docker/main/scripts/onerustdesk.sh -o onerustdesk.sh && chmod +x onerustdesk.sh && bash onerustdesk.sh
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

