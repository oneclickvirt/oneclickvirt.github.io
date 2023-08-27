---
outline: deep
---

# Introduction

There are two methods of building

## Setting Up Standalone

- Generate only one docker
- Can be configured to bind a separate IPV6 address, but requires a docker previously installed using the environment installation command of this set of scripts, and requires the host to be bound to at least the /64 IPV6 subnet

### Download the Script

Command:

```shell
curl -L https://raw.githubusercontent.com/spiritLHLS/docker/main/scripts/onedocker.sh -o onedocker.sh && chmod +x onedocker.sh
```

### Example

Run

```
./onedocker.sh name cpu memory password sshport startport endport system independent_ipv6
```

Currently, the system only supports selecting Alpine or Debian, with Debian being the default choice.

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
./onedocker.sh test 1 512 123456 25000 34975 35000 debian N
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

Command:

```shell
curl -L https://raw.githubusercontent.com/spiritLHLS/docker/main/scripts/create_docker.sh -o create_docker.sh && chmod +x create_docker.sh && bash create_docker.sh
```

## Querying information on batch openings

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
docker ps -aq | grep -v 'ndpresponder' | xargs -r docker rm -f
docker images -aq | grep -v 'ndpresponder' | xargs -r docker rmi
```