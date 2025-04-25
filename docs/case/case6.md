---
outline: deep
---

# 仓库

https://github.com/spiritLHLS/addswap

# addswap

为openvz、kvm虚拟化的linux服务器增加swap分区(虚拟内存)

国际

```shell
curl -L https://raw.githubusercontent.com/spiritLHLS/addswap/main/addswap.sh -o addswap.sh && chmod +x addswap.sh && bash addswap.sh
```

国内

```shell
curl -L https://cdn.spiritlhl.net/https://raw.githubusercontent.com/spiritLHLS/addswap/main/addswap.sh -o addswap.sh && chmod +x addswap.sh && bash addswap.sh
```

已增加openvz架构重启swap自动添加的

openvz这个添加=掩耳盗铃，实际受到虚拟化限制应该是无法添加的，只能由虚拟化的宿主机控制，同理LXC虚拟化的也只能由宿主机控制，都无法自主添加虚拟内存SWAP

因此，该项目不再更新，除非另有需求

**单位换算：输入 1024 产生 1G SWAP内存**

# 致谢

kvm分区原版脚本源自 https://www.moerats.com/

```bash
curl -L https://www.moerats.com/usr/shell/swap.sh -o swap.sh && chmod +x swap.sh && bash swap.sh
```

openVZ分区原版脚本源自 

http://linux-problem-solver.blogspot.com/2013/08/create-fake-swap-in-openvz-vps-if-you-get-swapon-failed-operation-not-permitted-error.html

感谢 [@fscarmen](https://github.com/fscarmen) 提供优化建议
