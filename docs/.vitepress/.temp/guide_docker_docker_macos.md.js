import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"在Docker中开设Macos虚拟机","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"guide/docker/docker_macos.md","filePath":"guide/docker/docker_macos.md","lastUpdated":1747041157000}');
const _sfc_main = { name: "guide/docker/docker_macos.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="在docker中开设macos虚拟机" tabindex="-1">在Docker中开设Macos虚拟机 <a class="header-anchor" href="#在docker中开设macos虚拟机" aria-label="Permalink to &quot;在Docker中开设Macos虚拟机&quot;">​</a></h1><h2 id="通过dockur开设" tabindex="-1">通过dockur开设 <a class="header-anchor" href="#通过dockur开设" aria-label="Permalink to &quot;通过dockur开设&quot;">​</a></h2><p>原始项目</p><p><a href="https://github.com/dockur/macos" target="_blank" rel="noreferrer">https://github.com/dockur/macos</a></p><h2 id="通过osx开设" tabindex="-1">通过OSX开设 <a class="header-anchor" href="#通过osx开设" aria-label="Permalink to &quot;通过OSX开设&quot;">​</a></h2><p>原始项目</p><p><a href="https://github.com/sickcodes/Docker-OSX" target="_blank" rel="noreferrer">https://github.com/sickcodes/Docker-OSX</a></p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("guide/docker/docker_macos.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const docker_macos = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  docker_macos as default
};
