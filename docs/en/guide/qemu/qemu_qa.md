---
outline: deep
---

# FAQ

## KVM not available / /dev/kvm does not exist

Check if the host supports hardware virtualization:

```bash
egrep -c '(vmx|svm)' /proc/cpuinfo
ls /dev/kvm
```

If you cannot use KVM on a VPS, the host may not support nested virtualization. Please contact your VPS provider to confirm.

## virsh: command not found

The QEMU/KVM environment was not installed correctly. Please re-run the installation script:

International

```shell
bash <(wget -qO- https://raw.githubusercontent.com/oneclickvirt/qemu/main/scripts/qemuinstall.sh)
```

China

```shell
bash <(wget -qO- https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/qemu/main/scripts/qemuinstall.sh)
```

## VM cannot access the internet (IPv4)

Check if the iptables NAT rules exist:

```shell
iptables -t nat -L POSTROUTING -n -v | grep virbr
```

If not, add them manually (assuming virbr0 subnet is 192.168.122.0/24):

```shell
iptables -t nat -A POSTROUTING -s 192.168.122.0/24 ! -d 192.168.122.0/24 -j MASQUERADE
iptables -A FORWARD -s 192.168.122.0/24 -j ACCEPT
iptables -A FORWARD -d 192.168.122.0/24 -j ACCEPT
```

## VM IPv6 not working

1. Confirm the host has a public IPv6 address
2. Check if the IPv6 bridge is configured:

```shell
ip -6 addr show
```

3. Confirm the installation script fully executed and configured the IPv6 network.

## VM fails to start / status is shut off

Check the VM error log:

```shell
virsh dominfo vm1
cat /var/log/libvirt/qemu/vm1.log
```

Common causes:
- Insufficient memory: check available memory with `free -h`
- Insufficient disk space: check disk with `df -h`
- KVM permission issue: confirm `/dev/kvm` permissions are correct

## How to view SSH login info

View the vmlog file for batch-created VM info:

```shell
cat vmlog
```

Or view port forwarding rules:

```shell
iptables -t nat -L PREROUTING -n -v | grep 25000
```

## How to completely reset the QEMU/KVM environment

Uninstall first, then reinstall:

International

```shell
bash <(wget -qO- https://raw.githubusercontent.com/oneclickvirt/qemu/main/scripts/qemuuninstall.sh)
bash <(wget -qO- https://raw.githubusercontent.com/oneclickvirt/qemu/main/scripts/qemuinstall.sh)
```

China

```shell
bash <(wget -qO- https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/qemu/main/scripts/qemuuninstall.sh)
bash <(wget -qO- https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/qemu/main/scripts/qemuinstall.sh)
```
