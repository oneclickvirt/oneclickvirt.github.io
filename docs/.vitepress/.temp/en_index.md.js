import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse(`{"title":"K'thun","titleTemplate":"One Click Virtualization","description":"","frontmatter":{"layout":"home","title":"K'thun","titleTemplate":"One Click Virtualization","tagline":"Open source, easy to use server virtualization project","hero":{"name":"One Click Virtualization","text":"Open source, easy to use server virtualization project","image":"https://raw.githubusercontent.com/spiritlhls/pages/main/logo.png","actions":[{"theme":"brand","text":"Learn More →","link":"/en/guide/dashboard"}]},"features":[{"title":"One Click Use","details":"Supports one-click command installation and use, easy to create virtual machines or containers on X86_64 and ARM architecture servers"},{"title":"Based on mainstream systems development","details":"Based on long-term maintenance releases of Debian, Ubuntu, Centos, etc., there is always a way to virtualize containers or virtual machines, no matter what the system is."},{"title":"Port forwarding and IP assignment automation","details":"Self-contained internal and external port forwarding and automatic IP address allocation (including IPV6、IPV4), including TCP, UDP, VNC, RDP and other protocols, without manual management"},{"title":"Batch Virtualization","details":"Supports batch opening of containers or virtual machines using KVM, LXC, Docker virtualization"},{"title":"Multi-system and multi-environment support","details":"Open containers or virtual machines that support mainstream systems, including Linux, Windows, MacOS, Android as well as pure browser or desktop environments."},{"title":"Self-limiting abuse","details":"Some virtualized containers or VMs support the setting of masks and loading limits to avoid being used for abuse."}]},"headers":[],"relativePath":"en/index.md","filePath":"en/index.md","lastUpdated":1761617633000}`);
const _sfc_main = { name: "en/index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
