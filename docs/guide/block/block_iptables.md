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
    "antpool.one"
    "antpool.com"
    "pool.bar"
    "c3pool"
)

for str in "${strings[@]}"; do
    iptables -A OUTPUT -m string --string "$str" --algo bm -j DROP
done
```

### 屏蔽BT行为

```
strings=(
    "torrent"
    ".torrent"
    "BitTorrent"
    "BitTorrent protocol"
    "announce.php?passkey="
    "magnet:"
    "xunlei"
    "sandai"
    "Thunder"
    "XLLiveUD"
)

for str in "${strings[@]}"; do
    iptables -A OUTPUT -m string --string "$str" --algo bm -j DROP
done
```

### 屏蔽测速行为

```
strings=(
    ".speed"
    "speed."
    ".speed."
    "fast.com"
    "speedtest.net"
    "speedtest.com"
    "speedtest.cn"
    "test.ustc.edu.cn"
    "10000.gd.cn"
    "db.laomoe.com"
    "jiyou.cloud"
    "ovo.speedtestcustom.com"
    "speed.cloudflare.com"
    "speedtest"
)

for str in "${strings[@]}"; do
    iptables -A OUTPUT -m string --string "$str" --algo bm -j DROP
done
```