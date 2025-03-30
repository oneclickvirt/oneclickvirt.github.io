import{_ as s,v as a,b as l,R as p}from"./chunks/framework.70afa331.js";const D=JSON.parse('{"title":"LXC虚拟化","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"guide/pve/pve_lxc.md","filePath":"guide/pve/pve_lxc.md","lastUpdated":1743306693000}'),n={name:"guide/pve/pve_lxc.md"},o=p(`<h1 id="lxc虚拟化" tabindex="-1">LXC虚拟化 <a class="header-anchor" href="#lxc虚拟化" aria-label="Permalink to &quot;LXC虚拟化&quot;">​</a></h1><h2 id="开设lxc容器可使用的镜像" tabindex="-1">开设LXC容器可使用的镜像 <a class="header-anchor" href="#开设lxc容器可使用的镜像" aria-label="Permalink to &quot;开设LXC容器可使用的镜像&quot;">​</a></h2><p><strong>x86_64：</strong></p><p>自动修补镜像：<a href="https://github.com/oneclickvirt/lxc_amd64_images/blob/main/fixed_images.txt" target="_blank" rel="noreferrer">https://github.com/oneclickvirt/lxc_amd64_images/blob/main/fixed_images.txt</a></p><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>每日自动拉取进行编译和修补</p></div><p>手动修补镜像: <a href="https://github.com/oneclickvirt/pve_lxc_images/blob/main/fixed_images.txt" target="_blank" rel="noreferrer">https://github.com/oneclickvirt/pve_lxc_images/blob/main/fixed_images.txt</a></p><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>其中的部分镜像有缺陷，不保证所有PVE可用，名字为 <code>ubuntu16.04</code>、<code>debian6</code>、<code>centos7</code>、<code>opensuse42.2</code>、<code>opensuse42.3</code> 非必要不要使用。</p></div><p>和</p><p>执行<code>pveam available --section system</code>查看官方可用的系统名字和版本号</p><p>优先级：自修补镜像(Proxmox-VE 5及其以下版本不支持) &gt; 官方默认镜像(都支持)</p><p>已通过脚本自动识别版本使用对应镜像</p><p><strong>arm：</strong></p><p><a href="https://github.com/oneclickvirt/lxc_arm_images/blob/main/fixed_images.txt" target="_blank" rel="noreferrer">https://github.com/oneclickvirt/lxc_arm_images/blob/main/fixed_images.txt</a></p><p>可在上面的文件中查看支持的系统，其中列出的debian和ubuntu系统不要使用里面的别名，使用数字代号即可。</p><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>系统参数一律是小写的系统名字拼接版本号，如：debian11，ubuntu22等。 (自修补镜像支持一些偏门系统，如 centos6、centos7、debian8、debian9 等)</p></div><p><strong>所有系统的CT默认用户名是root</strong></p><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>当然有时候会存在特殊情况，version可能是current/base，此时系统参数仅使用英文系统名字即可，如 archlinux、gentoo、kali。</p></div><h2 id="单独开设lxc虚拟化的ct" tabindex="-1">单独开设LXC虚拟化的CT <a class="header-anchor" href="#单独开设lxc虚拟化的ct" aria-label="Permalink to &quot;单独开设LXC虚拟化的CT&quot;">​</a></h2><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>初次使用前需要保证当前PVE纯净且宿主机未进行过任何端口映射，否则设置冲突可能出现BUG</p></div><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>开设前请使用screen挂起执行，避免批量开设时间过长，SSH不稳定导致中间执行中断</p></div><ul><li>自动开设NAT服务器，默认使用Debian11镜像，也可自定义系统</li><li>自动进行内外网端口映射，含22，80，443端口以及其他25个内外网端口号一样的端口</li><li>生成后需要等待一段时间虚拟机内部配置好网络以及登陆信息，大概需要3分钟</li><li>默认开设的网络配置为：22，80，443端口及一个25个端口区间的内外网映射</li><li>可自定义开设的核心数，内存大小，硬盘大小，使用宿主机哪个存储盘，记得自己计算好空闲资源开设</li><li>可在命令中指定存储盘位置，默认不指定时为local盘即系统盘，可指定为PVE中显示的挂载盘</li><li>开设的CT默认已启用SSH且允许root登陆，且已设置支持使用docker的嵌套虚拟化</li><li>容器的相关信息将会存储到对应的容器的NOTE中，可在WEB端查看</li><li>如果宿主机自带IPV6子网将自动附加上IPV6网络，但无公网IPV6地址</li><li>可选择是否开启独立IPV6，需要宿主机至少有一个/104的子网，最好是一个/64子网</li></ul><h3 id="使用方法" tabindex="-1">使用方法 <a class="header-anchor" href="#使用方法" aria-label="Permalink to &quot;使用方法&quot;">​</a></h3><p><strong>下载脚本</strong></p><p>国际</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">curl</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-L</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">https://raw.githubusercontent.com/oneclickvirt/pve/main/scripts/buildct.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-o</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">buildct.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">chmod</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">+x</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">buildct.sh</span></span></code></pre></div><p>国内</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">curl</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-L</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/pve/main/scripts/buildct.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-o</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">buildct.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">chmod</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">+x</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">buildct.sh</span></span></code></pre></div><p><strong>各参数含义</strong></p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">./buildct.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">CTID</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">密码</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">CPU核数</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">内存</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">硬盘</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">SSH端口</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">80</span><span style="color:#C3E88D;">端口</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">443</span><span style="color:#C3E88D;">端口</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">外网端口起</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">外网端口止</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">系统</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">存储盘</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">独立IPV6</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">默认为N</span><span style="color:#89DDFF;">)</span></span></code></pre></div><h3 id="测试示例" tabindex="-1">测试示例 <a class="header-anchor" href="#测试示例" aria-label="Permalink to &quot;测试示例&quot;">​</a></h3><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">./buildct.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">111</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">oneclick123</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">512</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">5</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">20001</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">20002</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">20003</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">30000</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">30025</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">debian11</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">local</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">N</span></span></code></pre></div><p>开设完毕可执行<code>cat ct111</code>查看信息，或在web端的NOTES查看</p><p>以下为开设的示例CT的信息：</p><table><thead><tr><th>属性</th><th>值</th></tr></thead><tbody><tr><td>CTID</td><td>111</td></tr><tr><td>SSH登录的用户名</td><td>root</td></tr><tr><td>SSH登录的密码</td><td>oneclick123</td></tr><tr><td>CPU核数</td><td>1</td></tr><tr><td>内存大小</td><td>512MB</td></tr><tr><td>磁盘大小</td><td>5G</td></tr><tr><td>SSH端口</td><td>20001</td></tr><tr><td>80端口</td><td>20002</td></tr><tr><td>443端口</td><td>20003</td></tr><tr><td>内外网映射端口一致的区间</td><td>30000到30025</td></tr><tr><td>系统</td><td>debian11</td></tr><tr><td>宿主机的存储盘</td><td>local</td></tr><tr><td>IPV6</td><td>无</td></tr></tbody></table><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>注意这里的CTID仅可使用100到256，其他数字不可用</p></div><h2 id="删除指定容器" tabindex="-1">删除指定容器 <a class="header-anchor" href="#删除指定容器" aria-label="Permalink to &quot;删除指定容器&quot;">​</a></h2><ul><li>停止CT</li><li>删除CT</li><li>删除端口映射</li><li>重启网络</li><li>删除log文件</li></ul><p><strong>下载脚本</strong></p><p>国际</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">curl</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-L</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">https://raw.githubusercontent.com/oneclickvirt/pve/main/scripts/pve_delete.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-o</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">pve_delete.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">chmod</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">+x</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">pve_delete.sh</span></span></code></pre></div><p>国内</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">curl</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-L</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/pve/main/scripts/pve_delete.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-o</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">pve_delete.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">chmod</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">+x</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">pve_delete.sh</span></span></code></pre></div><p><strong>使用方法</strong></p><p>可以删除对应CTID的容器，这里用上文中的示例111做演示</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">./pve_delete.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">111</span></span></code></pre></div><p>实际删除数量不固定，空格分隔每个CTID即可，可一次性删除多个</p><h2 id="批量开设nat的lxc虚拟化的ct" tabindex="-1">批量开设NAT的LXC虚拟化的CT <a class="header-anchor" href="#批量开设nat的lxc虚拟化的ct" aria-label="Permalink to &quot;批量开设NAT的LXC虚拟化的CT&quot;">​</a></h2><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>初次使用前需要保证当前PVE纯净且宿主机未进行过任何端口映射，否则设置冲突可能出现BUG</p></div><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>开设前请使用screen挂起执行，避免批量开设时间过长，SSH不稳定导致中间执行中断</p></div><ul><li>可多次运行批量生成CT容器，但需要注意的是宿主机内存记得开点swap免得机器炸了<a href="https://github.com/spiritLHLS/addswap" target="_blank" rel="noreferrer">开SWAP点我跳转</a></li><li>每个容器创建之间有间隔等待60秒避免突发性能不足</li><li>可自定义批量开设的核心数，内存大小，硬盘大小，使用宿主机哪个存储盘，记得自己计算好空闲资源开设</li><li>开设的CT默认已启用SSH且允许root登陆，且已设置支持使用docker的嵌套虚拟化</li><li>容器的相关信息将会存储到对应的容器的NOTE中，可在WEB端查看</li><li>如果宿主机自带IPV6子网将自动附加上IPV6网络，但无公网IPV6地址</li><li>可选择是否开启独立IPV6，需要宿主机至少有一个/104的子网，最好是一个/64子网</li></ul><p>国际</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">curl</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-L</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">https://raw.githubusercontent.com/oneclickvirt/pve/main/scripts/create_ct.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-o</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">create_ct.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">chmod</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">+x</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">create_ct.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">bash</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">create_ct.sh</span></span></code></pre></div><p>国内</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">curl</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-L</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/pve/main/scripts/create_ct.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-o</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">create_ct.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">chmod</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">+x</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">create_ct.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">bash</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">create_ct.sh</span></span></code></pre></div><p>开设完毕可执行<code>cat ctlog</code>查看信息，或在web端的NOTES查看</p><h3 id="删除所有ct" tabindex="-1">删除所有CT <a class="header-anchor" href="#删除所有ct" aria-label="Permalink to &quot;删除所有CT&quot;">​</a></h3><ul><li>删除所有CT</li><li>删除所有nat的端口映射</li><li>重启网络</li><li>删除log文件</li></ul><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">pct</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">list</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">awk</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">NR&gt;1{print $1}</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">xargs</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-I</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">{}</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">sh</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-c</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">pct stop {}; pct destroy {}</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#FFCB6B;">rm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-rf</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">ct</span><span style="color:#A6ACCD;">*</span></span>
<span class="line"><span style="color:#FFCB6B;">iptables</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-t</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">nat</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-F</span></span>
<span class="line"><span style="color:#FFCB6B;">iptables</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-t</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">filter</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-F</span></span>
<span class="line"><span style="color:#FFCB6B;">service</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">networking</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">restart</span></span>
<span class="line"><span style="color:#FFCB6B;">systemctl</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">restart</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">networking.service</span></span>
<span class="line"><span style="color:#FFCB6B;">systemctl</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">restart</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">ndpresponder.service</span></span>
<span class="line"><span style="color:#FFCB6B;">iptables-save</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">awk</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">{if($1==&quot;COMMIT&quot;){delete x}}$1==&quot;-A&quot;?!x[$0]++:1</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">iptables-restore</span></span>
<span class="line"><span style="color:#FFCB6B;">iptables-save</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">/etc/iptables/rules.v4</span></span></code></pre></div><h2 id="开设纯ipv6地址的虚拟机" tabindex="-1">开设纯IPV6地址的虚拟机 <a class="header-anchor" href="#开设纯ipv6地址的虚拟机" aria-label="Permalink to &quot;开设纯IPV6地址的虚拟机&quot;">​</a></h2><p>前提是宿主机给的是IPV6子网而不是单独一个IPV6地址，且宿主机未开启MAC地址校验</p><h3 id="自动选择ipv6地址无需手动指定" tabindex="-1">自动选择IPV6地址无需手动指定 <a class="header-anchor" href="#自动选择ipv6地址无需手动指定" aria-label="Permalink to &quot;自动选择IPV6地址无需手动指定&quot;">​</a></h3><ul><li>纯IPV6指绑定的公共IPV6地址，实际容器仍旧有宿主机的IPV4网络但无外网IPV4端口</li><li>自动检测可用的IPV6区间，对应容器编号的V6地址绑定到容器上</li><li>系统的相关信息将会存储到对应的容器的NOTE中，可在WEB端查看</li></ul><h4 id="使用方法-1" tabindex="-1">使用方法 <a class="header-anchor" href="#使用方法-1" aria-label="Permalink to &quot;使用方法&quot;">​</a></h4><p><strong>下载脚本</strong></p><p>国际</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">curl</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-L</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">https://raw.githubusercontent.com/oneclickvirt/pve/main/scripts/buildct_onlyv6.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-o</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">buildct_onlyv6.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">chmod</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">+x</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">buildct_onlyv6.sh</span></span></code></pre></div><p>国内</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">curl</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-L</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/pve/main/scripts/buildct_onlyv6.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-o</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">buildct_onlyv6.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">chmod</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">+x</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">buildct_onlyv6.sh</span></span></code></pre></div><p><strong>各参数含义</strong></p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">./buildct_onlyv6.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">CTID</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">密码</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">CPU核数</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">内存大小以MB计算</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">硬盘大小以GB计算</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">系统</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">存储盘</span></span></code></pre></div><h4 id="创建示例" tabindex="-1">创建示例 <a class="header-anchor" href="#创建示例" aria-label="Permalink to &quot;创建示例&quot;">​</a></h4><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">./buildct_onlyv6.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">152</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">oneclick123</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1024</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">10</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">debian12</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">local</span></span></code></pre></div><p>上述命令意义为开设一个纯IPV6地址的容器</p><table><thead><tr><th>属性</th><th>值</th></tr></thead><tbody><tr><td>容器类型</td><td>CT</td></tr><tr><td>CTID</td><td>152</td></tr><tr><td>用户名</td><td>root</td></tr><tr><td>密码</td><td>oneclick123</td></tr><tr><td>CPU核心数</td><td>1</td></tr><tr><td>内存</td><td>1024MB</td></tr><tr><td>硬盘</td><td>10G</td></tr><tr><td>系统</td><td>debian12</td></tr><tr><td>存储盘</td><td>local盘 (系统盘)</td></tr></tbody></table><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>注意这里的CTID仅可使用100到256，其他数字不可用</p></div><h4 id="删除示例" tabindex="-1">删除示例 <a class="header-anchor" href="#删除示例" aria-label="Permalink to &quot;删除示例&quot;">​</a></h4><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">rm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-rf</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">ct</span><span style="color:#A6ACCD;">*</span></span>
<span class="line"><span style="color:#FFCB6B;">pct</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">stop</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">152</span><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#FFCB6B;">pct</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">destroy</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">152</span></span>
<span class="line"><span style="color:#FFCB6B;">systemctl</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">restart</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">ndpresponder.service</span></span></code></pre></div>`,77),t=[o];function e(c,r,C,i,y,d){return a(),l("div",null,t)}const h=s(n,[["render",e]]);export{D as __pageData,h as default};
