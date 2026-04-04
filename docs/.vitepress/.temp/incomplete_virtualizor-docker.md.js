import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"incomplete/virtualizor-docker.md","filePath":"incomplete/virtualizor-docker.md","lastUpdated":1746014012000}');
const _sfc_main = { name: "incomplete/virtualizor-docker.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h2 id="仓库" tabindex="-1">仓库 <a class="header-anchor" href="#仓库" aria-label="Permalink to &quot;仓库&quot;">​</a></h2><p><a href="https://github.com/ivstiv/virtualizor-docker" target="_blank" rel="noreferrer">https://github.com/ivstiv/virtualizor-docker</a></p><h2 id="说明" tabindex="-1">说明 <a class="header-anchor" href="#说明" aria-label="Permalink to &quot;说明&quot;">​</a></h2><p>在docker中开设的 virtualizor</p><p>证书用的是试用的证书，有效期一天，且默认只安装了OpenVZ的虚拟化方式</p><h2 id="缺点" tabindex="-1">缺点 <a class="header-anchor" href="#缺点" aria-label="Permalink to &quot;缺点&quot;">​</a></h2><p>毫无社区，一切自行摸索</p><p>admin面板的端口不要看脚本的提示信息，以仓库说明为准。</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("incomplete/virtualizor-docker.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const virtualizorDocker = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  virtualizorDocker as default
};
