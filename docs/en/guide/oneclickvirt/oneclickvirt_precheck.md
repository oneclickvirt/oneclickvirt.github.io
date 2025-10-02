---
outline: deep
---

# Preface

This is a control panel for interfacing with mainstream virtualization technologies, supplementing features not supported by virtualization technologies themselves, such as user management, traffic monitoring, NAT port mapping, and custom system images.

Welcome to give the project a ```Star``` for free support --> [https://github.com/oneclickvirt/oneclickvirt](https://github.com/oneclickvirt/oneclickvirt)

:::warning
This is a project in the early stages of development, there may be a variety of bugs and instability, if you use it at your own discretion and risk, updates will be more frequent
:::

## Environment Requirements

Supported architectures: amd64 or arm64

Supported systems: Linux, Windows

Only a public network connection is required. The deployed machine does not need to have an independent public IP address; this is just a virtualization control panel that only needs port access to display the frontend.

This control panel has no environment dependency requirements, only a daemon-started backend and a corresponding frontend static file folder.

Frontend static files can be deployed through ```nginx``` or ```caddy``` or ```OpenResty```. Non-source code deployment and non-Docker deployment require API path reverse proxy to the backend port.

## Platform Features

- Provider Integration: Supports four major mainstream virtualization platforms: ProxmoxVE, Incus, Docker, LXD

- Flexible Instance Types: Supports creating Virtual Machines (VM) and Containers, providing a unified virtualization resource management experience through abstracted design

- Built-in image seed data, no need to search for corresponding platform images yourself. All platforms come with self-compiled image loading and support unified management

- Automatic NAT Port Mapping: Supports automatic port mapping for IPv4/IPv6, multiple network types:

```
NAT IPv4
NAT IPv4 + Independent IPv6
Independent IPv4
Independent IPv4 + IPv6
Pure IPv6
```

- Flexible Port Mapping Methods: Automatically selects the best mapping solution based on different Providers (native, device proxy, iptables, etc.)

- Integrated vnStat for accurate network traffic statistics, forced synchronization of traffic data during sensitive operations to ensure data accuracy

- Unified reset of user traffic usage statistics at the beginning of each month, supports user-level, instance-level, and Provider-level traffic statistics and limitations

- Supports invitation code system, implementing non-public registration mechanism, setting different resource quota limits based on user levels

- Supports multiple resource restrictions: instance count/CPU/memory/disk/bandwidth quota management, traffic usage limitations

- All code is open source, but commercial use is not permitted