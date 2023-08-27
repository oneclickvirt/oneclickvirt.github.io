---
outline: deep
---

# LXC Virtualization

## Creating Individual LXC Containers for Virtualization

:::warning
Before initial use, ensure that the current PVE (Proxmox Virtual Environment) is clean and the host machine has not undergone any port mapping, as conflicts in settings could lead to bugs.
:::

:::tip
Before creating containers, use the 'screen' command to run them in the background. This helps to avoid extended creation times that might lead to interruptions due to unstable SSH connections.
:::

- Automatically create NAT servers using the default Debian 11 image, or customize the system image as needed.
- Automatically perform internal and external network port mapping, including ports 22, 80, 443, and 25 additional ports with identical numbers for both internal and external networks.
- After generation, allow some time for the virtual machine to configure its internal network and login information. This process takes approximately 3 minutes.
- The default network configuration includes port mappings for 22, 80, 443, and a range of 25 ports for both internal and external networks.
- Customize the number of cores, memory size, disk size, and the storage disk on the host machine for allocation. Ensure that you calculate available resources before creating containers.
- Optionally specify the storage disk location in the command. When not specified, it defaults to the local disk, which is the system disk. Alternatively, you can specify a mount disk as displayed in PVE.
- The created containers are enabled with SSH by default, allowing root login. They are also configured to support nested virtualization for Docker.
- Relevant container information will be stored in the respective container's notes, accessible through the web interface.
- If the host machine has an IPV6 subnet, IPV6 networking will be automatically attached, but no public IPV6 addresses will be provided.
- Optionally enable or disable standalone IPV6, requires the host to have at least one /64 subnet

### Usage Instructions

Download the script

Command:

```shell
curl -L https://raw.githubusercontent.com/spiritLHLS/pve/main/scripts/buildct.sh -o buildct.sh && chmod +x buildct.sh
```

System Support:
- debian10, debian11
- ubuntu18, ubuntu20, ubuntu22
- centos8, almalinux9
- Other systems may or may not be supported, please test on your own.

:::tip
System parameters are always in lowercase, consisting of the system name concatenated with the version number. For x86_64 systems, you can check available system names and version numbers using ```pveam available --section system```. For ARM systems, you can check supported systems and version numbers at [https://mirror.tuna.tsinghua.edu.cn/lxc-images/images/](https://mirror.tuna.tsinghua.edu.cn/lxc-images/images/), similar to the version numbers obtained by executing ```pveam available --section system```.
(Please note that the parameters used in the script are only lowercase English system names concatenated with version numbers.)
:::

The default username for all CTs is root.

```shell
./buildct.sh CTID Password Number_of_CPU_Cores Memory Disk SSH_Port Port_80 Port_443 Start_Public_Port End_Public_Port System Storage_Disk Independent_IPV6_address(leave default N blank)
```

### Test Example

```shell
./buildct.sh 102 oneclick123 1 512 5 20001 20002 20003 30000 30025 debian11 local N
```

After setting up, you can execute `cat ct102` to view the information, or check the NOTES section on the web interface.

Here is the information for the created example CT:

Please note that "CT" and other technical terms might have specific meanings in different contexts. If "CT" stands for something specific in your domain, you might want to provide additional context for accurate translation.

| Attribute                  | Value       |
|---------------------------|-------------|
| VMID                      | 102         |
| SSH Username              | root        |
| SSH Password              | oneclick123 |
| Number of CPU Cores       | 1           |
| Memory Size               | 512MB       |
| Disk Size                 | 5G          |
| SSH Port                  | 20001       |
| Port 80                   | 20002       |
| Port 443                  | 20003       |
| Port Range for NAT        | 30000 to 30025|
| Operating System          | debian11    |
| Host Storage Disk         | local       |
| IPV6 address              | N           |

### Deletion Examples

- Stop CT
- Delete CT
- Delete Port Mapping
- Restart Network
- Delete Log Files

```shell
pct stop 102
pct destroy 102
rm -rf ct102
iptables -t nat -F
iptables -t filter -F
service networking restart
systemctl restart networking.service
systemctl restart ndpresponder.service
iptables-save | awk '{if($1=="COMMIT"){delete x}}$1=="-A"?!x[$0]++:1' | iptables-restore
```

## Batch Creation of LXC Containers with NAT

:::warning
Make sure the current Proxmox Virtual Environment (PVE) is clean and the host machine has not undergone any port mapping before the first use, as conflicting settings may result in bugs.
:::

:::tip
Before initiating the creation process, it's recommended to use the 'screen' command to execute the batch creation. This will prevent interruptions due to potential instability in SSH during the extended creation time.
:::

- It is possible to run the batch container creation process multiple times. However, please be mindful of allocating enough memory to the host machine to prevent system crashes. For adding swap space, refer to [this link](https://github.com/spiritLHLS/addswap).
- There is a 60-second interval between creating each container to avoid sudden performance bottlenecks.
- Customization options include selecting the number of CPU cores, memory size, disk size, and the storage drive on the host machine. Ensure that you have calculated available resources appropriately before initiating the process.
- The created containers have SSH enabled by default, allowing root login. Additionally, they are configured to support nested virtualization for Docker usage.
- Relevant information about the containers will be stored in the corresponding container's notes, which can be viewed on the web interface.
- If the host machine has an IPv6 subnet, it will be automatically assigned to the containers. However, public IPv6 addresses will not be provided.
- Optionally enable or disable standalone IPV6, requires the host to have at least one /64 subnet.

Command:

```shell
curl -L https://raw.githubusercontent.com/spiritLHLS/pve/main/scripts/create_ct.sh -o create_ct.sh && chmod +x create_ct.sh && bash create_ct.sh
```

After the setup is complete, you can execute ```cat ctlog``` to view the information, or check in the NOTES section on the web interface.

### Delete All CT

- Delete all CTs
- Delete port mappings for all NATs
- Restart the network
- Delete log files

```shell
pct list | awk 'NR>1{print $1}' | xargs -I {} sh -c 'pct stop {}; pct destroy {}'
rm -rf ct*
iptables -t nat -F
iptables -t filter -F
service networking restart
systemctl restart networking.service
systemctl restart ndpresponder.service
iptables-save | awk '{if($1=="COMMIT"){delete x}}$1=="-A"?!x[$0]++:1' | iptables-restore
```

## Creating Virtual Machines with Pure IPv6 Addresses

The premise is that the host provides an IPv6 subnet rather than a standalone IPv6 address, and the host does not have MAC address filtering enabled.

### Automatic Selection of IPv6 Addresses, No Manual Configuration Needed

- Automatically detect available IPv6 ranges and bind the corresponding V6 address based on the container number to the container.
- Relevant system information will be stored in the NOTES of the corresponding container, accessible for viewing on the web interface.

#### Download script

Command:

```shell
curl -L https://raw.githubusercontent.com/spiritLHLS/pve/main/scripts/buildct_onlyv6.sh -o buildct_onlyv6.sh && chmod +x buildct_onlyv6.sh
```

#### Example Usage

```shell
./buildct_onlyv6.sh CTID Password Number_of_CPU_Cores Memory_Size_in_MB Disk_Size_in_GB Operating_System Storage_Disk
```

```shell
./buildct_onlyv6.sh 152 oneclick123 1 1024 10 debian12 local
```

The above command signifies the creation of a container with a pure IPV6 address.

| Attribute   | Value           |
|------------ |-----------------|
| Container Type | CT            |
| CTID         | 152             |
| Username     | root            |
| Password     | oneclick123     |
| CPU Cores    | 1               |
| Memory       | 1024MB          |
| Disk         | 10G             |
| Operating System | debian12     |
| Storage Disk | Local Disk (System Disk) |

#### Deletion Example

```shell
rm -rf ct*
pct stop 152 
pct destroy 152
systemctl restart ndpresponder.service
```
