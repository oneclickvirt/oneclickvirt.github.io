---
outline: deep
---

# Introduction

Two deployment methods

## Standalone Deployment

Download the script

International

```shell
curl -L https://raw.githubusercontent.com/spiritLHLS/docker/main/scripts/onedocker.sh -o onedocker.sh && chmod +x onedocker.sh
```

Domestic (China)

```shell
curl -L https://ghproxy.com/https://raw.githubusercontent.com/spiritLHLS/docker/main/scripts/onedocker.sh -o onedocker.sh && chmod +x onedocker.sh
```

Run

```
./onedocker.sh name cpu memory password sshport startport endport system
```

Currently, only the system choices "alpine" and "debian" are supported. The default is debian.

### Example

Below is the information for the created sample container:

| Attribute               | Value          |
|------------------------|----------------|
| Container Name         | test           |
| SSH Login Username     | root           |
| SSH Login Password     | 123456         |
| Number of CPU Cores    | 1              |
| Memory Size            | 512MB          |
| SSH Port               | 25000          |
| Port Range for Mapping | 34975 to 35000 |
| System                 | debian         |

```shell
./onedocker.sh test 1 512 123456 25000 34975 35000 debian
```

Delete the example

```shell
docker rm -f test
rm -rf test
ls
```

Access the example

```shell
docker exec -it test /bin/bash
```

To exit the container, execute ```exit```.

### Query Information

```shell
cat container_name
```

Output format

```
Container Name SSH Port Root Password Cores Memory External Port Start External Port End
```

## Batch Deployment

- Run multiple times to inherit configurations for generation
- To generate multiple containers, it is recommended to execute within a "screen" session to avoid SSH interruptions

International

```shell
curl -L https://raw.githubusercontent.com/spiritLHLS/docker/main/scripts/create_docker.sh -o create_docker.sh && chmod +x create_docker.sh && bash create_docker.sh
```

Domestic (China)

```shell
curl -L https://ghproxy.com/https://raw.githubusercontent.com/spiritLHLS/docker/main/scripts/onedocker.sh -o onedocker.sh && chmod +x onedocker.sh
```

## Query Information of Batch Deployment

```shell
cat dclog
```

Output format

```
Container Name SSH Port Root Password Cores Memory External Port Start External Port End
```

One line corresponds to the information of one container.

## Uninstall All Docker Containers and Images

```shell
docker rm -f $(docker ps -aq); docker rmi $(docker images -aq)
rm -rf dclog
ls
```