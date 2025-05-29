---
outline: deep
---

# Introduction

There are two methods of building

## Setting Up Standalone

- Generate only one docker
- Can be configured to bind a separate IPV6 address, but requires a docker previously installed using the environment installation command of this set of scripts, and requires the host to be bound to at least the /112 IPV6 subnet
- Support for x86_64 and ARM architecture servers

### Download the Script

Command:

```shell
curl -L https://raw.githubusercontent.com/oneclickvirt/docker/main/scripts/onedocker.sh -o onedocker.sh && chmod +x onedocker.sh
```

### Example

Run

```
./onedocker.sh name cpu memory password sshport startport endport <independent_ipv6> <system>
```

Currently, the system only supports selecting:

- alpine
- debian
- ubuntu
- almalinux

with Debian being the default choice.

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
| Whether to bind a separate IPV6 address| N     |

```shell
./onedocker.sh test 1 512 123456 25000 34975 35000 N debian
```

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

Inquiry Information

```shell
cat Container_Name(change me)
```

The output format is

```
Container_Name SSH_Port Root_Password Number_of_Cores Memory Start_of_Public_Port End_of_Public_Port
```

The docker's ipv6 address can only be looked up within the container itself, it doesn't exist in the docker's configuration

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
Container_Name SSH_Port Root_Password Number_of_Cores Memory Start_of_Public_Port End_of_Public_Port
```

One line corresponds to information about a container, the docker's ipv6 address can only be looked up within the container itself, it doesn't exist in the docker's configuration.

## Uninstall all Docker containers and images

The following command offload ignores ndpresponder to prevent IPV6 configuration failure

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
wget https://raw.githubusercontent.com/oneclickvirt/docker/main/extra_scripts/check-dns.sh -O /usr/local/bin/check-dns.sh && chmod +x /usr/local/bin/check-dns.sh
wget https://raw.githubusercontent.com/oneclickvirt/docker/main/scripts/config.sh -O /usr/local/bin/config.sh && chmod +x /usr/local/bin/config.sh
wget https://raw.githubusercontent.com/oneclickvirt/docker/main/scripts/ssh_bash.sh -O /usr/local/bin/ssh_bash.sh && chmod +x /usr/local/bin/ssh_bash.sh
wget https://raw.githubusercontent.com/oneclickvirt/docker/main/scripts/ssh_sh.sh -O /usr/local/bin/ssh_sh.sh && chmod +x /usr/local/bin/ssh_sh.sh
wget https://raw.githubusercontent.com/oneclickvirt/docker/main/scripts/onedocker.sh -O /root/onedocker.sh && chmod +x /root/onedocker.sh
wget https://raw.githubusercontent.com/oneclickvirt/docker/main/scripts/create_docker.sh -O /root/create_docker.sh && chmod +x /root/create_docker.sh
```

## Start all containers after host reboot

The default containers are not set to restart themselves after stopping, you need to execute the following command to start all stopped containers.

```
docker start $(docker ps -aq)
```

## Start SSH service for all containers after host reboot

Since the container itself does not have a daemon, the SSH service cannot start itself, and you need to execute the following command to start the SSH process for all containers.

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
