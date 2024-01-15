---
outline: deep
---

# 解惑

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
