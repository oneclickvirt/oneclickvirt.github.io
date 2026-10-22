---
outline: deep
---

# Create and manage KubeVirt instances

## Create one VM

```bash
curl -sSL -o onevm.sh https://raw.githubusercontent.com/oneclickvirt/kubevirt/main/scripts/onevm.sh
chmod +x onevm.sh
export noninteractive=true
./onevm.sh <name> <cpu> <memory_gb> <disk_gb> <password> <sshport> <startport> <endport> [system]
```

Creation verifies an actual root password SSH login and cloud-init completion. The SSH verification budget defaults to 600 seconds and can be changed with SSH_READY_TIMEOUT. A verification timeout returns failure and retains the VM for diagnosis; an open TCP port alone is not success.

| Argument | Description | Default |
| --- | --- | --- |
| name | VM name, using lowercase letters, digits and hyphens | test |
| cpu | CPU cores | 1 |
| memory_gb | Memory in GB | 1 |
| disk_gb | Disk size in GB | 10 |
| password | Root password; supply your own password | 123456 |
| sshport | SSH host port | 25000 |
| startport | First additional public port | 34975 |
| endport | Last additional public port | 35000 |
| system | Guest OS | ubuntu |

| System value | Guest release | Image selection |
| --- | --- | --- |
| `ubuntu` | Ubuntu 22.04 LTS | pve_kvm_images(ubuntu22) → kvm_images(ubuntu22) → upstream |
| `ubuntu24` | Ubuntu 24.04 LTS | pve_kvm_images(ubuntu24) → kvm_images(ubuntu24) → upstream |
| `debian` | Debian 12 | pve_kvm_images(debian12) → kvm_images(debian12) → upstream |
| `debian11` | Debian 11 | pve_kvm_images(debian11) → kvm_images(debian11) → upstream |
| `almalinux` | AlmaLinux 9 | pve_kvm_images(almalinux9) → kvm_images(almalinux9) → upstream |
| `rockylinux` | RockyLinux 9 | pve_kvm_images(rockylinux9) → kvm_images(rockylinux9) → upstream |
| `centos` | CentOS 7 | pve_kvm_images(centos7) → kvm_images(centos7) → upstream |
| `centos8-stream` | CentOS Stream 8 | pve_kvm_images(centos8-stream) → kvm_images(centos8-stream) → upstream |
| `centos-stream` | CentOS Stream 9 | upstream; no organization-provided image |
| `opensuse` | openSUSE Leap 15.5 | pve_kvm_images(opensuse-leap-15) → kvm_images(opensuse-leap-15) → upstream |

Example:

```bash
export noninteractive=true
./onevm.sh vm1 2 2 20 MyPassword 25000 34975 35000 debian
```

Positional arguments take precedence over VM_NAME, CPU, MEMORY_GB, DISK_GB, PASSWORD, SSH_PORT, START_PORT, END_PORT and SYSTEM. Resources are created in the `kubevirt-vms` namespace.

## Batch creation

```bash
curl -sSL -o create_vm.sh https://raw.githubusercontent.com/oneclickvirt/kubevirt/main/scripts/create_vm.sh
chmod +x create_vm.sh
export noninteractive=true
./create_vm.sh
```

To configure a batch:

```bash
export VM_COUNT=3
export VM_PREFIX=vm
export START_NUM=1
export CPU=2
export MEMORY_GB=2
export DISK_GB=20
export SSH_START_PORT=25000
export PORT_RANGE_SIZE=26
export EXTRA_PORT_START=35000
export SYSTEM=debian
export noninteractive=true
./create_vm.sh
```

Defaults are one VM, prefix `vm`, start number 1, one CPU, 1 GB memory, 10 GB disk, SSH starting at 25000, 26 additional ports per VM starting at 35000, and Ubuntu. PASSWORD may be set explicitly; otherwise the batch generates a password. `AUTO_YES=y` remains an unattended-mode alias.

## List VMs

```bash
curl -sSL -o listvms.sh https://raw.githubusercontent.com/oneclickvirt/kubevirt/main/scripts/listvms.sh
chmod +x listvms.sh
export noninteractive=true
./listvms.sh
```

## Snapshot a VM

```bash
curl -sSL -o snapshotvm.sh https://raw.githubusercontent.com/oneclickvirt/kubevirt/main/scripts/snapshotvm.sh
chmod +x snapshotvm.sh
export noninteractive=true
./snapshotvm.sh vm1 vm1-snapshot-001
```

- CDI clones `vm1-dv` to a new DataVolume; it does not create another VM.
- Running VMs are refused by default to avoid an inconsistent disk copy. `ALLOW_RUNNING_SNAPSHOT=true` overrides this check.
- The script waits for the clone by default. Set `WAIT_SNAPSHOT=false` to return after submission.

## Resize a VM

```bash
curl -sSL -o resizevm.sh https://raw.githubusercontent.com/oneclickvirt/kubevirt/main/scripts/resizevm.sh
chmod +x resizevm.sh
export noninteractive=true
./resizevm.sh vm1 4 8 40
```

Arguments are `vmname cpu memory_gb disk_gb`. Leave a value empty to preserve that resource, for example `./resizevm.sh vm1 "" "" 40`.

CPU and memory changes update the VM template and usually require a restart for running VMs. Set `RESTART_VM=true` to restart automatically. Disks can only grow and the StorageClass must support PVC expansion; the guest filesystem may still require manual growth.

## Delete one VM

```bash
curl -sSL -o deletevm.sh https://raw.githubusercontent.com/oneclickvirt/kubevirt/main/scripts/deletevm.sh
chmod +x deletevm.sh
export noninteractive=true
./deletevm.sh <name>
```

Snapshot DataVolumes are preserved by default. Set `DELETE_SNAPSHOTS=true` to remove the VM's clones as well.

## Management commands

```bash
kubectl get vm -n kubevirt-vms
kubectl get vmi -n kubevirt-vms
kubectl get dv -n kubevirt-vms
virtctl console <vmname> -n kubevirt-vms   # Exit with Ctrl+]
virtctl start <vmname> -n kubevirt-vms
virtctl stop <vmname> -n kubevirt-vms
virtctl restart <vmname> -n kubevirt-vms
```

## Delete multiple VMs

After confirming the names, use deletevm.sh instead of deleting VM/PVC resources separately. Snapshot clones are preserved unless DELETE_SNAPSHOTS=true.

```bash
for vm in vm1 vm2; do
  noninteractive=true ./deletevm.sh "$vm" || break
done
```

## Recover after host reboot

K3s starts automatically. Check the services and VM state before starting stopped VMs:

```bash
systemctl status k3s
kubectl get pods -n kubevirt
kubectl get vm -n kubevirt-vms
virtctl start vm1 -n kubevirt-vms
```

For a VM whose old port mappings no longer work, confirm vmlog and run `update-port-rules.sh vm1`. New NodePort Services follow replacement Pod addresses automatically.

See [networking, images and troubleshooting](kubevirt_qa.md) for network modes, image sources and records.
