---
outline: deep
---

# Preface

The following is the introduction of the non-customized part, the customized part has its own corresponding introduction, do not get confused!

If your host does not have an IPV6 subnet and you want to assign IPV6 addresses to containers, then please check the ``Customize`` partition in the ``incus`` module for the ``Attach a free IPV6 address segment`` to the host, and attach an IPV6 subnet to the host before installing the environment.

## Requirements

Hardware requirements.
- System: Debian 8+, Ubuntu 18+ (20.04 recommended).
- Virtualization: KVM, VMWARE recommended.
- Memory: At least 512MB of RAM
- Hard disk: hard disk (system disk) at least 10G
- Network: Independent IPV4 address, IPV6 is optional, bandwidth can download scripts on the line, the network can connect to the Github raw page on the line

PS: If the hardware is very good and has a lot of resources, you can use PVE to batch open KVM virtualized VMs [Jump](https://github.com/spiritLHLS/pve)

PS: If the hardware resources are even worse, virtualization is not supported, you can use the docker version, the adaption surface is wider [Jump](https://github.com/spiritLHLS/docker)

## Project Features

- This set of script development using **Ubuntu20**, Ubuntu other long-term maintenance version should also be no problem, Debian can not use zfs automatically switch to another storage type!

- Set up both TCP and UDP forwarding, in addition to SSH ports, other mapping intranet and extranet ports are the same.

- Support for docker nested virtualization of open incus containers has been set up, and the default normal version and pure probe version use the debian11 system.

- lxcfs has been set to be enabled by default, so that querying resources within a container uses the configured view rather than the host's view

- Have blocked the container may be used to abuse the toolkit and IPV4 network TCP/UDP protocol ports ( 3389 8888 54321 65432 ), to prevent the container is used for scanning and blasting, and can be external process checking for problems automatically shut down

- Has supported one-click configuration of IPV6 addresses for incus containers (provided that the mother hen has an IPV6 subnet, no IPV6 address is not configured), automatically adapted to the size of the subnet

- Ensure that the disk you want to open is the default system disk (sda or sda1) and not the mounted disk (sdb and so on), if you are not sure, use ``fdisk -l`` and ``df`` to check.

- See [Other notes](https://github.com/oneclickvirt/incus/blob/main/README_other.md) for details on mounting other disks.

- One-click scripts support custom restrictions on all content, the normal version supports multiple runs of the batch generation does not overwrite the previously generated configuration

## Detecting the environment

**Use the subsequent script must execute this command to detect the hen whether it meets the requirements**

Command:

```
bash <(wget -qO- --no-check-certificate https://raw.githubusercontent.com/oneclickvirt/incus/main/scripts/pre_check.sh)
```