import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"Development Manual","titleTemplate":"Welcome to the oneclickvirt Development Manual.","description":"","frontmatter":{"layout":"home","title":"Development Manual","titleTemplate":"Welcome to the oneclickvirt Development Manual.","hero":{"name":"Development Manual","text":"Welcome to the oneclickvirt Development Manual.","image":"https://raw.githubusercontent.com/spiritlhls/pages/main/logo.png","actions":[{"theme":"brand","text":"Start Now →","link":"/en_US/developer/l10n"}]}},"headers":[],"relativePath":"en/developer/index.md","filePath":"en/developer/index.md","lastUpdated":1705324601000}');
const _sfc_main = { name: "en/developer/index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/developer/index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
