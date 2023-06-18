import{_ as e,c as t,o as a,d as i}from"./app.005aa5c6.js";const b='{"title":"\u7CFB\u7EDF\u548C\u786C\u4EF6\u914D\u7F6E\u8981\u6C42","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u5404\u79CD\u8981\u6C42","slug":"\u5404\u79CD\u8981\u6C42"},{"level":2,"title":"\u68C0\u6D4B\u73AF\u5883","slug":"\u68C0\u6D4B\u73AF\u5883"}],"relativePath":"guide/pve_precheck.md","lastUpdated":1687064519000}',r={},l=i(`<h1 id="\u7CFB\u7EDF\u548C\u786C\u4EF6\u914D\u7F6E\u8981\u6C42" tabindex="-1">\u7CFB\u7EDF\u548C\u786C\u4EF6\u914D\u7F6E\u8981\u6C42 <a class="header-anchor" href="#\u7CFB\u7EDF\u548C\u786C\u4EF6\u914D\u7F6E\u8981\u6C42" aria-hidden="true">#</a></h1><h2 id="\u5404\u79CD\u8981\u6C42" tabindex="-1">\u5404\u79CD\u8981\u6C42 <a class="header-anchor" href="#\u5404\u79CD\u8981\u6C42" aria-hidden="true">#</a></h2><p>\u5EFA\u8BAEdebian\u5728\u4F7F\u7528\u524D\u5C3D\u91CF\u4F7F\u7528\u6700\u65B0\u7684\u7A33\u5B9A\u7248\u672C\u7684\u7CFB\u7EDF</p><p>\u975Edebian11\u53EF\u4F7F\u7528 <a href="https://github.com/spiritLHLS/one-click-installation-script#%E4%B8%80%E9%94%AE%E5%8D%87%E7%BA%A7%E4%BD%8E%E7%89%88%E6%9C%ACdebian%E4%B8%BAdebian11" target="_blank" rel="noopener noreferrer">debian\u4E00\u952E\u5347\u7EA7</a> \u6765\u5347\u7EA7\u7CFB\u7EDF</p><p>\u672C\u9879\u76EE\u53EA\u9002\u914DDebian\u7CFB\u7EDF(\u975EDebian\u65E0\u6CD5\u901A\u8FC7APT\u6E90\u5B89\u88C5\uFF0C\u5B98\u65B9\u53EA\u7ED9\u4E86Debian\u7684\u955C\u50CF\uFF0C\u5176\u4ED6\u7CFB\u7EDF\u53EA\u80FD\u4F7F\u7528ISO\u5B89\u88C5)</p><ul><li>\u7CFB\u7EDF\u8981\u6C42\uFF1ADebian 8+</li></ul><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>\u5EFA\u8BAEdebian11\u800C\u4E0D\u662Fdebian12\uFF0C\u56E0\u4E3A\u540E\u8005\u662Fbeta\u7248\u672C\uFF0Cdebian11\u5B89\u88C5\u7684\u624D\u662F\u7A33\u5B9A\u7248</p></div><ul><li>\u786C\u4EF6\u8981\u6C42\uFF1A2\u68382G\u5185\u5B58x86_64\u67B6\u6784\u670D\u52A1\u5668\u786C\u76D8\u81F3\u5C1120G</li></ul><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>\u5185\u5B58\u5F00\u70B9swap\u514D\u5F97\u673A\u5668\u70B8\u4E86<a href="https://github.com/spiritLHLS/addswap" target="_blank" rel="noopener noreferrer">\u5F00SWAP\u70B9\u6211\u8DF3\u8F6C</a></p></div><ul><li>\u53EF\u5F00KVM\u7684\u786C\u4EF6\u8981\u6C42\uFF1AVM-X\u6216AMD-V\u652F\u6301 (\u90E8\u5206VPS\u548C\u5168\u90E8\u72EC\u670D\u652F\u6301)</li><li>\u5982\u679C\u786C\u4EF6\u6216\u7CFB\u7EDF\u9700\u6C42\u4E0D\u6EE1\u8DB3\uFF0C\u53EF\u4F7F\u7528LXD\u6279\u91CF\u5F00LXC\u5BB9\u5668<a href="https://github.com/spiritLHLS/lxc" target="_blank" rel="noopener noreferrer">\u8DF3\u8F6C</a></li></ul><p><strong>\u9047\u5230\u9009\u9879\u4E0D\u4F1A\u9009\u7684\u53EF\u65E0\u8111\u56DE\u8F66\u5B89\u88C5\uFF0C\u672C\u9879\u76EE\u6240\u6709\u811A\u672C\u5185\u7F6E\u56FD\u5185\u5916IP\u81EA\u52A8\u5224\u65AD\uFF0C\u4F7F\u7528\u7684\u662F\u4E0D\u540C\u7684\u5B89\u88C5\u6E90\u4E0E\u914D\u7F6E\u6587\u4EF6\uFF0C\u6709\u4F7F\u7528CDN\u52A0\u901F\u955C\u50CF\u4E0B\u8F7D</strong></p><h2 id="\u68C0\u6D4B\u73AF\u5883" tabindex="-1">\u68C0\u6D4B\u73AF\u5883 <a class="header-anchor" href="#\u68C0\u6D4B\u73AF\u5883" aria-hidden="true">#</a></h2><ul><li>\u672C\u9879\u76EE\u76F8\u5173\u811A\u672C\u6267\u884C\u524D\u52A1\u5FC5\u6267\u884C\u672C\u811A\u672C\u68C0\u6D4B\u73AF\u5883\uFF0C\u5982\u679C\u4E0D\u7B26\u5408\u5B89\u88C5PVE\u7684\u8981\u6C42\u5219\u65E0\u6CD5\u4F7F\u7528\u540E\u7EED\u7684\u811A\u672C</li><li>\u68C0\u6D4B\u786C\u4EF6\u914D\u7F6E\u662F\u5426\u6EE1\u8DB3\u6700\u4F4E\u8981\u6C42</li><li>\u68C0\u6D4B\u786C\u4EF6\u73AF\u5883\u662F\u5426\u53EF\u5D4C\u5957\u865A\u62DF\u5316KVM\u7C7B\u578B\u7684\u670D\u52A1\u5668</li><li>\u68C0\u6D4B\u7CFB\u7EDF\u73AF\u5883\u662F\u5426\u53EF\u5D4C\u5957\u865A\u62DF\u5316KVM\u7C7B\u578B\u7684\u670D\u52A1\u5668</li><li>\u4E0D\u53EF\u5D4C\u5957\u865A\u62DF\u5316KVM\u7C7B\u578B\u7684\u670D\u52A1\u5668\u4E5F\u53EF\u4EE5\u5F00LXC\u865A\u62DF\u5316\u7684\u670D\u52A1\u5668\uFF0C\u4F46\u4E0D\u63A8\u8350\u5B89\u88C5PVE\uFF0C\u4E0D\u5982\u4F7F\u7528<a href="https://github.com/spiritLHLS/lxc" target="_blank" rel="noopener noreferrer">LXD</a></li></ul><p>\u56FD\u9645</p><div class="language-"><pre><code>bash &lt;(wget -qO- --no-check-certificate https://raw.githubusercontent.com/spiritLHLS/pve/main/scripts/check_kernal.sh)
</code></pre></div><p>\u56FD\u5185</p><div class="language-"><pre><code>bash &lt;(wget -qO- --no-check-certificate https://ghproxy.com/https://raw.githubusercontent.com/spiritLHLS/pve/main/scripts/check_kernal.sh)
</code></pre></div>`,17),c=[l];function n(s,p,o,d,h,_){return a(),t("div",null,c)}var g=e(r,[["render",n]]);export{b as __pageData,g as default};
