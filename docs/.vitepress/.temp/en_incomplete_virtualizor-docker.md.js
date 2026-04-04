import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"en/incomplete/virtualizor-docker.md","filePath":"en/incomplete/virtualizor-docker.md","lastUpdated":1746014012000}');
const _sfc_main = { name: "en/incomplete/virtualizor-docker.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h2 id="repo" tabindex="-1">Repo <a class="header-anchor" href="#repo" aria-label="Permalink to &quot;Repo&quot;">​</a></h2><p><a href="https://github.com/ivstiv/virtualizor-docker" target="_blank" rel="noreferrer">https://github.com/ivstiv/virtualizor-docker</a></p><h2 id="description" tabindex="-1">Description <a class="header-anchor" href="#description" aria-label="Permalink to &quot;Description&quot;">​</a></h2><p>The virtualizor opened in the docker</p><p>The certificate used is a trial certificate, valid for one day, and only the OpenVZ virtualization method is installed by default</p><h2 id="disadvantages" tabindex="-1">Disadvantages <a class="header-anchor" href="#disadvantages" aria-label="Permalink to &quot;Disadvantages&quot;">​</a></h2><p>There is no community, so you have to figure it out on your own.</p><p>Ports for admin panel Don&#39;t look at the script&#39;s prompt messages, go with the repository instructions.</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/incomplete/virtualizor-docker.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const virtualizorDocker = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  virtualizorDocker as default
};
