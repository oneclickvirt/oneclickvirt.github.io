---
outline: deep
---

# FAQ

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

1. Confirm the host has a public IPv6 address
2. Check if the containerd-ipv6 CNI network exists:

```shell
cat /etc/cni/net.d/20-containerd-ipv6.conflist
```

3. Check if the ndpresponder container is running:

```shell
nerdctl ps | grep ndpresponder
```

## Image pull failed

The script includes built-in CDN detection. You can also manually test CDN availability:

```shell
curl -4 -sL -k "https://cdn0.spiritlhl.top/https://raw.githubusercontent.com/spiritLHLS/ecs/main/back/test" --max-time 6
```

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

Disk limits require xfs or btrfs snapshotter support. The default overlay snapshotter does not support container-level disk limits.

For disk limits, refer to the docker or incus solution documentation.
