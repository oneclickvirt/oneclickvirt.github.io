---
outline: deep
---

# Introduction

There are two deployment methods.

## Setting Up Standalone

- Generate a single Docker container
- Can bind an independent IPv6 address, but requires Docker to be installed with this project's installer and a host IPv6 subnet of at least /112
- Support for x86_64 and ARM architecture servers

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
| Whether to bind a separate IPv6 address| N     |
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
Container_Name SSH_Port Root_Password Number_of_Cores Memory Start_of_Public_Port End_of_Public_Port
```

The container IPv6 address can only be checked from inside the container; it is not exposed in the default Docker output here.

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
curl -sSL https://raw.githubusercontent.com/oneclickvirt/docker/main/scripts/config.sh -o /usr/local/bin/config.sh && chmod +x /usr/local/bin/config.sh
curl -sSL https://raw.githubusercontent.com/oneclickvirt/docker/main/scripts/ssh_bash.sh -o /usr/local/bin/ssh_bash.sh && chmod +x /usr/local/bin/ssh_bash.sh
curl -sSL https://raw.githubusercontent.com/oneclickvirt/docker/main/scripts/ssh_sh.sh -o /usr/local/bin/ssh_sh.sh && chmod +x /usr/local/bin/ssh_sh.sh
curl -sSL https://raw.githubusercontent.com/oneclickvirt/docker/main/scripts/onedocker.sh -o /root/onedocker.sh && chmod +x /root/onedocker.sh
curl -sSL https://raw.githubusercontent.com/oneclickvirt/docker/main/scripts/create_docker.sh -o /root/create_docker.sh && chmod +x /root/create_docker.sh
```

## Start all containers after host reboot

By default, containers are not configured for auto-restart after host reboot. Run the following command to start all stopped containers.

```
docker start $(docker ps -aq)
```

## Start SSH service for all containers after host reboot

Because these containers do not run a full init system by default, SSH may not auto-start. Use the following command to start SSH in all running containers.

```
container_ids=$(docker ps -q)
for container_id in $container_ids
do
    docker exec -it $container_id bash -c "service ssh start"
    docker exec -it $container_id bash -c "service sshd restart"
    docker exec -it $container_id sh -c "service ssh start"
    docker exec -it $container_id sh -c "/usr/sbin/sshd"
done
```
