---
outline: deep
---

## 一键使用Docker开设安卓系统的容器

- 自定义安卓版本
- 自动创建带校验的web网站
- 自动进行nginx和反向代理的配置

**宿主机的配置至少要有1核2G内存15G硬盘，否则开设可能会导致宿主机卡死！**

安卓版本越新占用越大，以上的配置要求是最低版本安卓的配置要求 (个人测试到 12.0.0-latest 可用，更高版本映射白屏了，自己测试哪个能用吧)

:::warning
内存开点swap免得机器炸了
:::

开设虚拟内存(SWAP)

单位换算：输入 1024 产生 1G SWAP-虚拟内存，虚拟内存占用硬盘空间，当实际内存不够用时将自动使用虚拟内存做内存使用，但随之带来IO高占用以及CPU性能占用

建议只开实际内存大小两倍大小的虚拟内存

国际

```shell
curl -L https://raw.githubusercontent.com/spiritLHLS/addswap/main/addswap.sh -o addswap.sh && chmod +x addswap.sh && bash addswap.sh
```

国内

```shell
curl -L https://ghproxy.com/https://raw.githubusercontent.com/spiritLHLS/addswap/main/addswap.sh -o addswap.sh && chmod +x addswap.sh && bash addswap.sh
```

### 开设

国际

```shell
curl -L https://raw.githubusercontent.com/spiritLHLS/docker/main/scripts/create_android.sh -o create_android.sh && chmod +x create_android.sh && bash create_android.sh
```

国内

```shell
curl -L https://ghproxy.com/https://raw.githubusercontent.com/spiritLHLS/docker/main/scripts/create_android.sh -o create_android.sh && chmod +x create_android.sh && bash create_android.sh
```

命令执行后按照提示输入即可，安装完毕后打开```本机IPV4+80端口```可登录

如果需要查询生成的安卓信息和web登录信息，执行```cat /root/android_info```可查询信息

默认的用户名 ```onea```

默认密码 ```oneclick```

远程的桌面点击```H264 Converter```跳转就是了

**暂时只支持生成一个安卓容器，勿要重复生成，如需替换版本请执行后续命令删除后再次开设**

### 删除

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
