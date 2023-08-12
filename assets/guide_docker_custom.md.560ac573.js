import{_ as s,v as a,b as p,R as o}from"./chunks/framework.70afa331.js";const D=JSON.parse('{"title":"","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"guide/docker_custom.md","filePath":"guide/docker_custom.md","lastUpdated":1691812969000}'),n={name:"guide/docker_custom.md"},l=o(`<h2 id="一键使用docker开设安卓系统的容器" tabindex="-1">一键使用Docker开设安卓系统的容器 <a class="header-anchor" href="#一键使用docker开设安卓系统的容器" aria-label="Permalink to &quot;一键使用Docker开设安卓系统的容器&quot;">​</a></h2><ul><li>自定义安卓版本</li><li>自动创建带校验的web网站</li><li>自动进行nginx和反向代理的配置</li></ul><p><strong>宿主机的配置至少要有1核2G内存15G硬盘，否则开设可能会导致宿主机卡死！</strong></p><p>安卓版本越新占用越大，以上的配置要求是最低版本安卓的配置要求 (个人测试到 12.0.0-latest 的tag可用，更高版本映射白屏了，自己测试哪个能用吧)</p><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>内存开点swap免得机器炸了</p></div><p>开设虚拟内存(SWAP)</p><p>单位换算：输入 1024 产生 1G SWAP-虚拟内存，虚拟内存占用硬盘空间，当实际内存不够用时将自动使用虚拟内存做内存使用，但随之带来IO高占用以及CPU性能占用</p><p>建议只开实际内存大小两倍大小的虚拟内存</p><p>国际</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">curl</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-L</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">https://raw.githubusercontent.com/spiritLHLS/addswap/main/addswap.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-o</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">addswap.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">chmod</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">+x</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">addswap.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">bash</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">addswap.sh</span></span></code></pre></div><p>国内</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">curl</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-L</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">https://ghproxy.com/https://raw.githubusercontent.com/spiritLHLS/addswap/main/addswap.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-o</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">addswap.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">chmod</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">+x</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">addswap.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">bash</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">addswap.sh</span></span></code></pre></div><h3 id="开设" tabindex="-1">开设 <a class="header-anchor" href="#开设" aria-label="Permalink to &quot;开设&quot;">​</a></h3><p>国际</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">curl</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-L</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">https://raw.githubusercontent.com/spiritLHLS/docker/main/scripts/create_android.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-o</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">create_android.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">chmod</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">+x</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">create_android.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">bash</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">create_android.sh</span></span></code></pre></div><p>国内</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">curl</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-L</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">https://ghproxy.com/https://raw.githubusercontent.com/spiritLHLS/docker/main/scripts/create_android.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-o</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">create_android.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">chmod</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">+x</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">create_android.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">bash</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">create_android.sh</span></span></code></pre></div><p>命令执行后按照提示输入即可，注意选择版本输入的是序号，对应选项的数字序号，安装完毕后打开<code>本机IPV4+80端口</code>可登录</p><p>如果需要查询生成的安卓信息和web登录信息，执行<code>cat /root/android_info</code>可查询信息</p><p>默认的用户名 <code>onea</code></p><p>默认密码 <code>oneclick</code></p><p>远程的桌面点击<code>H264 Converter</code>跳转就是了</p><p><strong>暂时只支持生成一个安卓容器，勿要重复生成，如需替换版本请执行后续命令删除后再次开设</strong></p><h3 id="删除" tabindex="-1">删除 <a class="header-anchor" href="#删除" aria-label="Permalink to &quot;删除&quot;">​</a></h3><ul><li>删除容器</li><li>删除容器对应镜像</li><li>删除配置文件</li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">docker rm -f android</span></span>
<span class="line"><span style="color:#A6ACCD;">docker rm -f scrcpy_web</span></span>
<span class="line"><span style="color:#A6ACCD;">docker rmi $(docker images | grep &quot;redroid&quot; | awk &#39;{print $3}&#39;)</span></span>
<span class="line"><span style="color:#A6ACCD;">rm -rf /etc/nginx/sites-enabled/reverse-proxy</span></span>
<span class="line"><span style="color:#A6ACCD;">rm -rf /etc/nginx/sites-available/reverse-proxy</span></span>
<span class="line"><span style="color:#A6ACCD;">rm -rf /etc/nginx/passwd_scrcpy_web</span></span>
<span class="line"><span style="color:#A6ACCD;">rm -rf /root/android_info</span></span></code></pre></div>`,26),e=[l];function t(c,r,C,i,d,y){return a(),p("div",null,e)}const h=s(n,[["render",t]]);export{D as __pageData,h as default};
