import{_ as e,c as t,o as a,a as r}from"./app.8fc4a373.js";const b='{"title":"\u51C6\u5907\u5DE5\u4F5C","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u51C6\u5907\u5DE5\u4F5C","slug":"\u51C6\u5907\u5DE5\u4F5C"},{"level":2,"title":"\u9879\u76EE\u4ED3\u5E93","slug":"\u9879\u76EE\u4ED3\u5E93"},{"level":3,"title":"PVE\u76F8\u5173\u7684\u5404\u79CD\u4E00\u952E\u811A\u672C","slug":"pve\u76F8\u5173\u7684\u5404\u79CD\u4E00\u952E\u811A\u672C"},{"level":3,"title":"\u901A\u8FC7LXD/LXC\u547D\u4EE4\u6279\u91CF\u6216\u5355\u72EC\u5F00\u8BBENAT\u670D\u52A1\u5668\u4EE5\u53CA\u7EF4\u62A4","slug":"\u901A\u8FC7lxd-lxc\u547D\u4EE4\u6279\u91CF\u6216\u5355\u72EC\u5F00\u8BBEnat\u670D\u52A1\u5668\u4EE5\u53CA\u7EF4\u62A4"},{"level":3,"title":"\u901A\u8FC7docker\u6279\u91CF\u6216\u5355\u72EC\u5F00\u8BBENAT\u670D\u52A1\u5668","slug":"\u901A\u8FC7docker\u6279\u91CF\u6216\u5355\u72EC\u5F00\u8BBEnat\u670D\u52A1\u5668"}],"relativePath":"guide/dashboard.md","lastUpdated":1687162665000}',i={},l=r('<h2 id="\u51C6\u5907\u5DE5\u4F5C" tabindex="-1">\u51C6\u5907\u5DE5\u4F5C <a class="header-anchor" href="#\u51C6\u5907\u5DE5\u4F5C" aria-hidden="true">#</a></h2><p>\u9700\u8981\u865A\u62DF\u5316\u51FA\u670D\u52A1\u5668\uFF0C\u4F60\u9700\u8981\uFF1A</p><ol><li>\u4E00\u53F0\u53EF\u4EE5\u8FDE\u63A5\u516C\u7F51\u7684\u670D\u52A1\u5668( VPS \u6216 Dedicated Server)\uFF0C\u6700\u597D\u80FD\u5B8C\u7F8E\u8BBF\u95EE Github \u7684 RAW \u9875\u9762\uFF0C\u90E8\u5206\u9879\u76EE\u90E8\u5206\u7EC4\u4EF6\u53EF\u80FD\u672A\u4F7F\u7528 CDN \u52A0\u901F</li></ol><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>\u5982\u679C\u60A8\u4F4D\u4E8E\u4E2D\u56FD\u5927\u9646\uFF0C\u8BBF\u95EE Github \u6709\u56F0\u96BE\uFF0C\u8BF7\u6CE8\u610F\u914D\u5957\u811A\u672C\u548C\u9879\u76EE\u662F\u5426\u6709\u8BF4\u660E\u5DF2\u4F7F\u7528 CDN \u52A0\u901F</p></div><ol start="2"><li>\u672C\u5730\u53EF\u4EE5\u7A33\u5B9A\u8FDE\u63A5SSH\uFF0C\u5982\u679C\u4E0D\u80FD\u7A33\u5B9A\u8FDE\u63A5\uFF0C\u8BF7\u4F7F\u7528<code>screen</code>\u547D\u4EE4\u521B\u5EFA\u7A97\u53E3\u540E\uFF0C\u5728\u7A97\u53E3\u5185\u6267\u884C\u547D\u4EE4</li></ol><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>\u4E0D\u4F1A\u7528screen\u547D\u4EE4\u7684\uFF0C\u81EA\u884C\u67E5\u627E\u76F8\u5173\u6559\u7A0B\u5B66\u4E60</p></div><ol start="3"><li>\u786E\u4FDD\u670D\u52A1\u5668\u7684\u7CFB\u7EDF\u548C\u786C\u4EF6\u6EE1\u8DB3\u5BF9\u5E94\u9879\u76EE\u7684\u8981\u6C42\uFF0C\u8BE6\u89C1\u5BF9\u5E94\u9879\u76EE\u8BF4\u660E</li></ol><p><strong>\u672C\u6587\u6863\u5C06\u4EE5VPS\u4F5C\u4E3A\u8303\u4F8B\uFF0C\u4E14\u8BE5VPS\u7EAF\u51C0\uFF0C\u65E0\u539F\u751F\u73AF\u5883\u95EE\u9898\uFF0C\u5982\u6709\u5FC5\u8981\u8BF7\u91CD\u88C5\u7CFB\u7EDF\u4FDD\u8BC1\u521D\u59CB\u73AF\u5883\u7684\u7EAF\u51C0</strong></p><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>PVE\u9879\u76EE\u53EF\u80FD\u9020\u6210\u5BBF\u4E3B\u673A\u51FA\u73B0\u95EE\u9898\uFF0C\u5982\u679C\u4F60\u4E0D\u4F1A\u770BBug\u548C\u4FEE\u590D\u7CFB\u7EDF\uFF0C\u90A3\u4E48\u4E0D\u5EFA\u8BAE\u4F60\u5728\u751F\u4EA7\u73AF\u5883\u4E2D\u4F7F\u7528\uFF0C\u4F7F\u7528PVE\u76F8\u5173\u811A\u672C\u8BF7\u786E\u4FDD\u5BBF\u4E3B\u673A\u968F\u65F6\u53EF\u91CD\u88C5\u7CFB\u7EDF</p></div><br><br><h2 id="\u9879\u76EE\u4ED3\u5E93" tabindex="-1">\u9879\u76EE\u4ED3\u5E93 <a class="header-anchor" href="#\u9879\u76EE\u4ED3\u5E93" aria-hidden="true">#</a></h2><p>\u6B22\u8FCEStar\u548CFork</p><h3 id="pve\u76F8\u5173\u7684\u5404\u79CD\u4E00\u952E\u811A\u672C" tabindex="-1">PVE\u76F8\u5173\u7684\u5404\u79CD\u4E00\u952E\u811A\u672C <a class="header-anchor" href="#pve\u76F8\u5173\u7684\u5404\u79CD\u4E00\u952E\u811A\u672C" aria-hidden="true">#</a></h3><p><a href="https://github.com/spiritLHLS/pve" target="_blank" rel="noopener noreferrer">https://github.com/spiritLHLS/pve</a></p><h3 id="\u901A\u8FC7lxd-lxc\u547D\u4EE4\u6279\u91CF\u6216\u5355\u72EC\u5F00\u8BBEnat\u670D\u52A1\u5668\u4EE5\u53CA\u7EF4\u62A4" tabindex="-1">\u901A\u8FC7LXD/LXC\u547D\u4EE4\u6279\u91CF\u6216\u5355\u72EC\u5F00\u8BBENAT\u670D\u52A1\u5668\u4EE5\u53CA\u7EF4\u62A4 <a class="header-anchor" href="#\u901A\u8FC7lxd-lxc\u547D\u4EE4\u6279\u91CF\u6216\u5355\u72EC\u5F00\u8BBEnat\u670D\u52A1\u5668\u4EE5\u53CA\u7EF4\u62A4" aria-hidden="true">#</a></h3><p><a href="https://github.com/spiritLHLS/lxc" target="_blank" rel="noopener noreferrer">https://github.com/spiritLHLS/lxc</a></p><h3 id="\u901A\u8FC7docker\u6279\u91CF\u6216\u5355\u72EC\u5F00\u8BBEnat\u670D\u52A1\u5668" tabindex="-1">\u901A\u8FC7docker\u6279\u91CF\u6216\u5355\u72EC\u5F00\u8BBENAT\u670D\u52A1\u5668 <a class="header-anchor" href="#\u901A\u8FC7docker\u6279\u91CF\u6216\u5355\u72EC\u5F00\u8BBEnat\u670D\u52A1\u5668" aria-hidden="true">#</a></h3><p><a href="https://github.com/spiritLHLS/docker" target="_blank" rel="noopener noreferrer">https://github.com/spiritLHLS/docker</a></p>',19),o=[l];function s(c,d,p,n,h,u){return a(),t("div",null,o)}var g=e(i,[["render",s]]);export{b as __pageData,g as default};
