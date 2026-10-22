---
outline: deep
---

# Introduction

## Create a Single VM

### Download Script

```bash
curl -sSL -o oneqemu.sh https://raw.githubusercontent.com/oneclickvirt/qemu/main/scripts/oneqemu.sh
chmod +x oneqemu.sh
```

### Usage

```text
./oneqemu.sh <name> <cpu> <memory_mb> <disk_gb> <password> <sshport> <startport> <endport> [system]
./oneqemu.sh <name> <cpu> <memory_mb> <disk_gb> <password> <sshport> <startport> <endport> <extra_flag(y/n)> [system]
```

| Argument | Description | Default |
| --- | --- | --- |
| name | VM name | vm1 |
| cpu | CPU cores | 1 |
| memory_mb | Memory in MB | 1024 |
| disk_gb | Disk size in GB | 20 |
| password | Root password | generated |
| sshport | SSH host port | 25001 |
| startport | First additional port | 35001 |
| endport | Last additional port | 35025 |
| system | Guest OS in position 9 or 10 | debian |

| System | Supported versions | Examples |
| --- | --- | --- |
| `debian` | 10, 11, 12, 13 | `debian`, `debian12`, `debian13` |
| `ubuntu` | 18, 20, 22, 24 | `ubuntu`, `ubuntu22`, `ubuntu24` |
| `almalinux` | 8, 9 | `almalinux9`, `alma9` |
| `rockylinux` | 8, 9 | `rockylinux9`, `rocky9` |
| `openeuler` | 22 | `openeuler` |

System names are case-insensitive and accept separators such as `debian-13` and `ubuntu_22`.

Environment variables are also accepted; positional arguments take precedence:

```bash
export noninteractive=true
export VM_NAME=vm1
export VM_CPU=1
export VM_MEMORY=1024
export VM_DISK=20
export VM_PASSWORD='ChangeMe-123'
export VM_SSH_PORT=25001
export VM_START_PORT=35001
export VM_END_PORT=35025
export VM_SYSTEM=debian12
./oneqemu.sh
```

### Example

Choose one of the following examples:

```bash
./oneqemu.sh vm1 1 1024 20 MyPassword 25001 35001 35025 debian
# Optional flag in position 9, system in position 10:
./oneqemu.sh vm1 1 1024 10 MyPassword 25000 34975 35000 n debian13
```

### Related Operations

```bash
virsh list --all
virsh console <name>     # Exit with Ctrl+]
virsh start <name>
virsh shutdown <name>
virsh destroy <name>     # Force power off
virsh reboot <name>
virsh dominfo <name>
virsh domifaddr <name>
```

Project management script:

```bash
curl -sSL -o manage_qemu.sh https://raw.githubusercontent.com/oneclickvirt/qemu/main/scripts/manage_qemu.sh
chmod +x manage_qemu.sh
./manage_qemu.sh info all
./manage_qemu.sh info vm1
./manage_qemu.sh snapshot vm1 before-upgrade
./manage_qemu.sh set-resources vm1 2 2048
```

`info` includes vmlog, VM state, MAC address, IPs and ports. `set-resources` takes CPU cores and memory in MB.

## Batch Create VMs

### Run

```bash
curl -sSL -o create_qemu.sh https://raw.githubusercontent.com/oneclickvirt/qemu/main/scripts/create_qemu.sh
chmod +x create_qemu.sh
./create_qemu.sh
```

The interactive script increments VM names, SSH ports and public ports, and writes `vmlog`. A batch lock serializes creation. A failed VM stops subsequent creation so names and port assignments do not continue drifting.

Command-line configuration:

```bash
# ./create_qemu.sh <count> <memory_mb> <cpu> <disk_gb> <system>
./create_qemu.sh 3 1024 1 20 debian12
```

Unattended environment configuration:

```bash
export noninteractive=true
export VM_COUNT=3
export VM_MEMORY=1024
export VM_CPU=1
export VM_DISK=20
export VM_SYSTEM=debian12
./create_qemu.sh
```

Creation does not block on cloud-init completion. DHCP reservations and forwarding rules are installed before startup; cloud-init continues in the running guest. Connect once SSH is ready. Monitor initialization with:

```bash
tail -f /tmp/qemu-init-vm1.*.log
```

### Query Batch Creation Info

Connection information is saved in `/root/vmlog`. View it with:

```shell
cat /root/vmlog
```

## Delete one VM

```bash
curl -sSL -o delete_qemu.sh https://raw.githubusercontent.com/oneclickvirt/qemu/main/scripts/delete_qemu.sh
chmod +x delete_qemu.sh
./delete_qemu.sh <vm_name>
./delete_qemu.sh vm1 -y
```

Unattended environment configuration:

```bash
export VM_NAME=vm1
export noninteractive=true
export QEMU_FORCE_DELETE=yes
./delete_qemu.sh
```

Deletion removes the VM definition, disks, DHCP reservation, nftables/iptables forwarding rules and connection records. Successful deletion updates both `/root/vmlog` and the local SQLite state database.

## Delete multiple VMs

Use the deletion script for each confirmed VM name so DHCP reservations, forwarding rules, vmlog and SQLite state are also cleaned up:

```bash
for vm in vm1 vm2; do
  ./delete_qemu.sh "$vm" -y || break
done
```

To remove the complete environment and all VM disks, use the uninstaller in the installation guide.

## Restart All VMs After Host Reboot

QEMU/KVM supports setting VMs to autostart via libvirt:

```shell
# Enable autostart for a specific VM
virsh autostart vm1

# Check autostart status
virsh dominfo vm1 | grep Autostart

# Disable autostart
virsh autostart vm1 --disable
```

Or manually start all stopped VMs:

```shell
for vm in $(virsh list --all --name); do virsh start "$vm" 2>/dev/null; done
```

See [networking, images and troubleshooting](qemu_qa.md) for network modes, image sources and records.
