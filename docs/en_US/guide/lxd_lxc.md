---
outline: deep
---

# LXC virtualization

## Generate only one NAT server

- Generate only one NAT server, with customizable restrictions on all content.

Downloading the boot script is **NOT REQUIRED**, if you have used the command to install LXD with one click, the corresponding boot script will be downloaded automatically, so you don't need to download the script again.

Command:

```shell
curl -L https://raw.githubusercontent.com/spiritLHLS/lxd/main/scripts/buildone.sh -o buildone.sh && chmod +x buildone.sh && dos2unix buildone.sh
```

### Usage

```
. /buildone.sh name Cpu_num Memory_size Hard_disk_size SSH_port Extranet_start_port Extranet_stop_port Download_speed Upload_speed Whether_IPV6_is_enabled(Y or N) System(leave blank for debian11)
```

Memory size is calculated in MB, hard disk size is calculated in GB, download speed upload speed is calculated in Mbit, whether to enable IPV6 does not have to fill in Y or N, no this parameter can also be left blank default does not enable IPV6

If ```external start port`` and ```external stop port`` are both set to 0, then we don't do interval port mapping, only the basic SSH port is mapped, note that ```can't be null``, and it needs to be set to 0 if it's not to be mapped.

Support for customizing the system of the server, do not fill out the default use of debian11 when left blank, note that the incoming parameters for the system name + version number, such as:

- debian10, debian11, debian12
- ubuntu18, ubuntu20, ubuntu22
- centos8, centos9 (actually opened out of the Stream version)
- alpine3.15, alpine3.16, alpine3.17, alpine3.18
- openwrt

* Note that they are all lowercase letters + numbers of the combination of their own to try, if the search is not the system will automatically exit the script
* Version number can be with English decimal point, in order to adapt to the alpine version number has been supported.
* Note that some systems may not have cgroups loaded, so testing system resources in the container will show the system resources of the host, which are actually constrained, similar to Docker.

:::tip
The version number has ended the long-term maintenance of the general no longer have an official mirror, temporarily did not find the archive address of the historical mirror, if you find welcome to leave a message I will add support!
:::

#### Example

Here is the information about the example chick that is being raised:

| Attribute                   | Value           |
|-----------------------------|-----------------|
| server's Name              | test            |
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
./buildone.sh test 1 256 2 20001 20002 20025 500 500 N
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

#### Delete Test Chick

```shell
lxc stop test
lxc delete test
rm -rf test
rm -rf test_v6
ls
```

## Normal version batch generation

Opened Chick Configuration:

- 1 core 256MB RAM 1GB hard disk limited to 300Mbit bandwidth
- With 1 SSH port, 25 extranet ports
- Default memory and hard disk size

:::tip
lxc if the command is no problem, the execution of the initialization of the opening of the servers, this step is best to put ```screen`` in the background to suspend the execution of the opening of the servers, the length of time with you to open a few and the mother hen configuration-related
:::

Execute the following command to load the boot script

Command:

```shell
curl -L https://raw.githubusercontent.com/spiritLHLS/lxd/main/scripts/init.sh -o init.sh && chmod +x init.sh && dos2unix init.sh
```

The following command opens **10** chicks with the name prefix **tj**.

```shell
./init.sh tj 10
```

Sometimes there is a problem with the path where init.sh is run, in this case it is recommended to add sudo in front of it to force it to run in the root directory

## Bulk generation of pure SSH port versions

Opened Chick Configuration:

- 1 core 128MB RAM 300MB hard disk limited to 300Mbit bandwidth
- Only one SSH port
- Unable to mount warp

:::tip
lxc if the command is no problem, the execution of the initialization of the opening of the chick, this step is best to put the ```screen`` in the background to hang the execution of the opening of the chick, the length of time you open the chick with the opening of a few and the mother hen configuration-related
:::

Load boot script

Command:

```shell
curl -L https://raw.githubusercontent.com/spiritLHLS/lxd/main/scripts/least.sh -o least.sh && chmod +x least.sh && dos2unix least.sh
```

The last line of the following command opens **10** chicks with the chick name prefix **tj**

```shell
./least.sh tj 10
```

Sometimes there is a problem with the path where last.sh is run, in this case it is recommended to force the root directory to run by adding sudo in front of it.

## Custom Batch Generation of Versions

- Customizable memory and hard disk sizes
- It's also fine if you have manually executed the above batch generation before; the configuration inherits without overwriting

If you need to batch-generate servers multiple times, you can use the following:

Command:

```
curl -L https://github.com/spiritLHLS/lxd/raw/main/scripts/add_more.sh -o add_more.sh && chmod +x add_more.sh && bash add_more.sh
```

Can be run multiple times to batch generate chicks, and inherit the previous part has been generated in the back to add, customizable memory and hard disk size

## View the information of the batch opened chicks

After opening the chicks, the specific information will be generated in the log file in the current directory, with the following format

```shell
Server_1_Name Password SSH_Port Public_Port_Start Public_Port_End
Server_2_Name Password SSH_Port Public_Port_Start Public_Port_End
```

To view it, simply print the log file by executing the following command in the current directory

```shell
cat log
```

:::warning
Don't use the chicks opened by this script as a production environment, LXC virtualization doesn't support changing kernel, dd, turning on bbr, etc.
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

To exit, type ```exit`` and enter.

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
rm -rf /root/buildone.sh
rm -rf /root/add_more.sh
```

Download back the relevant configuration scripts for the new version

```bash
wget https://raw.githubusercontent.com/spiritLHLS/lxd/main/scripts/check-dns.sh -O /usr/local/bin/check-dns.sh && chmod +x /usr/local/bin/check-dns.sh
wget https://raw.githubusercontent.com/spiritLHLS/lxd/main/scripts/config.sh -O /usr/local/bin/config.sh && chmod +x /usr/local/bin/config.sh
wget https://raw.githubusercontent.com/spiritLHLS/lxd/main/scripts/ssh_bash.sh -O /usr/local/bin/ssh_bash.sh && chmod +x /usr/local/bin/ssh_bash.sh
wget https://raw.githubusercontent.com/spiritLHLS/lxd/main/scripts/ssh_sh.sh -O /usr/local/bin/ssh_sh.sh && chmod +x /usr/local/bin/ssh_sh.sh
```

Just download the other one-click scripts yourself.
