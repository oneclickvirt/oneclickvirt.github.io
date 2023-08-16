---
outline: deep
---

# Introduction

There are two methods of building

## Setting Up Standalone

Download the Script

Command:

```shell
curl -L https://raw.githubusercontent.com/spiritLHLS/docker/main/scripts/onedocker.sh -o onedocker.sh && chmod +x onedocker.sh
```

Run

```
./onedocker.sh name cpu memory password sshport startport endport system
```

Currently, the system only supports selecting Alpine or Debian, with Debian being the default choice.

### Example

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

```shell
./onedocker.sh test 1 512 123456 25000 34975 35000 debian
```

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

### Inquiry Information

```shell
cat Container_Name(change me)
```

The output format is

```
Container_Name SSH_Port Root_Password Number_of_Cores Memory Start_of_Public_Port End_of_Public_Port
```

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

One line corresponds to information about a container.

## Uninstall all Docker containers and images

```shell
docker rm -f $(docker ps -aq); docker rmi $(docker images -aq)
rm -rf dclog
ls
```