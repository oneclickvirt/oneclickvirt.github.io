import{_ as e,o as a,c as t,R as i}from"./chunks/framework.1625126e.js";const b=JSON.parse('{"title":"系统与硬件配置要求","description":"","frontmatter":{},"headers":[],"relativePath":"en_US/guide/lxd_precheck.md","filePath":"en_US/guide/lxd_precheck.md","lastUpdated":1687228716000}'),l={name:"en_US/guide/lxd_precheck.md"},s=i('<h1 id="系统与硬件配置要求" tabindex="-1">系统与硬件配置要求 <a class="header-anchor" href="#系统与硬件配置要求" aria-label="Permalink to &quot;系统与硬件配置要求&quot;">​</a></h1><h2 id="要求" tabindex="-1">要求 <a class="header-anchor" href="#要求" aria-label="Permalink to &quot;要求&quot;">​</a></h2><p>硬件要求:</p><ul><li>系统：Debian 8+, Ubuntu 18+(推荐)，系统越新越好</li><li>虚拟化：推荐KVM、VMWARE虚拟化</li><li>内存：内存至少512MB</li><li>硬盘：硬盘(系统盘)至少10G</li><li>网络：独立的IPV4地址，IPV6可有可无，带宽能下载脚本就行，网络能连接Github的raw页面就行</li></ul><p>PS: 如果硬件非常好资源很多，可使用PVE批量开KVM虚拟化的虚拟机 <a href="https://github.com/spiritLHLS/pve" target="_blank" rel="noreferrer">跳转</a></p><p>PS: 如果硬件资源更烂，虚拟化不支持，可使用docker版本的，适配面更广 <a href="https://github.com/spiritLHLS/docker" target="_blank" rel="noreferrer">跳转</a></p><h2 id="项目特点" tabindex="-1">项目特点 <a class="header-anchor" href="#项目特点" aria-label="Permalink to &quot;项目特点&quot;">​</a></h2><ul><li><p>本套脚本开发使用的Ubuntu20，Ubuntu别的长期维护版本应该也没问题，Debian无法使用zfs时自动切换别的存储类型</p></li><li><p>已设置同时进行TCP和UDP转发，除了SSH端口其他的映射内网外网端口一致</p></li><li><p>已设置支持开出的LXC容器进行docker嵌套虚拟，默认普通版本和纯探针版本使用debian11系统</p></li><li><p>已屏蔽容器内可能用于滥用的工具包和IPV4网络的TCP/UDP协议的端口( 3389 8888 54321 65432 )，以防止容器被用于扫描和爆破，且可外置进程检查有问题自动停机</p></li><li><p>已支持一键为LXC容器配置IPV6地址(前提是母鸡有IPV6子网，无IPV6地址则不配置)</p></li><li><p>一定要在 <code>/root</code> 的路径下运行本仓库脚本，且使用<code>一键脚本</code>的<strong>不要删除</strong>路径下的<code>ssh.sh</code>和<code>config.sh</code>文件</p></li><li><p>保证你要开的盘为默认的系统盘(sda或者sda1)而不是挂载的盘(sdb之类的)，不确定的使用<code>fdisk -l</code>和<code>df</code>查看</p></li><li><p>挂载其他盘的详看 <a href="https://github.com/spiritLHLS/lxc/blob/main/README_other.md" target="_blank" rel="noreferrer">其他说明</a></p></li><li><p>一键脚本支持自定义限制所有内容，普通版本支持多次运行批量生成不覆盖先前生成的配置</p></li></ul><h2 id="检测环境" tabindex="-1">检测环境 <a class="header-anchor" href="#检测环境" aria-label="Permalink to &quot;检测环境&quot;">​</a></h2><p><strong>使用后续脚本的务必执行本命令检测母鸡是否符合要求</strong></p><p>国际</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">bash &lt;(wget -qO- --no-check-certificate https://raw.githubusercontent.com/spiritLHLS/lxc/main/scripts/pre_check.sh)</span></span></code></pre></div><p>国内</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">bash &lt;(wget -qO- --no-check-certificate https://ghproxy.com/https://raw.githubusercontent.com/spiritLHLS/lxc/main/scripts/pre_check.sh)</span></span></code></pre></div>',14),r=[s];function c(o,p,n,d,h,u){return a(),t("div",null,r)}const g=e(l,[["render",c]]);export{b as __pageData,g as default};
