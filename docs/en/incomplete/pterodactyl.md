---
outline: deep
---

## Repo

<https://github.com/oneclickvirt/pterodactyl>

[![hits](https://hits.spiritlhl.net/pterodactyl.svg?action=hit&title=hits&title_bg=%23555555&count_bg=%233aebee&edge_flat=false)](https://hits.spiritlhl.net)

## pterodactyl-scripts

After further research, it was found that creating servers and binding users is too cumbersome compared to using native Docker directly, so further development is currently suspended.

## Description

Currently supported systems:

| OS Type     | Version Range                   | Notes        |
|-------------|----------------------------------|--------------|
| Ubuntu      | 20.04 (recommended), 22.04, 24.04 | Supported    |
| Debian      | 11 (Bullseye), 12 (Bookworm)     | Supported    |

## Panel

On the panel side, run:

```shell
curl -slk https://raw.githubusercontent.com/oneclickvirt/pterodactyl/main/scripts/install_pterodactyl.sh -o install_pterodactyl.sh && chmod 777 install_pterodactyl.sh && bash install_pterodactyl.sh
```

## Wings

On the wings side, run:

```shell
curl -slk https://raw.githubusercontent.com/oneclickvirt/pterodactyl/main/scripts/install_wings.sh -o install_wings.sh && chmod 777 install_wings.sh && bash install_wings.sh
```

## Import

On the panel side, run:

```shell
curl -slk https://raw.githubusercontent.com/oneclickvirt/pterodactyl/main/scripts/import_node.sh -o import_node.sh && chmod 777 import_node.sh && bash import_node.sh
```

This will generate a command to be executed on the wings side.

After executing the generated command, wait for more than 20 seconds to avoid issues caused by unfinished initialization processes. Then on the wings side, run:

```shell
bash install_wings.sh
```

Then go to `http://<your_ip>/admin/nodes` and you should see your node has been automatically added and managed, with a green heartbeat.

## Thanks

<https://pterodactyl.io/>
