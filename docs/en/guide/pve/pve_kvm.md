---
outline: deep
---

# Linux Virtual Machine (KVM/TCG Virtualization)

## SSH Login Instructions

When open a virtual machine, the default generated username **can be something other than** ```root```, in which case you need to run ```sudo -i``` to switch to root!

If the default username **is not ```root```, the default unset root password is ```password``` or ```oneclickvirt```**.

**After logging into SSH and switching to root privileges, be sure to change the root password**, which can be changed using the following command:

```bash
bash <(curl -sSL https://raw.githubusercontent.com/fscarmen/tools/main/root.sh) [PASSWORD]
```

## Considerations for opening a virtual machine with an IPV6 address

Due to long-term inactivity IPV6 does not use may lead to NDP broadcast cache invalidation reset, generally idle for about 50 minutes will appear IPV6 unavailable, commonly known as "IPV6 cutoff", at this time it is necessary to set up a timer task.

```shell
echo '*/1 * * * * curl -m 6 -s ipv6.ip.sb || curl -m 6 -s ipv6.ip.sb' | crontab -
```

Executing the above commands in the opened virtual machine ensures that the IPV6 network is always used and does not fail over.

## Images available for creating virtual machines

- Pre-installed with cloud-init enabled.
- Enabled SSH login.
- Pre-configured SSH to listen on ports 22 for both IPv4 and IPv6.
- Enabled password authentication for login.
- Enabled root login.
- Partially pre-installed QEMU guest agent.
- System support:
  - See [pve_kvm_images](https://github.com/oneclickvirt/pve_kvm_images) or [kvm_images](https://github.com/oneclickvirt/kvm) for details on the x86_64 architecture, you only need to write the system name + system version number, such as ubuntu20, ubutnu22, debian11, debian12, and so on.
  - For arm architecture, see the systems listed in [ubuntu](http://cloud-images.ubuntu.com/) or [debian](https://cloud.debian.org/), you only need to write the system name + system version number, such as ubuntu20, ubutnu22, debian11, debian12, and so on.

## Virtual machines with standalone NAT configuration.

- Automatically deploy NAT servers with the default Debian 10 image, chosen for its minimal footprint.
- It's possible to customize the image used through the command, and pre-configured images are available. These images come with storage settings ranging from 2 to 10 GB of disk space. For regular use, **at least 10 GB** of disk space is recommended. You can increase the disk size if certain images fail to start.
- The command allows for specifying the storage disk location. When not specified, it defaults to the local disk, which is the system disk. It can also be set to a mount disk as displayed in PVE.
- Recommended custom memory size is 512 MB.
- Automatic internal and external port mapping, including ports 22, 80, 443, and 25 other port numbers shared between internal and external networks.
- After generation, there's a wait time for the virtual machine's internal cloud-init configuration to establish network and login information. This process takes approximately 5 minutes.
- Pertinent virtual machine information will be stored in the NOTES section of the corresponding VM on the web interface, accessible for viewing through the web portal.
- If the host machine has an IPV6 subnet, IPV6 networking will be automatically added. However, there won't be any public IPV6 addresses.
- Optionally enable or disable standalone IPV6, requires the host to have at least one /64 subnet

### Usage Instructions

:::tip
Note that usernames consisting of only numbers may cause issues with cloud-init. It's preferable to use usernames that are entirely in English or start with an English character.
:::

**Download Script**

```shell
curl -L https://raw.githubusercontent.com/oneclickvirt/pve/main/scripts/buildvm.sh -o buildvm.sh && chmod +x buildvm.sh
```

**Meaning of each parameter**

```shell
# ./buildvm.sh VMID Username Password Number_of_CPU_Cores Memory Disk SSH_Port Port_80 Port_443 Public_Port_Start Public_Port_End System Storage_Disk Independent_IPV6_address(leave default N blank)
```

:::tip
Note that the Password here should be a mix of English and numbers only, and start with English, so as to avoid failing to set the Password due to special characters being escaped during the setup process.
:::

### Test Example

```shell
./buildvm.sh 111 root oneclick123 1 512 10 40001 40002 40003 50000 50025 debian11 local N
```

After setup is completed, you can execute ```cat vm111``` to view the information or check the NOTES section for the corresponding VM on the WEB interface.

Below is the information for the example VM that has been set up:

| Attribute           | Value          |
| ------------------- | -------------- |
| VMID                | 111            |
| SSH Username        | root           |
| SSH Password        | oneclick123    |
| Number of CPU Cores | 1              |
| Memory Size         | 512MB          |
| Disk Size           | 10G            |
| SSH Port            | 40001          |
| Port 80             | 40002          |
| Port 443            | 40003          |
| Port Range for NAT  | 50000 to 50025 |
| Operating System    | debian11       |
| Host Storage Disk   | local          |
| IPV6 address        | N              |

:::tip
Note that only VMIDs from 100 to 256 can be used here, no other numbers can be used.
:::

## Deletion specific VM

- Stop VM
- Delete VM
- Delete port mapping
- Restart network
- Delete log files

**Download Script**

```shell
curl -L https://raw.githubusercontent.com/oneclickvirt/pve/main/scripts/pve_delete.sh -o pve_delete.sh && chmod +x pve_delete.sh
```

**Meaning of each parameter**

You can delete the VM with the corresponding VMID, as demonstrated here using the example 111 above

```shell
./pve_delete.sh 111
```

The actual number of deletions is not fixed, a space separates each VMID, and more than one can be deleted at a time.

## Batch Creation of Virtual Machines with NAT

:::warning
Before initial use, ensure that the current Proxmox Virtual Environment (PVE) is clean and the host machine has not undergone any port forwarding, as conflicting settings may result in bugs.
:::

:::tip
Before initiating the batch creation process, please use the 'screen' command to execute it in the background. This will help avoid interruptions due to the instability of SSH caused by extended batch creation times.
:::

- The batch creation process can be run multiple times to generate multiple virtual machines (VMs).
- NAT servers are automatically created during the process. If left blank, the default Debian 11 image will be used. You can also customize the image name. Refer to the list of supported images in the previous section.
- Automatic internal and external port mapping is performed, including ports 22, 80, 443, and other ports with identical internal and external numbers (25 ports in total).
- After generation, a waiting period is required for the cloud-init configuration of the VM's network and login information to be set up. This process takes approximately 5 minutes. There is a 60-second interval between creating each VM to avoid potential performance issues.
- The default network configuration for VMs created in batches includes port mappings for ports 22, 80, 443, and a range of 25 ports for internal and external communication.
- You can customize the number of CPU cores, memory size, disk size, and which storage disk on the host machine to use for batch creation. Ensure you calculate available resources before proceeding.
- Relevant information about the virtual machines will be stored in the 'NOTES' section of the corresponding VM on the web interface, where you can view them.
- If the host machine comes with an IPv6 subnet, an IPv6 network will be automatically attached, although there will be no public IPv6 addresses available.
- Optionally enable or disable standalone IPV6, requires the host to have at least one /64 subnet.

Command:

```shell
curl -L https://raw.githubusercontent.com/oneclickvirt/pve/main/scripts/create_vm.sh -o create_vm.sh && chmod +x create_vm.sh && bash create_vm.sh
```

After the setup is completed, you can execute ```cat vmlog``` to view the information, or check the NOTES in the corresponding VM on the web interface.

## Delete All Virtual Machines

- Delete all VMs
- Delete all NAT port mappings
- Restart the network
- Delete log files

```shell
for vmid in $(qm list | awk '{if(NR>1) print $1}'); do qm stop $vmid; qm destroy $vmid; rm -rf /var/lib/vz/images/$vmid*; done
iptables -t nat -F
iptables -t filter -F
service networking restart
systemctl restart networking.service
systemctl restart ndpresponder.service
iptables-save | awk '{if($1=="COMMIT"){delete x}}$1=="-A"?!x[$0]++:1' | iptables-restore
iptables-save > /etc/iptables/rules.v4
rm -rf vmlog
rm -rf vm*
```

:::tip
Before modifying the VM configuration for PVE, you must shut it down first. After making the configuration changes, start it again to avoid configuration reload errors.
:::

## Setting Up Virtual Machines with Dedicated IPv4 Addresses

Three scripts, each with its own advantages and disadvantages.

The first two scripts **don't** require an additional IPV4 address to be bound to the ```vmbr0``` interface beforehand, and the opened VM will **directly** bind the additional IPV4 address.

The last script **requires** additional IPV4 addresses to be bound to the ```vmbr0``` interface beforehand, and the opened VM will do **NAT full port mapping** to the intranet IPV4 address, **without **directly** binding additional IPV4 addresses.

### Automatically selects additional IPV4 addresses on the same subnet as the host machine to open the virtual machine

:::warning
Before use, ensure that the current host machine has at least 2 available IP addresses within its IP range, and there are unallocated IP addresses. These unallocated IP addresses should not be bound to the host machine.
:::

:::tip
At this point, the IPV4 address appended is the address following the host's current IPV4 address in sequence.
For example, if the current host address is ```1.1.1.32``` and then ```1.1.1.33``` there is already a virtual machine, then this script appends an IP address of ```1.1.1.34```.
:::

- Automatically detect available IP ranges. Use ping to identify unallocated IP addresses and select one to bind to the virtual machine.
- If the host machine has an accompanying IPv6 subnet, there will be an option to attach an IPv6 address.
- Relevant system information will be stored in the corresponding virtual machine's NOTE section, accessible for viewing on the web interface.
- Optionally enable or disable standalone IPV6, requires the host to have at least one /64 subnet.
- The automatically appended IPV4 address is within the **same subnet** as the host's IPV4 address (IP address prefix is the same)
- Inbound and outbound traffic in and out of the VM goes to the additional IPV4 address of the binding

#### Usage Instructions

**Download Script**

```shell
curl -L https://raw.githubusercontent.com/oneclickvirt/pve/main/scripts/buildvm_extra_ip.sh -o buildvm_extra_ip.sh && chmod +x buildvm_extra_ip.sh
```

**Meaning of each parameter**

```shell
# ./buildvm_extra_ip.sh VMID Username Password Number_of_CPU_Cores Memory_Size_in_MB Disk_Size_in_GB OS Storage_Disk Attach_IPV6(Default is N)
```

:::tip
Note that the Password here should be a mix of English and numbers only, and start with English, so as to avoid failing to set the Password due to special characters being escaped during the setup process.
:::

#### Test Example

```shell
./buildvm_extra_ip.sh 152 root oneclick123 1 1024 10 debian12 local N
```

The above command is used to create a virtual machine with a dedicated IPv4 address.

| Attribute  | Value                   |
| ---------- | ----------------------- |
| VMID       | 152                     |
| Username   | root                    |
| Password   | oneclick123             |
| CPU        | 1 core                  |
| Memory     | 1024MB                  |
| Disk       | 10GB                    |
| OS         | debian12                |
| Storage    | local disk              |
| IPv6 Addon | Not attached by default |

:::tip
Note that only VMIDs from 100 to 256 can be used here, no other numbers can be used.
:::

### Manually Assign Additional IPV4 Addresses to Open Virtual Machines

- Manual specification of IPV4 address with subnet length in the command is required.
- If the host machine comes with an IPV6 subnet, you can choose whether to add an IPV6 address additionally.
- If the vendor has provided an IPV4 address and subnet length, please carefully compare and write the parameters in the command format shown below.
- Relevant system information will be stored in the NOTE of the corresponding virtual machine and can be viewed on the WEB end.
- Optionally enable or disable standalone IPV6, requires the host to have at least one /64 subnet.
- Manually appended IPV4 addresses that are in **different subnets** from the host's IPV4 address (different IP address prefixes) will use the host's IP address as the gateway
- Manually appended IPV4 addresses that are within the **same subnet** as the host's IPV4 address (same IP address prefix) will use the host's gateway as the gateway
- Optionally specify the MAC address of the virtual machine
- Inbound and outbound traffic in and out of the VM goes to the additional IPV4 address of the binding

:::tip
If IP addresses within **different subnets** are appended without a MAC address, the router will not recognize the source MAC address, and the traffic will be flagged as “misuse” and “may” cause the server to be blocked.
(If you are using a Hetzner standalone server, it is recommended that you provide the MAC address of the attached IPV4 address to prevent abuse from being reported.)
:::

#### Usage Instructions

**Download Script**

```shell
curl -L https://raw.githubusercontent.com/oneclickvirt/pve/main/scripts/buildvm_manual_ip.sh -o buildvm_manual_ip.sh && chmod +x buildvm_manual_ip.sh
```

**Meaning of each parameter**

```shell
# ./buildvm_manual_ip.sh VMID USERNAME PASSWORD CPU_CORES MEMORY_SIZE_GB STORAGE_SIZE_GB OS STORAGE_DISK IPV4_ADDRESS ATTACH_IPV6(defaults to N) MAC_ADDRESS(Optional whether to specify)
```

:::tip
Note that the PASSWORD here should be a mix of English and numbers only, and start with English, so as to avoid failing to set the PASSWORD due to special characters being escaped during the setup process.
:::

#### Test Example

```shell
./buildvm_manual_ip.sh 152 root oneclick123 1 1024 10 debian12 local a.b.c.d/24 N
```

The above command is used to create a virtual machine with an independent IPV4 address.

| Attribute        | Value                    |
| ---------------- | ------------------------ |
| VMID             | 152                      |
| Username         | root                     |
| Password         | oneclick123              |
| CPU              | 1 core                   |
| Memory           | 1024MB                   |
| Disk             | 10GB                     |
| Operating System | debian12                 |
| Storage Disk     | Local Disk (System Disk) |
| IPV4 Address     | a.b.c.d                  |
| Subnet           | /24 Subnet               |
| IPV6             | None                     |
| MAC_ADDRESS      | None                     |

:::tip
Note that only VMIDs from 100 to 256 can be used here, no other numbers can be used.
:::

### Host manually appends an additional IPV4 address and then specifies the IPV4 address to open the virtual machine

- You need to add the extra IPV4 address to ```vmbr0``` in ```/etc/network/interfaces``` (note that ```chattr -i``` unlocks the file and then ```chattr +i``` locks it back).
- Other features are similar to opening a NAT-enabled VM, except that here the mapping is no longer partial port mapping or mapping to the host's IPV4 address, but full-port one-by-one mapping to additional IPV4 addresses
- Traffic coming into the VM from outside the VM goes to the bound additional IPV4 address, and traffic going out of the VM goes to the original host's IPV4 address

:::tip
Make sure you can SSH into the host with the extra IPV4 address before opening, but ```curl ip.sb``` still shows the original host IPV4 address.
:::

#### Usage Instructions

**Download Script**

```shell
curl -L https://raw.githubusercontent.com/oneclickvirt/pve/main/scripts/buildvm_fullnat_ip.sh -o buildvm_fullnat_ip.sh && chmod +x buildvm_fullnat_ip.sh
```
**Meaning of each parameter**

```shell
# ./buildvm_fullnat_ip.sh VMID USERNAME PASSWORD CPU_CORES MEMORY_SIZE_GB STORAGE_SIZE_GB OS STORAGE_DISK IPV4_ADDRESS ATTACH_IPV6(defaults to N)
```

:::tip
Note that the PASSWORD here should be a mix of English and numbers only, and start with English, so as to avoid failing to set the PASSWORD due to special characters being escaped during the setup process.
:::

#### Test Example

```shell
./buildvm_fullnat_ip.sh 152 root oneclick123 1 1024 10 debian12 local a.b.c.d N
```

The above command is used to create a virtual machine with an independent IPV4 address.

| Attribute        | Value                    |
| ---------------- | ------------------------ |
| VMID             | 152                      |
| Username         | root                     |
| Password         | oneclick123              |
| CPU              | 1 core                   |
| Memory           | 1024MB                   |
| Disk             | 10GB                     |
| Operating System | debian12                 |
| Storage Disk     | Local Disk (System Disk) |
| IPV4 Address     | a.b.c.d                  |
| IPV6             | None                     |
| MAC_ADDRESS      | None                     |

:::tip
Note that only VMIDs from 100 to 256 can be used here, no other numbers can be used.
:::

#### Incoming and outgoing traffic goes to the bound IPV4 address

execute

```
line="-A POSTROUTING -s 172.16.1.0\/24 -o vmbr0 -j MASQUERADE"
sed -i "\|$line|d" /etc/iptables/rules.v4
service netfilter-persistent restart
```

This will cause the host to lose the ability to open VMs/containers with NAT that do not have a separate IPV4 address, so be careful!

After this, You will only be able to open VMs with separate IPV4 addresses.

## Creating Virtual Machines with Pure IPv6 Addresses

The prerequisite is that the host provides an IPv6 subnet instead of just a standalone IPv6 address, and the host does not have MAC address verification enabled.

### Automatic Selection of IPv6 Addresses without Manual Specification

- Pure IPV6 refers to a bound public IPV6 address, where the actual VM still has the host's IPV4 network but no external IPV4 port
- Automatically detect available IPv6 ranges and bind the corresponding V6 address, based on the virtual machine's number, to the virtual machine.
- System-related information will be stored in the NOTES section of the respective virtual machine, accessible for viewing on the web interface.

#### Usage Instructions

**Download Script**

```shell
curl -L https://raw.githubusercontent.com/oneclickvirt/pve/main/scripts/buildvm_onlyv6.sh -o buildvm_onlyv6.sh && chmod +x buildvm_onlyv6.sh
```

**Meaning of each parameter**

```shell
# ./buildvm_onlyv6.sh VMID username password CPU_cores memory_GB disk_GB operating_system storage_disk
```

:::tip
Note that the password here should be a mix of English and numbers only, and start with English, so as to avoid failing to set the password due to special characters being escaped during the setup process.
:::

#### Test Example

```shell
./buildvm_onlyv6.sh 152 root oneclick123 1 1024 10 debian12 local
```

The above command is used to create a virtual machine with only IPv6 addresses.

| Parameter        | Value       |
| ---------------- | ----------- |
| VMID             | 152         |
| Username         | root        |
| Password         | oneclick123 |
| CPU              | 1 core      |
| Memory           | 1024MB      |
| Disk             | 10GB        |
| Operating System | debian12    |
| Storage Disk     | local       |

:::tip
Note that only VMIDs from 100 to 256 can be used here, no other numbers can be used.
:::
