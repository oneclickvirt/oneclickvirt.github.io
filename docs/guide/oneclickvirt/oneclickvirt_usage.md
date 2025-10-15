---
outline: deep
---

# 使用说明

这里将详细说明本面板的使用方式，如有问题请加群求助管理员或群友：https://t.me/oneclickvirt

## 用户管理

占位待施工

## 纳管服务器

占位待施工。

默认容器类型不限制CPU和内存预分配的总量，但限制预分配的硬盘总量，以达到最优化的资源共享和最大化的实例数量。

默认虚拟机类型限制所有资源，预分配的总量最大值不能超过实际资源大小。

这块的限制是限制在对应类型的实例在这个服务器上总的资源占用，这里的资源占用是预分配的，不是实际的实例占用，仅用于计算空闲资源限制开设。

不推荐进行修改，除非你知道这块的设置在干什么。

健康检测后普通用户才能看到对应的服务器，才能进行申请开设，若未进行健康检测，用户无法申请开设领取。

## 镜像管理

占位待施工

## 系统管理

占位待施工

## 配置文件

默认的设置已经足够轻度使用了，如果需要高级自定义则需要修改配置文件,或初始化后在管理员界面进行修改。

https://github.com/oneclickvirt/oneclickvirt/blob/main/server/config.yaml

这里是完整的初始化的配置文件，下面将讲解具体的配置项目：

### auth 认证配置

```yaml
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
    frontend-url: ""
```

认证模块的配置项,用于控制用户登录注册的方式和第三方登录集成。

- `email-password`: 邮件服务的认证密码,用于SMTP发送邮件时的身份验证
- `email-smtp-host`: SMTP服务器地址,如 `smtp.gmail.com`
- `email-smtp-port`: SMTP服务器端口,常用端口为 `25`、`465`(SSL)、`587`(TLS)
- `email-username`: SMTP服务器登录用户名,通常是完整的邮箱地址
- `enable-email`: 是否启用邮箱登录功能
- `enable-oauth2`: 是否启用OAuth2第三方登录功能
- `enable-public-registration`: 是否允许公开注册,关闭后仅管理员可创建账号
- `enable-qq`: 是否启用QQ登录
- `enable-telegram`: 是否启用Telegram登录
- `qq-app-id`: QQ互联平台申请的App ID
- `qq-app-key`: QQ互联平台申请的App Key
- `telegram-bot-token`: Telegram Bot的API Token
- `frontend-url`: 前端访问地址,需要包含协议头(`http://`或`https://`),结尾斜杠可选。OAuth2回调地址依赖此配置

### captcha 验证码配置

```yaml
captcha:
    enabled: true
    expire-time: 300
    height: 40
    length: 4
    width: 120
```

图形验证码的生成和验证配置,用于前端登录注册页面的安全验证。

- `enabled`: 是否启用验证码功能
- `expire-time`: 验证码过期时间,单位为秒
- `height`: 验证码图片高度,单位为像素
- `length`: 验证码字符长度
- `width`: 验证码图片宽度,单位为像素

### cdn 内容分发网络配置

```yaml
cdn:
    base-endpoint: https://cdn.spiritlhl.net/
    endpoints:
        - https://cdn0.spiritlhl.top/
        - http://cdn3.spiritlhl.net/
        - http://cdn1.spiritlhl.net/
        - http://cdn2.spiritlhl.net/
```

系统镜像下载时使用的CDN加速节点配置。

- `base-endpoint`: 主CDN节点地址,优先使用
- `endpoints`: 备用CDN节点列表,按顺序进行重试。系统会自动选择可用节点进行镜像下载

一般情况下不需要修改此配置,预载的系统镜像都托管在本组织仓库中,默认CDN节点已能提供良好的下载加速。

### mysql 数据库配置

```yaml
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
    path: ""
    port: ""
    prefix: ""
    singular: false
    username: root
```

MySQL数据库连接和行为配置。初始化判断逻辑:当`path`和`port`都为空时,系统认为需要进行初始化,此时必须确保目标数据库为空数据库。

- `auto-create`: 是否自动创建数据库(如果不存在)
- `config`: 数据库连接参数,包括字符集、时间解析等
- `db-name`: 数据库名称
- `engine`: 数据库存储引擎,推荐使用InnoDB
- `log-mode`: 数据库日志模式,可选值为`silent`、`error`、`warn`、`info`
- `log-zap`: 是否使用zap日志库记录数据库日志
- `max-idle-conns`: 最大空闲连接数
- `max-lifetime`: 连接最大生命周期,单位为秒
- `max-open-conns`: 最大打开连接数
- `password`: 数据库密码
- `path`: 数据库服务器地址
- `port`: 数据库服务器端口
- `prefix`: 数据表名前缀
- `singular`: 是否使用单数表名(默认为复数)
- `username`: 数据库用户名

### quota 配额限制配置

```yaml
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

用户等级和资源配额的控制配置。内存、硬盘、流量的默认单位均为MB。

#### 全局配置

- `default-level`: 新注册用户的默认等级

#### instance-type-permissions 实例类型权限

控制不同等级用户可以执行的操作类型。

- `min-level-for-container`: 创建容器实例所需的最低用户等级
- `min-level-for-delete`: 在普通用户端执行删除操作所需的最低等级
- `min-level-for-vm`: 创建虚拟机实例所需的最低用户等级

#### level-limits 等级配额限制

定义每个用户等级对应的资源配额上限,键为等级数字。

每个等级包含以下配置:

- `max-instances`: 该等级用户可创建的最大实例数量
- `max-resources`: 单个实例的最大资源限制
  - `bandwidth`: 最大带宽,单位为Mbps
  - `cpu`: 最大CPU核心数
  - `disk`: 最大硬盘空间,单位为MB
  - `memory`: 最大内存,单位为MB
- `max-traffic`: 该等级用户的最大总流量,单位为MB

### zap 日志配置

```yaml
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

系统日志记录的详细配置,基于zap日志库。

- `compress-logs`: 是否压缩归档的日志文件
- `director`: 日志文件存储目录
- `encode-level`: 日志级别编码方式,可选`LowercaseLevelEncoder`(小写)、`CapitalLevelEncoder`(大写)
- `format`: 日志输出格式,可选`console`(控制台格式)、`json`(JSON格式)
- `level`: 日志级别,可选`debug`、`info`、`warn`、`error`。开发调试时建议使用`debug`,生产环境使用`info`或`warn`
- `log-in-console`: 是否同时输出日志到控制台
- `max-array-elements`: 数组类型字段最大记录元素数
- `max-backups`: 保留的历史日志文件最大数量
- `max-file-size`: 单个日志文件最大大小,单位为MB
- `max-log-length`: 单条日志最大长度,超出部分会被截断
- `max-string-length`: 字符串字段最大记录长度
- `prefix`: 日志前缀标识
- `retention-day`: 日志文件保留天数,过期自动删除
- `show-line`: 是否显示日志调用的文件名和行号
- `stacktrace-key`: 堆栈跟踪信息的键名

注意:调试问题时应将`level`设置为`debug`以获取详细日志信息。