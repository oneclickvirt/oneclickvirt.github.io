---
outline: deep
---

# Custom

## Manage a node with Agent mode

Agent mode is intended for home broadband, NAT, and private network nodes without a dedicated public IPv4 address.

1. Click **Add Server**, select **Agent Entry**, and click **Next**.
2. Enter the node name and type. To forward ports directly from the node, fill in its public address under **Port IP**. For home, NAT, or private nodes, you can leave it blank.
3. Save and edit the node. Open **Connection Config** and click **Generate / View Secret** to view the install command.
4. Run the command on the node server.
5. Return to **Connection Config** and click **Check Connection** to confirm that the node is online.

![Select Agent Entry](./images/agent0.jpg)

![Enter Agent node information](./images/agent1.jpg)

The first click generates the node secret. Later clicks show the same secret. Keep the install command and secret private. If the secret is exposed, add the node again to get a new one.

![Generate or view the Agent secret in Connection Config](./images/agent3.jpg)

After detection succeeds, node and container management uses the same steps as a standard node.

### Intranet port forwarding

For a local or NAT node:

1. Under **IP Mapping Config**, set **Network Type** to **No Port Mapping**.
2. Open **Port Mapping Management** as an administrator and click **Add Manual Port**.
3. Select **Controller Forwarding (NAT Traversal)**.
4. Enter one TCP port per mapping. Optional fields can be left empty.

The controller must be a Linux server with a public IPv4 address, root access, and a script or bare-metal deployment. Docker, Docker Compose, and non-Linux controllers cannot provide this feature.

![No Port Mapping selected under Network Type](./images/agent5.jpg)

![Add a manual port using controller forwarding](./images/agent6.jpg)

The reverse proxy must allow both WS and WSS. For HTTPS, configure the required certificate and ports first.

## Domain binding and reverse WebSocket

This workflow is for containers on Agent-mode nodes. The steps are the same for every supported container runtime.

1. Confirm that the node is online and that the container has a reachable IPv4 or IPv6 address and service port.
2. Point an `A` record to the node IPv4 address and an `AAAA` record to the node IPv6 address. A hostname may have both.
3. In **Domain Bindings**, select the instance, enter the domain, container address, and port, then save.
4. For HTTPS/WSS, upload a certificate and private key matching the domain and enable the HTTPS listener.
5. Test HTTP, HTTPS (when enabled), WS, and WSS separately.

HTTP and WS use the HTTP listener. HTTPS and WSS use the HTTPS listener. Enabling HTTPS alone does not open HTTP port 80. WebSocket clients use the root path of the bound domain.

### Cloudflare

- **DNS only**: point A/AAAA directly to the node and open the matching HTTP or HTTPS port.
- **Full / Full (strict)**: use an HTTPS origin on port 443. Full (strict) also requires a valid origin certificate. Enable WebSockets in Cloudflare for WSS.
- **Flexible**: the browser uses HTTPS while the origin uses HTTP. A container that forces HTTPS can create a redirect loop. Only enable **Trust Cloudflare HTTPS headers** on the node when the HTTP listener accepts traffic only from Cloudflare.

When Cloudflare **Always Use HTTPS** is enabled, the redirect happens at Cloudflare. DNS-only records do not use that rule. Do not configure Cloudflare and the container to force redirects in opposite directions.

<details>
<summary>Troubleshooting</summary>

1. Check the domain binding status and its error message.
2. Click **Sync Proxies** in the administrator page and try again; manual Nginx changes are not required.
3. Confirm that the Agent is online, the listener ports are open, and the container service is running.
4. After changing node settings, wait for the **Runtime Connection Reload** task to finish before checking again. Do not repeatedly save or restart.

Domain routes are restored after an Agent restart. If the problem remains, inspect the Agent service and listening ports:

```shell
systemctl status oneclickvirt-agent
ss -lntp
journalctl -u oneclickvirt-agent -e
```

</details>

### Security and upgrades

For a private controller address or a protected tunnel, configure HTTPS and prefer WSS.

After upgrading the controller, upgrade the node Agent as well. Confirm that no install or restart task is running before upgrading.

## Share a GPU with an LXD/Incus container

1. Install the GPU driver on the host and confirm that `nvidia-smi` works.
2. Follow the LXD/Incus setup guide, add the node with Agent mode, and pass the health check.
3. In **Redemption Code Management**, click **Batch Create**. Select the node, container image, and specs, then check **Enable GPU Passthrough**. The panel then checks for GPUs on the node.

   ![Enable GPU passthrough for the container](./images/gpu1.jpg)

4. Install the matching driver inside the container with `--no-kernel-module`.
5. Run `nvidia-smi` inside the container to verify the shared GPU.
6. To create more containers, stop this container and use it as the copy template.

See [Install a GPU driver inside a container](https://www.spiritysdx.top/20240513/#%E5%AE%B9%E5%99%A8%E5%86%85%E5%AE%89%E8%A3%85gpu%E9%A9%B1%E5%8A%A8) for a driver installation example.
