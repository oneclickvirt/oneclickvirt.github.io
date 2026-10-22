---
outline: deep
---

# Install and uninstall QEMU/KVM

The shared unattended switch and interactive workflow are described in [environment modes](../oneclickvirt/environment_modes.md).

## Add Swap Memory

:::tip
Adding some swap prevents the host from running out of memory.
:::

Unit conversion: entering 1024 creates 1GB of SWAP virtual memory. Virtual memory uses disk space. When actual memory runs out, virtual memory is used automatically, but this brings high I/O and CPU usage.

It is recommended to create swap no larger than twice the actual memory size.

```shell
curl -L https://raw.githubusercontent.com/spiritLHLS/addswap/main/addswap.sh -o addswap.sh && chmod +x addswap.sh && bash addswap.sh
```

## Unattended operation

All scripts accept:

```bash
export noninteractive=true
```

Installation and batch creation use defaults or supplied arguments without waiting for input. Deletion and uninstallation treat this variable as explicit confirmation. Existing per-script variables such as VM_COUNT, QEMU_FORCE_DELETE and QEMU_FORCE_UNINSTALL remain supported.

## Install QEMU/KVM

```bash
bash <(curl -sSL https://raw.githubusercontent.com/oneclickvirt/qemu/main/qemuinstall.sh)
```

Unattended installation with a custom image directory:

```bash
export noninteractive=true
export QEMU_IMAGES_PATH=/data/vm-images
bash <(curl -sSL https://raw.githubusercontent.com/oneclickvirt/qemu/main/qemuinstall.sh)
```

The default image directory is `/var/lib/libvirt/images`.

## Environment variables

| Script | Variable | Description | Example |
| --- | --- | --- | --- |
| All | `noninteractive` | Shared unattended switch | `true` |
| `qemuinstall.sh` | `QEMU_IMAGES_PATH` | Image storage directory | `/data/images` |
| `qemuuninstall.sh` | `QEMU_FORCE_UNINSTALL` | Skip uninstall confirmation | `yes` |
| `oneqemu.sh` | `VM_NAME` | VM name | `vm1` |
| `oneqemu.sh` | `VM_CPU` | CPU cores | `1` |
| `oneqemu.sh` | `VM_MEMORY` | Memory in MB | `1024` |
| `oneqemu.sh` | `VM_DISK` | Disk size in GB | `20` |
| `oneqemu.sh` | `VM_PASSWORD` | Root password; empty generates one | `ChangeMe-123` |
| `oneqemu.sh` | `VM_SSH_PORT` | SSH host port | `25001` |
| `oneqemu.sh` | `VM_START_PORT` | First additional port | `35001` |
| `oneqemu.sh` | `VM_END_PORT` | Last additional port | `35025` |
| `oneqemu.sh` | `VM_SYSTEM` | Guest OS | `debian12` |
| `create_qemu.sh` | `VM_COUNT` | Number of VMs | `3` |
| `create_qemu.sh` | `VM_MEMORY` | Memory per VM in MB | `1024` |
| `create_qemu.sh` | `VM_CPU` | CPU cores per VM | `1` |
| `create_qemu.sh` | `VM_DISK` | Disk size per VM in GB | `20` |
| `create_qemu.sh` | `VM_SYSTEM` | Guest OS | `debian12` |
| `delete_qemu.sh` | `VM_NAME` | VM to delete | `vm1` |
| `delete_qemu.sh` | `QEMU_FORCE_DELETE` | Skip deletion confirmation | `yes` |

## Uninstall

Remove all VMs, images, network settings, systemd services and QEMU/KVM packages:

```bash
bash <(curl -sSL https://raw.githubusercontent.com/oneclickvirt/qemu/main/qemuuninstall.sh)
```

The script asks for `yes`; removal is irreversible. To skip confirmation:

```bash
export noninteractive=true
export QEMU_FORCE_UNINSTALL=yes
bash <(curl -sSL https://raw.githubusercontent.com/oneclickvirt/qemu/main/qemuuninstall.sh)
```

Alternatively, after downloading the script, run `bash qemuuninstall.sh -y`.

## Verify installation

```bash
virsh list --all
```

For long installations, use screen or tmux to avoid interruption when SSH disconnects.
