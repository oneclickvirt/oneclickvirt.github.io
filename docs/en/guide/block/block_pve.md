---
outline: deep
---

# Avoid theft by setting up a firewall to limit the IPs used by the VMs

Create the following file under the PVE's host machine

```shell
/etc/pve/firewall/<VMID>.fw
[IPSET ipfilter-<net0>]
xxx.xxx.xxx.xxx
```

```<VMID>``` is replaced with the VMID number of the virtual machine, ```<net0>``` is replaced with the corresponding alias in the network device (which generally doesn't need to be changed unless you're restricted to IPV6), and ```xxx.xxx.xxx.xxx``` is replaced with the public IP address, noting that this IP corresponds to the network device in front of it.

The idea here is that net0 can only use the IP xxx.xxx.xxx.xxx, if you use any other IP the data will be dropped, thus restricting the VM to only use this IP.

There can be more than one IP, once this rule is enabled the VM can't use any other IP, if you don't write an IPv6 address it means the VM can't use an IPv6 address.

:::tip
This setting is only recommended when opening **VMs** with separate IPs that are not NAT full port mapped, otherwise it may cause strange issues resulting in the server being without a network.
:::

This method **is not suitable** for use on PVEs that open any NAT VMs/containers.