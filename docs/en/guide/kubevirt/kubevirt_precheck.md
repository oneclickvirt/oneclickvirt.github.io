---
outline: deep
---

# Introduction

## Project Features

- Installs a single-node K3s Kubernetes cluster, KubeVirt and CDI (Containerized Data Importer).
- KubeVirt runs QEMU/KVM guests; CDI imports cloud images into PVCs.
- New VMs use Kubernetes NodePort Services for stable SSH and additional TCP/UDP mappings. Existing forwarding setups can be migrated with update-port-rules.sh.
- Guest images: Ubuntu 22.04/24.04, Debian 11/12, AlmaLinux 9, RockyLinux 9, CentOS 7, CentOS Stream 8/9 and openSUSE Leap 15.5.
- Current scripts support amd64/x86_64 only. ARM64 images and KubeVirt compatibility are not guaranteed.

## Supported Systems (Host)

Ubuntu 20.04/22.04/24.04 and Debian 11/12. Use a maintained release for new installations. The current scripts support amd64/x86_64 only; other host systems are attempted with a warning and require separate verification.

## Configuration Requirements

- KVM hardware virtualization with an accessible `/dev/kvm` is recommended. When the device is absent after module loading, the installer enables slower QEMU TCG emulation.
- Minimum baseline: 2 CPU cores, 4 GB RAM and 20 GB free disk.
- Run installation as root.
- Internet access is required to download K3s, KubeVirt components and guest images unless the corresponding files have been prepared locally.

## Architecture

```text
Host: K3s + KubeVirt
├── KubeVirt Operator: VM lifecycle
├── CDI: imports cloud images to PVCs
├── virt-launcher Pod: QEMU/KVM guest
└── VM-owned NodePort Services
    ├── host:25000 -> vm1 SSH:22
    └── host:34975-35000 -> vm1 additional TCP/UDP ports
```

Service endpoints follow replacement Pods, keeping mappings stable when VM Pod addresses change.

## Documentation and changes

Continue with [installation](kubevirt_install.md) and [creation](kubevirt_build.md). See the [changelog](https://github.com/oneclickvirt/kubevirt/blob/main/CHANGELOG.md) for updates.
