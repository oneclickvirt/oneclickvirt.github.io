---
outline: deep
---

# Running Windows Virtual Machine in Docker

## One-Click Deployment (Using Vagrant)

- Shares all resources of the host machine; based on Docker, so it only occupies the size of the system, suitable for multiple instances.
- Shares IP; Docker's NAT mapping is employed. You can choose whether to map to the external network or just the internal network.
- The configured Windows system is set to use a maximum of 1 core, 2GB RAM, and 50GB hard disk by default. Actual usage may vary based on usage patterns.
- No need for iptables for NAT mapping; port mappings are automatically deleted when containers are removed, making maintenance easier.
- Ensure that the host machine supports nested virtualization, and currently, only X86_64 architecture systems are supported. I haven't compiled corresponding images for ARM devices at the moment.

**The host machine needs to support nested virtualization and currently only supports systems based on the X86_64 architecture; I don't have an ARM machine on hand to compile the corresponding image at the moment.**

Command:

```shell
egrep -c '(vmx|svm)' /proc/cpuinfo
```

The result should be greater than or equal to 1 and cannot be 0.

Next, you need to configure Docker to start using the v1 version of cgroup.

```shell
sed -i 's/GRUB_CMDLINE_LINUX="\(.*\)"/GRUB_CMDLINE_LINUX="\1 systemd.unified_cgroup_hierarchy=0"/' /etc/default/grub
update-grub
ls
```

If there are no errors during execution, run the ```reboot``` command to restart the system and apply the settings.

**Supported Images**

We are using custom-built images: [https://hub.docker.com/r/spiritlhl/wds](https://hub.docker.com/r/spiritlhl/wds)

| Image Name | Image Size |
|------------|------------|
| 10         | 20GB       |
| 2022       | 17.5GB     |
| 2019       | 17GB       |

The size of the created container will be slightly larger than the image size, but not by much.

**Download Script**

```
curl -L https://raw.githubusercontent.com/oneclickvirt/docker/main/scripts/onewindows.sh -o onewindows.sh && chmod +x onewindows.sh
```

**Usage Instructions**

Make sure to execute the following commands in a 'screen' session before proceeding, to avoid potential disconnection or freezing of the SSH connection.

```
./onewindows.sh <container_name> <system_version> <RDP_port> <external_mapping>
```

- Replace <container_name> with the name.
- Replace <system_version> with the desired Windows system version.
- Replace <RDP_port> with the port number for RDP access.
- If you want to enable external mapping, replace <external_mapping> with 'Y'. If not, leave it blank or use 'N'.

Before initiating the setup, ensure that the host machine has a disk size at least twice the size of the image, plus an additional 10GB, as Docker needs to pull the image locally before creating the container.

During the creation process, the peak disk usage will be ```host_system_size + image_size + container_size```.

For example, to set up a container with the name ```test```, the container with the lowest occupancy ```Windows 2019``` system, map the extranet RDP port ```13389``` and set it to ```extranet mapping``` (mapping to your server's extranet IPV4 address)

```shell
./onewindows.sh test 2019 13389 Y
```

After it, the default usernames are ```Administrator``` and ```vagrant```, with the default password being ```vagrant```.

If you choose to open a mapped extranet port, be sure to log in and change the password of the corresponding account (both accounts may have, try it yourself), otherwise it may be abused by someone blasting

**Deletion**

To delete the corresponding image and container, first use the command ```docker ps -a``` and ```docker images``` to find the ID of the image named ```spiritlhl/wds```. Then, use the following commands accordingly:

```
docker rm -f container_ID
docker rmi image_ID
```

After deletion, you can create containers of different versions of Windows.

**Other similar projects**

https://github.com/dockur/windows - Similar project that support more systems, but have more resource requirements

https://github.com/dockur/windows-arm/ - It's great that he has ARM servers for mirror compilation, my project doesn't have

Note that both of the above projects require a host with at least 4 cores of CPU, at least 4G of RAM, and at least 64G of hard disk, which is greater than the mirroring requirements of my project. (The advantage of his project is that you can customize many configuration items, see his corresponding project description for details.)

## Manual Provisioning (via the Dockur Project)

This project supports VM creation using QEMU even on host systems that do not support nested virtualization.

### Original Project Repositories

* [https://github.com/dockur/windows](https://github.com/dockur/windows)
* [https://github.com/dockur/windows-arm](https://github.com/dockur/windows-arm)

⚠️ Notes:

* The original project provides only the launcher, not a Windows image.
* The first container startup may take up to 4 hours on domestic (China) networks, due to image download and installation.
* The host system should meet the following minimum hardware requirements (can be adjusted via script modifications):

  * CPU: At least 4 cores
  * RAM: At least 4 GB
  * Disk: At least 64 GB

For customization such as reducing resource usage or changing launch parameters, refer to:

* [https://www.spiritysdx.top/20250405/](https://www.spiritysdx.top/20250405/)
* [https://www.spiritysdx.top/20250315/](https://www.spiritysdx.top/20250315/)

### For x86\_64 Architecture Users

A pre-modified single-file launcher is available to simplify building a Windows image. This version writes system files and images directly into Docker’s writable layer—no external image mounting required.

Download link:
[https://github.com/oneclickvirt/docker/releases/download/amd64\_builder/builder.tar](https://github.com/oneclickvirt/docker/releases/download/amd64_builder/builder.tar)

Import Docker image:

```bash
docker load -i builder.tar
```

#### Launching the Container with a Custom Windows ISO

Download a Windows ISO image from:
[https://down.idc.wiki/ISOS/Windows/](https://down.idc.wiki/ISOS/Windows/)

Sample command to start the container:

```bash
docker run -it -d \
  -e RAM_SIZE="8G" \
  -e CPU_CORES="4" \
  --name win2022 \
  -p 8006:8006 \
  --device=/dev/kvm \
  --device=/dev/net/tun \
  --cap-add NET_ADMIN \
  -v "$(pwd)/WindowsImage.iso:/boot.iso" \
  --stop-timeout 120 \
  windows:builder
```

### Using Pre-Built Image (Recommended for Quick Deployment)

We also offer a ready-to-use image with the system and configuration already integrated. Features:

* Image size: \~26 GB (includes system image and default config)
* Supports auto disk expansion and startup tasks
* Just download, import, and run
* ⚠️ Note: Combined download will require \~60 GB of free space

#### Download and Merge Split Files

```bash
curl https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/docker/refs/heads/main/extra_scripts/mergew.sh -o mergew.sh
chmod +x mergew.sh
bash mergew.sh
```

#### Start the Container

```bash
docker load -i win2022.tar
docker run -it -d \
  -e RAM_SIZE="4G" \
  -e CPU_CORES="2" \
  --name win2022 \
  -p 8006:8006 \
  --device=/dev/kvm \
  --device=/dev/net/tun \
  --cap-add NET_ADMIN \
  --stop-timeout 120 \
  windows:2022
```

### Important Notes

It is not recommended to use docker commit to save changes to this image, as repeated layer stacking may cause the image size to exceed 40 GB.

For personalized configuration or additional software integration, always start from the builder image to ensure a clean and maintainable result.