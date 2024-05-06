---
outline: deep
---

# 仓库

https://github.com/spiritLHLS/ecsspeed

[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2FspiritLHLS%2Fecsspeed&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false)](https://hits.seeyoufarm.com)

# ecsspeed

自动更新测速服务器节点列表的网络基准测试脚本

Network benchmarking script that automatically updates the list of speed measurement server nodes

## 说明

所有组件以及数据均来源于平台或已有的开源项目，无非开源部分，放心食用

### 对应 [speedtest.net](https://www.speedtest.net/) 的自动更新测速服务器ID的测速脚本

日常推荐使用

```
bash <(wget -qO- bash.spiritlhl.net/ecs-net)
```

或

```
bash <(wget -qO- --no-check-certificate https://github.com/spiritLHLS/ecsspeed/raw/main/script/ecsspeed-net.sh)
```

或国内用

```
bash <(wget -qO- --no-check-certificate https://ghproxy.com/https://raw.githubusercontent.com/spiritLHLS/ecsspeed/main/script/ecsspeed-net.sh)
```

支持测速的架构：i386, x86_64, amd64, arm64, s390x, riscv64, ppc64le, ppc64

涵盖中国三大运营商、香港、台湾的测速节点，默认的三网测速每个运营商选择本机ping值最低的两个节点测速，详情三网测速才是全测，节点列表大概每7天自动更新一次。

支持国内服务器测试(有判断是否为国内机器)，但由于国内服务器带宽过小，会很慢，详见初次运行的显示

当官方CLI安装失败(如罕见的架构或者官方网站访问失败时)自动使用 [speedtest-go](https://github.com/showwin/speedtest-go) 作为替代品测速

### 对应 [speedtest.cn](https://www.speedtest.cn/) 的自动更新测速服务器ID的测速脚本

单线程测速

```
bash <(wget -qO- bash.spiritlhl.net/ecs-cn)
```

或

```
bash <(wget -qO- --no-check-certificate https://github.com/spiritLHLS/ecsspeed/raw/main/script/ecsspeed-cn.sh)
```

或国内用

```
bash <(wget -qO- --no-check-certificate https://ghproxy.com/https://raw.githubusercontent.com/spiritLHLS/ecsspeed/main/script/ecsspeed-cn.sh)
```

支持测速的架构：i386, x86_64, amd64, arm64, s390x, riscv64, ppc64le, ppc64

涵盖中国三大运营商、香港、台湾的测速节点，默认的三网测速每个运营商选择本机ping值最低的两个节点测速，详情三网测速才是全测，节点列表每天自动更新一次。

支持国内服务器测试(有判断是否为国内机器)，但由于国内服务器带宽过小，会很慢，详见初次运行的显示

### 自动更新测试服务器列表的三网延迟测试脚本

平均耗时10~15秒

```
bash <(wget -qO- bash.spiritlhl.net/ecs-ping)
```

或

```
bash <(wget -qO- --no-check-certificate https://github.com/spiritLHLS/ecsspeed/raw/main/script/ecsspeed-ping.sh)
```

或国内用

```
bash <(wget -qO- --no-check-certificate https://ghproxy.com/https://raw.githubusercontent.com/spiritLHLS/ecsspeed/main/script/ecsspeed-ping.sh)
```

效果图

![图片](https://github.com/spiritLHLS/ecsspeed/assets/103393591/4c8f39a2-1286-47ae-a397-c46f3792340b)

## 功能

- [x] 自动抓取 [speedtest.cn](https://www.speedtest.cn/) 节点信息结合已有信息去重并更新列表数据
- [x] 自动抓取 [speedtest.net](https://www.speedtest.net/) 节点信息结合已有信息去重并更新列表数据
- [x] 对应 [speedtest.net](https://www.speedtest.net/) 的自动更新测速服务器列表的测速脚本
- [x] 对应 [speedtest.cn](https://www.speedtest.cn/) 的自动更新测速服务器列表的测速脚本
- [x] 自动更新测试服务器列表的三网Ping值测试脚本

## .cn数据

仓库：https://github.com/spiritLHLS/speedtest.cn-CN-ID

## .net数据

仓库：https://github.com/spiritLHLS/speedtest.net-CN-ID