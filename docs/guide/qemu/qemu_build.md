---
outline: deep
---

# QEMU/KVM 实例开设与管理

## 开设单个虚拟机

```bash
# 下载脚本
curl -sSL -o oneqemu.sh https://raw.githubusercontent.com/oneclickvirt/qemu/main/scripts/oneqemu.sh
chmod +x oneqemu.sh

# 用法 (两种格式均支持):
# ./oneqemu.sh <name> <cpu> <memory_mb> <disk_gb> <password> <sshport> <startport> <endport> [system]
# ./oneqemu.sh <name> <cpu> <memory_mb> <disk_gb> <password> <sshport> <startport> <endport> <extra_flag(y/n)> [system]

# 示例: 创建名为 vm1 的 Debian 虚拟机，1核 1024MB 20GB，SSH端口25001，额外端口35001-35025
./oneqemu.sh vm1 1 1024 20 MyPassword 25001 35001 35025 debian
# 示例: 第 9 个参数为附加标志（y/n），第 10 个参数为系统名
./oneqemu.sh vm1 1 1024 10 MyPassword 25000 34975 35000 n debian13
```

| 参数 | 说明 | 默认值 |
|------|------|--------|
| name | 虚拟机名称 | vm1 |
| cpu | CPU 核数 | 1 |
| memory_mb | 内存限制（MB） | 1024 |
| disk_gb | 磁盘大小（GB） | 20 |
| password | root 密码 | 自动生成 |
| sshport | 宿主机 SSH 映射端口 | 25001 |
| startport | 额外端口范围起始 | 35001 |
| endport | 额外端口范围结束 | 35025 |
| system | 系统类型（第 9 或第 10 个参数） | debian |

**支持的 system 值：**

| 系统名 | 支持版本号 | 示例 |
|--------|-----------|------|
| `debian` | 10 11 12 13 | `debian` `debian12` `debian13` |
| `ubuntu` | 18 20 22 24 | `ubuntu` `ubuntu22` `ubuntu24` |
| `almalinux` | 8 9 | `almalinux9`（`alma9` 亦可） |
| `rockylinux` | 8 9 | `rockylinux9`（`rocky9` 亦可） |
| `openeuler` | 22 | `openeuler` |

> system 名称不区分大小写，支持带 `-` 或 `_` 分隔符（如 `debian-13`、`ubuntu_22`），均可自动规范化。

**单机创建也支持环境变量（位置参数优先）：**

```bash
export noninteractive=true
export VM_NAME=vm1
export VM_CPU=1
export VM_MEMORY=1024
export VM_DISK=20
export VM_PASSWORD='ChangeMe-123'
export VM_SSH_PORT=25001
export VM_START_PORT=35001
export VM_END_PORT=35025
export VM_SYSTEM=debian12
./oneqemu.sh
```

## 批量开设虚拟机

```bash
curl -sSL -o create_qemu.sh https://raw.githubusercontent.com/oneclickvirt/qemu/main/scripts/create_qemu.sh
chmod +x create_qemu.sh
./create_qemu.sh
```

交互式脚本，自动递增虚拟机名（vm1, vm2, ...）、SSH 端口、公网端口，虚拟机信息记录到 `vmlog` 文件。
批量创建会使用批处理锁串行执行；若单台创建失败，脚本会停止后续创建，避免名称和端口继续漂移。

**支持命令行参数（非交互）：**

```bash
# ./create_qemu.sh <数量> <内存MB> <CPU> <磁盘GB> <系统类型>
./create_qemu.sh 3 1024 1 20 debian12
```

**支持环境变量（无交互一键批量创建）：**

```bash
export noninteractive=true
export VM_COUNT=3          # 虚拟机数量
export VM_MEMORY=1024      # 每台内存 MB
export VM_CPU=1            # 每台 CPU 核数
export VM_DISK=20          # 每台磁盘 GB
export VM_SYSTEM=debian12  # 操作系统类型
./create_qemu.sh
```

> **说明：** 脚本不会阻塞等待 cloud-init 完成。DHCP 预留和端口转发规则在 VM 启动前已配置完毕，cloud-init 在后台运行；VM 保持运行，SSH 就绪后即可连接。可通过以下命令查看初始化进度：
> ```bash
> tail -f /tmp/qemu-init-<vm_name>.log
> ```

## 查看与管理虚拟机

```bash
virsh list --all                    # 查看所有虚拟机
virsh console <name>                # 进入虚拟机控制台（Ctrl+] 退出）
virsh start <name>                  # 启动虚拟机
virsh shutdown <name>               # 优雅关闭虚拟机
virsh destroy <name>                # 强制关闭虚拟机
virsh reboot <name>                 # 重启虚拟机
virsh dominfo <name>                # 查看虚拟机信息
virsh domifaddr <name>              # 查看虚拟机 IP 地址
```

也可以使用项目脚本进行无交互管理：

```bash
curl -sSL -o manage_qemu.sh https://raw.githubusercontent.com/oneclickvirt/qemu/main/scripts/manage_qemu.sh
chmod +x manage_qemu.sh

# 查询全部或单台虚拟机（包含 vmlog、状态、MAC、IP、端口等信息）
./manage_qemu.sh info all
./manage_qemu.sh info vm1

# 创建快照
./manage_qemu.sh snapshot vm1 before-upgrade

# 调整 CPU 和内存（内存单位 MB）
./manage_qemu.sh set-resources vm1 2 2048
```

## 删除单个虚拟机

```bash
curl -sSL -o delete_qemu.sh https://raw.githubusercontent.com/oneclickvirt/qemu/main/scripts/delete_qemu.sh
chmod +x delete_qemu.sh
./delete_qemu.sh <vm_name>
# 跳过确认直接删除
./delete_qemu.sh vm1 -y
```

**支持环境变量（无交互）：**

```bash
export VM_NAME=vm1
export noninteractive=true
export QEMU_FORCE_DELETE=yes
./delete_qemu.sh
```

脚本会自动清理：虚拟机定义、磁盘镜像、DHCP 预留、nftables/iptables 端口转发规则、日志记录。
删除成功后会同步清理 `/root/vmlog` 和本地 SQLite 状态库中的 VM 记录。

## 删除多台虚拟机

对已确认的名称逐台调用删除脚本，可同步清理 DHCP、端口映射、vmlog 和 SQLite 状态：

```bash
for vm in vm1 vm2; do
  ./delete_qemu.sh "$vm" -y || break
done
```

如需删除整个环境和全部虚拟机磁盘，使用安装章节中的卸载脚本。

## 宿主机重启后重启所有虚拟机

QEMU/KVM 支持通过 libvirt 设置虚拟机自启动：

```shell
# 为指定虚拟机设置开机自启
virsh autostart vm1

# 查看自启动状态
virsh dominfo vm1 | grep Autostart

# 取消自启动
virsh autostart vm1 --disable
```

或者手动启动所有已停止的虚拟机：

```shell
for vm in $(virsh list --all --name); do virsh start "$vm" 2>/dev/null; done
```

网络模式、镜像来源和连接记录详见[说明与排障](qemu_qa.md)。
