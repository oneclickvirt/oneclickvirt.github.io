---
outline: deep
---

## 从带virtio的iso镜像文件开设win的虚拟机

### 1.下载镜像

安装需要提前下载镜像文件```local(pve) --> ISO images --> Download from URL```
 
下载链接```URL:```可使用

https://github.com/ILLKX/Windows-VirtIO

中的文件链接，文件名字```File Name:```填```win.iso```

![download](https://github.com/user-attachments/assets/d9453c3b-46cd-4bc1-8c61-4f987b84dbdb)

点击下载```Download```，下载完成后当前的页面可见```win.iso```的文件大小，可见格式为iso。

![downloaded](https://github.com/user-attachments/assets/c1dd421b-f516-47eb-a415-f54d56b34945)

### 2.设置模板

页面顶部右上角点击```Create VM```

```General```窗口中，```Resource Pool:```勾选```mypool```，```Name```填写```win```，然后点击```Next```。

![general](https://github.com/user-attachments/assets/8ceb8253-1652-4194-bf7d-b64232612eaf)

```OS```窗口中，```ISO image```勾选```win.iso```，```Guest OS```勾选```Type```为```Microsoft Windows```类型，```Version```选择当前```ISO```的```win的版本```，示例下载是```2022```，就选```11/2022```类型，然后点击```Next```。

![OS](https://github.com/user-attachments/assets/3704426d-d665-4672-b9f8-50504191eff0)

```System```窗口中，```Graphic card```勾选```VirtIO-GPU```类型，```Machine```勾选```q35```类型，```SCSI Controller```勾选```VirtIO SCSI```类型，```BIOS```勾选```Default (SeaBIOS)```类型，然后点击```Next```。

![system](https://github.com/user-attachments/assets/0badebcb-5755-4ced-86cc-01368748f761)

```Disk```窗口中，```Cache```勾选```Write Back```类型，```Disk size (GiB)```填写你要分配的硬盘大小，一般不小于```20```，```Storage```选择存储在哪个盘，示例只有系统盘```local```所以就选```loacl```，然后点击```Next```。

![disk](https://github.com/user-attachments/assets/68f0eeeb-fc9f-4568-8ddf-777caf901345)

```CPU```窗口中，```Cores```填写所需核数，然后点击```Next```。

![cpu](https://github.com/user-attachments/assets/03a2728f-fa88-4884-a0f9-43f8e92f054b)

```Memory```窗口中，```Memory (MiB)```填写所需内存大小，然后点击```Next```。

![memory](https://github.com/user-attachments/assets/d549cae1-7cf1-40f5-9767-a628878520dc)

```Network```窗口中，```Bridge```勾选```vmbr1```类型，```Model```勾选```VirtIO (paravirtualized)```类型，```Firewall```取消勾选，然后点击```Next```。

![Network](https://github.com/user-attachments/assets/695a77d0-cadb-4eab-9c0c-d1cbea3f6d02)

```Confirm```窗口中，点击```Finish```。

![finish](https://github.com/user-attachments/assets/454b13e1-f948-4890-ab24-773afc0919e1)

### 3.图形化配置安装

左侧点击设置好的模板，右上角点击```Start```启动虚拟机，然后点击```Console```进入```VNC```界面，等待操作系统启动。

![console](https://github.com/user-attachments/assets/df901161-26b9-43d1-9106-baeb6485568c)

然后在VNC中点击```下一页```，然后点击```现在安装```，然后点击```我没有产品密钥```，然后勾选```接受许可```，点击```下一页```，然后勾选```自定义安装```。

![win0](https://github.com/user-attachments/assets/7c660689-c6bf-47fd-adef-e7bc3b139873)

![win1](https://github.com/user-attachments/assets/c7283ee4-d5cd-4091-a57f-e9e476468871)

![win2](https://github.com/user-attachments/assets/58698c75-97f4-4091-bbaa-a2a435468c28)

![win3](https://github.com/user-attachments/assets/c886b28e-8107-469c-9042-8479c46cabaa)

![win4](https://github.com/user-attachments/assets/63a1521a-b3fd-40ae-8992-b91046d0f346)

然后如果镜像本身带virtio，那么应该可见可选系统存储的硬盘及其大小，选中后点击```下一页```。

![win5](https://github.com/user-attachments/assets/228adbbf-4c00-48c0-bd58-94dc1f081369)

![win6](https://github.com/user-attachments/assets/9cb29c4c-78eb-49b2-9e1b-0e818bc9ca62)

然后等待系统安装，应该会自动重启几次，大概耗时10分钟以上。

![win7](https://github.com/user-attachments/assets/ba4370df-ba6d-48fb-9255-e285f2d27377)

![win8](https://github.com/user-attachments/assets/b4a7e456-878a-4829-bda1-05c8a9d6b6a7)

### 4.初始化网络

![win9](https://github.com/user-attachments/assets/4adfdde0-8d19-49b8-9cf2-b8874b445e93)

![win10](https://github.com/user-attachments/assets/0c4624a2-4805-4426-a08b-028c2e737418)

![win11](https://github.com/user-attachments/assets/67d3b598-a4e3-4c64-a9e2-5738330d1cbe)

![win12](https://github.com/user-attachments/assets/dd6195e3-38f6-4954-a70c-2f9480d15048)



