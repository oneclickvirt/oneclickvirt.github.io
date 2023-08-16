---
outline: deep
---

## Preparation

To virtualize a server, you will need:

1. A server that can connect to the public internet (VPS or Dedicated Server), preferably capable of accessing Github's RAW pages without any issues. Some projects and components might not utilize CDN acceleration.

::: tip
If you are located in mainland China and have difficulty accessing Github, please pay attention to whether accompanying scripts and projects have indicated the use of CDN acceleration.
:::

2. A stable local SSH connection. If your connection isn't stable, use the ```screen``` command to create a window and execute commands within it.

::: tip
If you're not familiar with the ```screen``` command, search for relevant tutorials to learn, or you can use ```tmux``` as an alternative.
:::

3. Ensure that the server's system and hardware meet the requirements of the corresponding project, as outlined in the project's documentation.

**This document will use a VPS as an example, assuming a clean environment without any native issues. If necessary, reinstall the system to ensure a pristine initial setup.**

:::warning
The PVE project might cause problems on the host machine. If you're not experienced in identifying bugs and fixing systems, it's not recommended to use it in a production environment. If using PVE-related scripts, make sure the host machine can be reinstalled at any time.
:::

## Project Repositories

Feel free to Star and Fork these repositories.

### PVE

Enables the creation of KVM virtualized virtual machines and LXC container virtualization.

[https://github.com/spiritLHLS/pve](https://github.com/spiritLHLS/pve)

[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2FspiritLHLS%2Fpve&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false)](https://hits.seeyoufarm.com)

### LXD

Enables the creation of LXC container virtualization.

[https://github.com/spiritLHLS/lxd](https://github.com/spiritLHLS/lxd)

[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2FspiritLHLS%2Flxd&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false)](https://hits.seeyoufarm.com)

### Docker

Enables the creation of Docker container virtualization.

[https://github.com/spiritLHLS/docker](https://github.com/spiritLHLS/docker)

[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2FspiritLHLS%2Fdocker&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false)](https://hits.seeyoufarm.com)

<br/>
<br/>
