---
outline: deep
---

# OneClickVirt

区分面板端和受控端，受控端需要提前安装好对应虚拟化的环境，可使用本说明别的主体安装进行环境安装

## 受控端

对应本说明别的主体安装进行环境安装，这里不过多赘述，四大主流的虚拟化技术的主体安装本教程都有对应的安装命令进行安装，自行查阅。

如果需要使用面板的流量控制的话，需要额外安装```vnstat```这个工具，自行下载吧，如果是apt管理包，则可用

```shell
apt install -y vnstat
```

进行下载，其他系统同理。

## 面板端

宿主机需要安装好```nginx```或```caddy```或```OpenResty```之一，以及```8.4.6```版本的```mysql```，需要至少1G空闲内存和2G空闲硬盘。

安装完成后，默认启动的地址

前端：```http://你的IP或者域名```

后端 API：```http://localhost:8888```

API 文档：```http://localhost:8888/swagger/index.html```

### 通过Docker安装

:::tip
由于启动的时候连带数据库一起启动，所以容器刚启动的时候不要立即操作，需要至少等待12秒。
:::

#### 方式一：使用预构建镜像

**全新环境下开设**

使用已构建好的```amd64```或```arm64```镜像，会自动根据当前系统架构下载对应版本：

```bash
docker run -d \
  --name oneclickvirt \
  -p 80:80 \
  -v oneclickvirt-data:/var/lib/mysql \
  -v oneclickvirt-storage:/app/storage \
  --restart unless-stopped \
  spiritlhl/oneclickvirt:latest
```

或者使用 GitHub Container Registry：

```bash
docker run -d \
  --name oneclickvirt \
  -p 80:80 \
  -v oneclickvirt-data:/var/lib/mysql \
  -v oneclickvirt-storage:/app/storage \
  --restart unless-stopped \
  ghcr.io/oneclickvirt/oneclickvirt:latest
```

以上的方式仅限于新安装

**旧有环境下开设**

如果是删除了容器再次进行安装，那么需要确保原挂载的数据也进行删除，这样后续重建容器才会数据库重新初始化。

```shell
docker rm -f oneclickvirt
docker volume rm oneclickvirt-data oneclickvirt-storage
```

然后再按全新环境下开设的步骤来

**删除容器镜像**

```shell
docker image rm -f spiritlhl/oneclickvirt:latest
docker image rm -f ghcr.io/oneclickvirt/oneclickvirt:latest
```

删除了容器镜像重新拉取镜像，才能确保镜像使用的是最新的镜像，否则不会自动更新镜像。

**重新拉取容器镜像**

```shell
docker pull spiritlhl/oneclickvirt:latest
```

或

```shell
docker pull ghcr.io/oneclickvirt/oneclickvirt:latest
```

#### 方式二：自己编译打包

如果需要修改源码或自定义构建：

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

### 通过预编译二进制文件安装

#### Linux

下载并执行

国际

```shell
curl -L https://raw.githubusercontent.com/oneclickvirt/oneclickvirt/refs/heads/main/install.sh -o install.sh && chmod +x install.sh
```

国内

```shell
curl -L https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/oneclickvirt/refs/heads/main/install.sh -o install.sh && chmod +x install.sh
```

有交互地安装环境

```
./install.sh
```

无交互地安装环境

```
noninteractive=true ./install.sh
```

安装目录: ```/opt/oneclickvirt```

安装成功后，需要手动启动服务: 

```shell
systemctl start oneclickvirt
```

其他使用方法：

停止服务: 

```shell
systemctl stop oneclickvirt
```

开机自启: 

```shell
systemctl enable oneclickvirt
```

查看状态: 

```shell
systemctl status oneclickvirt
```

查看日志: 

```shell
journalctl -u oneclickvirt -f
```

重启服务：

停止服务: 

```shell
systemctl restart oneclickvirt
```

前面安装脚本会将静态文件解压到

```shell
cd /opt/oneclickvirt/web/
```

这个路径下

使用```nginx```或```caddy```以这个路径建立静态网站即可，是否需要域名绑定自行选择

静态文件部署完毕后，需要反代后端地址给前端使用，这里具体以```OpenResty```为例：

![](./images/proxy.png)

需要反代路径```/api```到后端的```http://127.0.0.1:8888```地址上，如果你使用的的是```1panel```，那么就只需要填写这些即可，默认的后端域名使用默认的```$host```不需要修改。

如果你使用的是```nginx```或```caddy```，请参考下方的代理源码自行修改进行代理

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

查看

https://github.com/oneclickvirt/oneclickvirt/releases/latest

下载最新的对应架构的压缩文件，解压后挂起执行。

执行的二进制文件的同级目录下，下载

https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/oneclickvirt/refs/heads/main/server/config.yaml

文件，这是后续需要使用的配置文件。

下载```web-dist.zip```文件后，解压并使用对应的程序建立静态网站，类似Linux那样设置好反向代理即可。

#### 数据库初始化

安装启动了```mysql```后，创建一个空的数据库```oneclickvirt```，使用类型```utf8mb4```，最好仅本地```127.0.0.1```可访问，对应用户名和密码保存好。

打开前端对应的页面后，将自动跳转到初始化界面。

![](./images/init.png)

填写数据库信息和相关用户信息，测试数据库链接无问题，则可点击初始化系统。

![](./images/init_success.png)

完成初始化后会自动跳转到首页，可以自行探索并使用了。

![](./images/home.png)

如果使用的是默认的用户信息进行初始化，那么默认的账户为：

管理员账户名

```
admin
```

管理员密码

```
Admin123!@#
```

普通用户账户名

```
testuser
```

普通用户密码

```
TestUser123!@#
```

默认加载了所有的镜像，但是默认仅启用了```debian```和```alpine```相关版本的镜像，避免过多镜像启用导致用户选择困难。如果你需要额外类型的镜像，则需要在管理员权限下，在镜像管理界面按照类型架构版本搜索并进行启用。

## 配置文件(可选)

默认的设置已经足够轻度使用了，如果需要高级自定义则需要修改配置文件，或初始化后在管理员界面进行修改。

https://github.com/oneclickvirt/oneclickvirt/blob/main/server/config.yaml

这里是完整的初始化的配置文件，下面将讲解具体的配置项目

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

默认的系统配置项目，初始化的时候会从这里读取配置，更新系统配置时会自动回写

```shell
captcha:
    enabled: true
    expire-time: 300
    height: 40
    length: 4
    width: 120
```

前端登录注册时的图片验证码的配置项

```shell
cdn:
    base-endpoint: https://cdn.spiritlhl.net/
    endpoints:
        - https://cdn0.spiritlhl.top/
        - http://cdn3.spiritlhl.net/
        - http://cdn1.spiritlhl.net/
        - http://cdn2.spiritlhl.net/
```

镜像下载的时候，尝试使用的加速地址，一般不需要修改，因为预载的系统镜像都是本组织下的仓库，这些cdn足够进行加速下载了

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

初始化的判断如果这块的```path```和```port```都为空，则判断需要进行初始化，此时你填入的初始化的数据库务必保证是空数据库。

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

这块是等级与配额限制的配置项，内存、硬盘、流量的默认单位为```mb```，```min-level```配置是配置系统配置中的最低权限，默认最低等级1可开设容器，等级2可在普通用户端删除操作，默认等级1可开设虚拟机，```default-level```是默认的注册的用户的等级。

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

这块唯一需要注意的是```level```字段，默认为```info```日志，如果需要调试日志，请改成```debug```。

