---
outline: deep
---

# OneClickVirt

Distinguish between the panel side and the controlled side. The controlled side needs to have the corresponding virtualization environment installed in advance. You can use other parts of this documentation for environment installation.

## Controlled Side

Refer to other parts of this documentation for environment installation, no further details are provided here.

## Panel Side

The host machine needs to have ```nginx``` or ```caddy``` and ```mysql``` installed, with at least 1G free memory and 1G free disk space.

After installation, the default startup addresses are:

Frontend: ```http://localhost:8080```

Backend API: ```http://localhost:8888```

API Documentation: ```http://localhost:8888/swagger/index.html```

### Backend Installation

#### Linux

Download and execute:

International:

```shell
curl -L https://raw.githubusercontent.com/oneclickvirt/oneclickvirt/refs/heads/main/install.sh -o install.sh && chmod +x install.sh
````

Domestic:

```shell
curl -L https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/oneclickvirt/refs/heads/main/install.sh -o install.sh && chmod +x install.sh
```

Interactive installation:

```
./install.sh
```

Non-interactive installation:

```
noninteractive=true ./install.sh
```

Installation directory: `/opt/oneclickvirt`

Usage:

Start service: `systemctl start oneclickvirt`

Stop service: `systemctl stop oneclickvirt`

Enable autostart: `systemctl enable oneclickvirt`

Check status: `systemctl status oneclickvirt`

View logs: `journalctl -u oneclickvirt -f`

#### Windows

See:

[https://github.com/oneclickvirt/oneclickvirt/releases/latest](https://github.com/oneclickvirt/oneclickvirt/releases/latest)

Download the latest compressed file for the corresponding architecture, extract it, and run it.

In the same directory as the executed binary file, download:

[https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/oneclickvirt/refs/heads/main/server/config.yaml](https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/oneclickvirt/refs/heads/main/server/config.yaml)

This file is the configuration file needed later.

### Frontend Installation

#### Linux

The previous installation script will extract the static files to:

```shell
cd /opt/oneclickvirt/web/
```

In this path.

Use `nginx` or `caddy` to build a static website with this path. Whether you need domain binding is up to you.

#### Windows

After downloading the `web-dist.zip` file, extract it and use the corresponding program to build a static website.

## MYSQL

After installing MySQL, create an empty database named ```oneclickvirt```. It is recommended to allow access only from local ```127.0.0.1```. Keep the corresponding username and password safe.

After opening the corresponding page of the front-end, it will automatically jump to the initialization interface, fill in the database information and related user information, test the database link without problems, then you can click the initialization system.

After completing the initialization, it will automatically jump to the home page, you can explore and use it by yourself.

If you are using the default user information for initialization, then the default account is:

Administrator account: admin / Admin123!@#

Ordinary user: testuser / TestUser123!@#

## Configuration File (Optional)
