---
outline: deep
---

# Install and uninstall KubeVirt

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

Kubelet swap handling depends on the K3s configuration. Check compatibility before enabling swap; it does not replace the minimum RAM requirement.

## Install KubeVirt

```bash
export noninteractive=true
bash <(curl -sSL https://raw.githubusercontent.com/oneclickvirt/kubevirt/main/kubevirtinstall.sh)
```

Defaults are K3s `v1.34.12+k3s1`, KubeVirt `v1.9.1` and CDI `v1.66.1`. virtctl follows KUBEVIRT_VERSION unless VIRTCTL_VERSION is supplied. The administrator kubeconfig is created with mode `0600`.

The installer places `onevm.sh`, `create_vm.sh`, `listvms.sh`, `snapshotvm.sh`, `resizevm.sh`, `deletevm.sh` and `update-port-rules.sh` in `/usr/local/bin`.

Local installation inputs for offline or unreliable networks:

```bash
export noninteractive=true
export K3S_INSTALL_SCRIPT=/path/to/k3s-install.sh
export KUBEVIRT_MANIFEST_DIR=/path/to/kubevirt-manifests
export CDI_MANIFEST_DIR=/path/to/cdi-manifests
export VIRTCTL_BINARY=/path/to/virtctl
export KUBEVIRT_SCRIPT_DIR=/path/to/kubevirt
bash kubevirtinstall.sh
```

These variables provide local inputs for the named installer stages. Cluster and guest container images must also be available to the target environment.

## Environment variables

| Variable | Description | Default |
| --- | --- | --- |
| `noninteractive` | Shared unattended switch | unset |
| `K3S_VERSION` | K3s release | `v1.34.12+k3s1` |
| `KUBEVIRT_VERSION` | KubeVirt release | `v1.9.1` |
| `CDI_VERSION` | CDI release | `v1.66.1` |
| `VIRTCTL_VERSION` | virtctl release | follows KUBEVIRT_VERSION |
| `K3S_INSTALL_SCRIPT` | Local K3s installer | unset |
| `KUBEVIRT_MANIFEST_DIR` | Local directory containing kubevirt-operator.yaml and kubevirt-cr.yaml | unset |
| `CDI_MANIFEST_DIR` | Local directory containing cdi-operator.yaml and cdi-cr.yaml | unset |
| `KUBEVIRT_OPERATOR_YAML` / `KUBEVIRT_CR_YAML` | Explicit local KubeVirt operator/CR manifests | unset |
| `CDI_OPERATOR_YAML` / `CDI_CR_YAML` | Explicit local CDI operator/CR manifests | unset |
| `VIRTCTL_BINARY` | Local virtctl executable | unset |
| `KUBEVIRT_SCRIPT_DIR` | Local scripts, such as firewall.sh and onevm.sh | unset |
| `K3S_IP_FAMILY` | `auto`, `ipv4` or `dualstack` | `auto` |
| `K3S_CLUSTER_CIDR` / `K3S_SERVICE_CIDR` | Override pod and Service CIDRs for a new dual-stack cluster | `10.42.0.0/16,fd42:42::/56` / `10.43.0.0/16,fd42:43::/112` |
| `KUBEVIRT_INSTALL_MULTUS` | Install the K3s/Flannel Multus secondary-interface entry point | false |
| `SSH_READY_TIMEOUT` | Password SSH and cloud-init verification budget in seconds | 600 |
| `KEEP_FAILED_RESOURCES` | Preserve resources on supported creation failure paths for diagnosis | false |
| `STORE_PASSWORD_ANNOTATION` | Store a plaintext password in VM metadata | false |
| `DELETE_SNAPSHOTS` | Delete snapshot DataVolumes with the VM | false |
| `ALLOW_RUNNING_SNAPSHOT` | Allow cloning a running VM's disk | false |
| `WAIT_SNAPSHOT` | Wait for the DataVolume clone | true |
| `RESTART_VM` | Restart after changing VM resources | false |
| `SHOW_PASSWORD` | Show passwords available in VM annotations or local vmlog | false |

## Uninstall

This removes the KubeVirt/K3s environment and its workloads. Back up data first; `noninteractive=true` skips confirmation.

```bash
export noninteractive=true
bash <(curl -sSL https://raw.githubusercontent.com/oneclickvirt/kubevirt/main/kubevirtuninstall.sh)
```

## Verify installation

```bash
kubectl get pods -n kubevirt
```

For long installations, use screen or tmux to avoid interruption when SSH disconnects.
