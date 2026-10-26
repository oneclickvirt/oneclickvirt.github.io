---
outline: deep
---

# Skill 与 MCP 集成

Skill 提供各仓库的使用范围、源码入口和操作要求，MCP 则将已有命令或查询接口提供给 AI 客户端。安装这些文件不会自动安装虚拟化环境。

OneClickVirt 面板使用自己的 API 和 MCP 服务端，安装方式见 [OneClickVirt：Skill 与 MCP](./oneclickvirt/oneclickvirt_advanced_install.md#skill-与-mcp)。下面的集成用于直接操作各平台或独立工具。

## 仓库支持

各仓库均提供英文 `SKILL.md` 和中文 `SKILL_ZH.md`。表中的 MCP 栏为“—”时，只安装 Skill，按仓库原有脚本或开发接口使用。

| 仓库 | 用途 | MCP |
| --- | --- | --- |
| [pve](https://github.com/oneclickvirt/pve) · [CNB](https://cnb.cool/oneclickvirt/pve) | 管理和排查由 OneClickVirt 脚本部署的 Proxmox VE 虚拟机与 LXC 容器。 | 实例查询、启停、重启 |
| [incus](https://github.com/oneclickvirt/incus) · [CNB](https://cnb.cool/oneclickvirt/incus) | 管理和排查 Incus 实例、节点运行环境及 OneClickVirt 部署。 | 实例查询、启停、重启 |
| [lxd](https://github.com/oneclickvirt/lxd) · [CNB](https://cnb.cool/oneclickvirt/lxd) | 管理和排查 LXD 实例、节点运行环境及 OneClickVirt 部署。 | 实例查询、启停、重启 |
| [docker](https://github.com/oneclickvirt/docker) · [CNB](https://cnb.cool/oneclickvirt/docker) | 管理和排查 OneClickVirt Docker 容器及宿主机环境。 | 实例查询、启停、重启 |
| [containerd](https://github.com/oneclickvirt/containerd) · [CNB](https://cnb.cool/oneclickvirt/containerd) | 通过 nerdctl 管理和排查 OneClickVirt containerd 容器。 | 实例查询、启停、重启 |
| [podman](https://github.com/oneclickvirt/podman) · [CNB](https://cnb.cool/oneclickvirt/podman) | 管理和排查 OneClickVirt Podman 容器及宿主机环境。 | 实例查询、启停、重启 |
| [qemu](https://github.com/oneclickvirt/qemu) · [CNB](https://cnb.cool/oneclickvirt/qemu) | 通过本机 libvirt 管理和排查 OneClickVirt QEMU 虚拟机。 | 实例查询、启停、重启 |
| [kubevirt](https://github.com/oneclickvirt/kubevirt) · [CNB](https://cnb.cool/oneclickvirt/kubevirt) | 管理和排查现有 Kubernetes 集群中的 KubeVirt 虚拟机。 | 实例查询、启停、重启 |
| [basics](https://github.com/oneclickvirt/basics) · [CNB](https://cnb.cool/oneclickvirt/basics) | 读取结构化系统和硬件信息，不运行 CPU、内存或磁盘基准测试。 | 检测预设、Release 查询 |
| [backtrace](https://github.com/oneclickvirt/backtrace) · [CNB](https://cnb.cool/oneclickvirt/backtrace) | 查询指定 IP 的 RDAP/BGP 信息，区分数据库查询与真实路由探测。 | 检测预设、Release 查询 |
| [gostun](https://github.com/oneclickvirt/gostun) · [CNB](https://cnb.cool/oneclickvirt/gostun) | 通过有时限的 STUN 探测判断 NAT 行为，保留 UDP 和网络失败结果。 | 检测预设、Release 查询 |
| [portchecker](https://github.com/oneclickvirt/portchecker) · [CNB](https://cnb.cool/oneclickvirt/portchecker) | 检查邮件服务端口连通性，区分端口受限、连接失败与邮件实际投递。 | 检测预设、Release 查询 |
| [pingtest](https://github.com/oneclickvirt/pingtest) · [CNB](https://cnb.cool/oneclickvirt/pingtest) | 测量指定地址的 TCP 握手延迟，不将其当作 ICMP 延迟。 | 检测预设、Release 查询 |
| [nt3](https://github.com/oneclickvirt/nt3) · [CNB](https://cnb.cool/oneclickvirt/nt3) | 使用内置省份和运营商目标执行有时限的 TCP 延迟探测。 | 检测预设、Release 查询 |
| [speedtest](https://github.com/oneclickvirt/speedtest) · [CNB](https://cnb.cool/oneclickvirt/speedtest) | 选择并探测测速节点，区分节点可达性与实际上传下载吞吐。 | 检测预设、Release 查询 |
| [CommonMediaTests](https://github.com/oneclickvirt/CommonMediaTests) · [CNB](https://cnb.cool/oneclickvirt/CommonMediaTests) | 检测常用流媒体服务的访问状态，保留各平台未知和失败结果。 | 检测预设、Release 查询 |
| [UnlockTests](https://github.com/oneclickvirt/UnlockTests) · [CNB](https://cnb.cool/oneclickvirt/UnlockTests) | 对选定流媒体服务执行有时限的检测，区分可达性与地区解锁。 | 检测预设、Release 查询 |
| [cputest](https://github.com/oneclickvirt/cputest) · [CNB](https://cnb.cool/oneclickvirt/cputest) | 在指定测试主机执行单线程、一秒的结构化 CPU 性能采样。 | 检测预设、Release 查询 |
| [memorytest](https://github.com/oneclickvirt/memorytest) · [CNB](https://cnb.cool/oneclickvirt/memorytest) | 执行有时限的 8 MiB 内存采样，不凭带宽单独推断内存代际。 | 检测预设、Release 查询 |
| [disktest](https://github.com/oneclickvirt/disktest) · [CNB](https://cnb.cool/oneclickvirt/disktest) | 在独立临时目录执行有时限、16 MiB 文件大小的磁盘 IO 测试。 | 检测预设、Release 查询 |
| [ecs](https://github.com/oneclickvirt/ecs) · [CNB](https://cnb.cool/oneclickvirt/ecs) | 执行有明确范围的 Go 融合怪检测，解读结果并选择后续测试。 | 检测预设、Release 查询 |
| [ClawChimera](https://github.com/oneclickvirt/ClawChimera) · [CNB](https://cnb.cool/oneclickvirt/ClawChimera) | 通过 Skill 或 MCP 调用当前 Go 融合怪产物，解读有明确范围的测试结果。 | 检测预设、Release 查询 |
| [6in4](https://github.com/oneclickvirt/6in4) · [CNB](https://cnb.cool/oneclickvirt/6in4) | 查看 Linux IPv6 地址和路由，并按实际网络条件配置 6in4 隧道。 | 只读 IPv6 地址和路由 |
| [ndpresponder](https://github.com/oneclickvirt/ndpresponder) · [CNB](https://cnb.cool/oneclickvirt/ndpresponder) | 查看 Linux IPv6 地址和路由，并排查现有 NDP responder 部署。 | 只读 IPv6 地址和路由 |
| [kvm_images](https://github.com/oneclickvirt/kvm_images) · [CNB](https://cnb.cool/oneclickvirt/kvm_images) | 查找并校验 kvm_images 中适用于目标虚拟化环境的系统镜像产物。 | Release 产物查询 |
| [incus_images](https://github.com/oneclickvirt/incus_images) · [CNB](https://cnb.cool/oneclickvirt/incus_images) | 查找并校验 incus_images 中适用于目标虚拟化环境的系统镜像产物。 | Release 产物查询 |
| [pve_kvm_images](https://github.com/oneclickvirt/pve_kvm_images) · [CNB](https://cnb.cool/oneclickvirt/pve_kvm_images) | 查找并校验 pve_kvm_images 中适用于目标虚拟化环境的系统镜像产物。 | Release 产物查询 |
| [pve_lxc_images](https://github.com/oneclickvirt/pve_lxc_images) · [CNB](https://cnb.cool/oneclickvirt/pve_lxc_images) | 查找并校验 pve_lxc_images 中适用于目标虚拟化环境的系统镜像产物。 | Release 产物查询 |
| [lxc_arm_images](https://github.com/oneclickvirt/lxc_arm_images) · [CNB](https://cnb.cool/oneclickvirt/lxc_arm_images) | 查找并校验 lxc_arm_images 中适用于目标虚拟化环境的系统镜像产物。 | Release 产物查询 |
| [lxc_amd64_images](https://github.com/oneclickvirt/lxc_amd64_images) · [CNB](https://cnb.cool/oneclickvirt/lxc_amd64_images) | 查找并校验 lxc_amd64_images 中适用于目标虚拟化环境的系统镜像产物。 | Release 产物查询 |
| [lxd_images](https://github.com/oneclickvirt/lxd_images) · [CNB](https://cnb.cool/oneclickvirt/lxd_images) | 查找并校验 lxd_images 中适用于目标虚拟化环境的系统镜像产物。 | Release 产物查询 |
| [convoypanel-scripts](https://github.com/oneclickvirt/convoypanel-scripts) · [CNB](https://cnb.cool/oneclickvirt/convoypanel-scripts) | 按仓库现有脚本部署和维护 Convoy 面板。 | — |
| [pterodactyl](https://github.com/oneclickvirt/pterodactyl) · [CNB](https://cnb.cool/oneclickvirt/pterodactyl) | 部署 Pterodactyl 面板和 Wings，处理节点导入及 Egg 工作流。 | — |
| [cockpit](https://github.com/oneclickvirt/cockpit) · [CNB](https://cnb.cool/oneclickvirt/cockpit) | 按仓库现有脚本安装或移除 Cockpit。 | — |
| [virtualizor-docker](https://github.com/oneclickvirt/virtualizor-docker) · [CNB](https://cnb.cool/oneclickvirt/virtualizor-docker) | 部署 Virtualizor Docker 环境并排查已有 Compose 服务。 | — |
| [securityCheck](https://github.com/oneclickvirt/securityCheck) · [CNB](https://cnb.cool/oneclickvirt/securityCheck) | 使用公开 IP 质量检测产物，不访问其私有实现仓库。 | — |
| [ecs-gui](https://github.com/oneclickvirt/ecs-gui) · [CNB](https://cnb.cool/oneclickvirt/ecs-gui) | 构建、安装和排查基于 Fyne 的融合怪桌面或移动应用。 | — |
| [images_auto_list](https://github.com/oneclickvirt/images_auto_list) · [CNB](https://cnb.cool/oneclickvirt/images_auto_list) | 生成和校验 OneClickVirt 公开镜像种子目录。 | — |
| [dockerfile-templates](https://github.com/oneclickvirt/dockerfile-templates) · [CNB](https://cnb.cool/oneclickvirt/dockerfile-templates) | 选择并构建仓库中实际需要的 Dockerfile 模板。 | — |
| [macos](https://github.com/oneclickvirt/macos) · [CNB](https://cnb.cool/oneclickvirt/macos) | 按当前脚本制作离线 macOS ISO 并核对版本及校验值。 | — |
| [virttest](https://github.com/oneclickvirt/virttest) · [CNB](https://cnb.cool/oneclickvirt/virttest) | 运行和维护虚拟化安装脚本的自动化测试环境。 | — |
| [defaultset](https://github.com/oneclickvirt/defaultset) · [CNB](https://cnb.cool/oneclickvirt/defaultset) | 在 Go 检测模块中使用共享配置库，并保持调用兼容。 | — |
| [dd](https://github.com/oneclickvirt/dd) · [CNB](https://cnb.cool/oneclickvirt/dd) | 在受控测试中使用内嵌 dd 依赖的 Go 库。 | — |
| [fio](https://github.com/oneclickvirt/fio) · [CNB](https://cnb.cool/oneclickvirt/fio) | 在受控磁盘测试中使用内嵌 fio 依赖的 Go 库。 | — |
| [mbw](https://github.com/oneclickvirt/mbw) · [CNB](https://cnb.cool/oneclickvirt/mbw) | 在有内存用量限制的测试中使用内嵌 mbw 的 Go 库。 | — |
| [stream](https://github.com/oneclickvirt/stream) · [CNB](https://cnb.cool/oneclickvirt/stream) | 使用 Go STREAM 库执行有明确范围的内存带宽测试。 | — |
| [downloadcounter](https://github.com/oneclickvirt/downloadcounter) · [CNB](https://cnb.cool/oneclickvirt/downloadcounter) | 部署和排查 GitHub Release 下载数统计的 Cloudflare Worker。 | — |
| [hitscounter](https://github.com/oneclickvirt/hitscounter) · [CNB](https://cnb.cool/oneclickvirt/hitscounter) | 读取并排查已有 Cloudflare/D1 访问计数器。 | 只读月度统计 |

## CNB Skills 与知识库

可在 [CNB Skills 列表](https://cnb.cool/oneclickvirt/-/repos?flags=Skills) 查找各项目的 Skill，安装方式见下文。仓库首页的 `SKILL.md` 与安装目录中的同名文件保持一致，原有安装命令仍可使用。

[CNB 知识库列表](https://cnb.cool/oneclickvirt/-/repos?flags=KnowledgeBase) 包含各项目的公开说明和 Skill。[文档站知识库](https://cnb.cool/oneclickvirt/oneclickvirt.github.io) 提供中英文安装、使用、开发说明与实践案例；各项目页面的“使用说明”可查询本项目及文档站的内容。回答中应核对来源链接、版本和架构，再按对应说明操作。

知识库随公开源码提交自动增量更新。索引仅包含明确指定的公开文档，关闭 Issue 同步，不接入私有仓库、密钥、运行日志及未发布草稿。ECS 的默认分支继续展示 Go 融合怪产物，集成源码仍使用 `master` 或 `public`。

## 安装 Skill

需要 Python 3.9 以上版本。以下以 `basics` 为例，其他仓库将地址中的 `basics` 换成上表对应的仓库名即可。`ecs` 的源码分支使用 `master`，`virtualizor-docker` 也使用 `master`，其余仓库使用 `main`。

::: code-group

```bash [GitHub]
curl -fL --retry 3 https://raw.githubusercontent.com/oneclickvirt/basics/main/scripts/install_agent.py -o install_agent.py
python3 install_agent.py --client codex
```

```bash [CNB]
curl -fL --retry 3 https://cnb.cool/oneclickvirt/basics/-/git/raw/main/scripts/install_agent.py -o install_agent.py
python3 install_agent.py --client codex --source cnb
```

:::

CNB 安装另需 Git，用于解析镜像仓库的固定提交。ECS 的 CNB 默认分支继续展示 Go 融合怪产物，安装集成时请使用 `master` 或 `public` 源码分支。

Windows 下载后可用 `py -3 install_agent.py --client codex`。也可选择其他客户端：

| 客户端 | 参数 | 默认 Skill 目录 |
| --- | --- | --- |
| Codex | `--client codex` | `~/.agents/skills/oneclickvirt-仓库名` |
| Claude Code | `--client claude` | `~/.claude/skills/oneclickvirt-仓库名` |
| OpenClaw | `--client openclaw` | `~/.openclaw/skills/oneclickvirt-仓库名` |

仓库名中的下划线在 Skill 名称中改为连字符，英文字母使用小写。自定义目录可用 `--skill-dir` 指定，`SKILL.md` 直接放在该目录内。默认安装英文入口，中文说明在同目录的 `SKILL_ZH.md`。

重新下载并执行同一个安装命令即可更新。安装器先将分支或标签解析为固定提交，再校验所需文件的 SHA-256；全部通过后才替换文件。`install.json` 记录来源提交，额外本地文件、客户端配置和 Token 会保留。只需要 Skill 时添加 `--skill-only`。

`--ref` 用于固定 Skill/MCP 的源码版本。GitHub 和 CNB 使用各自的提交号，不能把 GitHub 提交号直接当作 CNB 快照提交号。

## 配置 MCP

支持 MCP 的仓库会在 Skill 目录内分别生成 `mcp.codex.toml`、`mcp.claude.json` 和 `mcp.openclaw.json`。Codex 合并到 `~/.codex/config.toml`，Claude Code 合并到项目的 `.mcp.json`，OpenClaw 合并到 `~/.openclaw/openclaw.json`。实际适配器默认位于 `~/.local/share/oneclickvirt-mcp/Skill名/`。安装器不会自动改写客户端配置；保留已有条目，合并对应示例后再重新连接。`mcp.example.json` 保留为 Claude 格式的兼容示例。

例如，PVE 安装后使用本机的 Python 和适配器路径：

::: code-group

```toml [Codex]
[mcp_servers.oneclickvirt-pve]
command = "/usr/bin/python3"
args = ["/home/user/.local/share/oneclickvirt-mcp/oneclickvirt-pve/server.py"]
tool_timeout_sec = 180
```

```json [Claude Code]
{
  "mcpServers": {
    "oneclickvirt-pve": {
      "command": "/usr/bin/python3",
      "args": ["/home/user/.local/share/oneclickvirt-mcp/oneclickvirt-pve/server.py"]
    }
  }
}
```

```json [OpenClaw]
{
  "mcp": {
    "servers": {
      "oneclickvirt-pve": {
        "command": "/usr/bin/python3",
        "args": ["/home/user/.local/share/oneclickvirt-mcp/oneclickvirt-pve/server.py"],
        "requestTimeoutMs": 180000
      }
    }
  }
}
```

:::

请以实际生成的配置为准。各平台使用的本机命令如下，MCP 进程必须以拥有相应权限的用户运行：

| 平台 | 命令与环境 |
| --- | --- |
| PVE | `pvesh`；按集群返回的节点和 `qemu` / `lxc` 类型定位实例 |
| Incus | `incus`；使用当前连接和项目 |
| LXD | `lxc`；使用 LXD 当前连接和项目 |
| Docker | `docker`；使用当前 Docker context |
| Containerd | `nerdctl`；使用当前 namespace 和配置 |
| Podman | `podman`；rootless 与 rootful 实例属于不同用户 |
| QEMU | `virsh`；`ONECLICKVIRT_LIBVIRT_URI` 可为 `qemu:///system` 或 `qemu:///session` |
| KubeVirt | `kubectl`；使用已有 kubeconfig，`ONECLICKVIRT_KUBE_NAMESPACE` 默认为 `default`，启停另需 `virtctl` |
| 6in4、ndpresponder | Linux 的 `ip`；只读 IPv6 地址和路由 |

远程宿主机可通过无交互 SSH 运行宿主机上的适配器，例如下面的 Claude Code 配置；Codex 和 OpenClaw 使用同样的 `command` 与 `args`，分别放在上述对应结构内：

```json
{
  "mcpServers": {
    "oneclickvirt-pve": {
      "command": "ssh",
      "args": ["-T", "user@host", "/usr/bin/python3", "/home/user/.local/share/oneclickvirt-mcp/oneclickvirt-pve/server.py"]
    }
  }
}
```

先调用 `integration_info` 检查运行要求，再调用 `list_instances` 和 `instance_status`。默认只读；需要启停或重启时，在预期的宿主机上设置 `ONECLICKVIRT_MCP_ALLOW_WRITE=1`，才会提供 `instance_action`。停止使用平台的正常关机命令，没有删除、重装或任意 Shell 工具。

## 检测程序及版本更新

`basics`、`backtrace`、`gostun`、`portchecker`、`pingtest`、`nt3`、`speedtest`、`CommonMediaTests`、`UnlockTests`、CPU/内存/磁盘测试和 ECS 可以安装对应的已发布程序：

```bash
python3 install_agent.py --client codex --install-binary
```

默认程序放在 `~/.local/bin`，也可使用 `--bin-dir` 指定位置，或用 `--binary /完整路径/程序` 复用已有可执行文件。`--version` 选择检测程序的 Release 标签，`--ref` 选择集成源码，两者独立。ClawChimera 使用 ECS 的正式 Release。

安装器读取当前 Release 的真实系统和架构产物，校验 GitHub 的 SHA-256 digest，或 Release 中对应的 `checksums.txt` / `SHA256SUMS`。没有匹配产物或校验失败会停止，不会将未知架构回退为 amd64。复用 `output` 等标签的仓库，每次更新仍按当前摘要校验，不会仅凭标签相同沿用旧程序。CNB 提供集成源码，检测程序继续来自 GitHub Release。

先用 `probe_help` 核对本机程序帮助，再调用 `run_probe` 中的固定预设。CPU、内存和磁盘预设需要 `ONECLICKVIRT_MCP_ALLOW_BENCHMARKS=1`，只使用短时、有限资源的测试；磁盘测试使用独立临时目录。网络检测会访问对应服务，测速的 `registry` 预设只检查测速节点，不运行完整带宽测速。

ECS 的 `system` 预设关闭 CPU、内存、磁盘、流媒体、IP 安全、网络测速、日志及公开上传，使用 25 秒的结构化检测时限。程序自身仍会进行基础网络预检和 NAT/STUN 检查；返回 `partial`、`unavailable` 或 `timeout` 时应保留实际结果。需要完整测试时，按 ECS 原有帮助选择测试范围。

ClawChimera 原有的 `bash run.sh` 入口也需要 Python 3.9 以上版本，所有检测参数仍传给 ECS。先用 `bash run.sh -h` 查看当前程序的帮助；可用环境变量 `ECS_VERSION` 固定完整 Release 标签。入口每次核对当前 Release 和 SHA-256，缓存按二进制摘要区分；打包时会一并包含所需的脚本和配置。

## 镜像与统计查询

镜像仓库的 `release_assets` 返回实际标签、产物名、大小、摘要和下载地址。`latest` 只代表最近发布的一个 Release；指定系统时请传完整标签，再用 `filter` 筛选架构。筛选为空表示没有匹配产物，不应改用其他架构。

`hitscounter` 只提供 `/api/monthly` 月度统计，不增加访问计数；`ONECLICKVIRT_COUNTER_URL` 可指定已有部署的 HTTPS 地址。创建计数器仍使用原有管理方式。

## 核对连接

安装完成后检查客户端是否能列出工具、缺少本机命令时是否明确报错，以及只读连接是否未出现 `instance_action`。测试启停时使用独立实例，核对运行状态后再清理测试资源。

组织集成的 [跨系统检查](https://github.com/oneclickvirt/oneclickvirt/actions/workflows/agent-integrations.yml) 和 [原生环境检查](https://github.com/oneclickvirt/oneclickvirt/actions/workflows/agent-runtime.yml) 分别验证安装、协议和具体运行环境。握手通过、真实程序执行、虚拟机启动属于不同的验证范围，应以对应运行记录为准。
