---
outline: deep
---

# OneClickVirt 基础安装

OneClickVirt 分为面板端和受控端。面板端只负责管理，不要求安装虚拟化环境；受控端需要先安装对应的虚拟化环境。

:::tip 安装页面二选一
本页和[高级安装](./oneclickvirt_advanced_install)只需要选择其中一页阅读，并从所选页面的表格中选择一种安装方式。不同安装方式不要重复执行。
:::

## 受控端准备

受控端只需要安装虚拟化环境，不需要额外安装 Agent。请使用本站对应项目的主体安装脚本准备环境，并确保面板端可以通过 SSH 连接受控端。

:::warning
纳管节点的宿主机网卡必须直接绑定待映射的 IP 地址，例如公网 IP。不支持使用阿里云 VPC 一类的端口映射或 NAT 转发来提供待映射 IP；网卡只有内网 IP、依靠转发访问公网的主机不能作为此类节点。
:::

## 面板端安装方式

面板端至少需要 1 GB 空闲内存和 2 GB 空闲磁盘。下表仅列出本页支持的方式，并按操作难度从简单到困难排列。

| 难度 | 安装方式 | 适用场景 | 特点 |
| --- | --- | --- | --- |
| 简单 | Docker 一体化镜像 | 已安装 Docker，希望最快完成部署 | 内置数据库，直接运行镜像即可 |
| 较简单 | 一键裸机安装 | 使用纯净 Linux 或 BSD 系统，希望自动安装全部依赖 | 自动安装数据库、反向代理、TLS、前端、后端和系统服务 |

如果已经在使用 1Panel，或者需要前后端分离、外部数据库、预编译二进制及源码构建，请改看[高级安装](./oneclickvirt_advanced_install)。

## 方式一：Docker 一体化镜像

此方式使用内置数据库的一体化镜像。主机需先安装 Docker；如未安装，可参考 [Docker 主体安装](/guide/docker/docker_install)。镜像支持 `linux/amd64` 和 `linux/arm64` 架构。

镜像地址：

- [Docker Hub](https://hub.docker.com/r/oneclickvirt/oneclickvirt)
- [GitHub Container Registry](https://github.com/oneclickvirt/oneclickvirt/pkgs/container/oneclickvirt)

:::tip
容器启动时会同时启动数据库。首次启动后请至少等待 12 秒，再打开页面进行操作。
:::

### 不配置域名

```bash
docker run -d \
  --name oneclickvirt \
  -p 80:80 \
  -v oneclickvirt-data:/var/lib/mysql \
  -v oneclickvirt-storage:/app/storage \
  --restart unless-stopped \
  oneclickvirt/oneclickvirt:latest
```

安装后访问：

```text
http://服务器IP
```

### 配置域名

将 `FRONTEND_URL` 替换为实际访问地址：

```bash
docker run -d \
  --name oneclickvirt \
  -p 80:80 \
  -e FRONTEND_URL="https://panel.example.com" \
  -v oneclickvirt-data:/var/lib/mysql \
  -v oneclickvirt-storage:/app/storage \
  --restart unless-stopped \
  oneclickvirt/oneclickvirt:latest
```

`FRONTEND_URL` 会影响 CORS、OAuth2 回调等功能，必须与用户实际访问的地址一致。

### 升级现有容器

保留两个数据卷，只替换容器和镜像：

```bash
docker rm -f oneclickvirt
docker pull oneclickvirt/oneclickvirt:latest
```

然后重新执行上方与你当前配置相同的 `docker run` 命令。不要删除 `oneclickvirt-data` 和 `oneclickvirt-storage`，否则会丢失数据库和应用配置。

### 查看状态

```bash
docker ps --filter name=oneclickvirt
```

### 查看日志

```bash
docker logs -f --tail 200 oneclickvirt
```

### 卸载

仅删除容器和镜像、保留数据以便以后恢复：

```bash
docker rm -f oneclickvirt
docker image rm oneclickvirt/oneclickvirt:latest
```

确认不再需要任何数据后，才可继续删除数据卷：

```bash
docker volume rm oneclickvirt-data oneclickvirt-storage
```

:::warning
删除数据卷会永久删除数据库和应用配置，执行前请先备份。
:::

## 方式二：一键裸机安装

`install_full.sh` 会在一个流程中安装数据库、反向代理、TLS、前端、后端和系统服务，支持 MySQL 或 MariaDB，以及 Caddy、Nginx 或 OpenResty。

安装器支持常见 Linux 与类 Unix 系统。BSD 必须存在对应系统和架构的 Release 二进制；不满足时请改用 Docker 或[高级安装](./oneclickvirt_advanced_install)中的源码构建方式。

:::warning
安装器默认要求至少 10 GB 可用磁盘和 2 GB 内存（内存与 Swap 合计）。建议在纯净系统上执行。
:::

### 下载脚本

国际网络：

```bash
curl -fsSL https://raw.githubusercontent.com/oneclickvirt/oneclickvirt/main/scripts/install_full.sh -o install_full.sh
```

中国大陆网络：

```bash
curl -fsSL https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/oneclickvirt/main/scripts/install_full.sh -o install_full.sh
```

### 交互式安装

命令如下：

```bash
bash install_full.sh
```

域名支持直接输入协议前缀：`https://panel.example.com` 会启用 TLS，`http://panel.example.com` 会关闭 TLS；未输入协议时，脚本会询问是否启用 TLS。

### 无交互安装

HTTPS 并自动配置 TLS：

```bash
bash install_full.sh \
  --non-interactive \
  --domain https://panel.example.com \
  --email admin@example.com \
  --db-type mariadb \
  --proxy caddy
```

仅使用 HTTP：

```bash
bash install_full.sh \
  --non-interactive \
  --domain http://192.168.1.100 \
  --proxy caddy
```

安装完成后，终端会输出访问地址、数据库密码和初始管理员信息，请在关闭终端前妥善保存。

下面的统一运维子命令适用于使用 `systemd` 的 Linux 安装。其他服务管理器会由安装脚本输出对应的状态和日志命令；升级时请按输出的服务管理器停止服务，再替换同架构 Release 文件。

### 升级

下载通用安装脚本并执行升级命令；配置文件会保留：

```bash
curl -fsSL https://raw.githubusercontent.com/oneclickvirt/oneclickvirt/main/scripts/install.sh -o install.sh
chmod +x install.sh
./install.sh upgrade
```

### 查看状态和日志

```bash
./install.sh status
./install.sh logs --lines 200
./install.sh logs --follow
```

也可以直接使用 systemd 查看日志：

```bash
journalctl -u oneclickvirt -f
```

如需排查反向代理，再查看安装时所选服务的日志：

```bash
journalctl -u caddy -f
# 或
journalctl -u nginx -f
# 或
journalctl -u openresty -f
```

### 卸载

默认删除服务、程序和 Web 文件，保留 `config.yaml` 与 `storage`：

```bash
./install.sh uninstall
```

确认不再需要应用配置和存储后，可执行 `./install.sh uninstall --purge`。无交互卸载必须额外指定 `--yes`。数据库、数据库账户、反向代理配置和 TLS 证书可能被其他服务共用，不会由卸载命令删除。

## 初始化

两种基础安装方式都会自动准备数据库，不需要另外安装 MySQL 或手动创建空数据库。

- Docker 一体化镜像：首次打开页面时，按初始化界面填写管理员等信息。
- 一键裸机安装：脚本会尝试自动初始化；如果终端提示自动初始化失败，再打开输出的访问地址手动完成初始化。

手动初始化时，页面会自动进入初始化界面：

![](./images/init.png)

确认页面中的数据库连接测试通过，填写并保存管理员账户信息，然后初始化系统：

![](./images/init_success.png)

初始化完成后会自动进入首页：

![](./images/home.png)

首次初始化会导入系统镜像种子，但默认仅启用 Debian 和 Alpine 相关镜像。需要其他镜像时，请使用管理员账户在系统镜像管理中按类型、架构和版本搜索并启用。

Windows、Android、macOS 等镜像默认不启用，且对 CPU、内存、磁盘、嵌套虚拟化或 KVM/Docker 运行环境有更高要求。启用前请确认目标节点满足相应条件。

初始化后请立即确认管理员账户使用强密码，并禁用或删除默认启用的测试用户 `testuser`。
