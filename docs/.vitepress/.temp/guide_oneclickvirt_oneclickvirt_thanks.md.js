import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"guide/oneclickvirt/oneclickvirt_thanks.md","filePath":"guide/oneclickvirt/oneclickvirt_thanks.md","lastUpdated":1765618189000}');
const _sfc_main = { name: "guide/oneclickvirt/oneclickvirt_thanks.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h2 id="致谢" tabindex="-1">致谢 <a class="header-anchor" href="#致谢" aria-label="Permalink to &quot;致谢&quot;">​</a></h2><p>感谢以下平台提供测试可用的服务器</p><p><a href="https://console.zmto.com/?affid=1524" target="_blank" rel="noreferrer">https://console.zmto.com/</a></p><p><a href="https://fossvps.org/" target="_blank" rel="noreferrer">https://fossvps.org/</a></p><p><a href="https://community.ibm.com/zsystems/form/l1cc-oss-vm-request/" target="_blank" rel="noreferrer">https://community.ibm.com/zsystems/form/l1cc-oss-vm-request/</a></p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("guide/oneclickvirt/oneclickvirt_thanks.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const oneclickvirt_thanks = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  oneclickvirt_thanks as default
};
