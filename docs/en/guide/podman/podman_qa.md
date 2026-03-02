---
outline: deep
---

# FAQ

## podman: command not found

The Podman environment is not correctly installed. Re-run the installation script:

```shell
bash <(wget -qO- https://raw.githubusercontent.com/oneclickvirt/podman/main/podmaninstall.sh)
```

## Container cannot access external network (IPv4)

Check if iptables NAT rules exist:

```shell
iptables -t nat -L POSTROUTING -n -v | grep 172.21
```

If not present, add manually:

```shell
iptables -t nat -A POSTROUTING -s 172.21.0.0/16 ! -d 172.21.0.0/16 -j MASQUERADE
iptables -A FORWARD -s 172.21.0.0/16 -j ACCEPT
iptables -A FORWARD -d 172.21.0.0/16 -j ACCEPT
```

## Container IPv6 not working

1. Confirm the host has a public IPv6 address
2. Check if the podman-ipv6 network exists:

```shell
podman network ls | grep ipv6
```

3. Check if the ndpresponder container is running:

```shell
podman ps | grep ndpresponder
```

## Podman vs Docker command comparison

| Function | Docker command | Podman command |
|----------|---------------|----------------|
| List containers | `docker ps -a` | `podman ps -a` |
| Enter container | `docker exec -it` | `podman exec -it` |
| Delete container | `docker rm -f` | `podman rm -f` |
| List images | `docker images` | `podman images` |
| Delete image | `docker rmi` | `podman rmi` |
| View logs | `docker logs` | `podman logs` |

## Image pull failed

Images are prioritized from GitHub Releases as offline tar packages, with fallback to ghcr.io:

```shell
ghcr.io/oneclickvirt/podman:<os>-amd64
ghcr.io/oneclickvirt/podman:<os>-arm64
ghcr.io/oneclickvirt/podman:<os>   # multi-arch manifest
```

Manually pull image example:

```shell
podman pull ghcr.io/oneclickvirt/podman:debian-amd64
```

## How to completely reset the Podman environment

Uninstall, then reinstall:

```shell
bash <(wget -qO- https://raw.githubusercontent.com/oneclickvirt/podman/main/podmanuninstall.sh)
bash <(wget -qO- https://raw.githubusercontent.com/oneclickvirt/podman/main/podmaninstall.sh)
```

## Podman vs containerd: which to choose?

- For daemonless architecture with no background daemon, or if you prefer the system package manager, choose **Podman**
- For a lightweight daemon + nerdctl CLI experience, choose **containerd**
- For KVM virtual machines (Windows/macOS/Android), choose **docker** or **PVE/Incus/LXD** solutions

## DNS issues

Podman installation configures the `check-dns-podman.service`. Check if it's running:

```shell
systemctl status check-dns-podman
```

Manual DNS fix:

```shell
echo "nameserver 8.8.8.8" >> /etc/resolv.conf
echo "nameserver 1.1.1.1" >> /etc/resolv.conf
```
