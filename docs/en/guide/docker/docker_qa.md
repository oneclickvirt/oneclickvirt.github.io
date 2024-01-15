---
outline: deep
---

# Solve the puzzle

## Common Docker Commands

Check real-time resource usage of a specific container

```
docker stats <container_name>
```

Enter a specific container

```
docker exec -it <container_name> /bin/bash
```

Clean Docker cache, remove unused resources including images, containers, networks, etc.

```
docker system prune -a
```

Uninstall all Docker images and containers

```
docker rm -f $(docker ps -aq); docker rmi $(docker images -aq)
```

View logs of a specific container

```
docker logs <container_name_or_ID>
```

View overall disk usage of Docker

```
docker system df
```

List all containers

```
docker ps -a
```

List all images

```
docker images
```

Remove a specific container

```
docker rm -f <container_name_or_ID>
```

Remove a specific image

```
docker rmi <image_name_or_ID>
```