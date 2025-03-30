import{_ as e,v as a,b as t,R as s}from"./chunks/framework.70afa331.js";const m=JSON.parse('{"title":"","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"en/guide/lxd/lxd_qa.md","filePath":"en/guide/lxd/lxd_qa.md","lastUpdated":1743306693000}'),n={name:"en/guide/lxd/lxd_qa.md"},o=s('<h2 id="solve-the-puzzle" tabindex="-1">Solve the puzzle <a class="header-anchor" href="#solve-the-puzzle" aria-label="Permalink to &quot;Solve the puzzle&quot;">​</a></h2><h2 id="what-if-the-lxc-command-says-it-can-t-be-found-after-lxd-is-installed" tabindex="-1">What if the lxc command says it can&#39;t be found after LXD is installed? <a class="header-anchor" href="#what-if-the-lxc-command-says-it-can-t-be-found-after-lxd-is-installed" aria-label="Permalink to &quot;What if the lxc command says it can&#39;t be found after LXD is installed?&quot;">​</a></h2><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">! lxc -h &gt;/dev/null 2&gt;&amp;1 &amp;&amp; echo &#39;alias lxc=&quot;/snap/bin/lxc&quot;&#39; &gt;&gt; /root/.bashrc &amp;&amp; source /root/.bashrc</span></span>\n<span class="line"><span style="color:#A6ACCD;">export PATH=$PATH:/snap/bin</span></span></code></pre></div><p>After executing this command try</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">lxc -h</span></span></code></pre></div><p>to see if the lxc command is fixed.</p><h2 id="what-to-do-if-you-open-centos7-and-find-that-cgroupv1-is-not-supported" tabindex="-1">What to do if you open centos7 and find that CGroupV1 is not supported? <a class="header-anchor" href="#what-to-do-if-you-open-centos7-and-find-that-cgroupv1-is-not-supported" aria-label="Permalink to &quot;What to do if you open centos7 and find that CGroupV1 is not supported?&quot;">​</a></h2><p>Enable CGroup V1: To enable CGroup V1 on an Ubuntu system, you need to edit the kernel boot parameters.</p><p>Please note that before changing kernel boot parameters, make sure to backup important data and settings to prevent unexpected problems.</p><p>Edit the ```/etc/default/grub<code>file and add</code>systemd.unified_cgroup_hierarchy=0<code>to the end of the parameters in</code>GRUB_CMDLINE_LINUX_DEFAULT``, just like:</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">GRUB_CMDLINE_LINUX_DEFAULT=&quot;quiet splash systemd.unified_cgroup_hierarchy=0&quot;</span></span></code></pre></div><p>Save the file and run the following command to update the GRUB boot.</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">sudo</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">update-grub</span></span></code></pre></div><p>Reboot the system for the changes to take effect</p><p>If the above changes still do not support the opening of centos7, try using a different host system.</p><h2 id="currently-verified-vps-vendors-that-can-open-containers-with-separate-ipv6-addresses" tabindex="-1">Currently verified VPS vendors that can open containers with separate IPV6 addresses. <a class="header-anchor" href="#currently-verified-vps-vendors-that-can-open-containers-with-separate-ipv6-addresses" aria-label="Permalink to &quot;Currently verified VPS vendors that can open containers with separate IPV6 addresses.&quot;">​</a></h2><p><a href="https://my.kuroit.com/aff.php?aff=5" target="_blank" rel="noreferrer">kuroit</a> Phoenix, USA regular</p><p><a href="https://t.me/vps_reviews/338" target="_blank" rel="noreferrer">datalix</a> German AMD Promotions</p>',18),r=[o];function p(i,l,d,c,h,u){return a(),t("div",null,r)}const b=e(n,[["render",p]]);export{m as __pageData,b as default};
