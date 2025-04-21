---
outline: deep
---

## WebVirtCloud Installation Guide

[![hits](https://hits.spiritlhl.net/webvirtcloud.svg?action=hit&title=hits&title_bg=%23555555&count_bg=%233aebee&edge_flat=false)](https://hits.spiritlhl.net)

Repository: https://github.com/oneclickvirt/webvirtcloud

## Controller Installation

### System Requirements

**Minimum Configuration:**
- CPU: 1 core
- Memory: 1 GB RAM
- Disk: 10 GB free space

### Default Login Information
- Username: `admin@webvirt.cloud`
- Password: `admin`

### Access URLs
- Client Panel: `https://192-168-0-114.nip.io`
- Admin Panel: `https://192-168-0-114.nip.io/admin`

> **Note:** Replace `192.168.0.114` with your actual public IP address to get the correct access URL.

### Installation Command
```bash
curl -slk https://raw.githubusercontent.com/oneclickvirt/webvirtcloud/main/scripts/install_webvirt_cloud.sh -o install_webvirt_cloud.sh \
&& chmod +x install_webvirt_cloud.sh \
&& bash install_webvirt_cloud.sh
```

## Hypervisor Installation

> **Important:** The Hypervisor and Controller cannot be installed on the same virtual machine; network conflicts will occur.

### System Requirements
**Recommended Configuration:**
- CPU: 2 cores
- Memory: 4 GB RAM
- Disk: 40 GB free space

> **Additional Notes:**
> - Higher specifications are recommended for production use. This minimal setup is only sufficient to run 4 small VMs in a test environment.
> - The server must support KVM nested virtualization with VM-x/AMD-V/Hyper-V enabled.
> - The installation uses binary files directly, skipping dependency installation.

### Environment Testing

To test if your server supports KVM nested virtualization:
```bash
curl -L https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/ecs/master/goecs.sh -o goecs.sh && chmod +x goecs.sh && ./goecs.sh install
```

### Hypervisor Installation Steps

1. Download the installation script:
   ```bash
   curl -slk https://raw.githubusercontent.com/oneclickvirt/webvirtcloud/main/scripts/install_hypervisor.sh -o install_hypervisor.sh \
   && chmod +x install_hypervisor.sh
   ```

2. Run the installation (replace with your Controller IP):
   ```bash
   bash install_hypervisor.sh x.x.x.x
   ```
   > Replace `x.x.x.x` with your Controller's actual IP address.

3. Panel node 
   After the execution is completed, there will be a prompt that needs to be filled in the Controller panel side of the content.
   Panel side to fill in the Hostname is the IPV4 address of the current computing node, as well as to fill in the Token to identify the node.

## Troubleshooting

### NetworkManager Version Issue
You might see this error during installation:

```
Connection 'eth0' (bed050e9-ff49-4665-8112-24ddf2a1cd3c) successfully deleted.
Warning: nmcli (1.48.10) and NetworkManager (1.42.2) versions don't match. Restarting NetworkManager is advised.
Error: Failed to add 'br-ext' connection: connection.autoconnect-ports: unknown property
```

**Solution:** Reboot your server, then run the installation command again.

### Installation Time Notes
- The entire process takes approximately **20-25 minutes**.
- Most time is spent downloading `finnix-125.iso` to `/var/lib/libvirt/isos/finnix-125.iso`.
- This download cannot be accelerated; use `tmux` or `screen` to prevent interruption.

### Adding Compute Node to Controller Panel
After installation, a **Token** will be generated for adding the compute node to the Controller:

Path: `Admin Panel > Computers > Add`

### Troubleshooting Node Connection Issues
From Controller:
```bash
telnet <node ip> 8884
```

From Hypervisor:
```bash
journalctl -xeu webvirtcompute
```

### Restarting Docker Containers After Controller Reboot
If Docker containers don't auto-restart after a system reboot, run:
```bash
docker start $(docker ps -a -q)
```

## Credits
https://webvirt.cloud/

## WebVirtCloud 安装指南

[![hits](https://hits.spiritlhl.net/webvirtcloud.svg?action=hit&title=hits&title_bg=%23555555&count_bg=%233aebee&edge_flat=false)](https://hits.spiritlhl.net)

仓库地址: https://github.com/oneclickvirt/webvirtcloud

## 控制端安装

### 系统要求

**最低配置要求:**
- CPU: 1 核
- 内存: 1 GB RAM
- 硬盘: 空余 10 GB

### 默认登录信息
- 用户名: `admin@webvirt.cloud`
- 密码: `admin`

### 面板地址
- 用户面板: `https://192-168-0-114.nip.io`
- 管理后台: `https://192-168-0-114.nip.io/admin`

> **注意:** 请将 `192.168.0.114` 替换为你的公网 IP，以获取真实可访问地址。

### 安装命令
```bash
curl -slk https://raw.githubusercontent.com/oneclickvirt/webvirtcloud/main/scripts/install_webvirt_cloud.sh -o install_webvirt_cloud.sh \
&& chmod +x install_webvirt_cloud.sh \
&& bash install_webvirt_cloud.sh
```

## 计算节点安装

> **重要提示:** Hypervisor 和 Controller 不能在同一虚拟机上安装，否则网络会出现冲突。

### 系统要求
**建议配置:**
- CPU: 2 核
- 内存: 4 GB RAM
- 硬盘: 空余 40 GB

> **额外说明:**
> - 实际使用建议更高配置，测试环境只够开 4 台最小的虚拟机。
> - 服务器需要支持 KVM 嵌套虚拟化，需要检测项目 `VM-x/AMD-V/Hyper-V` 是启用的。
> - 跳过 env 检测安装，直接使用二进制文件，无需安装依赖。

### 环境检测

检测服务器是否支持 KVM 嵌套虚拟化：
```bash
curl -L https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/ecs/master/goecs.sh -o goecs.sh && chmod +x goecs.sh && ./goecs.sh install
```

### 计算节点安装步骤

1. 下载安装脚本：
   ```bash
   curl -slk https://raw.githubusercontent.com/oneclickvirt/webvirtcloud/main/scripts/install_hypervisor.sh -o install_hypervisor.sh \
   && chmod +x install_hypervisor.sh
   ```

2. 执行安装（替换为你的 Controller IP）：
   ```bash
   bash install_hypervisor.sh x.x.x.x
   ```
   > 请将 `x.x.x.x` 替换为你的 Controller 控制端的实际 IP 地址。

3. 面板纳管节点
   执行完毕后会有提示需要在Controller面板端需要填写的内容。
   面板端要填入Hostname的是当前计算节点的IPV4地址，还有要填入Token识别节点。

## 问题排查

### NetworkManager 版本问题
安装过程中可能会出现以下错误：

```
Connection 'eth0' (bed050e9-ff49-4665-8112-24ddf2a1cd3c) successfully deleted.
Warning: nmcli (1.48.10) and NetworkManager (1.42.2) versions don't match. Restarting NetworkManager is advised.
Error: Failed to add 'br-ext' connection: connection.autoconnect-ports: unknown property
```

**解决方法:** 重启服务器后重新执行安装命令。

### 安装耗时提示
- 整个过程大约耗时 **20~25 分钟**。
- 大部分时间用于下载 `finnix-125.iso` 至 `/var/lib/libvirt/isos/finnix-125.iso`。
- 该部分无法加速，**建议使用 tmux 或 screen** 等工具防止中断。

### 添加计算节点到控制面板
安装完成后会生成一个 **Token**，用于在控制端（Admin 面板）中添加计算节点：

路径: `Admin Panel > Computers > Add`

### 纳管节点错误排查
在控制端执行：
```bash
telnet <node ip> 8884
```

在计算节点执行：
```bash
journalctl -xeu webvirtcompute
```

### Controller 重启后 Docker 容器重启
如果 Docker 容器在系统重启后没有自动重启，执行以下命令：
```bash
docker start $(docker ps -a -q)
```

## 鸣谢
https://webvirt.cloud/
