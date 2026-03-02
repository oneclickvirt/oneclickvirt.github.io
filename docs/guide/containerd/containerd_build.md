---
outline: deep
---

# 前言

两种开设方式

## 单独开设

- 只生成一个 containerd 容器，自动判断国际服务器还是国内服务器
- 可配置绑定独立的 IPV6 地址（需安装时宿主机已有公网 IPV6 且安装脚本已配置 containerd-ipv6 网络）
- 支持 x86_64 和 ARM64 架构的服务器

### 下载脚本

国际

```shell
wget -q https://raw.githubusercontent.com/oneclickvirt/containerd/main/scripts/onecontainerd.sh
chmod +x onecontainerd.sh
```

国内

```shell
wget -q https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/containerd/main/scripts/onecontainerd.sh
chmod +x onecontainerd.sh
```

### 示例

运行支持的变量如下

```bash
./onecontainerd.sh <name> <cpu> <memory_mb> <password> <sshport> <startport> <endport> [independent_ipv6:y/n] [system] [disk_gb]
```

目前 system 仅支持选择：

- debian
- ubuntu
- alpine
- almalinux
- rockylinux
- openeuler

默认不填则是 debian

```shell
./onecontainerd.sh ct1 1 512 MyPassword 25000 34975 35000 n debian 0
```

以下为开设的示例容器的信息：

| 属性 | 值 |
|------|----|
| 容器名字 | ct1 |
| SSH 登录的用户名 | root |
| SSH 登录的密码 | MyPassword |
| CPU 核数 | 1 |
| 内存大小 | 512MB |
| SSH 端口 | 25000 |
| 内外网映射端口一致的区间 | 34975 到 35000 |
| 系统 | debian |
| 是否绑定独立的 IPV6 地址 | N |
| 硬盘大小 | 不限制 |

### 相关操作

查看所有容器

```shell
nerdctl ps -a
```

进入容器

```shell
nerdctl exec -it ct1 bash
```

进入 Alpine 容器

```shell
nerdctl exec -it ct1 sh
```

要退出容器就执行 `exit` 退出。

删除示例

```shell
nerdctl rm -f ct1
```

查看容器日志

```shell
nerdctl logs ct1
```

## 批量开设

- 批量多次运行继承配置生成
- 自动递增容器名（ct1, ct2, ...）、SSH 端口、公网端口
- 容器信息记录到 `ctlog` 文件
- 生成多个时为避免 SSH 连接中断建议在 screen 中执行
- 支持 x86_64 和 ARM64 架构的服务器

### 运行

国际

```shell
wget -q https://raw.githubusercontent.com/oneclickvirt/containerd/main/scripts/create_containerd.sh
chmod +x create_containerd.sh
./create_containerd.sh
```

国内

```shell
wget -q https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/containerd/main/scripts/create_containerd.sh
chmod +x create_containerd.sh
./create_containerd.sh
```

### 查询批量开设的信息

```shell
cat ctlog
```

输出格式

```
容器名字 SSH端口 登陆的root密码 核数 内存 外网端口起 外网端口止 硬盘大小
```

一行一个容器对应的信息

## 删除所有容器和镜像

```shell
nerdctl ps -aq | xargs -r nerdctl rm -f
nerdctl images -q | xargs -r nerdctl rmi -f
rm -rf ctlog
```

## 宿主机重启后重启所有容器

默认容器没有设置停止后自重启，需要执行以下命令启动所有停止的容器

```shell
nerdctl ps -aq -f status=exited | xargs -r nerdctl start
```
