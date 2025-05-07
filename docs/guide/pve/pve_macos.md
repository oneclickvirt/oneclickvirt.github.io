---
outline: deep
---

## 前置需求

系统和硬件配置要求 --> 检测环境

只有检测环境检测出宿主机支持KVM嵌套虚拟化时，才可以开设MACOS虚拟机，否则会被识别无法开设

## 系统镜像下载

- 所有镜像均预下载安装了启动所需的所有组件，所以非常大，最小都有4.9G
- 由于是完整的镜像不是Recovery镜像，所以无需联网下载组件即可直接引导使用
- 由于镜像本体较大，所以宿主机的系统盘需要足够大，如果检测到空闲空间比镜像大小的2倍多还少，那么不予下载
- 由于镜像经过7z压缩，所以下载后不能直接使用，需要命令选择解压后使用

国际

```shell
curl -L https://raw.githubusercontent.com/oneclickvirt/pve/main/scripts/macos_images_install.sh -o macos_images_install.sh && chmod +x macos_images_install.sh && bash macos_images_install.sh
```

国内

```shell
curl -L https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/pve/main/scripts/macos_images_install.sh -o macos_images_install.sh && chmod +x macos_images_install.sh && bash macos_images_install.sh
```

或

```shell
bash macos_images_install.sh
```
