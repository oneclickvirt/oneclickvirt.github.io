---
outline: deep
---

# Introduction

Two ways to create virtual machines.

## Create a Single VM

- Creates only one KVM/QEMU virtual machine, automatically detects international or domestic server
- Can configure binding of an independent IPv6 address (requires host to have a public IPv6 address and IPv6 network configured during installation)
- Supports x86_64 and ARM64 architecture servers

### Download Script

International

```shell
wget -q https://raw.githubusercontent.com/oneclickvirt/qemu/main/scripts/oneqemu.sh
chmod +x oneqemu.sh
```

China

```shell
wget -q https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/qemu/main/scripts/oneqemu.sh
chmod +x oneqemu.sh
```

### Example

Supported variables:

```bash
./oneqemu.sh <name> <cpu> <memory_mb> <disk_gb> <password> <sshport> <startport> <endport> [independent_ipv6:y/n] [system]
```

Currently supported systems:

- debian
- ubuntu

Default is debian if not specified.

```shell
./oneqemu.sh vm1 1 1024 10 MyPassword 25000 34975 35000 n debian
```

Example VM details:

| Property | Value |
|----------|-------|
| VM name | vm1 |
| SSH username | root |
| SSH password | MyPassword |
| CPU cores | 1 |
| Memory | 1024MB |
| Disk size | 10GB |
| SSH port | 25000 |
| Port mapping range | 34975 to 35000 |
| System | debian |
| Independent IPv6 | N |

### Related Operations

List all virtual machines

```shell
virsh list --all
```

Start a virtual machine

```shell
virsh start vm1
```

Shut down a virtual machine

```shell
virsh shutdown vm1
```

Force stop a virtual machine

```shell
virsh destroy vm1
```

Access VM console

```shell
virsh console vm1
```

Press `Ctrl + ]` to exit the console.

Delete example

```shell
virsh destroy vm1
virsh undefine vm1 --remove-all-storage
```

View VM info

```shell
virsh dominfo vm1
```

## Batch Create VMs

- Generates multiple VMs inheriting the same configuration
- Automatically increments VM names (vm1, vm2, ...), SSH ports, and public ports
- VM information is logged to the `vmlog` file
- It is recommended to run in a screen session when creating multiple VMs to avoid SSH disconnection
- Supports x86_64 and ARM64 architecture servers

### Run

International

```shell
wget -q https://raw.githubusercontent.com/oneclickvirt/qemu/main/scripts/create_qemu.sh
chmod +x create_qemu.sh
./create_qemu.sh
```

China

```shell
wget -q https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/qemu/main/scripts/create_qemu.sh
chmod +x create_qemu.sh
./create_qemu.sh
```

### Query Batch Creation Info

```shell
cat vmlog
```

Output format:

```
VM-name SSH-port root-password CPU-cores memory disk start-port end-port
```

One line per VM.

## Delete All VMs and Images

```shell
for vm in $(virsh list --all --name); do virsh destroy "$vm" 2>/dev/null; virsh undefine "$vm" --remove-all-storage; done
rm -rf vmlog
```

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
