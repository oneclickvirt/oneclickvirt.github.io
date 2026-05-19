---
outline: deep
---

# Repository

https://github.com/spiritLHLS/ecsspeed

[![Hits](https://hits.spiritlhl.net/ecsspeed.svg?action=hit&title=Hits&title_bg=%23555555&count_bg=%230eecf8&edge_flat=false)](https://hits.spiritlhl.net)

# ecsspeed

Network benchmarking scripts with auto-updating speed test node lists.

## speedtest.net Script

```bash
bash <(curl -sSL http://bash.spiritlhl.net/ecs-net)
```

GitHub raw fallback:

```bash
bash <(curl -sSLk https://github.com/spiritLHLS/ecsspeed/raw/main/script/ecsspeed-net.sh)
```

## speedtest.cn Script

```bash
bash <(curl -sSL http://bash.spiritlhl.net/ecs-cn)
```

## Three-network Ping Script

```bash
bash <(curl -sSL http://bash.spiritlhl.net/ecs-ping)
```

## Notes

- Supports major architectures including amd64/arm64/s390x/riscv64.
- Node metadata is updated automatically in upstream datasets.
- For full details and latest behavior, see upstream README:
  https://github.com/spiritLHLS/ecsspeed
