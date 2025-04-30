import { createWriteStream } from 'node:fs';
import { resolve } from 'node:path';
import { SitemapStream } from 'sitemap';
import { defineConfig } from 'vitepress';

const links: { url: string; lastmod: number }[] = [];

export default defineConfig({
  lastUpdated: true,
  lang: 'zh-CN',
  transformHtml: (_, id, { pageData }) => {
    if (!/[\\/]404\.html$/.test(id)) {
      links.push({
        url: pageData.relativePath.replace(/\/index\.md$/, '/').replace(/\.md$/, '.html'),
        lastmod: pageData.lastUpdated ?? Date.now(),
      });
    }
  },
  buildEnd: async ({ outDir }) => {
    const sitemap = new SitemapStream({
      hostname: 'https://www.spiritlhl.net/'
    });
    const writeStream = createWriteStream(resolve(outDir, 'sitemap.xml'));
    sitemap.pipe(writeStream);
    links.forEach((link) => sitemap.write(link));
    sitemap.end();
    await new Promise((r) => writeStream.on('finish', r));
  },
  head: [
    ['link', { rel: 'icon', href: 'https://cdn.spiritlhl.net/https://raw.githubusercontent.com/spiritlhls/pages/main/logo.png' }],
    ['meta', { name: 'google-site-verification', content: 'wdrGBim_2XmtMrqxivze70saMiPQAiOhpmN3KAWb0Sw' }],
    ['meta', { name: 'msvalidate.01', content: 'FC9B6B8BEB3D3B56844ADA69766DBB24' }],
    ['script', {
      src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5991535488582679",
      crossorigin: "anonymous"
    }],
  ],
  locales: {
    root: {
      lang: 'zh-CN',
      label: '简体中文',
      title: '一键虚拟化项目',
      description: '开源、易于使用的服务器虚拟化项目',
      link: '/',
      themeConfig: {
        logo: { src: 'https://cdn.spiritlhl.net/https://raw.githubusercontent.com/spiritlhls/pages/main/logo.png' },
        lastUpdatedText: '上次更新',
        editLink: {
          pattern: 'https://github.com/oneclickvirt/oneclickvirt.github.io/edit/main/docs/:path',
          text: '在GitHub中编辑',
        },
        nav: [
          {
            text: '一键虚拟化项目',
            link: '/',
            activeMatch: '^/$|^/guide/'
          },
          {
            text: '其他虚拟化项目',
            link: '/incomplete/index',
            activeMatch: '^/incomplete/'
          },
          {
            text: '其他实用项目',
            link: '/case/index',
            activeMatch: '^/case/'
          },
          { text: 'VPS余量监控', link: 'https://spiders.spiritlhl.net/' },
          { text: 'VPS测试存档', link: 'https://beta.spiritlhl.net/' }
        ],
        sidebar: {
          '/': getGuideSidebarZhCN(),
          '/guide/': getGuideSidebarZhCN(),
          '/case/': getCaseSidebarZhCN(),
          '/incomplete/': getIncompleteSidebarZhCN(),
          '/developer/': getDeveloperSidebarZhCN(),
        }
      }
    },
    en: {
      lang: 'en-US',
      label: 'English',
      title: 'One Click Virtualization',
      description: 'Open source, easy to use server virtualization project',
      link: '/en/',
      themeConfig: {
        logo: { src: 'https://cdn.spiritlhl.net/https://raw.githubusercontent.com/spiritlhls/pages/main/logo.png' },
        lastUpdatedText: 'Last Updated',
        editLink: {
          text: 'Edit this page on GitHub',
          pattern: 'https://github.com/oneclickvirt/oneclickvirt.github.io/edit/main/docs/:path',
        },
        nav: [
          { text: 'One Click Virtualization', link: '/en/', activeMatch: '^/en/guide/' },
          { text: 'Other Virtualization Projects', link: '/en/incomplete/index', activeMatch: '^/en/incomplete/' },
          { text: 'VPS Stock Monitor', link: 'https://spiders.spiritlhl.net/' },
          { text: 'VPS Test Archive', link: 'https://beta.spiritlhl.net/' }
        ],
        sidebar: {
          '/en/': getGuideSidebarEnUS(),
          '/en/guide/': getGuideSidebarEnUS(),
          '/en/incomplete/': getIncompleteSidebarEnUS(),
        },
      },
    },
  },
  themeConfig: {
    socialLinks: [
      { icon: 'github', link: 'https://github.com/oneclickvirt/oneclickvirt.github.io' }
    ],
    algolia: {
      appId: 'K1R85MDU0C',
      apiKey: '9375787ec1c00e2b813683fbbde25ae2',
      indexName: 'virt-spiritlhl'
    },
    footer: {
      message: 'Under <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">(CC BY-NC-SA 4.0) License.</a><br>Thanks to <a href="https://www.cloudflare.com/">cloudflare</a> and <a href="https://blog.tanglu.me/">tanglu.me</a> for the CDN.',
      copyright: 'Copyright © 2022-present oneclickvirt'
    }
  }
});

function getGuideSidebarZhCN() {
  return [
    {
      text: '所有项目的前置条件',
      items: [
        { text: '准备工作', link: '/guide/dashboard.html' },
      ]
    },
    {
      text: 'Proxmox VE',
      items: [
        { text: '系统和硬件配置要求', link: '/guide/pve/pve_precheck.html' },
        { text: 'PVE主体安装', link: '/guide/pve/pve_install.html' },
        { text: 'KVM虚拟化', link: '/guide/pve/pve_kvm.html' },
        { text: 'LXC虚拟化', link: '/guide/pve/pve_lxc.html' },
        { text: '开设Windows虚拟机', link: '/guide/pve/pve_windows.html' },
        { text: '自定义', link: '/guide/pve/pve_custom.html' },
        { text: '致谢', link: '/guide/pve/pve_thanks.html' },
        { text: '常见问题答疑', link: '/guide/pve/pve_qa.html' }
      ]
    },
    {
      text: 'incus',
      items: [
        { text: '系统和硬件配置要求', link: '/guide/incus/incus_precheck.html' },
        { text: 'incus主体安装', link: '/guide/incus/incus_install.html' },
        { text: 'LXC虚拟化', link: '/guide/incus/incus_lxc.html' },
        { text: '更多配置', link: '/guide/incus/incus_extra_config.html' },
        { text: '自定义', link: '/guide/incus/incus_custom.html' },
        { text: '致谢', link: '/guide/incus/incus_thanks.html' },
        { text: '常见问题答疑', link: '/guide/incus/incus_qa.html' }
      ]
    },
    {
      text: 'Docker',
      items: [
        { text: '系统和硬件配置要求', link: '/guide/docker/docker_precheck.html' },
        { text: 'Docker主体安装', link: '/guide/docker/docker_install.html' },
        { text: 'Docker虚拟化', link: '/guide/docker/docker_build.html' },
        { text: '自定义', link: '/guide/docker/docker_custom.html' },
        { text: '致谢', link: '/guide/docker/docker_thanks.html' },
        { text: '常见问题答疑', link: '/guide/docker/docker_qa.html' }
      ]
    },
    {
      text: 'LXD',
      items: [
        { text: '系统和硬件配置要求', link: '/guide/lxd/lxd_precheck.html' },
        { text: 'LXD主体安装', link: '/guide/lxd/lxd_install.html' },
        { text: 'LXC虚拟化', link: '/guide/lxd/lxd_lxc.html' },
        { text: '更多配置', link: '/guide/lxd/lxd_extra_config.html' },
        { text: '自定义', link: '/guide/lxd/lxd_custom.html' },
        { text: '致谢', link: '/guide/lxd/lxd_thanks.html' },
        { text: '常见问题答疑', link: '/guide/lxd/lxd_qa.html' }
      ]
    },
    {
      text: '屏蔽滥用',
      items: [
        { text: '通过iptables', link: '/guide/block/block_iptables.html' },
        { text: '在PVE上', link: '/guide/block/block_pve.html' },
        { text: '在INCUS上', link: '/guide/block/block_incus.html' },
        { text: '在LXD上', link: '/guide/block/block_lxd.html' },
        { text: '在DOCKER上', link: '/guide/block/block_docker.html' },
      ]
    },
    {
      text: '捐赠',
      items: [
        { text: '捐赠', link: '/guide/dashboardq.html' },
      ]
    }
  ];
}

function getIncompleteSidebarZhCN() {
  return [
    {
      text: '其他虚拟化项目',
      items: [
        { text: 'webvirtcloud', link: '/incomplete/webvirtcloud.html' },
        { text: 'webvirtcloud_retspen', link: '/incomplete/webvirtcloud_retspen.html' },
        { text: 'pterodactyl', link: '/incomplete/pterodactyl.html' },
        { text: 'convoy', link: '/incomplete/convoy.html' },
        { text: 'cockpit', link: '/incomplete/cockpit.html' },
        { text: 'bashvm', link: '/incomplete/bashvm.html' },
        { text: 'virtfusion', link: '/incomplete/virtfusion.html' },
        { text: 'virtualizor-docker', link: '/incomplete/virtualizor-docker.html' },
        { text: 'webvirtmgr', link: '/incomplete/webvirtmgr.html' },
      ]
    }
  ];
}

function getCaseSidebarZhCN() {
  return [
    {
      text: 'Linux相关',
      items: [
        { text: '1. VPS融合怪服务器测评脚本', link: '/case/case1.html' },
        { text: '2. 一键修复与安装脚本(各种linux系统修复与服务器环境安装脚本)', link: '/case/case2.html' },
        { text: '3. 自动更新测试服务器节点列表的网络基准测试脚本', link: '/case/case3.html' },
        { text: '4. 三网回程路由线路测试脚本', link: '/case/case4.html' },
        { text: '5. 服务器资源占用脚本', link: '/case/case5.html' },
        { text: '6. 为linux服务器增加swap分区(虚拟内存)', link: '/case/case6.html' },
        { text: '7. 为linux服务器启用zram设备(压缩内存)', link: '/case/case7.html' }
      ]
    }
  ];
}

function getDeveloperSidebarZhCN() {
  return [
    {
      text: '开发手册',
      items: [
        { text: 'l10n', link: '/developer/l10n.html' }
      ]
    }
  ];
}

function getGuideSidebarEnUS() {
  return [
    {
      text: 'Pre-requisites for all projects',
      items: [
        { text: 'Preparation', link: '/en/guide/dashboard.html' }
      ]
    },
    {
      text: 'Proxmox VE',
      items: [
        { text: 'Configuration requirements', link: '/en/guide/pve/pve_precheck.html' },
        { text: 'PVE main installation', link: '/en/guide/pve/pve_install.html' },
        { text: 'KVM Virtualization', link: '/en/guide/pve/pve_kvm.html' },
        { text: 'LXC Virtualization', link: '/en/guide/pve/pve_lxc.html' },
        { text: 'Windows Virtual Machine', link: '/en/guide/pve/pve_windows.html' },
        { text: 'Custom', link: '/en/guide/pve/pve_custom.html' },
        { text: 'Acknowledgements', link: '/en/guide/pve/pve_thanks.html' },
        { text: 'FAQ', link: '/en/guide/pve/pve_qa.html' }
      ]
    },
    {
      text: 'incus',
      items: [
        { text: 'Configuration requirements', link: '/en/guide/incus/incus_precheck.html' },
        { text: 'incus main installation', link: '/en/guide/incus/incus_install.html' },
        { text: 'LXC Virtualization', link: '/en/guide/incus/incus_lxc.html' },
        { text: 'Extra configuration', link: '/en/guide/incus/incus_extra_config.html' },
        { text: 'Custom', link: '/en/guide/incus/incus_custom.html' },
        { text: 'Acknowledgements', link: '/en/guide/incus/incus_thanks.html' },
        { text: 'FAQ', link: '/en/guide/incus/incus_qa.html' }
      ]
    },
    {
      text: 'Docker',
      items: [
        { text: 'Configuration requirements', link: '/en/guide/docker/docker_precheck.html' },
        { text: 'Docker main installation', link: '/en/guide/docker/docker_install.html' },
        { text: 'Docker Virtualization', link: '/en/guide/docker/docker_build.html' },
        { text: 'Custom', link: '/en/guide/docker/docker_custom.html' },
        { text: 'Acknowledgements', link: '/en/guide/docker/docker_thanks.html' },
        { text: 'FAQ', link: '/en/guide/docker/docker_qa.html' }
      ]
    },
    {
      text: 'LXD',
      items: [
        { text: 'Configuration requirements', link: '/en/guide/lxd/lxd_precheck.html' },
        { text: 'LXD main installation', link: '/en/guide/lxd/lxd_install.html' },
        { text: 'LXC Virtualization', link: '/en/guide/lxd/lxd_lxc.html' },
        { text: 'Extra configuration', link: '/en/guide/lxd/lxd_extra_config.html' },
        { text: 'Custom', link: '/en/guide/lxd/lxd_custom.html' },
        { text: 'Acknowledgements', link: '/en/guide/lxd/lxd_thanks.html' },
        { text: 'FAQ', link: '/en/guide/lxd/lxd_qa.html' }
      ]
    },
    {
      text: 'Block Abuse',
      items: [
        { text: 'via iptables', link: '/guide/block/block_iptables.html' },
        { text: 'In PVE', link: '/guide/block/block_pve.html' },
        { text: 'In INCUS', link: '/guide/block/block_incus.html' },
        { text: 'In LXD', link: '/guide/block/block_lxd.html' },
        { text: 'In DOCKER', link: '/guide/block/block_docker.html' },
      ]
    },
    {
      text: 'Donation',
      items: [
        { text: 'Donation', link: '/guide/dashboardq.html' }
      ]
    }
  ];
}

function getIncompleteSidebarEnUS() {
  return [
    {
      text: 'Other Virtualization Projects',
      items: [
        { text: 'webvirtcloud', link: '/en/incomplete/webvirtcloud.html' },
        { text: 'webvirtcloud_retspen', link: '/en/incomplete/webvirtcloud_retspen.html' },
        { text: 'pterodactyl', link: '/en/incomplete/pterodactyl.html' },
        { text: 'convoy', link: '/en/incomplete/convoy.html' },
        { text: 'cockpit', link: '/en/incomplete/cockpit.html' },
        { text: 'bashvm', link: '/en/incomplete/bashvm.html' },
        { text: 'virtfusion', link: '/en/incomplete/virtfusion.html' },
        { text: 'virtualizor-docker', link: '/en/incomplete/virtualizor-docker.html' },
        { text: 'webvirtmgr', link: '/en/incomplete/webvirtmgr.html' },
      ]
    }
  ];
}