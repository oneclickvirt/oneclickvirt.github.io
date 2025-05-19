---
outline: deep
---

# Running Android Virtual Machine in Docker

## One-Click Deployment

- Customizable Android version
- Automatically creates a validated web website
- Automatically installs Nginx and configures reverse proxy. Option to bind a domain is available. Default is port 80 if no domain binding is chosen.
- No need to worry about host machine supporting nested virtualization
- Supports x86_64 and ARM architectures

**Host machine should have a minimum configuration of 1 core, 2GB RAM, and 15GB storage, else starting the setup might lead to host machine freezing.**

Ubuntu is recommended for hosting, Debian may cause white screen on Android.

Newer Android versions occupy more resources. The above configuration requirements are for the minimum version of Android. (Personally tested with the tag "12.0.0-latest", higher versions resulted in a blank screen. Test which version works for you.)

If, after 5 minutes after opening, the login verification of the browser page still keeps failing, then please check the logs of the Android container, it is probable that the Android container has crashed, and it is recommended to replace the container with a lower version of the Android system for installation.

**Setup:**

Command:

```shell
curl -L https://raw.githubusercontent.com/oneclickvirt/docker/main/scripts/create_android.sh -o create_android.sh && chmod +x create_android.sh && bash create_android.sh
```

After executing the command, follow the prompts to input the required information. Make sure to choose the version by entering the corresponding number index. Once the installation is complete, open ```YourMachineIPv4+80Port``` to log in.

If you need to check the generated Android information and web login details, execute ```cat /root/android_info``` to retrieve the information.

Default username: ```onea```
Default password: ```oneclick```

For remote desktop, click on ```H264 Converter``` to initiate the redirection.

**Please note that currently only one Android container can be generated. Do not generate duplicates. If you need to replace the version, please execute the subsequent commands after deletion.**

**Temporarily only support the opening has been used, can not restart the server, reboot may not be able to restart after the mapping success, self-test**

**Deletion:**

- Delete the container
- Delete the corresponding container image
- Delete the configuration file

```shell
docker rm -f android
docker rmi $(docker images | grep "redroid" | awk '{print $3}')
rm -rf /etc/nginx/sites-enabled/reverse-proxy
rm -rf /etc/nginx/sites-available/reverse-proxy
rm -rf /etc/nginx/passwd_scrcpy_web
rm -rf /root/android_info
```