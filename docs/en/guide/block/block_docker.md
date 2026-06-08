---
outline: deep
---

# Blocking Abuse on Docker

Docker creates its own NAT and forwarding rules. Do not edit the `DOCKER` chain directly. Put host-side container egress restrictions in the `DOCKER-USER` chain instead; Docker evaluates this chain before its automatically generated rules, so it is easier to keep the policy stable across Docker restarts.

:::warning
The rules below are intended for normal Docker bridge/NAT deployments. Keep an existing SSH session open and make sure provider console access is available before changing firewall rules in production.
:::

## Create a Shared Blocking Chain

```shell
iptables -N DOCKER_ABUSE_BLOCK 2>/dev/null || true
iptables -C DOCKER-USER -j DOCKER_ABUSE_BLOCK 2>/dev/null || iptables -I DOCKER-USER 1 -j DOCKER_ABUSE_BLOCK
iptables -C DOCKER_ABUSE_BLOCK -j RETURN 2>/dev/null || iptables -A DOCKER_ABUSE_BLOCK -j RETURN
```

`DOCKER_ABUSE_BLOCK` keeps the custom policy in one place. The final `RETURN` sends normal unmatched traffic back to Docker's later rules.

## Block High-Risk Ports

If you do not provide mail service from containers, block common SMTP ports first to reduce spam abuse risk.

```shell
iptables -C DOCKER_ABUSE_BLOCK -p tcp -m multiport --dports 25,465,587 -j REJECT 2>/dev/null || \
  iptables -I DOCKER_ABUSE_BLOCK 1 -p tcp -m multiport --dports 25,465,587 -j REJECT
```

You can also add IRC, proxy, or other high-risk ports when needed:

```shell
iptables -C DOCKER_ABUSE_BLOCK -p tcp -m multiport --dports 6660:6669,1080,3128,8080 -j REJECT 2>/dev/null || \
  iptables -I DOCKER_ABUSE_BLOCK 1 -p tcp -m multiport --dports 6660:6669,1080,3128,8080 -j REJECT
```

## Block Mining, BT, and Speed-Test Signatures

The following rules reuse host `iptables` string matching. Matching container egress traffic is dropped when common abuse signatures are found.

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

String matching is not a complete security strategy, but it is useful for low-cost blocking of common abuse traffic.

If Docker IPv6 is enabled, add matching `ip6tables` or equivalent `nftables` rules for container IPv6 egress traffic.

## Restrict a Single Container

If only one container needs restrictions, query its container IP first and then add a source-specific rule.

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

The container IP can change after recreation, so query and write the rule again after rebuilding the container. For stable isolation, create a dedicated bridge network and update rules in the same orchestration flow.

## Create a More Isolated Network

For containers that do not need to talk to each other, create a bridge network with inter-container communication disabled.

```shell
docker network create \
  --driver bridge \
  --opt com.docker.network.bridge.enable_icc=false \
  isolated_bridge
```

Run the container on that network explicitly:

```shell
docker run -d --name example --network isolated_bridge image:tag
```

If the container does not need network access at all, use:

```shell
docker run -d --name example --network none image:tag
```

## Reduce the Abuse Surface at Runtime

For untrusted images, reduce privileges and resources as much as possible.

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

Do not mount `/var/run/docker.sock` or use `--privileged` for normal containers unless you fully understand the impact.

## Persist Rules

On Debian/Ubuntu, use `iptables-persistent` to persist the rules.

```shell
apt update
apt install -y iptables-persistent
iptables-save > /etc/iptables/rules.v4
```

## Remove the Blocking Rules

Remove the shared entry and clean up the custom chain:

```shell
iptables -D DOCKER-USER -j DOCKER_ABUSE_BLOCK 2>/dev/null || true
iptables -F DOCKER_ABUSE_BLOCK 2>/dev/null || true
iptables -X DOCKER_ABUSE_BLOCK 2>/dev/null || true
```
