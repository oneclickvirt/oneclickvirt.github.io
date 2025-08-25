---
outline: deep
---

# Running QEMU Virtualized Linux Virtual Machines in Incus

## Available Images for QEMU Virtual Machines

Here are some of the available system parameters for your reference:

- debian10, debian11, debian12, debian13
- ubuntu18, ubuntu20, ubuntu22
- centos8, centos9 (actually deployed as Stream versions)
- alpine3.15, alpine3.16, alpine3.17, alpine3.18
- openwrt21, openwrt22, fedora37, fedora38, fedora39
- rockylinux8, rockylinux9, oracle8, oracle9
- oracle7, centos7 (all require enabling CGroupV1 in GRUB, otherwise they won't start - see FAQ for details)
- kali, archlinux

* Note that all are combinations of **lowercase letters + numbers** or **lowercase letters only**. Try them yourself - if the system is not found in the search, the script will automatically exit.
* Version numbers can include English decimal points to accommodate Alpine version numbers.
* Systems that fail to start may be due to insufficient disk space, memory, or incompatibility with the host machine. Check the error messages for systems that won't start.
* Currently, only [self-compiled](https://github.com/oneclickvirt/incus_images) images are used for virtual machine systems. Non-self-compiled images lack dependencies and configurations and cannot be used.
* Complete list of supported systems for self-compiled images: [kvm_images](https://github.com/oneclickvirt/incus_images/releases/tag/kvm_images)

## Creating a Single NAT Server

- Create only one NAT server with customizable limitations for all content

### Download Script

International:

```shell
curl -L https://raw.githubusercontent.com/oneclickvirt/incus/main/scripts/buildvm.sh -o buildvm.sh && chmod +x buildvm.sh && dos2unix buildvm.sh
```

Domestic (China):

```shell
curl -L https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/incus/main/scripts/buildvm.sh -o buildvm.sh && chmod +x buildvm.sh && dos2unix buildvm.sh
```

### Usage

```
./buildvm.sh ServerName CPUCores MemorySize DiskSize SSHPort ExternalStartPort ExternalEndPort DownloadSpeed UploadSpeed EnableIPV6(Y or N) System(leave empty for debian11)
```

CPU cores must be less than or equal to the host machine's cores. Memory size is calculated in MB, disk size in GB, download and upload speeds in Mbit. EnableIPV6 doesn't necessarily need to be Y or N - it can be omitted, defaulting to disabled IPV6.

If both ```ExternalStartPort``` and ```ExternalEndPort``` are set to 0, no external port range mapping will be performed - only the basic SSH port will be mapped. Note that these ```cannot be empty``` - set them to 0 if no mapping is needed.

Supports custom server systems. When left empty, debian13 is used by default. Note that the parameter should be system name + version number.

Except for Alpine systems, all other systems require disk size greater than 6G, otherwise the system won't start, cannot initialize and function, and will crash during the setup process.

### Example

Here's the information for the example server being created:

| Property                           | Value          |
|-----------------------------------|----------------|
| Server Name                       | test           |
| SSH Login Username               | root           |
| SSH Login Password               | Randomly generated |
| CPU Cores                        | 1              |
| Memory Size                      | 256MB          |
| Disk Size                        | 10G            |
| Internal/External Port Mapping Range | 20002 to 20025 |
| Upload Bandwidth                 | 500Mbit        |
| Download Bandwidth               | 500Mbit        |
| Auto-configure External IPV6     | N              |
| System                           | debian13       |

```shell
./buildvm.sh test 1 512 10 20001 20002 20025 500 500 N debian13
```

To enter the virtual machine, execute:

```shell
incus console test
```

To exit, first press and hold ```Ctrl``` then press ```a```, release them, then press ```q```.

To view information, execute:

```shell
cat ServerName
```

For example, to query the example's information:

```shell
cat test
```

### Delete Test Server

```shell
incus stop -f test
incus delete -f test
rm -rf test
rm -rf test_v6
ls
```