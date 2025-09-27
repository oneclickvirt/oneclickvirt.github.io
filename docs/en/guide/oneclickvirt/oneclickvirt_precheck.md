---
outline: deep
---

# Preface

This is a control panel for interfacing with mainstream virtualization technologies, supplementing content not supported by virtualization technologies themselves such as user management, traffic monitoring, NAT port mapping, and custom system images.

Welcome to give the project a ```Star``` for free support --> [https://github.com/oneclickvirt/oneclickvirt](https://github.com/oneclickvirt/oneclickvirt)

## Environment Requirements

Supported architectures: amd64 or arm64

Supported systems: Linux, Windows

Just need public network access, the deployed machine doesn't need to have an independent public IP address, this is just a virtualization control panel, as long as there are ports displaying the frontend.

This control panel has no environment dependency requirements, only a backend started by a daemon process and a corresponding frontend static file folder.

Frontend static files can be deployed through ```nginx``` or ```caddy``` or ```OpenResty```, non-source code deployment requires API path reverse proxy to backend port.

## Platform Features

- Provider Integration: Supports ProxmoxVE, Incus, Docker, LXD four major mainstream virtualization platforms

- Flexible Instance Types: Supports creating virtual machines (VM) and containers (Container), providing unified virtualized resource management experience through abstracted design

- Built-in image seed data, no need to search for corresponding platform images yourself, all platforms come with self-compiled image loading, supporting unified management

- Automatic NAT port mapping: Supports IPv4/IPv6 automatic port mapping, multiple network types:

```
NAT IPv4
NAT IPv4 + Independent IPv6
Independent IPv4
Independent IPv4 + IPv6
Pure IPv6
```

- Flexible port mapping methods: Automatically selects optimal mapping solutions based on different Providers (native, device proxy, iptables, etc.)

- Integrates vnStat for precise network traffic statistics, forces traffic data synchronization during sensitive operations to ensure data accuracy,

- Unified reset of user traffic usage statistics at the beginning of each month, supports user-level, instance-level, Provider-level traffic statistics and restrictions

- Supports invitation code system, implementing non-public registration mechanism, setting different resource quota restrictions based on user levels

- Supports multiple resource restrictions, instance quantity/CPU/memory/disk/bandwidth quota management, traffic usage restrictions

- All code is open source, cannot be used commercially