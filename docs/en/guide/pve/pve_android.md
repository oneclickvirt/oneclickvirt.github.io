---
outline: deep
---

# Android Virtual Machine

## Android System Image Download

Download links for Android system version 9 and earlier:

International

https://www.fosshub.com/Android-x86.html

https://sourceforge.net/projects/android-x86/files/

Domestic (China)

https://mirrors.tuna.tsinghua.edu.cn/osdn/android-x86/

Download links for Android system version 10 and later:

https://blissos.org/index.html#download

https://sourceforge.net/projects/blissos-x86/files/Official/

## Virtual Machine Setup

### Setting up an Android Virtual Machine with version 9 and earlier images

This guide demonstrates using:

https://mirrors.tuna.tsinghua.edu.cn/osdn/android-x86/71931/android-x86_64-9.0-rc2.iso

as an example

![1](images/a1.png)

#### Template Configuration

Create a virtual machine with VMID ```100``` and select the corresponding storage disk

![2](images/a2.png)  

Select the Android image, then choose ```Linux``` for ```Type``` and choose an option with version 2.6 for ```Version```

![3](images/a3.png)  

Select ```Vmware compatible``` for ```Graphic card```, other options are default as shown

![4](images/a4.png)  

Choose ```SATA``` for disk format, allocate at least 30GB of disk space (size can be chosen based on your needs)

![5](images/a5.png)  

CPU count should be at least 2 cores

If your host machine supports nested virtualization, choose ```host``` for CPU type (verified to work)

If your host machine doesn't support nested virtualization, choose ```qemu64``` for CPU type, and after creating the template, go to ```Options``` and uncheck ```KVM hardware virtualization``` before starting the virtual machine (no guarantee that system initialization will work properly)

![6](images/a6.png)  

Memory should be at least 4GB, enter at least ```4096```

![7](images/a7.png)  

Select ```vmbr1``` for the network bridge, choose ```VirtIO (paravirtualized)``` for ```Model```, and uncheck ```Firewall```

![8](images/a8.png)  

After clicking the continue button, the template is successfully created. You need to manually start it and enter the VNC interface

![9](images/a9.png)  

#### System Installation

After entering the boot menu, select the option starting with ```Installation```

![10](images/a10.png)  

Then you need to create disk partitions. If you can't select it, press the keyboard button 'c' to select it

![11](images/a11.png)  

Choose not to use GPT format

![12](images/a12.png)  

When the empty disk is displayed, select ```New```

![13](images/a13.png)  

Select partition type ```Primary```

![14](images/a14.png)  

Then you'll be prompted to specify the size of the space. Just press Enter to use all available space

![15](images/a15.png)  

Then select ```Flags```, move to ```Bootable```, press Enter until ```Boot``` appears under ```Flags```

![16](images/a16.png)  

Then move to ```Write``` and press Enter to write changes

![17](images/a17.png)  

You'll be asked to confirm whether to continue. Type ```yes``` and press Enter to continue

![18](images/a18.png)  

After a progress bar completes, you'll return to the initial menu. Select ```Quit``` to exit the menu, everything is now ready

![19](images/a19.png)  

Then you'll return to the UI interface. Use the previously initialized disk and select the ```OK``` button

![20](images/a20.png)  

Use the arrow keys to select ```ext4``` file system type, then select the ```OK``` button

![21](images/a21.png)  

Confirm formatting by selecting the ```Yes``` button

![22](images/a22.png)  

Confirm GRUB boot installation by selecting the ```OK``` button

![23](images/a23.png)  

Confirm the file system is readable and writable by selecting the ```OK``` button

![24](images/a24.png)  

After a progress bar runs for some time, it will show that installation was successful. Select ```Reboot``` and the ```OK``` button

![25](images/a25.png)  

After a while, you'll enter the Android logo screen

![26](images/a26.png)  

#### Removing the Image

Then there will be a black screen. If it's still black after 3-5 minutes, execute ```qm stop 100``` on the host machine, then start removing the image file.

Remove the installed ISO file by manually clicking on the corresponding ```CD``` in the ```Hardware``` section of the ProxmoxVE web interface and selecting ```Remove```

![ar](images/ar.png)  

Then execute ```qm start 100``` on the host machine again, and you should enter the Android system initialization interface

#### System Initialization

In the initialization interface, select the language and click the confirm button

![27](images/a27.png)  

It will try to connect to WiFi. Since our PVE installation uses a completely static network configuration, just skip this and set it up later

![31](images/a31.png)  

Click the next button to confirm the time settings

![32](images/a32.png)  

Click to cancel screen protection, confirm to skip again

![33](images/a33.png)  

After a period of black screen, the main screen application selection will appear. If this interface doesn't appear after waiting 3-5 minutes, restart the virtual machine as before, and it should display after entering VNC

Select ```Quickstep```

![34](images/a34.png)

#### Network Settings

After entering the desktop, you need to set up the network. Click the settings icon in the upper left corner

![35](images/a35.png)  

A dropdown appears, click and hold to pull down

![36](images/a36.png)  

Click the gear button

![37](images/a37.png)  

Enter ```Network & Internet``` settings

![38](images/a38.png)  

Double-click ```WIFI``` with the left mouse button

![39](images/a39.png)  

Modify the detected ```VirtWIFI```. Right-click to bring up the selection box, then click ```Modify network```

![40](images/a40.png)  

Advanced options appear, click to open hidden options

![41](images/a41.png)  

Configure the network settings as shown

IP address ```172.16.1.xxx``` (replace xxx with your desired IP, I used 100 because my vmid is 100 for convenience)

Subnet mask ```24```

Default gateway ```172.16.1.1```

DNS ```8.8.8.8``` or ```144.144.144.144```

Then click the save button

![42](images/a42.png)  

At this point, the settings may still not be applied. Turn off WiFi and then turn it back on, it should then show as connected

![43](images/a43.png)  

Then exit to the main interface, click on Google Chrome, and try to open a webpage

![44](images/a44.png)  

You can see that opening this guide's URL works without problems, proving that the network is connected

![45](images/a45.png)

### Setting up an Android Virtual Machine with version 10 and later images

This guide demonstrates using:

https://psychz.dl.sourceforge.net/project/blissos-x86/Official/BlissOS15/Gapps/Generic/Bliss-v15.9.2-x86_64-OFFICIAL-gapps-20241012.iso?viasf=1

as an example

![1](images/b1.png)  

#### Template Configuration

The host machine needs to execute the following command to install graphics environment dependencies

```shell
apt install libgl1 libegl1 -y
```

Then start creating the virtual machine by clicking the ```Create VM``` button in the upper right corner. Fill in ```VMID```, ```Name```, ```Resource Pool```
  
![2](images/b2.png)  

Select the Android image, then choose ```Linux``` for ```Type``` and an option with version 2.6 for ```Version```

![3](images/b3.png)  

If the host machine has a GPU, select ```VirGL GPU``` for ```Graphic card```.

If the host machine doesn't have a GPU, select ```VirtIO``` or ```Vmware compatible``` for ```Graphic card```.

Select ```q35``` for ```Machine```, select ```OVMF (UEFI)``` for ```BIOS```, and select ```local``` for ```EFI Storage```.

![4](images/b4.png)  

Choose ```SATA``` for disk format. How much disk space to allocate is up to you, but at least 30GB is recommended

![5](images/b5.png)  

CPU count should be at least 2 cores

If your host machine supports nested virtualization, choose ```host``` for CPU type (verified to work)

If your host machine doesn't support nested virtualization, choose ```qemu64``` for CPU type, and after creating the template, go to ```Options``` and uncheck ```KVM hardware virtualization``` before starting the virtual machine (no guarantee that system initialization will work properly)

![6](images/b6.png)  

Memory should be at least 4GB, enter at least ```4096```

![7](images/b7.png)  

Select ```vmbr1``` for the network bridge, choose ```VirtIO (paravirtualized)``` for ```Model```, and uncheck ```Firewall```

![8](images/b8.png)  

After clicking the continue button, the template is successfully created. You need to manually start it and enter the VNC interface.

#### System Installation

After entering the boot menu, select the option ending with ```Installation```

![9](images/b9.png)

Then you need to create disk partitions. If you can't select it, press the keyboard button 'c' to select it.

![10](images/b10.png)  

Choose not to use GPT format, continue using cfdisk format.

![11](images/b11.png)  

When the format selection box appears, select ```gpt```.

![12](images/b12.png)   

When the empty disk is displayed, select ```New```.

![13](images/b13.png) 

Because you need to create an EFI partition, you need to change the size rather than using the default. Change the number to 1 to allocate 1GB of disk space, then press Enter.

![14](images/b14.png)  

Then you'll return to the menu bar. Use the arrow keys to select ```Type```, then press Enter to choose the format type for the partition

![15](images/b15.png)  

Use the arrow keys to select the first option ```EFI System```, then press Enter

![16](images/b16.png)  

Now you're back at the menu bar. In the upper half of the page, you can see the specific partition size and format

![17](images/b17.png)  

Then press the down arrow key to select the next empty partition line

![18](images/b18.png)  

Select ```New``` from the menu bar, then press Enter

![19](images/b19.png)  

Here you need to fill in the partition size. Match it with the empty partition size shown in the upper right corner, then press Enter.

![20](images/b20.png)  

Return to the menu bar, select ```Write```, press Enter to write the partition.

![21](images/b21.png)

You'll be prompted to enter ```yes``` to confirm. Enter it and press Enter.

![22](images/b22.png)  

After a progress bar runs, you should return to the menu bar. Select ```Quit``` to exit the menu, everything is now ready

![23](images/b23.png)  

Then you'll return to the UI interface. Use the previously initialized 1GB disk and select the ```OK``` button

![24](images/b24.png)  

Use the arrow keys to select ```fat32``` file system type, then select the ```OK``` button

![25](images/b25.png)  

Confirm not to modify the name by selecting the ```OK``` button

![26](images/b26.png)  

Confirm formatting by selecting the ```Yes``` button

![27](images/b27.png)  

Then you'll return to the initial UI bar. Select the second partition that is not 1GB in size and select the ```OK``` button

![28](images/b28.png)  

Use the arrow keys to select ```ext4``` file system type, then select the ```OK``` button

![29](images/b29.png)  

Confirm not to modify the name by selecting the ```OK``` button

![30](images/b30.png)  

Confirm formatting by selecting the ```Yes``` button

![31](images/b31.png)  

Choose not to use extra space for updates by selecting the ```No``` button

![32](images/b32.png)  

Confirm ```GRUB2 EFI BootLoader``` by selecting the ```OK``` button

![33](images/b33.png)  

After a progress bar runs for some time, it will show that installation was successful. Select ```Reboot``` and the ```OK``` button.

![34](images/b34.png)  

#### System Initialization

After a while, you'll enter the logo screen.

![35](images/b35.png)  

After some more time, you should enter the initial Android interface. You'll see a popup and the time. Hold the left mouse button and swipe up

![36](images/b36.png)  

The main screen application selection will appear. Select ```Quickstep```

If this interface doesn't appear after waiting 3-5 minutes, restart the virtual machine, and it should display after entering VNC

![37](images/b37.png)  

#### Removing the Image

After the Android interface appears, execute ```qm stop 100``` on the host machine, then start removing the image file.

Remove the installed ISO file by manually clicking on the corresponding ```CD``` in the ```Hardware``` section of the ProxmoxVE web interface and selecting ```Remove```

![br](images/br.png)  

Then execute ```qm start 100``` on the host machine again, and you should enter the system's initial interface.

#### Network Settings

After entering the desktop, you need to set up the network. Hold the left mouse button in the indicated position and swipe up

![38](images/b38.png)  

A bunch of applications will pop up. Find the one called ```Bliss Ethernet Manager``` and click to open it

![39](images/b39.png)  

Click to open ```IP Assignment```, select ```Static``` type, click the OK button to confirm

![40](images/b40.png)  

Click to open ```IP Address```, enter ```172.16.1.xxx/24``` (I used 100 for xxx because my virtual machine VMID is 100 for easy identification), click the OK button to confirm

![41](images/b41.png)  

Click to open ```Gateway Address```, enter ```172.16.1.1```, click the OK button to confirm

![42](images/b42.png)  

Click to open ```DNS Address```, enter ```8.8.8.8```, click the OK button to confirm

![43](images/b43.png)  

Then in the application interface, click ```Interface Up``` and ```Refresh```, then press the ```exit``` key on the keyboard to exit the program

![44](images/b44.png)  

Open the browser in the main interface to verify that the network is working properly

![45](images/b45.png)  

You can see that opening this guide works without problems, the network is functioning

![46](images/b46.png)
