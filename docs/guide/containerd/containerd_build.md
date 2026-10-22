---
outline: deep
---

# 前言

## 单独开设

### 下载脚本

```bash
wget -q https://raw.githubusercontent.com/oneclickvirt/containerd/main/scripts/onecontainerd.sh
chmod +x onecontainerd.sh
```

### 使用方法

```text
./onecontainerd.sh <name> <cpu> <memory_mb> <password> <sshport> <startport> <endport> [ipv6:y/n] [system] [disk_gb]
```

创建前会检查容器名、端口范围和宿主机端口占用，避免重复映射同一宿主机端口。
密码参数传入空字符串 `""` 时会自动生成高熵随机 root 密码，并写入容器记录文件。

| 参数 | 说明 | 默认值 |
|------|------|--------|
| name | 容器名称 | test |
| cpu | CPU 核数（支持 0.5 等） | 1 |
| memory_mb | 内存限制（MB） | 512 |
| password | root 密码，省略时自动生成随机密码 | 自动生成 |
| sshport | SSH 端口（宿主机→容器 22） | 25000 |
| startport | 公网端口范围起始 | 34975 |
| endport | 公网端口范围结束 | 35000 |
| ipv6 | 是否分配独立 IPv6（y/n） | n |
| system | 镜像系统，支持裸系统名或本仓库已构建版本别名 | debian |
| disk_gb | 磁盘限制 GB（0=不限制） | 0 |

**支持的 system 参数：** `ubuntu` / `debian` / `alpine` / `almalinux` / `rockylinux` / `openeuler`

也支持带版本的常见写法，并会自动归一化到本仓库实际镜像标签：

| 实际镜像 | 支持输入示例 |
|----------|--------------|
| `ubuntu` | `ubuntu22` / `ubuntu22.04` / `ubuntu/22.04` |
| `debian` | `debian12` / `debian/12` |
| `alpine` | `alpine/latest` |
| `almalinux` | `almalinux9` / `alma9` |
| `rockylinux` | `rockylinux9` / `rocky9` |
| `openeuler` | `openeuler22.03` / `openeuler/22.03` |

未列出的版本（例如 `debian11`、`centos7`）没有对应的本仓库镜像，脚本会直接报错并提示可用值，避免创建错误系统或后续下载不存在的镜像。

单容器创建镜像源变量：

| 变量 | 说明 | 默认值 |
|------|------|--------|
| CONTAINERD_IMAGE_REGISTRY | 可选回退镜像仓库；设置后脚本会在 Releases 下载失败时拉取 `<registry>:<system>` 和 `<registry>:<system>-<arch>` | unset |
| CONTAINERD_IMAGE_RELEASE_BASE | Releases 离线包基础地址 | https://github.com/oneclickvirt/containerd/releases/download |

### 示例

```bash
# 示例: 创建名为 ct1 的 Debian 容器，1核 512MB，SSH端口25000，额外端口34975-35000
./onecontainerd.sh ct1 1 512 "" 25000 34975 35000 n debian 0
```

### 相关操作

```bash
nerdctl ps -a                  # 查看所有容器
nerdctl exec -it <name> bash   # 进入容器（bash 系统）
nerdctl exec -it <name> sh     # 进入容器（alpine）
nerdctl logs <name>            # 查看容器日志
nerdctl rm -f <name>           # 删除单个容器
nerdctl images                 # 查看所有镜像
nerdctl rmi <image>            # 删除镜像
```

在本仓库检出目录中运行辅助管理脚本：

```bash
bash scripts/containerd_manage.sh stats [container]
bash scripts/containerd_manage.sh snapshot <container> [image]
bash scripts/containerd_manage.sh backup <container> [output.tar]
bash scripts/containerd_manage.sh version-check [system]
```

## 批量开设

### 运行

```bash
wget -q https://raw.githubusercontent.com/oneclickvirt/containerd/main/scripts/create_containerd.sh
chmod +x create_containerd.sh
./create_containerd.sh
```

交互式脚本，自动递增容器名（ct1, ct2, ...）、SSH 端口、公网端口，容器信息记录到 `ctlog` 文件。批量创建会为每个容器生成 32 位十六进制随机密码。

也可以直接用参数指定批量配置：

```bash
./create_containerd.sh --noninteractive --count 3 --memory 512 --cpu 1 --disk 0 --system debian --ipv6 n
```

无交互批量开设统一使用：

```bash
export noninteractive=true
export CONTAINERD_CREATE_COUNT=1
export CONTAINERD_CONTAINER_MEMORY=512
export CONTAINERD_CONTAINER_CPU=1
export CONTAINERD_CONTAINER_DISK=0
export CONTAINERD_CONTAINER_SYSTEM=debian
export CONTAINERD_CONTAINER_IPV6=n
./create_containerd.sh
```

### 查询批量开设的信息

在创建时的工作目录执行 `cat ctlog`，每行格式为：

```text
容器名 SSH端口 root密码 CPU核数 内存MB 起始端口 结束端口 磁盘GB
```

记录包含密码，请妥善保管。

## 删除所有容器和镜像

以下命令删除当前运行时可见的全部容器和镜像，请先备份数据并确认范围。

```bash
nerdctl ps -aq | xargs -r nerdctl rm -f
nerdctl images -q | xargs -r nerdctl rmi -f
```

## 宿主机重启后重启所有容器

新建容器已设置 nerdctl `--restart always`，需保持 containerd 服务启用。旧容器或停止的容器可手动恢复：

```bash
systemctl status containerd
nerdctl ps -aq -f status=exited | xargs -r nerdctl start
```

网络模式、镜像来源和连接记录详见[说明与排障](containerd_qa.md)。
