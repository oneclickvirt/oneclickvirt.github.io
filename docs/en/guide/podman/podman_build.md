---
outline: deep
---

# Preface

Two methods for provisioning containers.

## Single Container Provisioning

- Creates a single Podman container, automatically detects international or China mainland server
- Can configure binding of an independent IPv6 address (requires host with public IPv6 and podman-ipv6 network configured during installation)
- Supports x86_64 and ARM64 architecture servers

### Download Script

International

```shell
curl -sSLO https://raw.githubusercontent.com/oneclickvirt/podman/main/scripts/onepodman.sh
chmod +x onepodman.sh
```

China Mainland

```shell
curl -sSLO https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/podman/main/scripts/onepodman.sh
chmod +x onepodman.sh
```

### Example

Supported variables for running:

```bash
./onepodman.sh <name> <cpu> <memory_mb> <password> <sshport> <startport> <endport> [independent_ipv6:y/n] [system] [disk_gb]
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
./onepodman.sh ct1 1 512 MyPassword 25000 34975 35000 n debian 0
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
podman ps -a
```

Enter container

```shell
podman exec -it ct1 bash
```

Enter Alpine container

```shell
podman exec -it ct1 sh
```

Type `exit` to leave the container.

Delete container

```shell
podman rm -f ct1
```

View container logs

```shell
podman logs ct1
```

## Batch Container Provisioning

- Multiple runs inherit configuration and generate sequentially
- Auto-increments container name (ct1, ct2, ...), SSH port, and public ports
- Container information recorded to `ctlog` file
- Recommended to run in screen to avoid SSH disconnection

### Run

International

```shell
curl -sSLO https://raw.githubusercontent.com/oneclickvirt/podman/main/scripts/create_podman.sh
chmod +x create_podman.sh
./create_podman.sh
```

China Mainland

```shell
curl -sSLO https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/podman/main/scripts/create_podman.sh
chmod +x create_podman.sh
./create_podman.sh
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
podman ps -aq | xargs -r podman rm -f
podman images -aq | xargs -r podman rmi -f
podman volume prune -f
podman system prune -af
rm -rf ctlog
```

## Restart All Containers After Host Reboot

Podman supports systemd integration. Generate auto-start service for a container:

```shell
# Generate systemd service for a specific container
podman generate systemd --name ct1 > /etc/systemd/system/container-ct1.service
systemctl enable container-ct1
```

Or manually start all stopped containers:

```shell
podman ps -aq -f status=exited | xargs -r podman start
```
