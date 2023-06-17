## 项目特点

通过docker批量或单独开设NAT服务器(Bulk or individual NAT server provisioning via docker)

默认使用debian系统，每个容器自带1个外网ssh端口，25个内外网一致端口

默认创建的是非特权容器，且不挂载与宿主机的docker的守护进程之间的通信，所以**宿主机创建的docker虚拟化的NAT服务器内无法再嵌套虚拟化docker**

由于只是在宿主机进行了CPU和内存的限制未在容器内使用cgroup驱动，所以在容器内使用服务器测试脚本检测容器的可用资源是无效的，显示的会是宿主机的资源

由于大部分云服务器xfs文件系统不启用pquota选项，所以**默认共享宿主机硬盘，无法限制每个容器的磁盘大小**

## 配置要求

系统可安装docker即可用，网络能连接Github的raw界面就能用，硬件配置只要不拉跨就行，空闲硬盘有3G就行

推荐在开设NAT服务器前先增加部分SWAP虚拟内存，避免突发的内存占用导致母鸡卡死 [跳转](https://github.com/spiritLHLS/addswap)

PS: 如果硬件资源只是好了一点，需要限制更多东西并需要配置IPV6独立地址和限制硬盘大小，可使用LXD批量开LXC虚拟化的容器 [跳转](https://github.com/spiritLHLS/lxc)

PS: 如果硬件非常好资源很多，可使用PVE批量开KVM虚拟化的虚拟机 [跳转](https://github.com/spiritLHLS/pve)