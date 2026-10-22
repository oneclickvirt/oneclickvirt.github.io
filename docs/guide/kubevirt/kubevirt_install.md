---
outline: deep
---

# 安装与卸载 KubeVirt

统一的无交互开关和交互流程见[节点环境的交互与自动化](../oneclickvirt/environment_modes.md)。

## 开设虚拟内存

:::tip
内存开点 swap 免得机器炸了
:::

单位换算：输入 1024 产生 1G SWAP-虚拟内存，虚拟内存占用硬盘空间，当实际内存不够用时将自动使用虚拟内存做内存使用，但随之带来IO高占用以及CPU性能占用

建议只开实际内存大小两倍大小的虚拟内存

国际

```shell
curl -L https://raw.githubusercontent.com/spiritLHLS/addswap/main/addswap.sh -o addswap.sh && chmod +x addswap.sh && bash addswap.sh
```

国内

```shell
curl -L https://cdn.spiritlhl.net/https://raw.githubusercontent.com/spiritLHLS/addswap/main/addswap.sh -o addswap.sh && chmod +x addswap.sh && bash addswap.sh
```

Kubelet 对 SWAP 的处理取决于 K3s 配置，启用前须确认兼容性，不能用 SWAP 替代最低物理内存要求。

## 安装 KubeVirt 环境

```bash
export noninteractive=true
bash <(curl -sSL https://raw.githubusercontent.com/oneclickvirt/kubevirt/main/kubevirtinstall.sh)
```

默认版本组合为 K3s `v1.34.12+k3s1`、KubeVirt `v1.9.1`、CDI `v1.66.1`；`virtctl` 默认跟随 `KUBEVIRT_VERSION`，可用同名环境变量覆盖。集群管理员 kubeconfig 权限为 `0600`。

安装完成后会把常用管理脚本安装到 `/usr/local/bin`，可直接运行 `onevm.sh`、`create_vm.sh`、`listvms.sh`、`snapshotvm.sh`、`resizevm.sh`、`deletevm.sh` 和 `update-port-rules.sh`。

弱网或离线环境可提前准备安装文件后运行：

```bash
export noninteractive=true
export K3S_INSTALL_SCRIPT=/path/to/k3s-install.sh
export KUBEVIRT_MANIFEST_DIR=/path/to/kubevirt-manifests
export CDI_MANIFEST_DIR=/path/to/cdi-manifests
export VIRTCTL_BINARY=/path/to/virtctl
export KUBEVIRT_SCRIPT_DIR=/path/to/kubevirt
bash kubevirtinstall.sh
```

这些变量为对应安装阶段提供本地输入；集群组件和客体容器镜像仍须在目标环境可用。

## 常用环境变量

| 变量 | 说明 | 默认值 |
|------|------|--------|
| `noninteractive=true` | 统一无交互模式标记 | 未启用 |
| `K3S_VERSION` | 安装的 K3s 版本 | `v1.34.12+k3s1` |
| `KUBEVIRT_VERSION` | 安装的 KubeVirt 版本 | `v1.9.1` |
| `CDI_VERSION` | 安装的 CDI 版本 | `v1.66.1` |
| `VIRTCTL_VERSION` | 安装的 virtctl 版本 | 跟随 `KUBEVIRT_VERSION` |
| `K3S_INSTALL_SCRIPT` | 本地 K3s 安装脚本路径，供离线/弱网安装使用 | 未设置 |
| `KUBEVIRT_MANIFEST_DIR` | 本地 KubeVirt manifest 目录，需包含 `kubevirt-operator.yaml` 和 `kubevirt-cr.yaml` | 未设置 |
| `CDI_MANIFEST_DIR` | 本地 CDI manifest 目录，需包含 `cdi-operator.yaml` 和 `cdi-cr.yaml` | 未设置 |
| `KUBEVIRT_OPERATOR_YAML` / `KUBEVIRT_CR_YAML` | 分别指定本地 KubeVirt Operator/CR manifest 文件 | 未设置 |
| `CDI_OPERATOR_YAML` / `CDI_CR_YAML` | 分别指定本地 CDI Operator/CR manifest 文件 | 未设置 |
| `VIRTCTL_BINARY` | 本地 virtctl 二进制路径 | 未设置 |
| `KUBEVIRT_SCRIPT_DIR` | 本地脚本目录，供离线安装 `firewall.sh`、`onevm.sh`、`snapshotvm.sh` 等脚本 | 未设置 |
| `K3S_IP_FAMILY` | `auto`、`ipv4` 或 `dualstack` | `auto` |
| `K3S_CLUSTER_CIDR` / `K3S_SERVICE_CIDR` | 新建双栈集群的 Pod / Service 网段 | `10.42.0.0/16,fd42:42::/56` / `10.43.0.0/16,fd42:43::/112` |
| `KUBEVIRT_INSTALL_MULTUS` | 安装 K3s/Flannel Multus 次网卡入口 | `false` |
| `SSH_READY_TIMEOUT` | 密码 SSH 和 cloud-init 验证预算，单位秒 | `600` |
| `KEEP_FAILED_RESOURCES=true` | VM 创建失败时保留 VM/DV/Secret 现场排查 | 未启用 |
| `STORE_PASSWORD_ANNOTATION=true` | 将 VM 明文密码写入 Kubernetes 注解，便于后续查询但会扩大暴露面 | 未启用 |
| `DELETE_SNAPSHOTS=true` | 删除 VM 时同时删除由 `snapshotvm.sh` 创建的 DataVolume 克隆 | 未启用 |
| `ALLOW_RUNNING_SNAPSHOT=true` | 允许对运行中 VM 做 DataVolume 克隆 | 未启用 |
| `WAIT_SNAPSHOT=false` | 创建快照后不等待克隆完成 | `true` |
| `RESTART_VM=true` | 资源调整后自动重启 VM | 未启用 |
| `SHOW_PASSWORD=true` | `listvms.sh` 显示已存储在 VM 注解或本地 `vmlog` 中的明文密码 | 未启用 |

## 卸载（完整清理）

```bash
export noninteractive=true
bash <(curl -sSL https://raw.githubusercontent.com/oneclickvirt/kubevirt/main/kubevirtuninstall.sh)
```

## 安装检查

```bash
kubectl get pods -n kubevirt
```

安装时间较长时建议在 screen 或 tmux 中运行，避免 SSH 中断。

## 国内下载入口

上述 GitHub Raw 安装、卸载及开设脚本的地址均可加上 `https://cdn.spiritlhl.net/` 前缀。例如安装：

```bash
bash <(curl -sSL https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/kubevirt/main/kubevirtinstall.sh)
```

无需加速时使用原始 GitHub 地址；`export WITHOUTCDN=TRUE` 可禁用脚本内部 CDN 探测。
