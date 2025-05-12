---
outline: deep
---

# 在Docker中开设Windows系统虚拟机

## 一键开设(通过vagrant)

- 共享宿主机所有资源(CPU、内存、硬盘)，基于docker所以只占用系统的大小，适合多开
- 共享IP，做了docker的NAT映射，可选择是否映射到外网或仅内网
- 设置的win系统默认最多占用为1核2G内存50G硬盘，实际占用看使用情况
- 无需iptables进行NAT映射，删除容器时自动删除了端口的映射，方便维护
- 需要考虑宿主机是否支持嵌套虚拟化，暂时只支持X86_64架构的系统

**宿主机需要支持嵌套虚拟化，且暂时只支持X86_64架构的系统，否则不可开设**

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
curl -L https://raw.githubusercontent.com/oneclickvirt/docker/main/scripts/onewindows.sh -o onewindows.sh && chmod +x onewindows.sh
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

## 手动开设(通过dockur)

本项目支持宿主机在不支持嵌套虚拟化的情况下使用QEMU进行虚拟机开设

原项目

https://github.com/dockur/windows

https://github.com/dockur/windows-arm

注意，这两个项目都要求宿主机的CPU至少4核，内存至少4G，硬盘至少64G。如果不魔改启动脚本，那么这些最低限制是需要额外参数进行修改的。

如果需要魔改脚本，可参考

https://www.spiritysdx.top/20250405/

https://www.spiritysdx.top/20250315/

进行魔改

对于X86_64架构：

这里提供一个已经魔改好的单文件版本的docker容器的tar包，通过这个tar包可以自己制作新的Windows镜像

https://github.com/oneclickvirt/docker/releases/download/amd64_builder/builder.tar

```shell
docker load -i builder.tar
```

```shell
docker run -it -d -e RAM_SIZE="8G" -e CPU_CORES="4" --name win2022 -p 8006:8006 --device=/dev/kvm --device=/dev/net/tun --cap-add NET_ADMIN -v ./当前路径下你下好的Windows的iso镜像名称带尾缀:/boot.iso --stop-timeout 120 windows:builder
```

这里也提供一个成品的镜像，内置Windows镜像，内置自动硬盘扩容自启任务，docker导入后即可使用


