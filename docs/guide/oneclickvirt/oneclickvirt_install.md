---
outline: deep
---

# OneClickVirt

区分面板端和受控端，受控端需要提前安装好对应虚拟化的环境，可使用本说明别的主体安装进行环境安装

## 受控端

对应本说明别的主体安装进行环境安装，这里不过多赘述

## 面板端

宿主机需要安装好```nginx```或```caddy```和```mysql```，需要至少1G空闲内存和1G空闲硬盘。

安装完成后，默认启动的地址

前端：```http://localhost:8080```

后端 API：```http://localhost:8888```

API 文档：```http://localhost:8888/swagger/index.html```

### 后端安装

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

有交互地安装

```
./install.sh
```

无交互地安装

```
noninteractive=true ./install.sh
```

安装目录: ```/opt/oneclickvirt```

使用方法:

启动服务: ```systemctl start oneclickvirt```

停止服务: ```systemctl stop oneclickvirt```

开机自启: ```systemctl enable oneclickvirt```

查看状态: ```systemctl status oneclickvirt```

查看日志: ```journalctl -u oneclickvirt -f```

#### Windows

查看

https://github.com/oneclickvirt/oneclickvirt/releases/latest

下载最新的对应架构的压缩文件，解压后挂起执行。

执行的二进制文件的同级目录下，下载

https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/oneclickvirt/refs/heads/main/server/config.yaml

文件，这是后续需要使用的配置文件。

### 前端安装

#### Linux

前面安装脚本会将静态文件解压到

```shell
cd /opt/oneclickvirt/web/
```

这个路径下

使用```nginx```或```caddy```以这个路径建立静态网站即可，是否需要域名绑定自行选择

#### Windows

下载```web-dist.zip```文件后，解压并使用对应的程序建立静态网站即可.

## MYSQL

安装mysql后，创建一个空的数据库```oneclickvirt```，最好仅本地```127.0.0.1```可访问，对应用户名和密码保存好。

打开前端对应的页面后，将自动跳转到初始化界面，填写数据库信息和相关用户信息，测试数据库链接无问题，则可点击初始化系统。

完成初始化后会自动跳转到首页，可以自行探索并使用了。

如果使用的是默认的用户信息进行初始化，那么默认的账户为：

管理员账户：admin / Admin123!@#

普通用户：testuser / TestUser123!@#

## 配置文件(可选)
