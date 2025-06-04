---
outline: deep
---

# WebVirtCloud Installation Guide

[![hits](https://hits.spiritlhl.net/webvirtcloud.svg?action=hit&title=hits&title_bg=%23555555&count_bg=%233aebee&edge_flat=false)](https://hits.spiritlhl.net)

Repository: <https://github.com/oneclickvirt/webvirtcloud>

## 1. Controller Installation

### System Requirements

**Minimum Requirements:**
- CPU: 1 core
- Memory: 1 GB RAM
- Storage: 10 GB free space
- System: Debian11+, Ubuntu20.04+, Centos8+, AlmaLinux8+, RockyLinux8+

### Default Login Information
- Username: `admin@spiritlhl.net`
- Password: `admin`

### Panel Access
- User Panel: `https://192-168-0-114.nip.io`
- Admin Backend: `https://192-168-0-114.nip.io/admin`

> **Note:** Replace `192.168.0.114` with your public IP to get the actual accessible address.

### Installation Command

```bash
curl -slk https://raw.githubusercontent.com/oneclickvirt/webvirtcloud/main/scripts/install_webvirt_cloud.sh -o install_webvirt_cloud.sh \
&& chmod +x install_webvirt_cloud.sh \
&& bash install_webvirt_cloud.sh
```

:::tip
The execution process may be stuck in the clone repository has not been moving, at this time, press ctrl + c to exit the implementation, re-execution of the installation script on the line, the Department of Docker installation is stuck in the stage of the build project.
:::

## 2. Compute Node Installation

> **Important:** Hypervisor and Controller cannot be installed on the same virtual machine, otherwise network conflicts will occur.

### System Requirements

**Recommended Configuration:**
- CPU: 2 cores
- Memory: 4 GB RAM
- Storage: 40 GB free space
- System: AlmaLinux8+, RockyLinux8+

> **Additional Notes:**
> - Higher configurations are recommended for actual use; the test environment is only sufficient for running 4 minimal virtual machines.
> - Servers with KVM nested virtualization support are recommended. If `VM-x/AMD-V/Hyper-V` is not enabled, it will automatically switch to QEMU using TCG emulation to set up virtual machines, though performance will be reduced.
> - The installation skips environment checks and uses binary files directly, so no dependencies need to be installed.

### Environment Check

Check if the server supports KVM nested virtualization:
```bash
curl -L https://cdn.spiritlhl.net/https://raw.githubusercontent.com/oneclickvirt/ecs/master/goecs.sh -o goecs.sh && chmod +x goecs.sh && ./goecs.sh install && goecs
```

Select hardware individual test

### Compute Node Installation Steps

1. Download the installation script:
   ```bash
   curl -slk https://raw.githubusercontent.com/oneclickvirt/webvirtcloud/main/scripts/install_hypervisor.sh -o install_hypervisor.sh \
   && chmod +x install_hypervisor.sh
   ```

2. Execute installation (replace with your Controller IP):
   ```bash
   bash install_hypervisor.sh x.x.x.x
   ```
   > Replace `x.x.x.x` with the actual IP address of your Controller.

3. Node Management in Panel  
   After execution, there will be prompts for information needed in the Controller panel.  
   In the panel, the Hostname to be entered is the current compute node's IPv4 address, and you need to enter the Token to identify the node.

### NetworkManager Version Issue

During installation, you may encounter the following error:
```
Connection 'eth0' (bed050e9-ff49-4665-8112-24ddf2a1cd3c) successfully deleted.
Warning: nmcli (1.48.10) and NetworkManager (1.42.2) versions don't match. Restarting NetworkManager is advised.
Error: Failed to add 'br-ext' connection: connection.autoconnect-ports: unknown property
```

**Solution:** Restart the server and re-execute the installation command.

### Installation Time Note

- The entire process takes approximately **10-25 minutes**.
- Most of the time is spent downloading `finnix-125.iso` to `/var/lib/libvirt/isos/finnix-125.iso`.
- This part cannot be accelerated, so it's **recommended to use tmux or screen** to prevent interruption.

### Adding Compute Node to Control Panel

After installation, a **Token** will be generated for adding the compute node in the control panel (Admin panel):

Path: `Admin Panel > Computers > Add Computer`

- `HostName` should be filled with the compute node's public IPv4 address
- `Token` should be filled with the token key obtained on the compute node

## 3. Public IPv4 Port Mapping

### 3.1 Automatic Mapping

Automatic mapping features:
- **Automatic Monitoring**: Real-time monitoring of virtual machine status changes, automatically applying or cleaning up port mapping rules
- **Intelligent Port Allocation**: Automatically calculating and allocating non-conflicting ports based on VM IP addresses
- **Rule Persistence**: Using firewall-cmd to ensure port mapping rules remain effective after host restart
- **Mapping Records**: Automatically maintaining mapping information records for easy viewing and management
- **Conflict Prevention**: Intelligently detecting and avoiding port conflicts, ensuring each VM has unique port mappings

#### Installation Method

1. Download the script to a temporary directory:
   ```bash
   wget -O /tmp/vm_port_mapping_setup.sh https://raw.githubusercontent.com/oneclickvirt/webvirtcloud/refs/heads/main/extra_scripts/vm_port_mapping_daemon.sh
   ```

3. Add execution permission:
   ```bash
   chmod +x /tmp/vm_port_mapping_setup.sh
   ```

4. Run the installer:
   ```bash
   /tmp/vm_port_mapping_setup.sh
   ```

The script will automatically complete the following operations:
- Copy itself to the system directory `/usr/local/sbin/vm_port_mapping_daemon.sh`
- Create a systemd service unit file
- Enable and start the service

#### Port Mapping Rules

The daemon will assign the following ports for each virtual machine:

1. **SSH Port**:
   - Calculation formula: `(Last segment of IP) × 100 + 22 + 10000`
   - Example: For IP address 192.168.33.114, the mapped SSH port is 114×100+22+10000 = 21422

2. **Extra Ports**:
   - 10 additional ports are allocated for each VM
   - Starting port: 20000 + (Last segment of IP) × 100
   - Ending port: Starting port + 9
   - Example: For IP address 192.168.33.114, extra port range is 20000+(114×100) to 20000+(114×100)+9

If the calculated port is already occupied, the program will automatically find the next available port to ensure no conflicts occur.

#### Mapping File

All port mapping information is saved in the `/etc/vm_port_mapping/mapping.txt` file, in the format:
```
VM name IP address MAC address SSH mapped port Extra ports start Extra ports end
```

For example:
```
Virtance-1 192.168.33.114 52:54:00:5f:77:92 21422 31400 31409
```

#### Service Management

- **Check service status**:
  ```bash
  systemctl status vm-port-mapping
  ```

- **Start service**:
  ```bash
  systemctl start vm-port-mapping
  ```

- **Stop service**:
  ```bash
  systemctl stop vm-port-mapping
  ```

- **Disable auto-start**:
  ```bash
  systemctl disable vm-port-mapping
  ```

- **View logs**:
  ```bash
  journalctl -u vm-port-mapping
  # or
  cat /var/log/vm_port_mapping.log
  ```

- **Manually trigger rule update**:
  ```bash
  systemctl restart vm-port-mapping
  ```

#### Common Issues

##### Port mapping not working

Check the following:
- Confirm the service is running: `systemctl status vm-port-mapping`
- Check the log file: `cat /var/log/vm_port_mapping.log`
- Ensure the firewall service is normal: `systemctl status firewalld`
- Verify VM network interface configuration: `virsh domiflist VM-name`

##### Manually adding mapping rules

Usually, manual addition of rules is not needed, but if necessary:

1. Stop the service:
   ```bash
   systemctl stop vm-port-mapping
   ```

2. Edit the mapping file:
   ```bash
   nano /etc/vm_port_mapping/mapping.txt
   ```

3. Start the service:
   ```bash
   systemctl start vm-port-mapping
   ```

##### Cleaning all rules

```bash
systemctl stop vm-port-mapping
grep -f /etc/vm_port_mapping/mapping.txt | while read -r vm_name ip_address mac ssh_port port_start port_end; do
  firewall-cmd --permanent --remove-forward-port="port=$ssh_port:proto=tcp:toport=22:toaddr=$ip_address"
  for ((port=port_start; port<=port_end; port++)); do
    firewall-cmd --permanent --remove-forward-port="port=$port:proto=tcp:toport=$port:toaddr=$ip_address"
  done
done
firewall-cmd --reload
```

##### Security Recommendations

- Regularly check mapping files and logs to ensure there are no unauthorized mappings
- Do not manually modify files in the `/etc/vm_port_mapping/` directory unless you fully understand the impact
- Make sure the `firewalld` service is running properly so that rules can be correctly persisted

#### Uninstallation Method

To uninstall this service:
```bash
systemctl stop vm-port-mapping
systemctl disable vm-port-mapping
rm -f /etc/systemd/system/vm-port-mapping.service
rm -f /usr/local/sbin/vm_port_mapping_daemon.sh
rm -rf /etc/vm_port_mapping
systemctl daemon-reload
```

### 3.2 Manual Mapping

Assume your virtual machine is shown in the user control panel as

![wv1](images/wv1.png)

and the host machine command `ip a | head -n 15` result is

```shell
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host
       valid_lft forever preferred_lft forever
2: ens3: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP group default qlen 1000
    link/ether 52:54:00:f1:d6:8b brd ff:ff:ff:ff:ff:ff
    altname enp0s3
    inet your_public_IPv4_address/corresponding_subnet_mask scope global noprefixroute ens3
       valid_lft forever preferred_lft forever
    inet6 2a0b:4140:4c60::2/48 scope global noprefixroute
       valid_lft forever preferred_lft forever
    inet6 fe80::5054:ff:fef1:d68b/64 scope link noprefixroute
       valid_lft forever preferred_lft forever
```

It's evident that the public IPv4 address is bound to the `ens3` interface, so we'll use `ens3` in the following commands.

To map the current VM's port 22 to the public IPv4's port 3322, use:

```shell
# Add DNAT rule: Forward public 3322 traffic to host local 192.168.33.130:22
iptables -t nat -A PREROUTING -i ens3 -p tcp --dport 3322 -j DNAT --to-destination 192.168.33.130:22
# Add POSTROUTING: Local NAT masquerading for normal return connections
iptables -t nat -A POSTROUTING -p tcp -d 192.168.33.130 --dport 22 -j MASQUERADE
# Need to allow INPUT port 3322 through (firewalld is enabled by default)
iptables -I INPUT -p tcp --dport 3322 -j ACCEPT
```

This way, the internal virtual machine is mapped out and can be remotely logged in directly.

## 4. Troubleshooting

### Compute Node Addition Error Troubleshooting

Execute on the Controller:
```shell
telnet <node ip> 8884
```

Execute on the compute node:
```shell
systemctl status webvirtcompute
systemctl status libvirtd
systemctl status prometheus
systemctl status prometheus-libvirt-exporter
```

If none of the above reveals the problem, then you need to execute on the Controller:
```shell
docker exec -it webvirtcloud-backend /bin/sh
vi webvirtcloud/settings/production.py
```

Change `DEBUG=False` to `DEBUG=True`, save the file, then execute in the container:
```shell
UV_PROJECT_ENVIRONMENT=/usr/local uv sync --dev
```

Then `exit` the container and execute:
```shell
docker restart webvirtcloud-backend
sleep 3
docker logs webvirtcloud-backend -f
```

Then trigger the error in the frontend, and you'll see the corresponding error in the real-time loaded logs.

### Docker Containers Not Auto-Restarting After Controller Reboot

If Docker containers don't automatically restart after system reboot, execute:
```bash
docker start $(docker ps -a -q)
```

## 5. Drawbacks

System images are hard-coded; you can't use your own custom images, nor export them for use.

This is not the same project as https://github.com/retspen/webvirtcloud, don't confuse them.
