### 准备环境

在 `/root` 目录下按顺序执行以下命令：

```shell
# 安装基础工具
apt update
apt install -y snapd libguestfs-tools wimtools rsync libhivex-bin libwin-hivex-perl genisoimage || apt install -y mkisofs

# 安装 distrobuilder（用于打包 Windows ISO）
snap install distrobuilder --classic

# 下载原版 Windows Server 2022 ISO
wget https://down.idc.wiki/ISOS/Windows/Server%202022/zh-cn_windows_server_2022_x64_dvd_6c73507d.iso

# 使用 distrobuilder 重新打包为 Incus 支持的 ISO
distrobuilder repack-windows \
  --windows-arch=amd64 \
  zh-cn_windows_server_2022_x64_dvd_6c73507d.iso \
  zh-cn_windows_server_2022_x64_dvd_6c73507d.incus.iso

# 清理原 ISO
rm -f zh-cn_windows_server_2022_x64_dvd_6c73507d.iso
```

### 检查 Incus 驱动

确保 `incus info` 输出中含有 `driver: qemu`，否则无法创建 VM：

```shell
incus info | grep -i driver:
# 正确示例：
# driver: qemu
```

若显示 `driver: lxc`，请在 `/etc/incus/daemon.conf` 中调整为 `driver = qemu` 并重启 Incus 服务。

### 1. 创建 VM 并挂载安装 ISO

```shell
# 初始化空 VM
incus init win22vm --empty --vm

# 调整根盘大小、CPU、内存
incus config device override win22vm root size=30GiB
incus config set win22vm limits.cpu=3
incus config set win22vm limits.memory=4GiB

# 添加 TPM 设备（Secure Boot/BitLocker 支持）
incus config device add win22vm vtpm tpm path=/dev/tpm0

# 挂载安装 ISO，设为第一启动项
incus config device add win22vm install disk \
  source=/root/zh-cn_windows_server_2022_x64_dvd_6c73507d.incus.iso \
  boot.priority=10
```

### 启动 VM 并通过 SPICE+HTML5 浏览器安装

```shell
# 安装浏览器访问所需组件
apt update
apt install -y spice-html5 websockify

# 启动 VM（此时 VM 会自动使用 Spice 输出）
incus start win22vm

#incus console win22vm --type=vga

# 启动 WebSocket 代理，将 Spice Socket 转为 WebSocket
# 使用 hostname -I 取第一个 IP，供提示使用
SERVER_IP=$(hostname -I | awk '{print $1}')
nohup websockify --web /usr/share/spice-html5 6080 \
  --unix-target=/run/incus/win22vm/qemu.spice \
  > /var/log/websockify-win22vm.log 2>&1 &

# 输出访问提示
echo "请在浏览器中访问："
echo "    https://${SERVER_IP}:6080/spice_auto.html?port=6080"
```

```shell
# 安装完成后，先在控制台关闭/退出 Windows，
# 然后移除 ISO 设备，保证下次从硬盘启动
incus config device remove win22vm install

# 再次启动 VM
incus start win22vm
```

### 在浏览器中访问

1. 打开浏览器，访问 `https://<上面获取的 SERVER_IP>:6080/spice_auto.html?port=6080`
2. 你将看到 Windows 安装或已安装系统的 SPICE 界面，无需额外客户端。
