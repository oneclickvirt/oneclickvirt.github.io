import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"前言","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"guide/podman/podman_precheck.md","filePath":"guide/podman/podman_precheck.md","lastUpdated":1773130373000}');
const _sfc_main = { name: "guide/podman/podman_precheck.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="前言" tabindex="-1">前言 <a class="header-anchor" href="#前言" aria-label="Permalink to &quot;前言&quot;">​</a></h1><p>以下为非自定义部分的介绍，自定义部分有自己对应的介绍，勿弄混了</p><p>如果你的宿主机本身没有IPV6的子网又想给容器分配IPV6地址，需要宿主机本身已有公网IPV6地址，安装脚本会自动检测并配置</p><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>Podman 方案<strong>不支持 KVM/QEMU 虚拟机</strong>，仅支持 Linux 容器（LXC），适用于无 KVM 硬件虚拟化支持的环境。</p></div><p>欢迎给项目一个 <code>Star</code> 进行免费的支持--&gt;<a href="https://github.com/oneclickvirt/podman" target="_blank" rel="noreferrer">https://github.com/oneclickvirt/podman</a></p><h2 id="项目特点" tabindex="-1">项目特点 <a class="header-anchor" href="#项目特点" aria-label="Permalink to &quot;项目特点&quot;">​</a></h2><p>基于 Podman（daemonless 架构）运行时，通过批量或单独开设 NAT 服务器</p><ul><li>使用各发行版官方软件包安装 Podman（无守护进程，daemonless 架构）</li><li>使用本仓库自编译的基础镜像（存储在 GitHub Releases），优先离线加载，无法获取时回退到 ghcr.io 镜像</li><li>每个容器自带 1 个外网 SSH 端口，25 个内外网一致端口，可选择是否绑定独立 IPV6 地址</li><li>支持 lxcfs 挂载（若宿主机安装了 lxcfs），提供容器内真实 /proc 视图</li><li>原生支持 rootless（本方案使用 root 运行以简化网络配置）</li><li>支持国内 CDN 镜像加速</li></ul><h2 id="支持的系统" tabindex="-1">支持的系统 <a class="header-anchor" href="#支持的系统" aria-label="Permalink to &quot;支持的系统&quot;">​</a></h2><table tabindex="0"><thead><tr><th>系统</th><th>amd64</th><th>arm64</th></tr></thead><tbody><tr><td>Ubuntu 22.04</td><td>✓</td><td>✓</td></tr><tr><td>Debian 12</td><td>✓</td><td>✓</td></tr><tr><td>Alpine latest</td><td>✓</td><td>✓</td></tr><tr><td>AlmaLinux 9</td><td>✓</td><td>✓</td></tr><tr><td>RockyLinux 9</td><td>✓</td><td>✓</td></tr><tr><td>OpenEuler 22.03</td><td>✓</td><td>✓</td></tr></tbody></table><h2 id="配置要求" tabindex="-1">配置要求 <a class="header-anchor" href="#配置要求" aria-label="Permalink to &quot;配置要求&quot;">​</a></h2><ul><li>宿主机系统：Ubuntu、Debian、RockyLinux 9+、AlmaLinux 9+、CentOS 9+、Alpine、Arch</li><li>架构：x86_64（amd64）或 ARM64</li><li>内核需支持 overlay 文件系统</li><li>网络能连接 Github 的 raw 界面即可</li><li>空闲硬盘有 3G 以上即可</li><li><strong>不需要 KVM 硬件支持</strong></li></ul></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("guide/podman/podman_precheck.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const podman_precheck = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  podman_precheck as default
};
