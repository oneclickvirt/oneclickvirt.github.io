---
outline: deep
---

# 前言

## 快速开始

1. 以 root 用户登录目标机器。
2. 执行安装脚本：`bash <(wget -qO- https://raw.githubusercontent.com/oneclickvirt/podman/main/podmaninstall.sh)`。
3. 按开设指南下载 `onepodman.sh` 后创建容器：`./onepodman.sh ct1 1 512 MyPassword 25000 34975 35000 n debian 0`。
4. 连接 SSH：`ssh root@<服务器IP> -p 25000`。
5. 查看记录：`cat ctlog` 或 `podman ps -a`。

## 单独开设

### 下载脚本

```bash
wget -q https://raw.githubusercontent.com/oneclickvirt/podman/main/scripts/onepodman.sh
chmod +x onepodman.sh
```

### 使用方法

```text
./onepodman.sh <name> <cpu> <memory_mb> <password> <sshport> <startport> <endport> [ipv6:y/n] [system] [disk_gb]
```

| 参数 | 说明 | 默认值 |
|------|------|--------|
| name | 容器名称 | test |
| cpu | CPU 核数（支持 0.5 等） | 1 |
| memory_mb | 内存限制（MB） | 512 |
| password | root 密码，未提供或传空字符串时自动生成 | 自动生成 |
| sshport | SSH 端口（宿主机→容器 22） | 25000 |
| startport | 公网端口范围起始 | 34975 |
| endport | 公网端口范围结束 | 35000 |
| ipv6 | 是否分配独立 IPv6（y/n） | n |
| system | 镜像系统 | debian |
| disk_gb | btrfs qgroup 磁盘限制 GB（0=不限制） | 0 |

SSH 宿主机端口不能落在额外公网端口范围内，避免同一个宿主端口被重复映射。

当宿主机使用 btrfs 且 `disk_gb` 大于 0 时，脚本会先创建容器，再对容器 rootfs 的 btrfs qgroup 设置上限后启动容器。Podman 的 `--storage-opt` 是全局存储配置参数，不能作为 `podman run` 的容器级磁盘限制参数使用；因此本项目不会把 `size=...` 直接传给 `podman run`。

**支持的 system 参数：** `ubuntu` / `debian` / `alpine` / `almalinux` / `rockylinux` / `openeuler`

也支持带版本号或常见别名的写法，会自动规范化到本项目实际镜像 tag，例如：
`ubuntu22`、`ubuntu/22.04` -> `ubuntu`；`debian12`、`debian/12` -> `debian`；
`alma9`、`almalinux/9` -> `almalinux`；`rocky9`、`rockylinux/9` -> `rockylinux`；
`openeuler22.03`、`openeuler/22.03` -> `openeuler`。不存在的版本不会静默降级。

### 示例

```bash
# 示例: 创建名为 ct1 的 Debian 容器，1核 512MB，SSH端口25000，额外端口34975-35000
./onepodman.sh ct1 1 512 MyPassword 25000 34975 35000 n debian 0
```

### 相关操作

```bash
podman ps -a                  # 查看所有容器
podman exec -it <name> bash   # 进入容器（bash 系统）
podman exec -it <name> sh     # 进入容器（alpine）
podman logs <name>            # 查看容器日志
podman rm -f <name>           # 删除单个容器
podman images                 # 查看所有镜像
podman rmi <image>            # 删除镜像
```

## 批量开设

### 运行

```bash
wget -q https://raw.githubusercontent.com/oneclickvirt/podman/main/scripts/create_podman.sh
chmod +x create_podman.sh
./create_podman.sh
```

交互式脚本，自动递增容器名（ct1, ct2, ...）、SSH 端口、公网端口，容器信息记录到 `ctlog` 文件。

无交互批量创建示例：

```bash
export noninteractive=true
export PODMAN_CREATE_COUNT=3
export PODMAN_MEMORY_MB=512
export PODMAN_CPU=1
export PODMAN_SYSTEM=debian
export PODMAN_IPV6=n
./create_podman.sh
```

批量创建时支持的环境变量：

| 变量 | 说明 | 默认值 |
|------|------|--------|
| PODMAN_CREATE_COUNT | 新增容器数量，也兼容 PODMAN_CREATE_NUMS | 1 |
| PODMAN_MEMORY_MB | 每个容器内存 MB | 512 |
| PODMAN_CPU | 每个容器 CPU 核数 | 1 |
| PODMAN_DISK_GB | 每个容器磁盘限制 GB，仅 btrfs qgroup 可用 | 0 |
| PODMAN_SYSTEM | 容器系统，支持 `debian12`/`debian/12` 等版本别名 | debian |
| PODMAN_IPV6 | 是否分配独立 IPv6 | n |
| PODMAN_CONTAINER_PREFIX | 容器名前缀 | ct |
| PODMAN_CONTAINER_START_NUM | 第一个容器编号 | 从 ctlog 续接 |
| PODMAN_START_SSH_PORT | 第一个 SSH 宿主机端口 | 从 ctlog 续接 |
| PODMAN_PUBLIC_PORT_START | 第一个公网映射端口 | 从 ctlog 续接 |

其他环境变量：

| 变量 | 说明 | 默认值 |
|------|------|--------|
| FORCE_UNINSTALL | 兼容旧版的一键卸载确认跳过开关 | false |
| ROOT_PASSWORD | 容器 entrypoint 内部读取的 root 密码 | 由创建脚本传入 |
| IPV6_ENABLED | 容器运行时内部标记，用于 IPv6 模式 | false |
| PODMAN_SKIP_RESOURCE_CHECK | 批量创建调用 onepodman.sh 时使用，避免重复资源扫描 | false |
| PODMAN_BATCH_MODE | 批量创建时保留同名临时记录文件供 create_podman.sh 消费 | false |
| PODMAN_ROOTLESS | 非 root 用户运行 onepodman.sh/create_podman.sh 的显式开关 | false |
| PODMAN_WORKDIR | rootless 批量创建时 ctlog 的工作目录 | 当前目录 |
| PODMAN_SCRIPT_DIR | rootless 批量创建时缓存 onepodman.sh 的脚本目录 | `$HOME/.local/share/oneclickvirt-podman/scripts` |
| PODMAN_RELEASE_BASE_URL | Releases 离线包基础地址，格式为 `<base>/<system>/<tar.gz>` | GitHub Releases |
| PODMAN_GHCR_IMAGE | GHCR 镜像仓库前缀 | ghcr.io/oneclickvirt/podman |
| PODMAN_SCRIPT_BASE_URL | SSH 初始化脚本和 onepodman.sh 下载基础地址 | GitHub raw scripts |
| PODMAN_POD_NAME | 将容器放入指定 Podman pod，端口映射挂在 pod 上 | 空 |
| PODMAN_POD_JOIN_EXISTING | 允许加入已存在 pod，需自行避免共享网络命名空间内端口冲突 | false |

单容器创建默认会把容器记录追加到 `ctlog`。批量创建会临时生成同名记录文件，追加到 `ctlog` 后立即删除，避免长期留下包含密码的散落文件。

Rootless 创建示例：

```bash
export PODMAN_ROOTLESS=true
./onepodman.sh ct1 1 512 "" 25000 34975 35000 n debian 0
```

Pod 网络示例：

```bash
export PODMAN_POD_NAME=ctpod1
./onepodman.sh ct1 1 512 "" 25000 34975 35000 n debian 0
```

批量创建时如果设置 `PODMAN_POD_NAME` 且未设置 `PODMAN_POD_JOIN_EXISTING=true`，脚本会按容器名自动派生 pod 名，避免多个 SSH 容器无意共享同一个网络命名空间。

### 查询批量开设的信息

在创建时的工作目录执行 `cat ctlog`，每行格式为：

```text
容器名 SSH端口 root密码 CPU核数 内存MB 起始端口 结束端口 磁盘GB
```

记录包含密码，请妥善保管。

## 删除所有容器和镜像

以下命令删除当前运行时可见的全部容器和镜像，请先备份数据并确认范围。

```bash
podman ps -aq | xargs -r podman rm -f
podman images -q | xargs -r podman rmi -f
```

确认不再需要卷和记录后，再清理未使用的卷及状态：

```bash
podman volume prune -f
podman system prune -af
rm -f ctlog
```

## 宿主机重启后重启所有容器

新容器使用 `--restart always`。systemd 宿主机安装时会启用 `podman-restart.service`，发行版缺少该服务时创建兜底服务。可执行 `systemctl status podman-restart.service` 检查。

已有容器如需单独的 systemd 服务，可使用：

```bash
podman generate systemd --name ct1 > /etc/systemd/system/container-ct1.service
systemctl daemon-reload
systemctl enable container-ct1
```

同一容器选择一种启动机制，避免重复管理。手动启动已停止容器：

```bash
podman ps -aq -f status=exited | xargs -r podman start
```

网络模式、镜像来源和连接记录详见[说明与排障](podman_qa.md)。
