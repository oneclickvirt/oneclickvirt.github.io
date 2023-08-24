import{_ as e,v as r,b as a,R as t}from"./chunks/framework.70afa331.js";const k=JSON.parse('{"title":"前言","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"guide/docker_precheck.md","filePath":"guide/docker_precheck.md","lastUpdated":1692843010000}'),o={name:"guide/docker_precheck.md"},p=t('<h1 id="前言" tabindex="-1">前言 <a class="header-anchor" href="#前言" aria-label="Permalink to &quot;前言&quot;">​</a></h1><p>以下为非自定义部分的介绍，自定义部分有自己对应的介绍，勿弄混了</p><h2 id="项目特点" tabindex="-1">项目特点 <a class="header-anchor" href="#项目特点" aria-label="Permalink to &quot;项目特点&quot;">​</a></h2><p>通过docker批量或单独开设NAT服务器(Bulk or individual NAT server provisioning via docker)</p><p>默认使用debian系统可选alpine系统，每个容器自带1个外网ssh端口，25个内外网一致端口</p><p>默认创建的是非特权容器，且不挂载与宿主机的docker的守护进程之间的通信，所以<strong>宿主机创建的docker虚拟化的NAT服务器内无法再嵌套虚拟化docker</strong></p><p>由于只是在宿主机进行了CPU和内存的限制未在容器内使用cgroup驱动，所以在容器内使用服务器测试脚本检测容器的可用资源是无效的，显示的会是宿主机的资源</p><p>由于大部分云服务器是ext4文件系统，即便是xfs文件系统也不会启用pquota选项，所以<strong>默认共享宿主机硬盘，无法限制每个容器的磁盘大小</strong></p><h2 id="配置要求" tabindex="-1">配置要求 <a class="header-anchor" href="#配置要求" aria-label="Permalink to &quot;配置要求&quot;">​</a></h2><p>系统可安装docker即可用，网络能连接Github的raw界面就能用，硬件配置只要不拉跨就行，空闲硬盘有3G就行</p><p>推荐在开设NAT服务器前先增加部分SWAP虚拟内存，避免突发的内存占用导致母鸡卡死 <a href="https://github.com/spiritLHLS/addswap" target="_blank" rel="noreferrer">跳转</a></p><p>PS: 如果硬件资源只是好了一点，需要限制更多东西并需要配置IPV6独立地址和限制硬盘大小，可使用LXD批量开LXC虚拟化的容器 <a href="https://github.com/spiritLHLS/lxd" target="_blank" rel="noreferrer">跳转</a></p><p>PS: 如果硬件非常好资源很多，可使用PVE批量开KVM虚拟化的虚拟机 <a href="https://github.com/spiritLHLS/pve" target="_blank" rel="noreferrer">跳转</a></p>',13),i=[p];function s(d,c,n,h,l,u){return r(),a("div",null,i)}const f=e(o,[["render",s]]);export{k as __pageData,f as default};
