---
outline: deep
---

## Preparation Work  

To virtualize a server, you will need:

1. A server (VPS or Dedicated Server) that can connect to the public internet. It's preferable if this server can access GitHub's RAW pages perfectly, as some projects and components might not use CDN acceleration.

2. A stable SSH connection from your local machine. If the connection isn't stable, you can use the ```screen``` command to create a window and execute commands within that window.

::: tip  
If you're unfamiliar with the ```screen``` command, please search for relevant tutorials to learn it, or you can use ```tmux``` as an alternative.
:::

3. Ensure that the server's system and hardware meet the requirements specified by the corresponding project. Refer to the project's documentation for detailed information.

**This document will use a VPS as an example, and the VPS should be clean without any native environment issues. If necessary, reinstall the system to ensure the initial environment's cleanliness.**

:::warning  
The PVE project might cause problems on the host machine. If you're not familiar with debugging bugs and fixing system issues, it's not recommended to use PVE in a production environment. When using PVE-related scripts, make sure the host machine can be reinstalled at any time.
:::

## Project Repository

Welcome Star and Fork, all resources are open source, no non-open source parts, reproduced as well as the use of please write on the source of this site, thank you!

## OneClickVirt

https://github.com/oneclickvirt/oneclickvirt

## PVE

[https://github.com/oneclickvirt/pve](https://github.com/oneclickvirt/pve)

[![Hits](https://hits.spiritlhl.net/pve.svg?action=hit&title=Hits&title_bg=%23555555&count_bg=%230eecf8&edge_flat=false)](https://hits.spiritlhl.net)

## Incus

[https://github.com/oneclickvirt/incus](https://github.com/oneclickvirt/incus)

[![Hits](https://hits.spiritlhl.net/incus.svg?action=hit&title=Hits&title_bg=%23555555&count_bg=%230eecf8&edge_flat=false)](https://hits.spiritlhl.net)

## Docker

[https://github.com/oneclickvirt/docker](https://github.com/oneclickvirt/docker)

[![Hits](https://hits.spiritlhl.net/docker.svg?action=hit&title=Hits&title_bg=%23555555&count_bg=%230eecf8&edge_flat=false)](https://hits.spiritlhl.net)

## LXD

[https://github.com/oneclickvirt/lxd](https://github.com/oneclickvirt/lxd)

[![Hits](https://hits.spiritlhl.net/lxd.svg?action=hit&title=Hits&title_bg=%23555555&count_bg=%230eecf8&edge_flat=false)](https://hits.spiritlhl.net)
