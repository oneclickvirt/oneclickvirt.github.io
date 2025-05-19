

## 手动修补进行安装

```shell
cd /root
apt install snapd -y
snap install distrobuilder --classic
wget https://down.idc.wiki/ISOS/Windows/Server%202022/zh-cn_windows_server_2022_x64_dvd_6c73507d.iso
apt install -y libguestfs-tools wimtools rsync libhivex-bin libwin-hivex-perl wimtools
apt install genisoimage -y || apt install mkisofs -y
sudo distrobuilder repack-windows --windows-arch=amd64 zh-cn_windows_server_2022_x64_dvd_6c73507d.iso zh-cn_windows_server_2022_x64_dvd_6c73507d.incus.iso
rm -rf zh-cn_windows_server_2022_x64_dvd_6c73507d.iso
```

```shell
incus info | grep -i driver:
```

需要看到带有

```
driver: qemu | lxc
```

才可开设虚拟机，否则无法开设

```shell
incus init win22vm --empty --vm
incus config device override win22vm root size=30GiB
incus config set win22vm limits.cpu=3
incus config set win22vm limits.memory=4GiB
incus config device add win22vm vtpm tpm path=/dev/tpm0
incus config device add win22vm install disk source=/root/zh-cn_windows_server_2022_x64_dvd_6c73507d.incus.iso boot.priority=10
incus start win22vm --console=vga
incus console win22vm --type=vga
incus config device remove win22vm install
```

https://github.com/novnc/novnc/releases
