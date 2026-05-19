---
outline: deep
---

# Repository

https://github.com/spiritLHLS/addzram

# addzram

Enable zram (compressed memory) on Linux servers.

## Install

Global:

```bash
curl -L https://raw.githubusercontent.com/spiritLHLS/addzram/main/addzram.sh -o addzram.sh && chmod +x addzram.sh && bash addzram.sh
```

CN mirror:

```bash
curl -L https://cdn.spiritlhl.net/https://raw.githubusercontent.com/spiritLHLS/addzram/main/addzram.sh -o addzram.sh && chmod +x addzram.sh && bash addzram.sh
```

## Notes

- zram and swap both consume CPU resources in different ways.
- Input `1024` to create about `1G` zram device memory.
- zram size should not exceed physical memory size.
