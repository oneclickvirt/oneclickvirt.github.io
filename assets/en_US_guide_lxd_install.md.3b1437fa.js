import{_ as s,c as a,o as n,d as p}from"./app.37329957.js";const g='{"title":"\u624B\u52A8\u5B89\u88C5","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u624B\u52A8\u5B89\u88C5","slug":"\u624B\u52A8\u5B89\u88C5"},{"level":3,"title":"\u5173\u95ED\u9632\u706B\u5899","slug":"\u5173\u95ED\u9632\u706B\u5899"},{"level":3,"title":"\u5F00\u8BBE\u865A\u62DF\u5185\u5B58SWAP","slug":"\u5F00\u8BBE\u865A\u62DF\u5185\u5B58swap"},{"level":3,"title":"\u5B89\u88C5LXD","slug":"\u5B89\u88C5lxd"},{"level":2,"title":"\u4E00\u952E\u5B89\u88C5","slug":"\u4E00\u952E\u5B89\u88C5"}],"relativePath":"en_US/guide/lxd_install.md"}',e={},t=p(`<h2 id="\u624B\u52A8\u5B89\u88C5" tabindex="-1">\u624B\u52A8\u5B89\u88C5 <a class="header-anchor" href="#\u624B\u52A8\u5B89\u88C5" aria-hidden="true">#</a></h2><p>\u65B0\u624B\u63A8\u8350\uFF0C\u907F\u514D\u6709bug\u4E0D\u77E5\u9053\u600E\u4E48\u4FEE\uFF0C\u5F53\u7136\u5982\u679C\u53EA\u662F\u56FE\u65B9\u4FBF\u53C8\u662F\u8001\u624B\u61C2\u6392\u67E5BUG\uFF0C\u7528\u540E\u9762\u7684\u4E00\u952E\u5B89\u88C5\u4E5F\u884C</p><h3 id="\u5173\u95ED\u9632\u706B\u5899" tabindex="-1">\u5173\u95ED\u9632\u706B\u5899 <a class="header-anchor" href="#\u5173\u95ED\u9632\u706B\u5899" aria-hidden="true">#</a></h3><div class="language-bash"><pre><code><span class="token function">apt</span> update
<span class="token function">apt</span> <span class="token function">install</span> <span class="token function">curl</span> <span class="token function">wget</span> <span class="token function">sudo</span> dos2unix ufw jq -y
ufw disable
</code></pre></div><h3 id="\u5F00\u8BBE\u865A\u62DF\u5185\u5B58swap" tabindex="-1">\u5F00\u8BBE\u865A\u62DF\u5185\u5B58SWAP <a class="header-anchor" href="#\u5F00\u8BBE\u865A\u62DF\u5185\u5B58swap" aria-hidden="true">#</a></h3><p>\u5185\u5B58\u770B\u4F60\u5F00\u591A\u5C11\u5C0F\u9E21\uFF0C\u8FD9\u91CC\u5982\u679C\u8981\u5F008\u4E2A\uFF0C\u6362\u7B97\u9700\u89812G\u5185\u5B58\uFF0C\u5B9E\u9645\u5185\u5B58\u5982\u679C\u662F512MB\u5185\u5B58\uFF0C\u8FD8\u9700\u8981\u5F001.5G\uFF0C\u4FDD\u5B88\u70B9\u5F002G\u865A\u62DF\u5185\u5B58\u5373\u53EF</p><p>\u6267\u884C\u4E0B\u9762\u547D\u4EE4\uFF0C\u8F93\u51651\uFF0C\u518D\u8F93\u51652048\uFF0C\u4EE3\u8868\u5F002G\u865A\u62DF\u5185\u5B58</p><p>\u56FD\u9645</p><div class="language-shell"><pre><code><span class="token function">curl</span> -L https://raw.githubusercontent.com/spiritLHLS/lxc/main/scripts/swap.sh -o swap.sh <span class="token operator">&amp;&amp;</span> <span class="token function">chmod</span> +x swap.sh <span class="token operator">&amp;&amp;</span> <span class="token function">bash</span> swap.sh
</code></pre></div><p>\u56FD\u5185</p><div class="language-shell"><pre><code><span class="token function">curl</span> -L https://ghproxy.com/https://raw.githubusercontent.com/spiritLHLS/lxc/main/scripts/swap.sh -o swap.sh <span class="token operator">&amp;&amp;</span> <span class="token function">chmod</span> +x swap.sh <span class="token operator">&amp;&amp;</span> <span class="token function">bash</span> swap.sh
</code></pre></div><h3 id="\u5B89\u88C5lxd" tabindex="-1">\u5B89\u88C5LXD <a class="header-anchor" href="#\u5B89\u88C5lxd" aria-hidden="true">#</a></h3><p>\u5B9E\u9645swap\u5F00\u7684\u865A\u62DF\u5185\u5B58\u5E94\u8BE5\u662F\u5B9E\u9645\u5185\u5B58\u76842\u500D\uFF0C\u4E5F\u5C31\u662F\u5F001G\u662F\u5408\u7406\u7684\uFF0C\u4E0A\u9762\u6211\u63CF\u8FF0\u7684\u60C5\u51B5\u5C5E\u4E8E\u8D85\u5F00\u4E86</p><div class="language-"><pre><code>apt install snapd -y
snap install lxd
/snap/bin/lxd init
</code></pre></div><p>\u5982\u679C\u4E0A\u9762\u7684\u547D\u4EE4\u4E2D\u51FA\u73B0\u4E0B\u9762\u7684\u9519\u8BEF</p><p>(snap &quot;lxd&quot; assumes unsupported features: snapd2.39 (try to update snapd and refresh the core snap))</p><p>\u4F7F\u7528\u547D\u4EE4\u4FEE\u8865\u540E\u518D\u8FDB\u884Clxd\u7684\u5B89\u88C5</p><div class="language-"><pre><code>snap install core
</code></pre></div><p>\u5982\u679C\u65E0\u5F02\u5E38\uFF0C\u4E0A\u9762\u4E09\u884C\u547D\u4EE4\u6267\u884C\u7ED3\u679C\u5982\u4E0B</p><p><img src="https://user-images.githubusercontent.com/103393591/233270028-5a43d0f7-45f5-4175-969e-d4d182cb877a.png" alt=""></p><p>\u4E00\u822C\u7684\u9009\u9879\u56DE\u8F66\u9ED8\u8BA4\u5373\u53EF</p><p>\u9009\u62E9\u914D\u7F6E\u7269\u7406\u76D8\u5927\u5C0F(\u63D0\u793A\u9ED8\u8BA4\u6700\u5C0F1GB\u90A3\u4E2A\u9009\u9879)\uFF0C\u4E00\u822C\u6211\u586B\u7A7A\u95F2\u78C1\u76D8\u5927\u5C0F\u51CF\u53BB\u5185\u5B58\u5927\u5C0F\u540E\u4E58\u4EE50.95\u5E76\u5411\u4E0B\u53D6\u6574\uFF0C\u8FD9\u91CC\u6211\u586B\u4E8610GB</p><p>\u63D0\u793A\u5E26auto\u7684\u66F4\u65B0image\u7684\u9009\u9879\u8BB0\u5F97\u9009no\uFF0C\u907F\u514D\u66F4\u65B0\u5360\u7528\u7CFB\u7EDF</p><p>\u6D4B\u8BD5lxc\u6709\u6CA1\u6709\u8F6F\u8FDE\u63A5\u4E0A</p><div class="language-"><pre><code>lxc -h
</code></pre></div><p>\u5982\u679C\u62A5\u9519\u5219\u6267\u884C\u4EE5\u4E0B\u547D\u4EE4\u8F6F\u8FDE\u63A5lxc\u547D\u4EE4</p><div class="language-bash"><pre><code><span class="token operator">!</span> lxc -h <span class="token operator">&gt;</span>/dev/null <span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span><span class="token file-descriptor important">&amp;1</span> <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">echo</span> <span class="token string">&#39;alias lxc=&quot;/snap/bin/lxc&quot;&#39;</span> <span class="token operator">&gt;&gt;</span> /root/.bashrc <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">source</span> /root/.bashrc
<span class="token builtin class-name">export</span> <span class="token assign-left variable"><span class="token environment constant">PATH</span></span><span class="token operator">=</span><span class="token environment constant">$PATH</span>:/snap/bin
</code></pre></div><p>\u8FDE\u63A5\u540E\u518D\u6D4B\u8BD5lxc\u547D\u4EE4\u662F\u5426\u6709\u62A5\u9519\u627E\u4E0D\u5230</p><h2 id="\u4E00\u952E\u5B89\u88C5" tabindex="-1">\u4E00\u952E\u5B89\u88C5 <a class="header-anchor" href="#\u4E00\u952E\u5B89\u88C5" aria-hidden="true">#</a></h2><p>::tip \u5982\u679C\u662F\u5168\u65B0\u7684\u670D\u52A1\u5668\uFF0C\u52A1\u5FC5\u4FDD\u8BC1apt update\u548Capt install curl\u90FD\u65E0\u95EE\u9898\u518D\u6267\u884C\u672C\u811A\u672C \u4E14\u81EA\u5F00\u673A\u8D77\u6700\u597D\u7B49\u5F855\u5206\u949F\u540E\u518D\u6267\u884C\u4EE5\u4E0B\u547D\u4EE4\uFF0C\u907F\u514D\u7CFB\u7EDF\u9ED8\u8BA4\u8BBE\u7F6E\u4E2D\u5C31\u6267\u884C\u4E86\u672C\u811A\u672C\u5BFC\u81F4apt\u6E90\u5361\u6B7B ::</p><ul><li>\u73AF\u5883\u8981\u6C42\uFF1AUbuntu 18+(\u63A8\u8350)\uFF0CDebian 8+(\u4EC5\u9650x86_64\u67B6\u6784)</li></ul><p><strong>\u5982\u679C\u662FDebian\u7CFB\u7684\u5BBF\u4E3B\u673A\uFF0C\u52A1\u5FC5\u5728screen\u4E2D\u6267\u884C\u672C\u811A\u672C\uFF0C\u907F\u514D\u957F\u671F\u8FD0\u884C\u65F6SSH\u4E2D\u65AD\u5BFC\u81F4ZFS\u7F16\u8BD1\u5B89\u88C5\u5931\u8D25</strong></p><p>\u8FD9\u91CC\u7684\u865A\u62DF\u5185\u5B58\u662F\u8BF4\u8981\u5F00\u7684SWAP\u5927\u5C0F\uFF0C\u5B58\u50A8\u6C60\u5219\u662F\u4F60\u6240\u6709\u8981\u5F00\u7684\u5C0F\u9E21\u5360\u7684\u76D8\u7684\u5927\u5C0F\u7684\u603B\u548C</p><p>\u73AF\u5883\u5B89\u88C5\u8FC7\u7A0B\u4E2D\u53EF\u80FD\u9700\u8981\u91CD\u542F\u670D\u52A1\u5668\u518D\u6B21\u6267\u884C\u4EE5\u52A0\u8F7D\u542Bzfs\u7684\u5185\u6838\uFF0C\u4E00\u5207\u4EE5\u8FD0\u884C\u540E\u547D\u4EE4\u884C\u7684\u63D0\u793A\u4E3A\u51C6</p><p>\u56FD\u9645</p><div class="language-shell"><pre><code><span class="token function">curl</span> -L https://raw.githubusercontent.com/spiritLHLS/lxc/main/scripts/lxdinstall.sh -o lxdinstall.sh <span class="token operator">&amp;&amp;</span> <span class="token function">chmod</span> +x lxdinstall.sh <span class="token operator">&amp;&amp;</span> <span class="token function">bash</span> lxdinstall.sh
</code></pre></div><p>\u56FD\u5185</p><div class="language-shell"><pre><code><span class="token function">curl</span> -L https://ghproxy.com/https://raw.githubusercontent.com/spiritLHLS/lxc/main/scripts/lxdinstall.sh -o lxdinstall.sh <span class="token operator">&amp;&amp;</span> <span class="token function">chmod</span> +x lxdinstall.sh <span class="token operator">&amp;&amp;</span> <span class="token function">bash</span> lxdinstall.sh
</code></pre></div><p>\u4F8B\u5B50\uFF1A</p><p>\u5982\u679C\u7CFB\u7EDF\u76D8\u9664\u53BB\u5DF2\u5360\u7528\u7A7A\u95F4\u8FD8\u670918G\u786C\u76D8\u7A7A\u4F59\uFF0C\u60F3\u5F002G\u865A\u62DF\u5185\u5B58(2048MB\u7684SWAP)\uFF0C15G\u7684\u5B58\u50A8\u6C60\uFF0C\u6309\u7167\u547D\u4EE4\u884C\u7684\u63D0\u793A\u5219\u4F9D\u6B21\u8F93\u5165<code>2048</code>\u548C<code>15</code></p>`,40),o=[t];function l(c,r,i,d,h,u){return n(),a("div",null,o)}var x=s(e,[["render",l]]);export{g as __pageData,x as default};
