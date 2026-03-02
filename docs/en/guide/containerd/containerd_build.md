---
outline: deep
---

# Preface

Two methods for provisioning containers.

## Single Container Provisioning

- Creates a single containerd container, automatically detects international or China mainland server
- Can configure binding of an independent IPv6 address (requires host with public IPv6 and containerd-ipv6 network configured during installation)
- Supports x86_64 and ARM64 architecture servers

### Download Script

International

```shell
wget -q https://raw.githubusercontent.com/oneclickvirt/containerd/main/scripts/onecontainerd.sh
chmod +x onecontainerd.sh
```

China Mainland

```shell
wget -q https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/containerd/main/scripts/onecontainerd.sh
chmod +x onecontainerd.sh
```

### Example

Supported variables for running:

```bash
./onecontainerd.sh <name> <cpu> <memory_mb> <password> <sshport> <startport> <endport> [independent_ipv6:y/n] [system] [disk_gb]
```

Currently supported `system` values:

- debian
- ubuntu
- alpine
- almalinux
- rockylinux
- openeuler

Default is debian if not specified.

```shell
./onecontainerd.sh ct1 1 512 MyPassword 25000 34975 35000 n debian 0
```

Example container information:

| Attribute | Value |
|-----------|-------|
| Container name | ct1 |
| SSH username | root |
| SSH password | MyPassword |
| CPU cores | 1 |
| Memory | 512MB |
| SSH port | 25000 |
| External/internal port range | 34975 to 35000 |
| System | debian |
| Independent IPv6 | N |
| Disk size | Unlimited |

### Related Operations

List all containers

```shell
nerdctl ps -a
```

Enter container

```shell
nerdctl exec -it ct1 bash
```

Enter Alpine container

```shell
nerdctl exec -it ct1 sh
```

Type `exit` to leave the container.

Delete container

```shell
nerdctl rm -f ct1
```

View container logs

```shell
nerdctl logs ct1
```

## Batch Container Provisioning

- Multiple runs inherit configuration and generate sequentially
- Auto-increments container name (ct1, ct2, ...), SSH port, and public ports
- Container information recorded to `ctlog` file
- Recommended to run in screen to avoid SSH disconnection

### Run

International

```shell
wget -q https://raw.githubusercontent.com/oneclickvirt/containerd/main/scripts/create_containerd.sh
chmod +x create_containerd.sh
./create_containerd.sh
```

China Mainland

```shell
wget -q https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/containerd/main/scripts/create_containerd.sh
chmod +x create_containerd.sh
./create_containerd.sh
```

### Query Batch Container Information

```shell
cat ctlog
```

Output format:

```
container_name ssh_port root_password cpu_cores memory_mb start_port end_port disk_gb
```

One line per container.

## Remove All Containers and Images

```shell
nerdctl ps -aq | xargs -r nerdctl rm -f
nerdctl images -q | xargs -r nerdctl rmi -f
rm -rf ctlog
```

## Restart All Containers After Host Reboot

By default, containers are not configured to auto-restart. Run the following command to start all stopped containers:

```shell
nerdctl ps -aq -f status=exited | xargs -r nerdctl start
```
