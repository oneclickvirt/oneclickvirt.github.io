---
outline: deep
---

# LXC virtualization

## Generate only one NAT container

- Generate only one NAT container, with customizable restrictions on all content.

Downloading the boot script is **NOT REQUIRED**, if you have used the command to install LXD with one click, the corresponding boot script will be downloaded automatically, so you don't need to download the script again.

Command:

```shell
curl -L https://raw.githubusercontent.com/oneclickvirt/lxd/main/scripts/buildct.sh -o buildct.sh && chmod +x buildct.sh && dos2unix buildct.sh
```

### Usage

```
. /buildct.sh name Cpu_num Memory_size Hard_disk_size SSH_port Extranet_start_port Extranet_stop_port Download_speed Upload_speed Whether_IPV6_is_enabled(Y or N) System(leave blank for debian12)
```

Memory is in MB, disk size in GB, and download/upload speeds in Mbit. For IPv6, you can provide `Y` or `N`, or leave it empty (default: disabled).

If both ```external start port``` and ```external stop port``` are set to `0`, no port-range mapping is created and only SSH is mapped. These fields cannot be empty.

Custom container systems are supported. If left empty, `debian12` is used by default. Use the format `system + version`, for example:

- debian12, debian13
- ubuntu22, ubuntu24
- centos8, centos9
- alpine3.16, alpine3.17, alpine3.18, alpine3.19

* Note that **the combination of lowercase letters + numbers** or **only lowercase letters**, try it yourself, if the search is not the system will automatically exit the script
* The version number can be with English decimal point, in order to adapt to the alpine version number has been supported.
* If you can't open it, it may be that the hard disk is not big enough or it doesn't fit the host, try it by yourself.
* The images currently in use are triple filtered and prioritized: [self-hosted](https://github.com/oneclickvirt/lxd_images), [official-hosted](https://images.lxd.canonical.com/), [opsmaru](https://images.opsmaru.com/)
* A complete list of supported systems for self-compiling images: [x86_64_all_images.txt](https://github.com/oneclickvirt/lxd_images/blob/main/x86_64_all_images.txt) and [arm64_all_images.txt](https://github.com/oneclickvirt/lxd_images/blob/main/arm64_all_images.txt)


### Example

Example container configuration:

| Attribute                   | Value           |
|-----------------------------|-----------------|
| Container Name               | test            |
| Username for SSH Login      | root            |
| Password for SSH Login      | Randomly generated |
| Number of CPU Cores         | 1               |
| Memory Size                 | 256MB           |
| Disk Size                   | 2G              |
| Range of Internal and External Port Mapping | 20002 to 20025 |
| Upload Bandwidth            | 500Mbit         |
| Download Bandwidth          | 500Mbit         |
| Automatically Set External IPv6 Address | No   |
| Operating System            | Debian 12       |

```
./buildct.sh test 1 256 2 20001 20002 20025 500 500 N debian13
```

If you need to see the information, run

```shell
cat ct_name_change_me
```

For example, the information for the query example is

```shell
cat test
```

If you already created a test container and want to do batch generation, delete the test container first.

### Delete Test Container

```shell
lxc stop test
lxc delete test
rm -rf test
rm -rf test_v6
ls
```

## Normal version batch generation

Batch Profile:

- 1 core 256MB RAM 1GB hard disk limited to 300Mbit bandwidth
- With 1 SSH port, 24 extranet ports
- Default memory and hard disk size

:::tip
If `lxc` commands run normally, proceed with initialization. It is recommended to run this in a `screen` session because runtime depends on host resources and the number of containers.
:::

Execute the following command to load the boot script

Command:

```shell
curl -L https://raw.githubusercontent.com/oneclickvirt/lxd/main/scripts/init.sh -o init.sh && chmod +x init.sh && dos2unix init.sh
```

The following command opens **10** containers with prefix **tj**.

```shell
./init.sh tj 10
```

If path issues occur when running `init.sh`, prepend `sudo` and run it from the root directory.

## Bulk generation of pure SSH port versions

Batch Profile:

- 1 core 128MB RAM 1GB hard disk limited to 300Mbit bandwidth
- Only one SSH port
- Unable to mount warp

:::tip
If `lxc` commands run normally, proceed with initialization. Use a `screen` session to avoid interruption; runtime depends on host resources and container count.
:::

Load boot script

Command:

```shell
curl -L https://raw.githubusercontent.com/oneclickvirt/lxd/main/scripts/least.sh -o least.sh && chmod +x least.sh && dos2unix least.sh
```

The last command below opens **10** containers with prefix **tj**.

```shell
./least.sh tj 10
```

If path issues occur when running `least.sh`, prepend `sudo` and run it from the root directory.

## Custom Batch Generation of Versions

- Customizable memory and hard disk sizes
- It's also fine if you have manually executed the above batch generation before; the configuration inherits without overwriting

If you need to batch-generate containers multiple times, you can use the following:

Command:

```
curl -L https://github.com/oneclickvirt/lxd/raw/main/scripts/add_more.sh -o add_more.sh && chmod +x add_more.sh && bash add_more.sh
```

This script can be run multiple times. It appends new containers while inheriting previous configuration, with customizable memory and disk size.

## View Batch Container Information

After creation, container information is written to a log file in the current directory in this format:

```shell
container_1_Name Password SSH_Port Public_Port_Start Public_Port_End
container_2_Name Password SSH_Port Public_Port_Start Public_Port_End
```

To view it, print the log file from the current directory:

```shell
cat log
```

:::warning
Do not use containers created by this script as production environments. LXC virtualization does not support kernel replacement, DD reinstall flows, BBR toggling, and similar host-level changes.
:::

## Some common LXD commands

View all containers:

```bash
lxc list
```

View details of a specific container:

```bash
lxc info container_name
```

Start a specific container:

```bash
lxc start container_name
```

Stop a specific container:

```bash
lxc stop container_name
```

Delete a specific container:

```bash
lxc delete -f container_name
```

Enter the container's shell:

```bash
lxc exec container_name /bin/bash
```

:::tip
Instead of /bin/bash, you can use /bin/sh in alpine, which is /bin/bash on regular systems.
:::

To exit, type ```exit``` and press Enter.

Delete all LXC containers

```bash
lxc list -c n --format csv | xargs -I {} lxc delete -f {}
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
curl -sSL https://raw.githubusercontent.com/oneclickvirt/lxd/main/scripts/check-dns.sh -o /usr/local/bin/check-dns.sh && chmod +x /usr/local/bin/check-dns.sh
curl -sSL https://raw.githubusercontent.com/oneclickvirt/lxd/main/scripts/config.sh -o /usr/local/bin/config.sh && chmod +x /usr/local/bin/config.sh
curl -sSL https://raw.githubusercontent.com/oneclickvirt/lxd/main/scripts/ssh_bash.sh -o /usr/local/bin/ssh_bash.sh && chmod +x /usr/local/bin/ssh_bash.sh
curl -sSL https://raw.githubusercontent.com/oneclickvirt/lxd/main/scripts/ssh_sh.sh -o /usr/local/bin/ssh_sh.sh && chmod +x /usr/local/bin/ssh_sh.sh
curl -sSL https://raw.githubusercontent.com/oneclickvirt/lxd/main/scripts/build_ipv6_network.sh -o /root/build_ipv6_network.sh && chmod +x /root/build_ipv6_network.sh
curl -sSL https://raw.githubusercontent.com/oneclickvirt/lxd/main/scripts/buildct.sh -o /root/buildct.sh && chmod +x /root/buildct.sh
```

Just download the other one-click scripts yourself.
