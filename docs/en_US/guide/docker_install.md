---
outline: deep
---

# Preface

Support for running Docker virtualization on various systems, including Linux, Android, and Windows.

## Environment Setup

- Detect the system environment and install the corresponding components
- Install docker and docker-compose.
- Download some configuration scripts required by default
- Detect if there is an IPV6 address, check if it is greater than or equal to /64, and if so, configure the docker's ipv6 network.
- If all the above conditions are met, create ndpresponder docker and radvd so that IPV6 allocation supports ndp broadcasting and auto-allocation.
- Support for x86_64 and ARM architecture servers

Command:

```shell
curl -L https://raw.githubusercontent.com/spiritLHLS/docker/main/scripts/dockerinstall.sh -o dockerinstall.sh && chmod +x dockerinstall.sh && bash dockerinstall.sh
```

## Setting Up Virtual Memory

:::warning
Allocate some swap space to prevent your machine from crashing.
:::

Unit conversion: Inputting 1024 results in 1G of SWAP - virtual memory. Virtual memory occupies disk space and is automatically utilized when the physical memory is insufficient. However, this leads to high IO usage and CPU performance overhead.

It is recommended to allocate virtual memory twice the size of your physical memory.

Command:

```shell
curl -L https://raw.githubusercontent.com/spiritLHLS/addswap/main/addswap.sh -o addswap.sh && chmod +x addswap.sh && bash addswap.sh
```
