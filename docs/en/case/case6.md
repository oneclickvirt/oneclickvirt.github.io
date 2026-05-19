---
outline: deep
---

# Repository

https://github.com/spiritLHLS/addswap

# addswap

Add swap space (virtual memory) to Linux servers on OpenVZ/KVM environments.

## Install

Global:

```bash
curl -L https://raw.githubusercontent.com/spiritLHLS/addswap/main/addswap.sh -o addswap.sh && chmod +x addswap.sh && bash addswap.sh
```

CN mirror:

```bash
curl -L https://cdn.spiritlhl.net/https://raw.githubusercontent.com/spiritLHLS/addswap/main/addswap.sh -o addswap.sh && chmod +x addswap.sh && bash addswap.sh
```

## Notes

- Input `1024` to create about `1G` swap.
- OpenVZ/LXC environments are usually restricted by host-side virtualization controls.
