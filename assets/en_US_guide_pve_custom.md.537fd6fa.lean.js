import{_ as s,v as e,b as a,R as n}from"./chunks/framework.70afa331.js";const m=JSON.parse('{"title":"Some custom scripts","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"en_US/guide/pve_custom.md","filePath":"en_US/guide/pve_custom.md","lastUpdated":1692181420000}'),o={name:"en_US/guide/pve_custom.md"},t=n(`<h1 id="some-custom-scripts" tabindex="-1">Some custom scripts <a class="header-anchor" href="#some-custom-scripts" aria-label="Permalink to &quot;Some custom scripts&quot;">​</a></h1><p>Each script may have its own system requirements, check them out!</p><h2 id="installing-proxmox-ve-7-on-a-non-debian-system" tabindex="-1">Installing Proxmox VE 7 on a non-Debian system <a class="header-anchor" href="#installing-proxmox-ve-7-on-a-non-debian-system" aria-label="Permalink to &quot;Installing Proxmox VE 7 on a non-Debian system&quot;">​</a></h2><p>Minimum local hardware requirements are the same as for the previous normal installation.</p><p>You need to install docker first.</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">curl -sSL https://get.docker.com/ | sh</span></span>
<span class="line"><span style="color:#A6ACCD;">curl -L &quot;https://github.com/docker/compose/releases/latest/download/docker-compose-linux-$(uname -m)&quot; -o /usr/local/bin/docker-compose</span></span>
<span class="line"><span style="color:#A6ACCD;">chmod +x /usr/local/bin/docker-compose</span></span>
<span class="line"><span style="color:#A6ACCD;">docker-compose --version</span></span></code></pre></div><p>Then use <code>uname -m</code> to query the architecture and use the command corresponding to the architecture</p><p>The opened PVE panel information is:</p><p>Login username and password are both <code>root</code>, after logging in be sure to use web SSH to change the password to avoid being blown up.</p><p>When using host SSH, be sure to log into the corresponding <code>https://IPV4:8006</code> to use SSH on the web panel, do not use the host&#39;s port 22 to manipulate the PVE.</p><p>Because the SSH on the web panel is inside Docker, it does not support subsequent one-click configurations, so please configure your own gateway, etc. to use it.</p><p>X86 architecture</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">docker</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">run</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-idt</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--network</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">host</span><span style="color:#A6ACCD;"> \\</span></span>
<span class="line"><span style="color:#A6ACCD;">--privileged \\</span></span>
<span class="line"><span style="color:#A6ACCD;">--name </span><span style="color:#C3E88D;">pve</span><span style="color:#A6ACCD;"> \\</span></span>
<span class="line"><span style="color:#A6ACCD;">--add-host </span><span style="color:#C3E88D;">pve:10.13.14.101</span><span style="color:#A6ACCD;"> \\</span></span>
<span class="line"><span style="color:#A6ACCD;">--hostname </span><span style="color:#C3E88D;">pve</span><span style="color:#A6ACCD;"> \\</span></span>
<span class="line"><span style="color:#A6ACCD;">spiritlhl/pve:7_x86_64</span></span></code></pre></div><p>ARM architecture</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">docker</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">run</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-idt</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--network</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">host</span><span style="color:#A6ACCD;"> \\</span></span>
<span class="line"><span style="color:#A6ACCD;">--privileged \\</span></span>
<span class="line"><span style="color:#A6ACCD;">--name </span><span style="color:#C3E88D;">pve</span><span style="color:#A6ACCD;"> \\</span></span>
<span class="line"><span style="color:#A6ACCD;">--add-host </span><span style="color:#C3E88D;">pve:10.13.14.101</span><span style="color:#A6ACCD;"> \\</span></span>
<span class="line"><span style="color:#A6ACCD;">--hostname </span><span style="color:#C3E88D;">pve</span><span style="color:#A6ACCD;"> \\</span></span>
<span class="line"><span style="color:#A6ACCD;">spiritlhl/pve:7_aarch64</span></span></code></pre></div><p>The web panel is actually opened in the container, but the network has used the host mode, the port of the PVE is about the same as the port of the host used, normal use can be</p>`,16),p=[t];function l(c,r,i,d,h,C){return e(),a("div",null,p)}const y=s(o,[["render",l]]);export{m as __pageData,y as default};
