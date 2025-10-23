---
outline: deep
---

# OneClickVirt

Distinguish between the panel side and the controlled side. The controlled side needs to have the corresponding virtualization environment installed in advance. You can use other sections of this documentation for environment installation. The control side is actually just a panel and has no virtualization environment requirements.

## Controlled Side

Refer to other sections of this documentation for environment installation. This will not be elaborated here. This tutorial provides corresponding installation commands for the four mainstream virtualization technologies. Please refer to them yourself.

If you need to use the panel's traffic control feature, you need to additionally install the ```vnstat``` tool. Download it yourself. If using apt package management, you can use

```shell
apt install -y vnstat
```

to download it. The same applies to other systems.

The controlled side only needs to have the virtualization environment installed, and does not require additional agent installation for control. Just ensure that SSH login is available.

## Panel Side

Hardware requirements include at least 1G of free memory and 2G of free disk space. Installation can be completed using any of the methods below.

| Installation Method | Application Scenario | Advantages | Disadvantages |
|---------|---------|------|------|
| Docker Deployment (Pre-built Image) | Quick deployment, larger footprint | One-click installation, data persistence | Requires Docker environment, large image download  |
| Separate Front-end and Back-end Deployment | High performance, minimal footprint | Best performance, flexible configuration | Complex configuration, requires reverse proxy setup |
| Integrated Deployment | Works with or without public IPv4 address | Simple deployment, no reverse proxy needed | Poor performance |
| Dockerfile Self-compilation | Suitable for secondary development and source code release | Highly customizable | Requires Docker environment, long compilation time |

### Installation via Docker

:::tip
Since the database starts together with the container, do not operate immediately after the container starts. Wait at least 12 seconds.
:::

Available image tags can be queried at:

https://hub.docker.com/r/spiritlhl/oneclickvirt

https://github.com/oneclickvirt/oneclickvirt/pkgs/container/oneclickvirt

#### Method 1: Deploy Using Pre-built Image

**Image Tag Description**

| Image Tag | Description | Application Scenario |
|---------|------|---------|
| `spiritlhl/oneclickvirt:latest` | Integrated version (built-in database) latest | Quick deployment |
| `spiritlhl/oneclickvirt:20251023` | Integrated version specific date | Requires fixed version |
| `spiritlhl/oneclickvirt:no-db` | Separate database version latest | Without built-in database |
| `spiritlhl/oneclickvirt:no-db-20251023` | Separate database version specific date | Without built-in database |

All images support both `linux/amd64` and `linux/arm64` architectures.

##### Deploy in Fresh Environment

Use pre-built ```amd64``` or ```arm64``` images, which will automatically download the corresponding version based on the current system architecture:

Without domain configuration:

```bash
docker run -d \
  --name oneclickvirt \
  -p 80:80 \
  -v oneclickvirt-data:/var/lib/mysql \
  -v oneclickvirt-storage:/app/storage \
  --restart unless-stopped \
  spiritlhl/oneclickvirt:latest
```

Configure domain access:

If you need to configure a domain, set the `FRONTEND_URL` environment variable:

```bash
docker run -d \
  --name oneclickvirt \
  -p 80:80 \
  -e FRONTEND_URL="https://your-domain.com" \
  -v oneclickvirt-data:/var/lib/mysql \
  -v oneclickvirt-storage:/app/storage \
  --restart unless-stopped \
  spiritlhl/oneclickvirt:latest
```

The above methods are only for new installations.

##### Upgrade Only Front-end and Back-end in Existing Environment

First backup the configuration file to the current path:

```shell
docker cp oneclickvirt:/app/config.yaml .
```

Delete only the container without removing the mounted volumes:

```shell
docker rm -f oneclickvirt
```

Then delete the original image:

```shell
docker image rm -f spiritlhl/oneclickvirt:latest
```

Pull the container image again:

```shell
docker pull spiritlhl/oneclickvirt:latest
```

Then follow the steps for deployment in a fresh environment. Note that after waiting 12 seconds and opening the front-end, you will find it automatically skips the initialization interface because the data has been persisted and imported.

Then overwrite the original configuration file:

```shell
docker cp config.yaml oneclickvirt:/app/config.yaml
```

##### Redeploy in Existing Environment

This will completely delete the original data before redeployment. You need to delete not only the container but also the corresponding mount points:

```shell
docker rm -f oneclickvirt
docker volume rm oneclickvirt-data oneclickvirt-storage oneclickvirt-config
```

Then delete the original image:

```shell
docker image rm -f spiritlhl/oneclickvirt:latest
```

Pull the container image again:

```shell
docker pull spiritlhl/oneclickvirt:latest
```

Then follow the steps for deployment in a fresh environment. This will prompt for reinitialization, as all original data has been deleted.

#### Method 2: Self-compile and Deploy via Dockerfile

This method is suitable for self-modifying source code and custom builds:

##### Integrated Version (Built-in Database)

```bash
git clone https://github.com/oneclickvirt/oneclickvirt.git
cd oneclickvirt
docker build -t oneclickvirt .
docker run -d \
  --name oneclickvirt \
  -p 80:80 \
  -v oneclickvirt-data:/var/lib/mysql \
  -v oneclickvirt-storage:/app/storage \
  --restart unless-stopped \
  oneclickvirt
```

##### Separate Database Version (Without Built-in Database)

```bash
git clone https://github.com/oneclickvirt/oneclickvirt.git
cd oneclickvirt
docker build -f Dockerfile.no-db -t oneclickvirt:no-db .
docker run -d \
  --name oneclickvirt \
  -p 80:80 \
  -e FRONTEND_URL="https://your-domain.com" \
  -e DB_HOST="your-mysql-host" \
  -e DB_PORT="3306" \
  -e DB_NAME="oneclickvirt" \
  -e DB_USER="root" \
  -e DB_PASSWORD="your-password" \
  -v oneclickvirt-storage:/app/storage \
  --restart unless-stopped \
  oneclickvirt:no-db
```

### Installation via Pre-compiled Binary Files

There are also two methods here:
- Frontend-backend separation deployment (backend and frontend are compiled separately into corresponding files for deployment), better performance
- All-in-one deployment (frontend and backend are integrated into one file for deployment), lower performance

#### Frontend-Backend Separation Deployment

##### Linux

Download and execute

International:

```shell
curl -L https://raw.githubusercontent.com/oneclickvirt/oneclickvirt/refs/heads/main/install.sh -o install.sh && chmod +x install.sh
```

Domestic:

```shell
curl -L https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/oneclickvirt/refs/heads/main/install.sh -o install.sh && chmod +x install.sh
```

Interactive environment installation:

```
./install.sh
```

Non-interactive environment installation:

```
noninteractive=true ./install.sh
```

Installation directory: ```/opt/oneclickvirt```

After successful installation, you need to manually start the service:

```shell
systemctl start oneclickvirt
```

Other usage methods:

Stop service:

```shell
systemctl stop oneclickvirt
```

Enable auto-start on boot:

```shell
systemctl enable oneclickvirt
```

Check status:

```shell
systemctl status oneclickvirt
```

View logs:

```shell
journalctl -u oneclickvirt -f
```

Restart service:

```shell
systemctl restart oneclickvirt
```

The installation script will extract static files to:

```shell
cd /opt/oneclickvirt/web/
```

this path.

Use ```nginx``` or ```caddy``` to establish a static website with this path. Whether to bind a domain name is your choice.

After deploying the static files, you need to reverse proxy the backend address for frontend use. Here's a specific example using ```OpenResty```:

![](./images/proxy.png)

You need to reverse proxy the path ```/api``` to the backend address ```http://127.0.0.1:8888```. If you're using ```1panel```, you only need to fill in these fields, and the default backend domain uses the default ```$host``` without modification.

If you're using ```nginx``` or ```caddy```, please refer to the proxy source code below and modify it for your own proxy setup:

```shell
location /api {
    proxy_pass http://127.0.0.1:8888; 
    proxy_set_header Host $host; 
    proxy_set_header X-Real-IP $remote_addr; 
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; 
    proxy_set_header REMOTE-HOST $remote_addr; 
    proxy_set_header Upgrade $http_upgrade; 
    proxy_set_header Connection $http_connection; 
    proxy_set_header X-Forwarded-Proto $scheme; 
    proxy_set_header X-Forwarded-Port $server_port; 
    proxy_http_version 1.1; 
    add_header X-Cache $upstream_cache_status; 
    add_header Cache-Control no-cache; 
    proxy_ssl_server_name off; 
    proxy_ssl_name $proxy_host; 
}
```

##### Windows

Check:

https://github.com/oneclickvirt/oneclickvirt/releases/latest

Download the latest compressed file for the corresponding architecture, extract and execute.

In the same directory as the executing binary file, download:

https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/oneclickvirt/refs/heads/main/server/config.yaml

This is the configuration file needed for subsequent use.

After downloading the ```web-dist.zip``` file, extract it and use the corresponding program to establish a static website, setting up the reverse proxy similar to Linux.

#### All-in-One Deployment

Here we no longer distinguish between frontend and backend concepts. From:

https://github.com/oneclickvirt/oneclickvirt/releases/latest

Find the compressed package with the ```allinone``` tag to download. Note the distinction between ```amd64``` and ```arm64``` architectures, as well as the corresponding systems.

In Linux, use the ```tar -zxvf``` command to extract the ```tar.gz``` compressed package. In Windows, use the corresponding extraction tool to extract the ```zip``` compressed package, and copy the binary file to the location where you need to deploy the project.

It's best to move it to a dedicated folder, as structured log files will be generated during operation.

(The following instructions will use the amd64 architecture Linux system file as an example)

In Linux, grant executable permissions to the file, such as:

```shell
chmod 777 server-allinone-linux-amd64
```

Then download:

https://github.com/oneclickvirt/oneclickvirt/blob/main/server/config.yaml

to the same folder.

In Linux, use ```screen``` or ```tmux``` or ```nohup``` commands to execute the binary file in the background, such as:

```shell
./server-allinone-linux-amd64
```

Then open port 8888 of the corresponding IP address to see the frontend for use, such as:

```
http://your-IP-address:8888
```

If you're on a Windows system, you need to start the exe file with administrator privileges, and ensure that the ```config.yaml``` configuration file exists in the same folder as the exe file before starting, otherwise startup will result in a white screen or connection issues. As for how to execute it in the background, explore on your own. You can also directly run it with the cmd window open.

The all-in-one deployment mode is suitable for situations where the local machine doesn't have a public IP. Your IP address can be ```localhost``` or ```127.0.0.1```, or it can be the corresponding public IPv4 address. Test in your specific deployment environment.

## Database Initialization

After installing and starting ```mysql```, create an empty database ```oneclickvirt```, using type ```utf8mb4```, preferably accessible only locally via ```127.0.0.1```. Save the corresponding username and password. (If you're using the all-in-one Docker deployment container, the database is included and you don't need to create an empty database yourself. By default, the corresponding database has already been started in the container and is available.)

After opening the corresponding frontend page, it will automatically redirect to the initialization interface.

![](./images/init.png)

Fill in the database information and related user information. Test the database connection, and if there are no issues, you can click to initialize the system.

![](./images/init_success.png)

After completing initialization, it will automatically redirect to the homepage, where you can explore and use it on your own.

![](./images/home.png)

If you used the default user information for initialization, the default account is:

Administrator account username and password are:

```
admin
```

```
Admin123!@#
```

During initialization, all image seed data is loaded into the database by default, but by default only ```debian``` and ```alpine``` related version images are enabled. This is to avoid user choice paralysis caused by too many enabled images.

If you need additional types of images, you need to search and enable them by type, architecture, and version in the system image management interface under administrator privileges.

Please immediately change the default administrator username and password after initialization, and disable or delete the default enabled test user. This can be done in the administrator's user management page.