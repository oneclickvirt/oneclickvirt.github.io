---
outline: deep
---

# OneClickVirt

Distinguishes between panel side and controlled side. The controlled side needs to have the corresponding virtualization environment installed in advance, which can be installed using the main installation instructions in this documentation.

## Controlled Side

Corresponds to the main installation instructions in this documentation for environment installation. This will not be elaborated here. This tutorial has corresponding installation commands for the four major mainstream virtualization technologies. Please refer to them yourself.

## Panel Side

The host machine needs to have one of ```nginx``` or ```caddy``` or ```OpenResty``` installed, as well as ```mysql``` version ```8.4.6```, requiring at least 1G of free memory and 2G of free disk space.

After installation is complete, the default startup addresses are:

Frontend: ```http://your-IP-or-domain```

Backend API: ```http://localhost:8888```

API Documentation: ```http://localhost:8888/swagger/index.html```

### Installation via Docker

:::tip
Since the database starts together when starting, do not operate immediately when the container just starts. You need to wait at least 12 seconds.
:::

#### Method 1: Using Pre-built Images

**Setup in Fresh Environment**

Use pre-built ```amd64``` or ```arm64``` images, which will automatically download the corresponding version based on the current system architecture:

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

The above methods are only for new installations.

**Setup in Existing Environment**

If you are installing again after deleting the container, you need to ensure that the originally mounted data is also deleted, so that the database will be reinitialized when the container is rebuilt.

```shell
docker rm -f oneclickvirt
docker volume rm oneclickvirt-data oneclickvirt-storage
```

Then follow the steps for fresh environment setup.

**Delete Container Image**

```shell
docker image rm -f spiritlhl/oneclickvirt:latest
docker image rm -f ghcr.io/oneclickvirt/oneclickvirt:latest
```

Only by deleting the container image and re-pulling the image can you ensure that the image used is the latest one; otherwise, the image will not be automatically updated.

**Re-pull Container Image**

```shell
docker pull spiritlhl/oneclickvirt:latest
```

or

```shell
docker pull ghcr.io/oneclickvirt/oneclickvirt:latest
```

#### Method 2: Self-compile and Package

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

### Installation via Pre-compiled Binary Files

#### Linux

Download and execute

International

```shell
curl -L https://raw.githubusercontent.com/oneclickvirt/oneclickvirt/refs/heads/main/install.sh -o install.sh && chmod +x install.sh
```

Domestic (China)

```shell
curl -L https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/oneclickvirt/refs/heads/main/install.sh -o install.sh && chmod +x install.sh
```

Install environment with interaction

```
./install.sh
```

Install environment without interaction

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

The previous installation script will extract the static files to

```shell
cd /opt/oneclickvirt/web/
```

this path.

Use ```nginx``` or ```caddy``` to establish a static website with this path. Whether you need domain binding is your choice.

After the static files are deployed, you need to reverse proxy the backend address for frontend use. Here is a specific example using ```OpenResty```:

![](./images/proxy.png)

You need to reverse proxy the path ```/api``` to the backend address ```http://127.0.0.1:8888```. If you are using ```1panel```, you only need to fill in these settings. The default backend domain uses the default ```$host``` and does not need to be modified.

If you are using ```nginx``` or ```caddy```, please refer to the proxy source code below and modify it yourself for proxying:

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

Download the latest compressed file for the corresponding architecture, extract and execute in the background.

In the same directory as the executed binary file, download

https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/oneclickvirt/refs/heads/main/server/config.yaml

This is the configuration file that will be needed subsequently.

After downloading the ```web-dist.zip``` file, extract it and use the corresponding program to establish a static website, and set up the reverse proxy similar to Linux.

#### Database Initialization

After installing and starting ```mysql```, create an empty database ```oneclickvirt``` with type ```utf8mb4```. It's best to make it accessible only locally ```127.0.0.1```. Save the corresponding username and password.

After opening the corresponding frontend page, it will automatically redirect to the initialization interface.

![](./images/init.png)

Fill in the database information and related user information. If the database connection test is successful, you can click to initialize the system.

![](./images/init_success.png)

After completing initialization, it will automatically redirect to the homepage, and you can explore and use it yourself.

![](./images/home.png)

If you use the default user information for initialization, the default accounts are:

Administrator account name

```
admin
```

Administrator password

```
Admin123!@#
```

Regular user account name

```
testuser
```

Regular user password

```
TestUser123!@#
```

All images are loaded by default, but only images related to ```debian``` and ```alpine``` are enabled by default, so as to avoid too many images being enabled and making it difficult for users to choose. If you need additional types of images, you need to search and enable them by type of architecture version in the image management interface under administrator privileges.

## Configuration File (Optional)

The default settings are sufficient for light usage. If you need advanced customization, you need to modify the configuration file or make changes in the admin interface after initialization.

https://github.com/oneclickvirt/oneclickvirt/blob/main/server/config.yaml

Here is the complete initialization configuration file. The specific configuration items will be explained below.

```shell
auth:
    email-password: ""
    email-smtp-host: ""
    email-smtp-port: "3306"
    email-username: root
    enable-email: false
    enable-oauth2: false
    enable-public-registration: false
    enable-qq: false
    enable-telegram: false
    qq-app-id: ""
    qq-app-key: ""
    telegram-bot-token: ""
```

Default system configuration items. The configuration will be read from here during initialization, and will be automatically written back when updating system configuration.

```shell
captcha:
    enabled: true
    expire-time: 300
    height: 40
    length: 4
    width: 120
```

Configuration items for the image captcha on the frontend login and registration pages.

```shell
cdn:
    base-endpoint: https://cdn.spiritlhl.net/
    endpoints:
        - https://cdn0.spiritlhl.top/
        - http://cdn3.spiritlhl.net/
        - http://cdn1.spiritlhl.net/
        - http://cdn2.spiritlhl.net/
```

Acceleration addresses to try when downloading images. Generally, no modification is needed, as the preloaded system images are all from repositories under this organization, and these CDNs are sufficient for accelerated downloads.

```shell
mysql:
    auto-create: true
    config: charset=utf8mb4&parseTime=True&loc=Local
    db-name: oneclickvirt
    engine: InnoDB
    log-mode: error
    log-zap: false
    max-idle-conns: 10
    max-lifetime: 3600
    max-open-conns: 100
    password: ""
    path:
    port:
    prefix: ""
    singular: false
    username: root
```

During initialization, if both ```path``` and ```port``` in this section are empty, initialization is required. In this case, the database you enter for initialization must be an empty database.

```shell
quota:
    default-level: 1
    instance-type-permissions:
        min-level-for-container: 1
        min-level-for-delete: 2
        min-level-for-vm: 1
    level-limits:
        1:
            max-instances: 1
            max-resources:
                bandwidth: 10
                cpu: 1
                disk: 1025
                memory: 350
            max-traffic: 102400
        2:
            max-instances: 3
            max-resources:
                bandwidth: 20
                cpu: 2
                disk: 20480
                memory: 1024
            max-traffic: 204800
        3:
            max-instances: 5
            max-resources:
                bandwidth: 50
                cpu: 4
                disk: 40960
                memory: 2048
            max-traffic: 307200
        4:
            max-instances: 10
            max-resources:
                bandwidth: 100
                cpu: 8
                disk: 81920
                memory: 4096
            max-traffic: 409600
        5:
            max-instances: 20
            max-resources:
                bandwidth: 200
                cpu: 16
                disk: 163840
                memory: 8192
            max-traffic: 512000
```

This section contains configuration items for level and quota restrictions. The default unit for memory, disk, and traffic is ```mb```. The ```min-level``` configuration sets the minimum permissions in the system configuration. By default, level 1 can create containers, level 2 can perform delete operations on the regular user side, and level 1 can create virtual machines by default. ```default-level``` is the default level for newly registered users.

```shell
zap:
    compress-logs: true
    director: storage/logs
    encode-level: LowercaseLevelEncoder
    format: console
    level: info
    log-in-console: false
    max-array-elements: 5
    max-backups: 15
    max-file-size: 5
    max-log-length: 2000
    max-string-length: 1000
    prefix: '[oneclickvirt]'
    retention-day: 3
    show-line: false
    stacktrace-key: stacktrace
```

The only field that needs attention in this section is ```level```, which defaults to ```info``` logging. If you need debug logs, please change it to ```debug```.