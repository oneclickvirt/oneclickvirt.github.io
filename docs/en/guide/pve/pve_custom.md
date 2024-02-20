---
outline: deep
---

# Some custom scripts

Some scripts may have its own system requirements, check them out!

## Installing Proxmox VE 7 on a non-Debian system

Minimum local hardware requirements are the same as for the previous normal installation.

You need to install docker first.

```
curl -sSL https://get.docker.com/ | sh
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-linux-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
docker-compose --version
```

Then use ```uname -m``` to query the architecture and use the command corresponding to the architecture

The opened PVE panel information is:

Login username and password are both ``root``, after logging in be sure to use web SSH to change the password to avoid being blown up.

When using host SSH, be sure to log into the corresponding ``https://IPV4:8006`` to use SSH on the web panel, do not use the host's port 22 to manipulate the PVE.

Because the SSH on the web panel is inside Docker, it does not support subsequent one-click configurations, so please configure your own gateway, etc. to use it.

X86 architecture

```bash
docker run -idt --network host \
--privileged \
--name pve \
--add-host pve:10.13.14.101 \
--hostname pve \
spiritlhl/pve:7_x86_64
```

ARM architecture

```bash
docker run -idt --network host \
--privileged \
--name pve \
--add-host pve:10.13.14.101 \
--hostname pve \
spiritlhl/pve:7_aarch64
```

The web panel is actually opened in the container, but the network has used the host mode, the port of the PVE is about the same as the port of the host used

There are many bugs need to be fixed, welcome to PR to solve the problem, the actual test on the Ubuntu system host machine to install ```Proxmox VE``` panel success, solved the problem of installing ```Proxmox VE``` over the network can only be used to use the Debian system as a host machine!

## Optimizing the memory footprint of Proxmox-VE on low-configuration systems

The following optimizations can reduce the memory usage by about 400M, which is better than nothing.

### Reduce the number of max_workers

Execute the following command to query

```
cd /usr/share/perl5/PVE/Service
grep 'max_workers => 3' *
```

you can see

```
pvedaemon.pm:    max_workers => 3,
pveproxy.pm:    max_workers => 3,
spiceproxy.pm:    max_workers => 3, # todo: do we need more?
```

The default max_workers is 3, you can modify the corresponding file, the minimum max_workers can be 1, you can use the following commands to modify them:

```
sed -i "s/max_workers => 3/max_workers => 1/g" /usr/share/perl5/PVE/Service/*
```

### Deactivation of HA services

Clusters (multi-nodes) can use the HA service, if it is a single node, or there is no need for HA use, you can execute the following command:

```
systemctl stop pve-ha-lrm.service 
systemctl stop pve-ha-crm.service 
systemctl disable pve-ha-lrm.service 
systemctl disable pve-ha-crm.service 
```

### Disable firewall service

The service can be deactivated by executing the following command:

```
systemctl stop pve-firewall.service 
systemctl disable pve-firewall.service 
```

### Discontinuation of cheduler service

If you don't need scheduled tasks, such as backups and synchronizations, you can deactivate the service by executing the following command:

```
systemctl stop pvescheduler.service
systemctl disable pvescheduler.service
```

### Discontinuation of Spiceproxy service

If you do not need to use Spice for VM/container linking (the Arm version itself does not support Spice), you can deactivate the service by executing the following command:

```
systemctl stop spiceproxy.service 
systemctl disable spiceproxy.service 
```
