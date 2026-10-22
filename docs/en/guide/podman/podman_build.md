---
outline: deep
---

# Create and manage Podman instances

## Quick start

1. Log in to the host as root.
2. Run `bash <(wget -qO- https://raw.githubusercontent.com/oneclickvirt/podman/main/podmaninstall.sh)`.
3. Download `onepodman.sh` as shown in the creation guide, then run `./onepodman.sh ct1 1 512 MyPassword 25000 34975 35000 n debian 0`.
4. Connect with `ssh root@<host-IP> -p 25000`.
5. Read `ctlog` or run `podman ps -a` to inspect the result.

## Create one container

```bash
wget -q https://raw.githubusercontent.com/oneclickvirt/podman/main/scripts/onepodman.sh
chmod +x onepodman.sh

# Pass an empty password string to generate one while supplying later arguments.
# ./onepodman.sh <name> <cpu> <memory_mb> <password> <sshport> <startport> <endport> [ipv6:y/n] [system] [disk_gb]
./onepodman.sh ct1 1 512 MyPassword 25000 34975 35000 n debian 0
```

| Argument | Description | Default |
| --- | --- | --- |
| name | Container name | test |
| cpu | CPU limit; fractional values such as 0.5 are supported | 1 |
| memory_mb | Memory limit in MB | 512 |
| password | Root password; omitted or empty values generate a password | generated |
| sshport | Host port forwarded to container port 22 | 25000 |
| startport | First additional public port | 34975 |
| endport | Last additional public port | 35000 |
| ipv6 | Request independent IPv6, `y` or `n` | n |
| system | Guest image family | debian |
| disk_gb | btrfs qgroup disk limit in GB; 0 disables the limit | 0 |

The SSH host port must not overlap the additional public port range.

With btrfs and `disk_gb` greater than zero, the script creates the container, applies a qgroup limit to its rootfs, and then starts it. Podman's `--storage-opt` configures global storage; this project therefore does not pass `size=...` to `podman run` as a per-container disk limit.

Supported `system` values are `ubuntu`, `debian`, `alpine`, `almalinux`, `rockylinux` and `openeuler`. Maintained version aliases are normalized to the actual image tag:

- `ubuntu22`, `ubuntu/22.04` → `ubuntu`
- `debian12`, `debian/12` → `debian`
- `alma9`, `almalinux/9` → `almalinux`
- `rocky9`, `rockylinux/9` → `rockylinux`
- `openeuler22.03`, `openeuler/22.03` → `openeuler`

Unsupported versions do not silently fall back to another release.

## Batch creation

```bash
wget -q https://raw.githubusercontent.com/oneclickvirt/podman/main/scripts/create_podman.sh
chmod +x create_podman.sh
./create_podman.sh
```

The interactive script increments container names (`ct1`, `ct2`, ...), SSH ports and public port ranges, and saves connection information in `ctlog`.

Unattended example:

```bash
export noninteractive=true
export PODMAN_CREATE_COUNT=3
export PODMAN_MEMORY_MB=512
export PODMAN_CPU=1
export PODMAN_SYSTEM=debian
export PODMAN_IPV6=n
./create_podman.sh
```

| Variable | Description | Default |
| --- | --- | --- |
| PODMAN_CREATE_COUNT | Number of new containers; PODMAN_CREATE_NUMS is also accepted | 1 |
| PODMAN_MEMORY_MB | Memory per container in MB | 512 |
| PODMAN_CPU | CPU limit per container | 1 |
| PODMAN_DISK_GB | Disk limit in GB, requiring btrfs qgroups | 0 |
| PODMAN_SYSTEM | Guest system; maintained version aliases are accepted | debian |
| PODMAN_IPV6 | Request independent IPv6 | n |
| PODMAN_CONTAINER_PREFIX | Container name prefix | ct |
| PODMAN_CONTAINER_START_NUM | First container number | continued from ctlog |
| PODMAN_START_SSH_PORT | First SSH host port | continued from ctlog |
| PODMAN_PUBLIC_PORT_START | First additional public port | continued from ctlog |

Additional variables:

| Variable | Description | Default |
| --- | --- | --- |
| FORCE_UNINSTALL | Legacy switch to skip uninstall confirmation | false |
| ROOT_PASSWORD | Root password consumed by the container entrypoint | passed by the creation script |
| IPV6_ENABLED | Internal container IPv6 mode marker | false |
| PODMAN_SKIP_RESOURCE_CHECK | Skip repeated resource scans during batch creation | false |
| PODMAN_BATCH_MODE | Keep a temporary record for create_podman.sh to consume | false |
| PODMAN_ROOTLESS | Explicitly allow non-root execution of onepodman.sh/create_podman.sh | false |
| PODMAN_WORKDIR | ctlog working directory during rootless batch creation | current directory |
| PODMAN_SCRIPT_DIR | Cache directory for rootless batch scripts | `$HOME/.local/share/oneclickvirt-podman/scripts` |
| PODMAN_RELEASE_BASE_URL | Offline archive base, using `<base>/<system>/<tar.gz>` | GitHub Releases |
| PODMAN_GHCR_IMAGE | GHCR image prefix | ghcr.io/oneclickvirt/podman |
| PODMAN_SCRIPT_BASE_URL | Download base for SSH initialization and onepodman.sh | GitHub raw scripts |
| PODMAN_POD_NAME | Podman pod receiving the container and port mappings | unset |
| PODMAN_POD_JOIN_EXISTING | Join an existing pod; manage shared-network port conflicts yourself | false |

Single-container creation appends a record to `ctlog`. Batch creation removes each temporary per-container record after appending it to `ctlog`, avoiding scattered files containing passwords.

Rootless example:

```bash
export PODMAN_ROOTLESS=true
./onepodman.sh ct1 1 512 "" 25000 34975 35000 n debian 0
```

Pod networking example:

```bash
export PODMAN_POD_NAME=ctpod1
./onepodman.sh ct1 1 512 "" 25000 34975 35000 n debian 0
```

During batch creation, setting PODMAN_POD_NAME without `PODMAN_POD_JOIN_EXISTING=true` derives a separate pod name from each container name, preventing SSH containers from unintentionally sharing one network namespace.

## Inspect and manage containers

```bash
podman ps -a
podman exec -it <name> bash
podman exec -it <name> sh   # Alpine
podman logs <name>
podman rm -f <name>
podman images
podman rmi <image>
```

## Connection records

Run `cat ctlog` in the creation working directory. Each line is:

```text
name SSH-port root-password CPU memory-MB first-port last-port disk-GB
```

Records contain passwords; keep them private.

## Remove all containers and images

The following commands delete all containers and images visible to this runtime. Back up data and confirm the scope first.

```bash
podman ps -aq | xargs -r podman rm -f
podman images -q | xargs -r podman rmi -f
```

Remove unused volumes and state only after confirming they are no longer needed:

```bash
podman volume prune -f
podman system prune -af
rm -f ctlog
```

## Host reboot and automatic startup

New containers use `--restart always`. On systemd hosts the installer enables `podman-restart.service` and creates a fallback unit when the distribution does not provide one. Inspect it with `systemctl status podman-restart.service`.

For an existing container needing a dedicated systemd unit:

```bash
podman generate systemd --name ct1 > /etc/systemd/system/container-ct1.service
systemctl daemon-reload
systemctl enable container-ct1
```

Choose one startup mechanism for a container to avoid duplicate management. To start stopped containers manually:

```bash
podman ps -aq -f status=exited | xargs -r podman start
```

See [networking, images and troubleshooting](podman_qa.md) for network modes, image sources and records.
