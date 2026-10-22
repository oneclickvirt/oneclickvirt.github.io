---
outline: deep
---

# Install and uninstall containerd

The shared unattended switch and interactive workflow are described in [environment modes](../oneclickvirt/environment_modes.md).

## Setting Up Virtual Memory

:::tip
Allocate some swap space to prevent your machine from crashing.
:::

Unit conversion: Inputting 1024 results in 1G of SWAP - virtual memory. Virtual memory occupies disk space and is automatically utilized when the physical memory is insufficient. However, this leads to high IO usage and CPU performance overhead.

It is recommended to allocate virtual memory twice the size of your physical memory.

```shell
curl -L https://raw.githubusercontent.com/spiritLHLS/addswap/main/addswap.sh -o addswap.sh && chmod +x addswap.sh && bash addswap.sh
```

## Install containerd

```bash
bash <(wget -qO- https://raw.githubusercontent.com/oneclickvirt/containerd/main/containerdinstall.sh)
```

Use the shared unattended switch:

```bash
export noninteractive=true
bash <(wget -qO- https://raw.githubusercontent.com/oneclickvirt/containerd/main/containerdinstall.sh)
```

Example with explicit settings:

```bash
export noninteractive=true
export NEED_DISK_LIMIT=y
export CONTAINERD_POOL_SIZE=20
export CONTAINERD_INSTALL_PATH=/var/lib/containerd
export CONTAINERD_LOOP_FILE=/opt/containerd-pool.img
export CONTAINERD_MAIN_INTERFACE=eth0
export CONTAINERD_IPV6_SUBNET_PREFIX=80
export CONTAINERD_IPV6_SUBNET_INDEX=1
bash <(wget -qO- https://raw.githubusercontent.com/oneclickvirt/containerd/main/containerdinstall.sh)
```

| Variable | Description | Default |
| --- | --- | --- |
| noninteractive | Use defaults without prompting when set to `true` | unset |
| WITHOUTCDN | Disable CDN acceleration when set to `TRUE` | unset |
| NEED_DISK_LIMIT | Enable btrfs disk limits; accepts `y/yes/true/1` | n |
| CONTAINERD_INSTALL_PATH | containerd data directory | /var/lib/containerd |
| CONTAINERD_POOL_SIZE | btrfs loop pool size in GB | 20 |
| CONTAINERD_LOOP_FILE | btrfs loop file path | /opt/containerd-pool.img |
| CONTAINERD_MAIN_INTERFACE | Host uplink for NAT/NDP | detected automatically |
| CONTAINERD_IPV6_SUBNET_PREFIX | Prefix length of the CNI subnet carved from the host parent prefix | 80 |
| CONTAINERD_IPV6_SUBNET_INDEX | Preferred subnet index, starting at 0; explicit values are not automatically changed | 1 |
| NDPRESPONDER_SOURCE_URL | Git source used for a local responder build when its image is unavailable or has the wrong architecture | https://github.com/oneclickvirt/ndpresponder.git |

## Uninstall

Remove the full containerd environment, including containers, images, CNI networks, systemd services and binaries:

```bash
bash <(wget -qO- https://raw.githubusercontent.com/oneclickvirt/containerd/main/containerduninstall.sh)
```

The script asks for `yes`; removal is irreversible. For unattended removal:

```bash
export noninteractive=true
bash <(wget -qO- https://raw.githubusercontent.com/oneclickvirt/containerd/main/containerduninstall.sh)
```

## Verify installation

```bash
nerdctl ps -a
```

For long installations, use screen or tmux to avoid interruption when SSH disconnects.
