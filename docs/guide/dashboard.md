---
outline: deep
---

## 准备工作  

需要虚拟化出服务器，你需要：

1. 一台可以连接公网的服务器( VPS 或 Dedicated Server)，最好能完美访问 Github 的 RAW 页面，部分项目部分组件可能未使用 CDN 加速

::: tip  
如果您位于中国大陆，访问 Github 有困难，请注意配套脚本和项目是否有说明已使用 CDN 加速
:::

2. 本地可以稳定连接SSH，如果不能稳定连接，请使用```screen```命令创建窗口后，在窗口内执行命令

::: tip  
不会用screen命令的，自行查找相关教程学习，或者用tmux替代也行
:::

3. 确保服务器的系统和硬件满足对应项目的要求，详见对应项目说明

**本文档将以VPS作为范例，且该VPS纯净，无原生环境问题，如有必要请重装系统保证初始环境的纯净**  

:::warning  
PVE项目可能造成宿主机出现问题，如果你不会看Bug和修复系统，那么不建议你在生产环境中使用，使用PVE相关脚本请确保宿主机随时可重装系统  
:::  

## 项目仓库

欢迎Star和Fork，所有资源均开源，无非开源部分，转载以及使用请写上来源于本站，谢谢

## PVE

[https://github.com/oneclickvirt/pve](https://github.com/oneclickvirt/pve)

[![Hits](https://hits.spiritlhl.net/pve.svg?action=hit&title=Hits&title_bg=%23555555&count_bg=%230eecf8&edge_flat=false)](https://hits.spiritlhl.net)

## incus

[https://github.com/oneclickvirt/incus](https://github.com/oneclickvirt/incus)

[![Hits](https://hits.spiritlhl.net/incus.svg?action=hit&title=Hits&title_bg=%23555555&count_bg=%230eecf8&edge_flat=false)](https://hits.spiritlhl.net)

## Docker

[https://github.com/oneclickvirt/docker](https://github.com/oneclickvirt/docker)

[![Hits](https://hits.spiritlhl.net/docker.svg?action=hit&title=Hits&title_bg=%23555555&count_bg=%230eecf8&edge_flat=false)](https://hits.spiritlhl.net)

## LXD

[https://github.com/oneclickvirt/lxd](https://github.com/oneclickvirt/lxd)

[![Hits](https://hits.spiritlhl.net/lxd.svg?action=hit&title=Hits&title_bg=%23555555&count_bg=%230eecf8&edge_flat=false)](https://hits.spiritlhl.net)