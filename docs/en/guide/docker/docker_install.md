---
outline: deep
---

# Preface

Support for running Docker virtualization on various systems, including Linux, Android, and Windows.

If your host does not have an IPV6 subnet and you want to assign IPV6 addresses to containers, then please check the ``Customize`` partition in the ``LXD`` module for the ``Attach a free IPV6 address segment`` to the host, and attach an IPV6 subnet to the host before installing the environment.

## Setting Up Virtual Memory

:::tip
Allocate some swap space to prevent your machine from crashing.
:::

Unit conversion: Inputting 1024 results in 1G of SWAP - virtual memory. Virtual memory occupies disk space and is automatically utilized when the physical memory is insufficient. However, this leads to high IO usage and CPU performance overhead.

It is recommended to allocate virtual memory twice the size of your physical memory.

Command:

```shell
curl -L https://raw.githubusercontent.com/spiritLHLS/addswap/main/addswap.sh -o addswap.sh && chmod +x addswap.sh && bash addswap.sh
```

## Environment Setup

- Detect the system environment and install the corresponding components
- Install docker and docker-compose.
- Download some configuration scripts required by default
- Detect if there is an IPV6 address, check if it is greater than or equal to /112, and if so, configure the docker's ipv6 network.
- If all the above conditions are met, create ndpresponder docker and radvd so that IPV6 allocation supports ndp broadcasting and auto-allocation.
- Support for x86_64 and ARM architecture servers
- The installation process will ask you to enter some options, select the Docker installation path, select whether the Docker installation can limit the hard disk

Command:

```shell
curl -L https://raw.githubusercontent.com/oneclickvirt/docker/main/scripts/dockerinstall.sh -o dockerinstall.sh && chmod +x dockerinstall.sh && bash dockerinstall.sh
```

OR

```
bash dockerinstall.sh
```

:::tip
The environment installation process may require you to reboot the server and then execute the script again, see the instructions after the script is run for more details
:::

## Detect whether Docker supports limiting container hard disk size

```shell
curl -L https://raw.githubusercontent.com/oneclickvirt/docker/refs/heads/main/extra_scripts/disk_test.sh -o disk_test.sh && chmod +x disk_test.sh && bash disk_test.sh
```

Or specify a different storage limit size (in MB), the default test of the 500MB limit of the container whether the limit is successful

```shell
# 1GB Limit
bash disk_test.sh 1000
```