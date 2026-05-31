# Introduction

This page introduces the standard (non-customized) workflow.

If your host has no IPv6 subnet but you want to assign IPv6 addresses to containers, check the ``Customize`` section in the ``Docker`` module for ``Attach a free IPv6 address segment to the host``, then attach an IPv6 subnet before installation.

:::warning
If the host has IPv6 networking, installation may change host network structure. Ensure the host can be recovered/reinstalled at any time, and do not run on machines with critical data.
:::

Feel free to give the project a ```Star``` for free support!-->[https://github.com/oneclickvirt/docker](https://github.com/oneclickvirt/docker)


## Project Features

Bulk or individual NAT server provisioning via Docker.

Uses Debian by default (Alpine optional). Each container includes 1 external SSH port plus 25 matched internal/external ports, with optional IPv6 binding.

Containers are created as unprivileged by default, and Docker daemon sockets are not mounted from the host. Therefore, **Docker-in-Docker nested virtualization is not supported inside these NAT containers**.

By default, lxcfs is installed and enabled, so that when querying resources within a container, CPU and memory use the configured view instead of the host's view.

By default, the installer lets you choose whether to share host disk space and whether to enable container disk-size limits.

## Configuration requirements

Any system that can install Docker can use this solution. The host should be able to access GitHub raw content, and at least 3 GB of free disk space is recommended.

(If you need IPv6 binding, install Docker through this project's installer so the required network presets are applied automatically.)

If your hardware is moderate and you need stricter resource controls (especially disk limits), use the Incus module to create LXC containers in batch.

If your hardware has strong capacity and you need larger-scale VM workloads, use the PVE module to create KVM VMs in batch.