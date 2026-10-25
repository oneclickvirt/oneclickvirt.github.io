---
outline: deep
---

# Introduction

There are two deployment methods.

## Setting Up Standalone

- Generate a single Docker container
- Can enable container IPv6 networking after Docker is installed with this project's installer
- Support for x86_64 and ARM architecture servers

:::tip IPv6 network mode
The installer uses an isolated ULA bridge. With a usable locally assigned public prefix (including a suitable SLAAC `/64`), it attaches routed public `/128` addresses after container startup; the uplink must support the required routing/NDP. A lone public `/128` uses NAT66 for outbound IPv6 without an independent public guest address. Ethernet uplinks require a healthy compatible NDP responder; non-Ethernet tunnels do not.
:::

### Download the Script

Command:

```shell
curl -L https://raw.githubusercontent.com/oneclickvirt/docker/main/scripts/onedocker.sh -o onedocker.sh && chmod +x onedocker.sh
```

### Example

Supported parameters are as follows:

```
./onedocker.sh name cpu memory password sshport startport endport <independent_ipv6> <system> <disk>
```

Currently, the system only supports selecting:

- alpine
- debian
- ubuntu
- almalinux
- rockylinux
- openeuler

with Debian being the default choice.

The script uses the password supplied in its arguments. When running the image directly with `docker run`, set `ROOT_PASSWORD` or mount a password file and set `ROOT_PASSWORD_FILE` to its container path. Images have no shared default password; without either setting, the root account stays locked. The initial password is applied only once, so password changes inside the container survive restarts.

Version-bearing aliases such as `debian11`, `debian/11`, `ubuntu20`, `almalinux9`, `rockylinux9` and `openeuler22.03` are accepted. They are normalized to the currently maintained image family; they do not pin an arbitrary historical release.

Disk size can be set only if you previously enabled disk-limit support during Docker installation. If omitted, disk size is unlimited by default.

```shell
./onedocker.sh test 1 512 123456 25000 34975 35000 N debian 5
```

The following is the information for the created example container:

| Attribute               | Value          |
|------------------------|----------------|
| Container Name         | test           |
| Username for SSH Login | root           |
| Password for SSH Login | 123456         |
| Number of CPU Cores    | 1              |
| Memory Size            | 512MB          |
| SSH Port               | 25000          |
| Port Range for Internal and External Mapping | 34975 to 35000   |
| Operating System       | debian         |
| Request IPv6 networking | N     |
| Disk Size              | 5G             |

### Related operations

Deleting the test container

```shell
docker rm -f test
rm -rf test
ls
```

Accessing the test container

```shell
docker exec -it test /bin/bash
```

To exit the container, simply execute ```exit```.

Query Information

```shell
cat Container_Name(change me)
```

The output format is

```
Container_Name SSH_Port Root_Password Number_of_Cores Memory Start_of_Public_Port End_of_Public_Port Disk_Size
```

The container IPv6 address can only be checked from inside the container; it is not exposed in the default Docker output here.

## Run the image directly

To run without the creation script, the following Debian example maps only the SSH port. Run it on the host:

```bash
install -d -m 700 /opt/oneclickvirt/docker-debian
(umask 077; openssl rand -base64 24 > /opt/oneclickvirt/docker-debian/root-password)
docker pull ghcr.io/oneclickvirt/docker:debian
docker run -d --name test-direct --restart unless-stopped \
  --cpus 1 --memory 512m \
  -p 25001:22 \
  --mount type=bind,src=/opt/oneclickvirt/docker-debian/root-password,dst=/run/secrets/root-password,readonly \
  -e ROOT_PASSWORD_FILE=/run/secrets/root-password \
  ghcr.io/oneclickvirt/docker:debian
```

Use ```cat /opt/oneclickvirt/docker-debian/root-password``` to view the initial password, then connect with ```ssh -p 25001 root@HOST_IP```.

Set either ```ROOT_PASSWORD``` or ```ROOT_PASSWORD_FILE```. The password file must contain nonempty single-line text without a colon. It is read only during initial password setup. To change the password inside the container, run:

```bash
docker exec -it test-direct passwd root
```

The changed password survives container restarts. Each container generates its own SSH host keys on first startup and retains them across restarts. Use the creation script above when you need a forwarded port range or independent IPv6 configuration.

## Batch Deployment

- Run inheritance configuration generation multiple times in bulk.
- When generating multiple instances, it is recommended to execute within a `screen` session to avoid SSH connection interruptions.
- Support for x86_64 and ARM architecture servers

Command:

```shell
curl -L https://raw.githubusercontent.com/oneclickvirt/docker/main/scripts/create_docker.sh -o create_docker.sh && chmod +x create_docker.sh && bash create_docker.sh
```

### Querying information on batch openings

```shell
cat dclog
```

The output format is

```
Container_Name SSH_Port Root_Password Number_of_Cores Memory Start_of_Public_Port End_of_Public_Port Disk_Size
```

Each line corresponds to one container. The IPv6 address can only be checked from inside that container.

## Uninstall all Docker containers and images

The following cleanup command keeps `ndpresponder` to avoid breaking IPv6 configuration.

```shell
docker ps -a --format '{{.Names}}' | grep -vE '^ndpresponder' | xargs -r docker rm -f
docker images --format '{{.Repository}}:{{.Tag}} {{.ID}}' | grep -v 'ndpresponder' | awk '{print $2}' | xargs -r docker rmi
rm -rf dclog test
ls
```

## Update all commands related to the above one-click scripts

Delete the original configuration script

```bash
rm -rf /usr/local/bin/ssh_sh.sh
rm -rf /usr/local/bin/ssh_bash.sh
rm -rf /usr/local/bin/check-dns.sh
rm -rf /root/ssh_sh.sh
rm -rf /root/ssh_bash.sh
rm -rf /root/onedocker.sh
rm -rf /root/create_docker.sh
```

Download back the relevant configuration scripts for the new version

```bash
curl -sSL https://raw.githubusercontent.com/oneclickvirt/docker/main/extra_scripts/check-dns.sh -o /usr/local/bin/check-dns.sh && chmod +x /usr/local/bin/check-dns.sh
curl -sSL https://raw.githubusercontent.com/oneclickvirt/docker/main/scripts/ssh_bash.sh -o /usr/local/bin/ssh_bash.sh && chmod +x /usr/local/bin/ssh_bash.sh
curl -sSL https://raw.githubusercontent.com/oneclickvirt/docker/main/scripts/ssh_sh.sh -o /usr/local/bin/ssh_sh.sh && chmod +x /usr/local/bin/ssh_sh.sh
curl -sSL https://raw.githubusercontent.com/oneclickvirt/docker/main/scripts/onedocker.sh -o /root/onedocker.sh && chmod +x /root/onedocker.sh
curl -sSL https://raw.githubusercontent.com/oneclickvirt/docker/main/scripts/create_docker.sh -o /root/create_docker.sh && chmod +x /root/create_docker.sh
```

## Start all containers after host reboot

New containers use `--restart unless-stopped`. When Docker starts, it restores containers that were not manually stopped. To start older or stopped containers manually:

```bash
docker ps -aq -f status=exited | xargs -r docker start
```

## Start SSH service for all containers after host reboot

The project's image entrypoint starts SSH when the container starts. If an older image or Docker Hub fallback image does not start SSH automatically, inspect the target container logs, then enter it and start the service supported by that system:

```bash
docker logs test
docker exec -it test sh
# Run inside the container:
service ssh start || service sshd start || /usr/sbin/sshd
```
