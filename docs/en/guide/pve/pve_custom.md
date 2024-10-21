---
outline: deep
---

# Customized partitions

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

The web panel is actually opened in the container, but the network has used the host mode, the port of the PVE is about the same as the port of the host used.

But here the login username and password become ```root``` and ```root```, if you need to change it please ```docker exec -it pve /bin/bash``` enter and change the password of root, then press ```ctrl``` key and ```A+D``` to exit.

There are many bugs need to be fixed, welcome to PR to solve the problem, the actual test on the Ubuntu system host machine to install ```Proxmox VE``` panel success, solved the problem of installing ```Proxmox VE``` over the network can only be used to use the Debian system as a host machine!

## Optimizing the memory footprint of Proxmox-VE on low-configuration systems

The following optimization can reduce at least 400M memory occupation, some machines can reduce more than 6GB, the actual reduction of how much memory occupation to test by yourself.

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

### Deleting the memory cache using a timed task

Clearing different types of caches and performing TRIM operations on file systems

```shell
TEMP_CRON=$(mktemp)
sudo crontab -l > $TEMP_CRON
echo "*/5 * * * * echo 1 > /proc/sys/vm/drop_caches" >> $TEMP_CRON
echo "*/5 * * * * sleep 60; echo 2 > /proc/sys/vm/drop_caches" >> $TEMP_CRON
echo "*/5 * * * * sleep 120; echo 3 > /proc/sys/vm/drop_caches" >> $TEMP_CRON
echo "*/5 * * * * sleep 180; fstrim -av" >> $TEMP_CRON
sudo crontab $TEMP_CRON
rm $TEMP_CRON
```

The above commands require the ```sudo``` and ```crontab``` commands to be available on the host itself.

## Self-mapping of public ports on KVM VMs with open NATs

Use the ```nano``` or ```vim``` command to modify the file to add port mapping:

```
/etc/iptables/rules.v4
```

For example, if I have a KVM VM with an intranet IP of ```172.16.1.152```, and MYSQL has been set up to listen to ```3306```, and I need to use the ```tcp``` protocol to map out to the ```33306``` port on the host IP, I would add the following line to the ```COMMIT``` line in the file above, then add the following line

```
-A PREROUTING -p tcp -m tcp -dport 33306 -j DNAT --to-destination 172.16.1.152:3306
```

Save the file and exit file editing and then execute:

```
service netfilter-persistent restart
```

Reload Port Mapping

At this point, on the host machine, execute the

```
lsof -i:33306
```

To see if the port mapping rule is in effect
