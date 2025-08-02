---
outline: deep
---

# PVE Body Installation

If you don't know how to choose an option during installation, just press enter.

:::tip
For low-configuration hosts, it is recommended to check the contents of the ```Custom``` partition after all the content has been installed to perform memory tuning and reduce the memory footprint.
:::

## Installation on non-physical machines

Proxmox installed by this method can subsequently use all scripts of this project.

### One-click PVE installation

:::tip
Suggest debian12, the actual test part of the independent server debian11 system will appear a reboot network will be lost, debian12 does not have such a problem!
:::

- The installation is the latest PVE from the apt source at the moment.
- For example, debian10 is pve6.4, debian11 is pve7.x, debian12 is pve8.x, debian13 is pve9.x
- Changes to the ```/etc/hosts``` file (to fix the wrong hostname setting for merchants and to add the required content for PVE)
- ```/etc/cloud/cloud.cfg``` file modification (to avoid overwriting modified hostname etc.)
- ```/etc/network/interfaces``` file modification (fix auto, dhcp type to static, add vmbr0 gateway)
- Detect whether it is China IP, if it is China IP use Tsinghua mirror source, otherwise use the official source, and at the same time deal with the source of apt and the corresponding nameserver, to avoid disconnections
- Create vmbr0 (independent IP gateway), the host allows addr and gateway for intranet IP or extranet IP, has been automatically recognized
- vmbr0 creation support to open pure IPV4, pure IPV6, dual-stack virtual machine, automatic identification of IPV4 address and IPV6 address, automatic identification of the corresponding IP interval
- Installation of the necessary toolkit for PVE to open a virtual machine
- x86_64 replace enterprise subscriptions in apt sources with community sources, arm sources built using third-party patches for fixes
- Print query Linux system kernel and PVE kernel installed or not
- Setting up DNS detection ```8.8.8.8.8``` for boot add DNS systemd service
- Download PVE and printout of login information after adding APT source link for PVE

All modified files have been set to read-only mode to avoid overwriting after reboot.

If you want to modify the file, please use` ```chattr -i file path``` to cancel the read-only lock, and run ```chattr +i file path``` to lock the read-only lock when you finish modifying the file.

You will be prompted to reboot your system once during the execution process, **After rebooting, be sure to wait at least 20 seconds to make sure the system does not reboot automatically again**.

Because the original environment may be missing ```ifupdown``` or ```ifupdown2``` environment, there is a self-installation daemon loaded for the installation, after the installation of the system will automatically reboot the system again, wait for 20 seconds without reboot to ensure that the installation has been run.

If the host itself exists SLAAC assigned IPV6 address, will be able to choose whether to use the largest IPV6 subnet range, the default carriage return does not use the largest IPV6 subnet range only use the local IPV6, if you subsequently need to attach a separate IPV6 address to the virtual machine/container, the option must be selected ```y```.

Command:

```shell
curl -L https://raw.githubusercontent.com/oneclickvirt/pve/main/scripts/install_pve.sh -o install_pve.sh && chmod +x install_pve.sh && bash install_pve.sh
```

or

```shell
bash install_pve.sh
```

:::tip
After successful installation, the web page may not be safe to open, click on Advanced or More Options and insist on accessing it!
:::

The login information is your SSH account and password.

### Pre-configure the environment

- Creating a resource pool mypool
- Remove the subscription popup
- Attempt to enable hardware passthrough
- Detect and auto-install AppArmor modules.
- Before rebooting the system, it is recommended to hook up [nezha probe](https://github.com/naiba/nezha) to facilitate the use of the command line in the background without SSH, to avoid the possibility that SSH may lead to the loss of the root password after the reboot due to the merchant's strange presets.
- Before executing ```reboot```, you need to wait for the background task to finish executing, some host system apt command execution is very slow, you have to wait for a while to finish executing, of course, most of the machines are not so bad!

Command:

```shell
bash <(wget -qO- --no-check-certificate https://raw.githubusercontent.com/oneclickvirt/pve/main/scripts/build_backend.sh)
```

### Automatically configure the host's gateway

:::warning
Before using this command, please make sure that you have restarted the server and that PVE can use the WEB terminal normally before executing this command. Do not execute this command immediately after restarting the machine, wait for at least 1 minute after the WEB terminal is successfully started before executing this command.
If the WEB side doesn't start, run ```systemctl status pveproxy``` to see if it starts, if it's stuck, run ```systemctl start pveproxy``` to start the WEB side.
:::

:::tip
This step is most likely to cause SSH disconnections, the reason is to modify the network without waiting for the PVE kernel to start, which will result in setting conflicts, so wait at least a few minutes until the kernel is started, that is, the WEB side is started successfully before execution.
:::

:::tip
If the host needs to attach an IPV6 tunnel (add an IPV6 subnet to a host that does not have an IPV6 address) before executing this command, please check the [IPV6 free subnet attachment](https://www.spiritlhl.net/en/guide/incus/incus_custom.html#attach-free-ipv6-address-segments-to-host-machines) section to attach to the corresponding configuration file, but please **ignore** 'initial environment modifications' and attach directly, and then execute the following one-click gateway configuration commands after verifying that you have an IPV6 address.
:::

- If vmbr0 is not created, it is automatically created with the same logic as the main installation
- Create vmbr1 (NAT gateway) to support IPV4 servers that open NAT for IPV6 networks with NAT.
- Create vmbr2 (standalone IPV6 gateway), use ndppd to solve the problem of MAC verification of IPV6 addresses by the host, support the opening of servers with standalone IPV6 networks.
- If you want to see the complete settings, you can execute ```cat /etc/network/interfaces``` to see, if you need to modify the gateway you need to modify the file, the web site can not be modified!
- Load iptables and set back to source and allow NAT port forwarding.

In short, ```vmbr0``` is responsible for v4 standalone IPs, and ```vmbr1``` is responsible for complex v4/v6 NATs, ```vmbr2``` is responsible for v6 standalone IPs.

Open independent IPV4 virtual machine using vmbr0, gateway with the host, IPV4/CIDR using the same network segment address and the same subnet mask, using the host's unbound IPV4 address for IPV4/CIDR, of course, if the subsequent use of this script does not need to pay attention to this point of the nuances of the thing

Use vmbr1 for IPV4 VM with NAT, ```172.16.1.1``` for gateway, ```172.16.1.x/24``` for IPV4/CIDR, where x can't be 1, but of course you don't need to pay attention to this minutia if you use this script later.

Command:

```shell
bash <(wget -qO- --no-check-certificate https://raw.githubusercontent.com/oneclickvirt/pve/main/scripts/build_nat_network.sh)
```

:::tip
This step may require you to reboot your system after a few minutes of successful execution, see the final execution of the script at the end of the tip. However, a reboot will ensure that some of the hidden settings are loaded successfully, so be sure to reboot the server once if you are in a position to do so.
:::

To this point the main body is installed.

## Installation on a physical machine

Proxmox installed by this method **NOT** to be used subsequently with all scripts of this project.

This method has not been tested and adapted on a large scale, only I installed PVE8.4 on the local machine, the router itself is not ```automatically obtain an IP address``` but ```fixed IP address connection``` way, if there is a problem corresponding to the warehouse open issues.

### U disk burning official ISO

Official ISO download address:

https://www.proxmox.com/en/downloads/proxmox-virtual-environment/iso

You need to download it locally in advance.

You also need a USB flash drive with a good read/write rate for making a boot disk, as the boot disk needs to be formatted using rufus for boot disk making, you need to make sure that the USB flash drive is empty before making the disk

rufus download address (download to your local, not USB flash drive):

https://rufus.ie/zh/

or

https://github.com/pbatard/rufus

Burning needs to use DD method to burn, the original data of the USB flash disk will be completely erased after burning.

### PVE installation

Find out how to get into the BIOS on the host itself, and modify two things after entering the BIOS

1. Safe boot needs to be turned off

2. the order of the boot needs to be moved to the first USB order

Then save the settings, then insert the USB flash drive, reboot the system, and choose to use the graphical interface for installation.

FQDN need to fill in a URL, you can fill in something like pve.spiritlhl.net, preferably a sub-domain of the domain name you own, not the actual domain name if you write it as something like pve.localsite.com will also work, the subsequent may not be used!

After the installation will automatically shut down and restart, reboot after the black screen can be unplugged USB, to avoid restarting the installation from the USB flash drive, of course, if you forget to reboot to the installation page, shut down the machine after unplugging the USB flash drive and then start up is also OK!

### Wireless Network Configuration

Download the required zip file and shell scripts

https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/pve/refs/heads/main/extra_scripts/wireless/wireless.zip

https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/pve/refs/heads/main/extra_scripts/wireless/wireless.sh

After downloading, unzip the zip file, drag the ```wireless``` folder into the root directory of a new USB flash drive, and the ```wireless.sh``` file has to be put into the root directory as well.

After the flash drive is plugged into the physical machine, you need to mount the flash drive, here sdx1 is the actual path of the flash drive queried by the first command, you need to modify it yourself

```shell 
fdisk -l 
mount /dev/sdx1 /mnt 
```

The ```wireless.zip``` on the USB flash drive should be unzipped and opened to see the deb file.

At this point, run the one-click configuration

```shell 
bash /mnt/wireless.sh 
```

After the configuration is complete, the system will automatically reboot and the public network will be available after the reboot.

During the execution of the configuration script, you will be prompted to enter the name and password of the WIFI. Since there is no Chinese input method in the pure CI environment, the name of the WIFI must be composed of English numbers only, and the password must be the same.

### Cautions

Physical machine after the installation of unlimited modules can not use NAT to connect directly to the virtual machine to access the network, so the subsequent tutorials of this project does not support this method of access to the bridge, the subsequent scripts of this project does not support this method of installation of Proxmox.

Currently feasible wireless module used on the PVE success stories, are required to WIFI router access to the network is ```automatically obtain an IP address (DHCP)``` (the subsequent use of openwrt or ikuai or directly nat after the network available within the virtual machine), or can be modified in the router static routing table, if the WIFI router to use a ```fixed IP address Connection to the network```, for the time being did not find success stories.