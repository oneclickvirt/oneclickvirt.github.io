import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"en/guide/podman/podman_thanks.md","filePath":"en/guide/podman/podman_thanks.md","lastUpdated":1772422214000}');
const _sfc_main = { name: "en/guide/podman/podman_thanks.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h2 id="acknowledgements" tabindex="-1">Acknowledgements <a class="header-anchor" href="#acknowledgements" aria-label="Permalink to &quot;Acknowledgements&quot;">​</a></h2><p><a href="https://github.com/containers/podman" target="_blank" rel="noreferrer">https://github.com/containers/podman</a></p><p><a href="https://github.com/containers/buildah" target="_blank" rel="noreferrer">https://github.com/containers/buildah</a></p><p><a href="https://github.com/containers/netavark" target="_blank" rel="noreferrer">https://github.com/containers/netavark</a></p><p><a href="https://github.com/containers/crun" target="_blank" rel="noreferrer">https://github.com/containers/crun</a></p><p><a href="https://github.com/opencontainers/runc" target="_blank" rel="noreferrer">https://github.com/opencontainers/runc</a></p><p><a href="https://github.com/yoursunny/ndpresponder" target="_blank" rel="noreferrer">https://github.com/yoursunny/ndpresponder</a></p><p><a href="https://github.com/lxc/lxcfs" target="_blank" rel="noreferrer">https://github.com/lxc/lxcfs</a></p><p><a href="https://github.com/SuperManito/LinuxMirrors" target="_blank" rel="noreferrer">https://github.com/SuperManito/LinuxMirrors</a></p><p><a href="https://download.opensuse.org/repositories/devel:/kubic:/libcontainers:/stable/" target="_blank" rel="noreferrer">https://download.opensuse.org/repositories/devel:/kubic:/libcontainers:/stable/</a></p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/guide/podman/podman_thanks.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const podman_thanks = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  podman_thanks as default
};
