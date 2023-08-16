import{_ as s,v as a,b as o,R as p}from"./chunks/framework.70afa331.js";const A=JSON.parse('{"title":"使用Docker一键安装某些容器的脚本","description":"","frontmatter":{},"headers":[],"relativePath":"guide/docker_custom.md","filePath":"guide/docker_custom.md","lastUpdated":1692194525000}'),e={name:"guide/docker_custom.md"},n=p(`<h1 id="使用docker一键安装某些容器的脚本" tabindex="-1">使用Docker一键安装某些容器的脚本 <a class="header-anchor" href="#使用docker一键安装某些容器的脚本" aria-label="Permalink to &quot;使用Docker一键安装某些容器的脚本&quot;">​</a></h1><p>每个容器都有对应的配置要求，自行查看</p><h2 id="一键开设android系统的容器" tabindex="-1">一键开设Android系统的容器 <a class="header-anchor" href="#一键开设android系统的容器" aria-label="Permalink to &quot;一键开设Android系统的容器&quot;">​</a></h2><ul><li>自定义安卓版本</li><li>自动创建带校验的web网站</li><li>自动进行nginx安装和反向代理的配置，可选择是否绑定域名，默认回车不绑定使用80端口</li><li>无需考虑宿主机是否支持嵌套虚拟化</li><li>支持x86_64和ARM架构</li></ul><p><strong>宿主机的配置至少要有1核2G内存15G硬盘，否则开设可能会导致宿主机卡死</strong></p><p>安卓版本越新占用越大，以上的配置要求是最低版本安卓的配置要求 (个人测试到 12.0.0-latest 的tag可用，更高版本映射白屏了，自己测试哪个能用吧)</p><p><strong>开设</strong></p><p>国际</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">curl</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-L</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">https://raw.githubusercontent.com/spiritLHLS/docker/main/scripts/create_android.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-o</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">create_android.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">chmod</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">+x</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">create_android.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">bash</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">create_android.sh</span></span></code></pre></div><p>国内</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">curl</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-L</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">https://ghproxy.com/https://raw.githubusercontent.com/spiritLHLS/docker/main/scripts/create_android.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-o</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">create_android.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">chmod</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">+x</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">create_android.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">bash</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">create_android.sh</span></span></code></pre></div><p>命令执行后按照提示输入即可，注意选择版本输入的是序号，对应选项的数字序号，安装完毕后打开<code>本机IPV4+80端口</code>可登录</p><p>如果需要查询生成的安卓信息和web登录信息，执行<code>cat /root/android_info</code>可查询信息</p><p>默认的用户名 <code>onea</code></p><p>默认密码 <code>oneclick</code></p><p>远程的桌面点击<code>H264 Converter</code>跳转就是了</p><p><strong>暂时只支持生成一个安卓容器，勿要重复生成，如需替换版本请执行后续命令删除后再次开设</strong></p><p><strong>删除</strong></p><ul><li>删除容器</li><li>删除容器对应镜像</li><li>删除配置文件</li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">docker rm -f android</span></span>
<span class="line"><span style="color:#A6ACCD;">	@@ -60,147 +60,145 @@ rm -rf /etc/nginx/passwd_scrcpy_web</span></span>
<span class="line"><span style="color:#A6ACCD;">rm -rf /root/android_info</span></span></code></pre></div><h2 id="一键开设windows系统的容器" tabindex="-1">一键开设Windows系统的容器 <a class="header-anchor" href="#一键开设windows系统的容器" aria-label="Permalink to &quot;一键开设Windows系统的容器&quot;">​</a></h2><ul><li>共享宿主机所有资源，基于docker所以只占用系统的大小，适合多开</li><li>共享IP，做了docker的NAT映射，可选择是否映射到外网或仅内网</li><li>设置的win系统默认最多占用为1核2G内存50G硬盘，实际占用看使用情况</li><li>无需iptables进行NAT映射，删除容器时自动删除了端口的映射，方便维护</li><li>需要考虑宿主机是否支持嵌套虚拟化</li></ul><p><strong>宿主机需要支持嵌套虚拟化，且暂时只支持X86_64架构的系统，手头没ARM机器编译对应的镜像</strong></p><p>执行</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">egrep -c &#39;(vmx|svm)&#39; /proc/cpuinfo</span></span></code></pre></div><p>结果需要大于或等于1，不能为0</p><p>然后需要先设置docker切换使用v1版cgroup启动</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">sed -i &#39;s/GRUB_CMDLINE_LINUX=&quot;\\(.*\\)&quot;/GRUB_CMDLINE_LINUX=&quot;\\1 systemd.unified_cgroup_hierarchy=0&quot;/&#39; /etc/default/grub</span></span>
<span class="line"><span style="color:#A6ACCD;">update-grub</span></span>
<span class="line"><span style="color:#A6ACCD;">ls</span></span></code></pre></div><p>如果执行都无报错，执行<code>reboot</code>重启系统以使得设置生效</p><p><strong>支持的镜像</strong></p><p>使用的自建的镜像：<a href="https://hub.docker.com/r/spiritlhl/wds" target="_blank" rel="noreferrer">https://hub.docker.com/r/spiritlhl/wds</a></p><table><thead><tr><th>镜像名字</th><th>镜像大小</th></tr></thead><tbody><tr><td>10</td><td>20G</td></tr><tr><td>2022</td><td>17.5G</td></tr><tr><td>2019</td><td>17G</td></tr></tbody></table><p>创建出的容器大小会比镜像大小大一丢丢，但不多</p><p><strong>下载脚本</strong></p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">curl -L https://raw.githubusercontent.com/spiritLHLS/docker/main/scripts/onewindows.sh -o onewindows.sh &amp;&amp; chmod +x onewindows.sh</span></span></code></pre></div><p><strong>使用方法</strong></p><p>开设前务必在screen窗口中执行，避免SSH长期链接造成掉线卡死</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">./onewindows.sh 系统版本 RDP的端口 是否为外网映射(留空则默认是N，可选Y)</span></span></code></pre></div><p>开设前需要确认宿主机至少有镜像大小的两倍大小加10G硬盘的大小，因为docker在创建容器时得先将镜像拉到本地再创建</p><p>创建过程中，硬盘占用峰值为<code>宿主机系统+镜像大小+容器大小</code></p><p>比如开设占用最低的 Windows 2019 容器，映射外网RDP端口为13389，设置为外网映射(映射到你的服务器外网IPV4地址)</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">./onewindows.sh 2019 13389 Y</span></span></code></pre></div><p>开设后默认的用户名是<code>Administrator</code>和<code>vagrant</code></p><p>默认的密码是<code>vagrant</code></p><p>如果你选择开设映射的外网端口，务必登录后修改对应账户的密码(两个账户都可能有，自行尝试)，否则可能被人爆破</p><p><strong>删除</strong></p><p>需要删除对应镜像和容器，先执行<code>docker ps -a</code>和<code>docker images</code>查询镜像是<code>spiritlhl/wds</code>的ID，然后对应使用</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">docker rm -f 容器的ID</span></span>
<span class="line"><span style="color:#A6ACCD;">docker rmi 镜像的ID</span></span></code></pre></div><p>删除后可开设别的版本的windows容器</p><h2 id="一键开设firefox浏览器的容器" tabindex="-1">一键开设Firefox浏览器的容器 <a class="header-anchor" href="#一键开设firefox浏览器的容器" aria-label="Permalink to &quot;一键开设Firefox浏览器的容器&quot;">​</a></h2><ul><li>已设置崩溃自启</li><li>已设置带中文字体</li><li>自带web的密码</li><li>可选是否开启VNC端口，默认不开启</li><li>无需考虑是否支持嵌套虚拟化和服务器的架构</li></ul><p><strong>宿主机需要至少1核1G内存5G硬盘，开设的容器大小将占用起码1G硬盘</strong></p><p><strong>开设</strong></p><p>开设后默认的密码是<code>oneclick</code></p><p>默认的web端口是<code>3003</code>，开设后打开<code>本机IPV4:端口</code>即可</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">curl -L https://raw.githubusercontent.com/spiritLHLS/docker/main/scripts/onefirefox.sh -o onefirefox.sh &amp;&amp; chmod +x onefirefox.sh &amp;&amp; bash onefirefox.sh</span></span></code></pre></div><p><strong>删除</strong></p><p>执行</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">docker ps -a</span></span></code></pre></div><p>查询name的前缀是firefox的容器，记录容器的ID用</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">docker rm -f 容器的ID</span></span></code></pre></div><p>删除</p><p>删除所有关联的容器后可用 <code>docker rmi jlesage/firefox</code>删除对应镜像</p><h2 id="一键安装guacamole" tabindex="-1">一键安装guacamole <a class="header-anchor" href="#一键安装guacamole" aria-label="Permalink to &quot;一键安装guacamole&quot;">​</a></h2><p>一个网页端连接SSH或RDP等协议控制服务器的玩意</p><p>网址：<code>http://你的IPV4地址:80/guacamole</code></p><p>默认用户： <code>guacadmin</code></p><p>默认密码： <code>guacadmin</code></p><p>安装完毕登录后自行修改</p><p><strong>宿主机的配置至少要有1核2G内存10G硬盘，否则开设可能会导致宿主机卡死！</strong></p><p>国际</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">curl</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-L</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">https://raw.githubusercontent.com/spiritLHLS/docker/main/extra_scripts/guacamole.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-o</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">guacamole.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">chmod</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">+x</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">guacamole.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">bash</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">guacamole.sh</span></span></code></pre></div><p>国内</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">curl</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-L</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">https://ghproxy.com/https://raw.githubusercontent.com/spiritLHLS/docker/main/extra_scripts/guacamole.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-o</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">guacamole.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">chmod</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">+x</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">guacamole.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">bash</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">guacamole.sh</span></span></code></pre></div>`,74),l=[n];function t(c,r,i,d,C,h){return a(),o("div",null,l)}const g=s(e,[["render",t]]);export{A as __pageData,g as default};
