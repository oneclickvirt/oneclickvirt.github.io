---
outline: deep
---

# 常见问题答疑

## 日志文件

单机和批量创建均在当前工作目录的 `vmlog` 记录连接信息，权限为 `0600`。完整记录还包含系统、CPU、内存和磁盘；以下展示前几个字段：

```
vm1 root@<宿主机IP>:25000 密码: MyPassword 端口范围: 34975-35000
vm2 root@<宿主机IP>:25001 密码: MyPassword 端口范围: 35001-35026
```

## 注意事项

1. 首次启动需要导入镜像，根据网络情况可能需要 5–20 分钟。
2. 推荐使用 KVM 或嵌套虚拟化；TCG 模拟速度较慢。
3. 新映射使用 NodePort Service；旧 nftables/iptables 转发可用 `update-port-rules.sh` 迁移。安装器按系统配置 systemd 与防火墙持久化：Debian/Ubuntu 使用 `iptables-persistent`、`netfilter-persistent`，Red Hat/CentOS 分支使用 `iptables-services`。规则按 VMI 实际地址族建立，不会把 IPv6-only 地址写入 IPv4 DNAT。
4. `K3S_IP_FAMILY=auto` 在双栈上行可用时选择双栈；已有单栈集群不自动转换。共享宿主端口与 IPv6 NAT 不等同于客体独立公网 IPv6。
5. 当前脚本仅支持 amd64/x86_64。
6. CentOS 7 已 EOL，仅保留为兼容镜像选项，建议使用维护中的 Debian、Ubuntu、RockyLinux 或 AlmaLinux。
7. 如需重置密码，通过 `virtctl console` 进入控制台修改。

## 使用说明

**K3s 安装失败怎么办？**

安装脚本会输出 `/tmp/k3s-install-log.txt` 最近日志、`systemctl status k3s` 和 `journalctl -u k3s` 片段。优先检查网络/DNS、root 权限、systemd、内核和防火墙限制。

**镜像导入失败或超时后会留下资源吗？**

镜像导入失败等前期失败默认清理本次创建的 VM、DataVolume、PVC 和 cloud-init Secret；设置 `KEEP_FAILED_RESOURCES=true` 可保留现场。后期密码 SSH 验证超时会保留实例并返回错误，便于排查。

**为什么 `listvms.sh <vmname>` 不再显示密码？**

新 VM 默认不把明文密码写入 Kubernetes 注解，避免普通元数据查询泄露密码。密码仍会用于 cloud-init 初始化，并记录在创建时输出和本地 `vmlog` 中；`listvms.sh` 默认会对 `vmlog` 密码脱敏。如需在注解中保存密码，创建时设置 `STORE_PASSWORD_ANNOTATION=true`，查询时设置 `SHOW_PASSWORD=true`。仅从已有本地 `vmlog` 显示密码时，设置 `SHOW_PASSWORD=true` 即可。

**快照是否等同于应用一致性备份？**

不是。`snapshotvm.sh` 使用 CDI DataVolume 克隆。运行中 VM 的磁盘可能存在未刷盘数据，建议先停止 VM 再创建快照。

### 双栈集群与稳定端口映射

安装器默认 `K3S_IP_FAMILY=auto`：检测 IPv6 默认路由及其接口的全局地址，
具备双栈上行时创建双栈 K3s 并启用 IPv6 出网伪装。可显式设置 `ipv4` 或
`dualstack`；显式双栈缺少上行时安装失败。可用 `K3S_CLUSTER_CIDR` 与
`K3S_SERVICE_CIDR` 覆盖网段以避开已有网络。已有单栈集群不会自动原地转换；
应备份工作负载后按 K3s 支持的方式重建集群。

新虚拟机使用 NodePort Service 转发 SSH 及额外 TCP/UDP 端口，端点随 VM
停止/启动后的 Pod 地址变化自动更新。创建失败会返回错误；旧版实例可在确认
VM 名称和 vmlog 中的端口参数后运行 `update-port-rules.sh VMNAME` 迁移。
Service 归属 VM，删除 VM 时
自动清理。`vmlog` 保存连接信息，权限固定为 600，请勿上传到公共日志或制品。

脚本双栈提供共享宿主 IPv4/IPv6 的端口转发及 IPv6 NAT 出网，不等同于为
客体分配独立公网 IPv6；独立路由地址需要额外配置并单独验证上游路由。

### K3s/Flannel 的 Multus 次网卡

需要路由 IPv6 次网卡时，可在安装时设置 `KUBEVIRT_INSTALL_MULTUS=true`，
或在现有 K3s 主机以 root 运行 `bash scripts/install_multus.sh`。它安装固定
摘要的 Multus v4.3.1、校验 CNI static 插件，并保留 K3s 的可执行符号链接。
自定义数据目录可设置 `K3S_DATA_DIR`，还可分别覆盖 `K3S_CNI_BIN_DIR`、
`K3S_CNI_CONF_DIR`。当前入口要求 K3s/Flannel 的 `10-flannel.conflist`；
不自动转换其他主 CNI。

安装器保留 `00-multus-oneclickvirt.conf`，避免 Multus 退出时删除自动配置后，
早启动的 Pod 绕过 Multus、只拿到主网卡却显示 Ready。宿主重启时，Pod 会等待
Multus 的 host-network DaemonSet 就绪后创建网络。该步骤只安装次网卡能力，
路由前缀、网桥、上游 NDP 或隧道仍须按真实网络配置。旧 Pod 若已丢失次网卡，
安装后需通过面板重启实例重建 Pod，再检查实际地址与 SSH。

### 独立外部 IPv6 密码 SSH 验证

手动工作流 `Hosted runner independent IPv6 SSH` 使用 GitHub 官方 Ubuntu
runner，通过 Cloudflare WARP 的本地 SOCKS 代理获取独立 IPv6 出口。它校验
客体 SSH 主机密钥指纹，禁用公钥认证，使用密码登录并执行随机值及 root 身份
检查。HTTP 可达、SSH banner、通过宿主转发的登录均不代替此结果。

仅在验收窗口设置临时 Secret `RUNTIME_IPV6_SSH_TARGETS`，内容为一到六个
对象组成的 JSON 数组，每个对象包含 `address`、`password`、`fingerprint`
（`SHA256:` 格式），可选 `port`、`username`、`boot_id`。只允许公网 IPv6
目标。工作流不输出地址、口令、原始 SSH 错误或命令回传；验收完成后删除
临时 Secret。该工作流没有定时触发器。

## kubectl: command not found

k3s 环境未正确安装，请重新执行安装脚本：

国际

```shell
bash <(curl -sSL https://raw.githubusercontent.com/oneclickvirt/kubevirt/main/kubevirtinstall.sh)
```

国内

```shell
bash <(curl -sSL https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/kubevirt/main/kubevirtinstall.sh)
```

## KubeVirt Pod 未就绪

查看 KubeVirt 命名空间下的所有 Pod 状态：

```shell
kubectl get pods -n kubevirt
```

若有 Pod 处于 `Pending` 或 `CrashLoopBackOff` 状态，查看详细信息：

```shell
kubectl describe pod <pod-name> -n kubevirt
kubectl logs <pod-name> -n kubevirt
```

常见原因：
- 宿主机不支持 KVM（检查 `/dev/kvm` 是否存在）
- 内存不足（k3s + KubeVirt 至少需要 4GB 可用内存）

## 虚拟机无法访问外网（IPv4）

检查 VMI、Pod 地址、Service 和端点。K3s 内置 Flannel，不要求存在单独的 Flannel Pod。客体无法出网时检查 K3s 日志及宿主转发状态。

```bash
kubectl get vmi,pods,svc,endpoints -n kubevirt-vms -o wide
journalctl -u k3s -n 100
sysctl net.ipv4.ip_forward
```

## 虚拟机 IPv6 未生效

检查宿主 IPv6 默认路由、K3s 的 Pod/Service CIDR 和 VMI 实际地址族。新 Service 按集群可用地址族创建，不能通过是否有名称含 ipv6 的 Service 判断。双栈配置见上方，已有 IPv4-only 集群不自动转换。

```bash
ip -6 route
kubectl get nodes -o wide
kubectl get vmi,svc -n kubevirt-vms -o yaml
```

## KVM 不可用

```bash
egrep -c '(vmx|svm)' /proc/cpuinfo
ls /dev/kvm
```

若在 VPS 上无法使用 KVM，可能是宿主机不支持嵌套虚拟化（Nested Virtualization），请联系 VPS 提供商确认。

加载模块后仍无 `/dev/kvm` 时，安装器启用较慢的 TCG 模拟。可检查 KubeVirt 配置中的 `useEmulation`，不应仅凭缺少 KVM 判定安装必定失败。

## 虚拟机一直处于 Pending 状态

查看虚拟机实例详情：

```shell
kubectl describe vmi vm1 -n kubevirt-vms
```

常见原因：
- CDI（Containerized Data Importer）未完成磁盘镜像导入，等待 DataVolume 就绪：

```shell
kubectl get dv -n kubevirt-vms
```

- 宿主机资源不足（CPU/内存/存储）

## 如何查看 SSH 登录信息

连接记录保存在创建工作目录的 `vmlog`。`listvms.sh` 默认脱敏密码，需要读取本地已存口令时可设置 `SHOW_PASSWORD=true`，详见上方密码说明。

```bash
cat vmlog
listvms.sh vm1
```

## 如何完全重置 KubeVirt 环境

先卸载，再重新安装：

国际

```shell
bash <(curl -sSL https://raw.githubusercontent.com/oneclickvirt/kubevirt/main/kubevirtuninstall.sh)
bash <(curl -sSL https://raw.githubusercontent.com/oneclickvirt/kubevirt/main/kubevirtinstall.sh)
```

国内

```shell
bash <(curl -sSL https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/kubevirt/main/kubevirtuninstall.sh)
bash <(curl -sSL https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/kubevirt/main/kubevirtinstall.sh)
```

## 无 CDN 模式（WITHOUTCDN）

如果服务器网络非常好无需加速，或希望完全禁用 CDN 加速，可在执行脚本前设置：

```shell
export WITHOUTCDN=TRUE
```

也可以只对单次命令生效：

```shell
WITHOUTCDN=TRUE
```

设置后，脚本执行过程中将不再尝试使用 CDN 加速地址。
