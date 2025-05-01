---
outline: deep
---

## WebVirtCloud Installation Guide

[![hits](https://hits.spiritlhl.net/webvirtcloud.svg?action=hit&title=hits&title_bg=%23555555&count_bg=%233aebee&edge_flat=false)](https://hits.spiritlhl.net)

Repository: <https://github.com/oneclickvirt/webvirtcloud>

Origin Repository:：<https://github.com/retspen/webvirtcloud>

## Controller Node and Computer Node Installation

- Supported Systems: Debian10+, Ubuntu18.04+
- Recommended system: Debian12+, Ubuntu22.04+.
- Lower versions of the system will automatically compile the new version of python installation package before deployment, so it is recommended to use a new system without compiling directly installed!

```bash
curl -slk https://raw.githubusercontent.com/oneclickvirt/webvirtcloud/main/scripts/install_webvirt_cloud_retspen.sh -o install_webvirt_cloud_retspen.sh \
&& chmod +x install_webvirt_cloud_retspen.sh \
&& bash install_webvirt_cloud_retspen.sh
```

After installation is complete, open the public IP address to access the login page.

The default login username and password are both `admin`. Make sure to change them after logging in.

## Creating a Linux Virtual Machine

After entering the control panel and changing the admin password, you need to manually configure a compute node.

![vcr1](images/vcr1.jpg)

Select the type as `Local`, and name it `local`.

![vcr2](images/vcr2.jpg)

After creation, click the eye icon to enter the view.

![vcr3](images/vcr3.jpg)

Under the `Storage` section, add a storage entry. Choose the type `Dir` and name it `local`. If you need to use an ISO for system boot, you’ll need to create a storage of type `ISO`. If not, just follow this guide and create only the `Dir` type.

![vcr4](images/vcr4.jpg)

![vcr5](images/vcr5.jpg)

After creation, download the appropriate qcow2 image for the system using the repository below:

https://github.com/oneclickvirt/pve_kvm_images/releases/tag/images

In the example, a Debian 12 qcow2 image is used:

```shell
cd /var/lib/libvirt/images
wget https://github.com/oneclickvirt/pve_kvm_images/releases/download/images/debian12.qcow2
chmod 777 debian12.qcow2
```

Return to the instance page to create a new instance.

![vcr6](images/vcr6.jpg)

Select `local` as the compute node.

![vcr7](images/vcr7.jpg)

The default chipset is fine; changing it is optional.

![vcr8](images/vcr8.jpg)

You can use predefined sizes for the virtual machine or customize it, depending on your preference.

![vcr9](images/vcr9.jpg)

Note: the instance name must not duplicate the system name. For example, you cannot use `debian12` as the instance name in this case.

![vcr10](images/vcr10.jpg)

After successful creation, **do not** power it on immediately.

![vcr11](images/vcr11.jpg)

You need to modify the disk settings first.

![vcr12](images/vcr12.jpg)

Change the disk file to `debian12.qcow2`, which matches the qcow2 image you previously downloaded.

![vcr13](images/vcr13.jpg)

Once confirmed and configured correctly, return to the power page and turn on the VM.

![vcr14](images/vcr14.jpg)

The default login for the image is:

- **Username**: `root`  
- **Password**: `password` or `oneclickvirt`

## Disadvantages

Networking is not auto-configured — not as smart as the previous project — you still need to configure it manually. 
