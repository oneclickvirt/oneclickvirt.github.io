---
outline: deep
---

## WebVirtMgr Installation Guide

[![hits](https://hits.spiritlhl.net/webvirtcloud.svg?action=hit&title=hits&title_bg=%23555555&count_bg=%233aebee&edge_flat=false)](https://hits.spiritlhl.net)

Repository: <https://github.com/oneclickvirt/webvirtcloud>

Origin Repository: <https://github.com/retspen/webvirtmgr>

## Control nodes and compute nodes installed at the same time 

- Supported systems: Debian[8,9,10]，Ubuntu[16.04,18.04,20.04]
- The system will automatically compile python 2.7 installer and then deployed, there will be an error in the compilation process but do not pay attention to it, as long as the scripts are still running, it means that everything is fine!

```bash
curl -slk https://raw.githubusercontent.com/oneclickvirt/webvirtcloud/main/scripts/install_webvirtmgr.sh -o install_webvirtmgr.sh \
&& chmod +x install_webvirtmgr.sh \
&& bash install_webvirtmgr.sh
```

## Disadvantages

The project is no longer maintained and is not recommended at all.