---
outline: deep
---

## WebVirtCloud Installation Guide

[![hits](https://hits.spiritlhl.net/webvirtcloud.svg?action=hit&title=hits&title_bg=%23555555&count_bg=%233aebee&edge_flat=false)](https://hits.spiritlhl.net)

Repository: <https://github.com/oneclickvirt/webvirtcloud>

## Controller Installation

### System Requirements

**Minimum Configuration:**

- CPU: 1 core
- Memory: 1 GB RAM
- Disk: 10 GB free space

### Default Login Information

- Username: `admin@webvirt.cloud`
- Password: `admin`

### Access URLs

- Client Panel: `https://192-168-0-114.nip.io`
- Admin Panel: `https://192-168-0-114.nip.io/admin`

> **Note:** Replace `192.168.0.114` with your actual public IP address to get the correct access URL.

### Installation Command

```bash
curl -slk https://raw.githubusercontent.com/oneclickvirt/webvirtcloud/main/scripts/install_webvirt_cloud.sh -o install_webvirt_cloud.sh \
&& chmod +x install_webvirt_cloud.sh \
&& bash install_webvirt_cloud.sh
```

## Hypervisor Installation

> **Important:** The Hypervisor and Controller cannot be installed on the same virtual machine; network conflicts will occur.

### System Requirements

**Recommended Configuration:**

- CPU: 2 cores
- Memory: 4 GB RAM
- Disk: 40 GB free space

> **Additional Notes:**
>
> - Higher specifications are recommended for production use. This minimal setup is only sufficient to run 4 small VMs in a test environment.
> - The server must support KVM nested virtualization with VM-x/AMD-V/Hyper-V enabled.
> - The installation uses binary files directly, skipping dependency installation.

### Environment Testing

To test if your server supports KVM nested virtualization:

```bash
curl -L https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/ecs/master/goecs.sh -o goecs.sh && chmod +x goecs.sh && ./goecs.sh install
```

### Hypervisor Installation Steps

1. Download the installation script:

   ```bash
   curl -slk https://raw.githubusercontent.com/oneclickvirt/webvirtcloud/main/scripts/install_hypervisor.sh -o install_hypervisor.sh \
   && chmod +x install_hypervisor.sh
   ```

2. Run the installation (replace with your Controller IP):

   ```bash
   bash install_hypervisor.sh x.x.x.x
   ```

   > Replace `x.x.x.x` with your Controller's actual IP address.

3. Panel node
   After the execution is completed, there will be a prompt that needs to be filled in the Controller panel side of the content.
   Panel side to fill in the Hostname is the IPV4 address of the current computing node, as well as to fill in the Token to identify the node.

## Troubleshooting

### NetworkManager Version Issue

You might see this error during installation:

```
Connection 'eth0' (bed050e9-ff49-4665-8112-24ddf2a1cd3c) successfully deleted.
Warning: nmcli (1.48.10) and NetworkManager (1.42.2) versions don't match. Restarting NetworkManager is advised.
Error: Failed to add 'br-ext' connection: connection.autoconnect-ports: unknown property
```

**Solution:** Reboot your server, then run the installation command again.

### Installation Time Notes

- The entire process takes approximately **20-25 minutes**.
- Most time is spent downloading `finnix-125.iso` to `/var/lib/libvirt/isos/finnix-125.iso`.
- This download cannot be accelerated; use `tmux` or `screen` to prevent interruption.

### Adding Compute Node to Controller Panel

After installation, a **Token** will be generated for adding the compute node to the Controller:

Path: `Admin Panel > Computers > Add`

### Troubleshooting Adding Compute Node

On the Controller node, execute:

```shell
telnet <node ip> 8884
```

On the compute node, execute:

```shell
systemctl status webvirtcompute
```

```shell
systemctl status libvirtd
```

```shell
systemctl status prometheus
```

```shell
systemctl status prometheus-libvirt-exporter
```

If none of the above reveals the issue, then on the Controller node, execute:

```shell
docker exec -it webvirtcloud-backend /bin/sh
```

```shell
vi webvirtcloud/settings/production.py
```

Change `DEBUG=False` to `DEBUG=True`.

After saving the file, execute inside the container:

```shell
UV_PROJECT_ENVIRONMENT=/usr/local uv sync --dev
```

Then `exit` the container and execute:

```shell
docker restart webvirtcloud-backend
sleep 3
docker logs webvirtcloud-backend -f
```

Then trigger the error from the frontend; the log will now display the corresponding error in real time.

### Restarting Docker Containers After Controller Reboot

If Docker containers don't auto-restart after a system reboot, run:

```bash
docker start $(docker ps -a -q)
```

## Thanks

https://webvirt.cloud/
