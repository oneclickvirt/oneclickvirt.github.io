---
outline: deep
---

# Preface

The following is the introduction of the non-customized part, the customized part has its own corresponding introduction, do not get confused!

If there are unadapted merchants or machines welcome to contact [@spiritlhl_bot](https://t.me/spiritlhl_bot), will try to support it sometime!

:::warning
Will change the network structure of the host, please make sure that the host can reset the system at any time and that there is no important data on the host before running it.
:::

Feel free to give the project a ```Star``` for free support!-->[https://github.com/oneclickvirt/pve](https://github.com/oneclickvirt/pve)

## Various requirements

It is recommended that debian try to use the latest stable version of the system before use.

**Warning: This project only supports servers with a dedicated public IPv4 address**

This project relies on a fixed IPv4 address for network allocation and does not support the following scenarios:

* Environments with dynamic IPv4 (e.g., servers whose IP address changes after reboot)
* Environments without a dedicated public IPv4 address (e.g., accessing the internet via home router NAT and requiring DHCP to obtain an address)

If your server does not have a publicly routable static IPv4 address, please do not use this project.

The one-click installation script of this project only adapts to Debian systems, non-Debian can not be installed through the APT source, the official only gives the image of Debian, other systems can only use the ISO installation, or use custom partitions and other ways to solve the problem in the FAQ partition.

- System requirements: Debian 8+

:::tip
It is recommended to install debian11 instead of debian12+, because the latter is a beta version, and the debian11 installation is the stable version.
:::

- Hardware requirements: 2 cores 2G RAM ``x86_64`` or ``arm`` architecture server hard disk at least 20G
- Hardware requirements for KVM: VM-X or AMD-V support (some VPS and all Dedicated servers support).
- If hardware or system requirements are not met, you can use ```incus``` to batch open LXC containers [Jump](https://github.com/oneclickvirt/incus)

If you use IPV6 tunnels for IPV6 subnet attachment on the host, be sure to add the contents in the corresponding file when PVE is successfully installed but the gateway is not automatically set, and do not add IPV6 tunnels at the very beginning (without installing PVE).

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

Command:

```shell
curl -L https://raw.githubusercontent.com/spiritLHLS/addswap/main/addswap.sh -o addswap.sh && chmod +x addswap.sh && bash addswap.sh
```

## Detecting the environment

- This project related scripts must be executed before the execution of this script to detect the environment, if it does not meet the requirements of the installation of PVE will not be able to use the subsequent scripts 
- Detection of the local IPV6 network configuration (with or without IPV6 can be installed, just query) 
- Detection of the hardware configuration meets the minimum requirements 
- Detection of the hardware environment can be nested virtualization KVM type of servers, can not be nested virtualization KVM can also open QEMU TCG server, performance is poor 
- Detect whether the system environment can be nested virtualization KVM type of server, can not be nested virtualization KVM can also open QEMU TCG server, performance is poor 
- can not be nested virtualization KVM servers do not recommend the installation of the PVE, it is better to use [incus](https://github.com/oneclickvirt/incus) for better performance.

Command:

```bash
bash <(wget -qO- --no-check-certificate https://raw.githubusercontent.com/oneclickvirt/pve/main/scripts/check_kernal.sh)
```

If you need to update the IPV6 information before querying, then execute the following command before querying

```bash
rm -rf /usr/local/bin/pve_ipv6*
rm -rf /usr/local/bin/pve_check_ipv6*
rm -rf /usr/local/bin/pve_last_ipv6*
```

**Commands to set up the testing environment for executing this project are as follows:**

![图片](images/pve_kvm_1.png)

To perform the above-mentioned query, you only need to use the one-click script below to automatically create a virtual machine. There is no need to manually modify settings on the web interface.

![图片](images/pve_kvm_2.png)

After creating the virtual machines using the subsequent script as mentioned above, it **may** be necessary to manually modify the settings on the web interface. You will need to disable hardware nested virtualization for each respective virtual machine, as shown in the following diagram.

![图片](images/pve_kvm_3.png)

Stop the virtual machine before making modifications. After the modifications are done, you can start the machine to use NOVNC. Failure to close it **may** result in bugs that render this virtual machine unusable.

If you forcibly install PVE to enable KVM, even if the startup fails, you can also disable this option and try to start the virtual machine to see if it works.

The reason for these issues is what was stated above, the host does not support nested virtualized KVMs for acceleration.

:::tip
Please use the "screen" command to suspend execution before launching the virtual machine, in order to avoid prolonged startup times. Unstable SSH connections could lead to interruptions during the intermediate execution.
:::

<br/>
<br/>

