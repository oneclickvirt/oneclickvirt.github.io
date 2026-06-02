---
outline: deep
---

# Incus

If your host has no IPv6 subnet but you want to assign IPv6 addresses to containers, check the ```Customize``` section in the ```Incus``` module for ```Attach a free IPv6 address segment to the host```, then attach an IPv6 subnet before installation.

## Setting up virtual memory (SWAP) (optional, not required)

:::tip
If your host has limited memory and enough free disk space, add swap to reduce the risk of OOM crashes.
:::

Unit conversion: Enter 1024 to generate 1G SWAP-virtual memory, virtual memory occupies hard disk space.

When the actual memory is not enough, the virtual memory will be automatically used for memory usage, but it will bring high IO usage and CPU performance.

For swap sizing guidance, refer to [this guide](https://github.com/oneclickvirt/ecs/blob/master/README_NEW_USER.md).

| Physical Memory Size | Recommended SWAP Size |
| -------------------- | --------------------- |
| ≤ 2G                | 2x memory size        |
| 2G < memory ≤ 8G    | Equal to physical memory |
| ≥ 8G                | About 8G is sufficient |
| Hibernation needed  | At least equal to physical memory |

The above values are only recommended settings, the actual value according to their own needs, do not blindly copy the value!

```shell
curl -L https://raw.githubusercontent.com/spiritLHLS/addswap/main/addswap.sh -o addswap.sh && chmod +x addswap.sh && bash addswap.sh
```

## Incus One-Click Installation Guide

:::warning
If this is a new server, make sure that both ```update``` and ```curl``` are working properly before executing this script. 
:::

- Prerequisites: Ubuntu 20+ (LXD is usually preferred there), Debian 11+ (recommended), RockyLinux 9+, AlmaLinux 9+, CentOS 9+, Alpine (install bash first), Arch
- During installation, you will be prompted to enter the storage pool creation path as well as the size, and all the VMs or containers you want to open end up taking up space in the storage pool
- The server needs to be restarted after the environment installation process to load some default configurations
- By default, lxcfs-related configuration is enabled, so that in-container querying of container information changes to information about the container itself rather than the host
- This installer has been tested to work on either physical or non-physical machines
- For non-interactive installation, use `export noninteractive=true` before the install command. The script will apply default choices for optional prompts

Command:

```shell
curl -L https://raw.githubusercontent.com/oneclickvirt/incus/main/scripts/incus_install.sh -o incus_install.sh && chmod +x incus_install.sh && bash incus_install.sh
```

OR

```shell
bash incus_install.sh
```

Non-interactive example after downloading the script:

```shell
export noninteractive=true && bash incus_install.sh
```

Example of initialization configuration:

If you don't need to specify the path of a non-system disk as the default storage pool, then you can directly enter or type ```n``` when choosing whether to customize the storage pool path, and you don't need to specify the path.

If you need to specify the path of a non-system disk as the default pool, then you need to select ```y``` and enter the corresponding path (the actual absolute path of the disk you mounted).

If the corresponding disk has 18 Gigabytes of free hard disk space in addition to the occupied space and you want to open a 15 Gigabyte storage pool, follow the command line prompts to enter ```15```.

:::tip
The process **may** require a **manual reboot** to load storage drivers into the kernel. At the end of installation, the server may **automatically reboot**. The first full reboot can take about 400-500 seconds.
:::

:::warning
If you plan to run more than 200 Incus containers on one server, this solution is not recommended. `lxcfs` drift can cause persistent I/O load that is hard to recover from. (This is an upstream LXC limitation.)
:::

## Uninstall Incus Environment

One-click uninstall of the complete Incus environment, including all containers, VMs, images, storage pools, network configurations, systemd services, packages, and related configuration files:

```shell
bash <(curl -sSL https://raw.githubusercontent.com/oneclickvirt/incus/main/scripts/uninstall_incus.sh)
```

## Manual Installation (optional)

Not recommended for normal usage. Use it only when one-click scripts cannot run in your environment, or when you want to learn the base Incus installation process.

### Disable Firewall

```bash
apt update
apt install curl wget sudo dos2unix ufw jq -y
ufw disable
```

### Enabling Virtual Memory SWAP

The amount of memory depends on how many instances you want to run. If you want to run 8 instances and calculate, you'll need 2GB of memory. If your actual physical memory is 512MB, you'll need an additional 1.5GB. To be cautious, allocate 2GB of virtual memory.

Execute the following commands: Enter '1', then enter '2048'. This signifies allocating 2GB of virtual memory.

Command:

```shell
curl -L https://raw.githubusercontent.com/oneclickvirt/incus/main/scripts/swap.sh -o swap.sh && chmod +x swap.sh && bash swap.sh
```

### Installing Incus

```
sudo -i
mkdir -p /etc/apt/keyrings/
curl -fsSL https://pkgs.zabbly.com/key.asc | gpg --dearmor -o /etc/apt/keyrings/zabbly.gpg
sh -c 'cat <<EOF > /etc/apt/sources.list.d/zabbly-incus-stable.sources
Enabled: yes
Types: deb
URIs: https://pkgs.zabbly.com/incus/stable
Suites: $(. /etc/os-release && echo ${VERSION_CODENAME})
Components: main
Architectures: $(dpkg --print-architecture)
Signed-By: /etc/apt/keyrings/zabbly.gpg
EOF'
apt-get update
apt-get install incus -y
incus -h
```

If no errors occur, continue with:

```
incus admin init
```

For standard options, keep the defaults.

Choose the size of the physical disk (hint: select the default option with a minimum of 1GB). Generally, I fill in the available disk space minus the memory size, then multiply by 0.95 and round down. Here, I entered 10GB.

When prompted about automatic image updates, choose `no` to avoid unnecessary resource usage.


