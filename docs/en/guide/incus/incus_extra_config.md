---
outline: deep
---

# Custom Configuration

:::tip
The following configurations may increase the load on the server. Only install them if necessary.
:::

## Automatic IPV6 Address Configuration

- (Optional, not required if not using)
- **This script is only suitable for servers that have an ```IPV6``` subnet with a prefix, and the server has bound the ```first IP``` of the subnet as its ```IPV6 address or IPV6 gateway```.**
- Automatically configures ```IPV6``` addresses for incus containers created with incus.
- Integrated into ```buildct.sh``` and can be controlled by variables without needing to be downloaded beforehand. You don't need to manually use this script; when using ```buildct.sh```, configure with variable Y to enable it.

Download Script

Command:

```bash
curl -L https://raw.githubusercontent.com/oneclickvirt/incus/main/scripts/build_ipv6_network.sh -o build_ipv6_network.sh && chmod +x build_ipv6_network.sh
```

Automatically configure IPV6 mapped addresses for containers

```bash
bash build_ipv6_network.sh Container_Name(change_me)
```

A message is printed when the mapping is complete (Default mapping without iptables)

Example (automatically configure the test container with an IPV6 address, a test_v6 file is written when the configuration is complete)

```bash
bash build_ipv6_network.sh test
```

**PS: Add ipv6 processing can choose whether to use ip6tables for mapping, the default is not to use ip6tables for mapping but to add new network devices for mapping**.

Use ip6tables for mapping

```bash
bash build_ipv6_network.sh Container_name Y
```

If ip6tables is used for mapping, remove all IPV6 mapped rules available:

```bash
ip6tables -t nat -F PREROUTING
ip6tables-legacy -t nat -F PREROUTING
ip6tables-save > /etc/iptables/rules.v6
netfilter-persistent save
netfilter-persistent reload
service netfilter-persistent restart
```

Uninstall the IPV6 address binding daemon and corresponding files

```shell
systemctl stop add-ipv6.service
systemctl disable add-ipv6.service
rm /etc/systemd/system/add-ipv6.service
systemctl daemon-reload
rm /usr/local/bin/add-ipv6.sh
```

## One-click Installation of Common Pre-configured Environment for incus Hosts with vnstat Integration

- (***Optional***, this script is only for easy monitoring integration with the site, it's fine if you choose not to install)

Command:

```shell
curl -L https://raw.githubusercontent.com/oneclickvirt/incus/main/scripts/backend.sh -o backend.sh && chmod +x backend.sh && bash backend.sh
```

## One-Click Installation of the official incus Visualization Dashboard

- (***Optional***, this panel is just for convenient visualization operations, it's okay if not present)

```shell
apt-get install -y incus-ui-canonical
incus config set core.https_address [::]
```

Then you can type in your browser

```https://your_public_ipv4_address:8443```

You can enter the official visualization panel, subsequent operation configuration in accordance with the UI prompts can be operated.