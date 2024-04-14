import{_ as s,v as e,b as a,R as o}from"./chunks/framework.70afa331.js";const y=JSON.parse('{"title":"Some custom scripts","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"en/guide/pve/pve_custom.md","filePath":"en/guide/pve/pve_custom.md","lastUpdated":1713096381000}'),n={name:"en/guide/pve/pve_custom.md"},t=o(`<h1 id="some-custom-scripts" tabindex="-1">Some custom scripts <a class="header-anchor" href="#some-custom-scripts" aria-label="Permalink to &quot;Some custom scripts&quot;">​</a></h1><p>Some scripts may have its own system requirements, check them out!</p><h2 id="installing-proxmox-ve-7-on-a-non-debian-system" tabindex="-1">Installing Proxmox VE 7 on a non-Debian system <a class="header-anchor" href="#installing-proxmox-ve-7-on-a-non-debian-system" aria-label="Permalink to &quot;Installing Proxmox VE 7 on a non-Debian system&quot;">​</a></h2><p>Minimum local hardware requirements are the same as for the previous normal installation.</p><p>You need to install docker first.</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">curl -sSL https://get.docker.com/ | sh</span></span>
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
<span class="line"><span style="color:#A6ACCD;">spiritlhl/pve:7_aarch64</span></span></code></pre></div><p>The web panel is actually opened in the container, but the network has used the host mode, the port of the PVE is about the same as the port of the host used</p><p>There are many bugs need to be fixed, welcome to PR to solve the problem, the actual test on the Ubuntu system host machine to install <code>Proxmox VE</code> panel success, solved the problem of installing <code>Proxmox VE</code> over the network can only be used to use the Debian system as a host machine!</p><h2 id="optimizing-the-memory-footprint-of-proxmox-ve-on-low-configuration-systems" tabindex="-1">Optimizing the memory footprint of Proxmox-VE on low-configuration systems <a class="header-anchor" href="#optimizing-the-memory-footprint-of-proxmox-ve-on-low-configuration-systems" aria-label="Permalink to &quot;Optimizing the memory footprint of Proxmox-VE on low-configuration systems&quot;">​</a></h2><p>The following optimizations can reduce the memory usage by about 400M, which is better than nothing.</p><h3 id="reduce-the-number-of-max-workers" tabindex="-1">Reduce the number of max_workers <a class="header-anchor" href="#reduce-the-number-of-max-workers" aria-label="Permalink to &quot;Reduce the number of max_workers&quot;">​</a></h3><p>Execute the following command to query</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">cd /usr/share/perl5/PVE/Service</span></span>
<span class="line"><span style="color:#A6ACCD;">grep &#39;max_workers =&gt; 3&#39; *</span></span></code></pre></div><p>you can see</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">pvedaemon.pm:    max_workers =&gt; 3,</span></span>
<span class="line"><span style="color:#A6ACCD;">pveproxy.pm:    max_workers =&gt; 3,</span></span>
<span class="line"><span style="color:#A6ACCD;">spiceproxy.pm:    max_workers =&gt; 3, # todo: do we need more?</span></span></code></pre></div><p>The default max_workers is 3, you can modify the corresponding file, the minimum max_workers can be 1, you can use the following commands to modify them:</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">sed -i &quot;s/max_workers =&gt; 3/max_workers =&gt; 1/g&quot; /usr/share/perl5/PVE/Service/*</span></span></code></pre></div><h3 id="deactivation-of-ha-services" tabindex="-1">Deactivation of HA services <a class="header-anchor" href="#deactivation-of-ha-services" aria-label="Permalink to &quot;Deactivation of HA services&quot;">​</a></h3><p>Clusters (multi-nodes) can use the HA service, if it is a single node, or there is no need for HA use, you can execute the following command:</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">systemctl stop pve-ha-lrm.service </span></span>
<span class="line"><span style="color:#A6ACCD;">systemctl stop pve-ha-crm.service </span></span>
<span class="line"><span style="color:#A6ACCD;">systemctl disable pve-ha-lrm.service </span></span>
<span class="line"><span style="color:#A6ACCD;">systemctl disable pve-ha-crm.service</span></span></code></pre></div><h3 id="disable-firewall-service" tabindex="-1">Disable firewall service <a class="header-anchor" href="#disable-firewall-service" aria-label="Permalink to &quot;Disable firewall service&quot;">​</a></h3><p>The service can be deactivated by executing the following command:</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">systemctl stop pve-firewall.service </span></span>
<span class="line"><span style="color:#A6ACCD;">systemctl disable pve-firewall.service</span></span></code></pre></div><h3 id="discontinuation-of-cheduler-service" tabindex="-1">Discontinuation of cheduler service <a class="header-anchor" href="#discontinuation-of-cheduler-service" aria-label="Permalink to &quot;Discontinuation of cheduler service&quot;">​</a></h3><p>If you don&#39;t need scheduled tasks, such as backups and synchronizations, you can deactivate the service by executing the following command:</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">systemctl stop pvescheduler.service</span></span>
<span class="line"><span style="color:#A6ACCD;">systemctl disable pvescheduler.service</span></span></code></pre></div><h3 id="discontinuation-of-spiceproxy-service" tabindex="-1">Discontinuation of Spiceproxy service <a class="header-anchor" href="#discontinuation-of-spiceproxy-service" aria-label="Permalink to &quot;Discontinuation of Spiceproxy service&quot;">​</a></h3><p>If you do not need to use Spice for VM/container linking (the Arm version itself does not support Spice), you can deactivate the service by executing the following command:</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">systemctl stop spiceproxy.service </span></span>
<span class="line"><span style="color:#A6ACCD;">systemctl disable spiceproxy.service</span></span></code></pre></div>`,38),l=[t];function p(c,i,r,d,h,m){return e(),a("div",null,l)}const C=s(n,[["render",p]]);export{y as __pageData,C as default};