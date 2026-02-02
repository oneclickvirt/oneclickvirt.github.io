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

### Blocking BT behavior

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

### Blocking Speed Test Behavior

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