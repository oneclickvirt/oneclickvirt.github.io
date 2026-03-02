---
outline: deep
---

# 前言

两种开设方式

## 单独开设

- 只生成一台 KVM 虚拟机（通过 KubeVirt VirtualMachine 资源），自动判断国际服务器还是国内服务器
- 可配置绑定独立的 IPv6 地址（需宿主机已有公网 IPv6 且安装脚本已配置 IPv6 网络）
- 支持 x86_64 和 ARM64 架构的服务器

### 下载脚本

国际

```shell
wget -q https://raw.githubusercontent.com/oneclickvirt/kubevirt/main/scripts/onekubevirt.sh
chmod +x onekubevirt.sh
```

国内

```shell
wget -q https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/kubevirt/main/scripts/onekubevirt.sh
chmod +x onekubevirt.sh
```

### 示例

运行支持的变量如下

```bash
./onekubevirt.sh <name> <cpu> <memory_mb> <disk_gb> <password> <sshport> <startport> <endport> [independent_ipv6:y/n] [system]
```

目前 system 仅支持选择：

- debian
- ubuntu

默认不填则是 debian

```shell
./onekubevirt.sh vm1 1 1024 10 MyPassword 25000 34975 35000 n debian
```

以下为开设的示例虚拟机的信息：

| 属性 | 值 |
|------|----|
| 虚拟机名字 | vm1 |
| SSH 登录的用户名 | root |
| SSH 登录的密码 | MyPassword |
| CPU 核数 | 1 |
| 内存大小 | 1024MB |
| 硬盘大小 | 10GB |
| SSH 端口 | 25000 |
| 内外网映射端口一致的区间 | 34975 到 35000 |
| 系统 | debian |
| 是否绑定独立的 IPv6 地址 | N |

### 相关操作

查看所有虚拟机

```shell
kubectl get vmi -n default
```

查看虚拟机状态

```shell
kubectl get vm vm1 -n default
```

启动虚拟机

```shell
virtctl start vm1 -n default
```

停止虚拟机

```shell
virtctl stop vm1 -n default
```

通过 SSH 连接虚拟机控制台

```shell
virtctl console vm1 -n default
```

要退出控制台请按 `Ctrl + ]`。

删除示例

```shell
kubectl delete vm vm1 -n default
kubectl delete pvc vm1-pvc -n default
```

## 批量开设

- 批量多次运行继承配置生成
- 自动递增虚拟机名（vm1, vm2, ...）、SSH 端口、公网端口
- 虚拟机信息记录到 `vmlog` 文件
- 生成多个时为避免 SSH 连接中断建议在 screen 中执行
- 支持 x86_64 和 ARM64 架构的服务器

### 运行

国际

```shell
wget -q https://raw.githubusercontent.com/oneclickvirt/kubevirt/main/scripts/create_kubevirt.sh
chmod +x create_kubevirt.sh
./create_kubevirt.sh
```

国内

```shell
wget -q https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/kubevirt/main/scripts/create_kubevirt.sh
chmod +x create_kubevirt.sh
./create_kubevirt.sh
```

### 查询批量开设的信息

```shell
cat vmlog
```

输出格式

```
虚拟机名字 SSH端口 登陆的root密码 核数 内存 硬盘 外网端口起 外网端口止
```

一行一个虚拟机对应的信息

## 删除所有虚拟机和镜像

```shell
kubectl delete vm --all -n default
kubectl delete pvc --all -n default
rm -rf vmlog
```

## 宿主机重启后恢复

k3s 服务开机自启，重启后执行：

```shell
# 检查 k3s 状态
systemctl status k3s

# 检查 KubeVirt Pod 状态
kubectl get pods -n kubevirt

# 启动所有已停止的虚拟机
for vm in $(kubectl get vm -n default --no-headers -o custom-columns=':metadata.name'); do
  virtctl start "$vm" -n default 2>/dev/null
done
```
