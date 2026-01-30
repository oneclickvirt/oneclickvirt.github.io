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

## 手动开设（通过 Dockur 项目）

本项目支持在宿主机**不支持嵌套虚拟化**的情况下，使用 QEMU 进行虚拟机创建。

### 原始项目地址

* [https://github.com/dockur/windows](https://github.com/dockur/windows)
* [https://github.com/dockur/windows-arm](https://github.com/dockur/windows-arm)

**注意事项：**

* 原始项目仅为启动器，不包含 Windows 镜像；
* 使用时需下载镜像文件，**在境内网络环境下首次启动容器需约 4 小时**（含镜像下载和安装）；
* 默认要求宿主机具备以下最低硬件资源（可通过修改脚本进行调整）：

  * CPU：至少 4 核
  * 内存：至少 4G
  * 硬盘：至少 64G

如需魔改启动脚本以减少资源占用或调整其他参数，可参考以下文章：

* [https://www.spiritysdx.top/20250405/](https://www.spiritysdx.top/20250405/)
* [https://www.spiritysdx.top/20250315/](https://www.spiritysdx.top/20250315/)

### 对于 x86_64 架构用户

提供一个已魔改的启动器（单文件版本），方便自行构建 Windows 镜像。该版本将系统文件和镜像直接写入 Docker 写入层中，**无需额外挂载镜像文件**：

下载链接：
[https://github.com/oneclickvirt/docker/releases/download/amd64\_builder/builder.tar](https://github.com/oneclickvirt/docker/releases/download/amd64_builder/builder.tar)

导入 Docker 镜像：

```bash
docker load -i builder.tar
```

#### 使用自定义 Windows ISO 镜像启动容器

首先从以下地址下载 Windows ISO 镜像：
[https://github.com/ILLKX/Windows](https://github.com/ILLKX/Windows)

启动容器示例命令：

```bash
docker run -it -d \
  -e RAM_SIZE="8G" \
  -e CPU_CORES="4" \
  --name win2022 \
  -p 8006:8006 \
  --device=/dev/kvm \
  --device=/dev/net/tun \
  --cap-add NET_ADMIN \
  -v "$(pwd)/Windows镜像文件.iso:/boot.iso" \
  --stop-timeout 120 \
  windows:builder
```

### 使用内置镜像（推荐快速部署）

我们也提供一个**已集成系统镜像和配置的成品镜像**，特点如下：

* 镜像大小约 26G（包含系统镜像与默认配置）；
* 已集成自动磁盘扩容与开机任务；
* 下载后导入 Docker 即可使用；
* **注意**：合并下载路径需要约 60G 空间。

#### 下载与合并切片

```bash
curl https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/docker/refs/heads/main/extra_scripts/mergew.sh -o mergew.sh
chmod +x mergew.sh
bash mergew.sh
```

#### 启动容器

```bash
docker load -i win2022.tar
docker run -it -d \
  -e RAM_SIZE="4G" \
  -e CPU_CORES="2" \
  --name win2022 \
  -p 8006:8006 \
  --device=/dev/kvm \
  --device=/dev/net/tun \
  --cap-add NET_ADMIN \
  --stop-timeout 120 \
  windows:2022
```

### 注意事项

**不建议**在当前镜像基础上使用 `docker commit` 保存修改，因为写入层会不断叠加，导致二次生成的镜像体积可能超过 40G。

如需进行个性化配置或集成应用，请**从 `builder` 镜像开始自行构建新镜像**，以保持镜像整洁与可维护性。
