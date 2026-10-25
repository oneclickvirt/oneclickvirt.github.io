---
outline: deep
---

# 解惑

## 镜像来源和更新

开设脚本使用本地已有镜像，缺少镜像时优先拉取```ghcr.io/oneclickvirt/docker:<系统>```，再尝试架构专用标签和[GitHub Release离线包](https://github.com/oneclickvirt/docker/releases)。下载和开设方式见[开设说明](./docker_build.md)。

openEuler容器镜像也在[CNB集中构建仓库](https://cnb.cool/oneclickvirt/virtualization-images)每日构建，可单独拉取：

```bash
docker pull docker.cnb.cool/oneclickvirt/virtualization-images/docker:openeuler-22.03
```

[CNB容器制品](https://cnb.cool/oneclickvirt/virtualization-images/-/packages)中可查看已发布标签。宿主机为X86_64且已安装对应运行环境时，也可直接开设：

```bash
install -d -m 700 /opt/oneclickvirt/docker-openeuler
(umask 077; printf 'ROOT_PASSWORD=%s\n' "$(openssl rand -base64 24)" > /opt/oneclickvirt/docker-openeuler/root.env)
docker run -d --name docker-openeuler --restart unless-stopped \
  --cpus 1 --memory 512m -p 25001:22 \
  --env-file /opt/oneclickvirt/docker-openeuler/root.env \
  docker.cnb.cool/oneclickvirt/virtualization-images/docker:openeuler-22.03
```

SSH连接宿主机```25001```端口，用户名为```root```，密码查看```/opt/oneclickvirt/docker-openeuler/root.env```。已有同名容器或端口占用时需另行修改。本例仅映射IPv4端口，项目的IPv6网络配置仍按开设说明处理。

CNB这里的镜像按构建Runner的架构生成，不是多架构标签。现有开设脚本不会自动切换到该地址，GitHub上的Release和GHCR仍由原工作流维护。拉取新镜像不会自动更新已有容器，需备份数据和配置后另行安排替换。

## CNB中的NDP responder

[CNB源码仓库](https://cnb.cool/oneclickvirt/ndpresponder)每小时同步GitHub公开main分支；[容器制品](https://cnb.cool/oneclickvirt/ndpresponder/-/packages)在源码更新及每日定时任务中测试、构建和发布。```latest```包含Linux amd64、ARM64，也可明确选择```amd64```或```arm64```标签。

```bash
docker pull docker.cnb.cool/oneclickvirt/ndpresponder/ndpresponder:latest
docker run --rm docker.cnb.cool/oneclickvirt/ndpresponder/ndpresponder:latest --help
```

需要单独为指定IPv6地址应答NDP时，以下以```eth0```和```2001:db8::2/128```为例，替换为实际以太网上联网卡和已分配给你的地址后执行：

```bash
docker run -d --name ndpresponder-cnb --restart unless-stopped \
  --network host --cap-drop ALL --cap-add NET_RAW --cap-add NET_ADMIN \
  docker.cnb.cool/oneclickvirt/ndpresponder/ndpresponder:latest \
  --ifname eth0 --subnet 2001:db8::2/128
```

本命令只代理显式填写的地址，不自动配置路由和容器地址。已由安装器管理的responder无需重复启动；其Docker网络跟踪使用```-N```，containerd的CNI租约跟踪使用```-C```，需要对应的API或租约目录挂载。安装器默认镜像来源保持原有设置；镜像不可用而回退源码构建时，可先设置```export NDPRESPONDER_SOURCE_URL=https://cnb.cool/oneclickvirt/ndpresponder.git```使用CNB源码。

## 重新创建容器后SSH提示主机密钥变化

新镜像不再内置共享的SSH主机密钥，每个新容器首次启动时单独生成。同一个容器重启不改变密钥，删除后重新创建则会生成新密钥。

可在宿主机上查询容器的ED25519公钥指纹，下面的```test-direct```替换成实际容器名：

```bash
docker exec test-direct ssh-keygen -lf /etc/ssh/ssh_host_ed25519_key.pub
```

连接时核对指纹，确认连到自己重新创建的容器后再处理本机保存的旧记录。已有旧容器不会因为镜像更新自动更换密码或主机密钥。

## 常见的一些docker命令

查询某个容器的实时占用

```
docker stats 容器名字
```

进入某个容器

```
docker exec -it 容器名字 /bin/bash
```

清理 Docker 缓存，清理未使用的资源，包括镜像、容器、网络等

```
docker system prune -a
```

卸载所有docker的镜像和容器

```
docker rm -f $(docker ps -aq); docker rmi $(docker images -aq)
```

查看对应容器日志

```
docker logs 容器名字或ID
```

查看docker整体的disk占用

```
docker system df
```

查看所有容器

```
docker ps -a
```

查看所有镜像

```
docker images
```

删除某个特定容器

```
docker rm -f 容器名字或ID
```

删除某个特定镜像

```
docker rmi 镜像名字或ID
```

## 无 CDN 模式（WITHOUTCDN）

如果服务器网络非常好无需加速，或希望完全禁用 CDN 加速，可在执行脚本前设置：

```shell
export WITHOUTCDN=TRUE
```

也可以只对单次命令生效：

```shell
WITHOUTCDN=TRUE
```

设置后，脚本执行过程中将不再尝试使用 CDN 加速地址。

