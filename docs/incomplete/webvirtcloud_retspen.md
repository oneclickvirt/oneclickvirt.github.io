---
outline: deep
---

## WebVirtCloud 安装指南

[![hits](https://hits.spiritlhl.net/webvirtcloud.svg?action=hit&title=hits&title_bg=%23555555&count_bg=%233aebee&edge_flat=false)](https://hits.spiritlhl.net)

仓库地址: <https://github.com/oneclickvirt/webvirtcloud>

原项目对应仓库：<https://github.com/retspen/webvirtcloud>

## 控制节点和计算节点同时安装

- 支持系统：Debian10+，Ubuntu18.04+
- 推荐系统：Debian12+，Ubuntu22.04+
- 低版本系统会自动编译python新版本的安装包后再进行部署，所以推荐使用新系统不必编译直接安装

国际

```bash
curl -slk https://raw.githubusercontent.com/oneclickvirt/webvirtcloud/main/scripts/install_webvirt_cloud_retspen.sh -o install_webvirt_cloud_retspen.sh \
&& chmod +x install_webvirt_cloud_retspen.sh \
&& bash install_webvirt_cloud_retspen.sh
```

国内

```bash
curl -slk https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/webvirtcloud/main/scripts/install_webvirt_cloud_retspen.sh -o install_webvirt_cloud_retspen.sh \
&& chmod +x install_webvirt_cloud_retspen.sh \
&& bash install_webvirt_cloud_retspen.sh
```
