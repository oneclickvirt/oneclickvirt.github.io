import { defineConfig, type DefaultTheme } from 'vitepress';

const SITE_URL = 'https://www.spiritlhl.net';
const LOGO_URL = 'https://cdn.spiritlhl.net/https://raw.githubusercontent.com/spiritlhls/pages/main/logo.png';

type LocaleKey = 'zh' | 'en';
type LocalizedText = Record<LocaleKey, string>;

interface DocLink {
  text: LocalizedText;
  path: string;
}

interface SidebarSection {
  text: LocalizedText;
  items: DocLink[];
}

const guideSections: SidebarSection[] = [
  {
    text: {
      zh: '入门',
      en: 'Getting Started',
    },
    items: [
      {
        text: { zh: '平台总览', en: 'Platform overview' },
        path: '/guide/',
      },
      {
        text: { zh: '准备工作', en: 'Preparation' },
        path: '/guide/dashboard',
      },
    ],
  },
  {
    text: { zh: 'OneClickVirt', en: 'OneClickVirt' },
    items: [
      {
        text: { zh: '系统和硬件配置要求', en: 'Configuration requirements' },
        path: '/guide/oneclickvirt/oneclickvirt_precheck',
      },
      {
        text: { zh: '主体安装', en: 'Main installation' },
        path: '/guide/oneclickvirt/oneclickvirt_install',
      },
      {
        text: { zh: '使用说明', en: 'Instructions for use' },
        path: '/guide/oneclickvirt/oneclickvirt_usage',
      },
      {
        text: { zh: '自定义', en: 'Custom' },
        path: '/guide/oneclickvirt/oneclickvirt_custom',
      },
      {
        text: { zh: '致谢', en: 'Acknowledgements' },
        path: '/guide/oneclickvirt/oneclickvirt_thanks',
      },
      {
        text: { zh: '常见问题答疑', en: 'FAQ' },
        path: '/guide/oneclickvirt/oneclickvirt_qa',
      },
    ],
  },
  {
    text: { zh: 'Proxmox VE', en: 'Proxmox VE' },
    items: [
      {
        text: { zh: '系统和硬件配置要求', en: 'Configuration requirements' },
        path: '/guide/pve/pve_precheck',
      },
      {
        text: { zh: 'PVE主体安装', en: 'PVE main installation' },
        path: '/guide/pve/pve_install',
      },
      {
        text: { zh: 'Linux虚拟机(KVM/QEMU)', en: 'Linux Virtual Machine(KVM/QEMU)' },
        path: '/guide/pve/pve_kvm',
      },
      {
        text: { zh: 'Linux容器(LXC)', en: 'Linux Container(LXC)' },
        path: '/guide/pve/pve_lxc',
      },
      {
        text: { zh: 'Windows虚拟机(KVM/QEMU)', en: 'Windows Virtual Machine(KVM/QEMU)' },
        path: '/guide/pve/pve_windows',
      },
      {
        text: { zh: 'MacOS虚拟机(KVM)', en: 'MacOS Virtual Machine(KVM)' },
        path: '/guide/pve/pve_macos',
      },
      {
        text: { zh: 'Android虚拟机(KVM)', en: 'Android Virtual Machine(KVM)' },
        path: '/guide/pve/pve_android',
      },
      {
        text: { zh: '自定义', en: 'Custom' },
        path: '/guide/pve/pve_custom',
      },
      {
        text: { zh: '致谢', en: 'Acknowledgements' },
        path: '/guide/pve/pve_thanks',
      },
      {
        text: { zh: '常见问题答疑', en: 'FAQ' },
        path: '/guide/pve/pve_qa',
      },
    ],
  },
  {
    text: { zh: 'Incus', en: 'Incus' },
    items: [
      {
        text: { zh: '系统和硬件配置要求', en: 'Configuration requirements' },
        path: '/guide/incus/incus_precheck',
      },
      {
        text: { zh: 'Incus主体安装', en: 'Incus main installation' },
        path: '/guide/incus/incus_install',
      },
      {
        text: { zh: 'Linux虚拟机(QEMU)', en: 'Linux Virtual Machine(QEMU)' },
        path: '/guide/incus/incus_qemu',
      },
      {
        text: { zh: 'Linux容器(LXC)', en: 'Linux Container(LXC)' },
        path: '/guide/incus/incus_lxc',
      },
      {
        text: { zh: 'Windows虚拟机(QEMU)', en: 'Windows Virtual Machine(QEMU)' },
        path: '/guide/incus/incus_windows',
      },
      {
        text: { zh: '更多配置', en: 'Extra configuration' },
        path: '/guide/incus/incus_extra_config',
      },
      {
        text: { zh: '自定义', en: 'Custom' },
        path: '/guide/incus/incus_custom',
      },
      {
        text: { zh: '致谢', en: 'Acknowledgements' },
        path: '/guide/incus/incus_thanks',
      },
      {
        text: { zh: '常见问题答疑', en: 'FAQ' },
        path: '/guide/incus/incus_qa',
      },
    ],
  },
  {
    text: { zh: 'Docker', en: 'Docker' },
    items: [
      {
        text: { zh: '系统和硬件配置要求', en: 'Configuration requirements' },
        path: '/guide/docker/docker_precheck',
      },
      {
        text: { zh: 'Docker主体安装', en: 'Docker main installation' },
        path: '/guide/docker/docker_install',
      },
      {
        text: { zh: 'Linux容器(LXC)', en: 'Linux Container(LXC)' },
        path: '/guide/docker/docker_build',
      },
      {
        text: { zh: 'Windows虚拟机(KVM/QEMU)', en: 'Windows Virtual Machine(KVM/QEMU)' },
        path: '/guide/docker/docker_windows',
      },
      {
        text: { zh: 'macOS虚拟机(KVM)', en: 'macOS Virtual Machine(KVM)' },
        path: '/guide/docker/docker_macos',
      },
      {
        text: { zh: 'Android虚拟机(KVM/QEMU)', en: 'Android Virtual Machine(KVM/QEMU)' },
        path: '/guide/docker/docker_android',
      },
      {
        text: { zh: '自定义', en: 'Custom' },
        path: '/guide/docker/docker_custom',
      },
      {
        text: { zh: '致谢', en: 'Acknowledgements' },
        path: '/guide/docker/docker_thanks',
      },
      {
        text: { zh: '常见问题答疑', en: 'FAQ' },
        path: '/guide/docker/docker_qa',
      },
    ],
  },
  {
    text: { zh: 'LXD', en: 'LXD' },
    items: [
      {
        text: { zh: '系统和硬件配置要求', en: 'Configuration requirements' },
        path: '/guide/lxd/lxd_precheck',
      },
      {
        text: { zh: 'LXD主体安装', en: 'LXD main installation' },
        path: '/guide/lxd/lxd_install',
      },
      {
        text: { zh: 'Linux虚拟机(QEMU)', en: 'Linux Virtual Machine(QEMU)' },
        path: '/guide/lxd/lxd_qemu',
      },
      {
        text: { zh: 'Linux容器(LXC)', en: 'Linux Container(LXC)' },
        path: '/guide/lxd/lxd_lxc',
      },
      {
        text: { zh: 'Windows虚拟机(QEMU)', en: 'Windows Virtual Machine(QEMU)' },
        path: '/guide/lxd/lxd_windows',
      },
      {
        text: { zh: '更多配置', en: 'Extra configuration' },
        path: '/guide/lxd/lxd_extra_config',
      },
      {
        text: { zh: '自定义', en: 'Custom' },
        path: '/guide/lxd/lxd_custom',
      },
      {
        text: { zh: '致谢', en: 'Acknowledgements' },
        path: '/guide/lxd/lxd_thanks',
      },
      {
        text: { zh: '常见问题答疑', en: 'FAQ' },
        path: '/guide/lxd/lxd_qa',
      },
    ],
  },
  {
    text: { zh: 'Containerd', en: 'Containerd' },
    items: [
      {
        text: { zh: '系统和配置要求', en: 'System & configuration requirements' },
        path: '/guide/containerd/containerd_precheck',
      },
      {
        text: { zh: 'Containerd主体安装', en: 'Containerd main installation' },
        path: '/guide/containerd/containerd_install',
      },
      {
        text: { zh: 'Linux容器(LXC)', en: 'Linux Container(LXC)' },
        path: '/guide/containerd/containerd_build',
      },
      {
        text: { zh: '致谢', en: 'Acknowledgements' },
        path: '/guide/containerd/containerd_thanks',
      },
      {
        text: { zh: '常见问题答疑', en: 'FAQ' },
        path: '/guide/containerd/containerd_qa',
      },
    ],
  },
  {
    text: { zh: 'Podman', en: 'Podman' },
    items: [
      {
        text: { zh: '系统和配置要求', en: 'System & configuration requirements' },
        path: '/guide/podman/podman_precheck',
      },
      {
        text: { zh: 'Podman主体安装', en: 'Podman main installation' },
        path: '/guide/podman/podman_install',
      },
      {
        text: { zh: 'Linux容器(LXC)', en: 'Linux Container(LXC)' },
        path: '/guide/podman/podman_build',
      },
      {
        text: { zh: '致谢', en: 'Acknowledgements' },
        path: '/guide/podman/podman_thanks',
      },
      {
        text: { zh: '常见问题答疑', en: 'FAQ' },
        path: '/guide/podman/podman_qa',
      },
    ],
  },
  {
    text: { zh: 'QEMU', en: 'QEMU' },
    items: [
      {
        text: { zh: '系统和配置要求', en: 'System & configuration requirements' },
        path: '/guide/qemu/qemu_precheck',
      },
      {
        text: { zh: 'QEMU主体安装', en: 'QEMU main installation' },
        path: '/guide/qemu/qemu_install',
      },
      {
        text: { zh: 'Linux虚拟机(KVM/QEMU)', en: 'Linux Virtual Machine(KVM/QEMU)' },
        path: '/guide/qemu/qemu_build',
      },
      {
        text: { zh: '致谢', en: 'Acknowledgements' },
        path: '/guide/qemu/qemu_thanks',
      },
      {
        text: { zh: '常见问题答疑', en: 'FAQ' },
        path: '/guide/qemu/qemu_qa',
      },
    ],
  },
  {
    text: { zh: 'KubeVirt', en: 'KubeVirt' },
    items: [
      {
        text: { zh: '系统和配置要求', en: 'System & configuration requirements' },
        path: '/guide/kubevirt/kubevirt_precheck',
      },
      {
        text: { zh: 'KubeVirt主体安装', en: 'KubeVirt main installation' },
        path: '/guide/kubevirt/kubevirt_install',
      },
      {
        text: { zh: 'Linux虚拟机(KVM)', en: 'Linux Virtual Machine(KVM)' },
        path: '/guide/kubevirt/kubevirt_build',
      },
      {
        text: { zh: '致谢', en: 'Acknowledgements' },
        path: '/guide/kubevirt/kubevirt_thanks',
      },
      {
        text: { zh: '常见问题答疑', en: 'FAQ' },
        path: '/guide/kubevirt/kubevirt_qa',
      },
    ],
  },
  {
    text: { zh: '屏蔽滥用', en: 'Block Abuse' },
    items: [
      {
        text: { zh: '通过iptables', en: 'via iptables' },
        path: '/guide/block/block_iptables',
      },
      {
        text: { zh: '在PVE上', en: 'In PVE' },
        path: '/guide/block/block_pve',
      },
      {
        text: { zh: '在INCUS上', en: 'In Incus' },
        path: '/guide/block/block_incus',
      },
      {
        text: { zh: '在LXD上', en: 'In LXD' },
        path: '/guide/block/block_lxd',
      },
      {
        text: { zh: '在DOCKER上', en: 'In Docker' },
        path: '/guide/block/block_docker',
      },
    ],
  },
  {
    text: { zh: '捐赠', en: 'Donation' },
    items: [
      {
        text: { zh: '捐赠', en: 'Donation' },
        path: '/guide/dashboardq',
      },
    ],
  },
];

const platformNavItems: DocLink[] = [
  {
    text: { zh: '平台总览', en: 'Platform overview' },
    path: '/guide/',
  },
  {
    text: { zh: 'OneClickVirt', en: 'OneClickVirt' },
    path: '/guide/oneclickvirt/oneclickvirt_precheck',
  },
  {
    text: { zh: 'Proxmox VE', en: 'Proxmox VE' },
    path: '/guide/pve/pve_precheck',
  },
  {
    text: { zh: 'Incus', en: 'Incus' },
    path: '/guide/incus/incus_precheck',
  },
  {
    text: { zh: 'Docker', en: 'Docker' },
    path: '/guide/docker/docker_precheck',
  },
  {
    text: { zh: 'LXD', en: 'LXD' },
    path: '/guide/lxd/lxd_precheck',
  },
  {
    text: { zh: 'Containerd', en: 'Containerd' },
    path: '/guide/containerd/containerd_precheck',
  },
  {
    text: { zh: 'Podman', en: 'Podman' },
    path: '/guide/podman/podman_precheck',
  },
  {
    text: { zh: 'QEMU', en: 'QEMU' },
    path: '/guide/qemu/qemu_precheck',
  },
  {
    text: { zh: 'KubeVirt', en: 'KubeVirt' },
    path: '/guide/kubevirt/kubevirt_precheck',
  },
  {
    text: { zh: '屏蔽滥用', en: 'Block Abuse' },
    path: '/guide/block/block_iptables',
  },
];

const incompleteProjectItems: DocLink[] = [
  { text: { zh: 'webvirtcloud', en: 'webvirtcloud' }, path: '/incomplete/webvirtcloud' },
  { text: { zh: 'webvirtcloud_retspen', en: 'webvirtcloud_retspen' }, path: '/incomplete/webvirtcloud_retspen' },
  { text: { zh: 'pterodactyl', en: 'pterodactyl' }, path: '/incomplete/pterodactyl' },
  { text: { zh: 'convoy', en: 'convoy' }, path: '/incomplete/convoy' },
  { text: { zh: 'cockpit', en: 'cockpit' }, path: '/incomplete/cockpit' },
  { text: { zh: 'virtfusion', en: 'virtfusion' }, path: '/incomplete/virtfusion' },
  { text: { zh: 'virtualizor-docker', en: 'virtualizor-docker' }, path: '/incomplete/virtualizor-docker' },
  { text: { zh: 'bashvm', en: 'bashvm' }, path: '/incomplete/bashvm' },
  { text: { zh: 'webvirtmgr', en: 'webvirtmgr' }, path: '/incomplete/webvirtmgr' },
];

const caseItems: DocLink[] = [
  {
    text: { zh: '1. VPS融合怪服务器测评脚本', en: '1. ECS benchmark script for VPS' },
    path: '/case/case1',
  },
  {
    text: {
      zh: '2. 一键修复与安装脚本',
      en: '2. One-click repair and install scripts',
    },
    path: '/case/case2',
  },
  {
    text: {
      zh: '3. 自动更新测试服务器节点列表的网络基准测试脚本',
      en: '3. Auto-updating network benchmark script',
    },
    path: '/case/case3',
  },
  {
    text: { zh: '4. 三网回程路由线路测试脚本', en: '4. CN return-route tracing script' },
    path: '/case/case4',
  },
  {
    text: { zh: '5. 服务器资源占用脚本', en: '5. Server resource occupancy script' },
    path: '/case/case5',
  },
  {
    text: { zh: '6. 为linux服务器增加swap分区', en: '6. Add swap space on Linux servers' },
    path: '/case/case6',
  },
  {
    text: { zh: '7. 为linux服务器启用zram设备', en: '7. Enable zram on Linux servers' },
    path: '/case/case7',
  },
];

const developerItems: DocLink[] = [
  { text: { zh: 'l10n', en: 'l10n' }, path: '/developer/l10n' },
];

const caseSidebarItems: DocLink[] = [
  caseItems[0],
  {
    text: {
      zh: '2. 一键修复与安装脚本(各种linux系统修复与服务器环境安装脚本)',
      en: caseItems[1].text.en,
    },
    path: caseItems[1].path,
  },
  caseItems[2],
  caseItems[3],
  caseItems[4],
  {
    text: {
      zh: '6. 为linux服务器增加swap分区(虚拟内存)',
      en: caseItems[5].text.en,
    },
    path: caseItems[5].path,
  },
  {
    text: {
      zh: '7. 为linux服务器启用zram设备(压缩内存)',
      en: caseItems[6].text.en,
    },
    path: caseItems[6].path,
  },
];

function toSitePath(relativePath: string) {
  return `/${relativePath}`
    .replace(/\/index\.md$/, '/')
    .replace(/\.md$/, '.html');
}

function toCanonicalUrl(relativePath: string) {
  return new URL(toSitePath(relativePath), `${SITE_URL}/`).toString();
}

function getDefaultTitle(relativePath: string) {
  return relativePath.startsWith('en/')
    ? 'OneClickVirt'
    : '一键虚拟化项目';
}

function getLocaleCode(relativePath: string) {
  return relativePath.startsWith('en/') ? 'en_US' : 'zh_CN';
}

function withLocale(locale: LocaleKey, path: string) {
  const localizedPath = `${locale === 'en' ? '/en' : ''}${path}`;
  return path.endsWith('/') ? localizedPath : `${localizedPath}.html`;
}

function toSidebarSection(section: SidebarSection, locale: LocaleKey): DefaultTheme.SidebarItem {
  return {
    text: section.text[locale],
    collapsed: true,
    items: section.items.map((item) => ({
      text: item.text[locale],
      link: withLocale(locale, item.path),
    })),
  };
}

function toNavItem(item: DocLink, locale: LocaleKey): DefaultTheme.NavItemWithLink {
  return {
    text: item.text[locale],
    link: withLocale(locale, item.path),
  };
}

function getGuideSidebar(locale: LocaleKey) {
  return guideSections.map((section) => toSidebarSection(section, locale));
}

function getIncompleteSidebar(locale: LocaleKey) {
  return [
    toSidebarSection(
      {
        text: {
          zh: '其他虚拟化项目',
          en: 'Other Virtualization Projects',
        },
        items: incompleteProjectItems,
      },
      locale,
    ),
  ];
}

function getCaseSidebar(locale: LocaleKey) {
  return [
    toSidebarSection(
      {
        text: { zh: 'Linux相关', en: 'Linux Utilities' },
        items: caseSidebarItems,
      },
      locale,
    ),
  ];
}

function getDeveloperSidebar(locale: LocaleKey) {
  return [
    toSidebarSection(
      {
        text: { zh: '开发手册', en: 'Development Manual' },
        items: developerItems,
      },
      locale,
    ),
  ];
}

function getNav(locale: LocaleKey): DefaultTheme.NavItem[] {
  return [
    {
      text: locale === 'zh' ? '虚拟化平台' : 'Platforms',
      activeMatch: locale === 'zh' ? '^/guide/' : '^/en/guide/',
      items: platformNavItems.map((item) => toNavItem(item, locale)),
    },
    {
      text: locale === 'zh' ? '其他虚拟化项目' : 'Other Projects',
      activeMatch: locale === 'zh' ? '^/incomplete/' : '^/en/incomplete/',
      items: incompleteProjectItems.map((item) => toNavItem(item, locale)),
    },
    {
      text: locale === 'zh' ? '其他实用项目' : 'Utilities',
      activeMatch: locale === 'zh' ? '^/case/' : '^/en/case/',
      items: caseItems.map((item) => toNavItem(item, locale)),
    },
    {
      text: locale === 'zh' ? '开发者' : 'Developers',
      activeMatch: locale === 'zh' ? '^/developer/' : '^/en/developer/',
      items: developerItems.map((item) => toNavItem(item, locale)),
    },
    {
      text: locale === 'zh' ? '融合怪商家收录' : 'Merchant List',
      link: 'https://paste.spiritlhl.net/',
    },
    {
      text: locale === 'zh' ? 'VPS余量监控' : 'VPS Stock Monitor',
      link: 'https://spiders.spiritlhl.net/',
    },
  ];
}

export default defineConfig({
  lastUpdated: true,
  lang: 'zh-CN',
  sitemap: {
    hostname: SITE_URL,
    transformItems(items) {
      return items.filter((item) => !/\/404(?:\.html)?$/.test(item.url));
    },
  },
  markdown: {
    lineNumbers: true,
    image: {
      lazyLoading: true,
    },
  },
  transformPageData(pageData) {
    if (pageData.relativePath === '404.md') {
      return;
    }

    const canonicalUrl = toCanonicalUrl(pageData.relativePath);
    const title = pageData.title || getDefaultTitle(pageData.relativePath);
    const description = pageData.description || '';

    pageData.frontmatter.head ??= [];
    pageData.frontmatter.head.push(
      ['link', { rel: 'canonical', href: canonicalUrl }],
      ['meta', { property: 'og:type', content: 'article' }],
      ['meta', { property: 'og:site_name', content: getDefaultTitle(pageData.relativePath) }],
      ['meta', { property: 'og:locale', content: getLocaleCode(pageData.relativePath) }],
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:url', content: canonicalUrl }],
      ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
      ['meta', { name: 'twitter:title', content: title }],
    );

    if (description) {
      pageData.frontmatter.head.push(
        ['meta', { property: 'og:description', content: description }],
        ['meta', { name: 'twitter:description', content: description }],
      );
    }
  },
  head: [
    ['link', { rel: 'icon', href: LOGO_URL }],
    ['meta', { name: 'google-site-verification', content: 'wdrGBim_2XmtMrqxivze70saMiPQAiOhpmN3KAWb0Sw' }],
    ['meta', { name: 'msvalidate.01', content: 'FC9B6B8BEB3D3B56844ADA69766DBB24' }],
    [
      'script',
      {
        src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5991535488582679',
        crossorigin: 'anonymous',
      },
    ],
  ],
  locales: {
    root: {
      lang: 'zh-CN',
      label: '简体中文',
      title: '一键虚拟化项目',
      description: '开源、易于使用的服务器虚拟化项目',
      link: '/',
      themeConfig: {
        logo: { src: LOGO_URL },
        lastUpdatedText: '上次更新',
        editLink: {
          pattern: 'https://github.com/oneclickvirt/oneclickvirt.github.io/edit/main/docs/:path',
          text: '在GitHub中编辑',
        },
        docFooter: {
          prev: '上一页',
          next: '下一页',
        },
        returnToTopLabel: '回到顶部',
        sidebarMenuLabel: '菜单',
        darkModeSwitchLabel: '主题',
        lightModeSwitchTitle: '切换到浅色模式',
        darkModeSwitchTitle: '切换到深色模式',
        externalLinkIcon: true,
        nav: getNav('zh'),
        sidebar: {
          '/': getGuideSidebar('zh'),
          '/guide/': getGuideSidebar('zh'),
          '/case/': getCaseSidebar('zh'),
          '/incomplete/': getIncompleteSidebar('zh'),
          '/developer/': getDeveloperSidebar('zh'),
        },
      },
    },
    en: {
      lang: 'en-US',
      label: 'English',
      title: 'OneClickVirt',
      description: 'Open source, easy to use server virtualization project',
      link: '/en/',
      themeConfig: {
        logo: { src: LOGO_URL },
        lastUpdatedText: 'Last Updated',
        editLink: {
          text: 'Edit this page on GitHub',
          pattern: 'https://github.com/oneclickvirt/oneclickvirt.github.io/edit/main/docs/:path',
        },
        docFooter: {
          prev: 'Previous page',
          next: 'Next page',
        },
        externalLinkIcon: true,
        nav: getNav('en'),
        sidebar: {
          '/en/': getGuideSidebar('en'),
          '/en/guide/': getGuideSidebar('en'),
          '/en/incomplete/': getIncompleteSidebar('en'),
          '/en/case/': getCaseSidebar('en'),
          '/en/developer/': getDeveloperSidebar('en'),
        },
      },
    },
  },
  themeConfig: {
    outline: 'deep',
    search: {
      provider: 'algolia',
      options: {
        appId: 'K1R85MDU0C',
        apiKey: '9375787ec1c00e2b813683fbbde25ae2',
        indexName: 'virt-spiritlhl',
      },
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/oneclickvirt' },
    ],
    footer: {
      message: 'Under <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">(CC BY-NC-SA 4.0) License.</a><br>Also thanks to <a href="https://www.cloudflare.com/">Cloudflare</a> and <a href="https://blog.tanglu.me/">tanglu.me</a> for the CDN.',
      copyright: 'Copyright © 2022-present oneclickvirt',
    },
  },
});
