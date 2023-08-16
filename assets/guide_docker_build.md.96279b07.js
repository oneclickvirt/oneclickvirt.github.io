import{_ as s,v as a,b as n,R as o}from"./chunks/framework.70afa331.js";const D=JSON.parse('{"title":"Introduction","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"guide/docker_build.md","filePath":"guide/docker_build.md","lastUpdated":1692193924000}'),e={name:"guide/docker_build.md"},l=o(`<h1 id="introduction" tabindex="-1">Introduction <a class="header-anchor" href="#introduction" aria-label="Permalink to &quot;Introduction&quot;">​</a></h1><p>Two deployment methods</p><h2 id="standalone-deployment" tabindex="-1">Standalone Deployment <a class="header-anchor" href="#standalone-deployment" aria-label="Permalink to &quot;Standalone Deployment&quot;">​</a></h2><p>Download the script</p><p>International</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">curl</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-L</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">https://raw.githubusercontent.com/spiritLHLS/docker/main/scripts/onedocker.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-o</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">onedocker.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">chmod</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">+x</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">onedocker.sh</span></span></code></pre></div><p>Domestic (China)</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">curl</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-L</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">https://ghproxy.com/https://raw.githubusercontent.com/spiritLHLS/docker/main/scripts/onedocker.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-o</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">onedocker.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">chmod</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">+x</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">onedocker.sh</span></span></code></pre></div><p>Run</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">./onedocker.sh name cpu memory password sshport startport endport system</span></span></code></pre></div><p>Currently, only the system choices &quot;alpine&quot; and &quot;debian&quot; are supported. The default is debian.</p><h3 id="example" tabindex="-1">Example <a class="header-anchor" href="#example" aria-label="Permalink to &quot;Example&quot;">​</a></h3><p>Below is the information for the created sample container:</p><table><thead><tr><th>Attribute</th><th>Value</th></tr></thead><tbody><tr><td>Container Name</td><td>test</td></tr><tr><td>SSH Login Username</td><td>root</td></tr><tr><td>SSH Login Password</td><td>123456</td></tr><tr><td>Number of CPU Cores</td><td>1</td></tr><tr><td>Memory Size</td><td>512MB</td></tr><tr><td>SSH Port</td><td>25000</td></tr><tr><td>Port Range for Mapping</td><td>34975 to 35000</td></tr><tr><td>System</td><td>debian</td></tr></tbody></table><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">./onedocker.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">test</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">512</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">123456</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">25000</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">34975</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">35000</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">debian</span></span></code></pre></div><p>Delete the example</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">docker</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">rm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-f</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">test</span></span>
<span class="line"><span style="color:#FFCB6B;">rm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-rf</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">test</span></span>
<span class="line"><span style="color:#FFCB6B;">ls</span></span></code></pre></div><p>Access the example</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">docker</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">exec</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-it</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">test</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">/bin/bash</span></span></code></pre></div><p>To exit the container, execute <code>exit</code>.</p><h3 id="query-information" tabindex="-1">Query Information <a class="header-anchor" href="#query-information" aria-label="Permalink to &quot;Query Information&quot;">​</a></h3><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">cat</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">container_name</span></span></code></pre></div><p>Output format</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">Container Name SSH Port Root Password Cores Memory External Port Start External Port End</span></span></code></pre></div><h2 id="batch-deployment" tabindex="-1">Batch Deployment <a class="header-anchor" href="#batch-deployment" aria-label="Permalink to &quot;Batch Deployment&quot;">​</a></h2><ul><li>Run multiple times to inherit configurations for generation</li><li>To generate multiple containers, it is recommended to execute within a &quot;screen&quot; session to avoid SSH interruptions</li></ul><p>International</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">curl</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-L</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">https://raw.githubusercontent.com/spiritLHLS/docker/main/scripts/create_docker.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-o</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">create_docker.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">chmod</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">+x</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">create_docker.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">bash</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">create_docker.sh</span></span></code></pre></div><p>Domestic (China)</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">curl</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-L</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">https://ghproxy.com/https://raw.githubusercontent.com/spiritLHLS/docker/main/scripts/onedocker.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-o</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">onedocker.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">chmod</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">+x</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">onedocker.sh</span></span></code></pre></div><h2 id="query-information-of-batch-deployment" tabindex="-1">Query Information of Batch Deployment <a class="header-anchor" href="#query-information-of-batch-deployment" aria-label="Permalink to &quot;Query Information of Batch Deployment&quot;">​</a></h2><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">cat</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">dclog</span></span></code></pre></div><p>Output format</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">Container Name SSH Port Root Password Cores Memory External Port Start External Port End</span></span></code></pre></div><p>One line corresponds to the information of one container.</p><h2 id="uninstall-all-docker-containers-and-images" tabindex="-1">Uninstall All Docker Containers and Images <a class="header-anchor" href="#uninstall-all-docker-containers-and-images" aria-label="Permalink to &quot;Uninstall All Docker Containers and Images&quot;">​</a></h2><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">docker</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">rm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-f</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">$(</span><span style="color:#FFCB6B;">docker</span><span style="color:#C3E88D;"> ps -aq</span><span style="color:#89DDFF;">)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">docker</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">rmi</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">$(</span><span style="color:#FFCB6B;">docker</span><span style="color:#C3E88D;"> images -aq</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#FFCB6B;">rm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-rf</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">dclog</span></span>
<span class="line"><span style="color:#FFCB6B;">ls</span></span></code></pre></div>`,37),t=[l];function p(r,c,i,C,d,y){return a(),n("div",null,t)}const A=s(e,[["render",p]]);export{D as __pageData,A as default};
