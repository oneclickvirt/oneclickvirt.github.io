---
outline: deep
---

# Script for One-Click Installation of Certain Containers using Docker

Each container has specific configuration requirements; please refer to them individually.

If the configured memory is not enough, then it's okay to make up for it with the virtual memory [here](https://virt.spiritlhl.net/en_US/guide/docker_install.html#setting-up-virtual-memory).

Note that the following scripts must be pre-installed using the environment installation scripts in this set of tutorials before using them

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
curl -L https://raw.githubusercontent.com/oneclickvirt/docker/main/scripts/onefirefox.sh -o onefirefox.sh && chmod +x onefirefox.sh && bash onefirefox.sh
```

**Deletion**

Modify the following port number ``3003`` to your actual port number, and then execute the command to delete the container, configuration file, and corresponding image

```shell
PORT="3003"
docker stop firefox_${PORT}
docker rm -f firefox_${PORT}
rm -rf /usr/local/bin/firefox_${PORT}
docker rmi jlesage/firefox
```

## One-Click Setup of Chrome Browser Container

- Crashing self-start has been set
- Web checksums and passwords can be set.
- Customizable maximum container memory footprint
- No need to consider whether to support nested virtualization and server architecture.
- Supports sound mapping

**Host requires at least 1 core, 2G RAM, and 10G hard disk, and the size of the container to be opened will take up a minimum of 1G hard disk**

**It is better to hang the execution in the screen during the first installation, to avoid long running SSH connection disconnection**

**Opening**

If no custom username is set, the default username after opening is ```oneclick```.

If no custom password is set, the default password after opening is ```oneclick```.

The default http port is ```3004```, open ```http://IPV4:3004``` after opening.

The default https port is ```3005```, open ```https://IPV4:3005``` after opening.

```shell
curl -L https://raw.githubusercontent.com/oneclickvirt/docker/main/scripts/onechromium.sh -o onechromium.sh && chmod +x onechromium.sh && bash onechromium.sh
```

**Delete**

Change the following port number ```3004``` to your actual http port number, then execute the command enter twice to delete the container, configuration file, and corresponding image

```shell
PORT="3004"
docker stop chromium_${PORT}
docker rm -f chromium_${PORT}
rm -rf /usr/local/bin/config_${PORT}
rm -rf /usr/local/bin/password_${PORT}
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
curl -L https://raw.githubusercontent.com/oneclickvirt/docker/main/scripts/onewebtop.sh -o onewebtop.sh && chmod +x onewebtop.sh && bash onewebtop.sh
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
curl -L https://raw.githubusercontent.com/oneclickvirt/docker/main/extra_scripts/guacamole.sh -o guacamole.sh && chmod +x guacamole.sh && bash guacamole.sh
```
