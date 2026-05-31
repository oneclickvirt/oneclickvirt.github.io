---
outline: deep
---

# Main PVE Installation

If you are not sure how to answer an installation prompt, pressing Enter for the default option is usually fine.

:::tip
For low-configuration hosts, it is recommended to check the contents of the ```Custom``` partition after all the content has been installed to perform memory tuning and reduce the memory footprint.
:::

## Installation on non-physical machines

Proxmox installed by this method can subsequently use all scripts of this project.

### One-click PVE installation

:::tip
Debian 12 or newer is recommended. In real tests, some Debian 11 hosts lost network connectivity after reboot, while Debian 12 did not show this issue.
:::

- Installs the latest available PVE package set from apt sources.
- Example mapping: Debian 10 -> PVE 6.4, Debian 11 -> PVE 7.x, Debian 12 -> PVE 8.x, Debian 13 -> PVE 9.x.
- Updates ```/etc/hosts``` to fix host naming issues and inject required PVE entries.
- Updates ```/etc/cloud/cloud.cfg``` to avoid cloud-init overwriting modified host settings.
- Updates ```/etc/network/interfaces``` to convert DHCP-style defaults to static layout and add vmbr0 gateway config.
- Automatically adjusts package source handling and DNS settings during installation to reduce avoidable network failures
- Creates vmbr0 (independent IP gateway) and auto-detects whether host address/gateway are private or public.
- vmbr0 setup supports IPv4-only, IPv6-only, and dual-stack VM networking with automatic subnet recognition.
- Installs required toolkits for VM provisioning on PVE.
- On x86_64, replaces enterprise apt subscription sources with community sources; ARM paths use maintained patch workflows.
- Prints Linux kernel and PVE kernel installation status for quick verification.
- Enables boot-time DNS health checks through systemd service.
- Adds PVE apt sources and prints login access details after installation.

All modified files have been set to read-only mode to avoid overwriting after reboot.

If you need to edit these files later, run ```chattr -i <file>``` first to remove read-only protection, then run ```chattr +i <file>``` after editing.

You will be prompted to reboot your system once during the execution process, **After rebooting, be sure to wait at least 20 seconds to make sure the system does not reboot automatically again**.

Some source environments are missing ```ifupdown``` or ```ifupdown2```. The installer may deploy helper components and trigger an additional reboot. Wait about 20 seconds after boot to confirm no further automatic reboot is pending.

If the host already has an SLAAC-assigned IPv6 address, you can choose whether to use the largest detected IPv6 subnet range. The default Enter option keeps local IPv6 only. If you plan to assign independent IPv6 addresses to VMs/containers later, choose ```y```.

Command:

```shell
curl -L https://raw.githubusercontent.com/oneclickvirt/pve/main/scripts/install_pve.sh -o install_pve.sh && chmod +x install_pve.sh && bash install_pve.sh
```

or

```shell
bash install_pve.sh
```

:::tip
After installation, the browser may show a certificate warning. Click Advanced (or equivalent) and continue if you trust the host.
:::

The login information is your SSH account and password.

### Pre-configure the environment

- Creating a resource pool mypool
- Remove the subscription popup
- Attempt to enable hardware passthrough
- Detect and auto-install AppArmor modules.
- Before rebooting, consider deploying [nezha probe](https://github.com/naiba/nezha) so you still have emergency command-line access if SSH becomes unavailable.
- Before running ```reboot```, make sure all background apt tasks are finished. Some hosts process apt jobs slowly.

Command:

```shell
bash <(curl -sSLk https://raw.githubusercontent.com/oneclickvirt/pve/main/scripts/build_backend.sh)
```

### Automatically configure the host's gateway

:::warning
Before using this command, make sure the server has rebooted and the PVE web terminal is working. Do not run it immediately after reboot; wait at least 1 minute after the web terminal is available.
If the web service does not start, run ```systemctl status pveproxy``` to check status. If it is stuck, run ```systemctl start pveproxy```.
:::

:::tip
This step can cause SSH disconnections if networking changes are applied before the PVE kernel stack is fully ready. Wait a few minutes and confirm the web UI is healthy before execution.
:::

:::tip
If the host needs to attach an IPv6 tunnel (add an IPv6 subnet to a host that does not have an IPv6 address) before executing this command, please check the [IPv6 free subnet attachment](https://www.spiritlhl.net/en/guide/incus/incus_custom.html#attach-free-ipv6-address-segments-to-host-machines) section to attach to the corresponding configuration file, but please **ignore** 'initial environment modifications' and attach directly, and then execute the following one-click gateway configuration commands after verifying that you have an IPv6 address.
:::

- If vmbr0 is not created, it is automatically created with the same logic as the main installation
- Create vmbr1 (NAT gateway) to support IPv4 servers that open NAT for IPv6 networks with NAT.
- Create vmbr2 (standalone IPv6 gateway). `ndppd` is used to handle host-side MAC verification for IPv6 addresses so standalone IPv6 server networking can work correctly.
- To review full network settings, run ```cat /etc/network/interfaces```. If you need to change gateway settings, edit this file directly; the web UI cannot apply those changes reliably.
- Load iptables and set back to source and allow NAT port forwarding.

In short, ```vmbr0``` is responsible for v4 standalone IPs, and ```vmbr1``` is responsible for complex v4/v6 NATs, ```vmbr2``` is responsible for v6 standalone IPs.

For independent IPv4 VMs on `vmbr0`, use the same subnet and netmask as the host, and assign an unbound host-side IPv4 as the VM IPv4/CIDR. If you always use the provided scripts, you usually do not need to handle this manually.

For NAT IPv4 VMs on `vmbr1`, use gateway ```172.16.1.1``` and subnet ```172.16.1.x/24``` (where `x` must not be `1`). Script-based workflows handle this automatically.

Command:

```shell
bash <(curl -sSLk https://raw.githubusercontent.com/oneclickvirt/pve/main/scripts/build_nat_network.sh)
```

:::tip
This step may require you to reboot your system after a few minutes of successful execution, see the final execution of the script at the end of the tip. However, a reboot will ensure that some of the hidden settings are loaded successfully, so be sure to reboot the server once if you are in a position to do so.
:::

To this point the main body is installed.


### One-Click Uninstall PVE

After the uninstall script completes, restarting the host machine will restore it to its pre-installation state.

```shell
bash <(curl -sSLk https://raw.githubusercontent.com/oneclickvirt/pve/main/scripts/uninstall_pve.sh)
```

## Installation on a physical machine

Proxmox installed through this physical-machine path is **not** guaranteed to be compatible with all automation scripts in this project.

This method has not been widely validated. Current validation is based on local PVE 8.4 installs in fixed-IP router environments. If issues occur, please open an issue in the repository.

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

For FQDN, enter a hostname such as `pve.example.com`. A subdomain of your own domain is recommended. It does not have to resolve publicly during initial setup.

After installation, the machine reboots automatically. When the screen goes black, unplug the USB drive to avoid booting into installer again. If you forget, shut down, unplug USB, and start again.

### Wireless Network Configuration

Download the required zip file and shell scripts

https://raw.githubusercontent.com/oneclickvirt/pve/refs/heads/main/extra_scripts/wireless/wireless.zip

https://raw.githubusercontent.com/oneclickvirt/pve/refs/heads/main/extra_scripts/wireless/wireless.sh

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

For physical-machine installs with wireless modules, direct NAT bridge access to guest VMs may not work as expected. This network path is not the primary supported route for the follow-up automation scripts in this project.

Known successful wireless-module setups on PVE require router-side DHCP (`automatically obtain an IP address`) or equivalent static-route adjustments. For Wi-Fi routers using strict fixed-IP uplink mode, there are currently no stable success cases.
