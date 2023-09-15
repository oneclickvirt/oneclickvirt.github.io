---
outline: deep
---

# Script for One-Click Installation of Certain Containers using Docker

Each container has specific configuration requirements; please refer to them individually.

If the configured memory is not enough, then it's okay to make up for it with the virtual memory [here](https://virt.spiritlhl.net/en_US/guide/docker_install.html#setting-up-virtual-memory).

Note that the following scripts must be pre-installed using the environment installation scripts in this set of tutorials before using them

## One-Click Setup of Android System Container

- Customizable Android version
- Automatically creates a validated web website
- Automatically installs Nginx and configures reverse proxy. Option to bind a domain is available. Default is port 80 if no domain binding is chosen.
- No need to worry about host machine supporting nested virtualization
- Supports x86_64 and ARM architectures

**Host machine should have a minimum configuration of 1 core, 2GB RAM, and 15GB storage, else starting the setup might lead to host machine freezing.**

Ubuntu is recommended for hosting, Debian may cause white screen on Android.

Newer Android versions occupy more resources. The above configuration requirements are for the minimum version of Android. (Personally tested with the tag "12.0.0-latest", higher versions resulted in a blank screen. Test which version works for you.)

**Setup:**

Command:

```shell
curl -L https://raw.githubusercontent.com/spiritLHLS/docker/main/scripts/create_android.sh -o create_android.sh && chmod +x create_android.sh && bash create_android.sh
```

After executing the command, follow the prompts to input the required information. Make sure to choose the version by entering the corresponding number index. Once the installation is complete, open ```YourMachineIPv4+80Port``` to log in.

If you need to check the generated Android information and web login details, execute ```cat /root/android_info``` to retrieve the information.

Default username: ```onea```
Default password: ```oneclick```

For remote desktop, click on ```H264 Converter``` to initiate the redirection.

**Please note that currently only one Android container can be generated. Do not generate duplicates. If you need to replace the version, please execute the subsequent commands after deletion.**

**Deletion:**

- Delete the container
- Delete the corresponding container image
- Delete the configuration file

```shell
docker rm -f android
docker rm -f scrcpy_web
docker rmi $(docker images | grep "redroid" | awk '{print $3}')
rm -rf /etc/nginx/sites-enabled/reverse-proxy
rm -rf /etc/nginx/sites-available/reverse-proxy
rm -rf /etc/nginx/passwd_scrcpy_web
rm -rf /root/android_info
```

## One-Click Setup of Windows System Container

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
curl -L https://raw.githubusercontent.com/spiritLHLS/docker/main/scripts/onewindows.sh -o onewindows.sh && chmod +x onewindows.sh
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

## One-Click Setup of Firefox Browser Container

- Crash recovery on startup has been configured.
- Chinese fonts have been integrated into the container.
- Built-in web validation with the option to set a custom password.
- Maximum memory usage for the container is customizable.
- Choice to enable VNC port, disabled by default.
- No need to consider support for nested virtualization or server architecture.
- Audio mapping is not supported; sound transmission is unavailable on both the web and VNC.

**The host machine should have at least 1 core, 1GB RAM, and 5GB disk space. The created container will occupy a minimum of 1GB disk space.**

**Setup:**

After setup, the default password is ```oneclick```.

The default web port is ```3003```. Once the setup is complete, simply open ```HOST_IPV4:PORT``` in your browser.

```shell
curl -L https://raw.githubusercontent.com/spiritLHLS/docker/main/scripts/onefirefox.sh -o onefirefox.sh && chmod +x onefirefox.sh && bash onefirefox.sh
```

**Deletion**

Modify the following port number ``3003`` to your actual port number, and then execute the command to delete the container, configuration file, and corresponding image

```shell
PORT="3003"
docker stop firefox_${PORT}
docker rm -f firefox_${PORT}
rm -f /usr/local/bin/firefox_${PORT}
docker rmi jlesage/firefox
```

## One-Click Setup of Chrome Browser Container

- Crashing self-start has been set
- Web checksums and passwords can be set.
- Customizable maximum container memory footprint
- No need to consider whether to support nested virtualization and server architecture.
- Supports sound mapping

Sound mapping is supported **Host requires at least 1 core, 2G RAM, and 5G hard disk, and the size of the container to be opened will take up a minimum of 1G hard disk**.

**Opening**

The default password after opening is ```oneclick```.

The default http port is ```3004```, open ```http://IPV4:3004``` after opening.

The default https port is ```3005```, open ```https://IPV4:3005``` after opening.

```shell
curl -L https://raw.githubusercontent.com/spiritLHLS/docker/main/scripts/onechromium.sh -o onechromium.sh && chmod +x onechromium.sh && bash onechromium.sh
```

**Delete**

Change the following port number ```3004``` to your actual http port number, then execute the command enter twice to delete the container, configuration file, and corresponding image

```shell
PORT="3004"
docker stop chromium_${PORT}
docker rm -f chromium_${PORT}
rm -f /usr/local/bin/config_${PORT}
docker rmi lscr.io/linuxserver/chromium
```

## One-Click Setup of Desktop Container

- Crashes automatically restart have been configured.
- Chinese fonts are included in the setup.
- Built-in web validation with the ability to set your own username and password.
- Customizable maximum memory usage for the container.
- No need to consider nested virtualization support and server architecture.
- Sound mapping is supported, and sound can be transmitted via the web interface.

A complete Linux desktop on which you can use a browser

**The host system requires at least 1 core, 2 GB of RAM, and 5 GB of hard disk space. The created container will occupy a minimum of 3.2 GB of hard disk space.**

**Setup Instructions:**

After setup, the default username is ```onew``` and the password is ```oneclick```. The default maximum memory usage is 2 GB.

The default web port for HTTP protocol is ```3004```, and for HTTPS protocol is ```3005```. After setup, open the corresponding protocol with ```localhost's IPV4:port``` in your web browser.

Run the following command to download and execute the setup script:

```
curl -L https://raw.githubusercontent.com/spiritLHLS/docker/main/scripts/onewebtop.sh -o onewebtop.sh && chmod +x onewebtop.sh && bash onewebtop.sh
```

**Deletion**

Command:

```shell
docker ps -a
```

Query for containers with a prefix of 'webtop' in their names, and record the IDs of these containers.

```shell
docker rm -f container_ID
```

To remove the corresponding image, you can use the following command after deleting all associated containers:

```shell
docker rmi lscr.io/linuxserver/webtop
```

## One-Click Installation of Guacamole

A web-based tool for controlling servers using protocols like SSH or RDP.

Website: ```http://your_IPV4_address:80/guacamole```

Default Username: ```guacadmin```

Default Password: ```guacadmin```

After installation, remember to change the password upon login.

**The host machine should have at least 1 core, 2GB RAM, and 10GB of disk space; otherwise, launching might lead to host machine freezing!**

Command:

```shell
curl -L https://raw.githubusercontent.com/spiritLHLS/docker/main/extra_scripts/guacamole.sh -o guacamole.sh && chmod +x guacamole.sh && bash guacamole.sh
```
