---
outline: deep
---

# FAQ

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

Check if the iptables NAT rules exist:

```shell
iptables -t nat -L POSTROUTING -n -v | grep flannel
```

If missing, check if the Flannel network plugin is running correctly:

```shell
kubectl get pods -n kube-system | grep flannel
```

## VM IPv6 not working

1. Confirm the host has a public IPv6 address
2. Check if the IPv6 resources are configured:

```shell
kubectl get svc -n default | grep ipv6
```

## KVM not available

```bash
egrep -c '(vmx|svm)' /proc/cpuinfo
ls /dev/kvm
```

If you cannot use KVM on a VPS, the host may not support nested virtualization. Please contact your VPS provider to confirm.

## VM stays in Pending state

Check VM instance details:

```shell
kubectl describe vmi vm1 -n default
```

Common causes:
- CDI (Containerized Data Importer) has not finished importing the disk image. Wait for the DataVolume to be ready:

```shell
kubectl get dv -n default
```

- Insufficient host resources (CPU/memory/storage)

## How to view SSH login info

View the vmlog file for batch-created VM info:

```shell
cat vmlog
```

## How to completely reset the KubeVirt environment

Uninstall first, then reinstall:

International

```shell
bash <(curl -sSL https://raw.githubusercontent.com/oneclickvirt/kubevirt/main/scripts/kubevirtuninstall.sh)
bash <(curl -sSL https://raw.githubusercontent.com/oneclickvirt/kubevirt/main/kubevirtinstall.sh)
```
