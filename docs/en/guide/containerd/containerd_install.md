---
outline: deep
---

# Preface

Install the containerd environment, including containerd + runc + nerdctl + CNI + buildkitd full suite.

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
- Installs containerd + runc + nerdctl + CNI + buildkitd (via nerdctl-full bundle)
- Automatically configures CNI network (containerd-net: 172.20.0.0/16) with iptables NAT rules
- Detects public IPv6 address; if present, automatically creates containerd-ipv6 CNI network and starts NDP Responder
- Installs DNS liveness check service (check-dns.service)
- Supports x86_64 and ARM64 architecture servers

International

```shell
bash <(wget -qO- https://raw.githubusercontent.com/oneclickvirt/containerd/main/containerdinstall.sh)
```

China Mainland

```shell
bash <(wget -qO- https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/containerd/main/containerdinstall.sh)
```

:::tip
After installation, run `nerdctl ps -a` to verify the containerd environment is working correctly.
:::

## Uninstall containerd Environment

One-click uninstall of the entire containerd environment, including all containers, images, CNI networks, systemd services, and nerdctl/containerd binaries:

International

```shell
bash <(wget -qO- https://raw.githubusercontent.com/oneclickvirt/containerd/main/containerduninstall.sh)
```

China Mainland

```shell
bash <(wget -qO- https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/containerd/main/containerduninstall.sh)
```

:::warning
The script requires entering `yes` to confirm before execution. This operation is irreversible. Deleted content includes all containers, images, and CNI network configurations.
Retest workflow: Run uninstall first, then run install to verify the entire installation process from scratch.
:::
