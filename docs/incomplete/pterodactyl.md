---
outline: deep
---

## Repo

https://github.com/oneclickvirt/pterodactyl

[![hits](https://hits.spiritlhl.net/pterodactyl.svg?action=hit&title=hits&title_bg=%23555555&count_bg=%233aebee&edge_flat=false)](https://hits.spiritlhl.net)

## pterodactyl-scripts

进一步调研发现开设servers和绑定用户极麻烦，不如原生直接docker方便，故而暂不做后续开发了

## 说明

目前支持的系统

| 系统类型    | 版本范围                    | 备注         |
|-------------|----------------------------|--------------|
| Ubuntu      | 20.04(推荐), 22.04, 24.04  | 已支持       |
| Debian      | 11(Bullseye), 12(Bookworm) | 已支持       |

## 更新

2025.04.15

- 测试修复节点导入

## Panel

panel端执行：

```shell
curl -slk https://raw.githubusercontent.com/oneclickvirt/pterodactyl/main/scripts/install_pterodactyl.sh -o install_pterodactyl.sh && chmod 777 install_pterodactyl.sh && bash install_pterodactyl.sh
```

## Wings

wings端执行：

```shell
curl -slk https://raw.githubusercontent.com/oneclickvirt/pterodactyl/main/scripts/install_wings.sh -o install_wings.sh && chmod 777 install_wings.sh && bash install_wings.sh
```

## Import

panel端执行：

```shell
curl -slk https://raw.githubusercontent.com/oneclickvirt/pterodactyl/main/scripts/import_node.sh -o import_node.sh && chmod 777 import_node.sh && bash import_node.sh
```

会生成需要在wings端执行的命令

生成的命令执行完毕后等待20秒以上，避免一些初始化流程未走完，然后wings端再执行：

```shell
bash install_wings.sh
```

然后在```http://<your_ip>/admin/nodes```就能看到你的节点已经被自动添加纳管，心跳是绿色的

## Thanks

https://pterodactyl.io/