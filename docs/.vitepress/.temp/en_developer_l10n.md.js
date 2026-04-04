import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"en/developer/l10n.md","filePath":"en/developer/l10n.md","lastUpdated":1705324601000}');
const _sfc_main = { name: "en/developer/l10n.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><p><strong>You can follow these steps to support localization when developing new features</strong></p><h2 id="introduction" tabindex="-1">Introduction <a class="header-anchor" href="#introduction" aria-label="Permalink to &quot;Introduction&quot;">​</a></h2><ol><li>You can directly use the text configuration already available in <code>/resource/l10n/en-US.toml</code> to replace the text in the new feature.</li><li>If there is new text in the new feature, please refer to the configuration text in <code>en-US.toml</code>, pull the new text into the configuration files of other languages such as <code>en-US.toml</code>, and add translations.</li></ol><h2 id="adding-a-new-localized-text-file" tabindex="-1">Adding a new localized text file <a class="header-anchor" href="#adding-a-new-localized-text-file" aria-label="Permalink to &quot;Adding a new localized text file&quot;">​</a></h2><ol><li>Add a new language text configuration in <code>/resource/l10n/</code>.</li><li>Pull existing text configurations from other languages in the new language text configuration.</li><li>Add translations for the new language text configuration.</li></ol></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/developer/l10n.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const l10n = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  l10n as default
};
