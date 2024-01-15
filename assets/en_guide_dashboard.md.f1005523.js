import{_ as e,v as t,b as a,R as r}from"./chunks/framework.70afa331.js";const f=JSON.parse('{"title":"","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"en/guide/dashboard.md","filePath":"en/guide/dashboard.md","lastUpdated":1705324601000}'),o={name:"en/guide/dashboard.md"},i=r('<h2 id="preparation-work" tabindex="-1">Preparation Work <a class="header-anchor" href="#preparation-work" aria-label="Permalink to &quot;Preparation Work&quot;">​</a></h2><p>To virtualize a server, you will need:</p><ol><li><p>A server (VPS or Dedicated Server) that can connect to the public internet. It&#39;s preferable if this server can access GitHub&#39;s RAW pages perfectly, as some projects and components might not use CDN acceleration.</p></li><li><p>A stable SSH connection from your local machine. If the connection isn&#39;t stable, you can use the <code>screen</code> command to create a window and execute commands within that window.</p></li></ol><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>If you&#39;re unfamiliar with the <code>screen</code> command, please search for relevant tutorials to learn it, or you can use <code>tmux</code> as an alternative.</p></div><ol start="3"><li>Ensure that the server&#39;s system and hardware meet the requirements specified by the corresponding project. Refer to the project&#39;s documentation for detailed information.</li></ol><p><strong>This document will use a VPS as an example, and the VPS should be clean without any native environment issues. If necessary, reinstall the system to ensure the initial environment&#39;s cleanliness.</strong></p><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>The PVE project might cause problems on the host machine. If you&#39;re not familiar with debugging bugs and fixing system issues, it&#39;s not recommended to use PVE in a production environment. When using PVE-related scripts, make sure the host machine can be reinstalled at any time.</p></div><p>Please make sure to keep the original formatting by enclosing the translation in <code>and</code> for easy copying.</p><h2 id="project-repository" tabindex="-1">Project Repository <a class="header-anchor" href="#project-repository" aria-label="Permalink to &quot;Project Repository&quot;">​</a></h2><p>Welcome Star and Fork, all resources are open source, no non-open source parts, reproduced as well as the use of please write on the source of this site, thank you!</p><h3 id="pve" tabindex="-1">PVE <a class="header-anchor" href="#pve" aria-label="Permalink to &quot;PVE&quot;">​</a></h3><p>Allows for the creation of KVM virtualized virtual machines and LXC virtualized containers.</p><p><a href="https://github.com/spiritLHLS/pve" target="_blank" rel="noreferrer">https://github.com/spiritLHLS/pve</a></p><p><a href="https://hits.seeyoufarm.com" target="_blank" rel="noreferrer"><img src="https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2FspiritLHLS%2Fpve&amp;count_bg=%2379C83D&amp;title_bg=%23555555&amp;icon=&amp;icon_color=%23E7E7E7&amp;title=hits&amp;edge_flat=false" alt="Hits"></a></p><h3 id="lxd" tabindex="-1">LXD <a class="header-anchor" href="#lxd" aria-label="Permalink to &quot;LXD&quot;">​</a></h3><p>LXC Virtualization Containers Can Be Created.</p><p><a href="https://github.com/spiritLHLS/lxd" target="_blank" rel="noreferrer">https://github.com/spiritLHLS/lxd</a></p><p><a href="https://hits.seeyoufarm.com" target="_blank" rel="noreferrer"><img src="https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2FspiritLHLS%2Flxd&amp;count_bg=%2379C83D&amp;title_bg=%23555555&amp;icon=&amp;icon_color=%23E7E7E7&amp;title=hits&amp;edge_flat=false" alt="Hits"></a></p><h3 id="docker" tabindex="-1">Docker <a class="header-anchor" href="#docker" aria-label="Permalink to &quot;Docker&quot;">​</a></h3><p>Docker virtualized containers Can Be Created.</p><p><a href="https://github.com/spiritLHLS/docker" target="_blank" rel="noreferrer">https://github.com/spiritLHLS/docker</a></p><p><a href="https://hits.seeyoufarm.com" target="_blank" rel="noreferrer"><img src="https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2FspiritLHLS%2Fdocker&amp;count_bg=%2379C83D&amp;title_bg=%23555555&amp;icon=&amp;icon_color=%23E7E7E7&amp;title=hits&amp;edge_flat=false" alt="Hits"></a></p><br><br>',24),s=[i];function n(c,l,p,h,d,m){return t(),a("div",null,s)}const b=e(o,[["render",n]]);export{f as __pageData,b as default};
