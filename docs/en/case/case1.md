---
outline: deep
---

# ECS

[![Build and Release](https://github.com/oneclickvirt/ecs/actions/workflows/build_binary.yaml/badge.svg)](https://github.com/oneclickvirt/ecs/actions/workflows/build_binary.yaml)

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Foneclickvirt%2Fecs.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Foneclickvirt%2Fecs?ref=badge_shield)

[![Hits](https://hits.spiritlhl.net/goecs.svg?action=hit&title=Hits&title_bg=%23555555&count_bg=%230eecf8&edge_flat=false)](https://hits.spiritlhl.net) [![Downloads](https://ghdownload.spiritlhl.net/oneclickvirt/ecs?color=36c600)](https://github.com/oneclickvirt/ecs/releases)

ECS is the Go-based benchmark and diagnostics suite from the oneclickvirt project.

Repository: https://github.com/oneclickvirt/ecs

Issue tracker: https://github.com/oneclickvirt/ecs/issues

Shell edition: https://github.com/spiritLHLS/ecs/blob/main/README_EN.md

## Overview

- Collects system and network basics through [basics](https://github.com/oneclickvirt/basics) and [gostun](https://github.com/oneclickvirt/gostun)
- Runs CPU, memory, and disk tests through [cputest](https://github.com/oneclickvirt/cputest), [memorytest](https://github.com/oneclickvirt/memorytest), and [disktest](https://github.com/oneclickvirt/disktest)
- Checks media unlock status with [UnlockTests](https://github.com/oneclickvirt/UnlockTests)
- Queries IP quality and security details through [securityCheck](https://github.com/oneclickvirt/securityCheck)
- Tests mail ports with [portchecker](https://github.com/oneclickvirt/portchecker)
- Runs route and network tests through [backtrace](https://github.com/oneclickvirt/backtrace), [nt3](https://github.com/oneclickvirt/nt3), [speedtest](https://github.com/oneclickvirt/speedtest), and [pingtest](https://github.com/oneclickvirt/pingtest)
- Supports root/admin environments, non-root/non-admin environments, and offline execution
- Online testing without DNS is still not supported

First-time users should read the upstream getting-started guide first:

https://github.com/oneclickvirt/ecs/blob/master/README_NEW_USER.md

## Supported Systems And Architectures

| Supported for Compilation | Tested on | Supported OS for Compilation | Tested OS |
|---------------------------|-----------|------------------------------|-----------|
| amd64                     | amd64     | Linux                        | Linux     |
| arm64                     | arm64     | Windows                      | Windows   |
| arm                       |           | macOS (Darwin)               | macOS     |
| 386                       |           | FreeBSD                      |           |
| mips, mipsle              |           | Android                      |           |
| mips64, mips64le          |           |                              |           |
| ppc64, ppc64le            |           |                              |           |
| s390x                     | s390x     |                              |           |
| riscv64                   |           |                              |           |

Systems still pending support:

| OS | Notes |
|----|-------|
| OpenBSD / NetBSD | Some official Golang libraries are still unsupported there, especially network-related ones. |

## Quick Start

The one-line installer below defaults to:

- no dependency installation
- no package manager update
- non-interactive mode

```bash
export noninteractive=true && curl -L https://raw.githubusercontent.com/oneclickvirt/ecs/master/goecs.sh -o goecs.sh && chmod +x goecs.sh && ./goecs.sh install && goecs -l en
```

Short link:

```bash
export noninteractive=true && curl -L https://bash.spiritlhl.net/goecs -o goecs.sh && chmod +x goecs.sh && ./goecs.sh install && goecs -l en
```

## Step-By-Step Usage

1. Download the installer script:

```bash
curl -L https://raw.githubusercontent.com/oneclickvirt/ecs/master/goecs.sh -o goecs.sh && chmod +x goecs.sh
```

2. Optionally install dependencies and prepare the environment:

```bash
./goecs.sh env
```

Non-interactive mode:

```bash
export noninteractive=true && ./goecs.sh env
```

3. Install the `goecs` binary:

```bash
./goecs.sh install
```

4. Upgrade `goecs`:

```bash
./goecs.sh upgrade
```

5. Uninstall `goecs`:

```bash
./goecs.sh uninstall
```

6. Show installer help:

```bash
./goecs.sh -h
```

7. Launch the menu directly:

```bash
goecs -l en
```

## Common Runtime Flags

Use `goecs -h` to view the full parameter list. The most commonly used options are:

- `-menu=false`: run without the interactive menu
- `-l en` or `-l zh`: set the interface language
- `-cpu-method sysbench|geekbench|winsat`: choose the CPU test backend
- `-cpu-thread single|multi`: switch between single-core and multi-core CPU tests
- `-memory-method stream|sysbench|dd|winsat|auto`: choose the memory test method
- `-disk-method fio|dd|winsat`: choose the disk test method
- `-diskp /path/to/test`: choose the disk test path
- `-speed=false`, `-security=false`, `-ut=false`: disable individual modules when needed
- `-spnum 2`: set the number of speed test servers per carrier
- `-upload=false`: do not upload the share result

## Windows

1. Download the release archive that contains the `.exe` binary: [Releases](https://github.com/oneclickvirt/ecs/releases)
2. Extract it, then run it as Administrator.

Notes:

- In virtual machines, running without Administrator privileges is often still acceptable because ECS will fall back to substitute test methods when native tools are unavailable.
- Avoid the builds labeled with `GUI` for now. The standard CI release archives are the stable choice.

## Docker

Docker image: https://hub.docker.com/r/spiritlhl/goecs

Make sure Docker is already installed before running the examples below.

Privileged mode with host networking:

```shell
docker run --rm --privileged --network host spiritlhl/goecs:latest -menu=false -l=en
```

Unprivileged mode without host networking:

```shell
docker run --rm spiritlhl/goecs:latest -menu=false -l=en
```

Docker-based runs are convenient, but hardware-related results and virtualization detection can be less accurate. Direct execution on the host remains the recommended approach.

## Build From Source

1. Clone the public branch:

```bash
git clone -b public https://github.com/oneclickvirt/ecs.git
cd ecs
```

2. Install Go 1.25.4 or newer.

3. Build the binary:

```bash
go build -o goecs
```

4. Run a non-interactive English test:

```bash
./goecs -menu=false -l=en
```

Supported compile targets:

- `GOOS`: `linux`, `windows`, `darwin`, `freebsd`, `openbsd`
- `GOARCH`: `amd64`, `arm`, `arm64`, `386`, `mips`, `mipsle`, `s390x`, `riscv64`

Cross-compile examples:

```bash
GOOS=windows GOARCH=amd64 go build -o goecs.exe
GOOS=darwin GOARCH=amd64 go build -o goecs_darwin
```

## FAQ

#### Why does ECS use sysbench by default instead of geekbench?

`sysbench` is lighter, more stable across environments, and easier to compare historically. `geekbench` is still supported, but it requires a heavier online environment and its scores vary more across major versions.

#### Why was the project rewritten in Golang instead of Rust?

Most upstream tooling and surrounding ecosystem components are already maintained in Golang, so it is the more practical choice for this project.

#### Why not continue with the Shell edition only?

Prebuilt binaries are much easier to run across inconsistent environments. That reduces environment-specific failures and makes the tool easier to distribute.

#### Are there explanations for every individual test item?

Yes. Each test module has its own upstream repository. Follow the component links in the overview section for implementation details and project-specific notes.

#### How do I stop a running test?

Press `Ctrl+C`. ECS will still keep the already collected results in the current directory and retain the generated share link information.

#### How can I use ECS in a non-root environment?

Try the manual installation flow first. If dependency installation is not possible, download the matching release archive, extract it, and run the binary directly. Docker is another fallback when it is available.

## Notes

- The upstream repository remains the source of truth for the latest release assets and low-level usage details: https://github.com/oneclickvirt/ecs
- The shell implementation remains available separately: https://github.com/spiritLHLS/ecs
