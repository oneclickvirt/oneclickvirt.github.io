---
outline: deep
---

# OneClickVirt

Distinguishes between panel side and controlled side. The controlled side needs to have the corresponding virtualization environment installed in advance. You can use other main installations in this documentation for environment installation.

## Controlled Side

Corresponds to other main installations in this documentation for environment installation, which will not be elaborated here.

## Panel Side

The host machine needs to have ```nginx``` or ```caddy``` or ```OpenResty``` ，and ```8.4.6``` version ```mysql``` installed, requiring at least 1G of free memory and 1G of free disk space.

After installation is complete, the default startup addresses are:

Frontend: ```http://your IP or domain name```

Backend API: ```http://localhost:8888```

API Documentation: ```http://localhost:8888/swagger/index.html```

### Backend Installation

#### Linux

Download and execute

International

```shell
curl -L https://raw.githubusercontent.com/oneclickvirt/oneclickvirt/refs/heads/main/install.sh -o install.sh && chmod +x install.sh
```

Domestic

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

Enable auto-start at boot:

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

#### Windows

Check

https://github.com/oneclickvirt/oneclickvirt/releases/latest

Download the latest compressed file for the corresponding architecture, extract and execute it.

In the same directory as the executable binary file, download

https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/oneclickvirt/refs/heads/main/server/config.yaml

file, which is the configuration file needed for subsequent use.

### Frontend Installation

#### Linux

The previous installation script will extract static files to

```shell
cd /opt/oneclickvirt/web/
```

this path

Use ```nginx``` or ```caddy``` to establish a static website with this path. Whether domain binding is needed is your choice.

After the static files are deployed, you need to reverse proxy the backend address for frontend use. Taking ```OpenResty``` as an example:

![](./images/proxy.png)

You need to reverse proxy the path ```/api``` to the backend ```http://127.0.0.1:8888``` address. If you are using ```1panel```, you just need to fill in these, and the default backend domain uses the default ```$host``` without modification.

If you are using ```nginx``` or ```caddy```, please refer to the proxy source code below and modify it yourself for proxying

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

After downloading the ```web-dist.zip``` file, extract it and use the corresponding program to establish a static website, set up the reverse proxy similar to Linux.

## MYSQL

After installing mysql, create an empty database ```oneclickvirt``` with type ```utf8mb4```, preferably accessible only locally ```127.0.0.1```. Save the corresponding username and password.

After opening the corresponding frontend page, it will automatically redirect to the initialization interface.

![](./images/init.png)

Fill in the database information and related user information. If the database connection test is successful, you can click to initialize the system.

![](./images/init_success.png)

After completing initialization, it will automatically redirect to the homepage, where you can explore and use it yourself.

![](./images/home.png)

If you used the default user information for initialization, the default accounts are:

Administrator username

```
admin
```

Administrator password

```
Admin123!@#
```

Regular user username

```
testuser
```

Regular user password

```
TestUser123!@#
```

## Configuration File (Optional)