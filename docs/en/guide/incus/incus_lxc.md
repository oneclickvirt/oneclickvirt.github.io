---
outline: deep
---

# Running LXC Container in Incus

## Images available for creating LXC Containers

A portion of the available system parameters are shown here for your reference:

- debian10, debian11, debian12, debian13
- ubuntu18, ubuntu20, ubuntu22
- centos8, centos9 (actually opened out of the Stream version)
- alpine3.15, alpine3.16, alpine3.17, alpine3.18
- openwrt21，openwrt22，fedora37，fedora38，fedora39
- rockylinux8，rockylinux9，oralce8，oracle9
- oralce7，centos7 (CGroupV1 needs to be enabled in GRUB or it won't start.)
- kali，archlinux

* Note that **the combination of lowercase letters + numbers** or **only lowercase letters**, try it yourself, if the search is not the system will automatically exit the script
* The version number can be with English decimal point, in order to adapt to the alpine version number has been supported.
* If you can't open it, it may be that the hard disk is not big enough or it doesn't fit the host, try it by yourself.
* The images currently in use are triple filtered and prioritized: [self-hosted](https://github.com/oneclickvirt/incus_images)、[official-hosted](https://images.linuxcontainers.org/)、[opsmaru](https://images.opsmaru.com/)
* A complete list of supported systems for self-compiling images: [x86_64_all_images.txt](https://github.com/oneclickvirt/incus_images/blob/main/x86_64_all_images.txt) and [arm64_all_images.txt](https://github.com/oneclickvirt/incus_images/blob/main/arm64_all_images.txt)

:::tip
The version number has ended the long-term maintenance of the general no longer have an official mirror, temporarily did not find the archive address of the historical mirror, if you find welcome to leave a message I will add support!
:::

## Generate only one NAT container

- Generate only one NAT container, with customizable restrictions on all content.

### Download script

Downloading the boot script is **NOT REQUIRED**, if you have used the command to install incus with one click, the corresponding boot script will be downloaded automatically, so you don't need to download the script again.

Command:

```shell
curl -L https://raw.githubusercontent.com/oneclickvirt/incus/main/scripts/buildct.sh -o buildct.sh && chmod +x buildct.sh && dos2unix buildct.sh
```

### Usage

```
. /buildct.sh name Cpu_num Memory_size Hard_disk_size SSH_port Extranet_start_port Extranet_stop_port Download_speed Upload_speed Whether_IPV6_is_enabled(Y or N) System(leave blank for debian11)
```

Memory size is calculated in MB, hard disk size is calculated in GB, download speed upload speed is calculated in Mbit, whether to enable IPV6 does not have to fill in Y or N, no this parameter can also be left blank default does not enable IPV6

If ```external start port`` and ```external stop port`` are both set to 0, then we don't do interval port mapping, only the basic SSH port is mapped, note that ```can't be null``, and it needs to be set to 0 if it's not to be mapped.

Support custom container system, do not fill in the leave blank default use debian11, pay attention to the incoming parameters for the system name + version number

### Example

Here is the information about the example chick that is being raised:

| Attribute                   | Value           |
|-----------------------------|-----------------|
| container's Name              | test            |
| Username for SSH Login      | root            |
| Password for SSH Login      | Randomly generated |
| Number of CPU Cores         | 1               |
| Memory Size                 | 256MB           |
| Disk Size                   | 2G              |
| Range of Internal and External Port Mapping | 20002 to 20025 |
| Upload Bandwidth            | 500Mbit         |
| Download Bandwidth          | 500Mbit         |
| Automatically Set External IPv6 Address | No   |
| Operating System            | Debian 11       |

```
./buildct.sh test 1 256 2 20001 20002 20025 500 500 N debian11
```

If you need to see the information, run

```shell
cat ct_name_change_me
```

For example, the information for the query example is

```shell
cat test
```

If you have already generated chicks through the above methods and still need to batch generate chicks, you can use a customized batch generation version of the script, but note that you should first delete the test chicks before batch generating chicks

### Delete Test Chick

```shell
incus stop test
incus delete test
rm -rf test
rm -rf test_v6
ls
```

## Normal version batch generation

Opened Chick Configuration:

- 1 core 256MB RAM 1GB hard disk limited to 300Mbit bandwidth
- With 1 SSH port, 24 extranet ports
- Default memory and hard disk size

:::tip
incus if the command is no problem, the execution of the initialization of the opening of the containers, this step is best to put ```screen`` in the background to suspend the execution of the opening of the containers, the length of time with you to open a few and the mother hen configuration-related
:::

Execute the following command to load the boot script

Command:

```shell
curl -L https://raw.githubusercontent.com/oneclickvirt/incus/main/scripts/init.sh -o init.sh && chmod +x init.sh && dos2unix init.sh
```

The following command opens **10** chicks with the name prefix **tj**.

```shell
./init.sh tj 10
```

Sometimes there is a problem with the path where init.sh is run, in this case it is recommended to add sudo in front of it to force it to run in the root directory

## Bulk generation of pure SSH port versions

Opened Chick Configuration:

- 1 core 128MB RAM 1GB hard disk limited to 300Mbit bandwidth
- Only one SSH port
- Unable to mount warp

:::tip
incus if the command is no problem, the execution of the initialization of the opening of the chick, this step is best to put the ```screen`` in the background to hang the execution of the opening of the chick, the length of time you open the chick with the opening of a few and the mother hen configuration-related
:::

Load boot script

Command:

```shell
curl -L https://raw.githubusercontent.com/oneclickvirt/incus/main/scripts/least.sh -o least.sh && chmod +x least.sh && dos2unix least.sh
```

The last line of the following command opens **10** chicks with the chick name prefix **tj**

```shell
./least.sh tj 10
```

Sometimes there is a problem with the path where last.sh is run, in this case it is recommended to force the root directory to run by adding sudo in front of it.

## Custom Batch Generation of Versions

- Customizable memory and hard disk sizes
- It's also fine if you have manually executed the above batch generation before; the configuration inherits without overwriting

If you need to batch-generate containers multiple times, you can use the following:

Command:

```
curl -L https://github.com/oneclickvirt/incus/raw/main/scripts/add_more.sh -o add_more.sh && chmod +x add_more.sh && bash add_more.sh
```

Can be run multiple times to batch generate chicks, and inherit the previous part has been generated in the back to add, customizable memory and hard disk size

## View the information of the batch opened chicks

After opening the chicks, the specific information will be generated in the log file in the current directory, with the following format

```shell
container_1_Name Password SSH_Port Public_Port_Start Public_Port_End
container_2_Name Password SSH_Port Public_Port_Start Public_Port_End
```

To view it, simply print the log file by executing the following command in the current directory

```shell
cat log
```

:::warning
Don't use the chicks opened by this script as a production environment, incus virtualization doesn't support changing kernel, dd, turning on bbr, etc.
:::

## Some common incus commands

View all containers:

```bash
incus list
```

View details of a specific container:

```bash
incus info container_name
```

Start a specific container:

```bash
incus start container_name
```

Stop a specific container:

```bash
incus stop container_name
```

Delete a specific container:

```bash
incus delete -f container_name
```

Enter the container's shell:

```bash
incus exec container_name /bin/bash
```

:::tip
Instead of /bin/bash, you can use /bin/sh in alpine, which is /bin/bash on regular systems.
:::

To exit, type ```exit`` and enter.

Delete all incus containers

```bash
incus list -c n --format csv | xargs -I {} incus delete -f {}
```

Perform deletion of useless logs within a container

```bash
sudo apt-get autoremove
sudo apt-get clean
sudo find /var/log -type f -delete
sudo find /var/tmp -type f -delete
sudo find /tmp -type f -delete
sudo find /var/cache/apt/archives -type f -delete
```

## Update all commands related to the above one-click scripts

Delete the original configuration script

```bash
rm -rf /usr/local/bin/ssh_sh.sh
rm -rf /usr/local/bin/config.sh
rm -rf /usr/local/bin/ssh_bash.sh
rm -rf /usr/local/bin/check-dns.sh
rm -rf /root/ssh_sh.sh
rm -rf /root/config.sh
rm -rf /root/ssh_bash.sh
rm -rf /root/buildct.sh
rm -rf /root/add_more.sh
rm -rf /root/build_ipv6_network.sh
```

Download back the relevant configuration scripts for the new version

```bash
wget https://raw.githubusercontent.com/oneclickvirt/incus/main/scripts/check-dns.sh -O /usr/local/bin/check-dns.sh && chmod +x /usr/local/bin/check-dns.sh
wget https://raw.githubusercontent.com/oneclickvirt/incus/main/scripts/config.sh -O /usr/local/bin/config.sh && chmod +x /usr/local/bin/config.sh
wget https://raw.githubusercontent.com/oneclickvirt/incus/main/scripts/ssh_bash.sh -O /usr/local/bin/ssh_bash.sh && chmod +x /usr/local/bin/ssh_bash.sh
wget https://raw.githubusercontent.com/oneclickvirt/incus/main/scripts/ssh_sh.sh -O /usr/local/bin/ssh_sh.sh && chmod +x /usr/local/bin/ssh_sh.sh
wget https://raw.githubusercontent.com/oneclickvirt/incus/main/scripts/build_ipv6_network.sh -O /root/build_ipv6_network.sh && chmod +x /root/build_ipv6_network.sh
wget https://raw.githubusercontent.com/oneclickvirt/incus/main/scripts/buildct.sh -O /root/buildct.sh && chmod +x /root/buildct.sh
```

Just download the other one-click scripts yourself.
