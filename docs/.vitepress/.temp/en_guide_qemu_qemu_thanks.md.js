import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"en/guide/qemu/qemu_thanks.md","filePath":"en/guide/qemu/qemu_thanks.md","lastUpdated":1772442819000}');
const _sfc_main = { name: "en/guide/qemu/qemu_thanks.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h2 id="acknowledgements" tabindex="-1">Acknowledgements <a class="header-anchor" href="#acknowledgements" aria-label="Permalink to &quot;Acknowledgements&quot;">​</a></h2><p><a href="https://github.com/qemu/qemu" target="_blank" rel="noreferrer">https://github.com/qemu/qemu</a></p><p><a href="https://github.com/libvirt/libvirt" target="_blank" rel="noreferrer">https://github.com/libvirt/libvirt</a></p><p><a href="https://github.com/libvirt/libvirt-python" target="_blank" rel="noreferrer">https://github.com/libvirt/libvirt-python</a></p><p><a href="https://github.com/coreos/ignition" target="_blank" rel="noreferrer">https://github.com/coreos/ignition</a></p><p><a href="https://github.com/spiritLHLS/addswap" target="_blank" rel="noreferrer">https://github.com/spiritLHLS/addswap</a></p><p><a href="https://www.linux-kvm.org/" target="_blank" rel="noreferrer">https://www.linux-kvm.org/</a></p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/guide/qemu/qemu_thanks.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const qemu_thanks = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  qemu_thanks as default
};
