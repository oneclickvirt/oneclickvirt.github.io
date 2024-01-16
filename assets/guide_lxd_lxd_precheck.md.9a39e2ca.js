import{_ as e,v as t,b as a,R as l}from"./chunks/framework.70afa331.js";const g=JSON.parse('{"title":"前言","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"guide/lxd/lxd_precheck.md","filePath":"guide/lxd/lxd_precheck.md","lastUpdated":1705408775000}'),i={name:"guide/lxd/lxd_precheck.md"},r=l('<h1 id="前言" tabindex="-1">前言 <a class="header-anchor" href="#前言" aria-label="Permalink to &quot;前言&quot;">​</a></h1><p>以下为非自定义部分的介绍，自定义部分有自己对应的介绍，勿弄混了</p><p>如果你的宿主机本身没有IPV6的子网又想给容器分配IPV6地址，那么请先查看<code>LXD</code>模块中的<code>自定义</code>分区中的<code>给宿主机附加免费的IPV6地址段</code>的内容，给宿主机附加上IPV6子网后再进行环境安装</p><p>欢迎给项目一个<code>Star</code>进行免费的支持--&gt;<a href="https://github.com/oneclickvirt/lxd" target="_blank" rel="noreferrer">https://github.com/oneclickvirt/lxd</a></p><h2 id="要求" tabindex="-1">要求 <a class="header-anchor" href="#要求" aria-label="Permalink to &quot;要求&quot;">​</a></h2><p>硬件要求:</p><ul><li>系统：Debian 8+, Ubuntu 18+(推荐20.04)</li><li>虚拟化：推荐KVM、VMWARE虚拟化</li><li>内存：内存至少512MB</li><li>硬盘：硬盘(系统盘)至少10G</li><li>网络：独立的IPV4地址，IPV6可有可无，带宽能下载脚本就行，网络能连接Github的raw页面就行</li></ul><p>PS: 如果硬件非常好资源很多，可使用PVE批量开KVM虚拟化的虚拟机 <a href="https://github.com/spiritLHLS/pve" target="_blank" rel="noreferrer">跳转</a></p><p>PS: 如果硬件资源更烂，虚拟化不支持，可使用docker版本的，适配面更广 <a href="https://github.com/spiritLHLS/docker" target="_blank" rel="noreferrer">跳转</a></p><h2 id="项目特点" tabindex="-1">项目特点 <a class="header-anchor" href="#项目特点" aria-label="Permalink to &quot;项目特点&quot;">​</a></h2><ul><li><p>本套脚本开发使用的<strong>Ubuntu20</strong>，Ubuntu别的长期维护版本应该也没问题，某个存储类型无法使用时自动切换</p></li><li><p>已设置同时进行TCP和UDP转发，除了SSH端口其他的映射内网外网端口一致</p></li><li><p>已设置支持开出的LXC容器进行docker嵌套虚拟，默认普通版本和纯探针版本使用debian11系统</p></li><li><p>已设置默认启用lxcfs，使得在容器内的查询资源时使用的是配置的视图而不是宿主机的视图</p></li><li><p>已屏蔽容器内可能用于滥用的工具包和IPV4网络的TCP/UDP协议的端口( 3389 8888 54321 65432 )，以防止容器被用于扫描和爆破，且可外置进程检查有问题自动停机</p></li><li><p>已支持一键为LXC容器配置IPV6地址(前提是宿主机有IPV6子网，无IPV6地址则不配置)，自动适配子网大小</p></li><li><p>已增加清华镜像源，如果官方镜像丢失时，将使用镜像源下载容器镜像</p></li><li><p>保证你要开的盘为默认的系统盘(sda或者sda1)而不是挂载的盘(sdb之类的)，不确定的使用<code>fdisk -l</code>和<code>df</code>查看</p></li><li><p>挂载其他盘的详看 <a href="https://github.com/oneclickvirt/lxd/blob/main/README_other.md" target="_blank" rel="noreferrer">其他说明</a></p></li><li><p>一键脚本支持自定义限制所有内容，普通版本支持多次运行批量生成不覆盖先前生成的配置</p></li></ul><h2 id="检测环境" tabindex="-1">检测环境 <a class="header-anchor" href="#检测环境" aria-label="Permalink to &quot;检测环境&quot;">​</a></h2><p><strong>使用后续脚本的务必执行本命令检测宿主机是否符合要求</strong></p><p>国际</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">bash &lt;(wget -qO- --no-check-certificate https://raw.githubusercontent.com/oneclickvirt/lxd/main/scripts/pre_check.sh)</span></span></code></pre></div><p>国内</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">bash &lt;(wget -qO- --no-check-certificate https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/lxd/main/scripts/pre_check.sh)</span></span></code></pre></div>',17),s=[r];function c(o,p,n,d,h,u){return t(),a("div",null,s)}const k=e(i,[["render",c]]);export{g as __pageData,k as default};
