import{_ as s,v as a,b as n,R as o}from"./chunks/framework.70afa331.js";const h=JSON.parse('{"title":"Custom Configuration","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"en/guide/incus/incus_extra_config.md","filePath":"en/guide/incus/incus_extra_config.md","lastUpdated":1725624177000}'),e={name:"en/guide/incus/incus_extra_config.md"},l=o(`<h1 id="custom-configuration" tabindex="-1">Custom Configuration <a class="header-anchor" href="#custom-configuration" aria-label="Permalink to &quot;Custom Configuration&quot;">​</a></h1><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>The following configurations may increase the load on the server. Only install them if necessary.</p></div><h2 id="automatic-ipv6-address-configuration" tabindex="-1">Automatic IPV6 Address Configuration <a class="header-anchor" href="#automatic-ipv6-address-configuration" aria-label="Permalink to &quot;Automatic IPV6 Address Configuration&quot;">​</a></h2><ul><li>(Optional, not required if not using)</li><li><strong>This script is only suitable for servers that have an <code>IPV6</code> subnet with a prefix, and the server has bound the <code>first IP</code> of the subnet as its <code>IPV6 address or IPV6 gateway</code>.</strong></li><li>Automatically configures <code>IPV6</code> addresses for incus containers created with incus.</li><li>Integrated into <code>buildone.sh</code> and can be controlled by variables without needing to be downloaded beforehand. You don&#39;t need to manually use this script; when using <code>buildone.sh</code>, configure with variable Y to enable it.</li></ul><p>Download Script</p><p>Command:</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">curl</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-L</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">https://raw.githubusercontent.com/oneclickvirt/incus/main/scripts/build_ipv6_network.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-o</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">build_ipv6_network.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">chmod</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">+x</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">build_ipv6_network.sh</span></span></code></pre></div><p>Automatically configure IPV6 mapped addresses for containers</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">bash</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">build_ipv6_network.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Container_Name</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">change_me</span><span style="color:#89DDFF;">)</span></span></code></pre></div><p>A message is printed when the mapping is complete (Default mapping without iptables)</p><p>Example (automatically configure the test container with an IPV6 address, a test_v6 file is written when the configuration is complete)</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">bash</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">build_ipv6_network.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">test</span></span></code></pre></div><p><strong>PS: Add ipv6 processing can choose whether to use ip6tables for mapping, the default is not to use ip6tables for mapping but to add new network devices for mapping</strong>.</p><p>Use ip6tables for mapping</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">bash</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">build_ipv6_network.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Container_name</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Y</span></span></code></pre></div><p>If ip6tables is used for mapping, remove all IPV6 mapped rules available:</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">ip6tables</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-t</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">nat</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-F</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">PREROUTING</span></span>
<span class="line"><span style="color:#FFCB6B;">ip6tables-legacy</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-t</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">nat</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-F</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">PREROUTING</span></span>
<span class="line"><span style="color:#FFCB6B;">ip6tables-save</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">/etc/iptables/rules.v6</span></span>
<span class="line"><span style="color:#FFCB6B;">netfilter-persistent</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">save</span></span>
<span class="line"><span style="color:#FFCB6B;">netfilter-persistent</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">reload</span></span>
<span class="line"><span style="color:#FFCB6B;">service</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">netfilter-persistent</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">restart</span></span></code></pre></div><p>Uninstall the IPV6 address binding daemon and corresponding files</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">systemctl</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">stop</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">add-ipv6.service</span></span>
<span class="line"><span style="color:#FFCB6B;">systemctl</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">disable</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">add-ipv6.service</span></span>
<span class="line"><span style="color:#FFCB6B;">rm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">/etc/systemd/system/add-ipv6.service</span></span>
<span class="line"><span style="color:#FFCB6B;">systemctl</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">daemon-reload</span></span>
<span class="line"><span style="color:#FFCB6B;">rm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">/usr/local/bin/add-ipv6.sh</span></span></code></pre></div><h2 id="one-click-installation-of-common-pre-configured-environment-for-incus-hosts-with-vnstat-integration" tabindex="-1">One-click Installation of Common Pre-configured Environment for incus Hosts with vnstat Integration <a class="header-anchor" href="#one-click-installation-of-common-pre-configured-environment-for-incus-hosts-with-vnstat-integration" aria-label="Permalink to &quot;One-click Installation of Common Pre-configured Environment for incus Hosts with vnstat Integration&quot;">​</a></h2><ul><li>(<em><strong>Optional</strong></em>, this script is only for easy monitoring integration with the site, it&#39;s fine if you choose not to install)</li></ul><p>Command:</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">curl</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-L</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">https://raw.githubusercontent.com/oneclickvirt/incus/main/scripts/backend.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-o</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">backend.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">chmod</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">+x</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">backend.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">bash</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">backend.sh</span></span></code></pre></div><h2 id="one-click-installation-of-the-official-incus-visualization-dashboard" tabindex="-1">One-Click Installation of the official incus Visualization Dashboard <a class="header-anchor" href="#one-click-installation-of-the-official-incus-visualization-dashboard" aria-label="Permalink to &quot;One-Click Installation of the official incus Visualization Dashboard&quot;">​</a></h2><ul><li>(<em><strong>Optional</strong></em>, this panel is just for convenient visualization operations, it&#39;s okay if not present)</li></ul><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">apt-get</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">install</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-y</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">incus-ui-canonical</span></span>
<span class="line"><span style="color:#FFCB6B;">incus</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">config</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">set</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">core.https_address</span><span style="color:#A6ACCD;"> [::]</span></span></code></pre></div><p>Then you can type in your browser</p><p><code>https://your_public_ipv4_address:8443</code></p><p>You can enter the official visualization panel, subsequent operation configuration in accordance with the UI prompts can be operated.</p>`,29),t=[l];function p(i,c,r,C,d,y){return a(),n("div",null,t)}const D=s(e,[["render",p]]);export{h as __pageData,D as default};
