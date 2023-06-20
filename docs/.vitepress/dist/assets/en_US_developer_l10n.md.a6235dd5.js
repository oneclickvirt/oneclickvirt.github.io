import{_ as e,c as t,o as n,a as o}from"./app.8fc4a373.js";const _='{"title":"Introduction","description":"","frontmatter":{},"headers":[{"level":2,"title":"Introduction","slug":"introduction"},{"level":2,"title":"Adding a new localized text file","slug":"adding-a-new-localized-text-file"}],"relativePath":"en_US/developer/l10n.md","lastUpdated":1687182420000}',a={},i=o('<p><strong>You can follow these steps to support localization when developing new features</strong></p><h2 id="introduction" tabindex="-1">Introduction <a class="header-anchor" href="#introduction" aria-hidden="true">#</a></h2><ol><li>You can directly use the text configuration already available in <code>/resource/l10n/en-US.toml</code> to replace the text in the new feature.</li><li>If there is new text in the new feature, please refer to the configuration text in <code>en-US.toml</code>, pull the new text into the configuration files of other languages such as <code>en-US.toml</code>, and add translations.</li></ol><h2 id="adding-a-new-localized-text-file" tabindex="-1">Adding a new localized text file <a class="header-anchor" href="#adding-a-new-localized-text-file" aria-hidden="true">#</a></h2><ol><li>Add a new language text configuration in <code>/resource/l10n/</code>.</li><li>Pull existing text configurations from other languages in the new language text configuration.</li><li>Add translations for the new language text configuration.</li></ol>',5),l=[i];function r(d,c,s,u,h,f){return n(),t("div",null,l)}var p=e(a,[["render",r]]);export{_ as __pageData,p as default};