---
outline: deep
---

# Solve the puzzle

## Successful PVE Installation but Lost Connection After Reboot

If the machine successfully installs PVE and the web interface is accessible, but loses connection after a reboot, please execute the following commands after a successful PVE installation and before rebooting:

```bash
auto_interface=$(grep '^auto ' /etc/network/interfaces | grep -v '^auto lo' | awk '{print $2}' | head -n 1)
if ! grep -q "^post-up /sbin/ethtool" /etc/network/interfaces; then
    chattr -i /etc/network/interfaces
    echo "post-up /sbin/ethtool -K $auto_interface tx off rx off" >> /etc/network/interfaces
    chattr +i /etc/network/interfaces
fi
```

Then report the rebooted disconnected machine to [@spiritlhl_bot](https://t.me/spiritlhl_bot) for the script to be updated and repaired automatically.

## PVE Installation Failed

If you encounter any issues with installing on certain machines, and if you're in a hurry, you can try using the scripts from the following repository to reinstall as Debian 11 first.

```
bash <(curl -sSL https://raw.githubusercontent.com/leitbogioro/Tools/master/Linux_reinstall/InstallNET.sh) -debian 11 -pwd 'oneclickvirt139'
```

The system username after dd at this point is ```root```, and the password is ```oneclickvirt139```.

If you have time or if it's still not working, please contact [@spiritlhl_bot](https://t.me/spiritlhl_bot) for assistance.

## What to do if you accidentally delete a NAT mapping rule

Use the following command to map back

```shell
iptables -t nat -F
iptables -t filter -F
service networking restart
systemctl restart networking.service
iptables-save | awk '{if($1=="COMMIT"){delete x}}$1=="-A"?!x[$0]++:1' | iptables-restore
```

## Verified VPS Providers

### VPS Providers Offering KVM Virtualization with NAT

[spartanhost](https://billing.spartanhost.net/aff.php?aff=1705) Debian12 on a Dedicated Server (Debian11 has problems)

[interserver](https://www.interserver.net/r/802990) VPS or dedicated servers

[frantech](https://my.frantech.ca/aff.php?aff=5522) Las Vegas Tier 2

[eugamehost](https://www.eugamehost.com/clients/aff.php?aff=194) US Phoenix Black Friday Special

[amhost](http://amhost.net/vps/?cid=29317) Testing version

[digitalocean](https://m.do.co/c/e9712622ee89) Perminu Intel and Regular 4-core versions

[skrime](https://hosting.skrime.eu/a/server) Lowest configuration of AMD Ryzen KVM Server

[webdock](https://webdock.io/en?maff=wdaff--150) AMD KVM Server

[4vps](https://clck.ru/33VQmc) Russian and Greek testing versions

[hostaris](https://deploy.hostaris.com/) German version (Note: Issues with the vendor's system template, IPV6 is not functional, and poor connectivity with Github)

[adtaq](https://www.adtaq.com/) Storage KVM server with lowest configuration

[nocix](https://www.nocix.net/) Dedicated servers

[crunchbits](https://get.crunchbits.com/aff.php?aff=17) VPS

[online.net](https://www.scaleway.com/en/dedibox/) Debian12 on a Dedicated Server (Debian11 has problems)

[OVH](https://www.ovhcloud.com/en/public-cloud/) Public Cloud needs to be installed after dd as a pure system using the following command

```shell
bash <(curl -sSL https://raw.githubusercontent.com/leitbogioro/Tools/master/Linux_reinstall/InstallNET.sh) -debian 11 -pwd ' oneclickvirt139' --network "static"
```

At this point, the system username after dd is ``root``, and the password is ``oneclickvirt139``.

### VPS Providers Offering NAT with LXC Virtualization

[Tencent Cloud](https://curl.qcloud.com/tPrMnfZm) Worry-Free and Student editions

[spectraip](https://my.spectraip.net/aff.php?aff=35) KVM servers

[Linode](https://www.linode.com/lp/refer/?r=9296554d01ecacaa0be56892fd969b557722becd) Lowest configuration with dedicated CPU

[hosthatch](https://cloud.hosthatch.com/a/2450) Special high-configuration servers

[hetzner](https://hetzner.cloud/?ref=CnWVr0FGneUl) Cloud servers

[rackdog](https://cloud.rackdog.com/referral/bx8fms) Servers with floating IP

[vultr](https://www.vultr.com/?ref=9124520-8H) Standard Cloud servers

[azure](https://portal.azure.com/#create/Microsoft.VirtualMachine-ARM) Standard machines

[scaleway](https://www.scaleway.com/en/) ARM architecture servers

[aws](https://aws.amazon.com/lightsail/) EC2 servers

[Google cloud platform - GCP](https://console.cloud.google.com/) AMD servers
