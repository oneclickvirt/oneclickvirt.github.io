---
outline: deep
---

# 前言

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

## 无交互约定

所有脚本统一支持以下方式进入无交互模式：

```bash
export noninteractive=true
```

开启后，脚本不会等待人工输入：安装和批量创建会使用默认值或已传入的参数；删除和卸载会把该变量视为明确确认。各脚本原有的专用环境变量（如 `VM_COUNT`、`QEMU_FORCE_DELETE`、`QEMU_FORCE_UNINSTALL`）仍然兼容。

## 环境安装

```bash
bash <(curl -sSL https://raw.githubusercontent.com/oneclickvirt/qemu/main/qemuinstall.sh)
```

**支持环境变量（无交互）：**

```bash
export noninteractive=true
# 自定义镜像存储路径（默认 /var/lib/libvirt/images）
export QEMU_IMAGES_PATH=/data/vm-images
bash <(curl -sSL https://raw.githubusercontent.com/oneclickvirt/qemu/main/qemuinstall.sh)
```

## 环境变量汇总

| 脚本 | 环境变量 | 说明 | 示例值 |
|------|----------|------|--------|
| 全部 | `noninteractive` | 统一无交互开关 | `true` |
| `qemuinstall.sh` | `QEMU_IMAGES_PATH` | 镜像存储路径 | `/data/images` |
| `qemuuninstall.sh` | `QEMU_FORCE_UNINSTALL` | 跳过卸载确认 | `yes` |
| `oneqemu.sh` | `VM_NAME` | 虚拟机名称 | `vm1` |
| `oneqemu.sh` | `VM_CPU` | CPU 核数 | `1` |
| `oneqemu.sh` | `VM_MEMORY` | 内存（MB） | `1024` |
| `oneqemu.sh` | `VM_DISK` | 磁盘（GB） | `20` |
| `oneqemu.sh` | `VM_PASSWORD` | root 密码（为空则自动生成） | `ChangeMe-123` |
| `oneqemu.sh` | `VM_SSH_PORT` | SSH 映射端口 | `25001` |
| `oneqemu.sh` | `VM_START_PORT` | 额外端口起始 | `35001` |
| `oneqemu.sh` | `VM_END_PORT` | 额外端口结束 | `35025` |
| `oneqemu.sh` | `VM_SYSTEM` | 操作系统类型 | `debian12` |
| `create_qemu.sh` | `VM_COUNT` | 创建虚拟机数量 | `3` |
| `create_qemu.sh` | `VM_MEMORY` | 每台内存（MB） | `1024` |
| `create_qemu.sh` | `VM_CPU` | 每台 CPU 核数 | `1` |
| `create_qemu.sh` | `VM_DISK` | 每台磁盘（GB） | `20` |
| `create_qemu.sh` | `VM_SYSTEM` | 操作系统类型 | `debian12` |
| `delete_qemu.sh` | `VM_NAME` | 要删除的虚拟机名 | `vm1` |
| `delete_qemu.sh` | `QEMU_FORCE_DELETE` | 跳过删除确认 | `yes` |

## 卸载 QEMU/KVM 环境

一键卸载 QEMU/KVM 全套环境，包括所有虚拟机、磁盘镜像、网络配置、systemd 服务、软件包：

```bash
bash <(curl -sSL https://raw.githubusercontent.com/oneclickvirt/qemu/main/qemuuninstall.sh)
```

脚本会在执行前要求输入 `yes` 确认，操作不可逆。

**支持环境变量或参数跳过确认（无交互）：**

```bash
# 方式一：环境变量
export noninteractive=true
export QEMU_FORCE_UNINSTALL=yes
bash <(curl -sSL https://raw.githubusercontent.com/oneclickvirt/qemu/main/qemuuninstall.sh)

# 方式二：命令行参数
curl -sSL https://raw.githubusercontent.com/oneclickvirt/qemu/main/qemuuninstall.sh -o qemuuninstall.sh
bash qemuuninstall.sh -y
```

## 安装检查

```bash
virsh list --all
```

安装时间较长时建议在 screen 或 tmux 中运行，避免 SSH 中断。

## 国内下载入口

上述 GitHub Raw 安装、卸载及开设脚本的地址均可加上 `https://cdn.spiritlhl.net/` 前缀。例如安装：

```bash
bash <(curl -sSL https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/qemu/main/qemuinstall.sh)
```

无需加速时使用原始 GitHub 地址；`export WITHOUTCDN=TRUE` 可禁用脚本内部 CDN 探测。
