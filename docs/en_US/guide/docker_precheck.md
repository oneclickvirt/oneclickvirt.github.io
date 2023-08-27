# Introduction

The following is an introduction to the non-customized sections. Please ensure that you don't confuse them with the customized parts.

:::warning
If the host has an IPV6 network, the installation will change the network structure of the host, please make sure that the host can reset the system at any time and that there is no important data on the host before running.
:::

## Project Features

Bulk or individual NAT server provisioning via docker

Default use of debian system optional alpine system, each container comes with 1 external ssh port, 25 internal and external network ports, you can choose whether to bind IPV6 address

The default creation of unprivileged containers, and does not mount and host docker daemon communication, so ** host created docker virtualization NAT servers can not be nested within the virtualization docker **

Since the CPU and memory limits are only applied to the host and the cgroup driver is not used in the container, using the server test script to detect the available resources of the container will not be effective, and the resources displayed will be those of the host.

Since most cloud servers have ext4 filesystems, even xfs filesystems do not enable the pquota option, so **sharing the host's hard disk by default does not limit the disk size of each container**.

## Configuration requirements

The system can be installed docker can be used, the network can connect to the Github raw interface can be used, hardware configuration as long as not pull across the line, free hard disk has 3G on it!

(If you need to bind an IPV6 address, then please make sure to use the installation script of this set of scripts for docker installation, you need it to automatically preset some of the settings)

If the hardware resources are just a little bit better, need to limit more things and need to limit the size of the hard disk, you can use the LXD partition of the script batch open LXC virtualization containers

If the hardware is very good and you have a lot of resources, you can use the PVE partition script to batch open KVM virtualized VMs.