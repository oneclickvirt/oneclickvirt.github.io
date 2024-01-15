import{_ as e,v as o,b as a,R as r}from"./chunks/framework.70afa331.js";const _=JSON.parse('{"title":"前言","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"guide/docker/docker_precheck.md","filePath":"guide/docker/docker_precheck.md","lastUpdated":1705324601000}'),c={name:"guide/docker/docker_precheck.md"},t=r('<h1 id="前言" tabindex="-1">前言 <a class="header-anchor" href="#前言" aria-label="Permalink to &quot;前言&quot;">​</a></h1><p>以下为非自定义部分的介绍，自定义部分有自己对应的介绍，勿弄混了</p><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>如果宿主机带IPV6网络的话，安装会改变宿主机的网络结构，请保证宿主机随时可重置系统，且运行前无重要数据在宿主机上</p></div><p>如果你的宿主机本身没有IPV6的子网又想给容器分配IPV6地址，那么请先查看<code>LXD</code>模块中的<code>自定义</code>分区中的<code>给宿主机附加免费的IPV6地址段</code>的内容，给宿主机附加上IPV6子网后再进行环境安装</p><h2 id="项目特点" tabindex="-1">项目特点 <a class="header-anchor" href="#项目特点" aria-label="Permalink to &quot;项目特点&quot;">​</a></h2><p>通过docker批量或单独开设NAT服务器(Bulk or individual NAT server provisioning via docker)</p><p>默认使用debian系统可选alpine系统，每个容器自带1个外网ssh端口，25个内外网一致端口，可选择是否绑定IPV6地址</p><p>默认创建的是非特权容器，且不挂载与宿主机的docker的守护进程之间的通信，所以<strong>宿主机创建的docker虚拟化的NAT服务器内无法再嵌套虚拟化docker</strong></p><p>默认安装并启用lxcfs，使得在容器内的查询资源时CPU和内存使用的是配置的视图而不是宿主机的视图</p><p>由于大部分云服务器是ext4文件系统，docker默认的存储引擎是overlayfs2，即便宿主机的文件系统是xfs，默认也不会启用pquota选项，所以<strong>默认共享宿主机硬盘，无法限制每个容器的磁盘大小</strong></p><h2 id="配置要求" tabindex="-1">配置要求 <a class="header-anchor" href="#配置要求" aria-label="Permalink to &quot;配置要求&quot;">​</a></h2><p>系统可安装docker即可用，网络能连接Github的raw界面就能用，硬件配置只要不拉跨就行，空闲硬盘有3G就行</p><p>(如果需要绑定IPV6地址，那么请保证使用本套脚本的环境预设脚本进行环境安装，需要它自动预设部分设置)</p><p>如果硬件资源只是好了一点，需要限制更多东西并需要限制硬盘大小，可使用LXD分区的脚本批量开LXC虚拟化的容器</p><p>如果硬件非常好资源很多，可使用PVE分区的脚本批量开KVM虚拟化的虚拟机</p><p>推荐在开设NAT服务器前先增加部分SWAP虚拟内存，避免突发的内存占用导致宿主机卡死</p>',16),d=[t];function s(p,i,n,l,h,k){return o(),a("div",null,d)}const P=e(c,[["render",s]]);export{_ as __pageData,P as default};
