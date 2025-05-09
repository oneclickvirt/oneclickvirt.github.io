---
outline: deep
---

# Android Virtual Machine

## Android System Image Download

Android system version 9 and earlier image download links:

International

https://www.fosshub.com/Android-x86.html

https://sourceforge.net/projects/android-x86/files/

China

https://mirrors.tuna.tsinghua.edu.cn/osdn/android-x86/

Android system version 10 and later new image download links:

https://blissos.org/index.html#download

## Template Setup

### Setting up Android Virtual Machine with Android Version 9 and Earlier Images

This guide demonstrates using

https://mirrors.tuna.tsinghua.edu.cn/osdn/android-x86/71931/android-x86_64-9.0-rc2.iso

as an example

![1](images/a1.png)

Create a virtual machine with VMID `100` and select the corresponding storage disk

![2](images/a2.png)  

Select the Android image, then choose `Linux` for `Type` and select the option containing version 2.6 for `Version`

![3](images/a3.png)  

Select `Vmware compatible` for `Graphic card`, other options as shown in the default image

![4](images/a4.png)  

Select `SATA` for disk format, allocate disk size as needed (recommended at least 30G)

![5](images/a5.png)  

Select `host` for CPU type. If your host machine doesn't support nested virtualization, please select `qemu64`, although success is not guaranteed in this case

![6](images/a6.png)  

Allocate at least 4G of memory, enter at least `4096`

![7](images/a7.png)  

Select `vmbr1` for bridge binding, choose `VirtIO (paravirtualized)` for `Model`, and uncheck the `Firewall` option

![8](images/a8.png)  

After clicking the continue button, the template is successfully created. You need to manually click start and enter the VNC interface

![9](images/a9.png)  

After entering the boot screen, select the option starting with `Installation`

![10](images/a10.png)  

Next, you need to create and write to the disk. If you can't select it, press the 'c' key on the keyboard to select it

![11](images/a11.png)  

Choose not to use GPT format

![12](images/a12.png)  

When the blank disk is displayed, select `New`

![13](images/a13.png)  

Select partition type `Primary`

![14](images/a14.png)  

You'll be prompted to allocate space, just press Enter to use all available space

![15](images/a15.png)  

Then select `Flags`, move to `Bootable`, press Enter until `Boot` is displayed under `Flags`

![16](images/a16.png)  

Then move to `Write` and press Enter to write

![17](images/a17.png)  

You'll be asked to confirm, type `yes` and press Enter to continue

![18](images/a18.png)  

After a progress bar completes, you'll return to the initial menu. Select `Quit` to exit the menu, and everything is now ready

![19](images/a19.png)  

Then you'll return to the UI interface. Use the previously initialized disk, select the `OK` button and press Enter

![20](images/a20.png)  

Use the arrow keys to select `ext4` for the file system, then select the `OK` button and press Enter

![21](images/a21.png)  

Confirm formatting, select the `OK` button and press Enter

![22](images/a22.png)  

Confirm GRUB boot installation, select the `OK` button and press Enter

![23](images/a23.png)  

Confirm the file system is readable and writable, select the `OK` button and press Enter

![24](images/a24.png)  

After a progress bar runs for a while, it will show installation succeeded. Select `Reboot`, then the `OK` button and press Enter

![25](images/a25.png)  

After a while, you'll enter the Android logo screen

![26](images/a26.png)  

Then it will go into a black screen. If it remains black after 3-5 minutes, execute `qm stop 100` on the host machine, then begin removing the image file

Remove the ISO file that has been installed by manually clicking on the corresponding `CD` in the `Hardware` section of the ProxmoxVE web interface and selecting `Remove`

![ar](images/ar.png)  

Then execute `qm start 100` on the host machine, and you should enter the Android system initialization interface

Select your language in the initialization interface, then click the confirm button

![27](images/a27.png)  

At this point it will try to connect to WIFI. Since this PVE installation uses completely static network configuration, skip this step and configure it later

![31](images/a31.png)  

Click the next button to confirm time settings

![32](images/a32.png)  

Click to cancel screen protection, confirm to skip again

![33](images/a33.png)  

After a period of black screen, the main screen application selection will appear. If this interface still doesn't appear after waiting 3-5 minutes, restart the virtual machine as before, and it should display when you enter VNC again

Select `Quickstep`

![34](images/a34.png)

Then you'll enter the desktop. Now you need to set up the network. Click the settings icon in the upper left corner

![35](images/a35.png)  

A dropdown appears, click and hold to pull down

![36](images/a36.png)  

Click the gear button

![37](images/a37.png)  

Enter `Network & Internet` settings

![38](images/a38.png)  

Double-click `WIFI` with the left mouse button

![39](images/a39.png)  

Modify the detected `VirtWIFI`, right-click to bring up the selection box, then click `Modify network`

![40](images/a40.png)  

Advanced options appear, click to open hidden options

![41](images/a41.png)  

Configure the network settings as shown

IP address `172.16.1.xxx` (replace xxx with your desired IP; my vmid is 100, so I used 100 for convenience)

Subnet mask `24`

Default gateway `172.16.1.1`

DNS `8.8.8.8` or `144.144.144.144`

Then click the save button

![42](images/a42.png)  

At this point, the settings may still not be applied. Turn off WIFI and then enable it again, it should show connected

![43](images/a43.png)  

Then exit to the main interface, click on Google Chrome, and try to open a webpage

![44](images/a44.png)  

You can see that opening this guide's URL works fine, proving the network is connected

![45](images/a45.png)

### Setting up Android Virtual Machine with Android Version 10 and Later Images

This guide demonstrates using

as an example