---
outline: deep
---

# Solve the puzzle

## Image sources and updates

The creation script uses an existing local image when available. Otherwise it first pulls ```ghcr.io/oneclickvirt/docker:<system>```, then tries an architecture-specific tag and the [GitHub Release archive](https://github.com/oneclickvirt/docker/releases). See the [creation guide](./docker_build.md) for download and setup commands.

The [central CNB build repository](https://cnb.cool/oneclickvirt/virtualization-images) also builds openEuler container images daily. To pull one separately:

```bash
docker pull docker.cnb.cool/oneclickvirt/virtualization-images/docker:openeuler-22.03
```

This CNB image uses the build runner's architecture; the tag is not multi-architecture. The existing creation script does not switch to this address automatically. GitHub Releases and GHCR remain maintained by their existing workflow. Pulling a new image does not update existing containers; back up their data and configuration before arranging a replacement.

## SSH reports a changed host key after recreating a container

New images no longer contain shared SSH host keys. Each new container generates its own keys on first startup. Restarting the same container retains its keys; deleting and recreating it generates new ones.

Check the container's ED25519 public key fingerprint from the host, replacing ```test-direct``` with its actual name:

```bash
docker exec test-direct ssh-keygen -lf /etc/ssh/ssh_host_ed25519_key.pub
```

Compare the fingerprint when connecting. Update the old record saved on your client only after confirming that it belongs to your recreated container. Updating an image does not automatically replace passwords or host keys inside existing containers.

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

