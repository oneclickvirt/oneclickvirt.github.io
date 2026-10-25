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

See [CNB container artifacts](https://cnb.cool/oneclickvirt/virtualization-images/-/packages) for the published tags. On an X86_64 host, create a container directly after installing the runtime:

```bash
install -d -m 700 /opt/oneclickvirt/docker-openeuler
(umask 077; printf 'ROOT_PASSWORD=%s\n' "$(openssl rand -base64 24)" > /opt/oneclickvirt/docker-openeuler/root.env)
docker run -d --name docker-openeuler --restart unless-stopped \
  --cpus 1 --memory 512m -p 25001:22 \
  --env-file /opt/oneclickvirt/docker-openeuler/root.env \
  docker.cnb.cool/oneclickvirt/virtualization-images/docker:openeuler-22.03
```

Connect to the host on SSH port `25001` as `root`; the generated password is in `/opt/oneclickvirt/docker-openeuler/root.env`. Choose another container name and port if these are already in use. This example provides IPv4 port mapping; use the provisioning instructions for the project's IPv6 network setup.

This CNB image uses the build runner's architecture; the tag is not multi-architecture. The existing creation script does not switch to this address automatically. GitHub Releases and GHCR remain maintained by their existing workflow. Pulling a new image does not update existing containers; back up their data and configuration before arranging a replacement.

## NDP responder on CNB

The [CNB source mirror](https://cnb.cool/oneclickvirt/ndpresponder) synchronizes the public GitHub main branch hourly. [Container artifacts](https://cnb.cool/oneclickvirt/ndpresponder/-/packages) are tested, built and published on source updates and a daily schedule. The `latest` tag supports Linux amd64 and ARM64; explicit `amd64` and `arm64` tags are also available.

```bash
docker pull docker.cnb.cool/oneclickvirt/ndpresponder/ndpresponder:latest
docker run --rm docker.cnb.cool/oneclickvirt/ndpresponder/ndpresponder:latest --help
```

For a standalone responder serving a specific IPv6 address, replace the example Ethernet uplink `eth0` and assigned address `2001:db8::2/128` before running:

```bash
docker run -d --name ndpresponder-cnb --restart unless-stopped \
  --network host --cap-drop ALL --cap-add NET_RAW --cap-add NET_ADMIN \
  docker.cnb.cool/oneclickvirt/ndpresponder/ndpresponder:latest \
  --ifname eth0 --subnet 2001:db8::2/128
```

This command proxies only the explicit address; it does not configure routes or container addresses. Do not start another responder alongside one already managed by the installer. Docker network tracking uses `-N` and containerd CNI lease tracking uses `-C`, with the corresponding API or lease-directory mounts. Installer image sources keep their existing defaults. To use the CNB source during a fallback build, first set `export NDPRESPONDER_SOURCE_URL=https://cnb.cool/oneclickvirt/ndpresponder.git`.

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

