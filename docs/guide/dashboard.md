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
不会用screen命令的，自行查找相关教程学习
:::
3. 确保服务器的系统和硬件满足对应项目的要求，详见对应项目说明

**本文档将以VPS作为范例，且该VPS纯净，无原生环境问题，如有必要请重装系统保证初始环境的纯净**  

:::warning  
PVE项目可能造成宿主机出现问题，如果你不会看Bug和修复系统，那么不建议你在生产环境中使用，使用PVE相关脚本请确保宿主机随时可重装系统  
:::  

## 项目仓库

欢迎Star和Fork

### PVE

可开设KVM虚拟化的虚拟机、LXC虚拟化的容器

[https://github.com/spiritLHLS/pve](https://github.com/spiritLHLS/pve)

[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2FspiritLHLS%2Fpve&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false)](https://hits.seeyoufarm.com)

### LXD

可开设LXC虚拟化的容器

[https://github.com/spiritLHLS/lxc](https://github.com/spiritLHLS/lxc)

[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2FspiritLHLS%2Flxc&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false)](https://hits.seeyoufarm.com)

### Docker

可开设Docker虚拟化的容器

[https://github.com/spiritLHLS/docker](https://github.com/spiritLHLS/docker)

[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2FspiritLHLS%2Fdocker&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false)](https://hits.seeyoufarm.com)

<br/>
<br/>
