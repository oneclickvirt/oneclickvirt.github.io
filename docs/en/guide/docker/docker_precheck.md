# Introduction

The following is an introduction to the non-customized sections. Please ensure that you don't confuse them with the customized parts.

If your host does not have an IPv6 subnet and you want to assign IPv6 addresses to containers, then please check the ``Customize`` partition in the ``incus`` module for the ``Attach a free IPv6 address segment`` to the host, and attach an IPv6 subnet to the host before installing the environment.

:::warning
If the host has an IPv6 network, the installation will change the network structure of the host, please make sure that the host can reset the system at any time and that there is no important data on the host before running.
:::

Feel free to give the project a ```Star``` for free support!-->[https://github.com/oneclickvirt/docker](https://github.com/oneclickvirt/docker)


## Project Features

Bulk or individual NAT server provisioning via Docker.

Uses Debian by default (Alpine optional). Each container includes 1 external SSH port plus 25 matched internal/external ports, with optional IPv6 binding.

Containers are created as unprivileged by default, and Docker daemon sockets are not mounted from the host. Therefore, **Docker-in-Docker nested virtualization is not supported inside these NAT containers**.

By default, lxcfs is installed and enabled, so that when querying resources within a container, CPU and memory use the configured view instead of the host's view.

By default, you can choose whether or not to share the hard disk of the host machine, and you can choose whether or not to install it as an environment that can limit the size of the hard disk during Docker installation.

## Configuration requirements

Any system that can install Docker can use this solution. The host should be able to access GitHub raw content, and at least 3 GB of free disk space is recommended.

(If you need IPv6 binding, install Docker through this project's installer so the required network presets are applied automatically.)

If your hardware is moderate and you need stricter resource controls (especially disk limits), use the Incus module to create LXC containers in batch.

If your hardware has strong capacity and you need larger-scale VM workloads, use the PVE module to create KVM VMs in batch.