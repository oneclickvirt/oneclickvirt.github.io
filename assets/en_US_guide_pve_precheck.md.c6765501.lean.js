import{_ as s,v as a,b as e,R as l}from"./chunks/framework.70afa331.js";const u=JSON.parse('{"title":"前言","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"en_US/guide/pve_precheck.md","filePath":"en_US/guide/pve_precheck.md","lastUpdated":1692156328000}'),p={name:"en_US/guide/pve_precheck.md"},n=l('<h1 id="前言" tabindex="-1">前言 <a class="header-anchor" href="#前言" aria-label="Permalink to &quot;前言&quot;">​</a></h1><p>以下为非自定义部分的介绍，自定义部分有自己对应的介绍，勿弄混了</p><p>如果有未适配的商家或机器欢迎联系<a href="https://t.me/spiritlhl_bot" target="_blank" rel="noreferrer">@spiritlhl_bot</a>，有空会尝试支持一下</p><h2 id="各种要求" tabindex="-1">各种要求 <a class="header-anchor" href="#各种要求" aria-label="Permalink to &quot;各种要求&quot;">​</a></h2><p>建议debian在使用前尽量使用最新的稳定版本的系统</p><p><strong>不要在动态IP的服务器上使用本套脚本(重启机器后自动切换本机IP的服务器暂不支持，重启机器后IP不自动切换的支持)</strong></p><p>本项目只适配Debian系统(非Debian无法通过APT源安装，官方只给了Debian的镜像，其他系统只能使用ISO安装)</p><ul><li>系统要求：Debian 8+</li></ul><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>建议debian11而不是debian12，因为后者是beta版本，debian11安装的才是稳定版</p></div><ul><li>硬件要求：2核2G内存<code>x86_64</code>或<code>arm</code>架构服务器硬盘至少20G</li><li>可开KVM的硬件要求：VM-X或AMD-V支持 (部分VPS和全部独服支持)</li><li>如果硬件或系统需求不满足，可使用LXD批量开LXC容器<a href="https://github.com/spiritLHLS/lxd" target="_blank" rel="noreferrer">跳转</a></li></ul><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>内存开点swap免得机器炸了</p></div><p>开设虚拟内存(SWAP)</p><p>单位换算：输入 1024 产生 1G SWAP-虚拟内存，虚拟内存占用硬盘空间，当实际内存不够用时将自动使用虚拟内存做内存使用，但随之带来IO高占用以及CPU性能占用</p><p>建议只开实际内存大小两倍大小的虚拟内存</p><p>Command:</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">curl</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-L</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">https://raw.githubusercontent.com/spiritLHLS/addswap/main/addswap.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-o</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">addswap.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">chmod</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">+x</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">addswap.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">bash</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">addswap.sh</span></span></code></pre></div><h2 id="检测环境" tabindex="-1">检测环境 <a class="header-anchor" href="#检测环境" aria-label="Permalink to &quot;检测环境&quot;">​</a></h2><ul><li>本项目相关脚本执行前务必执行本脚本检测环境，如果不符合安装PVE的要求则无法使用后续的脚本</li><li>检测本机IPV6的网络配置情况(有无IPV6都可安装，只是查询一下罢了)</li><li>检测硬件配置是否满足最低要求</li><li>检测硬件环境是否可嵌套虚拟化KVM类型的服务器</li><li>检测系统环境是否可嵌套虚拟化KVM类型的服务器</li><li>不可嵌套虚拟化KVM类型的服务器也可以开LXC虚拟化的服务器，但不推荐安装PVE，不如使用<a href="https://github.com/spiritLHLS/lxd" target="_blank" rel="noreferrer">LXD</a></li></ul><p>Command:</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">bash</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;(</span><span style="color:#FFCB6B;">wget</span><span style="color:#C3E88D;"> -qO- --no-check-certificate https://raw.githubusercontent.com/spiritLHLS/pve/main/scripts/check_kernal.sh</span><span style="color:#89DDFF;">)</span></span></code></pre></div><p>如果你需要更新IPV6信息再查询，那么执行以下命令后再查询</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">rm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-rf</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">/usr/local/bin/pve_ipv6</span><span style="color:#A6ACCD;">*</span></span></code></pre></div><br><br>',24),t=[n];function o(r,c,i,d,h,C){return a(),e("div",null,t)}const y=s(p,[["render",o]]);export{u as __pageData,y as default};
