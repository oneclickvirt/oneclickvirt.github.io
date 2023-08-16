---
outline: deep
---

# Script for One-Click Installation of Certain Containers Using Docker

Each container has corresponding configuration requirements, please refer to them accordingly.

## One-Click Setup of Android System Container

- Customizable Android version
- Automatically creates a validated web website
- Automatically performs nginx installation and reverse proxy configuration, with the option to bind a domain name or use port 80 by default if no binding is selected
- No need to consider whether the host machine supports nested virtualization
- Supports both x86_64 and ARM architectures

**The host machine must have a configuration of at least 1 core, 2GB memory, and 15GB disk space, otherwise the setup may cause the host machine to freeze.**

The newer the Android version, the larger the space it occupies. The above configuration requirements are for the minimum Android version configuration (personally tested up to the '12.0.0-latest' tag, higher versions resulted in a blank screen, please test which version works for you).

**Setup:**

International

```shell
curl -L https://raw.githubusercontent.com/spiritLHLS/docker/main/scripts/create_android.sh -o create_android.sh && chmod +x create_android.sh && bash create_android.sh
```

China

```shell
curl -L https://ghproxy.com/https://raw.githubusercontent.com/spiritLHLS/docker/main/scripts/create_android.sh -o create_android.sh && chmod +x create_android.sh && bash create_android.sh
```

After executing the command, follow the prompts to input the required information. Please note that when selecting the version, input the corresponding number according to the option's numeric order. After the installation is complete, open the "Local IPV4+80 port" to log in.

If you need to retrieve the generated Android information and web login details, execute the command ```cat /root/android_info``` to query the information.

Default username: ```onea```

Default password: ```oneclick```

For remote desktop, click on ```H264 Converter``` to initiate the redirection.

**Currently, only the generation of one Android container is supported. Do not generate duplicates. If you need to replace the version, please execute the subsequent command to delete before reestablishing.**

**Deletion**

- Delete container
- Delete corresponding container image
- Delete configuration file

```
docker rm -f android
docker rm -f scrcpy_web
docker rmi $(docker images | grep "redroid" | awk '{print $3}')
rm -rf /etc/nginx/sites-enabled/reverse-proxy
rm -rf /etc/nginx/sites-available/reverse-proxy
rm -rf /etc/nginx/passwd_scrcpy_web
rm -rf /root/android_info
```

## One-Click Creation of Windows System Containers

- Share all resources of the host machine. Based on Docker, it only occupies the size of the system, suitable for multiple instances.
- Share IP addresses. NAT mapping is implemented using Docker, allowing the choice of mapping to the external network or internal network only.
- The configured Windows system is set to defaultly utilize up to 1 core, 2GB of memory, and 50GB of hard disk space. Actual usage may vary based on usage patterns.
- No need for iptables for NAT mapping. Port mappings are automatically deleted when containers are removed, facilitating maintenance.
- It's important to consider whether the host machine supports nested virtualization.

**The host machine needs to support nested virtualization and currently only supports systems based on the X86_64 architecture. There are no ARM machines available to compile corresponding images.**

Execute.

```
egrep -c '(vmx|svm)' /proc/cpuinfo
```

The result needs to be greater than or equal to 1, it cannot be 0.

Then, you need to first configure Docker to start with v1 version cgroup.

```
sed -i 's/GRUB_CMDLINE_LINUX="\(.*\)"/GRUB_CMDLINE_LINUX="\1 systemd.unified_cgroup_hierarchy=0"/' /etc/default/grub
update-grub
ls
```

If there are no errors during execution, run the command ```reboot``` to restart the system for the settings to take effect.

**Supported Images**

Self-built image in use: [https://hub.docker.com/r/spiritlhl/wds](https://hub.docker.com/r/spiritlhl/wds)

| Image Name | Image Size |
|------------|------------|
| 10         | 20G        |
| 2022       | 17.5G      |
| 2019       | 17G        |

The size of the created container will be slightly larger than the image size, but not by much.

**Download Script**

```
curl -L https://raw.githubusercontent.com/spiritLHLS/docker/main/scripts/onewindows.sh -o onewindows.sh && chmod +x onewindows.sh
```

**Usage Instructions**

Make sure to execute in the `screen` window before opening to avoid SSH connection drop due to long-term connections.

```
./onewindows.sh system_version RDP_port External_mapping(Y/N, leave empty for default N)
```

Before opening, confirm that the host machine has a disk size at least twice the size of the image plus 10GB, as Docker first needs to pull the image locally before creating it.

During the creation process, the peak disk usage is `host_system + image_size + container_size`.

For example, to open the Windows 2019 container with the lowest occupancy, mapping external RDP port to 13389, and enabling external mapping (mapping to your server's public IPv4 address):

```
./onewindows.sh 2019 13389 Y
```

The default usernames after opening are `Administrator` and `vagrant`.

The default password is `vagrant`.

If you choose to map an external port, make sure to change the corresponding account's password (both accounts might exist, try both) after logging in, to prevent potential brute-force attacks.

**Deletion**

To delete corresponding images and containers, first execute `docker ps -a` and `docker images` to find the ID of the image with the name `spiritlhl/wds`, then use:

```
docker rm -f container_ID
docker rmi image_ID
```

After deletion, you can open containers for different versions of Windows.

## One-Click Setup of Firefox Browser Container

- Crash auto-restart is set.
- Chinese fonts are included.
- Web password is provided.
- Optional VNC port activation (default is off).
- No need to consider nested virtualization support or server architecture.

**The host machine needs at least 1 core, 1GB RAM, and 5GB disk. The container size will occupy at least 1GB of disk space.**

**Setup**

After setup, the default password is `oneclick`.

The default web port is `3003`. After setup, open `localhost_IPv4:port` in a browser.

```
curl -L https://raw.githubusercontent.com/spiritLHLS/docker/main/scripts/onefirefox.sh -o onefirefox.sh && chmod +x onefirefox.sh && bash onefirefox.sh
```

**Deletion**

Execute:

```
docker ps -a
```

Find containers with a name prefix of `firefox`, record the container ID, then use:

```
docker rm -f container_ID
```

After deleting all associated containers, you can use `docker rmi jlesage/firefox` to delete the corresponding image.

## One-Click Installation of Guacamole

A web-based tool to connect to servers using protocols like SSH or RDP.

URL: `http://your_IPV4_address:80/guacamole`

Default user: `guacadmin`

Default password: `guacadmin`

After installation, log in and modify as needed.

**The host machine should have at least 1 core, 2GB RAM, and 10GB disk to avoid potential host freezing during setup.**

International:

```shell
curl -L https://raw.githubusercontent.com/spiritLHLS/docker/main/extra_scripts/guacamole.sh -o guacamole.sh && chmod +x guacamole.sh && bash guacamole.sh
```

China:

```shell
curl -L https://ghproxy.com/https://raw.githubusercontent.com/spiritLHLS/docker/main/extra_scripts/guacamole.sh -o guacamole.sh && chmod +x guacamole.sh && bash guacamole.sh
```