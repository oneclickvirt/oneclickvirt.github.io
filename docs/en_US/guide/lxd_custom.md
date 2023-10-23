---
outline: deep
---

## Attach free IPV6 address segments to host machines

Some machines do not have an IPV6 /64 subnet, so here is a way to attach an IPV6 subnet for free.

Combined with the previous script that opens containers with IPV6 addresses, you can attach an IPV6 address to each container.

The disadvantage is that the address is rather dirty, cloudflare cdn may not be able to set up, self-testing

0. Initial environment modification

Execute:

```
touch /etc/cloud/cloud-init.disabled
```

Turn off the automated overwrite of cloud-init first, and then check what the machine uses to manage the network by running

```
systemctl is-active systemd-networkd
```

and

```
systemctl is-active networking
```

See which case it belongs to, if it's active in the former and inactive in the latter, you need to reinstall/DD a system that's not configured this way, or switch the local machine to use ifupdown to manage network execution

```
# Judge for yourself if you need to disable the original network management.
# sudo systemctl stop systemd-networkd
# sudo systemctl disable systemd-networkd
# sudo systemctl stop systemd-networkd.socket
# sudo systemctl disable systemd-networkd.socket

sudo apt-get install ifupdown
sudo systemctl start networking
sudo systemctl enable networking
```

Then reboot the server, check whether the machine's network will be rebooted due to the modification of the situation, and execute ```uptime`` to observe that the startup has been more than 1 minute before proceeding to the next step.

If it is inactive and active, there is no need to switch the network management program and you can proceed directly to the next step.

1. Register for an account at [https://tunnelbroker.net/](https://tunnelbroker.net/) and click ``Create Regular Tunnel`` on the left.

![1](https://github.com/oneclickvirt/oneclickvirt.github.io/assets/103393591/35923be5-821f-45c8-8401-962ea3f97726)

2. Fill in the red box with the IPV4 address of your server, choose a connection point that is close to the physical distance, for example, if the machine is in Los Angeles, choose a connection point on the west coast of the U.S., and then display the green box prompts, point ``Create Tunnel`` to create it!

![2](https://github.com/oneclickvirt/oneclickvirt.github.io/assets/103393591/cab04113-4d6a-4d6f-9952-d3851057fc4a)

![3](https://github.com/oneclickvirt/oneclickvirt.github.io/assets/103393591/518dc62a-c8d0-48e3-bb13-befc39348990)

![4](https://github.com/oneclickvirt/oneclickvirt.github.io/assets/103393591/6188de3f-e83c-400e-9594-dd3f73aaf46a)

3. Wait for the following screen, click ``Example Configurations`` and select the corresponding system, for example, the host of LXD is definitely Debian/Ubuntu.

![5](https://github.com/oneclickvirt/oneclickvirt.github.io/assets/103393591/9f0045fc-b1ac-4954-9ecd-1fba47d07d8a)

![6](https://github.com/oneclickvirt/oneclickvirt.github.io/assets/103393591/2fb7c951-371c-452c-b775-78f69b980a2c)

4. The boxed part is the document to be modified and the content to be filled in.

![7](https://github.com/oneclickvirt/oneclickvirt.github.io/assets/103393591/c0156902-b4c0-4001-823e-50f611215393)

5. Execute the following commands to append IPV6 settings to your network configuration file (or modify the ``/etc/network/interfaces`` file yourself with vim or vi commands to add them).

```
sudo tee -a /etc/network/interfaces <<EOF
# Here, copy and paste the contents of the configuration file in the red box before, and then execute this command
EOF
```

You can then use ``cat /etc/network/interfaces`` to see if the configuration file has been written properly

6. If all of the above is okay, then you need to enable the network interface

```
apt-get install net-tools iproute2 -y
systemctl restart networking
```

7. You can then test that the IPV6 network is attached.

Execute the ```ifconfig``` command, at which point there should be a he-ipv6 interface, similar to the following:

![8](https://github.com/oneclickvirt/oneclickvirt.github.io/assets/103393591/1760af85-2b60-4352-ad8c-3c69e49fc1e4)

Or execute:

```
curl ipv6.ip.sb
```

Return the IPV6 address you are bound to.

8. Additional settings for NAT VPS

IPv4 NAT VPS may require some additional settings beyond the IP replacement operation mentioned earlier, otherwise it may still not be able to access the IPv6 network.

```
apt-get install ufw -y
ufw allow 41
```

Add relevant routing rules

```
route -A inet6 add ::/0 dev he-ipv6
```

9. If you don't need the IPV6 network anymore and want to delete it, delete the he-ipv6 network interface configuration.

Delete the he-ipv6 network interface configuration (if not deleted it will be enabled automatically after reboot), remember to modify the ``/etc/network/interfaces`` file and delete the content added in the red box before.

Then reboot the server to remove the








