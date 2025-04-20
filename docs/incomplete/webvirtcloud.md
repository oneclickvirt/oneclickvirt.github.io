---
outline: deep
---

## WebVirtCloud Installation Guide
[![hits](https://hits.spiritlhl.net/webvirtcloud.svg?action=hit&title=hits&title_bg=%23555555&count_bg=%233aebee&edge_flat=false)](https://hits.spiritlhl.net)

Repository: https://github.com/oneclickvirt/webvirtcloud

## Controller Installation 控制端安装

### System Requirements 系统要求
**Minimum Configuration 最低配置要求:**
- CPU: 1 core / 1 核
- Memory: 1 GB RAM / 内存: 1 GB
- Disk: 10 GB free space / 硬盘: 空余 10 GB

### Default Login Information 默认登录信息
- Username 用户名: `admin@webvirt.cloud`
- Password 密码: `admin`

### Access URLs 面板地址
- Client Panel 用户面板: `https://192-168-0-114.nip.io`
- Admin Panel 管理后台: `https://192-168-0-114.nip.io/admin`

> **Note 注意:** Replace `192.168.0.114` with your actual public IP address to get the correct access URL.  
> 请将 `192.168.0.114` 替换为你的公网 IP，以获取真实可访问地址。

### Installation Command 安装命令
```bash
curl -slk https://raw.githubusercontent.com/oneclickvirt/webvirtcloud/main/scripts/install_webvirt_cloud.sh -o install_webvirt_cloud.sh \
&& chmod +x install_webvirt_cloud.sh \
&& bash install_webvirt_cloud.sh
```

## Hypervisor Installation 计算节点安装

> **Important 重要提示:** The Hypervisor and Controller cannot be installed on the same virtual machine; network conflicts will occur.  
> Hypervisor 和 Controller 不能在同一个虚拟机上进行安装，否则网络会出现冲突问题。

### System Requirements 系统要求
**Recommended Configuration 建议配置:**
- CPU: 2 cores / 2 核
- Memory: 4 GB RAM / 内存: 4 GB
- Disk: 40 GB free space / 硬盘: 空余 40 GB

> **Additional Notes 额外说明:**
> - Higher specifications are recommended for production use. This minimal setup is only sufficient to run 4 small VMs in a test environment.  
>   实际使用建议更高配置，测试环境只够开4台最小的虚拟机。
> - The server must support KVM nested virtualization with VM-x/AMD-V/Hyper-V enabled.  
>   服务器需要支持KVM嵌套虚拟化，需要检测项目`VM-x/AMD-V/Hyper-V`是启用的。
> - The installation uses binary files directly, skipping dependency installation.  
>   跳过env检测安装，直接使用二进制文件，无需安装依赖。

### Environment Testing 环境检测

To test if your server supports KVM nested virtualization:
(检测服务器是否支持KVM嵌套虚拟化)

```bash
curl -L https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/ecs/master/goecs.sh -o goecs.sh && chmod +x goecs.sh && ./goecs.sh install
```

- For performance testing in English: `./goecs -l=en` (select option 8)
- 性能测试中文版：`./goecs` (选择选项8)

### Hypervisor Installation Steps 计算节点安装步骤

1. Download the installation script 下载安装脚本:
   ```bash
   curl -slk https://raw.githubusercontent.com/oneclickvirt/webvirtcloud/main/scripts/install_hypervisor.sh -o install_hypervisor.sh \
   && chmod +x install_hypervisor.sh
   ```

2. Run the installation (replace with your Controller IP) 执行安装命令（替换 Controller IP）:
   ```bash
   bash install_hypervisor.sh x.x.x.x
   ```
   > Replace `x.x.x.x` with your Controller's actual IP address.  
   > 请将 `x.x.x.x` 替换为你的 Controller 控制端的实际 IP 地址。

## Troubleshooting 问题排查

### NetworkManager Version Issue NetworkManager 版本问题
You might see this error during installation:
安装过程中可能会自动退出并提示 NetworkManager 版本问题:

```
Connection 'eth0' (bed050e9-ff49-4665-8112-24ddf2a1cd3c) successfully deleted.
Warning: nmcli (1.48.10) and NetworkManager (1.42.2) versions don't match. Restarting NetworkManager is advised.
Error: Failed to add 'br-ext' connection: connection.autoconnect-ports: unknown property
```

**Solution 解决方法:**
Reboot your server, then run the installation command again.  
重启服务器后重新执行安装命令。

### Installation Time Notes 安装耗时提示
- The entire process takes approximately **20-25 minutes**.  
  整个过程大约耗时 **20~25 分钟**。
- Most time is spent downloading `finnix-125.iso` to `/var/lib/libvirt/isos/finnix-125.iso`.  
  大部分时间用于下载 `finnix-125.iso` 至 `/var/lib/libvirt/isos/finnix-125.iso`。
- This download cannot be accelerated; use `tmux` or `screen` to prevent interruption.  
  该部分无法加速，**建议使用 tmux 或 screen** 等工具防止中断。

### Adding Compute Node to Controller Panel 添加计算节点到控制面板
After installation, a **Token** will be generated for adding the compute node to the Controller:  
安装完成后会生成一个 **Token**，用于在控制端（Admin 面板）中添加计算节点：

Path 路径: `Admin Panel > Computers > Add`

### Troubleshooting Node Connection Issues 纳管节点错误排查
From Controller 在控制端执行:
```bash
telnet <node ip> 8884
```

From Hypervisor 在Hypervisor端执行:
```bash
journalctl -xeu webvirtcompute
```

### Restarting Docker Containers After Controller Reboot Controller重启后Docker容器重启
If Docker containers don't auto-restart after a system reboot, run:  
执行以下命令重启所有容器:
```bash
docker start $(docker ps -a -q)
```

## Credits 鸣谢
https://webvirt.cloud/
