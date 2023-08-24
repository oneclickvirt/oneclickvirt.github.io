import{_ as e,v as t,b as i,R as r}from"./chunks/framework.70afa331.js";const f=JSON.parse('{"title":"Introduction","description":"","frontmatter":{},"headers":[],"relativePath":"en_US/guide/docker_precheck.md","filePath":"en_US/guide/docker_precheck.md","lastUpdated":1692843010000}'),o={name:"en_US/guide/docker_precheck.md"},n=r('<h1 id="introduction" tabindex="-1">Introduction <a class="header-anchor" href="#introduction" aria-label="Permalink to &quot;Introduction&quot;">​</a></h1><p>The following is an introduction to the non-customized sections. Please ensure that you don&#39;t confuse them with the customized parts.</p><h2 id="project-highlights" tabindex="-1">Project Highlights <a class="header-anchor" href="#project-highlights" aria-label="Permalink to &quot;Project Highlights&quot;">​</a></h2><p>Bulk or individual NAT server provisioning via docker</p><p>Default use of debian system optional alpine system, each container comes with 1 external ssh port, 25 internal and external network consistent ports</p><p>The default creation of unprivileged containers, and does not mount and host docker daemon communication, so ** host created docker virtualization NAT server can not be nested within the virtualization of docker **</p><p>Since the CPU and memory limits are only applied to the host and the cgroup driver is not used in the container, using the server test script to detect the available resources of the container will not be effective, and the resources displayed will be those of the host.</p><p>Since most cloud servers have ext4 filesystems, even xfs filesystems do not enable the pquota option, so <strong>sharing the host&#39;s hard disk by default does not limit the disk size of each container</strong>.</p><h2 id="configuration-requirements" tabindex="-1">Configuration Requirements <a class="header-anchor" href="#configuration-requirements" aria-label="Permalink to &quot;Configuration Requirements&quot;">​</a></h2><p>The system should have Docker installed to be operational. As long as the network can connect to GitHub&#39;s raw interface, it can be used. Hardware configuration requirements are minimal, as long as they are adequate; a spare 3GB of hard disk space is sufficient.</p><p>It is recommended to increase the available SWAP virtual memory prior to provisioning NAT servers to prevent potential host performance issues due to sudden memory spikes. <a href="https://github.com/spiritLHLS/addswap" target="_blank" rel="noreferrer">Link</a></p><p>PS: If hardware resources are somewhat limited and more restrictions are necessary, including configuration of individual IPv6 addresses and disk size limitations, consider utilizing LXD to create batch LXC virtualized containers. <a href="https://github.com/spiritLHLS/lxd" target="_blank" rel="noreferrer">Link</a></p><p>PS: If hardware resources are abundant and ample, consider using Proxmox Virtual Environment (PVE) to provision batch KVM virtualized machines. <a href="https://github.com/spiritLHLS/pve" target="_blank" rel="noreferrer">Link</a></p><p>Please note that the original formatting has been preserved and enclosed within <code>and</code> for your convenience during copying. No character escaping has been applied.</p>',14),a=[n];function s(c,d,h,l,u,p){return t(),i("div",null,a)}const g=e(o,[["render",s]]);export{f as __pageData,g as default};
