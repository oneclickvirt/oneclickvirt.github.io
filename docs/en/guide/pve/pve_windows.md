---
outline: deep
---

# Setting Up Windows Visual Machine

## Using ISO Image with VirtIO for VM Setup

### 1. Download the Image
Before installation, you need to download the image file via `local(pve) --> ISO images --> Download from URL`

For the download link (`URL:`), you can use files from:
https://github.com/ILLKX/Windows-VirtIO

Enter `win.iso` as the `File Name:`
![download](images/432192899-d9453c3b-46cd-4bc1-8c61-4f987b84dbdb.png)

Click `Download`. After downloading is complete, you can see the file size of `win.iso` on the current page, confirming it's in ISO format.
![downloaded](images/432192951-c1dd421b-f516-47eb-a415-f54d56b34945.png)

### 2. Setting Up the Template
Click `Create VM` in the top right corner of the page.

In the `General` window, select `mypool` for `Resource Pool:`, enter `win` for `Name`, then click `Next`.
![general](images/432193100-8ceb8253-1652-4194-bf7d-b64232612eaf.png)

In the `OS` window, select `win.iso` for `ISO image`. For `Guest OS`, select `Microsoft Windows` as the `Type` and choose the appropriate `Version` for your ISO. For example, if you downloaded Windows 2022, select `11/2022`, then click `Next`.
![OS](images/432193274-3704426d-d665-4672-b9f8-50504191eff0.png)

In the `System` window, select `VirtIO-GPU` for `Graphic card`, `q35` for `Machine`, `VirtIO SCSI` for `SCSI Controller`, and `Default (SeaBIOS)` for `BIOS`, then click `Next`.
![system](images/432193298-0badebcb-5755-4ced-86cc-01368748f761.png)

In the `Disk` window, select `Write Back` for `Cache`, enter your desired disk size in `Disk size (GiB)` (generally not less than `20`), and choose the storage location in `Storage`. In this example, only the system disk `local` is available, so `local` is selected. Then click `Next`.
![disk](images/432193391-68f0eeeb-fc9f-4568-8ddf-777caf901345.png)

In the `CPU` window, enter the number of cores needed in `Cores`, then click `Next`.
![cpu](images/432193462-03a2728f-fa88-4884-a0f9-43f8e92f054b.png)

In the `Memory` window, enter the desired memory size in `Memory (MiB)`, then click `Next`.
![memory](images/432193493-d549cae1-7cf1-40f5-9767-a628878520dc.png)

In the `Network` window, select `vmbr1` for `Bridge`, `VirtIO (paravirtualized)` for `Model`, uncheck `Firewall`, then click `Next`.
![Network](images/432193525-695a77d0-cadb-4eab-9c0c-d1cbea3f6d02.png)

In the `Confirm` window, click `Finish`.
![finish](images/432193740-df901161-26b9-43d1-9106-baeb6485568c.png)

### 3. Graphical Installation Configuration
Click on the template you've set up on the left, click `Start` in the upper right corner to start the virtual machine, then click `Console` to enter the `VNC` interface and wait for the operating system to boot.
![console](images/432193821-7c660689-c6bf-47fd-adef-e7bc3b139873.png)

In the VNC, click `Next`, then `Install now`, then `I don't have a product key`, check `Accept license`, click `Next`, and then select `Custom installation`.
![win0](images/432193878-c7283ee4-d5cd-4091-a57f-e9e476468871.png)
![win1](images/432193920-58698c75-97f4-4091-bbaa-a2a435468c28.png)
![win2](images/432193959-c886b28e-8107-469c-9042-8479c46cabaa.png)
![win3](images/432194105-63a1521a-b3fd-40ae-8992-b91046d0f346.png)
![win4](images/432194142-454b13e1-f948-4890-ab24-773afc0919e1.png)

If the image comes with VirtIO drivers, you should be able to see the available system storage disk and its size. Select it and click `Next`.
![win5](images/432194244-228adbbf-4c00-48c0-bd58-94dc1f081369.png)
![win6](images/432194273-9cb29c4c-78eb-49b2-9e1b-0e818bc9ca62.png)

Wait for the system to install. It may restart automatically several times and could take more than 10 minutes.
![win7](images/432194639-ba4370df-ba6d-48fb-9255-e285f2d27377.png)

After installation is complete, you'll be asked to set a password during first login.
![win8](images/432194663-b4a7e456-878a-4829-bda1-05c8a9d6b6a7.png)

Once setup is complete, there's a pop-up box on the left side of the NOVNC page. Click the first button, then follow the login prompt by pressing `Ctrl`+`Alt`+last button to enter the login page.

### 4. Network Initialization
Since the PVE is set up with a static network through this project, you need to manually modify the bound IP address after logging in, rather than using DHCP.

Right-click in the bottom right corner of the desktop and select `Open Network and Internet settings`. In the settings page that appears, click `Change adapter options`.
![win9](images/net1.png)

In the `Network Connections`, select `Ethernet` and click `Change settings of this connection`.
![win10](images/net2.png)

In the popup window, select `Internet Protocol Version 4 (TCP/IPv4)` and click `Properties`.
![win11](images/net3.png)

In the new dialog box, select `Use the following IP address` and enter:
IP address(I): `172.16.1.xxx` (replace xxx with your desired IP, I used 100 for convenience as my vmid is 100)
Subnet mask(U): `255.255.255.0`
Default gateway(D): `172.16.1.1`

Then select `Use the following DNS server addresses` and enter:
```
8.8.8.8
144.144.144.144
```

Click OK in the bottom right corner, and make sure `Validate settings upon exit` is NOT checked.

![win12](images/net4.png)

Click `OK` and `Yes` for any other dialog boxes, and your virtual machine will now have network connectivity.

### 5. Unmounting the CD Drive

Manually click on the corresponding ```CD``` in the ```Hardware``` on the web side of ProxmoxVE and select ```Remove```, then restart the VM and you can use it directly.

![wk](images/wk7.png)

## Using ISO Images without VirtIO for VM Installation

### 1. Download Images

For Windows images without VirtIO, you can use:

<https://down.idc.wiki/ISOS/Windows/>

For VirtIO ISO images, you can use:

<https://down.idc.wiki/ISOS/Toolkit/>

or

<https://fedorapeople.org/groups/virt/virtio-win/direct-downloads/archive-virtio/>

Alternatively, you can download just the MSI package, package it into an ISO format locally, and then upload it to ProxmoxVE.

This way, the package is smaller. The official package contains support for all Windows images and is about 500MB, while a self-packaged one is around 5MB.

### 2. VirtIO Import

Note that in ProxmoxVE version 8.x and later, you can select VirtIO boot loading by default in the OS section, as shown in the image:

![virtio](images/virtio.png)

In lower versions of ProxmoxVE, such as 7.x and 6.x, you cannot select VirtIO boot loading by default in the OS section:

![lower](images/lower2.png)

You need to manually add `CD/DVD Drive` by clicking `Add` in the `Hardware` section and selecting the downloaded `VirtIO` `ISO` file:

![lower](images/lower1.png)

Then proceed as usual until you reach:

![nodisk](images/nodisk.png)

At this point, you can't find the hard disk. You need to select `Load Driver`:

![nodisk](images/nodisk1.png)

Then select the `VirtIO` as your driver disk, click open, and import the corresponding system driver from the `amd64` directory:

![nodisk](images/nodisk2.png)

I'm using a `Windows Server 2019` image, so I imported the `2k19` driver. After importing, select the imported driver and click `Next`:

![nodisk](images/nodisk3.png)

![nodisk](images/nodisk4.png)

Now you should be able to see the hard disk. Select it and continue with the installation steps as in the previous tutorial until the system installation is complete and you reach the desktop.

### 3. Installing Drivers via virtio-win-guest-tools

Once successfully installed and at the desktop, you still need to manually install the drivers.

Open the `VirtIO` driver's `CD` drive directory. At the bottom, there's a `virtio-win-guest-tools` program that will install the required VirtIO drivers, including the VirtIO network card driver:

![wk](images/wk4.png)

![wk](images/wk5.png)

![wk](images/wk6.png)

After clicking install, the network card driver will be installed. For subsequent network settings, refer to the network initialization tutorial mentioned earlier.

### 4. Installing Network Card Driver (Alternative)

After successful installation and reaching the desktop, you may still need to manually install the network card driver to connect to the network:

1. Open **Control Panel** → **Device Manager**
2. Find the **Ethernet Controller**, right-click and select **Update Driver**
3. Select **Browse my computer for driver software (R)**
4. Browse to the `VirtIO` driver's `CD` drive directory
5. Open the **NetKVM** folder
6. Select the driver folder corresponding to your current system version (like the above operation, I would choose the 2k19 folder with amd64 drivers)
7. Confirm the installation, and after completion, the `VirtIO` network card driver will be successfully loaded

![wk](images/wk1.png)

![wk](images/wk2.png)

![wk](images/wk3.png)

For subsequent network settings, refer to the network initialization tutorial mentioned earlier.

### 5. Unmounting the CD Drive

In the ProxmoxVE web interface, manually click on the corresponding `CD` in the `Hardware` section, select `Remove`, and then restart the virtual machine. This way, you can use it directly:

![wk](images/wk7.png)