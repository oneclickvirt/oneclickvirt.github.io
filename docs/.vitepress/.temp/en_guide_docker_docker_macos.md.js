import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"Running macOS Virtual Machines in Docker","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"en/guide/docker/docker_macos.md","filePath":"en/guide/docker/docker_macos.md","lastUpdated":1747640439000}');
const _sfc_main = { name: "en/guide/docker/docker_macos.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="running-macos-virtual-machines-in-docker" tabindex="-1">Running macOS Virtual Machines in Docker <a class="header-anchor" href="#running-macos-virtual-machines-in-docker" aria-label="Permalink to &quot;Running macOS Virtual Machines in Docker&quot;">​</a></h1><h2 id="using-dockur" tabindex="-1">Using Dockur <a class="header-anchor" href="#using-dockur" aria-label="Permalink to &quot;Using Dockur&quot;">​</a></h2><p>Original Project:</p><p><a href="https://github.com/dockur/macos" target="_blank" rel="noreferrer">https://github.com/dockur/macos</a></p><h2 id="using-docker-osx" tabindex="-1">Using Docker-OSX <a class="header-anchor" href="#using-docker-osx" aria-label="Permalink to &quot;Using Docker-OSX&quot;">​</a></h2><p>Original Project:</p><p><a href="https://github.com/sickcodes/Docker-OSX" target="_blank" rel="noreferrer">https://github.com/sickcodes/Docker-OSX</a></p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/guide/docker/docker_macos.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const docker_macos = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  docker_macos as default
};
