import{_ as e,v as t,b as s,R as a}from"./chunks/framework.70afa331.js";const b=JSON.parse('{"title":"Avoid theft by setting up a firewall to limit the IPs used by the VMs","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"en/guide/block/block_pve.md","filePath":"en/guide/block/block_pve.md","lastUpdated":1731313536000}'),n={name:"en/guide/block/block_pve.md"},o=a(`<h1 id="avoid-theft-by-setting-up-a-firewall-to-limit-the-ips-used-by-the-vms" tabindex="-1">Avoid theft by setting up a firewall to limit the IPs used by the VMs <a class="header-anchor" href="#avoid-theft-by-setting-up-a-firewall-to-limit-the-ips-used-by-the-vms" aria-label="Permalink to &quot;Avoid theft by setting up a firewall to limit the IPs used by the VMs&quot;">​</a></h1><p>Create the following file under the PVE&#39;s host machine</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">/etc/pve/firewall/&lt;VMID&gt;.fw</span></span>
<span class="line"><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">IPSET ipfilter-</span><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;">net0</span><span style="color:#89DDFF;">&gt;]</span></span>
<span class="line"><span style="color:#FFCB6B;">xxx.xxx.xxx.xxx</span></span></code></pre></div><p><code>&lt;VMID&gt;</code> is replaced with the VMID number of the virtual machine, <code>&lt;net0&gt;</code> is replaced with the corresponding alias in the network device (which generally doesn&#39;t need to be changed unless you&#39;re restricted to IPV6), and <code>xxx.xxx.xxx.xxx</code> is replaced with the public IP address, noting that this IP corresponds to the network device in front of it.</p><p>The idea here is that net0 can only use the IP xxx.xxx.xxx.xxx, if you use any other IP the data will be dropped, thus restricting the VM to only use this IP.</p><p>There can be more than one IP, once this rule is enabled the VM can&#39;t use any other IP, if you don&#39;t write an IPv6 address it means the VM can&#39;t use an IPv6 address.</p><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>This setting is only recommended when opening <strong>VMs</strong> with separate IPs that are not NAT full port mapped, otherwise it may cause strange issues resulting in the server being without a network.</p></div><p>This method <strong>is not suitable</strong> for use on PVEs that open any NAT VMs/containers.</p>`,8),i=[o];function l(r,p,h,c,d,u){return t(),s("div",null,i)}const g=e(n,[["render",l]]);export{b as __pageData,g as default};