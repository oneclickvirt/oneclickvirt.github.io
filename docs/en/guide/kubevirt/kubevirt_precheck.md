---
outline: deep
---

# Introduction

The following is an introduction to the non-customized part. The customized part has its own corresponding introduction; please do not mix them up.

Please give the project a ```Star``` for free support --> [https://github.com/oneclickvirt/kubevirt](https://github.com/oneclickvirt/kubevirt)

## Project Features

One-click deployment and management of KVM virtual machines based on KubeVirt on a Kubernetes (k3s) cluster, supporting batch or individual VM creation

- One-click deployment of the complete k3s + KubeVirt environment
- Manages virtual machines in a Kubernetes environment via KubeVirt CRDs
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

- Host nodes must support KVM hardware virtualization (`/dev/kvm` available)
- Kernel version: ≥ 4.15
- Architecture: x86_64 (amd64) or ARM64
- Memory: at least 4GB available (including k3s + KubeVirt overhead)
- Storage: at least 20GB available disk space
- OS: Debian 11+, Ubuntu 20.04+

:::warning
Before using this project, make sure the host supports KVM virtualization. You can check with the following command:

```bash
egrep -c '(vmx|svm)' /proc/cpuinfo
```

A result greater than 0 indicates KVM virtualization is supported. You can also run `ls /dev/kvm` to confirm the device file exists.
:::

:::tip
This project will automatically deploy k3s. There is no need to prepare a Kubernetes cluster in advance.
:::

It is recommended to add some SWAP virtual memory before creating virtual machines to avoid sudden memory usage causing the host to crash.

International

```shell
curl -L https://raw.githubusercontent.com/spiritLHLS/addswap/main/addswap.sh -o addswap.sh && chmod +x addswap.sh && bash addswap.sh
```

China

```shell
curl -L https://cdn.spiritlhl.net/https://raw.githubusercontent.com/spiritLHLS/addswap/main/addswap.sh -o addswap.sh && chmod +x addswap.sh && bash addswap.sh
```
