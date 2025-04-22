---
outline: deep
---

## Repo

https://github.com/oneclickvirt/convoypanel-scripts

[![hits](https://hits.spiritlhl.net/convoy.svg?action=hit&title=hits&title_bg=%23555555&count_bg=%233aebee&edge_flat=false)](https://hits.spiritlhl.net)

## convoypanel-scripts

### One-click installation of convoy panel

Prerequisites for installation:

- PVE is installed, but not the same node(not the same machine)
- System is debian 11
- CPU at least 2 cores, hard disk at least 20G, memory at least 4G (memory covers swap)

**I don't guarantee that this script is error-free, it's just for my own amusement.**

```shell
curl -L https://github.com/oneclickvirt/convoypanel-scripts/raw/main/installconvoy.sh -o installconvoy.sh && chmod +x installconvoy.sh && bash installconvoy.sh
```

### Thanks

Base on https://github.com/oneclickvirt/pve

Base on https://docs.convoypanel.com/guide/deployment/#installation

Base on https://github.com/ConvoyPanel/panel
