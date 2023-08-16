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

## Verified VPS Providers

### VPS Providers Offering KVM Virtualization with NAT

VPS or dedicated servers from [interserver](https://www.interserver.net/r/802990)

Las Vegas Tier 2 from [frantech](https://my.frantech.ca/aff.php?aff=5522)

US Phoenix Black Friday Special from [eugamehost](https://www.eugamehost.com/clients/aff.php?aff=194)

Testing version from [amhost](http://amhost.net/vps/?cid=29317)

Perminu Intel and Regular 4-core versions from [digitalocean](https://m.do.co/c/e9712622ee89)

Lowest configuration of AMD Ryzen KVM Server from [skrime](https://hosting.skrime.eu/a/server)

AMD KVM Server from [webdock](https://webdock.io/en?maff=wdaff--150)

Russian and Greek testing versions from [4vps](https://clck.ru/33VQmc)

German version from [hostaris](https://deploy.hostaris.com/) (Note: Issues with the vendor's system template, IPV6 is not functional, and poor connectivity with Github)

Storage KVM server with lowest configuration from [adtaq](https://www.adtaq.com/)

Dedicated servers from [nocix](https://www.nocix.net/)

### VPS Providers Offering NAT with LXC Virtualization

Worry-Free and Student editions from [Tencent Cloud](https://curl.qcloud.com/tPrMnfZm)

KVM servers from [spectraip](https://my.spectraip.net/aff.php?aff=35)

Lowest configuration with dedicated CPU from [Linode](https://www.linode.com/lp/refer/?r=9296554d01ecacaa0be56892fd969b557722becd)

Special high-configuration servers from [hosthatch](https://cloud.hosthatch.com/a/2450)

Cloud servers from [hetzner](https://hetzner.cloud/?ref=CnWVr0FGneUl)

Servers with floating IP from [rackdog](https://cloud.rackdog.com/referral/bx8fms)

Standard Cloud servers from [vultr](https://www.vultr.com/?ref=9124520-8H)

Standard machines from [azure](https://portal.azure.com/#create/Microsoft.VirtualMachine-ARM)

### Currently Unavailable or Unsupported Providers

(Note: The list ends here, as there's no specific information about unsupported providers)

OVH
