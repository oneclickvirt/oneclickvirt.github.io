---
outline: deep
---

## Repo

<https://github.com/oneclickvirt/convoypanel-scripts>

[![hits](https://hits.spiritlhl.net/convoy.svg?action=hit&title=hits&title_bg=%23555555&count_bg=%233aebee&edge_flat=false)](https://hits.spiritlhl.net)

## convoypanel-scripts

安装前提条件：

- 已安装 PVE，但不能是同一节点（不能是同一台机器）  
- 系统为 Debian 11  
- CPU 至少 2 核，硬盘至少 20G，内存至少 4G（内存包含 swap）

**我不保证这个脚本没有错误，本项目未完整**

```shell
curl -L https://github.com/oneclickvirt/convoypanel-scripts/raw/main/installconvoy.sh -o installconvoy.sh && chmod +x installconvoy.sh && bash installconvoy.sh
```

## Thanks

Base on <https://github.com/oneclickvirt/pve>

Base on <https://docs.convoypanel.com/guide/deployment/#installation>

Base on <https://github.com/ConvoyPanel/panel>
