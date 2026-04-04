import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"其他实用项目","titleTemplate":"与Linux相关的其他实用项目","description":"","frontmatter":{"layout":"home","title":"其他实用项目","titleTemplate":"与Linux相关的其他实用项目","hero":{"name":"其他实用项目","text":"与Linux相关的其他实用项目","image":"https://cdn.spiritlhl.net/https://raw.githubusercontent.com/spiritlhls/pages/main/logo.png","actions":[{"theme":"brand","text":"查看项目 →","link":"/case/case1"}]},"features":[{"title":"实用性","details":"仁者见仁智者见智。"}]},"headers":[],"relativePath":"case/index.md","filePath":"case/index.md","lastUpdated":1745567371000}');
const _sfc_main = { name: "case/index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("case/index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
