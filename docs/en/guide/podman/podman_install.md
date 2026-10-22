---
outline: deep
---

# Preface

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

## Environment Setup

```bash
bash <(wget -qO- https://raw.githubusercontent.com/oneclickvirt/podman/main/podmaninstall.sh)
```

For unattended installation:

```bash
export noninteractive=true
bash <(wget -qO- https://raw.githubusercontent.com/oneclickvirt/podman/main/podmaninstall.sh)
```

| Variable | Description | Default |
| --- | --- | --- |
| noninteractive | Skip interactive prompts when set to `true` | false |
| WITHOUTCDN | Disable CDN detection and acceleration when set to `true` | false |
| NEED_DISK_LIMIT | Enable btrfs container disk limits | n |
| PODMAN_INSTALL_PATH | Root Podman storage path, saved as `graphroot` in `storage.conf` | /var/lib/containers/storage |
| PODMAN_POOL_SIZE | Size of the btrfs loop pool, in GB | 20 |
| PODMAN_LOOP_FILE | btrfs loop image path | /opt/podman-pool.img |
| PODMAN_ROOTLESS_USER | Configure subuid/subgid mappings for this rootless user | unset |
| PODMAN_ROOTLESS_CREATE_USER | Create the user named by PODMAN_ROOTLESS_USER if absent | false |
| PODMAN_ROOTLESS_SUBUID_START | First rootless subuid | 100000 |
| PODMAN_ROOTLESS_SUBGID_START | First rootless subgid | 100000 |
| PODMAN_IPV6_SUBNET | Explicit routed public IPv6 subnet; it must exclude addresses assigned to the host | selected from a local prefix |
| NDPRESPONDER_SOURCE_URL | Git source used to build the responder if its image is unavailable or has the wrong architecture | https://github.com/oneclickvirt/ndpresponder.git |

## Uninstall Podman Environment

Remove the Podman environment, including all containers, images, networks and auxiliary files:

```bash
bash <(wget -qO- https://raw.githubusercontent.com/oneclickvirt/podman/main/podmanuninstall.sh)
```

The script asks for `yes`; removal is irreversible. For unattended removal, set `noninteractive=true`. `FORCE_UNINSTALL=true` is also accepted for compatibility.

## Verify installation

```bash
podman ps -a
```

For long installations, use screen or tmux to avoid interruption when SSH disconnects.
