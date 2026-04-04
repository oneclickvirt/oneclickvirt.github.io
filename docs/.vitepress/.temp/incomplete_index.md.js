import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"其他虚拟化项目","titleTemplate":"其他不完整的虚拟化项目","description":"","frontmatter":{"layout":"home","title":"其他虚拟化项目","titleTemplate":"其他不完整的虚拟化项目","hero":{"name":"其他虚拟化项目","text":"一些不完整的虚拟化项目","image":"https://cdn.spiritlhl.net/https://raw.githubusercontent.com/spiritlhls/pages/main/logo.png","actions":[{"theme":"brand","text":"查看项目 →","link":"/incomplete/webvirtcloud"}]},"features":[{"title":"注意事项","details":"这块每个项目都有对应的缺点，每个项目都不像之前的项目一样简单好用，有一定的学习成本。"},{"title":"难易程度","details":"基于项目本身的使用难度，由易到难排序，越往后你能得到本指南的引导越少。"},{"title":"项目缺点","details":"每个项目都有部分缺点导致不被认为是完整的一键项目，有一些操作需要手动执行命令无法一键化。"}]},"headers":[],"relativePath":"incomplete/index.md","filePath":"incomplete/index.md","lastUpdated":1745668591000}');
const _sfc_main = { name: "incomplete/index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("incomplete/index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
