import{_ as s,v as a,b as n,R as e}from"./chunks/framework.70afa331.js";const h=JSON.parse('{"title":"Blocking abuse through iptables","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"en/guide/block/block_iptables.md","filePath":"en/guide/block/block_iptables.md","lastUpdated":1734924724000}'),l={name:"en/guide/block/block_iptables.md"},o=e(`<h1 id="blocking-abuse-through-iptables" tabindex="-1">Blocking abuse through iptables <a class="header-anchor" href="#blocking-abuse-through-iptables" aria-label="Permalink to &quot;Blocking abuse through iptables&quot;">​</a></h1><h2 id="basic-usage-of-iptables" tabindex="-1">Basic Usage of <code>iptables</code> <a class="header-anchor" href="#basic-usage-of-iptables" aria-label="Permalink to &quot;Basic Usage of \`iptables\`&quot;">​</a></h2><h3 id="_1-start-iptables" tabindex="-1">1. Start <code>iptables</code> <a class="header-anchor" href="#_1-start-iptables" aria-label="Permalink to &quot;1. Start \`iptables\`&quot;">​</a></h3><p>In most Linux distributions, the <code>iptables</code> service can be started using the following command:</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">sudo</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">systemctl</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">start</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">iptables</span></span></code></pre></div><h3 id="_2-set-rules" tabindex="-1">2. Set Rules <a class="header-anchor" href="#_2-set-rules" aria-label="Permalink to &quot;2. Set Rules&quot;">​</a></h3><p>After starting <code>iptables</code>, you can set rules to block abusive traffic. For example, the following command will block traffic from a specific IPv4 address:</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">sudo</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">iptables</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-A</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">INPUT</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-s</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">xxx.xxx.xxx.xxx</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-j</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">DROP</span></span></code></pre></div><h3 id="_3-query-rules" tabindex="-1">3. Query Rules <a class="header-anchor" href="#_3-query-rules" aria-label="Permalink to &quot;3. Query Rules&quot;">​</a></h3><p>After setting the rules, you can use the following command to view the current <code>iptables</code> rules:</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">sudo</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">iptables</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-L</span></span></code></pre></div><p>This will list all input, output, and forwarding rules.</p><h3 id="_4-stop-iptables" tabindex="-1">4. Stop <code>iptables</code> <a class="header-anchor" href="#_4-stop-iptables" aria-label="Permalink to &quot;4. Stop \`iptables\`&quot;">​</a></h3><p>If you need to stop the <code>iptables</code> service, you can use the following command:</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">sudo</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">systemctl</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">stop</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">iptables</span></span></code></pre></div><h3 id="_5-save-rules" tabindex="-1">5. Save Rules <a class="header-anchor" href="#_5-save-rules" aria-label="Permalink to &quot;5. Save Rules&quot;">​</a></h3><p>To ensure that the rules persist after a reboot, you can save the current rules:</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">sudo</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">iptables-save</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">sudo</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">tee</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">/etc/iptables/rules.v4</span></span></code></pre></div><h3 id="_6-restore-rules" tabindex="-1">6. Restore Rules <a class="header-anchor" href="#_6-restore-rules" aria-label="Permalink to &quot;6. Restore Rules&quot;">​</a></h3><p>When you need to restore the rules, you can use the following command:</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">sudo</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">iptables-restore</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">/etc/iptables/rules.v4</span></span></code></pre></div><h3 id="_7-other-common-commands" tabindex="-1">7. Other Common Commands <a class="header-anchor" href="#_7-other-common-commands" aria-label="Permalink to &quot;7. Other Common Commands&quot;">​</a></h3><ul><li><p><strong>List Rules (Detailed Information)</strong>:</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">sudo</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">iptables</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-L</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-v</span></span></code></pre></div></li><li><p><strong>Delete Specific Rule</strong>:</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">sudo</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">iptables</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-D</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">INPUT</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-s</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">192.168</span><span style="color:#C3E88D;">.1.100</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-j</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">DROP</span></span></code></pre></div></li><li><p><strong>Flush All Rules</strong>:</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">sudo</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">iptables</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-F</span></span></code></pre></div></li></ul><h2 id="block-abusive-traffic-on-the-host" tabindex="-1">Block abusive traffic on the host <a class="header-anchor" href="#block-abusive-traffic-on-the-host" aria-label="Permalink to &quot;Block abusive traffic on the host&quot;">​</a></h2><ul><li>prevention in advance</li></ul><h3 id="blocking-mining-behavior" tabindex="-1">Blocking Mining Behavior <a class="header-anchor" href="#blocking-mining-behavior" aria-label="Permalink to &quot;Blocking Mining Behavior&quot;">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">strings=(</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;ethermine.com&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;antpool.one&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;antpool.com&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;pool.bar&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;get_peers&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;announce_peer&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;find_node&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;seed_hash&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">for str in &quot;\${strings[@]}&quot;; do</span></span>
<span class="line"><span style="color:#A6ACCD;">    iptables -A OUTPUT -m string --string &quot;$str&quot; --algo bm -j DROP</span></span>
<span class="line"><span style="color:#A6ACCD;">done</span></span></code></pre></div><h3 id="blocking-bt-behavior" tabindex="-1">Blocking BT behavior <a class="header-anchor" href="#blocking-bt-behavior" aria-label="Permalink to &quot;Blocking BT behavior&quot;">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">strings=(</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;torrent&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;.torrent&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;peer_id=&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;announce&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;info_hash&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;get_peers&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;find_node&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;BitTorrent&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;announce_peer&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;BitTorrent protocol&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;announce.php?passkey=&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;magnet:&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;xunlei&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;sandai&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;Thunder&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;XLLiveUD&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">for str in &quot;\${strings[@]}&quot;; do</span></span>
<span class="line"><span style="color:#A6ACCD;">    iptables -A OUTPUT -m string --string &quot;$str&quot; --algo bm -j DROP</span></span>
<span class="line"><span style="color:#A6ACCD;">done</span></span></code></pre></div><h3 id="blocking-speed-test-behavior" tabindex="-1">Blocking Speed Test Behavior <a class="header-anchor" href="#blocking-speed-test-behavior" aria-label="Permalink to &quot;Blocking Speed Test Behavior&quot;">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">strings=(</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;.speed&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;speed.&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;.speed.&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;fast.com&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;speedtest.net&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;speedtest.com&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;speedtest.cn&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;test.ustc.edu.cn&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;10000.gd.cn&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;db.laomoe.com&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;jiyou.cloud&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;ovo.speedtestcustom.com&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;speed.cloudflare.com&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;speedtest&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">for str in &quot;\${strings[@]}&quot;; do</span></span>
<span class="line"><span style="color:#A6ACCD;">    iptables -A OUTPUT -m string --string &quot;$str&quot; --algo bm -j DROP</span></span>
<span class="line"><span style="color:#A6ACCD;">done</span></span></code></pre></div>`,31),t=[o];function p(c,r,i,u,C,d){return a(),n("div",null,t)}const y=s(l,[["render",p]]);export{h as __pageData,y as default};