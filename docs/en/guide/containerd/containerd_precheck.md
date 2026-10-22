---
outline: deep
---

# containerd overview and requirements

This workflow creates Linux containers and does not require KVM. It does not create QEMU virtual machines.

## Overview

- Installs containerd, runc, nerdctl, CNI and buildkitd using [nerdctl-full](https://github.com/containerd/nerdctl).
- Loads the project's base images from GitHub Releases archives by default. A registry fallback is attempted only when `CONTAINERD_IMAGE_REGISTRY` is configured.
- Guest images: Ubuntu 22.04, Debian 12, Alpine, AlmaLinux 9, RockyLinux 9 and OpenEuler 22.03.
- Architectures: amd64 and arm64.
- Creates unprivileged containers by default, with port forwarding, IPv6, resource limits and optional host lxcfs resource views.

## Configuration Requirements

- Host OS: Ubuntu, Debian, RockyLinux 9+, AlmaLinux 9+, CentOS 9+, Alpine, Arch
- Architecture: x86_64 (amd64) or ARM64
- Kernel must support overlay filesystem
- Network must reach GitHub Raw, Releases and the registries used by this solution
- At least 3GB free disk space
- **No KVM hardware support required**

## Documentation and changes

Continue with [installation](containerd_install.md) and [creation](containerd_build.md). See the [changelog](https://github.com/oneclickvirt/containerd/blob/main/CHANGELOG.md) for updates.
