## 开设安卓容器

- 自定义安卓版本
- 自动创建带校验的web网站
- 自动进行nginx和反向代理的配置

### 开设

国际

```shell
curl -L https://raw.githubusercontent.com/spiritLHLS/docker/main/scripts/create_android.sh -o create_android.sh && chmod +x create_android.sh && bash create_android.sh
```

国内

```shell
curl -L https://ghproxy.com/https://raw.githubusercontent.com/spiritLHLS/docker/main/scripts/create_android.sh -o create_android.sh && chmod +x create_android.sh && bash create_android.sh
```

命令执行后按照提示输入即可，安装完毕后打开```本机IPV4+80端口```可登录

如果需要查询过去生成的信息，可执行```cat android```可查询信息

**暂时只支持生成一个安卓容器，勿要重复生成，如需替换版本请执行后续命令删除后再次开设**

### 删除

```
docker rm -f android
docker rm -f scrcpy_web
```