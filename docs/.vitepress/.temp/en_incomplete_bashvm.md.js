import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"en/incomplete/bashvm.md","filePath":"en/incomplete/bashvm.md","lastUpdated":1745823064000}');
const _sfc_main = { name: "en/incomplete/bashvm.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h2 id="repo" tabindex="-1">Repo <a class="header-anchor" href="#repo" aria-label="Permalink to &quot;Repo&quot;">​</a></h2><p><a href="https://github.com/babywhale321/bashvm" target="_blank" rel="noreferrer">https://github.com/babywhale321/bashvm</a></p><p><a href="https://bashvm.com/" target="_blank" rel="noreferrer">https://bashvm.com/</a></p><h2 id="description" tabindex="-1">Description <a class="header-anchor" href="#description" aria-label="Permalink to &quot;Description&quot;">​</a></h2><p>If you want to go deeper into how to open a VM and how to forward ports, then this program will start completely from the bottom and teach you step by step how to open a VM!</p><h2 id="disadvantages" tabindex="-1">Disadvantages <a class="header-anchor" href="#disadvantages" aria-label="Permalink to &quot;Disadvantages&quot;">​</a></h2><p>Very tedious and time consuming, not as fast as other programs to set up a network and open a VM</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/incomplete/bashvm.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const bashvm = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  bashvm as default
};
