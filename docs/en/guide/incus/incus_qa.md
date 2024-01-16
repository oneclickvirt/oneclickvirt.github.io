---
outline: deep
---

## Solve the puzzle

## What to do if you open centos7 and find that CGroupV1 is not supported?

Enable CGroup V1: To enable CGroup V1 on an Ubuntu system, you need to edit the kernel boot parameters.

Please note that before changing kernel boot parameters, make sure to backup important data and settings to prevent unexpected problems.

Edit the ```/etc/default/grub`` file and add ``systemd.unified_cgroup_hierarchy=0`` to the end of the parameters in ``GRUB_CMDLINE_LINUX_DEFAULT``, just like:

```
GRUB_CMDLINE_LINUX_DEFAULT="quiet splash systemd.unified_cgroup_hierarchy=0"
```

Save the file and run the following command to update the GRUB boot.

```bash
sudo update-grub
```

Reboot the system for the changes to take effect

If the above changes still do not support the opening of centos7, try using a different host system.

## Currently verified VPS vendors that can open containers with separate IPV6 addresses.

[kuroit](https://my.kuroit.com/aff.php?aff=5) Phoenix, USA regular

[datalix](https://t.me/vps_reviews/338) German AMD Promotions

[luxvps](https://billing.luxvps.xyz/aff.php?aff=36) German AMD Promotions