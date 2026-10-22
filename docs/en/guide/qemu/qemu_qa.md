---
outline: deep
---

# Reference and troubleshooting

## Images

Image selection tries `oneclickvirt/pve_kvm_images`, then `oneclickvirt/kvm_images`, then the distribution's upstream cloud image. Images are cached in `/var/lib/libvirt/images/`, or the directory recorded by the installer when QEMU_IMAGES_PATH is set. Later guests reuse the cache. When `sha256sum` is available, downloads get a local `.sha256` record and cached files are checked before reuse; a mismatch removes and redownloads the cache. This local record checks cache consistency rather than proving an upstream signature.

| Guest system | Upstream source |
| --- | --- |
| Debian 10/11/12/13 | cloud.debian.org |
| Ubuntu 18/20/22/24 | cloud-images.ubuntu.com |
| AlmaLinux 8/9 | repo.almalinux.org |
| RockyLinux 8/9 | dl.rockylinux.org |
| OpenEuler 22 | repo.openeuler.org |

## Networking

- Uses libvirt's `default` NAT network, `virbr0` and `192.168.122.0/24`.
- Checks whether an existing `virbr0` is owned by libvirt before configuring it.
- Allocates DHCP reservations from `192.168.122.2`–`192.168.122.99` first, then continues through `.254` if required.
- nftables or iptables DNAT maps host ports to guest ports.
- New default networks enable libvirt IPv6 NAT with ULA prefix `fd42:122::/64`. Existing networks are updated through `virsh net-update --live --config`; failed updates preserve IPv4 and do not falsely report working IPv6.
- Records `ipv6_nat=true` only after confirming a global IPv6 uplink source, IPv6 forwarding and actual nftables/ip6tables rules.
- IPv6 addresses come from real DHCPv6 leases. They are not guessed from the IPv4 suffix. Creation may initially record `pending`; query the latest address with `manage_qemu.sh info <name>`.
- Temporary reservations protect VM names, SSH ports and additional port ranges against concurrent reuse.
- SSH mapping: `host:sshport` → `guest-IP:22`.
- Additional mapping: `host:startport-endport` → `guest-IP:startport-endport`.

## Connection records and logs

VM records are stored in `/root/vmlog` and `/var/lib/libvirt/qemu-vms.db`. The first ten vmlog fields remain compatible:

```text
vm1 25001 passwd123 1 1024 20 35001 35025 debian 192.168.122.2
vm2 25002 passwd456 1 1024 20 35026 35050 ubuntu 192.168.122.3
```

Field order: `name SSH-port password CPU memory-MB disk-GB first-port last-port system private-IP`.

New versions append network metadata, for example:

```text
mac=52:54:xx:xx:xx:xx bridge=virbr0 fw=nft ipv6=fd42:122::102 ipv6_nat=true
```

Creation, deletion and `manage_qemu.sh set-resources` update both vmlog and SQLite. If vmlog is missing, `manage_qemu.sh info all` falls back to SQLite.

## KVM not available / /dev/kvm does not exist

Check if the host supports hardware virtualization:

```bash
egrep -c '(vmx|svm)' /proc/cpuinfo
ls /dev/kvm
```

If you cannot use KVM on a VPS, the host may not support nested virtualization. Please contact your VPS provider to confirm.

## virsh: command not found

The QEMU/KVM environment was not installed correctly. Please re-run the installation script:

```shell
bash <(curl -sSL https://raw.githubusercontent.com/oneclickvirt/qemu/main/qemuinstall.sh)
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

See the record format above. Query the latest addresses and ports with:

```bash
cat /root/vmlog
./manage_qemu.sh info all
```

## How to completely reset the QEMU/KVM environment

Uninstall first, then reinstall:

```shell
bash <(curl -sSL https://raw.githubusercontent.com/oneclickvirt/qemu/main/qemuuninstall.sh)
bash <(curl -sSL https://raw.githubusercontent.com/oneclickvirt/qemu/main/qemuinstall.sh)
```

## Disable CDN

Set `export WITHOUTCDN=TRUE` before running the scripts to skip CDN acceleration. Unset it to restore the default behavior.
