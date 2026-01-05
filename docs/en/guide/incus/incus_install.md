---
outline: deep
---

# Incus

If your host does not have an IPV6 subnet and you want to assign IPV6 addresses to containers, then please check the ```Customize``` partition in the ```incus``` module for the ```Attach a free IPV6 address segment``` to the host, and attach an IPV6 subnet to the host before installing the environment.

## Setting up virtual memory (SWAP) (optional, not required)

:::tip
Memory to open some swap lest the machine blow up, if your host computer does not have enough memory and a lot of free hard disk.
:::

Unit conversion: Enter 1024 to generate 1G SWAP-virtual memory, virtual memory occupies hard disk space.

When the actual memory is not enough, the virtual memory will be automatically used for memory usage, but it will bring high IO usage and CPU performance.

Refer to the description of the organization's related project [Jump](https://github.com/oneclickvirt/ecs/blob/master/README_NEW_USER.md) This opens the size of virtual memory

| Physical Memory Size | Recommended SWAP Size |
| -------------------- | --------------------- |
| ≤ 2G                | 2x memory size        |
| 2G < memory ≤ 8G    | Equal to physical memory |
| ≥ 8G                | About 8G is sufficient |
| Hibernation needed  | At least equal to physical memory |

```shell
curl -L https://raw.githubusercontent.com/spiritLHLS/addswap/main/addswap.sh -o addswap.sh && chmod +x addswap.sh && bash addswap.sh
```

## Incus One-Click Installation Guide

:::warning
If this is a new server, make sure that both ```update``` and ```curl``` are working properly before executing this script. 
:::

- Prerequisites: Ubuntu 20+(Not recommended to use Incus, please use LXD), Debian 11+(Recommended), RockyLinux 9+, AlmaLinux 9+, Centos 9+, Alpine(After installing bash on your own), Arch
- During installation, you will be prompted to enter the storage pool creation path as well as the size, and all the VMs or containers you want to open end up taking up space in the storage pool
- The server needs to be restarted after the environment installation process to load some default configurations
- By default, lxcfs-related configuration is enabled, so that in-container querying of container information changes to information about the container itself rather than the host
- This installer has been tested to work on either physical or non-physical machines

Command:

```shell
curl -L https://raw.githubusercontent.com/oneclickvirt/incus/main/scripts/incus_install.sh -o incus_install.sh && chmod +x incus_install.sh && bash incus_install.sh
```

OR

```shell
bash incus_install.sh
```

Example of initialization configuration:

If you don't need to specify the path of a non-system disk as the default storage pool, then you can directly enter or type ```n``` when choosing whether to customize the storage pool path, and you don't need to specify the path.

If you need to specify the path of a non-system disk as the default pool, then you need to select ```y``` and enter the corresponding path (the actual absolute path of the disk you mounted).

If the corresponding disk has 18 Gigabytes of free hard disk space in addition to the occupied space and you want to open a 15 Gigabyte storage pool, follow the command line prompts to enter ```15```.

:::tip
The execution process **may** require a **manual reboot** to load the storage type into the kernel, the installation is completed at the end of the execution will **automatically reboot** the server, the first time after the complete installation of the reboot will take about 400 ~ 500 seconds, please be patient
:::

:::warning
If you need to open more than 200 Incus containers on a single server, then it is not recommended to use this project, there may be problems with lxcfs access drift, which generates IO occupancy that cannot be released. (This is a native LXC problem that can't be fixed.)
:::

## Manual Installation (optional)

Not recommended, just to install for some oddball environments where one-click scripts won't run, or if you want to understand the most basic Incus installation process.

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

### Installing incus

Actually, the virtual memory allocated for swap should be twice the size of the actual memory. So, it's reasonable to allocate 1GB if the actual memory is 500MB. The scenario I described above is an excessive allocation.

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

If there are no exceptions, continue execution

```
incus admin init
```

Just enter the default for the normal options

Choose the size of the physical disk (hint: select the default option with a minimum of 1GB). Generally, I fill in the available disk space minus the memory size, then multiply by 0.95 and round down. Here, I entered 10GB.

Remember to select 'no' for options containing 'auto' when prompted to update the image, in order to avoid occupying the system.


