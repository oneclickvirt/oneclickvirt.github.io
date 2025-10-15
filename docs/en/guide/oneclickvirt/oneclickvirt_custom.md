---
outline: deep
---

## Configuration File

The default settings are sufficient for light usage. If advanced customization is needed, you need to modify the configuration file or make modifications in the admin interface after initialization.

https://github.com/oneclickvirt/oneclickvirt/blob/main/server/config.yaml

Here is the complete initialization configuration file. The specific configuration items will be explained below:

### auth Authentication Configuration

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

Configuration items for the authentication module, used to control user login and registration methods and third-party login integration.

- `email-password`: Authentication password for email service, used for identity verification when sending emails via SMTP
- `email-smtp-host`: SMTP server address, such as `smtp.gmail.com`
- `email-smtp-port`: SMTP server port, common ports are `25`, `465` (SSL), `587` (TLS)
- `email-username`: SMTP server login username, usually the complete email address
- `enable-email`: Whether to enable email login functionality
- `enable-oauth2`: Whether to enable OAuth2 third-party login functionality
- `enable-public-registration`: Whether to allow public registration; when disabled, only administrators can create accounts
- `enable-qq`: Whether to enable QQ login
- `enable-telegram`: Whether to enable Telegram login
- `qq-app-id`: App ID applied for from QQ Connect platform
- `qq-app-key`: App Key applied for from QQ Connect platform
- `telegram-bot-token`: API Token for Telegram Bot
- `frontend-url`: Frontend access address, must include protocol header (`http://` or `https://`), trailing slash is optional. OAuth2 callback address depends on this configuration

### captcha Verification Code Configuration

```yaml
captcha:
    enabled: true
    expire-time: 300
    height: 40
    length: 4
    width: 120
```

Configuration for generating and verifying graphical verification codes, used for security verification on frontend login and registration pages.

- `enabled`: Whether to enable verification code functionality
- `expire-time`: Verification code expiration time, in seconds
- `height`: Verification code image height, in pixels
- `length`: Verification code character length
- `width`: Verification code image width, in pixels

### cdn Content Delivery Network Configuration

```yaml
cdn:
    base-endpoint: https://cdn.spiritlhl.net/
    endpoints:
        - https://cdn0.spiritlhl.top/
        - http://cdn3.spiritlhl.net/
        - http://cdn1.spiritlhl.net/
        - http://cdn2.spiritlhl.net/
```

CDN acceleration node configuration used when downloading system images.

- `base-endpoint`: Primary CDN node address, used with priority
- `endpoints`: Backup CDN node list, retried in order. The system will automatically select available nodes for image downloads

Generally, this configuration does not need to be modified. Preloaded system images are all hosted in the organization's repository, and the default CDN nodes already provide good download acceleration.

### mysql Database Configuration

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

MySQL database connection and behavior configuration. Initialization judgment logic: when both `path` and `port` are empty, the system considers initialization is needed, and the target database must be an empty database at this time.

- `auto-create`: Whether to automatically create the database (if it doesn't exist)
- `config`: Database connection parameters, including character set, time parsing, etc.
- `db-name`: Database name
- `engine`: Database storage engine, InnoDB is recommended
- `log-mode`: Database log mode, options are `silent`, `error`, `warn`, `info`
- `log-zap`: Whether to use zap log library to record database logs
- `max-idle-conns`: Maximum number of idle connections
- `max-lifetime`: Maximum connection lifetime, in seconds
- `max-open-conns`: Maximum number of open connections
- `password`: Database password
- `path`: Database server address
- `port`: Database server port
- `prefix`: Database table name prefix
- `singular`: Whether to use singular table names (default is plural)
- `username`: Database username

### quota Quota Limit Configuration

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

Configuration for controlling user levels and resource quotas. The default unit for memory, disk, and traffic is MB.

#### Global Configuration

- `default-level`: Default level for newly registered users

#### instance-type-permissions Instance Type Permissions

Controls the types of operations that users of different levels can perform.

- `min-level-for-container`: Minimum user level required to create container instances
- `min-level-for-delete`: Minimum level required to perform delete operations on the regular user side
- `min-level-for-vm`: Minimum user level required to create virtual machine instances

#### level-limits Level Quota Limits

Defines the resource quota limits corresponding to each user level, with the key being the level number.

Each level includes the following configurations:

- `max-instances`: Maximum number of instances that users of this level can create
- `max-resources`: Maximum resource limits for a single instance
  - `bandwidth`: Maximum bandwidth, in Mbps
  - `cpu`: Maximum number of CPU cores
  - `disk`: Maximum disk space, in MB
  - `memory`: Maximum memory, in MB
- `max-traffic`: Maximum total traffic for users of this level, in MB

### zap Log Configuration

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

Detailed configuration for system log recording, based on the zap log library.

- `compress-logs`: Whether to compress archived log files
- `director`: Log file storage directory
- `encode-level`: Log level encoding method, options are `LowercaseLevelEncoder` (lowercase), `CapitalLevelEncoder` (uppercase)
- `format`: Log output format, options are `console` (console format), `json` (JSON format)
- `level`: Log level, options are `debug`, `info`, `warn`, `error`. It is recommended to use `debug` during development and debugging, and `info` or `warn` in production environments
- `log-in-console`: Whether to also output logs to the console
- `max-array-elements`: Maximum number of elements recorded for array type fields
- `max-backups`: Maximum number of historical log files to retain
- `max-file-size`: Maximum size of a single log file, in MB
- `max-log-length`: Maximum length of a single log entry; parts exceeding this will be truncated
- `max-string-length`: Maximum recording length for string fields
- `prefix`: Log prefix identifier
- `retention-day`: Number of days to retain log files; expired files are automatically deleted
- `show-line`: Whether to display the filename and line number of the log call
- `stacktrace-key`: Key name for stack trace information

Note: When debugging issues, `level` should be set to `debug` to obtain detailed log information.