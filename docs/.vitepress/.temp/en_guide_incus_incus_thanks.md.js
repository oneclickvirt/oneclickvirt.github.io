import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"en/guide/incus/incus_thanks.md","filePath":"en/guide/incus/incus_thanks.md","lastUpdated":1705325577000}');
const _sfc_main = { name: "en/guide/incus/incus_thanks.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h2 id="acknowledgements" tabindex="-1">Acknowledgements <a class="header-anchor" href="#acknowledgements" aria-label="Permalink to &quot;Acknowledgements&quot;">​</a></h2><p><a href="https://github.com/lxc/lxd" target="_blank" rel="noreferrer">https://github.com/lxc/lxd</a></p><p><a href="https://discuss.linuxcontainers.org/" target="_blank" rel="noreferrer">https://discuss.linuxcontainers.org/</a></p><p><a href="https://discuss.linuxcontainers.org/t/how-to-run-docker-inside-lxc-container/13017/4" target="_blank" rel="noreferrer">https://discuss.linuxcontainers.org/t/how-to-run-docker-inside-lxc-container/13017/4</a></p><p><a href="https://discuss.linuxcontainers.org/t/error-seccomp-notify-not-supported-on-container-start/15038/3" target="_blank" rel="noreferrer">https://discuss.linuxcontainers.org/t/error-seccomp-notify-not-supported-on-container-start/15038/3</a></p><p><a href="https://discuss.linuxcontainers.org/t/how-do-i-assign-a-public-ipv6-address-to-a-lxc-container/6028" target="_blank" rel="noreferrer">https://discuss.linuxcontainers.org/t/how-do-i-assign-a-public-ipv6-address-to-a-lxc-container/6028</a></p><p><a href="https://github.com/turtle0x1/LxdMosaic" target="_blank" rel="noreferrer">https://github.com/turtle0x1/LxdMosaic</a></p><p><a href="https://openzfs.github.io/openzfs-docs/Getting%20Started/Debian/index.html" target="_blank" rel="noreferrer">https://openzfs.github.io/openzfs-docs/Getting Started/Debian/index.html</a></p><p><a href="https://github.com/SuperManito/LinuxMirrors" target="_blank" rel="noreferrer">https://github.com/SuperManito/LinuxMirrors</a></p><p><a href="https://github.com/zabbly/incus" target="_blank" rel="noreferrer">https://github.com/zabbly/incus</a></p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/guide/incus/incus_thanks.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const incus_thanks = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  incus_thanks as default
};
