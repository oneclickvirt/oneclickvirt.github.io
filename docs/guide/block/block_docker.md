---
outline: deep
---

# 在 Docker 上屏蔽滥用行为

Docker 默认会创建自己的 NAT 和转发规则。不要直接修改 `DOCKER` 链，推荐把宿主机侧的容器出站限制写入 `DOCKER-USER` 链，这个链会在 Docker 自动规则之前被执行，重启 Docker 后也更容易复用。

:::warning
以下规则适用于普通 Docker bridge/NAT 场景。生产环境修改防火墙前请先保留 SSH 会话，并确认服务端控制台可用，避免规则写错导致失联。
:::

## 创建统一拦截链

```shell
iptables -N DOCKER_ABUSE_BLOCK 2>/dev/null || true
iptables -C DOCKER-USER -j DOCKER_ABUSE_BLOCK 2>/dev/null || iptables -I DOCKER-USER 1 -j DOCKER_ABUSE_BLOCK
iptables -C DOCKER_ABUSE_BLOCK -j RETURN 2>/dev/null || iptables -A DOCKER_ABUSE_BLOCK -j RETURN
```

`DOCKER_ABUSE_BLOCK` 链用于集中维护规则，最后的 `RETURN` 会把未命中的正常流量交还给 Docker 后续规则处理。

## 屏蔽高风险端口

如果不提供邮件服务，建议先阻断容器访问常见 SMTP 端口，减少被用于垃圾邮件的风险。

```shell
iptables -C DOCKER_ABUSE_BLOCK -p tcp -m multiport --dports 25,465,587 -j REJECT 2>/dev/null || \
  iptables -I DOCKER_ABUSE_BLOCK 1 -p tcp -m multiport --dports 25,465,587 -j REJECT
```

如需限制 IRC、代理或其他高风险端口，可以按需增加：

```shell
iptables -C DOCKER_ABUSE_BLOCK -p tcp -m multiport --dports 6660:6669,1080,3128,8080 -j REJECT 2>/dev/null || \
  iptables -I DOCKER_ABUSE_BLOCK 1 -p tcp -m multiport --dports 6660:6669,1080,3128,8080 -j REJECT
```

## 屏蔽挖矿、BT 和测速特征

以下规则复用宿主机 `iptables` 的字符串匹配能力，在容器出站流量中发现常见滥用特征时直接丢弃。

```shell
strings=(
    "ethermine.com"
    "antpool.com"
    "c3pool"
    "xmrig.com"
    "minexmr.com"
    "supportxmr.com"
    "hashvault.pro"
    "stratum+tcp"
    "stratum+ssl"
    "xmrig"
    "xmr-stak"
    "cpuminer"
    "BitTorrent"
    "magnet:"
    ".torrent"
    "ut_metadata"
    "qBittorrent"
    "Transmission"
    "speedtest"
    "fast.com"
    "speedtest.net"
    "ookla.com"
)

for str in "${strings[@]}"; do
    iptables -C DOCKER_ABUSE_BLOCK -m string --string "$str" --algo bm -j DROP 2>/dev/null || \
      iptables -I DOCKER_ABUSE_BLOCK 1 -m string --string "$str" --algo bm -j DROP
done
```

字符串匹配并不能替代完整的安全策略，但对低成本拦截常见滥用流量有帮助。

如果 Docker 启用了 IPv6，还需要用 `ip6tables` 或等效 `nftables` 规则为容器 IPv6 出站流量建立同样的限制。

## 限制单个容器出站

如果只需要限制某个容器，可以先查询容器 IP，再对这个 IP 添加规则。

```shell
container_name="example"
container_ip=$(docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' "$container_name")

if [ -n "$container_ip" ]; then
    iptables -C DOCKER_ABUSE_BLOCK -s "$container_ip" -p tcp -m multiport --dports 25,465,587 -j REJECT 2>/dev/null || \
      iptables -I DOCKER_ABUSE_BLOCK 1 -s "$container_ip" -p tcp -m multiport --dports 25,465,587 -j REJECT
else
    echo "container IP not found: $container_name" >&2
fi
```

容器重建后 IP 可能变化，需要重新执行查询和规则写入。需要稳定隔离时，建议为容器创建独立 bridge 网络，并在编排脚本中固定规则更新流程。

## 创建更隔离的网络

对不需要互相访问的容器，可以创建禁用容器互通的 bridge 网络。

```shell
docker network create \
  --driver bridge \
  --opt com.docker.network.bridge.enable_icc=false \
  isolated_bridge
```

运行容器时显式指定网络：

```shell
docker run -d --name example --network isolated_bridge image:tag
```

如果容器完全不需要联网，可以直接使用：

```shell
docker run -d --name example --network none image:tag
```

## 启动容器时降低滥用面

运行不可信镜像时，建议尽量减少权限和资源。

```shell
docker run -d --name example \
  --cpus 1 \
  --memory 512m \
  --pids-limit 128 \
  --read-only \
  --cap-drop ALL \
  --security-opt no-new-privileges \
  image:tag
```

除非明确知道后果，不要给普通容器挂载 `/var/run/docker.sock`，也不要使用 `--privileged`。

## 保存规则

Debian/Ubuntu 可使用 `iptables-persistent` 保存规则。

```shell
apt update
apt install -y iptables-persistent
iptables-save > /etc/iptables/rules.v4
```

## 解除屏蔽

删除统一入口并清理自定义链：

```shell
iptables -D DOCKER-USER -j DOCKER_ABUSE_BLOCK 2>/dev/null || true
iptables -F DOCKER_ABUSE_BLOCK 2>/dev/null || true
iptables -X DOCKER_ABUSE_BLOCK 2>/dev/null || true
```
