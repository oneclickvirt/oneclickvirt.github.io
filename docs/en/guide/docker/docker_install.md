---
outline: deep
---

# Preface

Support for running Docker virtualization on various systems, including Linux, Android, and Windows.

If your host has no IPv6 subnet but you want to assign IPv6 addresses to containers, check the ``Customize`` section in the ``Docker`` module for ``Attach a free IPv6 address segment to the host``, then attach an IPv6 subnet before installation.

## Setting Up Virtual Memory

:::tip
Allocate some swap space to prevent your machine from crashing.
:::

Unit conversion: Inputting 1024 results in 1G of SWAP - virtual memory. Virtual memory occupies disk space and is automatically utilized when the physical memory is insufficient. However, this leads to high IO usage and CPU performance overhead.

It is recommended to allocate virtual memory twice the size of your physical memory.

Command:

```shell
curl -L https://raw.githubusercontent.com/spiritLHLS/addswap/main/addswap.sh -o addswap.sh && chmod +x addswap.sh && bash addswap.sh
```

## Environment Setup

- Supported systems: Ubuntu, Debian, RockyLinux 9+, AlmaLinux 9+, CentOS 9+, Alpine (install bash first), Arch
- Detects system environment and installs required components
- Installs Docker and Docker Compose
- Downloads required helper scripts
- Detects IPv6 availability; if subnet size is >= /112, configures Docker IPv6 networking
- If requirements are met, deploys `ndpresponder` and `radvd` for IPv6 NDP and auto-allocation behavior
- Supports x86_64 and ARM servers
- Installer prompts include Docker install path and optional disk-limit capability
- For non-interactive installation, use `export noninteractive=true` before the install command. The script will apply default choices for optional prompts

Command:

```shell
curl -L https://raw.githubusercontent.com/oneclickvirt/docker/main/scripts/dockerinstall.sh -o dockerinstall.sh && chmod +x dockerinstall.sh && bash dockerinstall.sh
```

OR

```
bash dockerinstall.sh
```

Non-interactive example after downloading the script:

```shell
export noninteractive=true && bash dockerinstall.sh
```

:::tip
The installation process may require a reboot. If prompted, reboot the server and run the script again.
:::

## Detect whether Docker supports limiting container hard disk size

```shell
curl -L https://raw.githubusercontent.com/oneclickvirt/docker/refs/heads/main/extra_scripts/disk_test.sh -o disk_test.sh && chmod +x disk_test.sh && bash disk_test.sh
```

Or specify a different storage limit size (in MB). By default, the script tests whether a 500MB container disk limit works.

```shell
# 1GB Limit
bash disk_test.sh 1000
```

## Uninstall Docker Environment

One-click uninstall of the entire Docker environment, including all containers, images, networks, systemd services, and binaries:

```shell
bash <(curl -sSL https://raw.githubusercontent.com/oneclickvirt/docker/main/dockeruninstall.sh)
```

:::warning
The script requires entering `yes` to confirm before execution. This operation is irreversible. Deleted content includes all containers, images, and network configurations.
Retest workflow: Run uninstall first, then run install to verify the entire installation process from scratch.
:::
