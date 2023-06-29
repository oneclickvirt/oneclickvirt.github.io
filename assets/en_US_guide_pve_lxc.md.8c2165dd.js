import{_ as s,o as a,c as l,R as n}from"./chunks/framework.1625126e.js";const d=JSON.parse('{"title":"LXC虚拟化","description":"","frontmatter":{},"headers":[],"relativePath":"en_US/guide/pve_lxc.md","filePath":"en_US/guide/pve_lxc.md","lastUpdated":1688046308000}'),p={name:"en_US/guide/pve_lxc.md"},o=n('<h1 id="lxc虚拟化" tabindex="-1">LXC虚拟化 <a class="header-anchor" href="#lxc虚拟化" aria-label="Permalink to &quot;LXC虚拟化&quot;">​</a></h1><h2 id="单独开设lxc虚拟化的ct" tabindex="-1">单独开设LXC虚拟化的CT <a class="header-anchor" href="#单独开设lxc虚拟化的ct" aria-label="Permalink to &quot;单独开设LXC虚拟化的CT&quot;">​</a></h2><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>初次使用前需要保证当前PVE纯净且宿主机未进行过任何端口映射，否则设置冲突可能出现BUG</p></div><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>开设前请使用screen挂起执行，避免批量开设时间过长，SSH不稳定导致中间执行中断</p></div><ul><li>自动开设NAT服务器，默认使用Debian11镜像，也可自定义系统</li><li>自动进行内外网端口映射，含22，80，443端口以及其他25个内外网端口号一样的端口</li><li>生成后需要等待一段时间虚拟机内部配置好网络以及登陆信息，大概需要3分钟</li><li>默认开设的网络配置为：22，80，443端口及一个25个端口区间的内外网映射</li><li>可自定义开设的核心数，内存大小，硬盘大小，使用宿主机哪个存储盘，记得自己计算好空闲资源开设</li><li>可在命令中指定存储盘位置，默认不指定时为local盘即系统盘，可指定为PVE中显示的挂载盘</li><li>开设的CT默认已启用SSH且允许root登陆，且已设置支持使用docker的嵌套虚拟化</li><li>容器的相关信息将会存储到对应的容器的NOTE中，可在WEB端查看</li></ul><p>国际</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">curl</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-L</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">https://raw.githubusercontent.com/spiritLHLS/pve/main/scripts/buildct.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-o</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">buildct.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">chmod</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">+x</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">buildct.sh</span></span></code></pre></div><p>国内</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">curl</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-L</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">https://ghproxy.com/https://raw.githubusercontent.com/spiritLHLS/pve/main/scripts/buildct.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-o</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">buildct.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">chmod</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">+x</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">buildct.sh</span></span></code></pre></div><h4 id="使用方法" tabindex="-1">使用方法 <a class="header-anchor" href="#使用方法" aria-label="Permalink to &quot;使用方法&quot;">​</a></h4><ul><li>系统支持：</li></ul><ul><li>debian10，debian11</li><li>ubuntu18，ubuntu20，ubuntu22</li><li>centos8，almalinux9</li><li>其他系统可能支持可能不支持，自行测试</li></ul><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>系统参数一律是小写的系统名字拼接版本号，具体可执行<code>pveam available --section system</code>查看可用的系统名字和版本号。 (注意脚本使用的参数只有小写的英文系统名字拼接版本号)</p></div><p>所有系统的CT默认用户名是root</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">./buildct.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">CTID</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">密码</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">CPU核数</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">内存</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">硬盘</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">SSH端口</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">80</span><span style="color:#C3E88D;">端口</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">443</span><span style="color:#C3E88D;">端口</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">外网端口起</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">外网端口止</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">系统</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">存储盘</span></span></code></pre></div><h4 id="测试示例" tabindex="-1">测试示例 <a class="header-anchor" href="#测试示例" aria-label="Permalink to &quot;测试示例&quot;">​</a></h4><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">./buildct.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">102</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1234567</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">512</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">5</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">20001</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">20002</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">20003</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">30000</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">30025</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">debian11</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">local</span></span></code></pre></div><p>开设完毕可执行<code>cat ct102</code>查看信息，或在web端的NOTES查看</p><ul><li>以下为开设的示例CT的信息：</li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">`VMID` - 102</span></span>\n<span class="line"><span style="color:#A6ACCD;">`SSH登录的用户名` - root</span></span>\n<span class="line"><span style="color:#A6ACCD;">`SSH登录的密码` - 1234567</span></span>\n<span class="line"><span style="color:#A6ACCD;">`CPU核数` - 1   </span></span>\n<span class="line"><span style="color:#A6ACCD;">`内存大小` - 512MB</span></span>\n<span class="line"><span style="color:#A6ACCD;">`磁盘大小` - 5G   </span></span>\n<span class="line"><span style="color:#A6ACCD;">`SSH端口` - 20001</span></span>\n<span class="line"><span style="color:#A6ACCD;">`80端口` - 20002</span></span>\n<span class="line"><span style="color:#A6ACCD;">`443端口` - 20003</span></span>\n<span class="line"><span style="color:#A6ACCD;">`内外网映射端口一致的区间` - 30000到30025</span></span>\n<span class="line"><span style="color:#A6ACCD;">`系统` - debian11</span></span>\n<span class="line"><span style="color:#A6ACCD;">`宿主机的存储盘` - local</span></span></code></pre></div><h4 id="删除示例" tabindex="-1">删除示例 <a class="header-anchor" href="#删除示例" aria-label="Permalink to &quot;删除示例&quot;">​</a></h4><ul><li>停止CT</li><li>删除CT</li><li>删除端口映射</li><li>重启网络</li><li>删除log文件</li></ul><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">pct</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">stop</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">102</span></span>\n<span class="line"><span style="color:#FFCB6B;">pct</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">destroy</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">102</span></span>\n<span class="line"><span style="color:#FFCB6B;">rm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-rf</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">ct102</span></span>\n<span class="line"><span style="color:#FFCB6B;">iptables</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-t</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">nat</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-F</span></span>\n<span class="line"><span style="color:#FFCB6B;">iptables</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-t</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">filter</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-F</span></span>\n<span class="line"><span style="color:#FFCB6B;">service</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">networking</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">restart</span></span>\n<span class="line"><span style="color:#FFCB6B;">systemctl</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">restart</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">networking.service</span></span></code></pre></div><h2 id="批量开设nat的lxc虚拟化的ct" tabindex="-1">批量开设NAT的LXC虚拟化的CT <a class="header-anchor" href="#批量开设nat的lxc虚拟化的ct" aria-label="Permalink to &quot;批量开设NAT的LXC虚拟化的CT&quot;">​</a></h2><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>初次使用前需要保证当前PVE纯净且宿主机未进行过任何端口映射，否则设置冲突可能出现BUG</p></div><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>开设前请使用screen挂起执行，避免批量开设时间过长，SSH不稳定导致中间执行中断</p></div><ul><li>可多次运行批量生成CT容器，但需要注意的是母鸡内存记得开点swap免得机器炸了<a href="https://github.com/spiritLHLS/addswap" target="_blank" rel="noreferrer">开SWAP点我跳转</a></li><li>每个容器创建之间有间隔等待60秒避免突发性能不足</li><li>可自定义批量开设的核心数，内存大小，硬盘大小，使用宿主机哪个存储盘，记得自己计算好空闲资源开设</li><li>开设的CT默认已启用SSH且允许root登陆，且已设置支持使用docker的嵌套虚拟化</li><li>容器的相关信息将会存储到对应的容器的NOTE中，可在WEB端查看</li></ul><p>国际</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">curl</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-L</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">https://raw.githubusercontent.com/spiritLHLS/pve/main/scripts/create_ct.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-o</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">create_ct.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">chmod</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">+x</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">create_ct.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">bash</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">create_ct.sh</span></span></code></pre></div><p>国内</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">curl</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-L</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">https://ghproxy.com/https://raw.githubusercontent.com/spiritLHLS/pve/main/scripts/create_ct.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-o</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">create_ct.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">chmod</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">+x</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">create_ct.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">bash</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">create_ct.sh</span></span></code></pre></div><p>开设完毕可执行<code>cat ctlog</code>查看信息，或在web端的NOTES查看</p><h4 id="删除所有ct" tabindex="-1">删除所有CT <a class="header-anchor" href="#删除所有ct" aria-label="Permalink to &quot;删除所有CT&quot;">​</a></h4><ul><li>删除所有CT</li><li>删除所有nat的端口映射</li><li>重启网络</li><li>删除log文件</li></ul><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">pct</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">list</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">awk</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">NR&gt;1{print $1}</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">xargs</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-I</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">{}</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">sh</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-c</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">pct stop {}; pct destroy {}</span><span style="color:#89DDFF;">&#39;</span></span>\n<span class="line"><span style="color:#FFCB6B;">rm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-rf</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">ct</span><span style="color:#A6ACCD;">*</span></span>\n<span class="line"><span style="color:#FFCB6B;">iptables</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-t</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">nat</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-F</span></span>\n<span class="line"><span style="color:#FFCB6B;">iptables</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-t</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">filter</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-F</span></span>\n<span class="line"><span style="color:#FFCB6B;">service</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">networking</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">restart</span></span>\n<span class="line"><span style="color:#FFCB6B;">systemctl</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">restart</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">networking.service</span></span></code></pre></div>',35),e=[o];function t(c,C,r,i,y,A){return a(),l("div",null,e)}const h=s(p,[["render",t]]);export{d as __pageData,h as default};
