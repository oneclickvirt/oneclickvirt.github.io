---
outline: deep
---

# FAQ

## Images

GitHub Actions builds the regular base images with Podman/Buildah and publishes them to Releases and GHCR.

| Guest system | amd64 archive | arm64 archive |
| --- | --- | --- |
| Ubuntu 22.04 | spiritlhl_ubuntu_amd64.tar.gz | spiritlhl_ubuntu_arm64.tar.gz |
| Debian 12 | spiritlhl_debian_amd64.tar.gz | spiritlhl_debian_arm64.tar.gz |
| Alpine latest | spiritlhl_alpine_amd64.tar.gz | spiritlhl_alpine_arm64.tar.gz |
| AlmaLinux 9 | spiritlhl_almalinux_amd64.tar.gz | spiritlhl_almalinux_arm64.tar.gz |
| RockyLinux 9 | spiritlhl_rockylinux_amd64.tar.gz | spiritlhl_rockylinux_arm64.tar.gz |
| OpenEuler 22.03 | spiritlhl_openeuler_amd64.tar.gz | spiritlhl_openeuler_arm64.tar.gz |

GHCR tags:

- `ghcr.io/oneclickvirt/podman:<os>-amd64`
- `ghcr.io/oneclickvirt/podman:<os>-arm64`
- `ghcr.io/oneclickvirt/podman:<os>` (multi-architecture manifest)

Creation pulls `PODMAN_GHCR_IMAGE:<os>-<arch>` first, then downloads `PODMAN_RELEASE_BASE_URL/<os>/spiritlhl_<os>_<arch>.tar.gz` if the pull fails.

### openEuler images on CNB

The [central CNB build repository](https://cnb.cool/oneclickvirt/virtualization-images) also fetches the Dockerfile from this repository's main branch daily to build openEuler. To pull it separately:

```bash
podman pull docker.cnb.cool/oneclickvirt/virtualization-images/podman:openeuler-22.03
```

This tag uses the build runner's architecture; it is not multi-architecture. The existing creation script still pulls the GHCR images above first and falls back to GitHub Release archives. It does not switch to CNB automatically. The original GitHub build and publication workflow remains maintained.

## Networking

- IPv4 uses `podman-net`, bridge `podman-br0` and subnet `172.20.0.0/16`.
- IPv6 uses `podman-ipv6` and bridge `podman-br1`. The installer accepts only public IPv6 CIDRs assigned locally to the host. It does not turn an external egress-API address into an allocatable subnet. When multiple prefixes exist, a larger usable delegated prefix, such as PVE `/38`, is preferred over an uplink `/128`.
- The installer selects a smaller sibling subnet excluding host addresses. If Netavark rejects a public subnet because of SLAAC or overlapping routes, `mode=manual` uses an isolated ULA CNI network and routes a public `/128` from the parent prefix to the container after startup. It does not resubmit the overlapping subnet to Netavark.
- A single public `/128`, an overly narrow prefix, or unavailable manual routing falls back to `mode=nat` with ULA NAT66. This preserves outbound IPv6 and does not promise an Internet-reachable public `/128`.
- Manual routing and existing `mode=unmanaged` networks retain `podman-net` IPv4 NAT, `-p` mappings and the IPv4 default route. The IPv6 network supplies IPv6 routing only. Public IPv6 is neither NATed nor port-forwarded; a default-deny firewall must permit IPv6 forwarding between the uplink and `podman-br1`.
- The NDP responder runs only for Ethernet IPv6 uplinks requiring neighbor discovery and tracks `podman-ipv6` addresses through Podman's Docker-compatible API socket. NAT66 and non-Ethernet SIT, 6in4 or ip6tnl tunnels do not require it; their containers do not fall back to IPv4 merely because the responder is absent.
- Project network and state directories are separate from the containerd and Docker variants. On a shared host, plan ports, subnets and resources to avoid conflicts.

## podman: command not found

The Podman environment is not correctly installed. Re-run the installation script:

```shell
bash <(curl -sSL https://raw.githubusercontent.com/oneclickvirt/podman/main/podmaninstall.sh)
```

## Container cannot access external network (IPv4)

Inspect the actual network and forwarding state before changing firewall rules. podman-net defaults to 172.20.0.0/16; use the subnet reported by inspect if customized. Netavark may use nftables rather than iptables.

```bash
podman network inspect podman-net
sysctl net.ipv4.ip_forward
iptables -t nat -L POSTROUTING -n -v
nft list ruleset
```

## Container IPv6 not working

Check the networking section above first: public routed addresses, manual routing and ULA NAT66 have different requirements. Confirm the selected mode and actual container addresses. A responder is required only for Ethernet uplinks needing NDP; NAT66 and non-Ethernet tunnels do not require one.

```bash
ip -6 route
podman network inspect podman-ipv6
podman inspect ct1
podman ps -a --filter name=ndpresponder
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

The script tries GHCR first, then Releases archives. Check access to both endpoints and confirm the system alias is supported. Manual pull example:

```bash
podman pull ghcr.io/oneclickvirt/podman:debian-amd64
```

## How to completely reset the Podman environment

Uninstall, then reinstall:

```shell
bash <(curl -sSL https://raw.githubusercontent.com/oneclickvirt/podman/main/podmanuninstall.sh)
bash <(curl -sSL https://raw.githubusercontent.com/oneclickvirt/podman/main/podmaninstall.sh)
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

## Disable CDN

Set `export WITHOUTCDN=TRUE` before running the scripts to skip CDN acceleration. Unset it to restore the default behavior.
