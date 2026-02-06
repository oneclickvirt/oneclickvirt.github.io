---
outline: deep
---

# 通过iptables屏蔽滥用

## `iptables`的基础使用说明

### 1. 启动 `iptables`

在大多数 Linux 发行版中，`iptables` 服务可以通过以下命令启动：

```bash
sudo systemctl start iptables
```

### 2. 设置规则

在启动 `iptables` 后，可以设置相应的规则来屏蔽滥用流量。例如，以下命令将阻止来自特定IPV4地址的流量：

```bash
sudo iptables -A INPUT -s xxx.xxx.xxx.xxx -j DROP
```

### 3. 查询规则

设置完规则后，可以使用以下命令查看当前的 `iptables` 规则：

```bash
sudo iptables -L
```

这将列出所有输入、输出和转发的规则。

### 4. 停止 `iptables`

如果需要停止 `iptables` 服务，可以使用以下命令：

```bash
sudo systemctl stop iptables
```

### 5. 保存规则

为了确保在重启后规则依然生效，可以保存当前的规则：

```bash
sudo iptables-save | sudo tee /etc/iptables/rules.v4
```

### 6. 恢复规则

在需要恢复规则时，可以使用以下命令：

```bash
sudo iptables-restore < /etc/iptables/rules.v4
```

### 7. 其他常用命令

- **列出规则（详细信息）**：

  ```bash
  sudo iptables -L -v
  ```

- **删除特定规则**：

  ```bash
  sudo iptables -D INPUT -s 192.168.1.100 -j DROP
  ```

- **清空所有规则**：

  ```bash
  sudo iptables -F
  ```

## 在宿主机上屏蔽滥用行为

### 屏蔽挖矿行为

```
strings=(
    "ethermine.com"
    "ethermine.org"
    "antpool.one"
    "antpool.com"
    "pool.bar"
    "c3pool"
    "xmrig.com"
    "blackcat.host"
    "minexmr.com"
    "supportxmr.com"
    "monerohash.com"
    "hashvault.pro"
    "xmrpool.eu"
    "minergate.com"
    "webminepool.com"
    "nanopool.org"
    "2miners.com"
    "f2pool.com"
    "sparkpool.com"
    "nicehash.com"
    "prohashing.com"
    "coinhive.com"
    "coinimp.com"
    "cryptoloot.pro"
    "xmrig"
    "xmr-stak"
    "cpuminer"
    "cgminer"
    "ethminer"
    "stratum+tcp"
    "stratum+ssl"
    "stratum+http"
    "stratum"
    "raw.githubusercontent.com/xmrig"
    "github.com/xmrig"
)

iptables -N MINING_BLOCK 2>/dev/null
iptables -C OUTPUT -j MINING_BLOCK 2>/dev/null || iptables -A OUTPUT -j MINING_BLOCK
for str in "${strings[@]}"; do
    iptables -A MINING_BLOCK -m string --string "$str" --algo bm -j DROP
done
```

### 屏蔽BT行为

```shell
strings=(
    "BitTorrent"
    "BitTorrent protocol"
    "BitTorrent protocol\x13"
    "magnet:"
    ".torrent"
    "d1:ad2:id20"
    "d1:rd2:id20"
    "ut_metadata"
    "ut_pex"
    "lt_metadata"
    "lt_donthave"
    "qBittorrent"
    "Transmission"
    "Deluge"
    "aria2"
    "libtorrent"
    "uTorrent"
    "BiglyBT"
    "Vuze"
    "xunlei"
    "Thunder"
    "XLLiveUD"
)

iptables -N BT_BLOCK 2>/dev/null
iptables -C OUTPUT -j BT_BLOCK 2>/dev/null || iptables -A OUTPUT -j BT_BLOCK
for str in "${strings[@]}"; do
    iptables -A BT_BLOCK -m string --string "$str" --algo bm -j DROP
done
```

### 屏蔽测速行为

```shell
strings=(
    "speedtest"
    "fast.com"
    "speedtest.net"
    "speedtest.com"
    "speedtest.cn"
    "ookla.com"
    "speedtestcustom.com"
    "ovo.speedtestcustom.com"
    "speed.cloudflare.com"
    "test.ustc.edu.cn"
    "10000.gd.cn"
    "db.laomoe.com"
    "jiyou.cloud"
    "mirrors.ustc.edu.cn"
    "mirrors.tuna.tsinghua.edu.cn"
    "mirrors.aliyun.com"
    ".speed"
    ".speed."
    "/speedtest"
    "/speed-test"
)

iptables -N SPEED_BLOCK 2>/dev/null
iptables -C OUTPUT -j SPEED_BLOCK 2>/dev/null || iptables -A OUTPUT -j SPEED_BLOCK
for str in "${strings[@]}"; do
    iptables -A SPEED_BLOCK -m string --string "$str" --algo bm -j DROP
done
```

### 解除屏蔽行为

解除挖矿限制

```shell
iptables -D OUTPUT -j MINING_BLOCK
iptables -F MINING_BLOCK
iptables -X MINING_BLOCK
```

解除BT限制

```shell
iptables -D OUTPUT -j BT_BLOCK
iptables -F BT_BLOCK
iptables -X BT_BLOCK
```

解除测速限制

```shell
iptables -D OUTPUT -j SPEED_BLOCK
iptables -F SPEED_BLOCK
iptables -X SPEED_BLOCK
```