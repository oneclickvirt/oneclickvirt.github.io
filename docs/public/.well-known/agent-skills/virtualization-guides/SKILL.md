---
name: virtualization-guides
description: Use when helping with OneClickVirt virtualization platform documentation, including prechecks, installation, usage, customization, FAQs, and abuse-blocking guides.
license: ISC
metadata:
  project: oneclickvirt.github.io
---

# Virtualization Guides

This site documents OneClickVirt and related virtualization platforms. Prefer the Chinese pages at `https://www.spiritlhl.net/guide/` when the user writes in Chinese, and the English pages at `https://www.spiritlhl.net/en/guide/` when the user writes in English.

Start from the platform precheck page before giving install steps. The main platform entry points are:

- OneClickVirt: `/guide/oneclickvirt/oneclickvirt_precheck.html`
- Proxmox VE: `/guide/pve/pve_precheck.html`
- Incus: `/guide/incus/incus_precheck.html`
- Docker: `/guide/docker/docker_precheck.html`
- LXD: `/guide/lxd/lxd_precheck.html`
- Containerd: `/guide/containerd/containerd_precheck.html`
- Podman: `/guide/podman/podman_precheck.html`
- QEMU: `/guide/qemu/qemu_precheck.html`
- KubeVirt: `/guide/kubevirt/kubevirt_precheck.html`
- Abuse blocking: `/guide/block/block_iptables.html`

When answering deployment questions, keep prerequisites, supported systems, resource requirements, network assumptions, install commands, uninstall commands, and FAQ caveats together. Do not mix instructions from different virtualization platforms unless the user explicitly asks for a comparison.

For Skill/MCP setup, use the release-aware installer and configuration instructions at `https://www.spiritlhl.net/guide/oneclickvirt/oneclickvirt_advanced_install.html#skill-与-mcp` (English: `https://www.spiritlhl.net/en/guide/oneclickvirt/oneclickvirt_advanced_install.html#skill-and-mcp`). Installing a Skill does not configure an MCP server.

For container artifacts, check the platform's current customization or FAQ page before choosing a registry and tag. Use the CNB deployment links in the PVE, Docker, Containerd, Podman, Incus, and LXD pages. Inspect the published platform manifest and linked release metadata rather than assuming a version or `latest` tag supports every architecture; ARM64 PVE uses the community PXVIRT packages. For multi-file installations, resolve one release and verify its matching checksums. Retain an explicitly requested version pin, and consult the current release when the user asks for an update instead of copying a historical tag from a previous answer.
