---
outline: deep
---

# Preface

Install the Podman environment, including podman + network configuration + DNS liveness check service.

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

- Supported systems: Ubuntu, Debian, RockyLinux 9+, AlmaLinux 9+, CentOS 9+, Alpine, Arch
- Installs Podman via each distribution's official packages (daemonless architecture, no Docker daemon required)
- Automatically configures Podman network (podman-net: 172.21.0.0/16)
- Detects public IPv6 address; if present, automatically creates podman-ipv6 network and starts NDP Responder
- Installs DNS liveness check service (check-dns-podman.service)
- Supports x86_64 and ARM64 architecture servers

International

```shell
bash <(wget -qO- https://raw.githubusercontent.com/oneclickvirt/podman/main/podmaninstall.sh)
```

China Mainland

```shell
bash <(wget -qO- https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/podman/main/podmaninstall.sh)
```

:::tip
After installation, run `podman ps -a` to verify the Podman environment is working correctly.
:::

## Uninstall Podman Environment

One-click uninstall of the entire Podman environment, including all containers, images, networks, and auxiliary files:

International

```shell
bash <(wget -qO- https://raw.githubusercontent.com/oneclickvirt/podman/main/podmanuninstall.sh)
```

China Mainland

```shell
bash <(wget -qO- https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/podman/main/podmanuninstall.sh)
```

:::warning
The script requires entering `yes` to confirm before execution. This operation is irreversible. Deleted content includes all containers, images, and Podman network configurations.
Retest workflow: Run uninstall first, then run install to verify the entire installation process from scratch.
:::
