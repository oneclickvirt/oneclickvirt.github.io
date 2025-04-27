---
outline: deep
---

## WebVirtCloud Installation Guide

[![hits](https://hits.spiritlhl.net/webvirtcloud.svg?action=hit&title=hits&title_bg=%23555555&count_bg=%233aebee&edge_flat=false)](https://hits.spiritlhl.net)

Repository: <https://github.com/oneclickvirt/webvirtcloud>

Origin Repository:：<https://github.com/retspen/webvirtcloud>

## Controller Node and Computer Node Installation

- Supported Systems: Debian10+, Ubuntu18.04+
- Recommended system: Debian12+, Ubuntu22.04+.
- Lower versions of the system will automatically compile the new version of python installation package before deployment, so it is recommended to use a new system without compiling directly installed!

```bash
curl -slk https://raw.githubusercontent.com/oneclickvirt/webvirtcloud/main/scripts/install_webvirt_cloud_retspen.sh -o install_webvirt_cloud_retspen.sh \
&& chmod +x install_webvirt_cloud_retspen.sh \
&& bash install_webvirt_cloud_retspen.sh
```
