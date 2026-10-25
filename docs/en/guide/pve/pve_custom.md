---
outline: deep
---

# Custom Sections

## Running Proxmox VE 8 / 9 in Docker on a non-Debian system

Install Docker first. The host must run native Linux on X86_64; use ```uname -m``` to check. PVE 8 uses Debian 12 and PVE 9 uses Debian 13, with official PVE packages installed inside the container.

This method is for experimental environments. The container shares the host kernel and cannot install or switch to a PVE kernel. HA and hardware watchdog services are disabled. Modern ARM images are not provided.

### Download the image

The following example uses PVE 9. For PVE 8, change ```9``` to ```8``` in the first line.

```bash
PVE_VERSION=9
curl -fL --retry 3 "https://github.com/oneclickvirt/pve/releases/download/docker-pve${PVE_VERSION}/pve${PVE_VERSION}-amd64.tar.gz" -o "pve${PVE_VERSION}-amd64.tar.gz"
curl -fL --retry 3 "https://github.com/oneclickvirt/pve/releases/download/docker-pve${PVE_VERSION}/SHA256SUMS" -o SHA256SUMS
sha256sum -c SHA256SUMS
gzip -dc "pve${PVE_VERSION}-amd64.tar.gz" | docker load
```

Images are built on GitHub Actions and updated in the corresponding GitHub Release after validation inside a disposable VM, with automatic weekly checks. The Release includes ```build.json``` with the PVE version, source commit and archive checksum.

### Set a password and start the container

There is no default password. Create your own root password file first. Run these commands on the host.

```bash
install -d -m 700 /opt/pve-docker
(umask 077; openssl rand -base64 24 > /opt/pve-docker/root-password)
modprobe -a fuse tun
docker run -d \
  --name pve --hostname pve \
  --privileged --cgroupns=private \
  --restart unless-stopped \
  --tmpfs /run --tmpfs /run/lock --tmpfs /tmp \
  --mount type=bind,src=/opt/pve-docker/root-password,dst=/run/secrets/pve-root,readonly \
  -e PVE_ROOT_PASSWORD_FILE=/run/secrets/pve-root \
  -p 8006:8006 \
  "oneclickvirt/pve:${PVE_VERSION}"
```

Open ```https://HOST_IP:8006```, select Linux PAM authentication and log in as ```root```. Use ```cat /opt/pve-docker/root-password``` to view the generated password. The first start generates this container's certificates and SSH host keys, so allow some time for the panel to become ready.

To change the password, run ```docker exec -it pve passwd root```. The password file is used only during initial setup; passwords changed inside the container survive restarts.

### Usage and saved data

Use ```docker exec -it pve bash``` to manage PVE inside the container. The host SSH service continues to manage the host. Configure bridges, gateways and VM port forwarding yourself; the existing one-click configuration for a physical PVE host does not apply directly.

Build checks cover HTTPS/PAM login, VM creation and disk import, VM boot and reboot using TCG, and preservation of passwords, certificates and VM configuration after a container restart. KVM acceleration requires ```/dev/kvm``` on the host. Without this device, disable KVM hardware virtualization in the VM options to use TCG. LXC, PCI passthrough, clustering and migration are outside this image's validation scope.

Stop and start the same container with:

```bash
docker stop pve
docker start pve
```

Restarting the same container preserves its configuration and virtual disks. Before deleting or recreating it, separately back up ```/var/lib/pve-cluster```, ```/var/lib/vz```, networking and account configuration. Do not use ```docker rm``` directly as an upgrade step.

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

### Discontinuation of scheduler service

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

All of the following operations are performed on the PVE host computer

Use the ```nano``` or ```vim``` command to modify the file to add port mapping:

```
/etc/iptables/rules.v4
```

For example, assume a KVM VM has internal IP ```172.16.1.152```, MySQL listens on ```3306```, and you want to map host port ```33306``` over ```tcp```. Add the following rule above the ```COMMIT``` line in the file:

```
-A PREROUTING -i vmbr0 -p tcp -m tcp -dport 33306 -j DNAT --to-destination 172.16.1.152:3306
```

If it's udp protocol, just change ```tcp``` to ```udp``` in the code above

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

## Customizing the CPU TYPE when opening a Linux virtual machine

On the host computer, use something like

```shell
echo "kvm64" > /usr/local/bin/cpu_type
```

Specifying the default CPU TYPE in this way allows you to replace ```kvm64``` with the type you want

## When creating virtual machines or containers, you must use a custom IPv6 list

Enter each IPv6 address to be assigned on a separate line in ```/usr/local/bin/pve_appended_content.txt```, such as:

```shell
2a01:4f8:1c1c:94de::2
2a01:4f8:1c1c:94de::3
2a01:4f8:1c1c:94de::4
2a01:4f8:1c1c:94de::5
2a01:4f8:1c1c:94de::6
```

This approach can be used when the host machine has not been fully allocated a subnet larger than /80, possesses only a few IPv6 addresses, yet requires the creation of instances with independent IPv6 addresses.