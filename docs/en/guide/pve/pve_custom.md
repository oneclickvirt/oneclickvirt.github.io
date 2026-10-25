---
outline: deep
---

# Custom Sections

## Running Proxmox VE 7 / 8 / 9 in Docker on a non-Debian system

Install Docker first. The host must run native Linux on X86_64 or ARM64; use ```uname -m``` to check. X86_64 images use official PVE packages, with Debian 11, 12 and 13 for PVE 7, 8 and 9. ARM64 images use packages from the community fork [PXVIRT](https://github.com/jiangcuo/pxvirt), with Debian 12 and 13 for versions 8 and 9. These are not official Proxmox ARM builds.

This method is for experimental environments. The container shares the host kernel and cannot install or switch to a PVE kernel. HA and hardware watchdog services are disabled. X86_64 and ARM64 use separate image tags. The existing ```7_aarch64``` tag is a historical image; its old ARM upstream is no longer maintained and this workflow does not update it.

### Choose a version

| Version | Architecture | Container base system | Docker Hub image | Release download page |
|---------|--------------|-----------------------|------------------|-----------------------|
| PVE 7 | X86_64 | Debian 11 | `spiritlhl/pve:7` | [docker-pve7](https://github.com/oneclickvirt/pve/releases/tag/docker-pve7) |
| PVE 8 | X86_64 | Debian 12 | `spiritlhl/pve:8` | [docker-pve8](https://github.com/oneclickvirt/pve/releases/tag/docker-pve8) |
| PVE 9 | X86_64 | Debian 13 | `spiritlhl/pve:9` | [docker-pve9](https://github.com/oneclickvirt/pve/releases/tag/docker-pve9) |
| PXVIRT 8 | ARM64 | Debian 12 | `spiritlhl/pve:8_aarch64` | [docker-pve8](https://github.com/oneclickvirt/pve/releases/tag/docker-pve8) |
| PXVIRT 9 | ARM64 | Debian 13 | `spiritlhl/pve:9_aarch64` | [docker-pve9](https://github.com/oneclickvirt/pve/releases/tag/docker-pve9) |

Each version and architecture is updated separately. X86_64 also has the tags ```7_x86_64```, ```8_x86_64``` and ```9_x86_64```; ARM64 also has ```8_arm64``` and ```9_arm64```. The tags ```7```, ```8``` and ```9``` remain amd64 images. PVE 7 has reached the end of official support and is provided for older environments. Use PVE 9 for new deployments.

### Download the image

The following example uses PVE 9. For another version, change ```9``` to ```7``` or ```8``` in the first line.

```bash
PVE_VERSION=9
PVE_IMAGE="spiritlhl/pve:${PVE_VERSION}"
docker pull "$PVE_IMAGE"
```

For an ARM64 host, use the following commands and select version ```8``` or ```9```:

```bash
PVE_VERSION=9
PVE_IMAGE="spiritlhl/pve:${PVE_VERSION}_aarch64"
docker pull "$PVE_IMAGE"
```

You can also download the archive from the corresponding GitHub Release, verify it and import it. Use the archive and checksum file from the same version's Release. The example below uses amd64. For ARM64, change ```PVE_ARCH``` to ```arm64``` and choose version ```8``` or ```9```. The checksum filename and image tag are selected automatically.

```bash
PVE_VERSION=9
PVE_ARCH=amd64
PVE_CHECKSUMS=SHA256SUMS
PVE_IMAGE="spiritlhl/pve:${PVE_VERSION}"
if [ "$PVE_ARCH" = arm64 ]; then
  PVE_CHECKSUMS=SHA256SUMS-arm64
  PVE_IMAGE="spiritlhl/pve:${PVE_VERSION}_aarch64"
fi
curl -fL --retry 3 "https://github.com/oneclickvirt/pve/releases/download/docker-pve${PVE_VERSION}/pve${PVE_VERSION}-${PVE_ARCH}.tar.gz" -o "pve${PVE_VERSION}-${PVE_ARCH}.tar.gz"
curl -fL --retry 3 "https://github.com/oneclickvirt/pve/releases/download/docker-pve${PVE_VERSION}/${PVE_CHECKSUMS}" -o "$PVE_CHECKSUMS"
sha256sum -c "$PVE_CHECKSUMS"
gzip -dc "pve${PVE_VERSION}-${PVE_ARCH}.tar.gz" | docker load
```

The imported amd64 archive includes ```spiritlhl/pve:${PVE_VERSION}```, ```spiritlhl/pve:${PVE_VERSION}_x86_64``` and the previous local tag ```oneclickvirt/pve:${PVE_VERSION}```, all pointing to the same image. The ARM64 archive includes ```spiritlhl/pve:${PVE_VERSION}_aarch64```, ```spiritlhl/pve:${PVE_VERSION}_arm64``` and ```oneclickvirt/pve:${PVE_VERSION}_aarch64```.

GitHub Actions checks for updates weekly. You can also run the [build workflow](https://github.com/oneclickvirt/pve/actions/workflows/pve-docker.yml) manually. After the build and all checks inside a disposable VM pass, the image is pushed to [Docker Hub](https://hub.docker.com/r/spiritlhl/pve). The remote image is then verified before the corresponding GitHub Release is updated. Images that fail the runtime checks are not published. The Release includes ```build.json``` for amd64 and ```build-arm64.json``` for ARM64, recording package versions, source commit, image ID, Docker Hub digests and archive checksum. The ARM8 repository currently lacks ```python3-virt-firmware```, which its latest qemu-server requires. Builds select a compatible qemu-server with complete dependencies and retain an APT version pin. See ```/usr/share/pve-container/build-info.json``` inside the image for the installed versions.

The [central CNB build repository](https://cnb.cool/oneclickvirt/virtualization-images) also has a manual entry that triggers the same workflow for amd64 PVE 7/8/9 and ARM64 PXVIRT 8/9. Builds use GitHub runners of the corresponding architecture. On amd64, validation runs inside a disposable VM using KVM. ARM64 candidates are transferred to a separate disposable GitHub-hosted ARM VM for validation without publication credentials. A separate job publishes images only after validation passes. Temporary files transferred between jobs are retained for one day and do not use CNB object storage.

### Pull from CNB

The same validated images are also available in [CNB container artifacts](https://cnb.cool/oneclickvirt/pve/-/packages). CNB checks the GitHub Releases hourly and copies each published image by its recorded Docker Hub digest. Image IDs and architectures are verified before Docker pull checks. The version and architecture tags match Docker Hub.

For an X86_64 host, choose `7`, `8` or `9`:

```bash
PVE_VERSION=9
PVE_IMAGE="docker.cnb.cool/oneclickvirt/pve/pve:${PVE_VERSION}"
docker pull "$PVE_IMAGE"
```

For an ARM64 host, choose `8` or `9`:

```bash
PVE_VERSION=9
PVE_IMAGE="docker.cnb.cool/oneclickvirt/pve/pve:${PVE_VERSION}_aarch64"
docker pull "$PVE_IMAGE"
```

Then continue with the password and startup commands below, which use `$PVE_IMAGE`. The `7`, `8` and `9` tags remain amd64; use the architecture suffix on ARM64. Pulling an update does not replace an existing container.

### Set a password and start the container

There is no default password. Create your own root password file first. Run these commands on the host.

```bash
install -d -m 700 /opt/pve-docker
(umask 077; openssl rand -base64 24 > /opt/pve-docker/root-password)
modprobe -a fuse tun
docker run -d \
  --name pve --hostname pve \
  --dns-search=. \
  --privileged --cgroupns=private \
  --restart unless-stopped \
  --tmpfs /run --tmpfs /run/lock --tmpfs /tmp \
  --mount type=bind,src=/opt/pve-docker/root-password,dst=/run/secrets/pve-root,readonly \
  -e PVE_ROOT_PASSWORD_FILE=/run/secrets/pve-root \
  -p 8006:8006 \
  "$PVE_IMAGE"
```

Open ```https://HOST_IP:8006```, select Linux PAM authentication and log in as ```root```. Use ```cat /opt/pve-docker/root-password``` to view the generated password. The first start generates this container's certificates and SSH host keys, so allow some time for the panel to become ready.

The option ```--dns-search=.``` prevents the container from inheriting the host's DNS search suffix. An overly long suffix can stop PVE from generating its node certificate. DNS servers are still available.

To change the password, run ```docker exec -it pve passwd root```. The password file is used only during initial setup; passwords changed inside the container survive restarts.

### Usage and saved data

Use ```docker exec -it pve bash``` to manage PVE inside the container. The host SSH service continues to manage the host. Configure bridges, gateways and VM port forwarding yourself; the existing one-click configuration for a physical PVE host does not apply directly.

Build checks cover signed APT source updates and recorded panel statistics on ARM64, HTTPS/PAM login, VM creation and disk import, VM boot and reboot using TCG, and preservation of passwords, certificates and VM configuration after a container restart. The outer disposable VM uses KVM on amd64; ARM64 validation uses an independent GitHub-hosted ARM VM. Guests managed inside the container use TCG on both architectures. Nested KVM inside the PVE container has not been validated. KVM acceleration requires ```/dev/kvm``` on the host. Without this device, disable KVM hardware virtualization in the VM options to use TCG. LXC, PCI passthrough, clustering and migration are outside this image's validation scope.

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