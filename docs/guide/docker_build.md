---
outline: deep
---

# 前言

两种开设方式

## 单独开设

- 只生成一个docker，这里有判断为国际服务器还是国内服务器，如果在国内服务器上开设，容器内的包管理源自动替换为清华源
- 可配置绑定独立的IPV6地址，但需要先前使用本套脚本的环境安装命令安装的docker，且需要宿主机至少绑定了/64的IPV6子网
- 支持x86_64和ARM架构的服务器

### 下载脚本

国际

```shell
curl -L https://raw.githubusercontent.com/spiritLHLS/docker/main/scripts/onedocker.sh -o onedocker.sh && chmod +x onedocker.sh
```

国内

```shell
curl -L https://ghproxy.com/https://raw.githubusercontent.com/spiritLHLS/docker/main/scripts/onedocker.sh -o onedocker.sh && chmod +x onedocker.sh
```

### 示例

运行支持的变量

```
./onedocker.sh name cpu memory password sshport startport endport system independent_ipv6
```

目前system仅支持选择alpine或debian，默认是debian

```shell
./onedocker.sh test 1 512 123456 25000 34975 35000 debian N
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
| 是否绑定独立的IPV6地址   | N             |

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
curl -L https://raw.githubusercontent.com/spiritLHLS/docker/main/scripts/create_docker.sh -o create_docker.sh && chmod +x create_docker.sh && bash create_docker.sh
```

国内

```shell
curl -L https://ghproxy.com/https://raw.githubusercontent.com/spiritLHLS/docker/main/scripts/onedocker.sh -o onedocker.sh && chmod +x onedocker.sh
```

### 查询批量开设的信息

```shell
cat dclog
```

输出格式

```
容器名字 SSH端口 登陆的root密码 核数 内存 外网端口起 外网端口止 
```

一行一个容器对应的信息，docker的ipv6地址只能在容器内自己查询，在docker的配置中是不存在的

## 卸载所有docker容器和镜像

以下命令卸载会忽略ndpresponder，以防止IPV6的配置失效

```shell
docker ps -aq --format '{{.Names}}' | grep -E '^ndpresponder' | xargs -r docker rm -f
docker images -aq --format '{{.Repository}}:{{.Tag}}' | grep -E '^ndpresponder' | xargs -r docker rmi
rm -rf dclog
ls
```
