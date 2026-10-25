---
outline: deep
---

# FAQ

## Images

GitHub Actions builds the regular base images and publishes archives to GitHub Releases.

| Guest system | amd64 archive | arm64 archive |
| --- | --- | --- |
| Ubuntu 22.04 | spiritlhl_ubuntu_amd64.tar.gz | spiritlhl_ubuntu_arm64.tar.gz |
| Debian 12 | spiritlhl_debian_amd64.tar.gz | spiritlhl_debian_arm64.tar.gz |
| Alpine latest | spiritlhl_alpine_amd64.tar.gz | spiritlhl_alpine_arm64.tar.gz |
| AlmaLinux 9 | spiritlhl_almalinux_amd64.tar.gz | spiritlhl_almalinux_arm64.tar.gz |
| RockyLinux 9 | spiritlhl_rockylinux_amd64.tar.gz | spiritlhl_rockylinux_arm64.tar.gz |
| OpenEuler 22.03 | spiritlhl_openeuler_amd64.tar.gz | spiritlhl_openeuler_arm64.tar.gz |

Check a local image and its remote Releases asset from a repository checkout:

```bash
bash scripts/containerd_manage.sh version-check debian
```

### openEuler images on CNB

The [central CNB build repository](https://cnb.cool/oneclickvirt/virtualization-images) also fetches the Dockerfile from this repository's main branch daily to build openEuler. To pull it separately:

```bash
nerdctl pull docker.cnb.cool/oneclickvirt/virtualization-images/containerd:openeuler-22.03
```

See [CNB container artifacts](https://cnb.cool/oneclickvirt/virtualization-images/-/packages) for the published tags. On an X86_64 host, create a container directly after installing the runtime:

```bash
install -d -m 700 /opt/oneclickvirt/containerd-openeuler
(umask 077; printf 'ROOT_PASSWORD=%s\n' "$(openssl rand -base64 24)" > /opt/oneclickvirt/containerd-openeuler/root.env)
nerdctl run -d --name containerd-openeuler --restart unless-stopped \
  --cpus 1 --memory 512m -p 25001:22 \
  --env-file /opt/oneclickvirt/containerd-openeuler/root.env \
  docker.cnb.cool/oneclickvirt/virtualization-images/containerd:openeuler-22.03
```

Connect to the host on SSH port `25001` as `root`; the generated password is in `/opt/oneclickvirt/containerd-openeuler/root.env`. Choose another container name and port if these are already in use. This example provides IPv4 port mapping; use the provisioning instructions for the project's IPv6 network setup.

This tag uses the build runner's architecture; it is not multi-architecture. The existing creation script still uses archives from this repository's GitHub Releases and does not switch to the CNB image automatically. The original GitHub build and publication workflow remains maintained.

NDP responder also has [CNB source and multi-architecture image instructions](../docker/docker_qa.md#ndp-responder-on-cnb). Network tracking in this runtime still uses the CNI or compatible API method described below; the static-address example does not replace the installer.

## Networking

- **IPv4:** bridge networking uses CNI `containerd-net` and `-p` port mappings.
- **Uplink:** IPv4 NAT uses the primary uplink. IPv6 NDP follows the IPv6 default route; only when that route is absent does it fall back to the interface carrying the chosen prefix. A PVE delegated `/38` remains usable even when the uplink also has a `/128`.
- **Independent IPv6:** the installer accepts only a public parent prefix assigned locally to the host, never an external egress-probe address disguised as a `/64`. It normally carves out a `/80` CNI subnet and skips subnets containing any host address. A covering parent route does not itself prevent a more-specific CNI route, so both PVE delegated prefixes and ordinary NDP-backed `/64` prefixes can supply public addresses. A lone `/128`, an overly narrow prefix, or an equal/more-specific conflicting route uses isolated ULA NAT66 instead, preserving outbound IPv6 without a public guest address. Conflicting third-party CNI configuration is preserved, and independent IPv6 setup stops.
- **NDP:** `containerd-ipv6` uses CNI `host-local` leases. The responder reads `/var/lib/cni/networks/containerd-ipv6` without a Docker API dependency. Only Ethernet IPv6 uplinks need it. NAT66 and SIT, 6in4 or ip6tnl tunnels do not require a responder and do not fall back to IPv4 because it is absent. An unavailable image, wrong architecture, or missing ARMv7 tag triggers a shallow clone of NDPRESPONDER_SOURCE_URL and a verified local build. A failed build does not replace an existing responder. Where NDP is required, CNI configuration, responder startup and its health check must all succeed before independent IPv6 is enabled.
- **DNS:** `check-dns.service` continuously checks DNS availability.

## Persistent independent IPv6

New independent-IPv6 containers use nerdctl `--ip6` to retain the address across container restarts and host reboots.

Allocation records in `/var/lib/oneclickvirt/containerd-ipv6/` are root-only. Creation uses a file lock and avoids both existing records and active CNI leases. Records survive deletion so recreating the same name can reuse its address; do not remove records while corresponding containers exist.

Existing containers are not modified automatically. Back up and recreate them to adopt persistent addresses. Plan static addresses on custom nerdctl/CNI networks separately to avoid overlapping this allocator. Unsupported `--ip6`, corrupt allocation records and exhausted pools fail explicitly rather than reporting persistent IPv6 as configured.

## nerdctl: command not found

The containerd environment is not correctly installed or `/usr/local/bin` is not in PATH.

Fix:

```shell
export PATH="/usr/local/bin:$PATH"
echo 'export PATH="/usr/local/bin:$PATH"' >> /etc/profile
source /etc/profile
```

If still not found, re-run the installation script:

```shell
bash <(curl -sSL https://raw.githubusercontent.com/oneclickvirt/containerd/main/containerdinstall.sh)
```

## containerd service not running

```shell
systemctl status containerd
systemctl restart containerd
```

View logs:

```shell
journalctl -u containerd -f
```

## Container cannot access external network (IPv4)

Check if iptables NAT rules exist:

```shell
iptables -t nat -L POSTROUTING -n -v | grep 172.20
```

If not present, add manually:

```shell
iptables -t nat -A POSTROUTING -s 172.20.0.0/16 ! -d 172.20.0.0/16 -j MASQUERADE
iptables -A FORWARD -s 172.20.0.0/16 -j ACCEPT
iptables -A FORWARD -d 172.20.0.0/16 -j ACCEPT
```

## Container IPv6 not working

Check the networking section above first: public routed addresses, manual routing and ULA NAT66 have different requirements. Confirm the selected mode and actual container addresses. A responder is required only for Ethernet uplinks needing NDP; NAT66 and non-Ethernet tunnels do not require one.

```bash
ip -6 route
cat /etc/cni/net.d/20-containerd-ipv6.conflist
nerdctl inspect ct1
nerdctl ps -a --filter name=ndpresponder
```

## Image pull failed

Check whether the host can reach GitHub and GitHub Releases normally. If network access is unstable, retry later or switch to a more stable outbound network.

## How to completely reset the containerd environment

Uninstall, then reinstall:

```shell
bash <(curl -sSL https://raw.githubusercontent.com/oneclickvirt/containerd/main/containerduninstall.sh)
bash <(curl -sSL https://raw.githubusercontent.com/oneclickvirt/containerd/main/containerdinstall.sh)
```

## lxcfs related issues

If lxcfs is not installed on the host, containers will see the host's CPU/memory view. Install lxcfs:

```shell
apt-get install -y lxcfs   # Debian/Ubuntu
yum install -y lxcfs       # CentOS/RHEL
```

## Disk limit not working

This script applies disk limits with the btrfs snapshotter. Install with NEED_DISK_LIMIT=y, then pass a nonzero disk_gb value. The default overlay snapshotter does not support this limit; the script warns and ignores the disk argument in that mode.

```bash
nerdctl info
```

## Disable CDN

Set `export WITHOUTCDN=TRUE` before running the scripts to skip CDN acceleration. Unset it to restore the default behavior.
