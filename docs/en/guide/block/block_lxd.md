---
outline: deep
---

# Blocking Abusive Behavior via Shell Scripts

## Blocking Ingress/Egress Traffic on Easily Abused Ports and Filtering Out Port Scanning and Exploitation Toolkits

- (***Optional***, this script is solely for preventing container abuse and is not mandatory to install.)
- Precautionary Measures

Command:

```shell
curl -L https://raw.githubusercontent.com/oneclickvirt/lxd/main/scripts/rules.sh -o rules.sh && chmod +x rules.sh && bash rules.sh
```

## Use the 'screen' command to configure monitoring and blocking of certain processes' commands: terminate containers immediately upon the appearance of specific processes.

- To stop monitoring, you can use the 'screen' command to stop the window named 'lxc_monitor' and delete it.
- (***Optional***, this script is only for preventing misuse of containers; it's fine not to install it.)
- Shutdown afterwards.

Command:

```shell
curl -L https://raw.githubusercontent.com/oneclickvirt/lxd/main/scripts/build_monitor.sh -o build_monitor.sh && chmod +x build_monitor.sh && bash build_monitor.sh
```