---
outline: deep
---

# 通过shell脚本屏蔽滥用行为

## 屏蔽容易被滥用的端口的出入流量以屏蔽端口和屏蔽滥用工具包

- (***非必须***，该脚本仅仅是为了防止容器滥用方便，不装的也没问题)
- 事前预防

国际

```shell
curl -L https://raw.githubusercontent.com/oneclickvirt/lxd/main/scripts/rules.sh -o rules.sh && chmod +x rules.sh && bash rules.sh
```

国内

```shell
curl -L https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/lxd/main/scripts/rules.sh -o rules.sh && chmod +x rules.sh && bash rules.sh
```

## 使用screen配置监控屏蔽某些进程的执行遇到某些进程的出现直接关闭容器

- 如需停止监控可使用```screen```命令停止```lxc_moniter```这个名字的窗口并删除
- (***非必须***，该脚本仅仅是为了防止容器滥用方便，不装的也没问题)
- 事后停机

国际

```shell
curl -L https://raw.githubusercontent.com/oneclickvirt/lxd/main/scripts/build_monitor.sh -o build_monitor.sh && chmod +x build_monitor.sh && bash build_monitor.sh
```

国内

```shell
curl -L https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/lxd/main/scripts/build_monitor.sh -o build_monitor.sh && chmod +x build_monitor.sh && bash build_monitor.sh
```