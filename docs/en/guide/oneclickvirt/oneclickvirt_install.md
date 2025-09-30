---
outline: deep
---

# OneClickVirt

Distinguish between the panel side and the controlled side. The controlled side needs to have the corresponding virtualization environment installed in advance. You can use the main installation instructions from other parts of this documentation to install the environment.

## Controlled Side

For environment installation, refer to the main installation instructions from other parts of this documentation. This section will not go into excessive detail. This tutorial provides corresponding installation commands for the four mainstream virtualization technologies. Please refer to them as needed.

## Panel Side

The host machine needs to have one of ```nginx```, ```caddy```, or ```OpenResty``` installed, as well as ```mysql``` version ```8.4.6```. It requires at least 1G of free memory and 2G of free disk space.

After installation is complete, the default startup addresses are:

Frontend: ```http://your-IP-or-domain```

Backend API: ```http://localhost:8888```

API Documentation: ```http://localhost:8888/swagger/index.html```

### Installation via Docker

#### Method 1: Using Pre-built Images

Use the pre-built multi-architecture image, which will automatically download the version corresponding to your current system architecture:

```bash
docker run -d \
  --name oneclickvirt \
  -p 80:80 \
  -v oneclickvirt-data:/var/lib/mysql \
  -v oneclickvirt-storage:/app/storage \
  --restart unless-stopped \
  spiritlhl/oneclickvirt:latest
```

Or use GitHub Container Registry:

```bash
docker run -d \
  --name oneclickvirt \
  -p 80:80 \
  -v oneclickvirt-data:/var/lib/mysql \
  -v oneclickvirt-storage:/app/storage \
  --restart unless-stopped \
  ghcr.io/oneclickvirt/oneclickvirt:latest
```

#### Method 2: Build and Package Yourself

If you need to modify the source code or customize the build:

```bash
git clone https://github.com/oneclickvirt/oneclickvirt.git
cd oneclickvirt
```

```bash
docker build -t oneclickvirt .
```

```bash
docker run -d \
  --name oneclickvirt \
  -p 80:80 \
  -v oneclickvirt-data:/var/lib/mysql \
  -v oneclickvirt-storage:/app/storage \
  --restart unless-stopped \
  oneclickvirt
```

### Manual Installation

#### Linux

Download and execute

International:

```shell
curl -L https://raw.githubusercontent.com/oneclickvirt/oneclickvirt/refs/heads/main/install.sh -o install.sh && chmod +x install.sh
```

Domestic (China):

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

Stop service:

```shell
systemctl restart oneclickvirt
```

The installation script will extract static files to

```shell
cd /opt/oneclickvirt/web/
```

this path.

Use ```nginx```, ```caddy```, or ```OpenResty``` to establish a static website with this path. You can choose whether to bind a domain name.

After deploying the static files, you need to reverse proxy the backend address for frontend use. Here is a specific example using ```OpenResty```:

![](./images/proxy.png)

You need to reverse proxy the path ```/api``` to the backend address ```http://127.0.0.1:8888```. If you are using ```1panel```, you only need to fill in these details, and the default backend domain uses the default ```$host``` without modification.

If you are using ```nginx``` or ```caddy```, please refer to the proxy source code below and modify it accordingly for proxying:

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

#### Windows

Check

https://github.com/oneclickvirt/oneclickvirt/releases/latest

Download the latest compressed file for the corresponding architecture, extract it, and execute.

In the same directory as the binary file being executed, download

https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/oneclickvirt/refs/heads/main/server/config.yaml

This is the configuration file needed for subsequent use.

After downloading the ```web-dist.zip``` file, extract it and use the corresponding program to establish a static website, setting up the reverse proxy similar to Linux.

## Database Initialization

After installing ```mysql```, create an empty database ```oneclickvirt``` using type ```utf8mb4```. It's best to make it accessible only locally at ```127.0.0.1```. Save the corresponding username and password.

After opening the corresponding frontend page, it will automatically redirect to the initialization interface.

![](./images/init.png)

Fill in the database information and related user information. Test the database connection, and if there are no issues, you can click to initialize the system.

![](./images/init_success.png)

After completing initialization, it will automatically redirect to the homepage, where you can explore and use it on your own.

![](./images/home.png)

If you used the default user information for initialization, the default accounts are:

Administrator username:

```
admin
```

Administrator password:

```
Admin123!@#
```

Regular user username:

```
testuser
```

Regular user password:

```
TestUser123!@#
```

## Configuration File (Optional)