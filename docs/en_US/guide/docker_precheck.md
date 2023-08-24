# Introduction

The following is an introduction to the non-customized sections. Please ensure that you don't confuse them with the customized parts.

## Project Highlights

Bulk or individual NAT server provisioning via docker

Default use of debian system optional alpine system, each container comes with 1 external ssh port, 25 internal and external network consistent ports

The default creation of unprivileged containers, and does not mount and host docker daemon communication, so ** host created docker virtualization NAT server can not be nested within the virtualization of docker **

Since the CPU and memory limits are only applied to the host and the cgroup driver is not used in the container, using the server test script to detect the available resources of the container will not be effective, and the resources displayed will be those of the host.

Since most cloud servers have ext4 filesystems, even xfs filesystems do not enable the pquota option, so **sharing the host's hard disk by default does not limit the disk size of each container**.

## Configuration Requirements

The system should have Docker installed to be operational. As long as the network can connect to GitHub's raw interface, it can be used. Hardware configuration requirements are minimal, as long as they are adequate; a spare 3GB of hard disk space is sufficient.

It is recommended to increase the available SWAP virtual memory prior to provisioning NAT servers to prevent potential host performance issues due to sudden memory spikes. [Link](https://github.com/spiritLHLS/addswap)

PS: If hardware resources are somewhat limited and more restrictions are necessary, including configuration of individual IPv6 addresses and disk size limitations, consider utilizing LXD to create batch LXC virtualized containers. [Link](https://github.com/spiritLHLS/lxd)

PS: If hardware resources are abundant and ample, consider using Proxmox Virtual Environment (PVE) to provision batch KVM virtualized machines. [Link](https://github.com/spiritLHLS/pve)

Please note that the original formatting has been preserved and enclosed within ``` and ``` for your convenience during copying. No character escaping has been applied.