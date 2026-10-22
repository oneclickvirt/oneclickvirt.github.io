---
outline: deep
---

# FAQ

## Connection records and logs

Creation saves connection information in `vmlog` in the current working directory, with mode `0600`. The record includes the VM name, host/SSH port, password, extra port range, system, CPU, memory and disk. Example records contain the following leading fields:

```text
vm1 root@<host-IP>:25000 密码: MyPassword 端口范围: 34975-35000
vm2 root@<host-IP>:25001 密码: MyPassword 端口范围: 35001-35026
```

The Chinese field labels shown above are the literal labels written by the script. Do not upload vmlog to public logs or artifacts.

## Notes

1. First boot includes image import and can take 5–20 minutes, depending on the network.
2. KVM or nested virtualization is recommended; TCG emulation is slower.
3. New mappings use NodePort Services. Legacy nftables/iptables forwarding can be migrated with update-port-rules.sh. The installer configures forwarding persistence with systemd and the distribution's firewall tools where applicable. IPv4 and IPv6 rules follow actual guest address families, so an IPv6-first or IPv6-only address is not written into an IPv4 DNAT rule.
4. `K3S_IP_FAMILY=auto` selects dual stack when both uplinks are usable. Existing single-stack clusters are not converted in place. The shared host ports and IPv6 NAT do not give a guest an independent public IPv6 address.
5. Only amd64/x86_64 is supported by the current scripts.
6. CentOS 7 is EOL and remains a compatibility image. Prefer maintained Debian, Ubuntu, RockyLinux or AlmaLinux releases.
7. Reset a password from `virtctl console` when necessary.

## Usage notes

### K3s installation failed

The installer shows recent `/tmp/k3s-install-log.txt` lines, `systemctl status k3s` and journal excerpts. Check network/DNS access, root permissions, systemd, the kernel and firewall restrictions.

### Resources after a failed image import or timeout

Image import failures normally clean up the VM, DataVolume, PVC and cloud-init Secret created by this attempt. Set `KEEP_FAILED_RESOURCES=true` when diagnosis requires them. A later password SSH verification timeout preserves the VM and returns an error.

### listvms.sh no longer shows passwords

New VMs do not store plaintext passwords in Kubernetes annotations by default. The password still initializes cloud-init and is printed and saved in the local vmlog at creation. listvms.sh masks local record passwords by default. To store and query an annotation, set `STORE_PASSWORD_ANNOTATION=true` during creation and `SHOW_PASSWORD=true` when querying. SHOW_PASSWORD can also reveal a password already present in local vmlog.

### Are snapshots application-consistent backups?

Snapshots are CDI DataVolume clones, not application-consistent backups. Stop the VM before cloning to avoid unflushed writes.

### Dual-stack clusters and stable port mappings

The installer defaults to `K3S_IP_FAMILY=auto`. It checks the IPv6 default route and a global address on that interface, creates a dual-stack K3s cluster when both uplinks are usable, and enables IPv6 outbound masquerading. Use `ipv4` or `dualstack` explicitly if required. Explicit dual stack fails if the required uplink is absent. Override K3S_CLUSTER_CIDR and K3S_SERVICE_CIDR to avoid existing networks. Existing single-stack clusters require workload backup and a supported K3s rebuild rather than automatic in-place conversion.

New VMs use NodePort Services for SSH and additional TCP/UDP ports. Endpoints track new Pod addresses after stop/start. Setup errors fail creation. For an older VM, confirm its name and port parameters in vmlog, then run `update-port-rules.sh VMNAME` to migrate it. Services belong to the VM and are removed when it is deleted. vmlog is mode 600 and must not be published.

This dual-stack setup provides shared host IPv4/IPv6 port forwarding and outbound IPv6 NAT. Independent routed guest addresses need separate prefix, bridge and upstream routing configuration and validation.

### Multus secondary interfaces on K3s/Flannel

Set `KUBEVIRT_INSTALL_MULTUS=true` during installation, or run `bash scripts/install_multus.sh` as root from an existing repository checkout. It installs digest-pinned Multus v4.3.1, verifies the CNI static plugin and preserves K3s executable symlinks. For a custom data directory set K3S_DATA_DIR; K3S_CNI_BIN_DIR and K3S_CNI_CONF_DIR can also be overridden. The entry point requires K3s/Flannel `10-flannel.conflist` and does not convert a different primary CNI.

The installer preserves `00-multus-oneclickvirt.conf` so an early Pod cannot bypass Multus after its automatic configuration is removed on exit. After a host reboot, Pods wait for the host-network Multus DaemonSet before creating networks. This installs secondary-interface capability only; routed prefixes, bridges, upstream NDP or tunnels still require actual network configuration. If an older Pod has already lost its secondary interface, restart the instance through the panel to recreate the Pod, then check its real addresses and SSH access.

### Independent external IPv6 password SSH verification

The manual `Hosted runner independent IPv6 SSH` workflow uses an official GitHub Ubuntu runner and a local Cloudflare WARP SOCKS proxy for an independent IPv6 egress. It verifies the guest SSH host-key fingerprint, disables public-key authentication, logs in with the password, and checks a random value and root identity. HTTP reachability, an SSH banner or a host-forwarded login is not equivalent evidence.

During the acceptance window, set temporary Secret RUNTIME_IPV6_SSH_TARGETS to a JSON array of one to six objects. Each contains `address`, `password` and a `fingerprint` in `SHA256:` format; `port`, `username` and `boot_id` are optional. Only public IPv6 targets are accepted. The workflow does not print target addresses, passwords, raw SSH errors or command responses. Delete the temporary Secret after acceptance. The workflow has no scheduled trigger.

## kubectl: command not found

The k3s environment was not installed correctly. Please re-run the installation script:

International

```shell
bash <(curl -sSL https://raw.githubusercontent.com/oneclickvirt/kubevirt/main/kubevirtinstall.sh)
```

## KubeVirt Pods not ready

View all Pod statuses in the KubeVirt namespace:

```shell
kubectl get pods -n kubevirt
```

If any Pod is in `Pending` or `CrashLoopBackOff` state, check details:

```shell
kubectl describe pod <pod-name> -n kubevirt
kubectl logs <pod-name> -n kubevirt
```

Common causes:
- Host does not support KVM (check if `/dev/kvm` exists)
- Insufficient memory (k3s + KubeVirt requires at least 4GB of available memory)

## VM cannot access the internet (IPv4)

Inspect the VMI, Pod addresses, Services and endpoints. K3s embeds Flannel, so a separate Flannel Pod is not required. Check K3s logs and host forwarding if the guest has no outbound access.

```bash
kubectl get vmi,pods,svc,endpoints -n kubevirt-vms -o wide
journalctl -u k3s -n 100
sysctl net.ipv4.ip_forward
```

## VM IPv6 not working

Check the host IPv6 default route, K3s Pod/Service CIDRs and actual VMI address families. New Services use the address families available in the cluster; searching for a Service named ipv6 is not a valid test. See dual-stack setup above. An existing IPv4-only cluster is not converted automatically.

```bash
ip -6 route
kubectl get nodes -o wide
kubectl get vmi,svc -n kubevirt-vms -o yaml
```

## KVM not available

```bash
egrep -c '(vmx|svm)' /proc/cpuinfo
ls /dev/kvm
```

If you cannot use KVM on a VPS, the host may not support nested virtualization. Please contact your VPS provider to confirm.

The installer enables slower TCG emulation when /dev/kvm is absent after module loading. Check useEmulation in the KubeVirt configuration rather than assuming the installation must fail.

## VM stays in Pending state

Check VM instance details:

```shell
kubectl describe vmi vm1 -n kubevirt-vms
```

Common causes:
- CDI (Containerized Data Importer) has not finished importing the disk image. Wait for the DataVolume to be ready:

```shell
kubectl get dv -n kubevirt-vms
```

- Insufficient host resources (CPU/memory/storage)

## How to view SSH login info

Connection records are in vmlog in the creation working directory. listvms.sh masks passwords by default; use SHOW_PASSWORD=true only when you need to read a locally stored password. See the password FAQ above.

```bash
cat vmlog
listvms.sh vm1
```

## How to completely reset the KubeVirt environment

Uninstall first, then reinstall:

```shell
bash <(curl -sSL https://raw.githubusercontent.com/oneclickvirt/kubevirt/main/kubevirtuninstall.sh)
bash <(curl -sSL https://raw.githubusercontent.com/oneclickvirt/kubevirt/main/kubevirtinstall.sh)
```

## Disable CDN

Set `export WITHOUTCDN=TRUE` before running the scripts to skip CDN acceleration. Unset it to restore the default behavior.
