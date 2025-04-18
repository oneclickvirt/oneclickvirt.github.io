---
outline: deep
---

## 使用带virtio的iso镜像文件开设

### 1.下载镜像

安装需要提前下载镜像文件```local(pve) --> ISO images --> Download from URL```
 
下载链接```URL:```可使用

https://github.com/ILLKX/Windows-VirtIO

中的文件链接，文件名字```File Name:```填```win.iso```

![download](images/432192899-d9453c3b-46cd-4bc1-8c61-4f987b84dbdb.png)

点击下载```Download```，下载完成后当前的页面可见```win.iso```的文件大小，可见格式为iso。

![downloaded](images/432192951-c1dd421b-f516-47eb-a415-f54d56b34945.png)

### 2.设置模板

页面顶部右上角点击```Create VM```

```General```窗口中，```Resource Pool:```勾选```mypool```，```Name```填写```win```，然后点击```Next```。

![general](images/432193100-8ceb8253-1652-4194-bf7d-b64232612eaf.png)

```OS```窗口中，```ISO image```勾选```win.iso```，```Guest OS```勾选```Type```为```Microsoft Windows```类型，```Version```选择当前```ISO```的```win的版本```，示例下载是```2022```，就选```11/2022```类型，然后点击```Next```。

![OS](images/432193274-3704426d-d665-4672-b9f8-50504191eff0.png)

```System```窗口中，```Graphic card```勾选```VirtIO-GPU```类型，```Machine```勾选```q35```类型，```SCSI Controller```勾选```VirtIO SCSI```类型，```BIOS```勾选```Default (SeaBIOS)```类型，然后点击```Next```。

![system](images/432193298-0badebcb-5755-4ced-86cc-01368748f761.png)

```Disk```窗口中，```Cache```勾选```Write Back```类型，```Disk size (GiB)```填写你要分配的硬盘大小，一般不小于```20```，```Storage```选择存储在哪个盘，示例只有系统盘```local```所以就选```loacl```，然后点击```Next```。

![disk](images/432193391-68f0eeeb-fc9f-4568-8ddf-777caf901345.png)

```CPU```窗口中，```Cores```填写所需核数，然后点击```Next```。

![cpu](images/432193462-03a2728f-fa88-4884-a0f9-43f8e92f054b.png)

```Memory```窗口中，```Memory (MiB)```填写所需内存大小，然后点击```Next```。

![memory](images/432193493-d549cae1-7cf1-40f5-9767-a628878520dc.png)

```Network```窗口中，```Bridge```勾选```vmbr1```类型，```Model```勾选```VirtIO (paravirtualized)```类型，```Firewall```取消勾选，然后点击```Next```。

![Network](images/432193525-695a77d0-cadb-4eab-9c0c-d1cbea3f6d02.png)

```Confirm```窗口中，点击```Finish```。

![finish](images/432193740-df901161-26b9-43d1-9106-baeb6485568c.png)

### 3.图形化配置安装

左侧点击设置好的模板，右上角点击```Start```启动虚拟机，然后点击```Console```进入```VNC```界面，等待操作系统启动。

![console](images/432193821-7c660689-c6bf-47fd-adef-e7bc3b139873.png)

然后在VNC中点击```下一页```，然后点击```现在安装```，然后点击```我没有产品密钥```，然后勾选```接受许可```，点击```下一页```，然后勾选```自定义安装```。

![win0](images/432193878-c7283ee4-d5cd-4091-a57f-e9e476468871.png)

![win1](images/432193920-58698c75-97f4-4091-bbaa-a2a435468c28.png)

![win2](images/432193959-c886b28e-8107-469c-9042-8479c46cabaa.png)

![win3](images/432194105-63a1521a-b3fd-40ae-8992-b91046d0f346.png)

![win4](images/432194142-454b13e1-f948-4890-ab24-773afc0919e1.png)

然后如果镜像本身带virtio，那么应该可见可选系统存储的硬盘及其大小，选中后点击```下一页```。

![win5](images/432194244-228adbbf-4c00-48c0-bd58-94dc1f081369.png)

![win6](images/432194273-9cb29c4c-78eb-49b2-9e1b-0e818bc9ca62.png)

然后等待系统安装，应该会自动重启几次，大概耗时10分钟以上。

![win7](images/432194639-ba4370df-ba6d-48fb-9255-e285f2d27377.png)

安装完成后首次登录会要求设置密码，正常设置即可

![win8](images/432194663-b4a7e456-878a-4829-bda1-05c8a9d6b6a7.png)

设置完成后，NOVNC页面左侧有一个弹出框，点击第一个按钮，然后根据登录提示，点击```Ctrl```+```Alt```+最后一个按钮，进入登录页面。

### 4.初始化网络

由于通过本项目设置的PVE是静态网络，所以登陆后需要手动修改绑定的IP地址，不通过DHCP

在桌面右下角右击点出```打开 网络和Internet设置```，点击后，在弹出的设置页面中点击```更改适配器设置```

![win9](images/net1.png)

然后在```网络链接```中勾选```以太网```，点击```更改此连接的设置```

![win10](images/net2.png)

在弹出框中点击```Internet协议版本4(TCP/IPV4)```选中后点击```属性```

![win11](images/net3.png)

在新弹出的弹出框中，选择并点击```使用下面的IP地址(s)```，然后分别填入

IP地址(I)：```172.16.1.xxx```(xxx换成你想绑定的ip，我的vmid是100，为了方便写了100)

子网掩码(U)：```255.255.255.0```

默认网关(D)：```172.16.1.1```

然后选择点击```使用下面的DNS服务器地址(E)```，分别填入

```
8.8.8.8
144.144.144.144
```

然后右下角点击确定，注意```不要```勾选```退出时验证```

![win12](images/net4.png)

然后其他弹出框都选```确定```和```是```就行了，然后本虚拟机就有网络了。



