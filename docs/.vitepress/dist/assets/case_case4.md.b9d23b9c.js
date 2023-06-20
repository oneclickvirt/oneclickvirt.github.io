import{_ as e,c as a,o as r,a as i}from"./app.8fc4a373.js";const _='{"title":"\u4ED3\u5E93","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u7532\u9AA8\u6587\u670D\u52A1\u5668\u4FDD\u6D3B\u811A\u672C","slug":"\u7532\u9AA8\u6587\u670D\u52A1\u5668\u4FDD\u6D3B\u811A\u672C"},{"level":3,"title":"\u57FA\u7840\u5F00\u53D1\u5B8C\u6BD5\uFF0C\u6D4B\u8BD5\u4E2D\uFF0C\u6709\u95EE\u9898\u8BF7\u5728issues\u4E2D\u53CD\u9988","slug":"\u57FA\u7840\u5F00\u53D1\u5B8C\u6BD5\uFF0C\u6D4B\u8BD5\u4E2D\uFF0C\u6709\u95EE\u9898\u8BF7\u5728issues\u4E2D\u53CD\u9988"},{"level":3,"title":"\u8BF4\u660E","slug":"\u8BF4\u660E"}],"relativePath":"case/case4.md","lastUpdated":1687182420000}',s={},t=i(`<h1 id="\u4ED3\u5E93" tabindex="-1">\u4ED3\u5E93 <a class="header-anchor" href="#\u4ED3\u5E93" aria-hidden="true">#</a></h1><p><a href="https://github.com/spiritLHLS/Oracle-server-keep-alive-script" target="_blank" rel="noopener noreferrer">https://github.com/spiritLHLS/Oracle-server-keep-alive-script</a></p><h1 id="oracle-server-keep-alive-script" tabindex="-1">Oracle-server-keep-alive-script <a class="header-anchor" href="#oracle-server-keep-alive-script" aria-hidden="true">#</a></h1><p>\u5B9E\u9645\u4E0D\u6B62\u53EF\u4EE5\u5728\u7532\u9AA8\u6587\u670D\u52A1\u5668\u4E0A\u4F7F\u7528\uFF0C\u4E5F\u53EF\u4EE5\u4F7F\u7528\u5728\u4EFB\u610FARM\u6216X86_64\u67B6\u6784\u7684\u7CFB\u7EDF\uFF0C\u7528\u4F5C\u8D44\u6E90\u5360\u7528</p><h2 id="\u7532\u9AA8\u6587\u670D\u52A1\u5668\u4FDD\u6D3B\u811A\u672C" tabindex="-1">\u7532\u9AA8\u6587\u670D\u52A1\u5668\u4FDD\u6D3B\u811A\u672C <a class="header-anchor" href="#\u7532\u9AA8\u6587\u670D\u52A1\u5668\u4FDD\u6D3B\u811A\u672C" aria-hidden="true">#</a></h2><p>\u9002\u914D\u7CFB\u7EDF\uFF1A\u5DF2\u5728Ubuntu 20+\uFF0CDebian 10+, Centos 7+, Oracle linux 8+\uFF0CAlmaLinux 8.5+</p><p>\u4E0A\u8FF0\u7CFB\u7EDF\u9A8C\u8BC1\u65E0\u95EE\u9898\uFF0C\u522B\u7684\u4E3B\u6D41\u7CFB\u7EDF\u5E94\u8BE5\u4E5F\u6CA1\u6709\u95EE\u9898</p><p>\u53EF\u9009\u5360\u7528\uFF1ACPU\uFF0C\u5185\u5B58\uFF0C\u5E26\u5BBD</p><p>\u5B89\u88C5\u5B8C\u6BD5\u540E\u5982\u679C\u6709\u95EE\u9898\u8BF7\u5378\u8F7D\u811A\u672C\u53CD\u9988\u95EE\u9898(\u91CD\u590D\u5378\u8F7D\u4E5F\u6CA1\u95EE\u9898)</p><p>\u6240\u6709\u8D44\u6E90(\u9664\u4E86CPU)\u53EF\u9009\u9ED8\u8BA4\u914D\u7F6E\u5219\u52A8\u6001\u5360\u7528\uFF0C\u5B9E\u65F6\u8C03\u6574\uFF0C\u907F\u514D\u670D\u52A1\u5668\u6709\u522B\u7684\u4EFB\u4F55\u8D44\u6E90\u5DF2\u7ECF\u8D85\u8FC7\u9650\u989D\u4E86\u4ECD\u7136\u518D\u5360\u7528\u8D44\u6E90</p><p>\u4E3A\u907F\u514DGitHub\u7684CDN\u62BD\u98CE\u52A0\u8F7D\u4E0D\u4E86\u65B0\u5185\u5BB9\uFF0C\u6240\u6709\u65B0\u66F4\u65B0\u5DF2\u4F7F\u7528<a href="https://gitlab.com/spiritysdx/Oracle-server-keep-alive-script" target="_blank" rel="noopener noreferrer">Gitlab\u4ED3\u5E93</a></p><p>\u7531\u4E8Espeedtest-go\u7684release\u4F9D\u8D56\u4E8EGitHub\uFF0C\u6240\u4EE5\u8BF7\u68C0\u67E5 <a href="https://www.githubstatus.com/" target="_blank" rel="noopener noreferrer">www.githubstatus.com</a> ,\u6709\u95EE\u9898\u65F6\u65E0\u6CD5\u5B89\u88C5\u5E26\u5BBD\u5360\u7528</p><h3 id="\u57FA\u7840\u5F00\u53D1\u5B8C\u6BD5\uFF0C\u6D4B\u8BD5\u4E2D\uFF0C\u6709\u95EE\u9898\u8BF7\u5728issues\u4E2D\u53CD\u9988" tabindex="-1">\u57FA\u7840\u5F00\u53D1\u5B8C\u6BD5\uFF0C\u6D4B\u8BD5\u4E2D\uFF0C\u6709\u95EE\u9898\u8BF7\u5728issues\u4E2D\u53CD\u9988 <a class="header-anchor" href="#\u57FA\u7840\u5F00\u53D1\u5B8C\u6BD5\uFF0C\u6D4B\u8BD5\u4E2D\uFF0C\u6709\u95EE\u9898\u8BF7\u5728issues\u4E2D\u53CD\u9988" aria-hidden="true">#</a></h3><p>\u9009\u98791\u5B89\u88C5\uFF0C\u9009\u98792\u5378\u8F7D\uFF0C\u9009\u98793\u66F4\u65B0\u5B89\u88C5\u5F15\u5BFC\u811A\u672C\uFF0C\u9009\u98794\u9000\u51FA\u811A\u672C</p><p>\u5B89\u88C5\u8FC7\u7A0B\u4E2D\u65E0\u8111\u56DE\u8F66\u5219\u5168\u90E8\u53EF\u9009\u7684\u5360\u7528\u90FD\u5360\u7528\uFF0C\u4E0D\u9700\u8981\u4EC0\u4E48\u5360\u7528\u8F93\u5165<code>n</code>\u518D\u56DE\u8F66</p><p>\u5982\u679C\u9009\u62E9\u5E26\u5BBD\u5360\u7528\uFF0C\u4F1A\u8BE2\u95EE\u4F7F\u7528speedtest-go\u5360\u7528\u8FD8\u662F\u4F7F\u7528wget\u5360\u7528\uFF0C\u6309\u7167\u63D0\u793A\u8FDB\u884C\u9009\u62E9\u5373\u53EF</p><p>\u6709\u8BE2\u95EE\u662F\u5426\u9700\u8981\u5E26\u5BBD\u5360\u7528\u7684\u53C2\u6570\u81EA\u5B9A\u4E49\uFF0C\u8FD9\u65F6\u5019\u9ED8\u8BA4\u9009\u9879\u5C31\u662F<code>n</code>\uFF0C\u56DE\u8F66\u5C31\u4F7F\u7528\u9ED8\u8BA4\u914D\u7F6E\uFF0C\u8F93\u5165<code>y</code>\u518D\u56DE\u8F66\u5219\u9700\u8981\u6309\u7167\u63D0\u793A\u81EA\u5B9A\u4E49\u53C2\u6570</p><div class="language-"><pre><code>curl -L https://gitlab.com/spiritysdx/Oracle-server-keep-alive-script/-/raw/main/oalive.sh -o oalive.sh &amp;&amp; chmod +x oalive.sh &amp;&amp; bash oalive.sh
</code></pre></div><p>\u6216</p><div class="language-"><pre><code>bash oalive.sh
</code></pre></div><p>\u6216</p><div class="language-"><pre><code>bash &lt;(wget -qO- --no-check-certificate https://gitlab.com/spiritysdx/Oracle-server-keep-alive-script/-/raw/main/oalive.sh)
</code></pre></div><h3 id="\u8BF4\u660E" tabindex="-1">\u8BF4\u660E <a class="header-anchor" href="#\u8BF4\u660E" aria-hidden="true">#</a></h3><ul><li>\u63D0\u4F9B\u4E24\u79CDCPU\u5360\u7528\u6A21\u5F0F\uFF1ADD\u6A21\u62DF\u5360\u7528\u548C\u79D1\u5B66\u8BA1\u7B97\u6A21\u5F0F\uFF0C\u7528\u6237\u53EF\u4EE5\u81EA\u7531\u9009\u62E9\uFF0C\u5360\u7528\u8303\u56F4\u8BBE\u7F6E\u572815%\u81F325%\u4E4B\u95F4\uFF0C\u66F4\u63A8\u8350DD\u6A21\u62DF\u5360\u7528</li><li>DD\u6A21\u62DF\u5360\u7528\u5728\u5B88\u62A4\u8FDB\u7A0B\u4E2D\u8BBE\u7F6E\u4E86CPU\u5360\u7528\u7684\u6700\u9AD8\u9650\u5236</li><li>\u9ED8\u8BA4\u60C5\u51B5\u4E0B\uFF0CCPU\u5360\u7528\u8BBE\u7F6E\u4E3A25%\u6700\u9AD8\u503C\uFF0C\u8BA1\u7B97\u65B9\u6CD5\u662F\u6838\u6570\u4E58\u4EE512%\uFF0C\u5982\u679C\u8BA1\u7B97\u7ED3\u679C\u4F4E\u4E8E25%\uFF0C\u5219\u8BBE\u7F6E\u4E3A\u8BE5\u503C\uFF1B\u5982\u679C\u8BA1\u7B97\u7ED3\u679C\u9AD8\u4E8E25%\uFF0C\u5219\u6309\u7167\u8BA1\u7B97\u7ED3\u679C\u7684\u6BD4\u4F8B\u8FDB\u884C\u8BBE\u7F6E\u3002</li><li>\u5185\u5B58\u5360\u7528\u8BBE\u7F6E\u4E3A\u5360\u7528\u603B\u5185\u5B58\u768420%\uFF0C\u5360\u7528\u65F6\u95F4\u4E3A300\u79D2\uFF0C\u4F11\u606F\u65F6\u95F4\u4E3A300\u79D2\u3002</li><li>\u6BCF300\u79D2\u68C0\u6D4B\u4E00\u6B21\u5185\u5B58\u5360\u7528\u60C5\u51B5\uFF0C\u5E76\u6839\u636E\u9700\u8981\u52A8\u6001\u8C03\u6574\u5360\u7528\u5927\u5C0F\u3002\u5982\u679C\u5185\u5B58\u5360\u7528\u5DF2\u7ECF\u5927\u4E8E20%\uFF0C\u5219\u4E0D\u589E\u52A0\u5360\u7528\u3002</li><li>\u5728\u5360\u7528\u8FC7\u7A0B\u4E2D\uFF0C\u4F7F\u7528\u5B88\u62A4\u8FDB\u7A0B\u548C\u5F00\u673A\u81EA\u542F\u670D\u52A1\uFF0C\u4EE5\u786E\u4FDD\u5360\u7528\u4EFB\u52A1\u6301\u7EED\u4E14\u6709\u6548\u3002</li><li>\u9ED8\u8BA4\u9009\u9879\u7684\u5E26\u5BBD\u5360\u7528\u6BCF45\u5206\u949F\u4E0B\u8F7D\u4E00\u6B21\u5927\u5C0F\u57281G\u81F310G\u4E4B\u95F4\u7684\u6587\u4EF6\uFF0C\u53EA\u8FDB\u884C\u4E0B\u8F7D\u800C\u4E0D\u4FDD\u5B58\u3002\u5728\u4E0B\u8F7D\u8FC7\u7A0B\u4E2D\u4F1A\u5360\u7528\u786C\u76D8\u7A7A\u95F4\uFF0C\u4F46\u5728\u4E0B\u8F7D\u5B8C\u6210\u540E\u4F1A\u81EA\u52A8\u91CA\u653E\u3002</li><li>\u9ED8\u8BA4\u9009\u9879\u7684\u5E26\u5BBD\u5360\u7528\u52A8\u6001\u8C03\u6574\u5B9E\u9645\u4E0B\u8F7D\u7684\u5E26\u5BBD/\u901F\u7387\uFF0C\u9650\u5236\u6BCF\u6B21\u4E0B\u8F7D\u7684\u6700\u957F\u65F6\u957F\u4E3A6\u5206\u949F\u3002\u5728\u6BCF\u6B21\u4E0B\u8F7D\u4E4B\u524D\uFF0C\u4F1A\u6D4B\u8BD5\u6700\u5927\u53EF\u7528\u5E26\u5BBD\uFF0C\u5E76\u6839\u636E\u5B9E\u65F6\u7ED3\u679C\u5C06\u4E0B\u8F7D\u901F\u7387\u8BBE\u7F6E\u4E3A30%\u7684\u5E26\u5BBD\u3002</li><li>\u5E26\u5BBD\u5360\u7528\u6D4B\u8BD5\u4F7F\u7528\u4E86speedtest-cli\u548Cspeedtest-go\u4E24\u79CD\u5DE5\u5177\uFF0C\u4EE5\u9632\u5176\u4E2D\u4E4B\u4E00\u4E0D\u53EF\u7528\u65F6\u4F7F\u7528\u7B2C\u4E8C\u79CD\u5DE5\u5177\uFF0C\u7528\u6237\u53EF\u4EE5\u81EA\u5B9A\u4E49\u8BBE\u7F6E\u5E26\u5BBD\u5360\u7528\uFF0C\u6B64\u65F6\u8BE6\u89C1\u8BBE\u7F6E\u63D0\u793A\u3002</li><li>\u63D0\u4F9B\u4E00\u952E\u5378\u8F7D\u6240\u6709\u5360\u7528\u670D\u52A1\u7684\u9009\u9879\uFF0C\u5378\u8F7D\u5C06\u5220\u9664\u6240\u6709\u811A\u672C\u3001\u670D\u52A1\u3001\u4EFB\u52A1\u3001\u5B88\u62A4\u8FDB\u7A0B\u548C\u5F00\u673A\u81EA\u542F\u8BBE\u7F6E\u3002</li><li>\u63D0\u4F9B\u4E00\u952E\u68C0\u67E5\u66F4\u65B0\u7684\u529F\u80FD\uFF0C\u66F4\u65B0\u8303\u56F4\u4EC5\u9650\u4E8E\u811A\u672C\u66F4\u65B0\u3002<strong>\u8BF7\u5728\u66F4\u65B0\u540E\u91CD\u65B0\u8BBE\u7F6E\u5360\u7528\u670D\u52A1</strong></li><li>\u5BF9\u6240\u6709\u8FDB\u7A0B\u6267\u884C\u589E\u52A0\u552F\u4E00\u6027\u68C0\u6D4B\uFF0C\u907F\u514D\u91CD\u590D\u8FD0\u884C\uFF0C\u4F7F\u7528PID\u6587\u4EF6\u8FDB\u884C\u5224\u65AD\u3002</li></ul><p>\u5982\u82E5\u4E0D\u5E0C\u671B\u4E00\u952E\u7684\uFF0C\u5E0C\u671B\u81EA\u5B9A\u4E49\u8BBE\u7F6E\u65F6\u95F4\u7684\uFF0C\u8BF7\u67E5\u770B<a href="https://gitlab.com/spiritysdx/Oracle-server-keep-alive-script/-/blob/main/%20README_CRON.md" target="_blank" rel="noopener noreferrer">README_CRON.md</a>\u81EA\u884C\u8BBE\u7F6E\u5B9A\u65F6\u4EFB\u52A1</p>`,25),l=[t];function p(c,o,d,n,h,u){return r(),a("div",null,l)}var g=e(s,[["render",p]]);export{_ as __pageData,g as default};
