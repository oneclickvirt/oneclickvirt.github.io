---
outline: deep
---

# Introduction

Install the QEMU/KVM environment, including qemu-kvm + network configuration + port forwarding as a complete set.

## Add Swap Memory

:::tip
Adding some swap prevents the host from running out of memory.
:::

Unit conversion: entering 1024 creates 1GB of SWAP virtual memory. Virtual memory uses disk space. When actual memory runs out, virtual memory is used automatically, but this brings high I/O and CPU usage.

It is recommended to create swap no larger than twice the actual memory size.

International

```shell
curl -L https://raw.githubusercontent.com/spiritLHLS/addswap/main/addswap.sh -o addswap.sh && chmod +x addswap.sh && bash addswap.sh
```

China

```shell
curl -L https://cdn.spiritlhl.net/https://raw.githubusercontent.com/spiritLHLS/addswap/main/addswap.sh -o addswap.sh && chmod +x addswap.sh && bash addswap.sh
```

## Environment Installation

- Supported OS: Debian 11+, Ubuntu 20.04+
- Automatically installs QEMU/KVM, libvirt, bridge utilities, and all related components
- Automatically configures the host bridge (virbr0) and NAT network
- Automatically detects public IPv6 address and configures IPv6 network (if present)
- Supports x86_64 and ARM64 architecture servers

International

```shell
bash <(wget -qO- https://raw.githubusercontent.com/oneclickvirt/qemu/main/scripts/qemuinstall.sh)
```

China

```shell
bash <(wget -qO- https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/qemu/main/scripts/qemuinstall.sh)
```

:::tip
After installation, it is recommended to run `virsh list --all` to verify that the KVM environment is working correctly.
:::

## Uninstall QEMU/KVM Environment

One-click uninstall of the complete QEMU/KVM environment, including all virtual machines, images, networks, and auxiliary files:

International

```shell
bash <(wget -qO- https://raw.githubusercontent.com/oneclickvirt/qemu/main/scripts/qemuuninstall.sh)
```

China

```shell
bash <(wget -qO- https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/qemu/main/scripts/qemuuninstall.sh)
```

:::warning
The script will require you to enter `yes` to confirm before execution. This operation is irreversible. Content deleted includes all virtual machines, images, and QEMU/KVM network configurations.
Reset procedure: run uninstall first, then run install again to verify the entire installation process from scratch.
:::
