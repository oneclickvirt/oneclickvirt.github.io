---
outline: deep
---

# Blocking abuse through iptables

## Basic Usage of `iptables`

### 1. Start `iptables`

In most Linux distributions, the `iptables` service can be started using the following command:

```bash
sudo systemctl start iptables
```

### 2. Set Rules

After starting `iptables`, you can set rules to block abusive traffic. For example, the following command will block traffic from a specific IPv4 address:

```bash
sudo iptables -A INPUT -s xxx.xxx.xxx.xxx -j DROP
```

### 3. Query Rules

After setting the rules, you can use the following command to view the current `iptables` rules:

```bash
sudo iptables -L
```

This will list all input, output, and forwarding rules.

### 4. Stop `iptables`

If you need to stop the `iptables` service, you can use the following command:

```bash
sudo systemctl stop iptables
```

### 5. Save Rules

To ensure that the rules persist after a reboot, you can save the current rules:

```bash
sudo iptables-save | sudo tee /etc/iptables/rules.v4
```

### 6. Restore Rules

When you need to restore the rules, you can use the following command:

```bash
sudo iptables-restore < /etc/iptables/rules.v4
```

### 7. Other Common Commands

- **List Rules (Detailed Information)**:

  ```bash
  sudo iptables -L -v
  ```

- **Delete Specific Rule**:

  ```bash
  sudo iptables -D INPUT -s 192.168.1.100 -j DROP
  ```

- **Flush All Rules**:

  ```bash
  sudo iptables -F
  ```

## Block abusive traffic on the host

- prevention in advance

### Blocking Mining Behavior

```shell
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

### Blocking BT behavior

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

### Blocking Speed Test Behavior

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

### Unblocking actions

Remove mining restrictions

```shell
iptables -D OUTPUT -j MINING_BLOCK
iptables -F MINING_BLOCK
iptables -X MINING_BLOCK
```

Remove BT restrictions

```shell
iptables -D OUTPUT -j BT_BLOCK
iptables -F BT_BLOCK
iptables -X BT_BLOCK
```

Remove speed restrictions

```shell
iptables -D OUTPUT -j SPEED_BLOCK
iptables -F SPEED_BLOCK
iptables -X SPEED_BLOCK
```