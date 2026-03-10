---
outline: deep
---

# Introduction

The following is an introduction to the non-customized sections. Please ensure that you don't confuse them with the customized parts.

If your host does not have an IPv6 subnet and you want to assign IPv6 addresses to containers, the host itself needs a public IPv6 address. The installation script will automatically detect and configure this.

:::warning
The Podman solution **does not support KVM/QEMU virtual machines**. It only supports Linux containers (LXC) and is suitable for environments without KVM hardware virtualization support.
:::

Feel free to give the project a ```Star``` for free support! --> [https://github.com/oneclickvirt/podman](https://github.com/oneclickvirt/podman)

## Project Features

Bulk or individual NAT server provisioning based on Podman (daemonless architecture) runtime

- Uses each distribution's official packages to install Podman (no daemon, daemonless architecture)
- Uses self-compiled base images (stored in GitHub Releases), with offline loading prioritized and fallback to ghcr.io images
- Each container comes with 1 external SSH port, 25 consistent internal/external ports, with optional independent IPv6 address binding
- Supports lxcfs mounting (if lxcfs is installed on the host), providing real /proc view inside containers
- Native rootless support (this solution runs as root to simplify network configuration)
- Supports China CDN acceleration

## Supported Systems

| System | amd64 | arm64 |
|--------|-------|-------|
| Ubuntu 22.04 | ✓ | ✓ |
| Debian 12 | ✓ | ✓ |
| Alpine latest | ✓ | ✓ |
| AlmaLinux 9 | ✓ | ✓ |
| RockyLinux 9 | ✓ | ✓ |
| OpenEuler 22.03 | ✓ | ✓ |

## Configuration Requirements

- Host OS: Ubuntu, Debian, RockyLinux 9+, AlmaLinux 9+, CentOS 9+, Alpine, Arch
- Architecture: x86_64 (amd64) or ARM64
- Kernel must support overlay filesystem
- Network must be able to connect to GitHub raw interface
- At least 3GB free disk space
- **No KVM hardware support required**