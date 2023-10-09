---
outline: deep
---

# LXD Installation Guide

## Manual Installation

Recommended for beginners to avoid potential troubleshooting. However, if you're experienced and comfortable with debugging bugs, you can also use the later one-click installation method for convenience.

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
curl -L https://raw.githubusercontent.com/spiritLHLS/lxd/main/scripts/swap.sh -o swap.sh && chmod +x swap.sh && bash swap.sh
```

### Installing LXD

Actually, the virtual memory allocated for swap should be twice the size of the actual memory. So, it's reasonable to allocate 1GB if the actual memory is 500MB. The scenario I described above is an excessive allocation.

```
apt install snapd -y
snap install lxd
/snap/bin/lxd init
```

If the following error occurs in the above command

(snap "lxd" assumes unsupported features: snapd2.39 (try to update snapd and refresh the core snap))

Use the command patch before installing lxd

```
snap install core
```

If there are no exceptions, the results of the above three lines of commands are as follows

![图片](https://user-images.githubusercontent.com/103393591/233270028-5a43d0f7-45f5-4175-969e-d4d182cb877a.png)

Just enter the default for the normal options

Choose the size of the physical disk (hint: select the default option with a minimum of 1GB). Generally, I fill in the available disk space minus the memory size, then multiply by 0.95 and round down. Here, I entered 10GB.

Remember to select 'no' for options containing 'auto' when prompted to update the image, in order to avoid occupying the system.

Test whether symbolic links are functioning in LXC.

```
lxc -h
```

If an error is reported then execute the following command to soft connect the lxc command

```bash
! lxc -h >/dev/null 2>&1 && echo 'alias lxc="/snap/bin/lxc"' >> /root/.bashrc && source /root/.bashrc
export PATH=$PATH:/snap/bin
```

After connecting, test the lxc command again to see if there is an error about not being able to find the

## One-Click Installation

:::warning
If this is a new server, make sure that both 'apt update' and 'apt install curl' are working properly before executing this script.
:::

:::tip
It's recommended to wait for at least 5 minutes after the system boots up before executing the following commands. This is to avoid the script being executed by the default system settings, which could cause issues with apt sources.
:::

- Prerequisites: Ubuntu 18+ (recommended), Debian 8+ (x86_64 architecture only)

**If you are on a Debian-based host, be sure to execute this script within a 'screen' session to prevent ZFS compilation installation failure due to SSH interruptions during long-term runs.**

The virtual memory mentioned here refers to the desired SWAP size, and the storage pool represents the total size of all disks allocated for your virtual machines.

During the environment installation process, **you might need to restart the server to load the kernel with ZFS support and then execute the installation command again. Follow the prompts in the command line after running for accurate instructions.**

Enable the lxcfs-related configuration of lxd by default, so that in-container querying of container information changes to information about the container itself rather than the host.

If the script prompts you to restart the system and execute the script again, and if the second execution still requires a system restart to load the kernel, it means the kernel loading failed during the previous attempt. It's recommended to reinstall the host system using an Ubuntu-based version to resolve this issue.

Each time you run the script, you'll need to input the initialization configuration. So, if the script prompts you to restart the system and execute again, you'll need to input the initialization configuration again.

Command:

```shell
curl -L https://raw.githubusercontent.com/spiritLHLS/lxd/main/scripts/lxdinstall.sh -o lxdinstall.sh && chmod +x lxdinstall.sh && bash lxdinstall.sh
```

Example of initialization configuration:

If there is 18GB of unused disk space on the system disk, after deducting the space already occupied, and you want to allocate 2GB of virtual memory (2048MB of SWAP) and a 15GB storage pool, then following the prompts in the command line, enter ```2048``` and ```15```.
