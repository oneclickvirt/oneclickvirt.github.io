---
outline: deep
---

# 前言

两种开设方式

## 单独开设

- 只生成一个docker，这里有判断为国际服务器还是国内服务器，如果在国内服务器上开设，容器内的包管理源自动替换为清华源
- 可启用容器 IPv6 网络；需先使用本套脚本安装 Docker
- 支持x86_64和ARM架构的服务器

:::tip IPv6 网络模式
安装器使用隔离 ULA 网桥。有可用的本地公网前缀（包括合适的 SLAAC `/64`）时，容器启动后按需附加路由公网 `/128`，上游须支持对应路由/NDP。只有单个公网 `/128` 时使用 NAT66 保留 IPv6 出站，不分配独立公网客体地址。以太网上联需要健康且兼容的 NDP responder，非以太网隧道无需 responder。
:::

### 下载脚本

国际

```shell
curl -L https://raw.githubusercontent.com/oneclickvirt/docker/main/scripts/onedocker.sh -o onedocker.sh && chmod +x onedocker.sh
```

国内

```shell
curl -L https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/docker/main/scripts/onedocker.sh -o onedocker.sh && chmod +x onedocker.sh
```

### 示例

运行支持的变量如下

```bash
./onedocker.sh name cpu memory password sshport startport endport <independent_ipv6> <system> <disk>
```

目前system仅支持选择

- alpine
- debian
- ubuntu
- almalinux
- rockylinux
- openeuler

默认不填则是debian

系统输入支持带版本号写法，例如 `debian11`、`debian/11`、`ubuntu20`、`almalinux9`、`rockylinux9`、`openeuler22.03`。脚本会归一到当前维护的镜像族，不表示固定下载任意历史版本。

硬盘大小仅在前面Docker安装时选择了支持限制硬盘大小的选项，这块才可填写数值设置硬盘大小，默认不填时不限制

```shell
./onedocker.sh test 1 512 123456 25000 34975 35000 N debian 5
```

以下为开设的示例容器的信息：

| 属性                    | 值             |
|------------------------|----------------|
| 容器名字                | test           |
| SSH登录的用户名         | root           |
| SSH登录的密码           | 123456         |
| CPU核数                 | 1              |
| 内存大小               | 512MB          |
| SSH端口                 | 25000          |
| 内外网映射端口一致的区间 | 34975到35000   |
| 系统                   | debian         |
| 是否请求 IPv6 网络 | N             |
| 硬盘大小                | 5G            |

### 相关操作

删除示例

```shell
docker rm -f test
rm -rf test
ls
```

进入示例

```shell
docker exec -it test /bin/bash
```

要退出容器就执行```exit```退出。

查询已开设的信息

```shell
cat 容器名字
```

输出格式

```
容器名字 SSH端口 登陆的root密码 核数 内存 外网端口起 外网端口止
```

docker的ipv6地址只能在容器内自己查询，在docker的配置中是不存在的

## 批量开设

- 批量多次运行继承配置生成
- 生成多个时为避免SSH连接中断建议在screen中执行
- 支持x86_64和ARM架构的服务器

### 运行

国际

```shell
curl -L https://raw.githubusercontent.com/oneclickvirt/docker/main/scripts/create_docker.sh -o create_docker.sh && chmod +x create_docker.sh && bash create_docker.sh
```

国内

```shell
curl -L https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/docker/main/scripts/create_docker.sh -o create_docker.sh && chmod +x create_docker.sh && bash create_docker.sh
```

### 查询批量开设的信息

```shell
cat dclog
```

输出格式

```
容器名字 SSH端口 登陆的root密码 核数 内存 外网端口起 外网端口止 硬盘大小
```

一行一个容器对应的信息，docker的ipv6地址只能在容器内自己查询，在docker的配置中是不存在的

## 卸载所有docker容器和镜像

以下命令卸载会忽略ndpresponder，以防止IPV6的配置失效

```shell
docker ps -a --format '{{.Names}}' | grep -vE '^ndpresponder' | xargs -r docker rm -f
docker images --format '{{.Repository}}:{{.Tag}} {{.ID}}' | grep -v 'ndpresponder' | awk '{print $2}' | xargs -r docker rmi
rm -rf dclog test
ls
```

## 更新上述所有脚本

删除原始配置脚本

```bash
rm -rf /usr/local/bin/ssh_sh.sh
rm -rf /usr/local/bin/ssh_bash.sh
rm -rf /usr/local/bin/check-dns.sh
rm -rf /root/ssh_sh.sh
rm -rf /root/ssh_bash.sh
rm -rf /root/onedocker.sh
rm -rf /root/create_docker.sh
```

下载回新版本的相关配置脚本

```bash
curl -sSL https://raw.githubusercontent.com/oneclickvirt/docker/main/extra_scripts/check-dns.sh -o /usr/local/bin/check-dns.sh && chmod +x /usr/local/bin/check-dns.sh
curl -sSL https://raw.githubusercontent.com/oneclickvirt/docker/main/scripts/ssh_bash.sh -o /usr/local/bin/ssh_bash.sh && chmod +x /usr/local/bin/ssh_bash.sh
curl -sSL https://raw.githubusercontent.com/oneclickvirt/docker/main/scripts/ssh_sh.sh -o /usr/local/bin/ssh_sh.sh && chmod +x /usr/local/bin/ssh_sh.sh
curl -sSL https://raw.githubusercontent.com/oneclickvirt/docker/main/scripts/onedocker.sh -o /root/onedocker.sh && chmod +x /root/onedocker.sh
curl -sSL https://raw.githubusercontent.com/oneclickvirt/docker/main/scripts/create_docker.sh -o /root/create_docker.sh && chmod +x /root/create_docker.sh
```

## 宿主机重启后重启所有容器

新建容器使用 `--restart unless-stopped`，Docker 服务启动后会自动恢复未被手动停止的容器。旧容器或已停止容器可手动启动：

```bash
docker ps -aq -f status=exited | xargs -r docker start
```

## 宿主机重启后启动所有容器的SSH服务

项目自编镜像的 entrypoint 会在容器启动时拉起 SSH。旧镜像或 Docker Hub 回退镜像若未自动启动 SSH，先检查目标容器日志，再进入容器按实际系统启动服务：

```bash
docker logs test
docker exec -it test sh
# 以下命令在容器内执行
service ssh start || service sshd start || /usr/sbin/sshd
```
