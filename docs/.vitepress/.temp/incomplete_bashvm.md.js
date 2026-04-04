import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"incomplete/bashvm.md","filePath":"incomplete/bashvm.md","lastUpdated":1745566294000}');
const _sfc_main = { name: "incomplete/bashvm.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h2 id="仓库" tabindex="-1">仓库 <a class="header-anchor" href="#仓库" aria-label="Permalink to &quot;仓库&quot;">​</a></h2><p><a href="https://github.com/babywhale321/bashvm" target="_blank" rel="noreferrer">https://github.com/babywhale321/bashvm</a></p><p><a href="https://bashvm.com/" target="_blank" rel="noreferrer">https://bashvm.com/</a></p><h2 id="说明" tabindex="-1">说明 <a class="header-anchor" href="#说明" aria-label="Permalink to &quot;说明&quot;">​</a></h2><p>如果你想深入了解怎么开设一个虚拟机，怎么转发端口，那么这个项目将完全从底层开始，一步步教你如何开设虚拟机</p><h2 id="缺点" tabindex="-1">缺点 <a class="header-anchor" href="#缺点" aria-label="Permalink to &quot;缺点&quot;">​</a></h2><p>非常的繁琐，非常的耗时，不如别的项目快速设置网络和开设</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("incomplete/bashvm.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const bashvm = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  bashvm as default
};
