---
outline: deep
---

# Android 虚拟机

## 安卓系统镜像下载

Android系统版本9及以前的镜像下载地址：

国际

https://www.fosshub.com/Android-x86.html

https://sourceforge.net/projects/android-x86/files/

国内

https://mirrors.tuna.tsinghua.edu.cn/osdn/android-x86/

Android系统版本10及以后的新镜像下载地址：

https://blissos.org/index.html#download

## 模板设置

### 以安卓版本9及以前的镜像开设Android虚拟机

本指南以

https://mirrors.tuna.tsinghua.edu.cn/osdn/android-x86/71931/android-x86_64-9.0-rc2.iso

作为示例进行演示

![1](images/a1.png)

开设VMID为```100```的虚拟机选择对应的存储盘

![2](images/a2.png)  

选择安卓镜像，然后```Type```选择```Linux```，```Version```选择含2.6版本的选项

![3](images/a3.png)  

```Graphic card```选择```Vmware compatible```，其他选项选择默认如图所示

![4](images/a4.png)  

磁盘格式选择```SATA```，具体需要分配多大的磁盘自选，推荐至少30G

![5](images/a5.png)  

CPU的类型选择```host```，如果你的宿主机不支持嵌套虚拟化，请选择```qemu64```，但这样不清楚是否可成功开设

![6](images/a6.png)  

内存至少4G内存，填写至少```4096```

![7](images/a7.png)  

绑定的网桥选择```vmbr1```，```Model```选择```VirtIO (paravirtualized)```，取消```Firewall```的勾选

![8](images/a8.png)  

后续点击continue按钮后，模板成功创建出来，需要手动点击启动并进入VNC界面

![9](images/a9.png)  

进入引导后，选择```Installation```开头的选项

![10](images/a10.png)  

然后需要创建磁盘写入，这块如果选择不了的话按键盘按钮c，就能选中了

![11](images/a11.png)  

选择不使用GPT格式

![12](images/a12.png)  

显示空白盘后，选择```New```

![13](images/a13.png)  

选择分区类型```Primary```

![14](images/a14.png)  

然后会提示划分多大的空间，默认回车就行，使用全部的空间

![15](images/a15.png)  

然后是选择```Flags```，移动到```Bootable```后，按回车，直到```Flags```下方显示```Boot```

![16](images/a16.png)  

然后移动到```Write```，回车，进行写入

![17](images/a17.png)  

这时候会让你确认是否继续，输入```yes```后回车继续

![18](images/a18.png)  

一段进度条跑过后，回到了最初的菜单，选择```Quit```退出菜单，一切准备就绪了

![19](images/a19.png)  

然后这时候回到了UI界面，使用前面初始化好的盘，选择```OK```按钮回车

![20](images/a20.png)  

文件系统按方向键选择```ext4```类型，选择```OK```按钮回车

![21](images/a21.png)  

确认进行格式化，选择```OK```按钮回车

![22](images/a22.png)  

确认GRUB引导安装，选择```OK```按钮回车

![23](images/a23.png)  

确认文件系统可读写，选择```OK```按钮回车

![24](images/a24.png)  

跑了一段时间进度条后，显示安装成功，此时选择```Reboot```，选择```OK```按钮回车

![25](images/a25.png)  

然后一段时间后进入安卓LOGO界面

![26](images/a26.png)  

然后回进入一段黑屏，大概3~5分钟后仍然黑屏的话，宿主机执行```qm stop 100```，然后开始移除镜像文件

移除已经按照完毕的ISO文件，在ProxmoxVE的web端手动在```Hardware[硬件]```中点击对应的```CD```选择```Remove[删除]```

![ar](images/ar.png)  

然后宿主机再执行```qm start 100```，然后应该就会进入安卓系统的初始化界面了

初始化界面选择语言，然后点击确定按钮

![27](images/a27.png)  

此时回尝试连接WIFI，由于本项目安装的PVE是完全的静态网络配置，直接跳过，稍后再进行设置

![31](images/a31.png)  

点击下一步按钮确认设置时间

![32](images/a32.png)  

点击取消屏幕保护，确认仍然跳过

![33](images/a33.png)  

然后一段时间黑屏后，会出现主屏幕应用的选择，如果等待3~5分钟这个界面仍然没有出现，那么像之前那样重启虚拟机，再进入VNC应该就会显示了

选择```Quickstep```

![34](images/a34.png)

然后就会进入桌面，此时需要开始设置网络，左上角点击设置图标

![35](images/a35.png)  

出现下拉框，点击按住下拉

![36](images/a36.png)  

点击齿轮按钮

![37](images/a37.png)  

进入```网络和互联网```设置

![38](images/a38.png)  

左键双击```WIFI```

![39](images/a39.png)  

修改目前识别到的```VirtWIFI```，右键点击出现选择框后，点击```修改网络```

![40](images/a40.png)  

出现高级选项，点击打开隐藏的选项

![41](images/a41.png)  

如图进行对应的网络设置

IP地址 ```172.16.1.xxx```(xxx换成你想绑定的ip，我的vmid是100，为了方便写了100)

子网掩码 ```24```

默认网关 ```172.16.1.1```

DNS ```8.8.8.8``` 或 ```144.144.144.144```

然后点击保存按钮

![42](images/a42.png)  

此时出来后可能仍然未应用设置，点击关闭WIFI后，再启用WIFI，应该就会显示已连接

![43](images/a43.png)  

然后退出到主界面，点击谷歌浏览器，尝试打开一个网页

![44](images/a44.png)  

可以看到打开本指南的网址无问题，证明网络已联通

![45](images/a45.png)

### 以安卓版本10及以后的新镜像开设Android虚拟机

本指南以

作为示例进行演示
