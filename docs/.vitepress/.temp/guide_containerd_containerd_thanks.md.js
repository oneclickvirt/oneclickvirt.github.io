import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/containerd/containerd_thanks.md","filePath":"guide/containerd/containerd_thanks.md","lastUpdated":1772422214000}');
const _sfc_main = { name: "guide/containerd/containerd_thanks.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h2 id="致谢" tabindex="-1">致谢 <a class="header-anchor" href="#致谢" aria-label="Permalink to &quot;致谢&quot;">​</a></h2><p><a href="https://github.com/containerd/nerdctl" target="_blank" rel="noreferrer">https://github.com/containerd/nerdctl</a></p><p><a href="https://github.com/containerd/containerd" target="_blank" rel="noreferrer">https://github.com/containerd/containerd</a></p><p><a href="https://github.com/opencontainers/runc" target="_blank" rel="noreferrer">https://github.com/opencontainers/runc</a></p><p><a href="https://github.com/containernetworking/cni" target="_blank" rel="noreferrer">https://github.com/containernetworking/cni</a></p><p><a href="https://github.com/moby/buildkit" target="_blank" rel="noreferrer">https://github.com/moby/buildkit</a></p><p><a href="https://github.com/yoursunny/ndpresponder" target="_blank" rel="noreferrer">https://github.com/yoursunny/ndpresponder</a></p><p><a href="https://github.com/lxc/lxcfs" target="_blank" rel="noreferrer">https://github.com/lxc/lxcfs</a></p><p><a href="https://github.com/SuperManito/LinuxMirrors" target="_blank" rel="noreferrer">https://github.com/SuperManito/LinuxMirrors</a></p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("guide/containerd/containerd_thanks.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const containerd_thanks = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  containerd_thanks as default
};
