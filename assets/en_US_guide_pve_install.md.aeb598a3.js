import{_ as e,c as s,o as a,d as n}from"./app.37329957.js";const v='{"title":"\u4E00\u952E\u5B89\u88C5PVE","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u4E00\u952E\u5B89\u88C5PVE","slug":"\u4E00\u952E\u5B89\u88C5pve"},{"level":2,"title":"\u9884\u914D\u7F6E\u73AF\u5883","slug":"\u9884\u914D\u7F6E\u73AF\u5883"},{"level":3,"title":"\u81EA\u52A8\u914D\u7F6E\u5BBF\u4E3B\u673A\u7684\u7F51\u5173","slug":"\u81EA\u52A8\u914D\u7F6E\u5BBF\u4E3B\u673A\u7684\u7F51\u5173"}],"relativePath":"en_US/guide/pve_install.md"}',t={},o=n(`<h2 id="\u4E00\u952E\u5B89\u88C5pve" tabindex="-1">\u4E00\u952E\u5B89\u88C5PVE <a class="header-anchor" href="#\u4E00\u952E\u5B89\u88C5pve" aria-hidden="true">#</a></h2><ul><li>\u5B89\u88C5\u7684\u662F\u5F53\u4E0Bapt\u6E90\u6700\u65B0\u7684PVE</li><li>\u6BD4\u5982debian10\u5219\u662Fpve6.4\uFF0Cdebian11\u5219\u662Fpve7.x\uFF0Cdebian12\u5219\u662Fpve8.x ::tip \u5EFA\u8BAEdebian11\u800C\u4E0D\u662Fdebian12\uFF0C\u56E0\u4E3A\u540E\u8005\u662Fbeta\u7248\u672C\uFF0Cdebian11\u5B89\u88C5\u7684\u624D\u662F\u7A33\u5B9A\u7248 ::</li><li>/etc/hosts\u6587\u4EF6\u4FEE\u6539(\u4FEE\u6B63\u5546\u5BB6hostname\u8BBE\u7F6E\u9519\u8BEF\u4EE5\u53CA\u65B0\u589EPVE\u6240\u9700\u7684\u5185\u5BB9)</li><li>\u5DF2\u8BBE\u7F6E<code>/etc/hosts</code>\u4E3A\u53EA\u8BFB\u6A21\u5F0F\uFF0C\u907F\u514D\u91CD\u542F\u540E\u6587\u4EF6\u88AB\u8986\u5199\uFF0C\u5982\u9700\u4FEE\u6539\u8BF7\u4F7F\u7528<code>chattr -i /etc/hosts</code>\u53D6\u6D88\u53EA\u8BFB\u9501\u5B9A\uFF0C\u4FEE\u6539\u5B8C\u6BD5\u8BF7\u6267\u884C<code>chattr +i /etc/hosts</code>\u53EA\u8BFB\u9501\u5B9A</li><li>\u68C0\u6D4B<code>/etc/cloud/cloud.cfg</code>\u5982\u679C\u53D1\u73B0<code>preserve_hostname</code>\u662F<code>false</code>\uFF0C\u5219\u6539\u4E3A<code>true</code>\uFF0C\u540C\u4E0A\uFF0C\u4E5F\u7528chattr\u547D\u4EE4\u8FDB\u884C\u4E86\u6587\u4EF6\u9501\u5B9A\u907F\u514D\u91CD\u542F\u8986\u76D6\u8BBE\u7F6E</li><li>\u68C0\u6D4B\u662F\u5426\u4E3A\u4E2D\u56FDIP\uFF0C\u5982\u679C\u4E3A\u4E2D\u56FDIP\u4F7F\u7528\u6E05\u534E\u955C\u50CF\u6E90\uFF0C\u5426\u5219\u4F7F\u7528\u5B98\u65B9\u6E90</li><li>\u5B89\u88C5PVE\u5F00\u865A\u62DF\u673A\u9700\u8981\u7684\u5FC5\u5907\u5DE5\u5177\u5305</li><li>\u66FF\u6362apt\u6E90\u4E2D\u7684\u4F01\u4E1A\u8BA2\u9605\u4E3A\u793E\u533A\u6E90</li><li>\u6253\u5370\u67E5\u8BE2Linux\u7CFB\u7EDF\u5185\u6838\u548CPVE\u5185\u6838\u662F\u5426\u5DF2\u5B89\u88C5</li><li>\u68C0\u6D4B<code>/etc/resolv.conf</code>\u662F\u5426\u4E3A\u7A7A\uFF0C\u4E3A\u7A7A\u5219\u8BBE\u7F6E\u68C0\u6D4B<code>8.8.8.8</code>\u7684\u5F00\u673A\u81EA\u542F\u6DFB\u52A0DNS\u7684systemd\u670D\u52A1</li><li>\u65B0\u589EPVE\u7684APT\u6E90\u94FE\u63A5\u540E\uFF0C\u4E0B\u8F7DPVE\u5E76\u6253\u5370\u8F93\u51FA\u767B\u9646\u4FE1\u606F</li></ul><p>\u56FD\u9645</p><div class="language-shell"><pre><code><span class="token function">curl</span> -L https://raw.githubusercontent.com/spiritLHLS/pve/main/scripts/install_pve.sh -o install_pve.sh <span class="token operator">&amp;&amp;</span> <span class="token function">chmod</span> +x install_pve.sh <span class="token operator">&amp;&amp;</span> <span class="token function">bash</span> install_pve.sh
</code></pre></div><p>\u56FD\u5185</p><div class="language-shell"><pre><code><span class="token function">curl</span> -L https://ghproxy.com/https://raw.githubusercontent.com/spiritLHLS/pve/main/scripts/install_pve.sh -o install_pve.sh <span class="token operator">&amp;&amp;</span> <span class="token function">chmod</span> +x install_pve.sh <span class="token operator">&amp;&amp;</span> <span class="token function">bash</span> install_pve.sh
</code></pre></div><h2 id="\u9884\u914D\u7F6E\u73AF\u5883" tabindex="-1">\u9884\u914D\u7F6E\u73AF\u5883 <a class="header-anchor" href="#\u9884\u914D\u7F6E\u73AF\u5883" aria-hidden="true">#</a></h2><ul><li>\u521B\u5EFA\u8D44\u6E90\u6C60mypool</li><li>\u79FB\u9664\u8BA2\u9605\u5F39\u7A97</li><li>\u5C1D\u8BD5\u5F00\u542F\u786C\u4EF6\u76F4\u901A</li><li>\u68C0\u6D4BAppArmor\u6A21\u5757\u5E76\u8BD5\u56FE\u5B89\u88C5</li><li>\u91CD\u542F\u7CFB\u7EDF\u524D\u63A8\u8350\u6302\u4E0A<a href="https://github.com/naiba/nezha" target="_blank" rel="noopener noreferrer">nezha\u63A2\u9488</a>\u65B9\u4FBF\u5728\u540E\u53F0\u4E0D\u901A\u8FC7SSH\u4F7F\u7528\u547D\u4EE4\u884C\uFF0C\u907F\u514DSSH\u53EF\u80FD\u56E0\u4E3A\u5546\u5BB6\u5947\u8469\u7684\u9884\u8BBE\u5BFC\u81F4\u91CD\u542F\u540Eroot\u5BC6\u7801\u4E22\u5931</li><li><strong>\u6267\u884C\u5B8C\u6BD5\u5EFA\u8BAE\u7B49\u5F85\u51E0\u5206\u949F\u540E\u518D\u91CD\u542F\u670D\u52A1\u5668</strong>\uFF0C\u6267\u884C<code>reboot</code>\u524D\u9700\u8981\u7B49\u5F85\u540E\u53F0\u4EFB\u52A1\u6267\u884C\u5B8C\u6BD5\uFF0C\u4E00\u4E9B\u5BBF\u4E3B\u673A\u7684\u7CFB\u7EDFapt\u547D\u4EE4\u6267\u884C\u5F88\u6162\uFF0C\u5F97\u7B49\u4E00\u4F1A\u624D\u80FD\u6267\u884C\u5B8C\u6BD5</li></ul><p>\u56FD\u9645</p><div class="language-shell"><pre><code><span class="token function">bash</span> <span class="token operator">&lt;</span><span class="token punctuation">(</span><span class="token function">wget</span> -qO- --no-check-certificate https://raw.githubusercontent.com/spiritLHLS/pve/main/scripts/build_backend.sh<span class="token punctuation">)</span>
</code></pre></div><p>\u56FD\u5185</p><div class="language-shell"><pre><code><span class="token function">bash</span> <span class="token operator">&lt;</span><span class="token punctuation">(</span><span class="token function">wget</span> -qO- --no-check-certificate https://ghproxy.com/https://raw.githubusercontent.com/spiritLHLS/pve/main/scripts/build_backend.sh<span class="token punctuation">)</span>
</code></pre></div><h3 id="\u81EA\u52A8\u914D\u7F6E\u5BBF\u4E3B\u673A\u7684\u7F51\u5173" tabindex="-1">\u81EA\u52A8\u914D\u7F6E\u5BBF\u4E3B\u673A\u7684\u7F51\u5173 <a class="header-anchor" href="#\u81EA\u52A8\u914D\u7F6E\u5BBF\u4E3B\u673A\u7684\u7F51\u5173" aria-hidden="true">#</a></h3><p>::warning \u4F7F\u7528\u524D\u8BF7\u4FDD\u8BC1\u91CD\u542F\u8FC7\u670D\u52A1\u5668\u4E14\u6B64\u65F6PVE\u80FD\u6B63\u5E38\u4F7F\u7528WEB\u7AEF\u518D\u6267\u884C\uFF0C\u91CD\u542F\u673A\u5668\u540E\u4E0D\u8981\u7ACB\u5373\u6267\u884C\u6B64\u547D\u4EE4\uFF0C\u5F85WEB\u7AEF\u542F\u52A8\u6210\u529F\u540E\u81F3\u5C11\u7B495\u5206\u949F\u518D\u6267\u884C\u672C\u547D\u4EE4 \u8FD9\u4E00\u6B65\u662F\u6700\u5BB9\u6613\u9020\u6210SSH\u65AD\u5F00\u7684\uFF0C\u539F\u56E0\u662F\u672A\u7B49\u5F85PVE\u5185\u6838\u542F\u52A8\u5C31\u4FEE\u6539\u7F51\u7EDC\u4F1A\u9020\u6210\u8BBE\u7F6E\u51B2\u7A81\uFF0C\u6240\u4EE5\u81F3\u5C11\u7B49\u51E0\u5206\u949F\u5F85\u5185\u6838\u542F\u52A8\u4E5F\u5C31\u662FWEB\u7AEF\u542F\u52A8\u6210\u529F\u540E\u518D\u6267\u884C ::</p><ul><li>\u521B\u5EFAvmbr0\uFF0C\u6BCD\u9E21\u5141\u8BB8addr\u548Cgateway\u4E3A\u5185\u7F51IP\u6216\u5916\u7F51IP\uFF0C\u5DF2\u81EA\u52A8\u8BC6\u522B</li><li>vmbr0\u521B\u5EFA\u652F\u6301\u7EAFIPV4\u6216\u53CC\u6808\u670D\u52A1\u5668\uFF0C\u81EA\u52A8\u8BC6\u522BIPV4\u5730\u5740\u548CIPV6\u5730\u5740\uFF0C\u81EA\u52A8\u8BC6\u522B\u5BF9\u5E94\u7684IP\u533A\u95F4</li><li>\u521B\u5EFAvmbr1(NAT\u7F51\u5173)</li><li>\u5F00NAT\u865A\u62DF\u673A\u65F6\u7F51\u5173\uFF08IPV4\uFF09\u4F7F\u7528<code>172.16.1.1</code>\uFF0CIPV4/CIDR\u4F7F\u7528<code>172.16.1.x/24</code>\uFF0C\u8FD9\u91CC\u7684x\u4E0D\u80FD\u662F1\uFF0C\u5F53\u7136\u5982\u679C\u540E\u7EED\u4F7F\u7528\u672C\u5957\u811A\u672C\u65E0\u9700\u5173\u6CE8\u8FD9\u70B9\u7EC6\u679D\u672B\u8282\u7684\u4E1C\u897F</li><li>\u60F3\u67E5\u770B\u5B8C\u6574\u8BBE\u7F6E\u53EF\u4EE5\u6267\u884C<code>cat /etc/network/interfaces</code>\u67E5\u770B</li><li>\u52A0\u8F7Diptables\u5E76\u8BBE\u7F6E\u56DE\u6E90\u4E14\u5141\u8BB8NAT\u7AEF\u53E3\u8F6C\u53D1</li></ul><p>\u56FD\u9645</p><div class="language-shell"><pre><code><span class="token function">bash</span> <span class="token operator">&lt;</span><span class="token punctuation">(</span><span class="token function">wget</span> -qO- --no-check-certificate https://raw.githubusercontent.com/spiritLHLS/pve/main/scripts/build_nat_network.sh<span class="token punctuation">)</span>
</code></pre></div><p>\u56FD\u5185</p><div class="language-shell"><pre><code><span class="token function">bash</span> <span class="token operator">&lt;</span><span class="token punctuation">(</span><span class="token function">wget</span> -qO- --no-check-certificate https://ghproxy.com/https://raw.githubusercontent.com/spiritLHLS/pve/main/scripts/build_nat_network.sh<span class="token punctuation">)</span>
</code></pre></div>`,19),c=[o];function p(i,l,r,d,h,u){return a(),s("div",null,c)}var k=e(t,[["render",p]]);export{v as __pageData,k as default};
