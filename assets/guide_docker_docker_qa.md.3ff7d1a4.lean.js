import{_ as a,v as s,b as e,R as l}from"./chunks/framework.70afa331.js";const k=JSON.parse('{"title":"解惑","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"guide/docker/docker_qa.md","filePath":"guide/docker/docker_qa.md","lastUpdated":1705324601000}'),n={name:"guide/docker/docker_qa.md"},p=l('<h1 id="解惑" tabindex="-1">解惑 <a class="header-anchor" href="#解惑" aria-label="Permalink to &quot;解惑&quot;">​</a></h1><h2 id="常见的一些docker命令" tabindex="-1">常见的一些docker命令 <a class="header-anchor" href="#常见的一些docker命令" aria-label="Permalink to &quot;常见的一些docker命令&quot;">​</a></h2><p>查询某个容器的实时占用</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">docker stats 容器名字</span></span></code></pre></div><p>进入某个容器</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">docker exec -it 容器名字 /bin/bash</span></span></code></pre></div><p>清理 Docker 缓存，清理未使用的资源，包括镜像、容器、网络等</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">docker system prune -a</span></span></code></pre></div><p>卸载所有docker的镜像和容器</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">docker rm -f $(docker ps -aq); docker rmi $(docker images -aq)</span></span></code></pre></div><p>查看对应容器日志</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">docker logs 容器名字或ID</span></span></code></pre></div><p>查看docker整体的disk占用</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">docker system df</span></span></code></pre></div><p>查看所有容器</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">docker ps -a</span></span></code></pre></div><p>查看所有镜像</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">docker images</span></span></code></pre></div><p>删除某个特定容器</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">docker rm -f 容器名字或ID</span></span></code></pre></div><p>删除某个特定镜像</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">docker rmi 镜像名字或ID</span></span></code></pre></div>',22),o=[p];function t(c,i,d,r,g,h){return s(),e("div",null,o)}const C=a(n,[["render",t]]);export{k as __pageData,C as default};
