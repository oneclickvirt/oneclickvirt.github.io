import{_ as s,v as a,b as n,R as l}from"./chunks/framework.70afa331.js";const D=JSON.parse('{"title":"incus主体安装","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"guide/incus/incus_install.md","filePath":"guide/incus/incus_install.md","lastUpdated":1705324601000}'),p={name:"guide/incus/incus_install.md"},o=l(`<h1 id="incus主体安装" tabindex="-1">incus主体安装 <a class="header-anchor" href="#incus主体安装" aria-label="Permalink to &quot;incus主体安装&quot;">​</a></h1><p>如果你的宿主机本身没有IPV6的子网又想给容器分配IPV6地址，那么请先查看<code>incus</code>模块中的<code>自定义</code>分区中的<code>给宿主机附加免费的IPV6地址段</code>的内容，给宿主机附加上IPV6子网后再进行环境安装</p><h2 id="一键安装" tabindex="-1">一键安装 <a class="header-anchor" href="#一键安装" aria-label="Permalink to &quot;一键安装&quot;">​</a></h2><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>如果是全新的服务器，务必保证apt update和apt install curl都无问题再执行本脚本</p></div><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>且自开机起最好等待5分钟后再执行以下命令，避免系统默认设置中就执行了本脚本导致apt源卡死</p></div><ul><li>环境要求：Ubuntu 18+(推荐)，Debian 8+(仅限x86_64架构)</li><li><strong>如果是Debian系的宿主机，务必在screen中执行本脚本，避免长期运行时SSH中断导致ZFS编译安装失败</strong></li><li>这里的虚拟内存是说要开的SWAP大小，存储池则是你所有要开的服务器占的盘的大小的总和</li><li>环境安装过程中<strong>可能需要重启服务器以加载含zfs的内核，然后再次执行安装命令，一切以运行后命令行的提示为准</strong></li><li>默认启用incus的lxcfs相关配置，使得容器内查询容器信息变更为容器本身的信息而不是宿主机信息</li></ul><p>如果脚本提示重启系统后需要再次执行脚本，第二次执行安装脚本仍提示重启系统加载内核，那么意味着内核在上一次加载中失败了，最好重装宿主机系统为ubuntu系解决这个问题</p><p>每次执行脚本都需要输入一次初始化的配置，所以遇到脚本提示需重启系统再次执行，那么就得再次输入初始化的配置</p><p>国际</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">curl</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-L</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">https://raw.githubusercontent.com/oneclickvirt/incus/main/scripts/incus_install.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-o</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">incus_install.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">chmod</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">+x</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">incus_install.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">bash</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">incus_install.sh</span></span></code></pre></div><p>国内</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">curl</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-L</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/incus/main/scripts/incus_install.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-o</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">incus_install.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">chmod</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">+x</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">incus_install.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">bash</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">incus_install.sh</span></span></code></pre></div><p>初始化配置的例子：</p><p>如果系统盘除去已占用空间还有18G硬盘空余，想开2G虚拟内存(2048MB的SWAP)，15G的存储池，按照命令行的提示则依次输入<code>2048</code>和<code>15</code></p><h2 id="手动安装" tabindex="-1">手动安装 <a class="header-anchor" href="#手动安装" aria-label="Permalink to &quot;手动安装&quot;">​</a></h2><p>新手推荐，避免有bug不知道怎么修，当然如果只是图方便又是老手懂排查BUG，用后面的一键安装也行</p><h3 id="关闭防火墙" tabindex="-1">关闭防火墙 <a class="header-anchor" href="#关闭防火墙" aria-label="Permalink to &quot;关闭防火墙&quot;">​</a></h3><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">apt</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">update</span></span>
<span class="line"><span style="color:#FFCB6B;">apt</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">install</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">curl</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">wget</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">sudo</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">dos2unix</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">ufw</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">jq</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-y</span></span>
<span class="line"><span style="color:#FFCB6B;">ufw</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">disable</span></span></code></pre></div><h3 id="开设虚拟内存swap" tabindex="-1">开设虚拟内存SWAP <a class="header-anchor" href="#开设虚拟内存swap" aria-label="Permalink to &quot;开设虚拟内存SWAP&quot;">​</a></h3><p>内存看你开多少服务器，这里如果要开8个，换算需要2G内存，实际内存如果是512MB内存，还需要开1.5G，保守点开2G虚拟内存即可</p><p>执行下面命令，输入1，再输入2048，代表开2G虚拟内存</p><p>国际</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">curl</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-L</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">https://raw.githubusercontent.com/oneclickvirt/incus/main/scripts/swap.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-o</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">swap.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">chmod</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">+x</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">swap.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">bash</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">swap.sh</span></span></code></pre></div><p>国内</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">curl</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-L</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/incus/main/scripts/swap.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-o</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">swap.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">chmod</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">+x</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">swap.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">bash</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">swap.sh</span></span></code></pre></div><h3 id="安装incus" tabindex="-1">安装incus <a class="header-anchor" href="#安装incus" aria-label="Permalink to &quot;安装incus&quot;">​</a></h3><p>实际swap开的虚拟内存应该是实际内存的2倍，也就是开1G是合理的，上面我描述的情况属于超开了</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">apt install snapd -y</span></span>
<span class="line"><span style="color:#A6ACCD;">snap install incus</span></span>
<span class="line"><span style="color:#A6ACCD;">incus init</span></span></code></pre></div><p>如果上面的命令中出现下面的错误</p><p>(snap &quot;incus&quot; assumes unsupported features: snapd2.39 (try to update snapd and refresh the core snap))</p><p>使用命令修补后再进行incus的安装</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">snap install core</span></span></code></pre></div><p>如果无异常，上面三行命令执行结果如下</p><p><img src="https://user-images.githubusercontent.com/103393591/233270028-5a43d0f7-45f5-4175-969e-d4d182cb877a.png" alt="图片"></p><p>一般的选项回车默认即可</p><p>选择配置物理盘大小(提示默认最小1GB那个选项)，一般我填空闲磁盘大小减去内存大小后乘以0.95并向下取整，这里我填了10GB</p><p>提示带auto的更新image的选项记得选no，避免更新占用系统</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">incus -h</span></span></code></pre></div>`,38),e=[o];function t(c,r,i,C,y,u){return a(),n("div",null,e)}const h=s(p,[["render",t]]);export{D as __pageData,h as default};
