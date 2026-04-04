import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"待开发，敬请期待","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"guide/block/block_docker.md","filePath":"guide/block/block_docker.md","lastUpdated":1725624177000}');
const _sfc_main = { name: "guide/block/block_docker.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="待开发-敬请期待" tabindex="-1">待开发，敬请期待 <a class="header-anchor" href="#待开发-敬请期待" aria-label="Permalink to &quot;待开发，敬请期待&quot;">​</a></h1></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("guide/block/block_docker.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const block_docker = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  block_docker as default
};
