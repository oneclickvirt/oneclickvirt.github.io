import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"developer/l10n.md","filePath":"developer/l10n.md","lastUpdated":1691227687000}');
const _sfc_main = { name: "developer/l10n.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><p><strong>你可以在开发新功能时遵循以下步骤来支持本地化</strong></p><h2 id="介绍" tabindex="-1">介绍 <a class="header-anchor" href="#介绍" aria-label="Permalink to &quot;介绍&quot;">​</a></h2><ol><li>你可以直接使用 <code>/resource/l10n/zh-CN.toml</code> 中已有的文本配置来替换新功能中的文本</li><li>如果新功能中有新增文本，请参考 <code>zh-CN.toml</code> 的配置文本，将新文本拉取到 <code>zh-CN.toml</code> 等其他语言的配置文件中，并添加翻译</li></ol><h2 id="新本地化文本的添加" tabindex="-1">新本地化文本的添加 <a class="header-anchor" href="#新本地化文本的添加" aria-label="Permalink to &quot;新本地化文本的添加&quot;">​</a></h2><ol><li>在 <code>/resource/l10n/</code> 中添加新的语言文本配置</li><li>在新的语言文本配置中拉取其他语言已有的文本配置</li><li>为新的语言文本配置添加翻译</li></ol></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("developer/l10n.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const l10n = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  l10n as default
};
