---
outline: deep
---

## Attach free IPV6 address segments to host machines

Some machines don't have IPV6 /64 subnets on their own, here's a way to attach an IPV6 subnet for free.

The 6in4 method is used here to solve the problem of the host machine itself not having an IPV6 address.

The following platforms are currently running in 2023 that provide IPV6 subnets for free.

| Supported Platforms | Corresponding Required Installation Packages | Protocols | Number of Channels/Subnets
|---------------------------|----------------|----------------|----------------|
| tunnelbroker.net              | ifupdown           | v4tunnel           | 3✖/64 或 5✖/64            |
| tunnelbroker.ch              | ifupdown           | v4tunnel           | 3✖/64          |
| ip4market.ru                | ifupdown          | v4tunnel           | 1✖/64          |
| netassist.ua                | ifupdown2          | sit           | 1✖/64          |

These platforms only address the issue of whether IPV6 is there or not, and do not provide quality IPV6 bandwidth.

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

See which case this falls into, if it's the former active and the latter inactive, you need to reinstall/DD a system that isn't configured this way, or switch the local machine to use ifupdown to manage network execution

```
# Judge for yourself whether you need to disable the original network management or not
# sudo systemctl stop systemd-networkd
# sudo systemctl disable systemd-networkd
# sudo systemctl stop systemd-networkd.socket
# sudo systemctl disable systemd-networkd.socket
```

Install```ifupdown```to control the network (some platforms require```ifupdown2```to control the network, see the corresponding platform instructions and come back)

```
sudo apt-get install ifupdown -y
```

```
sudo systemctl start networking
sudo systemctl enable networking
```

Then restart the server, check whether the machine's network will be rebooted due to the modification of the case of loss of connection, and run```uptime```to observe that the startup has been more than 1 minute before proceeding to the next steps

If it is inactive and active, there is no need to switch the network management program and you can proceed directly to the next step.

### tunnelbroker_net

Requires installation of```ifupdown```to control the network


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


5. Execute the following command to add IPV6 settings to your network configuration file (or modify the```/etc/network/interfaces```file yourself with vim or vi commands to add the content).


```
sudo tee -a /etc/network/interfaces <<EOF
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

### tunnelbroker_ch

You must use```ifupdown```when switching network management on this platform, which uses the v4tunnel protocol.


You need to install```ifupdown```to control the network.


```
sudo apt-get install ifupdown -y
```


```
sudo systemctl start networking
sudo systemctl enable networking
```


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


Then open [https://ipv6tunnel.spiritlhl.top/](https://ipv6tunnel.spiritlhl.top/) and select```Option```for```TunnelBroker```and paste what you copied in the input box.


Then click```Covert```to convert the format, and wait for the page to refresh to show the converted configuration file.


Then use vim or vi to modify the```/etc/network/interfaces```file to add content, or modify the following command to add new content


```
sudo tee -a /etc/network/interfaces <<EOF
# Modify the
EOF
```


Then you'll need to reboot the system a bit, or run


```
apt-get install net-tools iproute2 -y
systemctl restart networking
```

Make sure the environment is OK before you do anything else

### ip4market_ru

You must use```ifupdown```when switching network management on this platform, which uses the v4tunnel protocol.

You need to install```ifupdown```to control the network.

```
sudo apt-get install ifupdown -y
```

```
sudo systemctl start networking
sudo systemctl enable networking
```

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

Then open [https://ipv6tunnel.spiritlhl.top/](https://ipv6tunnel.spiritlhl.top/) and select```Option```for```ip4market```and paste what you copied in the input box.

Then click```Covert```to convert the formatting

![](https://github.com/oneclickvirt/oneclickvirt.github.io/assets/103393591/b9ca3ee1-4f13-4e10-bdc8-1ed1cc23ab05)

Then the page will be refreshed automatically and you need to modify the contents of the```/etc/network/interfaces```file with vim or vi commands, or modify the following commands to add new contents.

```
sudo tee -a /etc/network/interfaces <<EOF
# Modify the
EOF
```

Then you'll need to reboot the system a bit, or run

```
apt-get install net-tools iproute2 -y
systemctl restart networking
```

Make sure the environment is OK before you do anything else

### netassist_ua

This platform you must use```ifupdown2```instead of the```ifupdown2```installer when switching network management, the platform uses the sit protocol, which needs to be used in```ifupdown2```controlled environments

Requires installation of```ifupdown2```controlled network

```
sudo apt-get install ifupdown -y
```

```
sudo systemctl start networking
sudo systemctl enable networking
```

Similar to the above operation, first in [https://tb.netassist.ua/](https://tb.netassist.ua/) register an account first, after registration, click on the activation of the mail, the activation page will have a password display, remember to record!

Then fill in the IPV4 address of your server, you can change it later, just fill in a random one first.

Then you will get to this page

![a](https://github.com/oneclickvirt/oneclickvirt.github.io/assets/103393591/4af680d4-3b01-495a-91d1-3cf4f187d0df)

The first red box is the location of your host's IPV4 address, if you want to modify it, modify it there, and then click change to save.

The second red box is for```Linux``, and then click on show

![b](https://github.com/oneclickvirt/oneclickvirt.github.io/assets/103393591/099d43a0-0397-4e02-9275-9ec3099c0ff1)

The above content will appear, copy all the boxed parts without blank lines.

Then open [https://ipv6tunnel.spiritlhl.top/](https://ipv6tunnel.spiritlhl.top/) and select```Option```for```NetAssist```and paste what you copied in the input box.

Then click on```Covert```to convert the formatting

![c](https://github.com/oneclickvirt/oneclickvirt.github.io/assets/103393591/7324c7ff-d22f-4c17-b3c2-b5338ca6dfee)

Then the page will be refreshed automatically and you need to modify the contents of the```/etc/network/interfaces```file with vim or vi commands, or modify the following commands to add new contents.

```
sudo tee -a /etc/network/interfaces <<EOF
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

If you need to use this set of scripts to configure IPV6 addresses for containers with a single click on the server where B resides, then what you need to install is ```ifupdown2``` for network management

### Environmental Preparation

A dual-stack VPS (A) with an IPV6 segment of at least /64 size and an IPV4 address and a VPS (B) with only one IPV4 address, hereafter referred to as server and client, respectively, are split so that the client will be given an IPV6 subnet of /80.

### Usage

Download Script

```
curl -L https://raw.githubusercontent.com/oneclickvirt/6in4/main/6in4.sh -o 6in4.sh && chmod +x 6in4.sh
```

Execute it

```
./6in4.sh your_client_ipv4
```

Remember to write the IPV4 address of the machine you need to attach IPV6, after the execution is complete, it will return the command you need to execute in the client, see the instructions after the execution.

In case you forget to copy the command, the command itself will also be written to the 6in4.log file in the current path

For copied commands, be sure to select option ``6in4`` in [https://ipv6tunnel.spiritlhl.top/](https://ipv6tunnel.spiritlhl.top/) before converting!

Then the page will be refreshed automatically and you need to modify the contents of the```/etc/network/interfaces```file with vim or vi commands, or modify the following commands to add new contents.

```
sudo tee -a /etc/network/interfaces <<EOF
# Modify the
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

### Principle

Use 6in4's tunnel technology, along with ndpresponder to handle the NDP side of the problem, to solve the problem of forwarding IPV6 networks (/80) across different servers.
