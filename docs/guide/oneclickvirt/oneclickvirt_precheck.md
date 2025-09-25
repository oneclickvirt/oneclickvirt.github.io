---
outline: deep
---

# 前言

欢迎给项目一个```Star```进行免费的支持-->[https://github.com/oneclickvirt/oneclickvirt](https://github.com/oneclickvirt/oneclickvirt)

## 环境需求

支持的架构：amd64或arm64

支持的系统：Linux、Windows

只要有公网就行，部署的机器不必有独立的公网IP地址，这只是一个虚拟化的控制面板。

本控制面板无环境依赖需求，仅一个守护进程启动的后端和一个对应的前端静态文件的文件夹。

前端静态文件通过nginx或者caddy部署即可。

## 平台特点

- 所有代码开源，不可进行商用

- 对接支持Provider如 ProxmoxVE、Incus、Docker、LXD 进行虚拟化，支持开设虚拟机或容器

- 支持自动的NAT公网端口映射，支持灵活设置Provider的网络类型，开设带独立IPV6地址的虚拟机或容器

- 支持流量监控，敏感操作强行同步流量，月初统一重置流量使用

- 支持邀请码注册非公开注册，支持用户等级管理设置资源限制