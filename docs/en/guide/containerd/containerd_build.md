---
outline: deep
---

# Preface

## Single Container Provisioning

### Download Script

```bash
wget -q https://raw.githubusercontent.com/oneclickvirt/containerd/main/scripts/onecontainerd.sh
chmod +x onecontainerd.sh
```

### Usage

```text
./onecontainerd.sh <name> <cpu> <memory_mb> <password> <sshport> <startport> <endport> [ipv6:y/n] [system] [disk_gb]
```

Before creation, the script validates the container name, port range and occupied host ports. An empty password string generates a high-entropy random root password and saves it in the container record.

| Argument | Description | Default |
| --- | --- | --- |
| name | Container name | test |
| cpu | CPU limit, including fractional values such as 0.5 | 1 |
| memory_mb | Memory limit in MB | 512 |
| password | Root password; omitted or empty values generate one | generated |
| sshport | Host port forwarded to container port 22 | 25000 |
| startport | First additional public port | 34975 |
| endport | Last additional public port | 35000 |
| ipv6 | Request independent IPv6, `y` or `n` | n |
| system | Maintained image family or supported version alias | debian |
| disk_gb | Disk limit in GB; 0 disables the limit | 0 |

Supported image families are `ubuntu`, `debian`, `alpine`, `almalinux`, `rockylinux` and `openeuler`.

| Actual image | Accepted examples |
| --- | --- |
| `ubuntu` | `ubuntu22`, `ubuntu22.04`, `ubuntu/22.04` |
| `debian` | `debian12`, `debian/12` |
| `alpine` | `alpine/latest` |
| `almalinux` | `almalinux9`, `alma9` |
| `rockylinux` | `rockylinux9`, `rocky9` |
| `openeuler` | `openeuler22.03`, `openeuler/22.03` |

Unsupported versions such as `debian11` and `centos7` have no matching project image. The script returns an error and lists valid values instead of silently selecting a different system or requesting a nonexistent asset.

Image source variables:

| Variable | Description | Default |
| --- | --- | --- |
| CONTAINERD_IMAGE_REGISTRY | Optional fallback registry; after a Releases failure, try `<registry>:<system>` and `<registry>:<system>-<arch>` | unset |
| CONTAINERD_IMAGE_RELEASE_BASE | Offline archive base URL | https://github.com/oneclickvirt/containerd/releases/download |

### Example

```bash
./onecontainerd.sh ct1 1 512 "" 25000 34975 35000 n debian 0
```

### Related Operations

```bash
nerdctl ps -a
nerdctl exec -it <name> bash
nerdctl exec -it <name> sh   # Alpine
nerdctl logs <name>
nerdctl rm -f <name>
nerdctl images
nerdctl rmi <image>
```

Management helpers, run from a checkout of the repository:

```bash
bash scripts/containerd_manage.sh stats [container]
bash scripts/containerd_manage.sh snapshot <container> [image]
bash scripts/containerd_manage.sh backup <container> [output.tar]
bash scripts/containerd_manage.sh version-check [system]
```

## Batch Container Provisioning

### Run

```bash
wget -q https://raw.githubusercontent.com/oneclickvirt/containerd/main/scripts/create_containerd.sh
chmod +x create_containerd.sh
./create_containerd.sh
```

The interactive script increments container names (`ct1`, `ct2`, ...), SSH ports and public ports, and records the results in `ctlog`. Each new container receives a random 32-character hexadecimal password.

Command-line configuration:

```bash
./create_containerd.sh --noninteractive --count 3 --memory 512 --cpu 1 --disk 0 --system debian --ipv6 n
```

Unattended configuration through environment variables:

```bash
export noninteractive=true
export CONTAINERD_CREATE_COUNT=1
export CONTAINERD_CONTAINER_MEMORY=512
export CONTAINERD_CONTAINER_CPU=1
export CONTAINERD_CONTAINER_DISK=0
export CONTAINERD_CONTAINER_SYSTEM=debian
export CONTAINERD_CONTAINER_IPV6=n
./create_containerd.sh
```

### Query Batch Container Information

Run `cat ctlog` in the creation working directory. Each line is:

```text
name SSH-port root-password CPU memory-MB first-port last-port disk-GB
```

Records contain passwords; keep them private.

## Remove all containers and images

The following commands delete all containers and images visible to this runtime. Back up data and confirm the scope first.

```bash
nerdctl ps -aq | xargs -r nerdctl rm -f
nerdctl images -q | xargs -r nerdctl rmi -f
```

## Restart All Containers After Host Reboot

New containers use nerdctl `--restart always`; keep the containerd service enabled. To recover older or stopped containers manually:

```bash
systemctl status containerd
nerdctl ps -aq -f status=exited | xargs -r nerdctl start
```

See [networking, images and troubleshooting](containerd_qa.md) for network modes, image sources and records.
