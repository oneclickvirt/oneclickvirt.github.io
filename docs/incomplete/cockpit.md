---
outline: deep
---

## 仓库

[![hits](https://hits.spiritlhl.net/cockpit.svg?action=hit&title=hits&title_bg=%23555555&count_bg=%233aebee&edge_flat=false)](https://hits.spiritlhl.net)

https://github.com/oneclickvirt/cockpit

## 安装

支持的系统：Debian，Ubuntu，Almalinux，Rockylinux，Fedora，Centos，Arch

```shell
curl -L https://raw.githubusercontent.com/oneclickvirt/cockpit/refs/heads/main/scripts/install.sh -o install.sh && chmod +x install.sh
```

只安装带容器的

```shell
bash install.sh --ct
```

只安装带虚拟机的

```shell
bash install.sh --vm
```

仅安装面板

```shell
bash install.sh
```

容器和虚拟机依赖都进行安装

```shell
bash install.sh --all
```

## 缺点

网络自行配置，镜像自行导入，端口自行映射，只是比纯命令行多了一个GUI界面罢了

## 致谢

https://cockpit-project.org/running.html