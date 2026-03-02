---
outline: deep
---

# 常见问题答疑

## kubectl: command not found

k3s 环境未正确安装，请重新执行安装脚本：

国际

```shell
bash <(wget -qO- https://raw.githubusercontent.com/oneclickvirt/kubevirt/main/kubevirtinstall.sh)
```

国内

```shell
bash <(wget -qO- https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/kubevirt/main/kubevirtinstall.sh)
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

检查 iptables NAT 规则是否存在：

```shell
iptables -t nat -L POSTROUTING -n -v | grep flannel
```

如果没有，检查 Flannel 网络插件是否正常运行：

```shell
kubectl get pods -n kube-system | grep flannel
```

## 虚拟机 IPv6 未生效

1. 确认宿主机有公网 IPv6 地址
2. 检查是否配置了 IPv6 相关资源：

```shell
kubectl get svc -n default | grep ipv6
```

## KVM 不可用

```bash
egrep -c '(vmx|svm)' /proc/cpuinfo
ls /dev/kvm
```

若在 VPS 上无法使用 KVM，可能是宿主机不支持嵌套虚拟化（Nested Virtualization），请联系 VPS 提供商确认。

## 虚拟机一直处于 Pending 状态

查看虚拟机实例详情：

```shell
kubectl describe vmi vm1 -n default
```

常见原因：
- CDI（Containerized Data Importer）未完成磁盘镜像导入，等待 DataVolume 就绪：

```shell
kubectl get dv -n default
```

- 宿主机资源不足（CPU/内存/存储）

## 如何查看 SSH 登录信息

查看 vmlog 文件获取批量开设时的信息：

```shell
cat vmlog
```

## 如何完全重置 KubeVirt 环境

先卸载，再重新安装：

国际

```shell
bash <(wget -qO- https://raw.githubusercontent.com/oneclickvirt/kubevirt/main/scripts/kubevirtuninstall.sh)
bash <(wget -qO- https://raw.githubusercontent.com/oneclickvirt/kubevirt/main/kubevirtinstall.sh)
```

国内

```shell
bash <(wget -qO- https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/kubevirt/main/scripts/kubevirtuninstall.sh)
bash <(wget -qO- https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/kubevirt/main/kubevirtinstall.sh)
```
