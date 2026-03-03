---
outline: deep
---

# Introduction

Install the KubeVirt environment, including k3s + KubeVirt + network configuration + port forwarding as a complete set.

## Add Swap Memory

:::tip
Adding some swap prevents the host from running out of memory.
:::

Unit conversion: entering 1024 creates 1GB of SWAP virtual memory. Virtual memory uses disk space. When actual memory runs out, virtual memory is used automatically, but this brings high I/O and CPU usage.

It is recommended to create swap no larger than twice the actual memory size.

```shell
curl -L https://raw.githubusercontent.com/spiritLHLS/addswap/main/addswap.sh -o addswap.sh && chmod +x addswap.sh && bash addswap.sh
```

## Environment Installation

- Supported OS: Debian 11+, Ubuntu 20.04+
- Automatically installs k3s (lightweight Kubernetes)
- Automatically deploys KubeVirt operator and CDI (Containerized Data Importer)
- Automatically configures Flannel network plugin and port forwarding
- Automatically detects public IPv6 address and configures IPv6 network (if present)
- Supports x86_64 and ARM64 architecture servers

```shell
bash <(curl -sSL https://raw.githubusercontent.com/oneclickvirt/kubevirt/main/kubevirtinstall.sh)
```

:::tip
After installation, it is recommended to run `kubectl get pods -n kubevirt` to verify that the KubeVirt environment is working correctly. All Pods should be in `Running` state.
:::

:::warning
The k3s + KubeVirt installation takes some time (usually 5–15 minutes). Please run it inside a screen or tmux session to avoid installation failure due to SSH disconnection.
:::

## Uninstall KubeVirt Environment

One-click uninstall of the complete environment, including all virtual machines, k3s, KubeVirt, and auxiliary files:

```shell
bash <(curl -sSL https://raw.githubusercontent.com/oneclickvirt/kubevirt/main/kubevirtuninstall.sh)
```

:::warning
The script will require you to enter `yes` to confirm before execution. This operation is irreversible. Content deleted includes all virtual machines, images, k3s and all KubeVirt components.
Reset procedure: run uninstall first, then run install again to verify the entire installation process from scratch.
:::
