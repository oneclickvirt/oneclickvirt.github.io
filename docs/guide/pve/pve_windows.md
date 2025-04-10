---
outline: deep
---

## 从带virtio的iso镜像文件开设win的虚拟机

### 1.下载镜像

安装需要提前下载镜像文件```local(pve) --> ISO images --> Download from URL```
 
下载链接```URL:```可使用

https://github.com/ILLKX/Windows-VirtIO

中的文件链接，文件名字```File Name:```填```win.iso```

点击下载```Download```，下载完成后当前的页面可见```win.iso```的文件大小，可见格式为iso。

### 2.设置模板

页面顶部右上角点击```Create VM```

```General```窗口中，```Resource Pool:```勾选```mypool```，```Name```填写```win```，然后点击```Next```。

```OS```窗口中，```ISO image```勾选```win.iso```，```Guest OS```勾选```Type```为```Microsoft Windows```类型，```Version```选择当前```ISO```的```win的版本```，示例下载是```2022```，就选```11/2022```类型，然后点击```Next```。

```System```窗口中，```Graphic card```勾选```VirtIO-GPU```类型，```Machine```勾选```q35```类型，```SCSI Controller```勾选```VirtIO SCSI```类型，```BIOS```勾选```Default (SeaBIOS)```类型，然后点击```Next```。

```Disk```窗口中，```Cache```勾选```Write Back```类型，```Disk size (GiB)```填写你要分配的硬盘大小，一般不小于```20```，```Storage```选择存储在哪个盘，示例只有系统盘```local```所以就选```loacl```，然后点击```Next```。

```CPU```窗口中，```Cores```填写所需核数，然后点击```Next```。

```Memory```窗口中，```Memory (MiB)```填写所需内存大小，然后点击```Next```。

```Network```窗口中，```Bridge```勾选```vmbr1```类型，```Model```勾选```VirtIO (paravirtualized)```类型，```Firewall```取消勾选，然后点击```Next```。

```Confirm```窗口中，点击```Finish```。

### 3.图形化配置

左侧点击设置好的模板，右上角点击```Start```启动虚拟机，然后点击```Console```进入```VNC```界面，等待操作系统启动。

然后在VNC中点击```下一页```，然后点击```现在安装```，然后点击```我没有产品密钥```，然后勾选```接受许可```，点击```下一页```，然后勾选```自定义安装```。

然后如果镜像本身带virtio，那么应该可见可选系统存储的硬盘及其大小，选中后点击```下一页```。

然后等待系统安装，应该会自动重启几次，大概耗时10分钟以上。





