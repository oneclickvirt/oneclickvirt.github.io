import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"开发手册","titleTemplate":"欢迎使用一键虚拟化项目开发手册，欢迎你提出高质量的Pull Request，帮助一键虚拟化项目变得更好！","description":"","frontmatter":{"layout":"home","title":"开发手册","titleTemplate":"欢迎使用一键虚拟化项目开发手册，欢迎你提出高质量的Pull Request，帮助一键虚拟化项目变得更好！","hero":{"name":"开发手册","text":"开发手册","image":"https://cdn.spiritlhl.net/https://raw.githubusercontent.com/spiritlhls/pages/main/logo.png","actions":[{"theme":"brand","text":"开始使用 →","link":"/developer/l10n"}]}},"headers":[],"relativePath":"developer/index.md","filePath":"developer/index.md","lastUpdated":1745130539000}');
const _sfc_main = { name: "developer/index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("developer/index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
