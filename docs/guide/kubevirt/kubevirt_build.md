---
outline: deep
---

# KubeVirt 实例开设与管理

## 开设单个虚拟机

```bash
curl -sSL -o onevm.sh https://raw.githubusercontent.com/oneclickvirt/kubevirt/main/scripts/onevm.sh
chmod +x onevm.sh
export noninteractive=true
./onevm.sh <name> <cpu> <memory_gb> <disk_gb> <password> <sshport> <startport> <endport> [system]
```

创建过程会验证真实 root 密码 SSH 和 cloud-init 完成，默认总预算 600 秒，可用 `SSH_READY_TIMEOUT` 调整。超时返回失败并保留实例供排查，不会把仅开放 TCP 端口计为创建成功。

**参数说明：**

| 参数 | 说明 | 默认值 |
|------|------|--------|
| `name` | 虚拟机名称（小写字母数字和连字符） | `test` |
| `cpu` | CPU 核心数 | `1` |
| `memory_gb` | 内存（GB） | `1` |
| `disk_gb` | 磁盘大小（GB） | `10` |
| `password` | root 密码 | `123456` |
| `sshport` | 宿主机 SSH 映射端口 | `25000` |
| `startport` | 公网端口范围起始 | `34975` |
| `endport` | 公网端口范围结束 | `35000` |
| `system` | 操作系统 | `ubuntu` |

**支持的系统：**

| 系统标识 | 说明 | 镜像来源 |
|----------|------|----------|
| `ubuntu` | Ubuntu 22.04 LTS | pve_kvm_images(ubuntu22) → kvm_images(ubuntu22) → 官方 |
| `ubuntu24` | Ubuntu 24.04 LTS | pve_kvm_images(ubuntu24) → kvm_images(ubuntu24) → 官方 |
| `debian` | Debian 12 | pve_kvm_images(debian12) → kvm_images(debian12) → 官方 |
| `debian11` | Debian 11 | pve_kvm_images(debian11) → kvm_images(debian11) → 官方 |
| `almalinux` | AlmaLinux 9 | pve_kvm_images(almalinux9) → kvm_images(almalinux9) → 官方 |
| `rockylinux` | RockyLinux 9 | pve_kvm_images(rockylinux9) → kvm_images(rockylinux9) → 官方 |
| `centos` | CentOS 7 | pve_kvm_images(centos7) → kvm_images(centos7) → 官方 |
| `centos8-stream` | CentOS Stream 8 | pve_kvm_images(centos8-stream) → kvm_images(centos8-stream) → 官方 |
| `centos-stream` | CentOS Stream 9 | 官方上游（无组织预置镜像） |
| `opensuse` | openSUSE Leap 15.5 | pve_kvm_images(opensuse-leap-15) → kvm_images(opensuse-leap-15) → 官方 |

**示例：**

```bash
export noninteractive=true
./onevm.sh vm1 2 2 20 MyPassword 25000 34975 35000 debian
```

位置参数优先于 `VM_NAME`、`CPU`、`MEMORY_GB`、`DISK_GB`、`PASSWORD`、`SSH_PORT`、`START_PORT`、`END_PORT` 和 `SYSTEM`。资源统一创建在 `kubevirt-vms` 命名空间。

## 批量开设虚拟机

```bash
curl -sSL -o create_vm.sh https://raw.githubusercontent.com/oneclickvirt/kubevirt/main/scripts/create_vm.sh
chmod +x create_vm.sh
export noninteractive=true
./create_vm.sh
```

批量配置示例：

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

默认创建 1 台，名称前缀 `vm`，起始编号 1，1 核、1GB 内存、10GB 磁盘，SSH 从 25000 起，每台额外 26 个端口，从 35000 起，系统为 Ubuntu。可显式设置 `PASSWORD`，否则批量脚本生成密码。兼容旧开关 `AUTO_YES=y`。

## 查看所有虚拟机

```bash
curl -sSL -o listvms.sh https://raw.githubusercontent.com/oneclickvirt/kubevirt/main/scripts/listvms.sh
chmod +x listvms.sh
export noninteractive=true
./listvms.sh
```

## 创建虚拟机快照（DataVolume 克隆）

```bash
curl -sSL -o snapshotvm.sh https://raw.githubusercontent.com/oneclickvirt/kubevirt/main/scripts/snapshotvm.sh
chmod +x snapshotvm.sh
export noninteractive=true
./snapshotvm.sh vm1 vm1-snapshot-001
```

说明：

- 快照通过 CDI 从 `vm1-dv` 克隆出新的 DataVolume，不会直接创建新 VM。
- 默认拒绝对运行中的 VM 创建快照，避免数据不一致；如确认可接受风险，可设置 `ALLOW_RUNNING_SNAPSHOT=true`。
- 默认等待克隆完成，可用 `WAIT_SNAPSHOT=false` 改为提交任务后立即返回。

## 调整虚拟机资源

```bash
curl -sSL -o resizevm.sh https://raw.githubusercontent.com/oneclickvirt/kubevirt/main/scripts/resizevm.sh
chmod +x resizevm.sh
export noninteractive=true
./resizevm.sh vm1 4 8 40
```

说明：

- 参数依次为 `vmname cpu memory_gb disk_gb`，留空表示不调整对应资源，例如：`./resizevm.sh vm1 "" "" 40`。
- CPU/内存会更新 VM 模板；运行中的 VM 通常需要重启后完全生效，可设置 `RESTART_VM=true` 自动重启。
- 磁盘只支持扩容，且依赖 StorageClass 支持 PVC 扩容；虚拟机内文件系统可能仍需手动扩容。

## 删除单个虚拟机

```bash
curl -sSL -o deletevm.sh https://raw.githubusercontent.com/oneclickvirt/kubevirt/main/scripts/deletevm.sh
chmod +x deletevm.sh
export noninteractive=true
./deletevm.sh <name>
```

默认会保留该 VM 的快照 DataVolume，避免误删备份；如需一并删除，设置 `DELETE_SNAPSHOTS=true`。

## 常用管理命令

```bash
# 查看所有虚拟机状态
kubectl get vm -n kubevirt-vms

# 查看虚拟机实例（运行中的）
kubectl get vmi -n kubevirt-vms

# 查看数据卷导入进度
kubectl get dv -n kubevirt-vms

# 进入虚拟机串口控制台（Ctrl+] 退出）
virtctl console <vmname> -n kubevirt-vms

# 启动/停止/重启虚拟机
virtctl start <vmname> -n kubevirt-vms
virtctl stop <vmname> -n kubevirt-vms
virtctl restart <vmname> -n kubevirt-vms
```

## 删除多台虚拟机

确认名称后使用 `deletevm.sh`，避免分别删除 VM/PVC 后遗留资源；默认保留快照克隆，设置 `DELETE_SNAPSHOTS=true` 才一并删除。

```bash
for vm in vm1 vm2; do
  noninteractive=true ./deletevm.sh "$vm" || break
done
```

## 宿主机重启后恢复

K3s 开机自启。先检查服务与虚拟机状态，再启动已停止的实例：

```bash
systemctl status k3s
kubectl get pods -n kubevirt
kubectl get vm -n kubevirt-vms
virtctl start vm1 -n kubevirt-vms
```

旧实例映射失效时，确认 vmlog 后执行 `update-port-rules.sh vm1`；新建的 NodePort Service 会自动跟随替换后的 Pod 地址。

网络模式、镜像来源和连接记录详见[说明与排障](kubevirt_qa.md)。
