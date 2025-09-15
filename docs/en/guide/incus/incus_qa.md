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

## Requires both Incus and Docker compatibility to exist

If left unaddressed, docker will override the iptables setting and cause Incus to have no network link

You need to install a scheduled task to detect and fix this issue

```shell
curl -L https://raw.githubusercontent.com/oneclickvirt/incus/main/extra_scripts/docker-coexistence.sh -o docker-coexistence.sh && chmod +x docker-coexistence.sh && bash docker-coexistence.sh
```

## Incus has high CPU usage on single-core hosts after long-term use 

This high CPU usage is native to Incus, there is no workaround for it, and it can only be reproduced on single-core hosts, so you don't need to bother with multi-core hosts.

You need to install a timed task to detect and fix the problem, and check the usage every 5 minutes to see if you need to restart the Incus back-end.

* Download

```shell 
curl -L https://raw.githubusercontent.com/oneclickvirt/incus/main/extra_scripts/incus_fixed_restart.sh -o incus_fixed_restart. sh && chmod +x incus_fixed_restart.sh && bash incus_fixed_restart.sh 
```

* Installation

``` bash 
bash incus_fixed_restart.sh install 
```

will be copied to ```/usr/local/bin/incus_fixed_restart.sh``` and written to ```cron``` to run every minute.

* Uninstall

``` bash 
bash incus_fixed_restart.sh uninstall 
```

Removes ```cron``` tasks, script files, log files, and count files.

* Runs normally (called by cron)

``` bash 
/usr/local/bin/incus_fixed_restart.sh 
```

## Currently verified VPS vendors that can open containers with separate IPV6 addresses.

[kuroit](https://my.kuroit.com/aff.php?aff=5) Phoenix, USA regular

[datalix](https://t.me/+UHVoo2U4VyA5NTQ1/338) German AMD Promotions