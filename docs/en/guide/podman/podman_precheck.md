---
outline: deep
---

# Podman overview and requirements

This workflow creates Linux containers and does not require KVM. It does not create QEMU virtual machines.

## Overview

- Installs Podman from the distribution's official packages. Podman uses a daemonless architecture.
- Uses the project's base images, pulling from GHCR first and falling back to GitHub Releases archives.
- Guest images: Ubuntu 22.04, Debian 12, Alpine, AlmaLinux 9, RockyLinux 9 and OpenEuler 22.03.
- Architectures: amd64 and arm64.
- Supports port forwarding, IPv6 and resource limits, with container resource views when lxcfs is installed on the host.

## Architecture

```text
podmaninstall.sh -> Podman and dependencies -> storage, network and kernel settings
                                            -> podman-net / podman-ipv6
create_podman.sh -> onepodman.sh -> GHCR image or Releases archive
                               -> container entrypoint and SSH initialization -> ctlog
podmanuninstall.sh -> containers, images, networks and project state cleanup
```

## Runtime comparison

| Feature | Podman project | oneclickvirt/containerd | oneclickvirt/docker |
| --- | --- | --- | --- |
| Daemon | none | containerd | Docker daemon |
| Runtime | crun/runc | runc | runc |
| Rootless support | native | unsupported | requires configuration |
| Image format | OCI | OCI | OCI |
| Networking | Netavark/CNI | CNI | Docker bridge |
| Build tools | Buildah/podman-build | buildkitd | Docker buildx |
| Installation | distribution packages | nerdctl-full bundle | Docker installation script |

## Configuration Requirements

- Host OS: Ubuntu, Debian, RockyLinux 9+, AlmaLinux 9+, CentOS 9+, Alpine, Arch
- Architecture: x86_64 (amd64) or ARM64
- Kernel must support overlay filesystem
- Network must reach GitHub Raw, Releases and the registries used by this solution
- At least 3GB free disk space
- **No KVM hardware support required**

## Documentation and changes

Continue with [installation](podman_install.md) and [creation](podman_build.md). See the [changelog](https://github.com/oneclickvirt/podman/blob/main/CHANGELOG.md) for updates.
