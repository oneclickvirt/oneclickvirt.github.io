---
outline: deep
---

## Repo

https://github.com/oneclickvirt/webvirtcloud

[![hits](https://hits.spiritlhl.net/webvirtcloud.svg?action=hit&title=hits&title_bg=%23555555&count_bg=%233aebee&edge_flat=false)](https://hits.spiritlhl.net)

---

### Controller 控制端安装

> **最低配置要求**：  
> - CPU: 1 核  
> - 内存: 1 GB  
> - 硬盘: 空余 10 GB  

#### 默认登录信息 Login Info

- 用户名 / Username: `admin@webvirt.cloud`  
- 密码 / Password: `admin`  

#### 面板地址 Panel Access

- 用户面板 / Client Panel: `https://192-168-0-114.nip.io`  
- 管理后台 / Admin Panel: `https://192-168-0-114.nip.io/admin`  

> 请将 `192.168.0.114` 替换为你的公网 IP，以获取真实可访问地址。  
> Replace `192.168.0.114` with your actual **public IP address**.

#### 安装命令 Install Command

```bash
curl -slk https://raw.githubusercontent.com/oneclickvirt/webvirtcloud/main/scripts/install_webvirt_cloud.sh -o install_webvirt_cloud.sh \
&& chmod +x install_webvirt_cloud.sh \
&& bash install_webvirt_cloud.sh
```

### Hypervisor 计算节点安装

Hypervisor 和 Controller 不能在同一个虚拟机上进行安装，网络会出现冲突问题。

The Hypervisor and Controller cannot be installed on the same virtual machine; the network will have conflict issues.

#### 环境检测 

> **建议配置**：
> - CPU: 2 核  
> - 内存: 4 GB  
> - 硬盘: 空余 40 GB  
> - 实际使用建议更高配置，测试环境只够开4台最小的虚拟机
> - 服务器需要支持KVM嵌套虚拟化，如何测试建议使用 https://github.com/oneclickvirt/ecs 进行测试，需要检测项目```VM-x/AMD-V/Hyper-V```是启用的
> - 跳过env检测安装，直接使用二进制文件，无需安装依赖

> **Recommended Configuration**:  
> - CPU: 2 cores  
> - RAM: 4 GB  
> - Disk: 40 GB free space  
> - Higher specs are recommended for actual usage; this minimal setup is only sufficient to run 4 smallest VM in a test environment  
> - The server must support KVM nested virtualization(Need ```VM-x/AMD-V/Hyper-V``` is enabled). To test compatibility, it's recommended to use: https://github.com/oneclickvirt/ecs  
> - Skip the env detection installation, use the binary directly, no need to install dependencies

```shell
curl -L https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/ecs/master/goecs.sh -o goecs.sh && chmod +x goecs.sh && ./goecs.sh install
```

选择选项8进行性能测试: ```./goecs```

Select option 8 for performance testing: ```./goecs -l=en```

#### 下载并准备安装脚本

```bash
curl -slk https://raw.githubusercontent.com/oneclickvirt/webvirtcloud/main/scripts/install_hypervisor.sh -o install_hypervisor.sh \
&& chmod +x install_hypervisor.sh
```

#### 执行安装命令（替换 Controller IP）

请将 `x.x.x.x` 替换为你的 **Controller 控制端的实际 IP 地址**：

```bash
bash install_hypervisor.sh x.x.x.x
```

### 安装中可能出现的问题与提示

安装过程中可能会自动退出并提示 NetworkManager 版本问题，如下所示：

```text
Connection 'eth0' (bed050e9-ff49-4665-8112-24ddf2a1cd3c) successfully deleted.
Warning: nmcli (1.48.10) and NetworkManager (1.42.2) versions don't match. Restarting NetworkManager is advised.
Error: Failed to add 'br-ext' connection: connection.autoconnect-ports: unknown property
```

> **解决方法**：  
> 重启服务器后重新执行安装命令  
> Reboot your server, then **run the install command again**.

### 安装耗时提示

- 整个过程大约耗时 **20~25 分钟**  
- 大部分时间用于下载 `finnix-125.iso`：  
  `/var/lib/libvirt/isos/finnix-125.iso`
- 该部分无法加速，**建议使用 tmux 或 screen** 等工具防止中断  

### 添加计算节点到控制面板

安装完成后会生成一个 **Token**，用于在控制端（Admin 面板）中添加计算节点：

路径：  
`Admin Panel > Computers > Add`

### 纳管节点错误排查

Controller端：

```
telnet <node ip> 8884
```

Hypervisor端：

```
journalctl -xeu webvirtcompute
```

## Thanks

https://webvirt.cloud/
