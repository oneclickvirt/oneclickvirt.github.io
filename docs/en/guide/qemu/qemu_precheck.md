---
outline: deep
---

# Introduction

The following is an introduction to the non-customized part. The customized part has its own corresponding introduction; please do not mix them up.

Please give the project a ```Star``` for free support --> [https://github.com/oneclickvirt/qemu](https://github.com/oneclickvirt/qemu)

## Project Features

Virtualization based on QEMU/KVM, supporting batch or individual creation of KVM virtual machines without needing Proxmox VE or Incus management platforms

- Pure QEMU/KVM virtualization solution, lightweight with no additional management platform required
- Each virtual machine comes with its own dedicated SSH port and port mapping
- Supports IPv4/IPv6 automatic allocation and port forwarding
- Supports batch creation with automatic logging to a log file
- Supports X86_64 and ARM64 architectures
- Supports domestic CDN mirror acceleration

## Supported Systems (Host)

| System | amd64 | arm64 |
|--------|-------|-------|
| Debian 11 | ✓ | ✓ |
| Debian 12 | ✓ | ✓ |
| Ubuntu 20.04 | ✓ | ✓ |
| Ubuntu 22.04 | ✓ | ✓ |

## Configuration Requirements

- Host must support KVM hardware virtualization (`/dev/kvm` available)
- Kernel version: ≥ 4.15
- Architecture: x86_64 (amd64) or ARM64
- Memory: at least 1GB available (excluding host OS overhead)
- Storage: at least 10GB available disk space
- OS: Debian 11+, Ubuntu 20.04+

:::warning
Before using this project, make sure the host supports KVM virtualization. You can check with the following command:

```bash
egrep -c '(vmx|svm)' /proc/cpuinfo
```

A result greater than 0 indicates KVM virtualization is supported. You can also run `ls /dev/kvm` to confirm the device file exists.
:::

:::tip
If the host does not have an IPv6 subnet but you want to assign IPv6 addresses to virtual machines, the host itself must have a public IPv6 address. The installation script will automatically detect and configure this.
:::

It is recommended to add some SWAP virtual memory before creating virtual machines to avoid sudden memory usage causing the host to crash.
