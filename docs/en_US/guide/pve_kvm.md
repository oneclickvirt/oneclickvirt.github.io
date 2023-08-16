---
outline: deep
---

# KVM Virtualization

## SSH Login Instructions

The virtual machines created through KVM virtualization do not have the username '''root''' by default. To switch to the root user, you need to execute '''sudo -i''' .

**Of course, some templates actually allow logging in with the username ```root```, and the default root password is ```password```. You can give it a try.**

Once you've logged in via SSH and switched to root privileges, it's crucial to change the root password. You can use the following command to do so.

Command:

```bash
bash <(curl -sSL https://raw.githubusercontent.com/fscarmen/tools/main/root.sh) [PASSWORD]
```
## Partial Notes

**Commands to set up the testing environment for executing this project are as follows:**

![图片](https://github.com/oneclickvirt/oneclickvirt.github.io/blob/main/docs/images/pve_kvm/pve_kvm_1.png?raw=true)

To perform the above-mentioned query, you only need to use the one-click script below to automatically create a virtual machine. There is no need to manually modify settings on the web interface.

![图片](https://github.com/oneclickvirt/oneclickvirt.github.io/blob/main/docs/images/pve_kvm/pve_kvm_2.png?raw=true)

After creating the virtual machines using the subsequent script as mentioned above, it **may** be necessary to manually modify the settings on the web interface. You will need to disable hardware nested virtualization for each respective virtual machine, as shown in the following diagram.

![图片](https://github.com/oneclickvirt/oneclickvirt.github.io/blob/main/docs/images/pve_kvm/pve_kvm_3.png?raw=true)

Stop the virtual machine before making modifications. After the modifications are done, you can start the machine to use NOVNC. Failure to close it **may** result in bugs that render this virtual machine unusable.

If you forcibly install PVE to enable KVM, even if the startup fails, you can also disable this option and try to start the virtual machine to see if it works.
:::tip
Please use the "screen" command to suspend execution before launching the virtual machine, in order to avoid prolonged startup times. Unstable SSH connections could lead to interruptions during the intermediate execution.
:::

## Images available for creating KVM virtual machines

- Pre-installed with cloud-init enabled.
- Enabled SSH login.
- Pre-configured SSH to listen on ports 22 for both IPv4 and IPv6.
- Enabled password authentication for login.
- Enabled root login.
- Partially pre-installed QEMU guest agent.

The list of currently available image names is as follows:

[https://github.com/oneclickvirt/kvm_images/blob/main/list.text](https://github.com/oneclickvirt/kvm_images/blob/main/list.text)

## Virtual machines with standalone NAT configuration in KVM virtualization.

- Automatically deploy NAT servers with the default Debian 10 image, chosen for its minimal footprint.
- It's possible to customize the image used through the command, and pre-configured images are available. These images come with storage settings ranging from 2 to 10 GB of disk space. For regular use, **at least 10 GB** of disk space is recommended. You can increase the disk size if certain images fail to start.
- The command allows for specifying the storage disk location. When not specified, it defaults to the local disk, which is the system disk. It can also be set to a mount disk as displayed in PVE.
- Recommended custom memory size is 512 MB.
- Automatic internal and external port mapping, including ports 22, 80, 443, and 25 other port numbers shared between internal and external networks.
- After generation, there's a wait time for the virtual machine's internal cloud-init configuration to establish network and login information. This process takes approximately 5 minutes.
- Pertinent virtual machine information will be stored in the NOTES section of the corresponding VM on the web interface, accessible for viewing through the web portal.
- If the host machine has an IPV6 subnet, IPV6 networking will be automatically added. However, there won't be any public IPV6 addresses.

Command:

```shell
curl -L https://raw.githubusercontent.com/spiritLHLS/pve/main/scripts/buildvm.sh -o buildvm.sh && chmod +x buildvm.sh
```

### Usage Instructions

- System Support:
- For x86_64 architecture systems listed in [this link](https://github.com/oneclickvirt/kvm_images/releases/tag/v1.0), simply use the filename without the .qcow2 extension when using. 
- For arm architecture systems listed at [this link](http://cloud-images.ubuntu.com/), use the system name and version number, such as ubuntu20 or ubuntu22.

:::tip
Note that usernames consisting of only numbers may cause issues with cloud-init. It's preferable to use usernames that are entirely in English or start with an English character.
:::

```shell
./buildvm.sh VMID Username Password Number_of_CPU_Cores Memory Disk SSH_Port Port_80 Port_443 Public_Port_Start Public_Port_End System Storage_Disk
```

### Test Example

```shell
./buildvm.sh 102 test1 oneclick123 1 512 10 40001 40002 40003 50000 50025 debian11 local
```

After setup is completed, you can execute ```cat vm102``` to view the information or check the NOTES section for the corresponding VM on the WEB interface.

Below is the information for the example VM that has been set up:

| Attribute                | Value          |
|-------------------------|----------------|
| VMID                     | 102            |
| SSH Username             | test1          |
| SSH Password             | oneclick123    |
| Number of CPU Cores      | 1              |
| Memory Size              | 512MB          |
| Disk Size                | 10G            |
| SSH Port                 | 40001          |
| Port 80                  | 40002          |
| Port 443                 | 40003          |
| Port Range for NAT       | 50000 to 50025 |
| Operating System         | debian11       |
| Host Storage Disk        | local          |

### Deletion Examples

- Stop VM
- Delete VM
- Delete port mapping
- Restart network
- Delete log files

```shell
qm stop 102
qm destroy 102
iptables -t nat -F
iptables -t filter -F
service networking restart
systemctl restart networking.service
rm -rf vm102
```

## Batch Creation of Virtual Machines with KVM Virtualization and NAT

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
Command:

```shell
curl -L https://raw.githubusercontent.com/spiritLHLS/pve/main/scripts/create_vm.sh -o create_vm.sh && chmod +x create_vm.sh && bash create_vm.sh
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
rm -rf vmlog
rm -rf vm*
```

:::tip
Before modifying the VM configuration for PVE, you must shut it down first. After making the configuration changes, start it again to avoid configuration reload errors.
:::

## Setting Up Virtual Machines with Dedicated IPv4 Addresses

Two versions are available, choose as needed.

### Version with Automatic Selection of IPv4 Address (No Manual Specification Required)

:::warning
Before use, ensure that the current host machine has at least 2 available IP addresses within its IP range, and there are unallocated IP addresses. These unallocated IP addresses should not be bound to the host machine.
:::

- Automatically detect available IP ranges. Use ping to identify unallocated IP addresses and select one to bind to the virtual machine.
- If the host machine has an accompanying IPv6 subnet, there will be an option to attach an IPv6 address.
- Relevant system information will be stored in the corresponding virtual machine's NOTE section, accessible for viewing on the web interface.

Command:

```shell
curl -L https://raw.githubusercontent.com/spiritLHLS/pve/main/scripts/buildvm_extraip.sh -o buildvm_extraip.sh && chmod +x buildvm_extraip.sh
```

#### Example of Creation

```shell
./buildvm_extraip.sh VMID Username Password Number_of_CPU_Cores Memory_Size_in_MB Disk_Size_in_GB OS Storage_Disk Attach_IPV6(Default is N)
```

```shell
./buildvm_extraip.sh 152 test1 oneclick123 1 1024 10 debian12 local N
```

The above command is used to create a virtual machine with a dedicated IPv4 address.

| Attribute  | Value          |
|------------|----------------|
| VMID       | 152            |
| Username   | test1          |
| Password   | oneclick123    |
| CPU        | 1 core         |
| Memory     | 1024MB         |
| Disk       | 10GB           |
| OS         | debian12       |
| Storage    | local disk     |
| IPv6 Addon | Not attached by default |

### Version Requiring Manual Specification of IPV4 Address

- Manual specification of IPV4 address with subnet length in the command is required.
- If the host machine comes with an IPV6 subnet, you can choose whether to add an IPV6 address additionally.
- If the vendor has provided an IPV4 address and subnet length, please carefully compare and write the parameters in the command format shown below.
- Relevant system information will be stored in the NOTE of the corresponding virtual machine and can be viewed on the WEB end.

Command:

```shell
curl -L https://raw.githubusercontent.com/spiritLHLS/pve/main/scripts/buildvm_manual_ip.sh -o buildvm_manual_ip.sh && chmod +x buildvm_manual_ip.sh
```

#### Example Usage

```shell
./buildvm_manual_ip.sh VMID USERNAME PASSWORD CPU_CORES MEMORY_SIZE_GB STORAGE_SIZE_GB OS STORAGE_DISK IPV4_ADDRESS ATTACH_IPV6(defaults to N)
```

```shell
./buildvm_manual_ip.sh 152 test1 oneclick123 1 1024 10 debian12 local a.b.c.d/24 N
```

The above command is used to create a virtual machine with an independent IPV4 address.

| Attribute    | Value             |
|--------------|-------------------|
| VMID         | 152               |
| Username     | test1             |
| Password     | oneclick123       |
| CPU          | 1 core            |
| Memory       | 1024MB            |
| Disk         | 10GB              |
| Operating System | debian12       |
| Storage Disk | Local Disk (System Disk) |
| IPV4 Address | a.b.c.d           |
| Subnet       | /24 Subnet        |
| IPV6         | None              |

## Creating Virtual Machines with Pure IPv6 Addresses

The prerequisite is that the host provides an IPv6 subnet instead of just a standalone IPv6 address, and the host does not have MAC address verification enabled.

### Automatic Selection of IPv6 Addresses without Manual Specification

- Automatically detect available IPv6 ranges and bind the corresponding V6 address, based on the virtual machine's number, to the virtual machine.
- System-related information will be stored in the NOTES section of the respective virtual machine, accessible for viewing on the web interface.

Command:

```shell
curl -L https://raw.githubusercontent.com/spiritLHLS/pve/main/scripts/buildvm_onlyv6.sh -o buildvm_onlyv6.sh && chmod +x buildvm_onlyv6.sh
```

#### Example Usage

```shell
./buildvm_onlyv6.sh VMID username password CPU_cores memory_GB disk_GB operating_system storage_disk
```

```shell
./buildvm_onlyv6.sh 152 test1 oneclick123 1 1024 10 debian12 local
```

The above command is used to create a virtual machine with only IPv6 addresses.

| Parameter   | Value           |
|-------------|-----------------|
| VMID        | 152             |
| Username    | test1           |
| Password    | oneclick123     |
| CPU         | 1 core          |
| Memory      | 1024MB          |
| Disk        | 10GB            |
| Operating System | debian12   |
| Storage Disk| local           |


## Delete Example vm152

```shell
qm stop 152
qm destroy 152
rm -rf vm152
```