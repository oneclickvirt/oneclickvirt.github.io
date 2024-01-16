---
outline: deep
---

# Preface

The following is the introduction of the non-customized part, the customized part has its own corresponding introduction, do not get confused!

If there are unadapted merchants or machines welcome to contact [@spiritlhl_bot](https://t.me/spiritlhl_bot), will try to support it sometime!

:::warning
Will change the network structure of the host, please make sure that the host can reset the system at any time and that there is no important data on the host before running it.
:::

Feel free to give the project a ```Star``` for free support!-->[https://github.com/spiritLHLS/pve](https://github.com/spiritLHLS/pve)

## Various requirements

It is recommended that debian try to use the latest stable version of the system before use.

**Do not use this set of scripts in the dynamic IP server (reboot the machine automatically switch the local IP server is not supported, reboot the machine after the IP does not automatically switch the support)**

The one-click installation script of this project only adapts to Debian systems, non-Debian can not be installed through the APT source, the official only gives the image of Debian, other systems can only use the ISO installation, or use custom partitions and other ways to solve the problem in the FAQ partition.

- System requirements: Debian 8+

:::tip
It is recommended to install debian11 instead of debian12, because the latter is a beta version, and the debian11 installation is the stable version.
:::

- Hardware requirements: 2 cores 2G RAM ``x86_64`` or ``arm`` architecture server hard disk at least 20G
- Hardware requirements for KVM: VM-X or AMD-V support (some VPS and all Dedicated servers support).
- If hardware or system requirements are not met, you can use LXD to batch open LXC containers [Jump](https://github.com/spiritLHLS/lxd)

If you use IPV6 tunnels for IPV6 subnet attachment on the host, be sure to add the contents in the corresponding file when PVE is successfully installed but the gateway is not automatically set, and do not add IPV6 tunnels at the very beginning (without installing PVE).

## Setting up virtual memory (SWAP)

Unit conversion: Enter 1024 to generate 1G SWAP-virtual memory, virtual memory takes up hard disk space, when the actual memory is not enough to use the virtual memory will automatically use the virtual memory for memory use, but then bring the IO high occupancy and CPU performance occupancy!

It is recommended to use only twice the size of the actual memory as virtual memory.

Command:

```shell
curl -L https://raw.githubusercontent.com/spiritLHLS/addswap/main/addswap.sh -o addswap.sh && chmod +x addswap.sh && bash addswap.sh
```

## Detecting the environment

- Before the execution of scripts related to this project, be sure to execute this script to detect the environment, if it does not meet the requirements of the installation of PVE will not be able to use the subsequent scripts.
- Detecting the IPV6 network configuration of the machine (IPV6 can be installed with or without IPV6, it is just a query).
- Detect whether the hardware configuration meets the minimum requirements
- Detect whether the hardware environment can be nested virtualization KVM type of server
- Detect whether the system environment can nest virtualized KVM-type servers.
- Can not be nested virtualization KVM type of server can also open LXC virtualization server, but do not recommend installing PVE, rather use [LXD](https://github.com/spiritLHLS/lxd)

Command:

```bash
bash <(wget -qO- --no-check-certificate https://raw.githubusercontent.com/spiritLHLS/pve/main/scripts/check_kernal.sh)
```

If you need to update the IPV6 information before querying, then execute the following command before querying

```bash
rm -rf /usr/local/bin/pve_ipv6*
rm -rf /usr/local/bin/pve_check_ipv6*
rm -rf /usr/local/bin/pve_last_ipv6*
```

<br/>
<br/>

