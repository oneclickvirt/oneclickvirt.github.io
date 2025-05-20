### 准备环境

在 `/root` 目录下按顺序执行以下命令：

```shell
apt update
apt install -y snapd libguestfs-tools wimtools rsync libhivex-bin libwin-hivex-perl genisoimage || apt install -y mkisofs
snap install distrobuilder --classic
wget https://down.idc.wiki/ISOS/Windows/Windows%2010/Windows%2010%2021H2%20%28amd64%29.iso -O win.iso
distrobuilder repack-windows \
  --windows-arch=amd64 \
  win.iso \
  win.incus.iso
```

https://linuxcontainers.org/distrobuilder/docs/latest/tutorials/use/#repack-windows-iso

```shell
rm -f win.iso
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
incus init winvm --empty --vm

# 调整根盘大小、CPU、内存
incus config device override winvm root size=30GiB
incus config set winvm limits.cpu=3
incus config set winvm limits.memory=4GiB

# 添加 TPM 设备（Secure Boot/BitLocker 支持）
incus config device add winvm vtpm tpm path=/dev/tpm0

# 挂载安装 ISO，设为第一启动项
incus config device add winvm install disk \
  source=/root/win.incus.iso \
  boot.priority=10
```

### 启动 VM 并通过 SPICE+HTML5 浏览器安装

```shell
# 安装浏览器访问所需组件
apt update
apt install -y spice-html5 websockify lsof
```

```shell
incus start winvm
SERVER_IP=$(hostname -I | awk '{print $1}')
nohup websockify --web /usr/share/spice-html5 6080 \
  --unix-target=/run/incus/winvm/qemu.spice \
  > /var/log/websockify-winvm.log 2>&1 &
echo "请在浏览器中访问："
echo "    https://${SERVER_IP}:6080/spice_auto.html?port=6080"
echo "首次启动需要按Ctrl+Alt+Delete按钮，重启才能装载ISO进行实际的安装"
```

```shell
lsof -i :6080
```

```shell
# 安装完成后，先在控制台关闭/退出 Windows，
# 然后移除 ISO 设备，保证下次从硬盘启动
incus stop winvm
incus config device remove winvm install
incus start winvm
```

### 在浏览器中访问

1. 打开浏览器，访问 `https://<上面获取的 SERVER_IP>:6080/spice_auto.html?port=6080`
2. 你将看到 Windows 安装或已安装系统的 SPICE 界面，无需额外客户端。
