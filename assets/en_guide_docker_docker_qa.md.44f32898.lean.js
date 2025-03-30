import{_ as e,v as a,b as s,R as n}from"./chunks/framework.70afa331.js";const h=JSON.parse('{"title":"Solve the puzzle","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"en/guide/docker/docker_qa.md","filePath":"en/guide/docker/docker_qa.md","lastUpdated":1743306693000}'),o={name:"en/guide/docker/docker_qa.md"},l=n('<h1 id="solve-the-puzzle" tabindex="-1">Solve the puzzle <a class="header-anchor" href="#solve-the-puzzle" aria-label="Permalink to &quot;Solve the puzzle&quot;">​</a></h1><h2 id="common-docker-commands" tabindex="-1">Common Docker Commands <a class="header-anchor" href="#common-docker-commands" aria-label="Permalink to &quot;Common Docker Commands&quot;">​</a></h2><p>Check real-time resource usage of a specific container</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">docker stats &lt;container_name&gt;</span></span></code></pre></div><p>Enter a specific container</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">docker exec -it &lt;container_name&gt; /bin/bash</span></span></code></pre></div><p>Clean Docker cache, remove unused resources including images, containers, networks, etc.</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">docker system prune -a</span></span></code></pre></div><p>Uninstall all Docker images and containers</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">docker rm -f $(docker ps -aq); docker rmi $(docker images -aq)</span></span></code></pre></div><p>View logs of a specific container</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">docker logs &lt;container_name_or_ID&gt;</span></span></code></pre></div><p>View overall disk usage of Docker</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">docker system df</span></span></code></pre></div><p>List all containers</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">docker ps -a</span></span></code></pre></div><p>List all images</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">docker images</span></span></code></pre></div><p>Remove a specific container</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">docker rm -f &lt;container_name_or_ID&gt;</span></span></code></pre></div><p>Remove a specific image</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">docker rmi &lt;image_name_or_ID&gt;</span></span></code></pre></div>',22),t=[l];function c(p,i,r,d,m,g){return a(),s("div",null,t)}const C=e(o,[["render",c]]);export{h as __pageData,C as default};
