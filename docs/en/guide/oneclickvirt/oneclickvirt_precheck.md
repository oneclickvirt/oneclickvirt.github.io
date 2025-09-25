---
outline: deep
---

# Preface

Welcome to give the project a ```Star``` for free support --> [https://github.com/oneclickvirt/oneclickvirt](https://github.com/oneclickvirt/oneclickvirt)

## Environment Requirements

Supported architectures: amd64 or arm64

Supported systems: Linux, Windows

As long as there is public network access, the deployed machine does not need to have a dedicated public IP address. This is only a virtualization control panel.

This control panel has no environmental dependency requirements, only a backend started as a daemon process and a corresponding frontend static file folder.

Frontend static files can be deployed through nginx or caddy.

## Platform Features

- All code is open source, commercial use is not allowed

- Supports connecting to Providers such as ProxmoxVE, Incus, Docker, LXD for virtualization, supporting the creation of virtual machines or containers

- Supports automatic NAT public port mapping, flexible configuration of the Provider's network type, and creating virtual machines or containers with independent IPv6 addresses

- Supports traffic monitoring, forces synchronization of traffic for sensitive operations, and resets traffic usage uniformly at the beginning of the month

- Supports invitation code registration instead of public registration, and user level management for setting resource limits
