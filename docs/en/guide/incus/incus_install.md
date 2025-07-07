---
outline: deep
---

# incus Installation Guide

If your host does not have an IPV6 subnet and you want to assign IPV6 addresses to containers, then please check the ``Customize`` partition in the ``incus`` module for the ``Attach a free IPV6 address segment`` to the host, and attach an IPV6 subnet to the host before installing the environment.

## One-Click Installation

:::warning
If this is a new server, make sure that both ```update``` and ```curl``` are working properly before executing this script. 
:::

- Prerequisites: Ubuntu 20+, Debian 11+, RockyLinux 9+, AlmaLinux 9+, Centos 9+
- The virtual memory here is talking about the size of the SWAP to be opened, and the storage pool is the sum of the sizes of the disks occupied by all your servers to be opened
- The server needs to be restarted after the environment installation process to load some default configurations
- By default, lxd's lxcfs-related configuration is enabled, so that in-container querying of container information changes to information about the container itself rather than the host
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

If there is 18GB of unused disk space on the system disk, after deducting the space already occupied, and you want to allocate 2GB of virtual memory (2048MB of SWAP) and a 15GB storage pool, then following the prompts in the command line, enter ```2048``` and ```15```.

:::tip
The execution process **may** require a **manual reboot** to load the storage type into the kernel, the installation is completed at the end of the execution will **automatically reboot** the server, the first time after the complete installation of the reboot will take about 400 ~ 500 seconds, please be patient
:::

:::warning
If you need to open more than 200 Incus containers on a single server, then it is not recommended to use this project, there may be problems with lxcfs access drift, which generates IO occupancy that cannot be released. (This is a native LXC problem that can't be fixed.)
:::

## Manual Installation (optional)

Not recommended, just for some odd environments where one-click scripts won't run.

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
