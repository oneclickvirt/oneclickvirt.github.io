---
outline: deep
---

# Introduction

Two ways to create virtual machines.

## Create a Single VM

- Creates only one KVM virtual machine (via KubeVirt VirtualMachine resource), automatically detects international or domestic server
- Uses the cluster CNI address space; a dual-stack cluster detects VM IPv4 and IPv6 separately for port forwarding
- Supports x86_64 and ARM64 architecture servers

:::tip IPv6 network mode
KubeVirt never derives a CNI/IPAM subnet from the host's public IPv6 prefix. When IPv6 forwarding is enabled, the installer preserves the SLAAC route on the host uplink; VM IPv6 availability depends on the cluster CNI dual-stack configuration.
:::

### Download Script

```shell
curl -sSLO https://raw.githubusercontent.com/oneclickvirt/kubevirt/main/scripts/onevm.sh
chmod +x onevm.sh
```

### Example

Supported variables:

```bash
./onevm.sh <name> <cpu> <memory_gb> <disk_gb> <password> <sshport> <startport> <endport> [system]
```

Currently supported systems:

- debian
- ubuntu

Default is debian if not specified.

```shell
./onevm.sh vm1 1 1 10 MyPassword 25000 34975 35000 debian
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

### Related Operations

List all virtual machines

```shell
kubectl get vmi -n default
```

Check VM status

```shell
kubectl get vm vm1 -n default
```

Start a virtual machine

```shell
virtctl start vm1 -n default
```

Stop a virtual machine

```shell
virtctl stop vm1 -n default
```

Access VM serial console

```shell
virtctl console vm1 -n default
```

Press `Ctrl + ]` to exit the console.

Delete example

```shell
kubectl delete vm vm1 -n default
kubectl delete pvc vm1-pvc -n default
```

## Batch Create VMs

- Generates multiple VMs inheriting the same configuration
- Automatically increments VM names (vm1, vm2, ...), SSH ports, and public ports
- VM information is logged to the `vmlog` file
- It is recommended to run in a screen session when creating multiple VMs to avoid SSH disconnection
- Supports x86_64 and ARM64 architecture servers

### Run

```shell
curl -sSLO https://raw.githubusercontent.com/oneclickvirt/kubevirt/main/scripts/create_kubevirt.sh
chmod +x create_kubevirt.sh
./create_kubevirt.sh
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
kubectl delete vm --all -n default
kubectl delete pvc --all -n default
rm -rf vmlog
```

## Recover After Host Reboot

The k3s service starts automatically on boot. After a reboot:

```shell
# Check k3s status
systemctl status k3s

# Check KubeVirt pod status
kubectl get pods -n kubevirt

# Start all stopped VMs
for vm in $(kubectl get vm -n default --no-headers -o custom-columns=':metadata.name'); do
  virtctl start "$vm" -n default 2>/dev/null
done
```
