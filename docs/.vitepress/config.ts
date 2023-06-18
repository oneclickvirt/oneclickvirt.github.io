import { defineConfig } from 'vitepress'
import { clipboardPlugin } from 'vuepress-plugin-clipboard'

export default defineConfig({
  lastUpdated: true,
  locales: {
    '/': {
        lang: 'zh-CN',
        title: '一键虚拟化项目',
        description: '开源、易于使用的服务器虚拟化项目',
    },
    '/en_US/': {
        lang: 'en-US',
        title: 'One Click Virtualization Project',
        description: 'Open source, easy to use server virtualization project',
    }
  },
  
  themeConfig: {
    locales: {
      '/': {
        label: '简体中文',
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
          '/guide/': getGuideSidebarZhCN(),
          '/case/': getCaseSidebarZhCN(),
          '/developer/': getDeveloperSidebarZhCN(),
          '/': getGuideSidebarZhCN()
        },
        repo: 'oneclickvirt/oneclickvirt.github.io',
        docsDir: 'docs',
        docsBranch: 'main',
        editLinks: true,
        editLinkText: '在GitHub中编辑',
        lastUpdated: '上次更新'
      },
      '/en_US/': {
        label: 'English',
        nav: [
          { text: 'One Click Virtualization', link: '/en_US/', activeMatch: '^/en_US/guide/' },
          { text: 'Development Manual', link: '/en_US/developer/index', activeMatch: '^/en_US/developer/' }
        ],
    
        sidebar: {
          '/en_US/guide/': getGuideSidebarEnUS(),
          '/en_US/developer/': getDeveloperSidebarEnUS(),
          '/en_US/': getGuideSidebarEnUS()
        },
        repo: 'oneclickvirt/oneclickvirt.github.io',
        docsDir: 'docs',
        docsBranch: 'main',
        editLinks: true,
        editLinkText: 'Edit this page on GitHub',
        lastUpdated: 'Last Updated'
      }
    },
    plugins: [
    clipboardPlugin({
      staticIcon: true
    })
    ],
    algolia: {
      appId: '',
      apiKey: '',
      indexName: ''
    }
  }
})

function getGuideSidebarZhCN() {
  return [
    {
      text: '所有项目的前置条件',
      children: [
        { text: '准备工作', link: '/guide/dashboard' },
      ]
    },
    {
      text: 'Proxmox VE',
      children: [
        { text: '系统和硬件配置要求', link: '/guide/pve_precheck' },
        { text: 'PVE主体安装', link: '/guide/pve_install' },
        { text: 'KVM虚拟化', link: '/guide/pve_kvm' },
        { text: 'LXC虚拟化', link: '/guide/pve_lxc' },
        { text: '致谢', link: '/guide/pve_thanks' },
        { text: '常见问题答疑', link: '/guide/pve_qa' }
      ]
    },
    {
      text: 'LXD',
      children: [
        { text: '系统和硬件配置要求', link: '/guide/lxd_precheck' },
        { text: 'LXD主体安装', link: '/guide/lxd_install' },
        { text: 'LXC虚拟化', link: '/guide/lxd_lxc' },
        { text: '其他自定义配置', link: '/guide/lxd_extra_config' },
        { text: '致谢', link: '/guide/lxd_thanks' },
        { text: '常见问题答疑', link: '/guide/lxd_qa' }
      ]
    },
    {
      text: 'docker',
      children: [
        { text: '系统和硬件配置要求', link: '/guide/docker_precheck' },
        { text: '主体安装', link: '/guide/docker_install' },
        { text: 'Docker虚拟化', link: '/guide/docker_build' },
        { text: '致谢', link: '/guide/docker_thanks' },
        { text: '常见问题答疑', link: '/guide/docker_qa' }
      ]
    },
    {
      text: '捐赠',
      children: [
        { text: '捐赠', link: '/guide/dashboardq' },
      ]
    }
  ]
}

function getCaseSidebarZhCN() {
  return [
    {
      text: 'Linux相关',
      children: [
        { text: '1. 一键修复与安装脚本(各种linux系统修复与服务器环境安装脚本)', link: '/case/case1' },
        { text: '2. VPS融合怪服务器测评脚本', link: '/case/case2' },
        { text: '3. 自动更新测试服务器节点列表的网络基准测试脚本', link: '/case/case3' },
        { text: '4. 甲骨文服务器保活脚本', link: '/case/case4' },
        { text: '5. convoy面板安装脚本', link: '/case/case5' }
      ]
    }
  ]
}

function getDeveloperSidebarZhCN() {
  return [
    {
      text: '开发手册',
      children: [
        { text: 'l10n', link: '/developer/l10n' }
      ]
    }
  ]
}

function getGuideSidebarEnUS() {
  return [
    {
      text: 'Pre-requisites for all projects',
      children: [
        { text: 'Preparation', link: '/en_US/guide/dashboard' }
      ]
    },
    {
      text: 'Proxmox VE',
      children: [
        { text: 'System and hardware configuration requirements', link: '/en_US/guide/pve_precheck' },
        { text: 'PVE main installation', link: '/en_US/guide/pve_install' },
        { text: 'KVM Virtualization', link: '/en_US/guide/pve_kvm' },
        { text: 'LXC Virtualization', link: '/en_US/guide/pve_lxc' },
        { text: 'Acknowledgements', link: '/en_US/guide/pve_thanks' },
        { text: 'FAQ', link: '/en_US/guide/pve_qa' }
      ]
    },
    {
      text: 'LXD',
      children: [
        { text: 'System and hardware configuration requirements', link: '/en_US/guide/lxd_precheck' },
        { text: 'LXD main installation', link: '/en_US/guide/lxd_install' },
        { text: 'LXC Virtualization', link: '/en_US/guide/lxd_lxc' },
        { text: 'Other custom configuration', link: '/en_US/guide/lxd_extra_config' },
        { text: 'Acknowledgements', link: '/en_US/guide/lxd_thanks' },
        { text: 'FAQ', link: '/en_US/guide/lxd_qa' }
      ]
    },
    {
      text: 'docker',
      children: [
        { text: 'System and hardware configuration requirements', link: '/en_US/guide/docker_precheck' },
        { text: 'Main installation', link: '/en_US/guide/docker_install' },
        { text: 'Docker Virtualization', link: '/en_US/guide/docker_build' },
        { text: 'Acknowledgements', link: '/en_US/guide/docker_thanks' },
        { text: 'FAQ', link: '/en_US/guide/docker_qa' }
      ]
    },
    {
      text: 'Donation',
      children: [
        { text: 'Donation', link: '/guide/dashboardq' }
      ]
    }
  ]
}

function getDeveloperSidebarEnUS() {
  return [
    {
      text: 'Development Manual',
      children: [
        { text: 'l10n', link: '/en_US/developer/l10n' }
      ]
    }
  ]
}
