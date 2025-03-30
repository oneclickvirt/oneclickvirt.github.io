import{_ as s,v as l,b as a,R as o}from"./chunks/framework.70afa331.js";const h=JSON.parse('{"title":"通过shell脚本屏蔽滥用行为","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"guide/block/block_lxd.md","filePath":"guide/block/block_lxd.md","lastUpdated":1743306693000}'),n={name:"guide/block/block_lxd.md"},p=o('<h1 id="通过shell脚本屏蔽滥用行为" tabindex="-1">通过shell脚本屏蔽滥用行为 <a class="header-anchor" href="#通过shell脚本屏蔽滥用行为" aria-label="Permalink to &quot;通过shell脚本屏蔽滥用行为&quot;">​</a></h1><h2 id="屏蔽容易被滥用的端口的出入流量以屏蔽端口和屏蔽滥用工具包" tabindex="-1">屏蔽容易被滥用的端口的出入流量以屏蔽端口和屏蔽滥用工具包 <a class="header-anchor" href="#屏蔽容易被滥用的端口的出入流量以屏蔽端口和屏蔽滥用工具包" aria-label="Permalink to &quot;屏蔽容易被滥用的端口的出入流量以屏蔽端口和屏蔽滥用工具包&quot;">​</a></h2><ul><li>(<em><strong>非必须</strong></em>，该脚本仅仅是为了防止容器滥用方便，不装的也没问题)</li><li>事前预防</li></ul><p>国际</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">curl</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-L</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">https://raw.githubusercontent.com/oneclickvirt/lxd/main/scripts/rules.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-o</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">rules.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">chmod</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">+x</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">rules.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">bash</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">rules.sh</span></span></code></pre></div><p>国内</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">curl</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-L</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/lxd/main/scripts/rules.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-o</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">rules.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">chmod</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">+x</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">rules.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">bash</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">rules.sh</span></span></code></pre></div><h2 id="使用screen配置监控屏蔽某些进程的执行遇到某些进程的出现直接关闭容器" tabindex="-1">使用screen配置监控屏蔽某些进程的执行遇到某些进程的出现直接关闭容器 <a class="header-anchor" href="#使用screen配置监控屏蔽某些进程的执行遇到某些进程的出现直接关闭容器" aria-label="Permalink to &quot;使用screen配置监控屏蔽某些进程的执行遇到某些进程的出现直接关闭容器&quot;">​</a></h2><ul><li>如需停止监控可使用<code>screen</code>命令停止<code>lxc_moniter</code>这个名字的窗口并删除</li><li>(<em><strong>非必须</strong></em>，该脚本仅仅是为了防止容器滥用方便，不装的也没问题)</li><li>事后停机</li></ul><p>国际</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">curl</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-L</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">https://raw.githubusercontent.com/oneclickvirt/lxd/main/scripts/build_monitor.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-o</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">build_monitor.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">chmod</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">+x</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">build_monitor.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">bash</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">build_monitor.sh</span></span></code></pre></div><p>国内</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">curl</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-L</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/lxd/main/scripts/build_monitor.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-o</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">build_monitor.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">chmod</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">+x</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">build_monitor.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">bash</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">build_monitor.sh</span></span></code></pre></div>',13),e=[p];function t(c,r,C,i,y,D){return l(),a("div",null,e)}const d=s(n,[["render",t]]);export{h as __pageData,d as default};
