import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/pve/pve_thanks.md","filePath":"guide/pve/pve_thanks.md","lastUpdated":1708057903000}');
const _sfc_main = { name: "guide/pve/pve_thanks.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h2 id="致谢" tabindex="-1">致谢 <a class="header-anchor" href="#致谢" aria-label="Permalink to &quot;致谢&quot;">​</a></h2><p><a href="https://forum.proxmox.com/" target="_blank" rel="noreferrer">https://forum.proxmox.com/</a></p><p><a href="https://blog.ilolicon.com/archives/615" target="_blank" rel="noreferrer">https://blog.ilolicon.com/archives/615</a></p><p><a href="https://github.com/Ella-Alinda/somescripts/blob/main/nat.sh" target="_blank" rel="noreferrer">https://github.com/Ella-Alinda/somescripts/blob/main/nat.sh</a></p><p><a href="https://pve.proxmox.com/pve-docs/qm.1.html" target="_blank" rel="noreferrer">https://pve.proxmox.com/pve-docs/qm.1.html</a></p><p><a href="https://down.idc.wiki/Image/realServer-Template/" target="_blank" rel="noreferrer">https://down.idc.wiki/Image/realServer-Template/</a></p><p><a href="https://mirrors.tuna.tsinghua.edu.cn/proxmox/" target="_blank" rel="noreferrer">https://mirrors.tuna.tsinghua.edu.cn/proxmox/</a></p><p><a href="https://github.com/roacn/pve/blob/main/pve.sh" target="_blank" rel="noreferrer">https://github.com/roacn/pve/blob/main/pve.sh</a></p><p><a href="https://github.com/spiritLHLS/lxc" target="_blank" rel="noreferrer">https://github.com/spiritLHLS/lxc</a></p><p><a href="https://github.com/leitbogioro/Tools" target="_blank" rel="noreferrer">https://github.com/leitbogioro/Tools</a></p><p><a href="https://github.com/jiangcuo/Proxmox-Port" target="_blank" rel="noreferrer">https://github.com/jiangcuo/Proxmox-Port</a></p><p><a href="https://gitlab.com/minkebox/pimox" target="_blank" rel="noreferrer">https://gitlab.com/minkebox/pimox</a></p><p><a href="https://github.com/jiangcuo/run_proxmox_in_docker" target="_blank" rel="noreferrer">https://github.com/jiangcuo/run_proxmox_in_docker</a></p><p><a href="https://github.com/yoursunny/ndpresponder" target="_blank" rel="noreferrer">https://github.com/yoursunny/ndpresponder</a></p><p><a href="https://github.com/SuperManito/LinuxMirrors" target="_blank" rel="noreferrer">https://github.com/SuperManito/LinuxMirrors</a></p><p>感谢 <a href="https://github.com/Ella-Alinda" target="_blank" rel="noreferrer">@Ella-Alinda</a> 提供的PVE指导</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("guide/pve/pve_thanks.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const pve_thanks = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  pve_thanks as default
};
