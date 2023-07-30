import{_ as s,o as a,c as e,R as l}from"./chunks/framework.1625126e.js";const y=JSON.parse('{"title":"系统和硬件配置要求","description":"","frontmatter":{},"headers":[],"relativePath":"guide/pve_precheck.md","filePath":"guide/pve_precheck.md","lastUpdated":1690716953000}'),p={name:"guide/pve_precheck.md"},t=l('<h1 id="系统和硬件配置要求" tabindex="-1">系统和硬件配置要求 <a class="header-anchor" href="#系统和硬件配置要求" aria-label="Permalink to &quot;系统和硬件配置要求&quot;">​</a></h1><p>如果有未适配的商家或机器欢迎联系<a href="https://t.me/spiritlhl_bot" target="_blank" rel="noreferrer">@spiritlhl_bot</a>，有空会尝试支持一下</p><h2 id="各种要求" tabindex="-1">各种要求 <a class="header-anchor" href="#各种要求" aria-label="Permalink to &quot;各种要求&quot;">​</a></h2><p>建议debian在使用前尽量使用最新的稳定版本的系统</p><p>非debian11可使用 <a href="https://github.com/spiritLHLS/one-click-installation-script#%E4%B8%80%E9%94%AE%E5%8D%87%E7%BA%A7%E4%BD%8E%E7%89%88%E6%9C%ACdebian%E4%B8%BAdebian11" target="_blank" rel="noreferrer">debian一键升级</a> 来升级系统</p><p>本项目只适配Debian系统(非Debian无法通过APT源安装，官方只给了Debian的镜像，其他系统只能使用ISO安装)</p><ul><li>系统要求：Debian 8+</li></ul><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>建议debian11而不是debian12，因为后者是beta版本，debian11安装的才是稳定版</p></div><ul><li>硬件要求：2核2G内存<code>x86_64</code>或<code>arm</code>架构服务器硬盘至少20G</li><li>可开KVM的硬件要求：VM-X或AMD-V支持 (部分VPS和全部独服支持)</li><li>如果硬件或系统需求不满足，可使用LXD批量开LXC容器<a href="https://github.com/spiritLHLS/lxc" target="_blank" rel="noreferrer">跳转</a></li></ul><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>内存开点swap免得机器炸了<a href="https://github.com/spiritLHLS/addswap" target="_blank" rel="noreferrer">开SWAP点我跳转</a></p></div><p>开设虚拟内存(SWAP)</p><p>国际</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">curl</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-L</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">https://raw.githubusercontent.com/spiritLHLS/addswap/main/addswap.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-o</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">addswap.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">chmod</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">+x</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">addswap.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">bash</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">addswap.sh</span></span></code></pre></div><p>国内</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">curl</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-L</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">https://ghproxy.com/https://raw.githubusercontent.com/spiritLHLS/addswap/main/addswap.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-o</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">addswap.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">chmod</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">+x</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">addswap.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">bash</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">addswap.sh</span></span></code></pre></div><p><strong>遇到选项不会选的可无脑回车安装，本项目所有脚本内置国内外IP自动判断，使用的是不同的安装源与配置文件，有使用CDN加速镜像下载</strong></p><h2 id="检测环境" tabindex="-1">检测环境 <a class="header-anchor" href="#检测环境" aria-label="Permalink to &quot;检测环境&quot;">​</a></h2><ul><li>本项目相关脚本执行前务必执行本脚本检测环境，如果不符合安装PVE的要求则无法使用后续的脚本</li><li>检测硬件配置是否满足最低要求</li><li>检测硬件环境是否可嵌套虚拟化KVM类型的服务器</li><li>检测系统环境是否可嵌套虚拟化KVM类型的服务器</li><li>不可嵌套虚拟化KVM类型的服务器也可以开LXC虚拟化的服务器，但不推荐安装PVE，不如使用<a href="https://github.com/spiritLHLS/lxc" target="_blank" rel="noreferrer">LXD</a></li></ul><p>国际</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">bash &lt;(wget -qO- --no-check-certificate https://raw.githubusercontent.com/spiritLHLS/pve/main/scripts/check_kernal.sh)</span></span></code></pre></div><p>国内</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">bash &lt;(wget -qO- --no-check-certificate https://ghproxy.com/https://raw.githubusercontent.com/spiritLHLS/pve/main/scripts/check_kernal.sh)</span></span></code></pre></div><br><br>',24),n=[t];function o(r,c,i,h,d,C){return a(),e("div",null,n)}const D=s(p,[["render",o]]);export{y as __pageData,D as default};
