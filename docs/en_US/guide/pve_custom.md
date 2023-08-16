---
outline: deep
---

# Some custom scripts

Each script may have its own system requirements, check them out!

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

There are a lot of bugs to be fixed, PR is welcome to solve problems
