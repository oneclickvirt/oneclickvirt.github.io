---
outline: deep
---

# 在Docker中开设Android虚拟机

## 一键开设

- 自定义安卓版本
- 自动创建带校验的web网站
- 自动进行nginx安装和反向代理的配置，可选择是否绑定域名，默认回车不绑定使用80端口
- 无需考虑宿主机是否支持嵌套虚拟化
- 支持x86_64和ARM架构

**宿主机的配置至少要有1核2G内存15G硬盘，否则开设可能会导致宿主机卡死**

宿主机推荐 Ubuntu 系统，Debian 系统可能导致安卓屏幕白屏

安卓版本越新占用越大，以上的配置要求是最低版本安卓的配置要求 (个人测试到 12.0.0-latest 的tag可用，更高版本映射白屏了，自己测试哪个能用吧)

如果开设后，过了5分钟浏览器网页的登录验证还是一直失败，那么请查询安卓容器的日志，大概率安卓容器崩溃了，建议更换更低的安卓系统版本的容器进行安装

**开设**

国际

```shell
curl -L https://raw.githubusercontent.com/oneclickvirt/docker/main/scripts/create_android.sh -o create_android.sh && chmod +x create_android.sh && bash create_android.sh
```

国内

```shell
curl -L https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/docker/main/scripts/create_android.sh -o create_android.sh && chmod +x create_android.sh && bash create_android.sh
```

命令执行后按照提示输入即可，注意选择版本输入的是序号，对应选项的数字序号，安装完毕后打开```本机IPV4+80端口```可登录

如果需要查询生成的安卓信息和web登录信息，执行```cat /root/android_info```可查询信息

默认的用户名 ```onea```

默认密码 ```oneclick```

远程的桌面点击```H264 Converter```跳转就是了

**暂时只支持生成一个安卓容器，勿要重复生成，如需替换版本请执行后续命令删除后再次开设**

**暂时只支持开设后一直使用，不可重启服务器，重启后可能无法自重启映射成功，自测**

**删除**

- 删除容器
- 删除容器对应镜像
- 删除配置文件

```
docker rm -f android
docker rmi $(docker images | grep "redroid" | awk '{print $3}')
rm -rf /etc/nginx/sites-enabled/reverse-proxy
rm -rf /etc/nginx/sites-available/reverse-proxy
rm -rf /etc/nginx/passwd_scrcpy_web
rm -rf /root/android_info
```

## 安装APK文件

点击```list files```打开文件目录，切换到```/storage/emulated/0/Download```目录，把```apk```拖拽进来进行安装，等待进度跑完，apk就上传到安卓容器里面了。

此时回到安卓的界面，打开文件管理器，就会显示你刚上传的文件，点击后可进行安装。