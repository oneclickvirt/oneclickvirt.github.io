import{_ as e,v as t,b as a,R as s}from"./chunks/framework.70afa331.js";const m=JSON.parse('{"title":"Attach free IPV6 address segments to host machines","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"en/guide/incus/incus_custom.md","filePath":"en/guide/incus/incus_custom.md","lastUpdated":1705324601000}'),n={name:"en/guide/incus/incus_custom.md"},o=s(`<h1 id="attach-free-ipv6-address-segments-to-host-machines" tabindex="-1">Attach free IPV6 address segments to host machines <a class="header-anchor" href="#attach-free-ipv6-address-segments-to-host-machines" aria-label="Permalink to &quot;Attach free IPV6 address segments to host machines&quot;">​</a></h1><p>Some machines don&#39;t have an IPV6 /64 subnet on the machine itself, here is a method given to attach an IPV6 subnet for free.</p><p>Here is a solution using the 6in4 method for a host machine that doesn&#39;t have an IPV6 address on its own.</p><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>The operations on this page must be performed on the original system, and ensure that no other scripts from this project are installed(Except for PVE, which needs to be installed first), as this may lead to environment conflicts.</p></div><p>Here are the platforms that are currently running in 2023 that offer IPV6 subnets for free.</p><table><thead><tr><th>Supported Platforms</th><th>Corresponding Required Installation Packages</th><th>Protocols</th><th>Number of Channels/Subnets</th></tr></thead><tbody><tr><td>tunnelbroker.net</td><td>ifupdown OR ifupdown2</td><td>v4tunnel OR sit</td><td>3✖/64 或 5✖/64</td></tr><tr><td>tunnelbroker.ch</td><td>ifupdown OR ifupdown2</td><td>v4tunnel OR sit</td><td>3✖/64</td></tr><tr><td>ip4market.ru</td><td>ifupdown OR ifupdown2</td><td>v4tunnel OR sit</td><td>1✖/64</td></tr><tr><td>netassist.ua</td><td>ifupdown OR ifupdown2</td><td>v4tunnel OR sit</td><td>1✖/64</td></tr><tr><td><a href="https://github.com/oneclickvirt/6in4" target="_blank" rel="noreferrer">https://github.com/oneclickvirt/6in4</a></td><td>ifupdown2</td><td>sit、gre、ipip</td><td>自定义</td></tr></tbody></table><p>The free platform only solves the problem that IPV6 is not available, it does not provide premium IPV6 bandwidth.</p><p>If you need high quality bandwidth, please build your own tunnel. When both ifupdown and ifupdown2 are available, try ifupdown first to see if it can be installed successfully, otherwise install ifupdown2.</p><p>After the installation is complete, select which package is installed behind to convert the format.</p><h2 id="initial-environment-modifications" tabindex="-1">Initial environment modifications <a class="header-anchor" href="#initial-environment-modifications" aria-label="Permalink to &quot;Initial environment modifications&quot;">​</a></h2><p>Execute</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">touch /etc/cloud/cloud-init.disabled</span></span></code></pre></div><p>Turn off the automated overwrite of cloud-init first, and then to see what the local machine is using to manage the network, run</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">systemctl is-active systemd-networkd</span></span></code></pre></div><p>and</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">systemctl is-active networking</span></span></code></pre></div><p>See which case this falls into, if it&#39;s the former active and the latter inactive, you need to reinstall/DD a system that isn&#39;t configured this way, or switch the local machine to use ifupdown/ifupdown2 to manage network execution</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;"># Judge for yourself whether you need to disable the original network management or not</span></span>
<span class="line"><span style="color:#A6ACCD;"># systemctl stop systemd-networkd</span></span>
<span class="line"><span style="color:#A6ACCD;"># systemctl disable systemd-networkd</span></span>
<span class="line"><span style="color:#A6ACCD;"># systemctl stop systemd-networkd.socket</span></span>
<span class="line"><span style="color:#A6ACCD;"># systemctl disable systemd-networkd.socket</span></span></code></pre></div><p>If you want to install <code>ifupdown</code> to control the network, this tool is available on all major linux systems.</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">apt-get install ifupdown -y</span></span></code></pre></div><p>If you want to install <code>ifupdown2</code> for network management, which is generally only available on debian systems, you can install</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">apt-get install ifupdown2 -y</span></span></code></pre></div><p>After the installation is complete, select which package is installed behind to convert the format.</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">systemctl start networking</span></span>
<span class="line"><span style="color:#A6ACCD;">systemctl enable networking</span></span></code></pre></div><p>Then restart the server, check whether the machine&#39;s network will be rebooted due to the modification of the case of loss of connection, and run<code>uptime</code>to observe that the startup has been more than 1 minute before proceeding to the next steps</p><p>If it is inactive and active, there is no need to switch the network management program and you can proceed directly to the next step.</p><p>Since some servers have default intranet IPV6 routes that will conflict with the tunnel, you can use the following command to remove the default IPV6 routes</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">default_route=$(ip -6 route show | awk &#39;/default via/{print $3}&#39;) &amp;&amp; [ -n &quot;$default_route&quot; ] &amp;&amp; ip -6 route del default via $default_route dev eth0</span></span></code></pre></div><p>This assumes that your client&#39;s server&#39;s default NIC is <code>eth0</code>, you can use <code>ip -6 route</code> to see the default route and replace it, the default route starts with <code>default via</code>, and uses <code>dev</code> to specify the default NIC, you just need to find it according to this rule</p><h2 id="tunnelbroker-net" tabindex="-1">tunnelbroker_net <a class="header-anchor" href="#tunnelbroker-net" aria-label="Permalink to &quot;tunnelbroker_net&quot;">​</a></h2><p>Combined with a script that opens containers with IPV6 addresses with a single click, you can attach an IPV6 address from he to each container</p><p>The downside is that the addresses are dark/dirty, and cloudflare&#39;s cdn will most likely not be able to latch on, test it yourself</p><ol><li>Register an account at <a href="https://tunnelbroker.net/" target="_blank" rel="noreferrer">https://tunnelbroker.net/</a> and click<code>Create Regular Tunnel</code>on the left.</li></ol><p><img src="https://github.com/oneclickvirt/oneclickvirt.github.io/assets/103393591/35923be5-821f-45c8-8401-962ea3f97726" alt="1"></p><ol start="2"><li>Fill in your server&#39;s IPV4 address in the red box, choose a connection point that is physically close to your server, for example, if your machine is in Los Angeles, choose a connection point on the west coast of the United States, and then click<code>Create Tunnel</code>to create the tunnel when you are prompted by the green box!</li></ol><p><img src="https://github.com/oneclickvirt/oneclickvirt.github.io/assets/103393591/cab04113-4d6a-4d6f-9952-d3851057fc4a" alt="2"></p><p><img src="https://github.com/oneclickvirt/oneclickvirt.github.io/assets/103393591/518dc62a-c8d0-48e3-bb13-befc39348990" alt="3"></p><p><img src="https://github.com/oneclickvirt/oneclickvirt.github.io/assets/103393591/6188de3f-e83c-400e-9594-dd3f73aaf46a" alt="4"></p><ol start="3"><li>Wait for the following screen, click<code>Example Configurations</code>and select the corresponding system, for example, the host of incus is definitely Debian/Ubuntu.</li></ol><p><img src="https://github.com/oneclickvirt/oneclickvirt.github.io/assets/103393591/9f0045fc-b1ac-4954-9ecd-1fba47d07d8a" alt="5"></p><p><img src="https://github.com/oneclickvirt/oneclickvirt.github.io/assets/103393591/2fb7c951-371c-452c-b775-78f69b980a2c" alt="6"></p><ol start="4"><li>The boxed part is the file to be modified and the content to be filled in.</li></ol><p><img src="https://github.com/oneclickvirt/oneclickvirt.github.io/assets/103393591/c0156902-b4c0-4001-823e-50f611215393" alt="7"></p><ol start="5"><li>Exchange the format of the command then add IPV6 settings to your network configuration file.</li></ol><p>Then open <a href="https://ipv6tunnel.spiritlhl.top/" target="_blank" rel="noreferrer">https://ipv6tunnel.spiritlhl.top/</a> and select<code>Option</code>for<code>TunnelBrokerNet</code>, another drop-down selection box to choose the name of the package you successfully installed previously, then paste what you copied in the input box.</p><p>Then click<code>Covert</code>to convert the format, and wait for the page to refresh to show the converted configuration file.</p><p>Then use vim or vi to modify the<code>/etc/network/interfaces</code>file to add content, or modify the following command to add new content</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">tee -a /etc/network/interfaces &lt;&lt;EOF</span></span>
<span class="line"><span style="color:#A6ACCD;"># Here, copy and paste the contents of the configuration file in the red box, and then run this command.</span></span>
<span class="line"><span style="color:#A6ACCD;">EOF</span></span></code></pre></div><p>Then you can use<code>cat /etc/network/interfaces</code>to see if the configuration file is written correctly.</p><ol start="6"><li>If all of the above is OK, then you need to enable the network interfaces</li></ol><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">apt-get install net-tools iproute2 -y</span></span>
<span class="line"><span style="color:#A6ACCD;">systemctl restart networking</span></span></code></pre></div><ol start="7"><li>Then you can test the IP address of the network interface.</li></ol><p>Execute the<code>ifconfig</code>command, and there should be a he-ipv6 interface, similar to the following:</p><p><img src="https://github.com/oneclickvirt/oneclickvirt.github.io/assets/103393591/1760af85-2b60-4352-ad8c-3c69e49fc1e4" alt="8"></p><p>Or execute:</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">curl ipv6.ip.sb</span></span></code></pre></div><p>Returns the IPV6 address you bound to</p><ol start="8"><li>Additional settings for NAT VPS</li></ol><p>IPv4 NAT VPS may require some additional settings beyond the IP replacement operation mentioned earlier, otherwise it may still not be able to access the IPv6 network.</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">apt-get install ufw -y</span></span>
<span class="line"><span style="color:#A6ACCD;">ufw allow 41</span></span></code></pre></div><p>Add the relevant routing rules</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">route -A inet6 add ::/0 dev he-ipv6</span></span></code></pre></div><ol start="9"><li>If the IPV6 network is no longer needed and you want to delete it, delete the he-ipv6 network interface configuration.</li></ol><p>If you want to delete the he-ipv6 network interface configuration (if not, it will be enabled automatically after reboot), remember to modify the<code>/etc/network/interfaces</code>file to remove the content added in the red box before.</p><p>Then reboot the server to remove the</p><h2 id="tunnelbroker-ch" tabindex="-1">tunnelbroker_ch <a class="header-anchor" href="#tunnelbroker-ch" aria-label="Permalink to &quot;tunnelbroker_ch&quot;">​</a></h2><p>Similar to the above, first register an account at <a href="https://www.tunnelbroker.ch/" target="_blank" rel="noreferrer">https://www.tunnelbroker.ch/</a> and click on the activation email after registering.</p><p>Then you have to fill in the IPV4 address of your server.</p><p><img src="https://github.com/oneclickvirt/oneclickvirt.github.io/assets/103393591/e018c7bc-e73c-4c68-88b6-b073f0dbd150" alt=""></p><p>After creating an account, you need to go to the Config page instead of the details page.</p><p><img src="https://github.com/oneclickvirt/oneclickvirt.github.io/assets/103393591/d919dda7-571d-45b1-9d2f-03f29866269e" alt=""></p><p>Don&#39;t use the following page, first refresh the page without the light blue box and then stop refreshing it</p><p>Don&#39;t stop refreshing after the light blue box pops up</p><p><img src="https://github.com/oneclickvirt/oneclickvirt.github.io/assets/103393591/aefd1477-d5f5-4a4e-a66c-80ef5f9250c6" alt=""></p><p>Record the content of the last red box on the following page, and prepare to modify the host configuration file.</p><p><img src="https://github.com/oneclickvirt/oneclickvirt.github.io/assets/103393591/9329974c-9549-4ff2-a8a0-a53c00e2863d" alt=""></p><p>Copy the last red box of the page without the blank lines.</p><p>Then open <a href="https://ipv6tunnel.spiritlhl.top/" target="_blank" rel="noreferrer">https://ipv6tunnel.spiritlhl.top/</a> and select<code>Option</code>for<code>TunnelBrokerCh</code>, another drop-down selection box to choose the name of the package you successfully installed previously, then paste what you copied in the input box.</p><p>Then click<code>Covert</code>to convert the format, and wait for the page to refresh to show the converted configuration file.</p><p>Then use vim or vi to modify the<code>/etc/network/interfaces</code>file to add content, or modify the following command to add new content</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">tee -a /etc/network/interfaces &lt;&lt;EOF</span></span>
<span class="line"><span style="color:#A6ACCD;"># Modify the</span></span>
<span class="line"><span style="color:#A6ACCD;">EOF</span></span></code></pre></div><p>Then you&#39;ll need to reboot the system a bit, or run</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">apt-get install net-tools iproute2 -y</span></span>
<span class="line"><span style="color:#A6ACCD;">systemctl restart networking</span></span></code></pre></div><p>Make sure the environment is OK before you do anything else</p><h2 id="ip4market-ru" tabindex="-1">ip4market_ru <a class="header-anchor" href="#ip4market-ru" aria-label="Permalink to &quot;ip4market_ru&quot;">​</a></h2><p>Similar to the above, first register an account at <a href="https://tb.ip4market.ru/" target="_blank" rel="noreferrer">https://tb.ip4market.ru</a>, the registered email address must be an unseen email address, the phone number can be written randomly without verification, and the IP address should be the IPV4 address of the host you want to attach.</p><p>The IP address is the IPV4 address of the host computer you are attaching to<img src="https://github.com/oneclickvirt/oneclickvirt.github.io/assets/103393591/24df37f2-12fe-49b6-87df-f07213346fbe" alt=""></p><p>Then you have to go through Recaptcha&#39;s human-machine verification, and click register.</p><p>You will receive an activation email with your password, memorize it.</p><p>Then login on the homepage</p><p><img src="https://github.com/oneclickvirt/oneclickvirt.github.io/assets/103393591/38b3f5a7-a5e1-47e0-b13e-8570e946c61c" alt=""></p><p>Then you will be taken to this page</p><p><img src="https://github.com/oneclickvirt/oneclickvirt.github.io/assets/103393591/fc1d38b9-b45a-41de-a931-5dbe96e9791c" alt=""></p><p>Hold down the right button and copy the four lines framed in red, which are</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">Server IPv4.</span></span>
<span class="line"><span style="color:#A6ACCD;">Client IPv4</span></span>
<span class="line"><span style="color:#A6ACCD;">Server IPv6</span></span>
<span class="line"><span style="color:#A6ACCD;">Client IPv6</span></span></code></pre></div><p>For these four lines, press ctrl+c to copy or right-click to copy</p><p><img src="https://github.com/oneclickvirt/oneclickvirt.github.io/assets/103393591/69c946e6-e82f-4665-b3c1-3c97e27f8487" alt=""></p><p>Then open <a href="https://ipv6tunnel.spiritlhl.top/" target="_blank" rel="noreferrer">https://ipv6tunnel.spiritlhl.top/</a> and select<code>Option</code>for<code>ip4market</code>, another drop-down selection box to choose the name of the package you successfully installed previously, then paste what you copied in the input box.</p><p>Then click<code>Covert</code>to convert the formatting</p><p><img src="https://github.com/oneclickvirt/oneclickvirt.github.io/assets/103393591/b9ca3ee1-4f13-4e10-bdc8-1ed1cc23ab05" alt=""></p><p>Then the page will be refreshed automatically and you need to modify the contents of the<code>/etc/network/interfaces</code>file with vim or vi commands, or modify the following commands to add new contents.</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">tee -a /etc/network/interfaces &lt;&lt;EOF</span></span>
<span class="line"><span style="color:#A6ACCD;"># Modify the</span></span>
<span class="line"><span style="color:#A6ACCD;">EOF</span></span></code></pre></div><p>Then you&#39;ll need to reboot the system a bit, or run</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">apt-get install net-tools iproute2 -y</span></span>
<span class="line"><span style="color:#A6ACCD;">systemctl restart networking</span></span></code></pre></div><p>Make sure the environment is OK before you do anything else</p><h2 id="netassist-ua" tabindex="-1">netassist_ua <a class="header-anchor" href="#netassist-ua" aria-label="Permalink to &quot;netassist_ua&quot;">​</a></h2><p>Similar to the above operation, first in <a href="https://tb.netassist.ua/" target="_blank" rel="noreferrer">https://tb.netassist.ua/</a> register an account first, after registration, click on the activation of the mail, the activation page will have a password display, remember to record!</p><p>Then fill in the IPV4 address of your server, you can change it later, just fill in a random one first.</p><p>Then you will get to this page</p><p><img src="https://github.com/oneclickvirt/oneclickvirt.github.io/assets/103393591/4af680d4-3b01-495a-91d1-3cf4f187d0df" alt="a"></p><p>The first red box is the location of your host&#39;s IPV4 address, if you want to modify it, modify it there, and then click change to save.</p><p>The second red box is for\`\`\`Linux\`\`, and then click on show</p><p><img src="https://github.com/oneclickvirt/oneclickvirt.github.io/assets/103393591/099d43a0-0397-4e02-9275-9ec3099c0ff1" alt="b"></p><p>The above content will appear, copy all the boxed parts without blank lines.</p><p>Then open <a href="https://ipv6tunnel.spiritlhl.top/" target="_blank" rel="noreferrer">https://ipv6tunnel.spiritlhl.top/</a> and select<code>Option</code>for<code>NetAssist</code>, another drop-down selection box to choose the name of the package you successfully installed previously, then paste what you copied in the input box.</p><p>Then click on<code>Covert</code>to convert the formatting</p><p><img src="https://github.com/oneclickvirt/oneclickvirt.github.io/assets/103393591/7324c7ff-d22f-4c17-b3c2-b5338ca6dfee" alt="c"></p><p>Then the page will be refreshed automatically and you need to modify the contents of the<code>/etc/network/interfaces</code>file with vim or vi commands, or modify the following commands to add new contents.</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">tee -a /etc/network/interfaces &lt;&lt;EOF</span></span>
<span class="line"><span style="color:#A6ACCD;"># Modify the</span></span>
<span class="line"><span style="color:#A6ACCD;">EOF</span></span></code></pre></div><p>Then you&#39;ll need to reboot the system a bit, or run</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">apt-get install net-tools iproute2 -y</span></span>
<span class="line"><span style="color:#A6ACCD;">systemctl restart networking</span></span></code></pre></div><p>Make sure the environment is OK before you do anything else</p><h2 id="transfer-ipv6-subnets-between-different-servers" tabindex="-1">Transfer IPV6 subnets between different servers <a class="header-anchor" href="#transfer-ipv6-subnets-between-different-servers" aria-label="Permalink to &quot;Transfer IPV6 subnets between different servers&quot;">​</a></h2><p>Related repository: <a href="https://github.com/oneclickvirt/6in4" target="_blank" rel="noreferrer">https://github.com/oneclickvirt/6in4</a></p><p>This method will provide a way to split a /80 out of the IPV6 segment on A and attach it to B to use.</p><h3 id="features" tabindex="-1">Features <a class="header-anchor" href="#features" aria-label="Permalink to &quot;Features&quot;">​</a></h3><ul><li>Self-built IPv6 tunnel for sit/gre/ipip protocols</li><li>Support to customize the IPV6 subnet size to be cut out, and the appropriate IPV6 subnet information in CIDR format will be calculated automatically.</li><li>Automatically recognizes the IPV6 subnet size of the server side</li><li>will automatically set up the tunnel server and print the commands that the client needs to execute</li><li>Setting up the IPV6 tunnel is easy to understand and easy to remove</li></ul><h3 id="environmental-preparation" tabindex="-1">Environmental Preparation <a class="header-anchor" href="#environmental-preparation" aria-label="Permalink to &quot;Environmental Preparation&quot;">​</a></h3><table><thead><tr><th>VPS(A)</th><th>VPS(B)</th></tr></thead><tbody><tr><td>one IPV4 address (server_ipv4)</td><td>one IPV4 address (clinet_ipv4)</td></tr><tr><td>one IPV6 subnet</td><td>no IPV6 address</td></tr><tr><td>Hereafter referred to as server</td><td>Hereafter referred to as client</td></tr></tbody></table><h3 id="usage" tabindex="-1">Usage <a class="header-anchor" href="#usage" aria-label="Permalink to &quot;Usage&quot;">​</a></h3><p>Download Script</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">curl -L https://raw.githubusercontent.com/oneclickvirt/6in4/main/6in4.sh -o 6in4.sh &amp;&amp; chmod +x 6in4.sh</span></span></code></pre></div><p>Execute it</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">./6in4.sh client_ipv4 &lt;mode_type&gt; &lt;subnet_size&gt;</span></span></code></pre></div><table><thead><tr><th>Options</th><th>Optional Option 1</th><th>Optional Option 2</th><th>Optional Option 3</th></tr></thead><tbody><tr><td>&lt;mode_type&gt;</td><td>gre</td><td>sit</td><td>ipip</td></tr><tr><td>&lt;subnet_size&gt;</td><td>64</td><td>80</td><td>112</td></tr></tbody></table><p><code>&lt;mode_type&gt;</code> only support those three protocols for now, the more advanced the more recommended, no fill in the default is <code>sit</code> protocol</p><p><code>&lt;subnet_size&gt;</code> as long as it is larger than the original system subnet mask, and is a multiple of 8, if you don&#39;t fill it in, it defaults to <code>80</code>.</p><p>Remember to replace <code>client_ipv4</code> with the IPV4 address of the machine you want to attach IPV6 to, and the command you need to execute on the client side will be sent back to you after execution, see the instructions after execution for details.</p><p>To prevent you from forgetting to copy the commands, the commands themselves will be written to the <code>6in4.log</code> file under the current path, you can use <code>cat 6in4.log</code> to query the commands that need to be executed on the client side</p><p>For copied commands, be sure to select option <code>6in4</code> in <a href="https://ipv6tunnel.spiritlhl.top/" target="_blank" rel="noreferrer">https://ipv6tunnel.spiritlhl.top/</a> before converting!</p><p>Then the page will be refreshed automatically and you need to modify the contents of the<code>/etc/network/interfaces</code>file with vim or vi commands, or modify the following commands to add new contents.</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">tee -a /etc/network/interfaces &lt;&lt;EOF</span></span>
<span class="line"><span style="color:#A6ACCD;"># Modify here</span></span>
<span class="line"><span style="color:#A6ACCD;">EOF</span></span></code></pre></div><p>Then you&#39;ll need to reboot the system a bit, or run</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">apt-get install net-tools iproute2 -y</span></span>
<span class="line"><span style="color:#A6ACCD;">systemctl restart networking</span></span></code></pre></div><p>Make sure the environment is OK before you do anything else</p><h3 id="check-server-status" tabindex="-1">Check server status <a class="header-anchor" href="#check-server-status" aria-label="Permalink to &quot;Check server status&quot;">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">systemctl status ndpresponder</span></span></code></pre></div><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">ip addr show</span></span></code></pre></div><h3 id="check-client-status" tabindex="-1">Check client status <a class="header-anchor" href="#check-client-status" aria-label="Permalink to &quot;Check client status&quot;">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">ip addr show</span></span></code></pre></div><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">curl ipv6.ip.sb</span></span></code></pre></div><h3 id="delete-tunnel" tabindex="-1">Delete tunnel <a class="header-anchor" href="#delete-tunnel" aria-label="Permalink to &quot;Delete tunnel&quot;">​</a></h3><p>server</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">ip link set server-ipv6 down</span></span>
<span class="line"><span style="color:#A6ACCD;">ip tunnel del server-ipv6</span></span></code></pre></div><p>client</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">ip link set user-ipv6 down</span></span>
<span class="line"><span style="color:#A6ACCD;">ip tunnel del user-ipv6</span></span></code></pre></div><p>The above deletion is only temporary, for permanent deletion you must modify and delete the contents of the <code>/etc/network/interfaces</code> file that you have previously added.</p><h3 id="one-more-thing" tabindex="-1">one more thing <a class="header-anchor" href="#one-more-thing" aria-label="Permalink to &quot;one more thing&quot;">​</a></h3><p>In fact <a href="https://tunnelbroker.net/" target="_blank" rel="noreferrer">https://tunnelbroker.net/</a> supports the application of IPV6 subnets of size <code>/48</code></p><p><img src="https://github.com/oneclickvirt/oneclickvirt.github.io/assets/103393591/07987e41-0158-430c-bcc5-f7cd8652b2c4" alt=""></p><p>Make the request here, then when converting the format change the original <code>/64</code> IPV6 address to a <code>/48</code> IPV6 address and you&#39;ll get a larger IPV6 subnet!</p>`,161),i=[o];function l(r,c,p,d,h,u){return t(),a("div",null,i)}const g=e(n,[["render",l]]);export{m as __pageData,g as default};
