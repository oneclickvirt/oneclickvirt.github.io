import { defineConfig } from 'vitepress'

export default defineConfig({
  lastUpdated: true,
  lang: 'zh-CN',
  locales: {
    root: {
        lang: 'zh-CN',
        label: '简体中文',
        title: '一键虚拟化项目',
        description: '开源、易于使用的服务器虚拟化项目',
        link: '/',
        themeConfig: {
          lastUpdatedText: '上次更新',
          editLink: {
            pattern: 'https://github.com/oneclickvirt/oneclickvirt.github.io/edit/main/docs/:path',
            text: '在GitHub中编辑',
          },
          nav: [
            { text: '一键虚拟化', 
              link: '/', 
              activeMatch: '^/$|^/guide/' 
            },
            { text: 'Linux相关', 
              link: '/case/index', 
              activeMatch: '^/case/' 
            },
            {
              text: '开发手册',
              link: '/developer/index',
              activeMatch: '^/developer/'
            }
          ],
          sidebar: {
            '/': getGuideSidebarZhCN(),
            '/guide/': getGuideSidebarZhCN(),
            '/case/': getCaseSidebarZhCN(),
            '/developer/': getDeveloperSidebarZhCN(),
          }
        }
      },
      en_US: {
        lang: 'en-US',
        label: 'English',
        title: 'One Click Virtualization',
        description: 'Open source, easy to use server virtualization project',
        link: '/en_US/',
        themeConfig: {
          lastUpdatedText: 'Last Updated',
          editLink: {
            text: 'Edit this page on GitHub',
            pattern: 'https://github.com/oneclickvirt/oneclickvirt.github.io/edit/main/docs/:path',
          },
          nav: [
            { text: 'One Click Virtualization', link: '/en_US/', activeMatch: '^/en_US/guide/' },
            { text: 'Development Manual', link: '/en_US/developer/index', activeMatch: '^/en_US/developer/' }
          ],
          sidebar: {
            '/en_US/': getGuideSidebarEnUS(),
            '/en_US/guide/': getGuideSidebarEnUS(),
            '/en_US/developer/': getDeveloperSidebarEnUS()
        },
      },
    },
  },
  themeConfig: {
    socialLinks: [
      { icon: 'github', link: 'https://github.com/oneclickvirt/oneclickvirt.github.io' }
    ],
    algolia: {
      appId: '',
      apiKey: '',
      indexName: ''
    },
    footer: {
      message: 'This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0) License',
      copyright: 'Copyright © 2022-present oneclickvirt'
    }
  }
})

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
        { text: '系统和硬件配置要求', link: '/guide/pve_precheck.html' },
        { text: 'PVE主体安装', link: '/guide/pve_install.html' },
        { text: 'KVM虚拟化', link: '/guide/pve_kvm.html' },
        { text: 'LXC虚拟化', link: '/guide/pve_lxc.html' },
        { text: '致谢', link: '/guide/pve_thanks.html' },
        { text: '常见问题答疑', link: '/guide/pve_qa.html' }
      ]
    },
    {
      text: 'LXD',
      items: [
        { text: '系统和硬件配置要求', link: '/guide/lxd_precheck.html' },
        { text: 'LXD主体安装', link: '/guide/lxd_install.html' },
        { text: 'LXC虚拟化', link: '/guide/lxd_lxc.html' },
        { text: '其他自定义配置', link: '/guide/lxd_extra_config.html' },
        { text: '致谢', link: '/guide/lxd_thanks.html' },
        { text: '常见问题答疑', link: '/guide/lxd_qa.html' }
      ]
    },
    {
      text: 'Docker',
      items: [
        { text: '系统和硬件配置要求', link: '/guide/docker_precheck.html' },
        { text: '主体安装', link: '/guide/docker_install.html' },
        { text: 'Docker虚拟化', link: '/guide/docker_build.html' },
        { text: '致谢', link: '/guide/docker_thanks.html' },
        { text: '常见问题答疑', link: '/guide/docker_qa.html' }
      ]
    },
    {
      text: '捐赠',
      items: [
        { text: '捐赠', link: '/guide/dashboardq.html' },
      ]
    }
  ]
}

function getCaseSidebarZhCN() {
  return [
    {
      text: 'Linux相关',
      items: [
        { text: '1. 一键修复与安装脚本(各种linux系统修复与服务器环境安装脚本)', link: '/case/case1.html' },
        { text: '2. VPS融合怪服务器测评脚本', link: '/case/case2.html' },
        { text: '3. 自动更新测试服务器节点列表的网络基准测试脚本', link: '/case/case3.html' },
        { text: '4. 甲骨文服务器保活脚本', link: '/case/case4.html' },
        { text: '5. convoy面板安装脚本', link: '/case/case5.html' }
      ]
    }
  ]
}

function getDeveloperSidebarZhCN() {
  return [
    {
      text: '开发手册',
      items: [
        { text: 'l10n', link: '/developer/l10n.html' }
      ]
    }
  ]
}

function getGuideSidebarEnUS() {
  return [
    {
      text: 'Pre-requisites for all projects',
      items: [
        { text: 'Preparation', link: '/en_US/guide/dashboard.html' }
      ]
    },
    {
      text: 'Proxmox VE',
      items: [
        { text: 'System and hardware configuration requirements', link: '/en_US/guide/pve_precheck.html' },
        { text: 'PVE main installation', link: '/en_US/guide/pve_install.html' },
        { text: 'KVM Virtualization', link: '/en_US/guide/pve_kvm.html' },
        { text: 'LXC Virtualization', link: '/en_US/guide/pve_lxc.html' },
        { text: 'Acknowledgements', link: '/en_US/guide/pve_thanks.html' },
        { text: 'FAQ', link: '/en_US/guide/pve_qa.html' }
      ]
    },
    {
      text: 'LXD',
      items: [
        { text: 'System and hardware configuration requirements', link: '/en_US/guide/lxd_precheck.html' },
        { text: 'LXD main installation', link: '/en_US/guide/lxd_install.html' },
        { text: 'LXC Virtualization', link: '/en_US/guide/lxd_lxc.html' },
        { text: 'Other custom configuration', link: '/en_US/guide/lxd_extra_config.html' },
        { text: 'Acknowledgements', link: '/en_US/guide/lxd_thanks.html' },
        { text: 'FAQ', link: '/en_US/guide/lxd_qa.html' }
      ]
    },
    {
      text: 'Docker',
      items: [
        { text: 'System and hardware configuration requirements', link: '/en_US/guide/docker_precheck.html' },
        { text: 'Main installation', link: '/en_US/guide/docker_install.html' },
        { text: 'Docker Virtualization', link: '/en_US/guide/docker_build.html' },
        { text: 'Acknowledgements', link: '/en_US/guide/docker_thanks.html' },
        { text: 'FAQ', link: '/en_US/guide/docker_qa.html' }
      ]
    },
    {
      text: 'Donation',
      items: [
        { text: 'Donation', link: '/guide/dashboardq.html' }
      ]
    }
  ]
}

function getDeveloperSidebarEnUS() {
  return [
    {
      text: 'Development Manual',
      items: [
        { text: 'l10n', link: '/en_US/developer/l10n.html' }
      ]
    }
  ]
}
