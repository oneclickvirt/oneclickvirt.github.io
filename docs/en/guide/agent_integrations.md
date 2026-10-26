---
outline: deep
---

# Skill and MCP integrations

Skills describe each repository's scope, source entry points, and operating requirements. MCP makes existing commands or query APIs available to an AI client. Installing these files does not install a virtualization runtime.

The OneClickVirt panel uses its own API and MCP server. See [OneClickVirt: Skill and MCP](./oneclickvirt/oneclickvirt_advanced_install.md#skill-and-mcp) for that installation. The integrations below operate individual platforms and standalone tools.

## Supported repositories

Each repository provides an English `SKILL.md` and a Chinese `SKILL_ZH.md`. A dash in the MCP column means that only a Skill is installed; use the repository's existing scripts or development APIs.

| Repository | Purpose | MCP |
| --- | --- | --- |
| [pve](https://github.com/oneclickvirt/pve) · [CNB](https://cnb.cool/oneclickvirt/pve) | Operate and troubleshoot pve instances deployed with the OneClickVirt scripts. | Instance queries, start/stop/restart |
| [incus](https://github.com/oneclickvirt/incus) · [CNB](https://cnb.cool/oneclickvirt/incus) | Operate and troubleshoot incus instances deployed with the OneClickVirt scripts. | Instance queries, start/stop/restart |
| [lxd](https://github.com/oneclickvirt/lxd) · [CNB](https://cnb.cool/oneclickvirt/lxd) | Operate and troubleshoot lxd instances deployed with the OneClickVirt scripts. | Instance queries, start/stop/restart |
| [docker](https://github.com/oneclickvirt/docker) · [CNB](https://cnb.cool/oneclickvirt/docker) | Operate and troubleshoot docker instances deployed with the OneClickVirt scripts. | Instance queries, start/stop/restart |
| [containerd](https://github.com/oneclickvirt/containerd) · [CNB](https://cnb.cool/oneclickvirt/containerd) | Operate and troubleshoot containerd instances deployed with the OneClickVirt scripts. | Instance queries, start/stop/restart |
| [podman](https://github.com/oneclickvirt/podman) · [CNB](https://cnb.cool/oneclickvirt/podman) | Operate and troubleshoot podman instances deployed with the OneClickVirt scripts. | Instance queries, start/stop/restart |
| [qemu](https://github.com/oneclickvirt/qemu) · [CNB](https://cnb.cool/oneclickvirt/qemu) | Operate and troubleshoot qemu instances deployed with the OneClickVirt scripts. | Instance queries, start/stop/restart |
| [kubevirt](https://github.com/oneclickvirt/kubevirt) · [CNB](https://cnb.cool/oneclickvirt/kubevirt) | Operate and troubleshoot kubevirt instances deployed with the OneClickVirt scripts. | Instance queries, start/stop/restart |
| [basics](https://github.com/oneclickvirt/basics) · [CNB](https://cnb.cool/oneclickvirt/basics) | Collect structured hardware/system information without running CPU, memory or disk benchmarks. | Probe presets, release queries |
| [backtrace](https://github.com/oneclickvirt/backtrace) · [CNB](https://cnb.cool/oneclickvirt/backtrace) | Query RDAP/BGP metadata for an explicit IP; distinguish lookup data from an actual traceroute. | Probe presets, release queries |
| [gostun](https://github.com/oneclickvirt/gostun) · [CNB](https://cnb.cool/oneclickvirt/gostun) | Detect NAT behavior using bounded STUN probes. A UDP/network failure is not proof of a NAT type. | Probe presets, release queries |
| [portchecker](https://github.com/oneclickvirt/portchecker) · [CNB](https://cnb.cool/oneclickvirt/portchecker) | Check mail endpoint connectivity; report per-endpoint errors and blocked ports without claiming mail delivery. | Probe presets, release queries |
| [pingtest](https://github.com/oneclickvirt/pingtest) · [CNB](https://cnb.cool/oneclickvirt/pingtest) | Measure TCP handshake latency for a user-selected endpoint; do not describe it as ICMP latency. | Probe presets, release queries |
| [nt3](https://github.com/oneclickvirt/nt3) · [CNB](https://cnb.cool/oneclickvirt/nt3) | Query the built-in province/carrier targets with bounded TCP latency probes; detailed routes require separate explicit testing. | Probe presets, release queries |
| [speedtest](https://github.com/oneclickvirt/speedtest) · [CNB](https://cnb.cool/oneclickvirt/speedtest) | Select and probe one speed-test registry node. Registry reachability is not upload/download throughput. | Probe presets, release queries |
| [CommonMediaTests](https://github.com/oneclickvirt/CommonMediaTests) · [CNB](https://cnb.cool/oneclickvirt/CommonMediaTests) | Check the module's common streaming providers; preserve provider-specific unknown and failure results. | Probe presets, release queries |
| [UnlockTests](https://github.com/oneclickvirt/UnlockTests) · [CNB](https://cnb.cool/oneclickvirt/UnlockTests) | Run a bounded selected streaming-provider check; reachability and geographic unlock are different results. | Probe presets, release queries |
| [cputest](https://github.com/oneclickvirt/cputest) · [CNB](https://cnb.cool/oneclickvirt/cputest) | Run a one-thread, one-second structured CPU sample on an intended benchmark host. | Probe presets, release queries |
| [memorytest](https://github.com/oneclickvirt/memorytest) · [CNB](https://cnb.cool/oneclickvirt/memorytest) | Run a bounded 8 MiB memory sample; avoid inferring DIMM generation from throughput alone. | Probe presets, release queries |
| [disktest](https://github.com/oneclickvirt/disktest) · [CNB](https://cnb.cool/oneclickvirt/disktest) | Run structured disk IO in a dedicated temporary directory with a 16 MiB test file; never point it at a raw block device. | Probe presets, release queries |
| [ecs](https://github.com/oneclickvirt/ecs) · [CNB](https://cnb.cool/oneclickvirt/ecs) | Collect a bounded VPS Fusion Monster system report, interpret results and select explicit follow-up tests. | Probe presets, release queries |
| [ClawChimera](https://github.com/oneclickvirt/ClawChimera) · [CNB](https://cnb.cool/oneclickvirt/ClawChimera) | Collect a bounded VPS Fusion Monster system report, interpret results and select explicit follow-up tests. | Probe presets, release queries |
| [6in4](https://github.com/oneclickvirt/6in4) · [CNB](https://cnb.cool/oneclickvirt/6in4) | Inspect and configure 6in4 IPv6 connectivity on the intended Linux host. | Read-only IPv6 addresses/routes |
| [ndpresponder](https://github.com/oneclickvirt/ndpresponder) · [CNB](https://cnb.cool/oneclickvirt/ndpresponder) | Inspect and configure ndpresponder IPv6 connectivity on the intended Linux host. | Read-only IPv6 addresses/routes |
| [kvm_images](https://github.com/oneclickvirt/kvm_images) · [CNB](https://cnb.cool/oneclickvirt/kvm_images) | Find and verify current kvm_images operating-system image release assets for a compatible virtualization runtime. | Release asset queries |
| [incus_images](https://github.com/oneclickvirt/incus_images) · [CNB](https://cnb.cool/oneclickvirt/incus_images) | Find and verify current incus_images operating-system image release assets for a compatible virtualization runtime. | Release asset queries |
| [pve_kvm_images](https://github.com/oneclickvirt/pve_kvm_images) · [CNB](https://cnb.cool/oneclickvirt/pve_kvm_images) | Find and verify current pve_kvm_images operating-system image release assets for a compatible virtualization runtime. | Release asset queries |
| [pve_lxc_images](https://github.com/oneclickvirt/pve_lxc_images) · [CNB](https://cnb.cool/oneclickvirt/pve_lxc_images) | Find and verify current pve_lxc_images operating-system image release assets for a compatible virtualization runtime. | Release asset queries |
| [lxc_arm_images](https://github.com/oneclickvirt/lxc_arm_images) · [CNB](https://cnb.cool/oneclickvirt/lxc_arm_images) | Find and verify current lxc_arm_images operating-system image release assets for a compatible virtualization runtime. | Release asset queries |
| [lxc_amd64_images](https://github.com/oneclickvirt/lxc_amd64_images) · [CNB](https://cnb.cool/oneclickvirt/lxc_amd64_images) | Find and verify current lxc_amd64_images operating-system image release assets for a compatible virtualization runtime. | Release asset queries |
| [lxd_images](https://github.com/oneclickvirt/lxd_images) · [CNB](https://cnb.cool/oneclickvirt/lxd_images) | Find and verify current lxd_images operating-system image release assets for a compatible virtualization runtime. | Release asset queries |
| [convoypanel-scripts](https://github.com/oneclickvirt/convoypanel-scripts) · [CNB](https://cnb.cool/oneclickvirt/convoypanel-scripts) | Deploy and maintain Convoy using this repository's reviewed shell scripts. | — |
| [pterodactyl](https://github.com/oneclickvirt/pterodactyl) · [CNB](https://cnb.cool/oneclickvirt/pterodactyl) | Deploy Pterodactyl panel/Wings and manage the repository's node import and egg workflows. | — |
| [cockpit](https://github.com/oneclickvirt/cockpit) · [CNB](https://cnb.cool/oneclickvirt/cockpit) | Install or remove the Cockpit setup maintained in this repository. | — |
| [virtualizor-docker](https://github.com/oneclickvirt/virtualizor-docker) · [CNB](https://cnb.cool/oneclickvirt/virtualizor-docker) | Deploy the Virtualizor Docker setup and diagnose its existing Compose services. | — |
| [securityCheck](https://github.com/oneclickvirt/securityCheck) · [CNB](https://cnb.cool/oneclickvirt/securityCheck) | Install and interpret the public IP-quality checker release without accessing its private implementation. | — |
| [ecs-gui](https://github.com/oneclickvirt/ecs-gui) · [CNB](https://cnb.cool/oneclickvirt/ecs-gui) | Build, install and troubleshoot the Fyne ECS desktop/mobile application. | — |
| [images_auto_list](https://github.com/oneclickvirt/images_auto_list) · [CNB](https://cnb.cool/oneclickvirt/images_auto_list) | Generate and verify OneClickVirt's public image seed catalogue. | — |
| [dockerfile-templates](https://github.com/oneclickvirt/dockerfile-templates) · [CNB](https://cnb.cool/oneclickvirt/dockerfile-templates) | Build the specific Dockerfile template requested from this repository. | — |
| [macos](https://github.com/oneclickvirt/macos) · [CNB](https://cnb.cool/oneclickvirt/macos) | Create the offline macOS ISO artifacts maintained by this repository. | — |
| [virttest](https://github.com/oneclickvirt/virttest) · [CNB](https://cnb.cool/oneclickvirt/virttest) | Run and maintain the virtualization installation test harness. | — |
| [defaultset](https://github.com/oneclickvirt/defaultset) · [CNB](https://cnb.cool/oneclickvirt/defaultset) | Integrate the shared Go configuration library used by OneClickVirt benchmark modules. | — |
| [dd](https://github.com/oneclickvirt/dd) · [CNB](https://cnb.cool/oneclickvirt/dd) | Use the Go library that embeds dd dependencies for controlled benchmark workloads. | — |
| [fio](https://github.com/oneclickvirt/fio) · [CNB](https://cnb.cool/oneclickvirt/fio) | Use the Go library that embeds fio dependencies for controlled disk benchmarks. | — |
| [mbw](https://github.com/oneclickvirt/mbw) · [CNB](https://cnb.cool/oneclickvirt/mbw) | Use the Go library that embeds mbw memory-bandwidth dependencies. | — |
| [stream](https://github.com/oneclickvirt/stream) · [CNB](https://cnb.cool/oneclickvirt/stream) | Use the Go STREAM library for bounded memory-bandwidth testing. | — |
| [downloadcounter](https://github.com/oneclickvirt/downloadcounter) · [CNB](https://cnb.cool/oneclickvirt/downloadcounter) | Deploy and troubleshoot the GitHub Release download-counter Cloudflare Worker. | — |
| [hitscounter](https://github.com/oneclickvirt/hitscounter) · [CNB](https://cnb.cool/oneclickvirt/hitscounter) | Read and troubleshoot existing Cloudflare/D1 visit counters. | Read-only monthly statistics |

## Install a Skill

Python 3.9+ is required. This example uses `basics`; replace that repository name with an entry in the table. The source branch is `master` for `ecs` and `virtualizor-docker`, and `main` for the other repositories.

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

CNB installation also requires Git to resolve the mirror's immutable commit. The default ECS branch on CNB continues to display compiled Go ECS artifacts. Use its `master` or `public` source branch to install the integration.

On Windows, download the script and run `py -3 install_agent.py --client codex`. Other clients are also supported:

| Client | Option | Default Skill directory |
| --- | --- | --- |
| Codex | `--client codex` | `~/.agents/skills/oneclickvirt-repository` |
| Claude Code | `--client claude` | `~/.claude/skills/oneclickvirt-repository` |
| OpenClaw | `--client openclaw` | `~/.openclaw/skills/oneclickvirt-repository` |

Skill names use lowercase letters and replace repository underscores with hyphens. Use `--skill-dir` for a custom directory; `SKILL.md` is placed directly inside it. The default entry is English; `SKILL_ZH.md` in the same directory contains the Chinese instructions.

Download and execute the same installer again to update. It resolves a branch or tag to one immutable commit and verifies every required file's SHA-256 before replacing files. `install.json` records that commit. Extra local files, client settings, and tokens are preserved. Add `--skill-only` to install only the Skill.

`--ref` pins the Skill/MCP source version. GitHub and CNB have their own commit IDs; a GitHub commit ID is not a CNB snapshot commit ID.

## Configure MCP

MCP-enabled repositories generate `mcp.codex.toml`, `mcp.claude.json`, and `mcp.openclaw.json` in the Skill directory. Merge the matching file into `~/.codex/config.toml` for Codex, the project `.mcp.json` for Claude Code, or `~/.openclaw/openclaw.json` for OpenClaw, keeping existing entries. The adapter defaults to `~/.local/share/oneclickvirt-mcp/skill-name/`. Reconnect the client after merging; the installer does not rewrite client configuration. `mcp.example.json` remains a Claude-format compatibility example.

For example, a local PVE adapter uses the host's actual Python and adapter paths:

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

Use the generated configuration for your installation. Run the MCP process as a user with permission to use the relevant native command:

| Platform | Command and environment |
| --- | --- |
| PVE | `pvesh`; identifies the node and `qemu` / `lxc` type from cluster resources |
| Incus | `incus`; current connection and project |
| LXD | `lxc`; current LXD connection and project |
| Docker | `docker`; current Docker context |
| Containerd | `nerdctl`; current namespace and configuration |
| Podman | `podman`; rootless and rootful containers belong to different users |
| QEMU | `virsh`; `ONECLICKVIRT_LIBVIRT_URI` accepts `qemu:///system` or `qemu:///session` |
| KubeVirt | `kubectl`; existing kubeconfig, `ONECLICKVIRT_KUBE_NAMESPACE` defaults to `default`; actions also need `virtctl` |
| 6in4, ndpresponder | Linux `ip`; read-only IPv6 addresses and routes |

For a remote host, run its adapter over noninteractive SSH. This Claude Code example uses the same `command` and `args` that Codex and OpenClaw accept in their respective structures above:

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

Call `integration_info` for prerequisites, then `list_instances` and `instance_status`. The default is read-only. Set `ONECLICKVIRT_MCP_ALLOW_WRITE=1` on the intended host to expose `instance_action` for start, graceful stop, and restart. There are no deletion, reinstall, or arbitrary shell tools.

## Probe binaries and version updates

`basics`, `backtrace`, `gostun`, `portchecker`, `pingtest`, `nt3`, `speedtest`, `CommonMediaTests`, `UnlockTests`, CPU/memory/disk probes, and ECS can install their published native program:

```bash
python3 install_agent.py --client codex --install-binary
```

Binaries default to `~/.local/bin`. Use `--bin-dir` for another location, or `--binary /absolute/path/to/program` to reuse an existing executable. `--version` selects the probe Release tag; `--ref` selects integration source independently. ClawChimera uses the official ECS Release.

The installer selects an actual asset for the current OS and architecture, then verifies GitHub's SHA-256 digest or the matching entry in `checksums.txt` / `SHA256SUMS`. Missing assets or failed verification stop installation. Unknown architectures never fall back to amd64. For reused tags such as `output`, updates still check the current digest rather than trusting a version-only cache. CNB supplies integration source; probe artifacts continue to come from GitHub Releases.

Use `probe_help` to check the installed program, then call a fixed `run_probe` preset. CPU, memory, and disk presets require `ONECLICKVIRT_MCP_ALLOW_BENCHMARKS=1` and use bounded workloads. Disk tests use a separate temporary directory. Network probes contact their respective services. The speedtest `registry` preset checks server availability and does not run a full bandwidth test.

The ECS `system` preset disables CPU, memory, disk, media, IP security, network speed tests, logs, and public uploads, with a 25-second structured-test deadline. ECS still performs its own basic network preflight and NAT/STUN checks. Preserve `partial`, `unavailable`, or `timeout` results as reported. For a full test, select the intended scope using ECS's existing help.

ClawChimera's existing `bash run.sh` entry also requires Python 3.9+. Probe arguments still pass through to ECS. Run `bash run.sh -h` to read the current program's help; `ECS_VERSION` can pin an exact Release tag. The entry verifies the Release and SHA-256 on each invocation and separates cached binaries by digest. Its package includes the required scripts and configuration.

## Image and statistics queries

Image repository tools return actual Release tags, asset names, sizes, digests, and download URLs through `release_assets`. `latest` is only the most recently published Release. For a particular distribution, pass its exact tag and use `filter` for the requested architecture. An empty match means that no matching artifact is available.

`hitscounter` exposes only `/api/monthly` statistics and does not increment counters. Set `ONECLICKVIRT_COUNTER_URL` to the HTTPS address of an existing deployment. Counter creation continues to use the existing administration process.

## Verify a connection

Check that the client lists tools, missing native commands produce clear errors, and a read-only connection does not expose `instance_action`. Use a separate disposable instance for lifecycle testing, confirm its actual state, and clean up the test resource afterward.

The organization's [cross-platform checks](https://github.com/oneclickvirt/oneclickvirt/actions/workflows/agent-integrations.yml) and [native runtime checks](https://github.com/oneclickvirt/oneclickvirt/actions/workflows/agent-runtime.yml) validate installation, protocol behavior, and specific runtimes. A successful handshake, actual binary execution, and a booted guest establish different results; consult the relevant run for its tested scope.
