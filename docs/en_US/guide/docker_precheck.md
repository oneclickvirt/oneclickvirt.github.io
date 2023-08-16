# Introduction

The following is an introduction to the non-customized sections. Please ensure that you don't confuse them with the customized parts.

## Project Highlights

This project involves bulk or individual provisioning of NAT servers using Docker containers.

The default operating system used is Debian. Each container comes with one external SSH port and 25 consistent internal and external ports.

The containers created by default are non-privileged and do not establish communication between the Docker daemon on the host and the containers. As a result, **containers nested within Docker virtualized NAT servers on the host will not function**.

Due to CPU and memory limitations set on the host without utilizing cgroup drivers within containers, any server testing scripts run inside containers to assess available resources will be ineffective. The displayed resources will reflect those of the host.

Since the majority of cloud servers do not enable the 'pquota' option for the XFS file system, the **default configuration involves sharing the host's hard drive, thus preventing the restriction of individual container disk sizes**.

## Configuration Requirements

The system should have Docker installed to be operational. As long as the network can connect to GitHub's raw interface, it can be used. Hardware configuration requirements are minimal, as long as they are adequate; a spare 3GB of hard disk space is sufficient.

It is recommended to increase the available SWAP virtual memory prior to provisioning NAT servers to prevent potential host performance issues due to sudden memory spikes. [Link](https://github.com/spiritLHLS/addswap)

PS: If hardware resources are somewhat limited and more restrictions are necessary, including configuration of individual IPv6 addresses and disk size limitations, consider utilizing LXD to create batch LXC virtualized containers. [Link](https://github.com/spiritLHLS/lxd)

PS: If hardware resources are abundant and ample, consider using Proxmox Virtual Environment (PVE) to provision batch KVM virtualized machines. [Link](https://github.com/spiritLHLS/pve)

Please note that the original formatting has been preserved and enclosed within ``` and ``` for your convenience during copying. No character escaping has been applied.