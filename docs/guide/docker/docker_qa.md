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

CNB这里的镜像按构建Runner的架构生成，不是多架构标签。现有开设脚本不会自动切换到该地址，GitHub上的Release和GHCR仍由原工作流维护。拉取新镜像不会自动更新已有容器，需备份数据和配置后另行安排替换。

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

