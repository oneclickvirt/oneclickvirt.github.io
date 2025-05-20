
### 检查 Incus 驱动

确保 `incus info` 输出中含有 `driver: qemu`，否则无法创建 VM：

```shell
incus info | grep -i driver:
# 正确示例：
# driver: qemu
```

若显示 `driver: lxc`，请在 `/etc/incus/daemon.conf` 中调整为 `driver = qemu` 并重启 Incus 服务。

### 准备环境

在 `/root` 目录下按顺序执行以下命令：

```shell
apt update
apt install -y snapd libguestfs-tools wimtools rsync libhivex-bin libwin-hivex-perl genisoimage || apt install -y mkisofs
snap install distrobuilder --classic
```

下载镜像并进行修补，如果你使用的是别的镜像，自行替换下载链接

自行下载Windows镜像的地址：https://down.idc.wiki/ISOS/Windows/

支持修补的Windows镜像版本：https://linuxcontainers.org/distrobuilder/docs/latest/tutorials/use/#repack-windows-iso

下面的指南将以windows10作为示例进行

```shell
wget https://down.idc.wiki/ISOS/Windows/Windows%2010/Windows%2010%2021H2%20%28amd64%29.iso -O win.iso
distrobuilder repack-windows \
  --windows-arch=amd64 \
  win.iso \
  win.incus.iso
```

修补时长取决于程序何时正确添加启动所需的驱动(未成功时会一个个尝试直到成功)，有的耗时短有的耗时长，最长可能超过30分钟，建议在```screen```或```tmux```中挂起执行

修补完毕后可删除原始的镜像：

```shell
rm -f win.iso
```

### 创建 VM 并挂载安装 ISO

这块使用的配置是3C4G30G，如果使用的是windows11等更新版本的镜像，至少需要4C6G50G

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
echo "    http://${SERVER_IP}:6080/spice_auto.html?port=6080"
echo "首次启动需要按Ctrl+Alt+Delete按钮，重启按回车等待几分钟才能装载ISO进行实际的安装"
```

如果发现资源没给等原因需要删虚拟机重新开设，那么需要

```shell
lsof -i :6080
```

查询对应端口的PID号，使用```kill -9```删除

如果已经安装完成，先关闭/退出Windows(在浏览器上关机)，然后移除 ISO 设备，保证下次从硬盘启动

```shell
incus stop winvm
incus config device remove winvm install
incus start winvm
```
