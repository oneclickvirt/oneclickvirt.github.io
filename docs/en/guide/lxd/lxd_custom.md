---
outline: deep
---

# Custom

## Attach free IPV6 address segments to host machines

Some machines don't have an IPV6 /64 subnet on the machine itself, here is a method given to attach an IPV6 subnet for free.

Here is a solution using the 6in4 method for a host machine that doesn't have an IPV6 address on its own.

:::tip
The operations on this page must be performed on the original system, and ensure that no other scripts from this project are installed(Except for PVE, which needs to be installed first), as this may lead to environment conflicts.
:::

Here are the platforms that are currently running in 2023 that offer IPV6 subnets for free.

| Supported Platforms | Corresponding Required Installation Packages | Protocols | Number of Channels/Subnets
|---------------------------|----------------|----------------|----------------|
| tunnelbroker.net              | ifupdown OR ifupdown2         | v4tunnel OR sit          | 3✖/64 或 5✖/64            |
| tunnelbroker.ch              | ifupdown OR ifupdown2          | v4tunnel OR sit        | 3✖/64          |
| ip4market.ru                | ifupdown OR ifupdown2          | v4tunnel OR sit           | 1✖/64          |
| netassist.ua                | ifupdown OR ifupdown2          | v4tunnel OR sit           | 1✖/64          |
| https://github.com/oneclickvirt/6in4               | ifupdown2          | sit、gre、ipip           | 自定义          |

The free platform only solves the problem that IPV6 is not available, it does not provide premium IPV6 bandwidth.

If you need high quality bandwidth, please build your own tunnel. When both ifupdown and ifupdown2 are available, try ifupdown first to see if it can be installed successfully, otherwise install ifupdown2.

After the installation is complete, select which package is installed behind to convert the format.

### Initial environment modifications

Execute

```
touch /etc/cloud/cloud-init.disabled
```

Turn off the automated overwrite of cloud-init first, and then to see what the local machine is using to manage the network, run

```
systemctl is-active systemd-networkd
```

and

```
systemctl is-active networking
```

See which case this falls into, if it's the former active and the latter inactive, you need to reinstall/DD a system that isn't configured this way, or switch the local machine to use ifupdown/ifupdown2 to manage network execution

```
# Judge for yourself whether you need to disable the original network management or not
# systemctl stop systemd-networkd
# systemctl disable systemd-networkd
# systemctl stop systemd-networkd.socket
# systemctl disable systemd-networkd.socket
```

If you want to install ```ifupdown``` to control the network, this tool is available on all major linux systems.

```
apt-get install ifupdown -y
```

If you want to install ```ifupdown2``` for network management, which is generally only available on debian systems, you can install

```
apt-get install ifupdown2 -y
```

After the installation is complete, select which package is installed behind to convert the format.

```
systemctl start networking
systemctl enable networking
```

Then restart the server, check whether the machine's network will be rebooted due to the modification of the case of loss of connection, and run```uptime```to observe that the startup has been more than 1 minute before proceeding to the next steps

If it is inactive and active, there is no need to switch the network management program and you can proceed directly to the next step.

Since some servers have default intranet IPV6 routes that will conflict with the tunnel, you can use the following command to remove the default IPV6 routes

```
default_route=$(ip -6 route show | awk '/default via/{print $3}') && [ -n "$default_route" ] && ip -6 route del default via $default_route dev eth0
```

This assumes that your client's server's default NIC is ```eth0```, you can use ```ip -6 route``` to see the default route and replace it, the default route starts with ```default via```, and uses ```dev``` to specify the default NIC, you just need to find it according to this rule

### Currently supported platforms

#### tunnelbroker_net


Combined with a script that opens containers with IPV6 addresses with a single click, you can attach an IPV6 address from he to each container


The downside is that the addresses are dark/dirty, and cloudflare's cdn will most likely not be able to latch on, test it yourself


1. Register an account at [https://tunnelbroker.net/](https://tunnelbroker.net/) and click```Create Regular Tunnel```on the left.


![1](https://github.com/oneclickvirt/oneclickvirt.github.io/assets/103393591/35923be5-821f-45c8-8401-962ea3f97726)


2. Fill in your server's IPV4 address in the red box, choose a connection point that is physically close to your server, for example, if your machine is in Los Angeles, choose a connection point on the west coast of the United States, and then click```Create Tunnel```to create the tunnel when you are prompted by the green box!


![2](https://github.com/oneclickvirt/oneclickvirt.github.io/assets/103393591/cab04113-4d6a-4d6f-9952-d3851057fc4a)


![3](https://github.com/oneclickvirt/oneclickvirt.github.io/assets/103393591/518dc62a-c8d0-48e3-bb13-befc39348990)


![4](https://github.com/oneclickvirt/oneclickvirt.github.io/assets/103393591/6188de3f-e83c-400e-9594-dd3f73aaf46a)


3. Wait for the following screen, click```Example Configurations```and select the corresponding system, for example, the host of LXD is definitely Debian/Ubuntu.


![5](https://github.com/oneclickvirt/oneclickvirt.github.io/assets/103393591/9f0045fc-b1ac-4954-9ecd-1fba47d07d8a)


![6](https://github.com/oneclickvirt/oneclickvirt.github.io/assets/103393591/2fb7c951-371c-452c-b775-78f69b980a2c)


4. The boxed part is the file to be modified and the content to be filled in.


![7](https://github.com/oneclickvirt/oneclickvirt.github.io/assets/103393591/c0156902-b4c0-4001-823e-50f611215393)


5. Exchange the format of the command then add IPV6 settings to your network configuration file.

Then open [https://ipv6tunnel.spiritlhl.top/](https://ipv6tunnel.spiritlhl.top/) and select```Option```for```TunnelBrokerNet```, another drop-down selection box to choose the name of the package you successfully installed previously, then paste what you copied in the input box.

Then click```Covert```to convert the format, and wait for the page to refresh to show the converted configuration file.


Then use vim or vi to modify the```/etc/network/interfaces```file to add content, or modify the following command to add new content

```
tee -a /etc/network/interfaces <<EOF
# Here, copy and paste the contents of the configuration file in the red box, and then run this command.
EOF
```


Then you can use```cat /etc/network/interfaces```to see if the configuration file is written correctly.


6. If all of the above is OK, then you need to enable the network interfaces


```
apt-get install net-tools iproute2 -y
systemctl restart networking
```

7. Then you can test the IP address of the network interface.

Execute the```ifconfig```command, and there should be a he-ipv6 interface, similar to the following:


![8](https://github.com/oneclickvirt/oneclickvirt.github.io/assets/103393591/1760af85-2b60-4352-ad8c-3c69e49fc1e4)


Or execute:


```
curl ipv6.ip.sb
```


Returns the IPV6 address you bound to


8. Additional settings for NAT VPS


IPv4 NAT VPS may require some additional settings beyond the IP replacement operation mentioned earlier, otherwise it may still not be able to access the IPv6 network.


```
apt-get install ufw -y
ufw allow 41
```


Add the relevant routing rules


```
route -A inet6 add ::/0 dev he-ipv6
```


9. If the IPV6 network is no longer needed and you want to delete it, delete the he-ipv6 network interface configuration.


If you want to delete the he-ipv6 network interface configuration (if not, it will be enabled automatically after reboot), remember to modify the```/etc/network/interfaces```file to remove the content added in the red box before.


Then reboot the server to remove the

#### tunnelbroker_ch


Similar to the above, first register an account at [https://www.tunnelbroker.ch/](https://www.tunnelbroker.ch/) and click on the activation email after registering.


Then you have to fill in the IPV4 address of your server.


![](https://github.com/oneclickvirt/oneclickvirt.github.io/assets/103393591/e018c7bc-e73c-4c68-88b6-b073f0dbd150)


After creating an account, you need to go to the Config page instead of the details page.


![](https://github.com/oneclickvirt/oneclickvirt.github.io/assets/103393591/d919dda7-571d-45b1-9d2f-03f29866269e)


Don't use the following page, first refresh the page without the light blue box and then stop refreshing it

Don't stop refreshing after the light blue box pops up

![](https://github.com/oneclickvirt/oneclickvirt.github.io/assets/103393591/aefd1477-d5f5-4a4e-a66c-80ef5f9250c6)


Record the content of the last red box on the following page, and prepare to modify the host configuration file.


![](https://github.com/oneclickvirt/oneclickvirt.github.io/assets/103393591/9329974c-9549-4ff2-a8a0-a53c00e2863d)


Copy the last red box of the page without the blank lines.


Then open [https://ipv6tunnel.spiritlhl.top/](https://ipv6tunnel.spiritlhl.top/) and select```Option```for```TunnelBrokerCh```, another drop-down selection box to choose the name of the package you successfully installed previously, then paste what you copied in the input box.


Then click```Covert```to convert the format, and wait for the page to refresh to show the converted configuration file.


Then use vim or vi to modify the```/etc/network/interfaces```file to add content, or modify the following command to add new content


```
tee -a /etc/network/interfaces <<EOF
# Modify the
EOF
```


Then you'll need to reboot the system a bit, or run


```
apt-get install net-tools iproute2 -y
systemctl restart networking
```

Make sure the environment is OK before you do anything else

#### ip4market_ru

Similar to the above, first register an account at [https://tb.ip4market.ru](https://tb.ip4market.ru/), the registered email address must be an unseen email address, the phone number can be written randomly without verification, and the IP address should be the IPV4 address of the host you want to attach.

The IP address is the IPV4 address of the host computer you are attaching to![](https://github.com/oneclickvirt/oneclickvirt.github.io/assets/103393591/24df37f2-12fe-49b6-87df-f07213346fbe)

Then you have to go through Recaptcha's human-machine verification, and click register.

You will receive an activation email with your password, memorize it.

Then login on the homepage

![](https://github.com/oneclickvirt/oneclickvirt.github.io/assets/103393591/38b3f5a7-a5e1-47e0-b13e-8570e946c61c)

Then you will be taken to this page

![](https://github.com/oneclickvirt/oneclickvirt.github.io/assets/103393591/fc1d38b9-b45a-41de-a931-5dbe96e9791c)

Hold down the right button and copy the four lines framed in red, which are

```
Server IPv4.
Client IPv4
Server IPv6
Client IPv6
```

For these four lines, press ctrl+c to copy or right-click to copy

![](https://github.com/oneclickvirt/oneclickvirt.github.io/assets/103393591/69c946e6-e82f-4665-b3c1-3c97e27f8487)

Then open [https://ipv6tunnel.spiritlhl.top/](https://ipv6tunnel.spiritlhl.top/) and select```Option```for```ip4market```, another drop-down selection box to choose the name of the package you successfully installed previously, then paste what you copied in the input box.

Then click```Covert```to convert the formatting

![](https://github.com/oneclickvirt/oneclickvirt.github.io/assets/103393591/b9ca3ee1-4f13-4e10-bdc8-1ed1cc23ab05)

Then the page will be refreshed automatically and you need to modify the contents of the```/etc/network/interfaces```file with vim or vi commands, or modify the following commands to add new contents.

```
tee -a /etc/network/interfaces <<EOF
# Modify the
EOF
```

Then you'll need to reboot the system a bit, or run

```
apt-get install net-tools iproute2 -y
systemctl restart networking
```

Make sure the environment is OK before you do anything else

#### netassist_ua

Similar to the above operation, first in [https://tb.netassist.ua/](https://tb.netassist.ua/) register an account first, after registration, click on the activation of the mail, the activation page will have a password display, remember to record!

Then fill in the IPV4 address of your server, you can change it later, just fill in a random one first.

Then you will get to this page

![a](https://github.com/oneclickvirt/oneclickvirt.github.io/assets/103393591/4af680d4-3b01-495a-91d1-3cf4f187d0df)

The first red box is the location of your host's IPV4 address, if you want to modify it, modify it there, and then click change to save.

The second red box is for```Linux``, and then click on show

![b](https://github.com/oneclickvirt/oneclickvirt.github.io/assets/103393591/099d43a0-0397-4e02-9275-9ec3099c0ff1)

The above content will appear, copy all the boxed parts without blank lines.

Then open [https://ipv6tunnel.spiritlhl.top/](https://ipv6tunnel.spiritlhl.top/) and select```Option```for```NetAssist```, another drop-down selection box to choose the name of the package you successfully installed previously, then paste what you copied in the input box.

Then click on```Covert```to convert the formatting

![c](https://github.com/oneclickvirt/oneclickvirt.github.io/assets/103393591/7324c7ff-d22f-4c17-b3c2-b5338ca6dfee)

Then the page will be refreshed automatically and you need to modify the contents of the```/etc/network/interfaces```file with vim or vi commands, or modify the following commands to add new contents.

```
tee -a /etc/network/interfaces <<EOF
# Modify the
EOF
```

Then you'll need to reboot the system a bit, or run

```
apt-get install net-tools iproute2 -y
systemctl restart networking
```

Make sure the environment is OK before you do anything else

## Transfer IPV6 subnets between different servers

Related repository: [https://github.com/oneclickvirt/6in4](https://github.com/oneclickvirt/6in4)

This method will provide a way to split a /80 out of the IPV6 segment on A and attach it to B to use.

### Features

- Self-built IPv6 tunnel for sit/gre/ipip protocols
- Support to customize the IPV6 subnet size to be cut out, and the appropriate IPV6 subnet information in CIDR format will be calculated automatically.
- Automatically recognizes the IPV6 subnet size of the server side
- will automatically set up the tunnel server and print the commands that the client needs to execute
- Setting up the IPV6 tunnel is easy to understand and easy to remove

### Environmental Preparation

| VPS(A) | VPS(B) |
| --------|--------|
| one IPV4 address (server_ipv4) | one IPV4 address (clinet_ipv4) |
| one IPV6 subnet | no IPV6 address |
| Hereafter referred to as server | Hereafter referred to as client |

### Usage

Download Script

```
curl -L https://raw.githubusercontent.com/oneclickvirt/6in4/main/6in4.sh -o 6in4.sh && chmod +x 6in4.sh
```

Execute it

```
./6in4.sh client_ipv4 <mode_type> <subnet_size> 
```

| Options | Optional Option 1 | Optional Option 2 | Optional Option 3 |
|--------|--------|--------|--------|
| <mode_type> | gre | sit | ipip |
| <subnet_size> | 64 | 80 | 112 |

```<mode_type>``` only support those three protocols for now, the more advanced the more recommended, no fill in the default is ```sit``` protocol

```<subnet_size>``` as long as it is larger than the original system subnet mask, and is a multiple of 8, if you don't fill it in, it defaults to ```80```.

Remember to replace ```client_ipv4``` with the IPV4 address of the machine you want to attach IPV6 to, and the command you need to execute on the client side will be sent back to you after execution, see the instructions after execution for details.

To prevent you from forgetting to copy the commands, the commands themselves will be written to the ```6in4.log``` file under the current path, you can use ```cat 6in4.log``` to query the commands that need to be executed on the client side

For copied commands, be sure to select option ``6in4`` in [https://ipv6tunnel.spiritlhl.top/](https://ipv6tunnel.spiritlhl.top/) before converting!

Then the page will be refreshed automatically and you need to modify the contents of the```/etc/network/interfaces```file with vim or vi commands, or modify the following commands to add new contents.

```
tee -a /etc/network/interfaces <<EOF
# Modify here
EOF
```

Then you'll need to reboot the system a bit, or run

```
apt-get install net-tools iproute2 -y
systemctl restart networking
```

Make sure the environment is OK before you do anything else

### Check server status

```
systemctl status ndpresponder
```

```
ip addr show
```

### Check client status

```
ip addr show
```

```
curl ipv6.ip.sb
```

### Delete tunnel

server

```
ip link set server-ipv6 down
ip tunnel del server-ipv6
```

client

```
ip link set user-ipv6 down
ip tunnel del user-ipv6
```

The above deletion is only temporary, for permanent deletion you must modify and delete the contents of the ``/etc/network/interfaces`` file that you have previously added.

### one more thing

In fact [https://tunnelbroker.net/](https://tunnelbroker.net/) supports the application of IPV6 subnets of size ```/48```

![](https://github.com/oneclickvirt/oneclickvirt.github.io/assets/103393591/07987e41-0158-430c-bcc5-f7cd8652b2c4)

Make the request here, then when converting the format change the original ```/64``` IPV6 address to a ```/48``` IPV6 address and you'll get a larger IPV6 subnet!

## Supplemental CloudFlare WARP IPv4 / IPv6 outbound

### 1: Benefits
* By installing it on the host machine, all enabled machines can benefit from the advantages of Warp without the need for individual configurations, thus saving resources and simplifying management.
* The use of kernel WireGuard on the host machine enables more efficient operation of WireGuard compared to user-space WireGuard-Go.

### 2: Manual Installation

#### 2-1 Installing WireGuard Dependencies
* Debian and Ubuntu systems
```
# Update dependent libraries
apt update -y

# Install WireGuard runtime dependencies
apt install -y --no-install-recommends net-tools openresolv dnsutils

# Install WireGuard protocol-compatible toolset
apt install -y --no-install-recommends wireguard-tools
```

* CentOS systems
```
# Update dependent libraries
yum update -y

# Install additional package components
yum install -y epel-release 

# Install WireGuard runtime dependencies
yum install -y net-tools

# Install WireGuard protocol-compatible toolset
yum install -y wireguard-tools
```

#### 2-2 Getting warp account information

Visit [https://warp.cloudflare.now.cc/?run=register&format=yaml](https://warp.cloudflare.now.cc/?run=register&format=yaml) and record private_key, v6 2 values

![image.png](https://img.imgdd.com/f210f3.5085a04e-edd3-4294-bb34-9e8263360c42.png)

#### 2-3: Modifying Configuration Files

* Create and edit the /etc/wireguard/warp.conf file, replacing any parts that contain <> (pointy brackets) together, just to make it look obvious.

* For IPv4-only hosts, Warp takes over IPv6 egress only

```shell
[Interface]
PrivateKey = <Your PrivateKey>
Address = 172.16.0.2/32
Address = <Your Address-v6 >/128
DNS = 1.1.1.1, 1.0.0.1, 2606:4700:4700::1111, 2606:4700:4700::1001
MTU = 1280

[Peer]
PublicKey = bmXOC+F1FxEMF9dyiK2H5/1SUtzH0JuVo51h2wPfgyo=
AllowedIPs = ::/0
Endpoint = 162.159.193.10:2408
```

* For IPv6 only hosts, Warp takes over IPv4 egress only.

```shell
[Interface]
PrivateKey = <Your PrivateKey>
Address = 172.16.0.2/32
Address = <Your Address-v6>/128
DNS = 2606:4700:4700::1111, 2606:4700:4700::1001, 1.1.1.1, 1.0.0.1
MTU = 1280

[Peer]
PublicKey = bmXOC+F1FxEMF9dyiK2H5/1SUtzH0JuVo51h2wPfgyo=
AllowedIPs = 0.0.0.0/0
Endpoint = [2606:4700:d0::a29f:c101]:2408
```

* There's no need to target dual-stack, after all, native network outlets are better than relaying through Warp

#### 2-4: Setting the Address Resolution Priority

For IPv4-only host machines, Warp only takes control of the IPv6 outbound, prioritizing the use of the native network's IPv4 outbound.

```shell
# IPv4 priority
grep -qE '^[ ]*precedence[ ]*::ffff:0:0/96[ ]*100' /etc/gai.conf || echo 'precedence ::ffff:0:0/96  100' >> /etc/gai.conf
```

For IPv6-only host machines, Warp only takes control of the IPv4 outbound, prioritizing the use of the native network's IPv6 outbound.

```shell
# IPv6 priority
sed -i '/^precedence \:\:ffff\:0\:0/d;/^label 2002\:\:\/16/d' /etc/gai.conf
```

#### 2-5: Connecting to Warp and setting up the systemd process daemon

```
# Run wireguard to connect to Warp. If this step gets stuck and causes the connection to be lost, reboot the host in the background to resolve it.
wg-quick up warp

# Check IPv4
curl -A a https://api-ipv4.ip.sb/geoip

# Check IPv6
curl -A a https://api-ipv6.ip.sb/geoip

# Disconnect from Warp after successful test.
wg-quick down warp

# Reconnect and set process daemon to take effect automatically after reboot.
systemctl enable --now wg-quick@warp
```

### 3: Autorun: fscarmen's one-click scripts

Finally, the one-click script for fscarmen is introduced. The script is mentioned as a handy tool to simplify the configuration process. It also automatically handles advanced parameters such as Optimal MTU, Optimal Endpoint, etc.

Project: https://github.com/fscarmen/warp-sh
```
# Run one-key script
wget -N https://gitlab.com/fscarmen/warp/-/raw/main/menu.sh && bash menu.sh
```

![image.png](https://img.imgdd.com/f210f3.b94cf8fb-82f2-4160-95a7-c2859238284f.png)