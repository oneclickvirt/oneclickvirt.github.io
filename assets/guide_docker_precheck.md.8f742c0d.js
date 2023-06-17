import{_ as e,c as r,o as t,d as a}from"./app.37329957.js";const f='{"title":"\u9879\u76EE\u7279\u70B9","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u9879\u76EE\u7279\u70B9","slug":"\u9879\u76EE\u7279\u70B9"},{"level":2,"title":"\u914D\u7F6E\u8981\u6C42","slug":"\u914D\u7F6E\u8981\u6C42"}],"relativePath":"en_US/guide/docker_precheck.md"}',o={},p=a('<h2 id="\u9879\u76EE\u7279\u70B9" tabindex="-1">\u9879\u76EE\u7279\u70B9 <a class="header-anchor" href="#\u9879\u76EE\u7279\u70B9" aria-hidden="true">#</a></h2><p>\u901A\u8FC7docker\u6279\u91CF\u6216\u5355\u72EC\u5F00\u8BBENAT\u670D\u52A1\u5668(Bulk or individual NAT server provisioning via docker)</p><p>\u9ED8\u8BA4\u4F7F\u7528debian\u7CFB\u7EDF\uFF0C\u6BCF\u4E2A\u5BB9\u5668\u81EA\u5E261\u4E2A\u5916\u7F51ssh\u7AEF\u53E3\uFF0C25\u4E2A\u5185\u5916\u7F51\u4E00\u81F4\u7AEF\u53E3</p><p>\u9ED8\u8BA4\u521B\u5EFA\u7684\u662F\u975E\u7279\u6743\u5BB9\u5668\uFF0C\u4E14\u4E0D\u6302\u8F7D\u4E0E\u5BBF\u4E3B\u673A\u7684docker\u7684\u5B88\u62A4\u8FDB\u7A0B\u4E4B\u95F4\u7684\u901A\u4FE1\uFF0C\u6240\u4EE5<strong>\u5BBF\u4E3B\u673A\u521B\u5EFA\u7684docker\u865A\u62DF\u5316\u7684NAT\u670D\u52A1\u5668\u5185\u65E0\u6CD5\u518D\u5D4C\u5957\u865A\u62DF\u5316docker</strong></p><p>\u7531\u4E8E\u53EA\u662F\u5728\u5BBF\u4E3B\u673A\u8FDB\u884C\u4E86CPU\u548C\u5185\u5B58\u7684\u9650\u5236\u672A\u5728\u5BB9\u5668\u5185\u4F7F\u7528cgroup\u9A71\u52A8\uFF0C\u6240\u4EE5\u5728\u5BB9\u5668\u5185\u4F7F\u7528\u670D\u52A1\u5668\u6D4B\u8BD5\u811A\u672C\u68C0\u6D4B\u5BB9\u5668\u7684\u53EF\u7528\u8D44\u6E90\u662F\u65E0\u6548\u7684\uFF0C\u663E\u793A\u7684\u4F1A\u662F\u5BBF\u4E3B\u673A\u7684\u8D44\u6E90</p><p>\u7531\u4E8E\u5927\u90E8\u5206\u4E91\u670D\u52A1\u5668xfs\u6587\u4EF6\u7CFB\u7EDF\u4E0D\u542F\u7528pquota\u9009\u9879\uFF0C\u6240\u4EE5<strong>\u9ED8\u8BA4\u5171\u4EAB\u5BBF\u4E3B\u673A\u786C\u76D8\uFF0C\u65E0\u6CD5\u9650\u5236\u6BCF\u4E2A\u5BB9\u5668\u7684\u78C1\u76D8\u5927\u5C0F</strong></p><h2 id="\u914D\u7F6E\u8981\u6C42" tabindex="-1">\u914D\u7F6E\u8981\u6C42 <a class="header-anchor" href="#\u914D\u7F6E\u8981\u6C42" aria-hidden="true">#</a></h2><p>\u7CFB\u7EDF\u53EF\u5B89\u88C5docker\u5373\u53EF\u7528\uFF0C\u7F51\u7EDC\u80FD\u8FDE\u63A5Github\u7684raw\u754C\u9762\u5C31\u80FD\u7528\uFF0C\u786C\u4EF6\u914D\u7F6E\u53EA\u8981\u4E0D\u62C9\u8DE8\u5C31\u884C\uFF0C\u7A7A\u95F2\u786C\u76D8\u67093G\u5C31\u884C</p><p>\u63A8\u8350\u5728\u5F00\u8BBENAT\u670D\u52A1\u5668\u524D\u5148\u589E\u52A0\u90E8\u5206SWAP\u865A\u62DF\u5185\u5B58\uFF0C\u907F\u514D\u7A81\u53D1\u7684\u5185\u5B58\u5360\u7528\u5BFC\u81F4\u6BCD\u9E21\u5361\u6B7B <a href="https://github.com/spiritLHLS/addswap" target="_blank" rel="noopener noreferrer">\u8DF3\u8F6C</a></p><p>PS: \u5982\u679C\u786C\u4EF6\u8D44\u6E90\u53EA\u662F\u597D\u4E86\u4E00\u70B9\uFF0C\u9700\u8981\u9650\u5236\u66F4\u591A\u4E1C\u897F\u5E76\u9700\u8981\u914D\u7F6EIPV6\u72EC\u7ACB\u5730\u5740\u548C\u9650\u5236\u786C\u76D8\u5927\u5C0F\uFF0C\u53EF\u4F7F\u7528LXD\u6279\u91CF\u5F00LXC\u865A\u62DF\u5316\u7684\u5BB9\u5668 <a href="https://github.com/spiritLHLS/lxc" target="_blank" rel="noopener noreferrer">\u8DF3\u8F6C</a></p><p>PS: \u5982\u679C\u786C\u4EF6\u975E\u5E38\u597D\u8D44\u6E90\u5F88\u591A\uFF0C\u53EF\u4F7F\u7528PVE\u6279\u91CF\u5F00KVM\u865A\u62DF\u5316\u7684\u865A\u62DF\u673A <a href="https://github.com/spiritLHLS/pve" target="_blank" rel="noopener noreferrer">\u8DF3\u8F6C</a></p>',11),n=[p];function i(s,c,d,_,h,l){return t(),r("div",null,n)}var g=e(o,[["render",i]]);export{f as __pageData,g as default};
