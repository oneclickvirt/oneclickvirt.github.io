---
outline: deep
---

# 在 LXD 中运行 QEMU 虚拟化的 Linux 虚拟机

## 开设QEMU虚拟机可使用的镜像

这里展示一部分可使用的系统参数供你参考：

- debian10，debian11，debian12, debian13
- ubuntu18，ubuntu20，ubuntu22
- centos8，centos9 (实际开设出来都是Stream版本)
- alpine3.15，alpine3.16，alpine3.17，alpine3.18
- openwrt21，openwrt22，fedora37，fedora38，fedora39
- rockylinux8，rockylinux9，oralce8，oracle9
- oralce7，centos7 (都需要在GRUB中启用CGroupV1否则无法启动，详细介绍见常见问题答疑)
- kali，archlinux

* 注意都是**小写字母+数字**的组合或**仅小写字母**，自行尝试，如果搜索无该系统则会自动退出脚本
* 版本号可以带英文小数点，为了适配alpine的版本号已支持
* 开不起来的可能是硬盘或内存不够大或者本身就不适配宿主机，自行尝试查看开不起来的报错
* 目前使用的虚拟机系统仅使用 [自编译](https://github.com/oneclickvirt/lxd_images) 的镜像，非自编译镜像缺少依赖和设置不可使用
* 自编译镜像完整的支持系统的列表：[kvm_images](https://github.com/oneclickvirt/lxd_images/releases/tag/kvm_images)

## 单独生成一个NAT服务器

- 只生成一个NAT服务器，可自定义限制所有内容

### 下载脚本

国际

```shell
curl -L https://raw.githubusercontent.com/oneclickvirt/lxd/main/scripts/buildvm.sh -o buildvm.sh && chmod +x buildvm.sh && dos2unix buildvm.sh
```

国内

```shell
curl -L https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/lxd/main/scripts/buildvm.sh -o buildvm.sh && chmod +x buildvm.sh && dos2unix buildvm.sh
```

### 使用方法

```
./buildvm.sh 服务器名称 CPU核数 内存大小 硬盘大小 SSH端口 外网起端口 外网止端口 下载速度 上传速度 是否启用IPV6(Y or N) 系统(留空则为debian11)
```

CPU核数需要小于或等于宿主机的核数，内存大小以MB计算，硬盘大小以GB计算，下载速度上传速度以Mbit计算，是否启用IPV6不一定要填Y或者N，没有这个参数也行，留空默认不开启IPV6

如果```外网起端口```和```外网止端口```都设置为0则不做区间外网端口映射了，只映射基础的SSH端口，注意```不能为空```，不进行映射需要设置为0

支持自定义服务器的系统，不填写留空时默认使用debian13，注意传入参数为系统名字+版本号

除了alpine系统，其他系统的硬盘大小必须大于6G，否则系统起不来，无法初始化和使用，开设的中途阶段就会崩溃。

### 示例

以下为开设的示例服务器的信息：

| 属性                        | 值             |
|---------------------------|----------------|
| 服务器名字                  | test           |
| SSH登录的用户名            | root           |
| SSH登录的密码              | 随机生成       |
| CPU核数                   | 1              |
| 内存大小                  | 256MB          |
| 磁盘大小                  | 10G             |
| 内外网映射端口一致的区间  | 20002到20025   |
| 上传带宽                   | 500Mbit        |
| 下载带宽                   | 500Mbit        |
| 自动设置外网IPV6地址      | N              |
| 系统                       | debian13       |

```shell
./buildvm.sh test 1 512 10 20001 20002 20025 500 500 N debian13
```

需要进入虚拟机内部则执行

```shell
lxc console test
```

退出则先按住```Ctrl```再按```a```，松开后，再按```q```。

需要查看信息则执行

```shell
cat 服务器名字
```

比如查询示例的信息就是

```shell
cat test
```

### 删除测试服务器

```shell
lxc stop -f test
lxc delete -f test
rm -rf test
rm -rf test_v6
ls
```