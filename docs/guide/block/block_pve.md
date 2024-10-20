---
outline: deep
---

# 通过设置防火墙限制虚拟机使用的IP避免盗用

在PVE的宿主机下创建以下文件

```shell
/etc/pve/firewall/<VMID>.fw

[IPSET ipfilter-<net0>]
xxx.xxx.xxx.xxx
```

```<VMID>```替换为虚拟机的VMID数字，```<net0>```替换为网络设备中对应的别名(一般不用修改，除非你限制的IPV6)，```xxx.xxx.xxx.xxx```替换为公网IP地址，注意此IP对应前面的网络设备。


这里的意思是net0只能使用xxx.xxx.xxx.xxx这个IP，如果使用其他的IP数据将会被丢弃，从而达到限制虚拟机只能使用此IP的目的。

这里可以有多个IP，一旦启用此规则该VM就无法使用除此之外的任何IP，如果你没有写IPv6地址则代表该VM无法使用IPv6地址。

:::tip
本设置仅推荐在开设**非NAT全端口映射的独立IP的虚拟机**时使用，否则可能导致奇奇怪怪的问题造成服务器没网。
:::

该方法**不适合**开设任何NAT虚拟机/容器的PVE上使用。