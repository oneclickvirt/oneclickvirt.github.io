---
outline: deep
---

# Repository

https://github.com/spiritLHLS/Oracle-server-keep-alive-script

[![Hits](https://hits.spiritlhl.net/Oracle-server-keep-alive-script.svg?action=hit&title=Hits&title_bg=%23555555&count_bg=%230eecf8&edge_flat=false)](https://hits.spiritlhl.net)

# Oracle-server-keep-alive-script

A resource occupancy/keep-alive script. It is not limited to Oracle Cloud servers and can also run on common ARM or x86_64 Linux systems.

## Features

- Optional occupancy targets: CPU, memory, and bandwidth
- Dynamic resource control for safer operation
- Install, uninstall, and update helper flows

## Install

```bash
curl -L https://gitlab.com/spiritysdx/Oracle-server-keep-alive-script/-/raw/main/oalive.sh -o oalive.sh && chmod +x oalive.sh && bash oalive.sh
```

Alternative:

```bash
bash <(curl -sSLk https://gitlab.com/spiritysdx/Oracle-server-keep-alive-script/-/raw/main/oalive.sh)
```

## Notes

- Please test on non-production servers first.
- For complete options and caveats, check the upstream README:
  https://github.com/spiritLHLS/Oracle-server-keep-alive-script
