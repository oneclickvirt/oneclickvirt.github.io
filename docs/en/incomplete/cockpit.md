---
outline: deep
---

## Repo

[![hits](https://hits.spiritlhl.net/cockpit.svg?action=hit&title=hits&title_bg=%23555555&count_bg=%233aebee&edge_flat=false)](https://hits.spiritlhl.net)

https://github.com/oneclickvirt/cockpit

## Installation

Supported Systems: Debian，Ubuntu，Almalinux，Rockylinux，Fedora，Centos，Arch

```shell
curl -L https://raw.githubusercontent.com/oneclickvirt/cockpit/refs/heads/main/scripts/install.sh -o install.sh && chmod +x install.sh
```

Install only with Podman containers

```shell
bash install.sh --ct
```

Install only with virtual machines

```shell
bash install.sh --vm
```

Panel Mount Only

```shell
bash install.sh
```

Both container and VM dependencies are installed

```shell
bash install.sh --all
```

## Disadvantages

The network is self-configuring, the mirrors are self-importing, the ports are self-mapped, and there is just one more GUI interface than the command line.

## Thanks

https://cockpit-project.org/running.html