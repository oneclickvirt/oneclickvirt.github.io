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

Please make sure to keep the original formatting by enclosing the translation in ``` and ``` for easy copying.

## Project Repository

Welcome Star and Fork, all resources are open source, no non-open source parts, reproduced as well as the use of please write on the source of this site, thank you!

### PVE

Allows for the creation of KVM virtualized virtual machines and LXC virtualized containers.

[https://github.com/spiritLHLS/pve](https://github.com/spiritLHLS/pve)

[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2FspiritLHLS%2Fpve&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false)](https://hits.seeyoufarm.com)

### LXD

LXC Virtualization Containers Can Be Created.

[https://github.com/spiritLHLS/lxd](https://github.com/spiritLHLS/lxd)

[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2FspiritLHLS%2Flxd&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false)](https://hits.seeyoufarm.com)

### Docker

Docker virtualized containers Can Be Created.

[https://github.com/spiritLHLS/docker](https://github.com/spiritLHLS/docker)

[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2FspiritLHLS%2Fdocker&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false)](https://hits.seeyoufarm.com)

<br/>
<br/>
