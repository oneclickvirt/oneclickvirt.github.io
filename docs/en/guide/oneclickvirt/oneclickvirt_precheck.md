---
outline: deep
---

# Preface

This is a control panel for interfacing with mainstream virtualization technologies, supplementing features not natively supported by virtualization platforms such as user management, traffic monitoring, NAT port mapping, and custom system images.

Welcome to support the project with a ```Star``` for free --> [https://github.com/oneclickvirt/oneclickvirt](https://github.com/oneclickvirt/oneclickvirt)

:::warning
This is a project in early development and may have various bugs and instabilities. Please assess the risks before use. Updates will be relatively frequent.
:::

## Environment Requirements

Supported architectures: amd64 or arm64

Supported systems: Linux, Windows, or any self-compiled system architecture

Only requires public network access. The deployed machine does not need an independent public IP address. This is just a virtualization control panel that only needs port display for the frontend. In fact, one important reason for development is that I need to manage multiple virtualization environments without a public IPv4 address.

This control panel has no special environmental dependency requirements. For one-click deployment, you can use the all-in-one Docker image with database included or docker-compose deployment with separated containers.

Frontend static files are deployed through ```nginx``` or ```caddy``` or ```OpenResty```. For non-source code deployment and non-Docker deployment, API path reverse proxy to the backend port is required.

:::warning
Managed nodes require the host machine's network interface to be directly bound to a public IP address. Host machines accessing the public network via methods such as port mapping (e.g., Alibaba Cloud VPC) or NAT forwarding are not supported. Host machines providing public network access through full-port NAT or port forwarding cannot serve as node machines.
:::

## Platform Features

- Language internationalization: Frontend supports bilingual display in Chinese and English, defaults to Chinese display, with switchable default system language

- Provider Integration: Supports ProxmoxVE, Incus, Docker, LXD - four major mainstream virtualization platforms, with more platforms coming soon

- Flexible Instance Types: Supports automatic creation of virtual machines (VM) and containers (Container), providing a unified virtualization resource management experience through abstraction design

- Built-in Image Seed Data: No need to search for platform-specific images yourself. All platforms come with self-compiled image loading, supporting unified management or custom image download URLs

- Automatic NAT Port Mapping: Supports automatic port mapping for IPv4/IPv6, with mapped IPs supporting non-public IPs. Supports multiple network types:

```
NAT IPv4
NAT IPv4 + Independent IPv6
Independent IPv4
Independent IPv4 + IPv6
Pure IPv6
```

- Port Mapping Methods: Flexibly selects the best mapping solution automatically based on different Providers (native, device proxy, iptables, etc.)

- Traffic Statistics: Integrates IP-level and network interface-level precise network traffic statistics. Forces traffic data synchronization during sensitive operations to ensure data accuracy

- Monthly traffic usage statistics reset at the beginning of each month. Supports traffic statistics and limits at user, instance, and Provider levels

- Invitation Code System: Supports non-public registration invitation mechanism, with different resource quota limits based on user levels

- Resource Limits: Supports setting instance quantity/CPU/memory/disk/bandwidth quota management and traffic usage restrictions

- All code is open source, but no commercial development will be undertaken