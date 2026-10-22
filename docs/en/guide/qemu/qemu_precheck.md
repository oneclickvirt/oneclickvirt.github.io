---
outline: deep
---

# Introduction

## Project Features

- Installs [QEMU/KVM](https://www.qemu.org/) and [libvirt](https://libvirt.org/).
- Uses qcow2 cloud images and initializes guests with cloud-init. Image selection tries the organization's image repositories before the upstream distribution.
- Guests: Debian 10/11/12/13, Ubuntu 18/20/22/24, AlmaLinux 8/9, RockyLinux 8/9 and OpenEuler 22.
- Architectures: amd64 and arm64.
- Uses libvirt NAT (`virbr0`) with nftables or iptables forwarding; new default networks include ULA IPv6 NAT.
- VM connection records are saved in `/root/vmlog`.

## Supported Systems (Host)

Debian and Ubuntu are recommended. The installer also includes branches for CentOS, AlmaLinux, RockyLinux, Oracle Linux, Amazon Linux, Fedora, Arch and Alpine; the required packages must be available for the host system. VM creation supports amd64 and arm64.

## Configuration Requirements

| Resource | Requirement |
| --- | --- |
| CPU | VT-x/AMD-V or nested virtualization is recommended for KVM acceleration; without KVM, QEMU may use slower emulation |
| Available memory | Guest memory plus at least 512 MB for the host |
| Available disk | Guest disk size multiplied by VM count, plus cached images |

## Check KVM

On x86 hosts, inspect CPU virtualization flags and the device. ARM64 hosts should check the KVM device directly. Without KVM, QEMU emulation is slower.

```bash
egrep -c '(vmx|svm)' /proc/cpuinfo
ls -l /dev/kvm
```

## Documentation and changes

Continue with [installation](qemu_install.md) and [creation](qemu_build.md). See the [changelog](https://github.com/oneclickvirt/qemu/blob/main/CHANGELOG.md) for updates.
