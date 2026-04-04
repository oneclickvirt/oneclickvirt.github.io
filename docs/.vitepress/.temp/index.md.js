import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"库苏恩","titleTemplate":"一键虚拟化项目","description":"","frontmatter":{"layout":"home","title":"库苏恩","titleTemplate":"一键虚拟化项目","tagline":"开源、易于使用的服务器虚拟化项目","hero":{"name":"一键虚拟化项目","text":"开源、易于使用的服务器虚拟化项目","image":"https://cdn.spiritlhl.net/https://raw.githubusercontent.com/spiritlhls/pages/main/logo.png","actions":[{"theme":"brand","text":"开始使用 →","link":"/guide/dashboard"}]},"features":[{"title":"一键使用","details":"支持一键命令安装使用，轻松在X86_64和ARM架构的服务器上创建虚拟机或容器"},{"title":"基于主流系统开发","details":"基于 Debian、Ubuntu、Centos 等系统的长期维护版本开发，无论是什么系统总有一个方法能让你虚拟化出容器或虚拟机"},{"title":"端口转发和IP分配自动化","details":"自带内外网端口转发和IP地址自动分配(含IPV6、IPV4)，支持TCP/UDP、VNC/RDP等协议，无需人工管理"},{"title":"批量虚拟化","details":"支持使用 QEMU、KVM、LXC、Docker 虚拟化批量开设容器或虚拟机"},{"title":"多系统多环境支持","details":"开设出的容器或虚拟机已支持主流系统，涵盖 Linux、Windows、MacOS、Android 系统，也支持纯粹的浏览器环境或桌面环境"},{"title":"自限制滥用","details":"部分虚拟化开设的容器或虚拟机支持设置屏蔽和装载限制，避免被用于滥用"}]},"headers":[],"relativePath":"index.md","filePath":"index.md","lastUpdated":1747319143000}');
const _sfc_main = { name: "index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
