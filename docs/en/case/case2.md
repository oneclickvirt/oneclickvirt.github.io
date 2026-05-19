---
outline: deep
---

# Repository

https://github.com/spiritLHLS/one-click-installation-script

[![Hits](https://hits.spiritlhl.net/one-click-installation-script.svg?action=hit&title=Hits&title_bg=%23555555&count_bg=%230eecf8&edge_flat=false)](https://hits.spiritlhl.net)

# One-click Repair and Installation Scripts

A collection of practical scripts for system repair and environment setup.

## Important Warning

Read each script description before running it.
Make sure there is no critical data on the server.
You are responsible for evaluating risks in your own environment.

## Common Repair Script: Fix APT Issues

```bash
curl -L https://raw.githubusercontent.com/spiritLHLS/one-click-installation-script/main/repair_scripts/package.sh -o package.sh && chmod +x package.sh && bash package.sh
```

## Common Repair Script: Fix System Time

```bash
curl -L https://raw.githubusercontent.com/spiritLHLS/one-click-installation-script/main/repair_scripts/modify_time.sh -o modify_time.sh && chmod +x modify_time.sh && bash modify_time.sh
```

## Common Install Script: Jupyter Environment

```bash
curl -L https://raw.githubusercontent.com/spiritLHLS/one-click-installation-script/main/install_scripts/jupyter.sh -o jupyter.sh && chmod +x jupyter.sh && bash jupyter.sh
```

## More Scripts

For the full list (network fixes, language/runtime setup, migration scripts, platform installers, etc.), please check:
https://github.com/spiritLHLS/one-click-installation-script
