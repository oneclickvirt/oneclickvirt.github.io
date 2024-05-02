---
outline: deep
---

# 仓库

https://github.com/oneclickvirt/CommonMediaTests

[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Foneclickvirt%2FCommonMediaTests&count_bg=%2379C83D&title_bg=%23555555&icon=sonarcloud.svg&icon_color=%2345FFC2&title=hits&edge_flat=false)](https://hits.seeyoufarm.com)

# CommonMediaTests

御三家流媒体解锁测试

基于 [netflix-verify](https://github.com/sjlleo/netflix-verify) [VerifyDisneyPlus](https://github.com/sjlleo/VerifyDisneyPlus) [TubeCheck](https://github.com/sjlleo/TubeCheck) 整合代码，优化测试速度

## 功能

- [x] 双栈测试
- [x] 并发测试netflix、youtube、disneyplus是否解锁以及解锁的地区
- [x] 支持双语输出，以```-l```指定zh或en可指定输出的语言，未指定时默认使用中文输出
- [x] 全平台编译支持

## 使用

```shell
curl https://raw.githubusercontent.com/oneclickvirt/CommonMediaTests/main/cmt_install.sh -sSf | sh
```

更多架构请查看 https://github.com/oneclickvirt/CommonMediaTests/releases/tag/output
