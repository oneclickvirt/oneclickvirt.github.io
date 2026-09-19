---
outline: deep
---

# 节点环境的交互与自动化

适用于 Incus、LXD、Docker、Podman、Containerd 的主体安装、支持交互的批量创建入口和卸载入口，也适用于 ECS 评测脚本的环境准备入口。环境安装成功后还需验证存储、网络和容器连通；宿主系统与容器镜像的支持列表是两回事。

## 真实验收的统一变量

面板与脚本的专用节点验收统一使用 `OCV_` 前缀：`OCV_LIVE_HOST`、`OCV_LIVE_PASSWORD`、`OCV_LIVE_RUNTIME=incus|lxd`、`OCV_LIVE_MODE=interactive|noninteractive` 和 `OCV_LIVE_NETWORK_TYPE=nat_ipv4|ipv6_only|nat_ipv4_ipv6`。设置 `OCV_LIVE_IPV6=yes` 时，IPv6 必须分别通过容器出网、独立公网 HTTP 以及实际 SSH 登录；IPv4、ULA、宿主机或本机回环结果均不计通过。WebSSH 严格 IPv6 验收另设 `OCV_WEBSSH_SOURCE_IPV6`，填写服务实际发起 SSH 的公网来源地址，不能复用网页入口的 IPv4。密码只通过环境变量或安全输入提供，不写入脚本和报告。

## 统一开关

统一使用小写 `noninteractive`。推荐按命令设置，避免影响之后的交互操作：

```bash
noninteractive=true bash ./安装脚本.sh </dev/null
```

`true`、`yes`、`y`、`1` 表示开启，英文字母不区分大小写。兼容旧变量 `NONINTERACTIVE`；Incus 也兼容 `INCUS_NONINTERACTIVE`。优先级是非空的 `noninteractive`、`NONINTERACTIVE`、Incus 旧变量。显式的 `noninteractive=false` 优先于旧变量中的 `true`。规范化后的变量会传递给子脚本。

交互安装请在终端执行脚本，并清除遗留的自动化参数。例如：

```bash
unset noninteractive NONINTERACTIVE INCUS_NONINTERACTIVE
unset INCUS_STORAGE_PATH INCUS_DISK_SIZE DISK_NUMS STORAGE_PATH
bash ./安装脚本.sh
```

安装器仍使用包管理器的非交互参数，避免系统软件包安装时弹出额外问答；这不代表脚本自身的存储配置等提示被关闭。不要用 `yes | bash ...` 代替无人值守开关，也不要把标准输入关闭的调用称为真实交互测试。

LXD 保留旧用法：未指定模式时，提供 `DISK_NUMS` 或 `STORAGE_PATH` 会进入无人值守资源配置。设置 `noninteractive=false` 可明确选择交互模式。

ECS Go 评测脚本 `goecs.sh` 也使用同一开关：它会在启动时将 `noninteractive` 规范化为 `true` 或 `false` 并导出给子进程；显式的小写 `false` 会覆盖 `NONINTERACTIVE=true`。这只控制评测脚本自身的可选提示，不会替代系统包管理器的非交互参数。

## 安装入口和主要参数

先从相应项目的安装页面下载脚本，再运行下表中的入口。应先确认当前工作目录和下载是否成功。

| 环境 | 安装入口 | 常用可选参数 | 卸载入口 |
|---|---|---|---|
| Incus | `scripts/incus_install.sh` | `INCUS_STORAGE_PATH`、`INCUS_DISK_SIZE`、`INCUS_STORAGE_BACKEND` | `scripts/uninstall_incus.sh` |
| LXD | `scripts/lxdinstall.sh` | `STORAGE_PATH`、`DISK_NUMS` | `scripts/lxduninstall.sh` |
| Docker | `scripts/dockerinstall.sh` | `NEED_DISK_LIMIT`、`DOCKER_INSTALL_PATH`、`DOCKER_POOL_SIZE`、`DOCKER_LOOP_FILE` | `dockeruninstall.sh` |
| Podman | `podmaninstall.sh` | `NEED_DISK_LIMIT`、`PODMAN_INSTALL_PATH`、`PODMAN_POOL_SIZE`、`PODMAN_LOOP_FILE` | `podmanuninstall.sh` |
| Containerd | `containerdinstall.sh` | `NEED_DISK_LIMIT`、`CONTAINERD_INSTALL_PATH`、`CONTAINERD_POOL_SIZE`、`CONTAINERD_LOOP_FILE` | `containerduninstall.sh` |

例如，已经下载 Incus 安装脚本后：

```bash
noninteractive=true INCUS_DISK_SIZE=10 bash ./incus_install.sh </dev/null
```

不指定可选参数时使用相应安装器的默认策略。存储路径、后端和磁盘配额能力仍受宿主环境约束。安装器的 IPv6 探测可以合理降级到 IPv4，但这不代表独立 IPv6 已配置成功。Incus 无人值守安装完成后不会自动重启；交互安装的重启提示以及其他运行时的提示应分别处理。

卸载会删除对应环境的容器、镜像和相关配置。只有确认整个运行时可以删除时，才执行其无人值守卸载入口；`noninteractive=true` 会跳过脚本确认。LXD 的 `REMOVE_STORAGE` 等选项、Incus 的 `INCUS_FORCE_UNINSTALL`、Podman 的 `FORCE_UNINSTALL` 等旧专用选项仍按各自脚本语义处理，不应作为通用模式变量使用。

## 接入面板

SSH 模式需要面板能连接节点的 SSH 地址。Agent 模式需要在节点运行面板生成的 Agent 安装命令，并让 Agent 能连接面板提供的 WebSocket 地址；只安装虚拟化运行时不会自动建立这个反向连接。两种模式都要完成环境初始化后再开设容器。

网页操作使用当前登录身份；自动化使用 API token，通过 `Authorization: Bearer <token>` 请求面板。token 不能替代节点的 SSH 凭据或 Agent secret。创建和删除通常会进入任务队列，应等待任务的终态，再检查运行时中的实例和网络结果。

## 面板防火墙持久化

使用面板通用防火墙管理器时，nft 自有表保存在 `/etc/nftables.d/`，主配置和兼容规则快照按节点发行版选择：

| 发行版系列 | nft 主配置 | IPv4 快照 | IPv6 快照 |
|---|---|---|---|
| Debian / Ubuntu | `/etc/nftables.conf` | `/etc/iptables/rules.v4` | `/etc/iptables/rules.v6` |
| RHEL / CentOS / Fedora 及衍生版 | `/etc/sysconfig/nftables.conf` | `/etc/sysconfig/iptables` | `/etc/sysconfig/ip6tables` |
| Arch / Manjaro | `/etc/nftables.conf` | `/etc/iptables/iptables.rules` | `/etc/iptables/ip6tables.rules` |
| Alpine | `/etc/nftables.nft` | `/etc/iptables/rules-save` | `/etc/iptables/rules6-save` |

面板先读取完整规则再逐文件原子保存，保留已有权限、属主和符号链接；新快照权限为 600。不会再调用全局 save 二次覆盖，也不会启动或重载整个防火墙。缺少可选恢复服务时保留告警和当前运行规则，仍需安装正确服务并实际重启验证。未知发行版使用历史默认路径，自定义服务覆盖或 rules_file 需人工核对；文件保存成功不等于重启恢复已经验收。

初始化缓存只属于当前防火墙管理器；再次初始化时会复查必要的 nft 链，表或链丢失会重新创建。失败不会记为初始化完成，也不使用旧对象的内存地址作为新连接的有效依据。这不能阻止管理员或外部服务在检查之后再次修改规则，实际端口可达性仍需验证。

## 三种网络模式的区别

| 目标 | 验证内容 |
|---|---|
| 纯 NAT IPv4 | 容器 IPv4 出网及宿主端口映射；不能把额外分配的公网 IPv6 算作纯 IPv4 |
| 纯独立 IPv6 | 容器持有可路由的公网 IPv6，可以直接访问其服务；不能依赖 IPv4 NAT 才完成访问 |
| NAT IPv4 + IPv6 | Incus/LXD 通过宿主 IPv4/IPv6 的同一映射端口访问实例 ULA；需要独立路由地址的后端则验证实例自己的公网 IPv6 |

脚本中的“附加独立 IPv6”通常是在原有 IPv4 网络上增加 IPv6，不等同于纯 IPv6。面板的 `networkType` 与节点类型应一起核对：Incus/LXD 的 `nat_ipv4_ipv6` 使用宿主公网 IPv6 到实例 ULA 的端口映射，不读取 `/64` 地址池；其他需要路由地址的后端按地址池/隧道配置。不能把 IPv6 NAT 地址当作独立 IPv6。

独立 IPv6 需要可分配地址段、上游路由或 NDP 条件、宿主转发和容器路由共同正常。安装成功后应在容器内检查 IPv4/IPv6 地址、默认路由和 DNS，并从容器外分别测试 SSH。删除后再以同一宿主端口创建容器，可检查旧映射是否残留。

Agent 流量监控需要实际产生流量后检查计数增长，并检查重启和删除后的状态；仅看到 Agent 在线不能证明监控正确。

## IPv6 路由检查与恢复

云平台显示已分配 IPv6 前缀，不代表重装后的系统已自动配置地址和默认路由。先检查实际状态：

```bash
ip -6 -o addr show scope global
ip -6 route show default
curl --noproxy '*' -6 -fsS --connect-timeout 10 --max-time 25 https://ipv6.ip.sb
```

缺失时，先确认供应商实际分配的地址段与网关；有依据的候选只能先临时验证，不能直接写进所有节点的默认配置。添加临时地址后检查重复地址检测（DAD），再检查以上请求返回的公网源地址。失败只回滚本次新增地址和路由；成功才按当前系统网络管理方式持久化，并实际重启复验。保留原 IPv4、其他接口和已有路由，不使用全局地址或路由 flush。

可 ping 的链路本地邻居不一定是可用网关；宿主 `/128` 也不等于获分配整个 `/64`。只有明确委派的前缀才能用作容器地址池。宿主出网通过之后，仍须分别验证容器出网、独立外部 SSH 登录和公网 HTTP 服务响应；只检查 ping、TCP 22 握手或宿主服务不算容器通过。

Incus/LXD 面板的可选 IPv6 保活任务使用独立 `/etc/cron.d/oneclickvirt-ipv6-keepalive`，不覆盖 root 原有 crontab。相同任务幂等复用，其他自定义文件保留并告警；节点缺少 cron.d、crontab 或 flock 等可选条件时，不因保活安装失败回滚已创建容器。保活请求不能修复错误的上游网关，也不能代替以上连通性验收。
