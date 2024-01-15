import{_ as e,v as t,b as o,R as n}from"./chunks/framework.70afa331.js";const f=JSON.parse('{"title":"Preface","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"en/guide/lxd/lxd_precheck.md","filePath":"en/guide/lxd/lxd_precheck.md","lastUpdated":1705324601000}'),a={name:"en/guide/lxd/lxd_precheck.md"},r=n('<h1 id="preface" tabindex="-1">Preface <a class="header-anchor" href="#preface" aria-label="Permalink to &quot;Preface&quot;">​</a></h1><p>The following is the introduction of the non-customized part, the customized part has its own corresponding introduction, do not get confused!</p><p>If your host does not have an IPV6 subnet and you want to assign IPV6 addresses to containers, then please check the <code>Customize</code> partition in the <code>LXD</code> module for the <code>Attach a free IPV6 address segment</code> to the host, and attach an IPV6 subnet to the host before installing the environment.</p><h2 id="requirements" tabindex="-1">Requirements <a class="header-anchor" href="#requirements" aria-label="Permalink to &quot;Requirements&quot;">​</a></h2><p>Hardware requirements.</p><ul><li>System: Debian 8+, Ubuntu 18+ (20.04 recommended).</li><li>Virtualization: KVM, VMWARE recommended.</li><li>Memory: At least 512MB of RAM</li><li>Hard disk: hard disk (system disk) at least 10G</li><li>Network: Independent IPV4 address, IPV6 is optional, bandwidth can download scripts on the line, the network can connect to the Github raw page on the line</li></ul><p>PS: If the hardware is very good and has a lot of resources, you can use PVE to batch open KVM virtualized VMs <a href="https://github.com/spiritLHLS/pve" target="_blank" rel="noreferrer">Jump</a></p><p>PS: If the hardware resources are even worse, virtualization is not supported, you can use the docker version, the adaption surface is wider <a href="https://github.com/spiritLHLS/docker" target="_blank" rel="noreferrer">Jump</a></p><h2 id="project-features" tabindex="-1">Project Features <a class="header-anchor" href="#project-features" aria-label="Permalink to &quot;Project Features&quot;">​</a></h2><ul><li><p>This set of script development using <strong>Ubuntu20</strong>, Ubuntu other long-term maintenance version should also be no problem, Debian can not use zfs automatically switch to another storage type!</p></li><li><p>Set up both TCP and UDP forwarding, in addition to SSH ports, other mapping intranet and extranet ports are the same.</p></li><li><p>Support for docker nested virtualization of open LXC containers has been set up, and the default normal version and pure probe version use the debian11 system.</p></li><li><p>lxcfs has been set to be enabled by default, so that querying resources within a container uses the configured view rather than the host&#39;s view</p></li><li><p>Have blocked the container may be used to abuse the toolkit and IPV4 network TCP/UDP protocol ports ( 3389 8888 54321 65432 ), to prevent the container is used for scanning and blasting, and can be external process checking for problems automatically shut down</p></li><li><p>Has supported one-click configuration of IPV6 addresses for LXC containers (provided that the mother hen has an IPV6 subnet, no IPV6 address is not configured), automatically adapted to the size of the subnet</p></li><li><p>Ensure that the disk you want to open is the default system disk (sda or sda1) and not the mounted disk (sdb and so on), if you are not sure, use <code>fdisk -l</code> and <code>df</code> to check.</p></li><li><p>See <a href="https://github.com/spiritLHLS/lxd/blob/main/README_other.md" target="_blank" rel="noreferrer">Other notes</a> for details on mounting other disks.</p></li><li><p>One-click scripts support custom restrictions on all content, the normal version supports multiple runs of the batch generation does not overwrite the previously generated configuration</p></li></ul><h2 id="detecting-the-environment" tabindex="-1">Detecting the environment <a class="header-anchor" href="#detecting-the-environment" aria-label="Permalink to &quot;Detecting the environment&quot;">​</a></h2><p><strong>Use the subsequent script must execute this command to detect the hen whether it meets the requirements</strong></p><p>Command:</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">bash &lt;(wget -qO- --no-check-certificate https://raw.githubusercontent.com/spiritLHLS/lxd/main/scripts/pre_check.sh)</span></span></code></pre></div>',14),s=[r];function i(d,c,h,l,p,u){return t(),o("div",null,s)}const b=e(a,[["render",i]]);export{f as __pageData,b as default};
