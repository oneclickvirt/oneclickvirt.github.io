import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse(`{"title":"Other Virtualization Projects","titleTemplate":"Other Incomplete Virtualization Projects","description":"","frontmatter":{"layout":"home","title":"Other Virtualization Projects","titleTemplate":"Other Incomplete Virtualization Projects","hero":{"name":"Other Virtualization Projects","text":"Some incomplete virtualization projects","image":"https://cdn.spiritlhl.net/https://raw.githubusercontent.com/spiritlhls/pages/main/logo.png","actions":[{"theme":"brand","text":"View Projects →","link":"/en/incomplete/webvirtcloud"}]},"features":[{"title":"Notes","details":"Each item in this block has a corresponding drawback, and each item is not as easy to use as the previous ones, and has a certain learning cost."},{"title":"Degree of difficulty","details":"Based on the difficulty of using the program itself, sorted from easiest to hardest, the further back you go the less guidance you'll get with this guide."},{"title":"Project disadvantages","details":"Each project has some drawbacks that result in it not being considered a complete one-click project, and there are some operations that require manual execution of commands that cannot be one-clicked."}]},"headers":[],"relativePath":"en/incomplete/index.md","filePath":"en/incomplete/index.md","lastUpdated":1745668591000}`);
const _sfc_main = { name: "en/incomplete/index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/incomplete/index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
