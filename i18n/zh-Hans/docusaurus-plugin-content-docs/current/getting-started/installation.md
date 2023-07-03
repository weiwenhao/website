---
title: 安装
sidebar_position: 20
---

## 平台支持

编译构建平台: linux/amd64、darwin/amd64

目标运行平台: linux/amd64

## 二进制方式安装

从 github releases 中下载与构建平台一致的的安装包并解压。推荐将解压后的 nature 文件夹移动到 /usr/local/ 下，并将 /usr/local/nature/bin 目录加入到系统环境变量即可。

检查是否安装成功，执行命令 `nature --version` 可以看到以下输出

```shell
> nature --version
nature version x.x.x - release build xxxx-xx-xx
```

## docker 方式

`docker pull naturelang/nature:latest`  镜像已经安装好了 nature 环境。在宿主机创建 nature 源码目录并进入该目录下执行

```shell
# 进入到容器内部，此时可以直接执行各种命令
docker run --rm -it -v $PWD:/app --name nature naturelang/nature:latest sh

# 从宿主机直接查看版本
docker run --rm -it -v $PWD:/app --name nature naturelang/nature:latest nature --version

# 从宿主机直接编译
docker run --rm -it -v $PWD:/app --name nature naturelang/nature:latest nature build main.n

# 从宿主机直接执行
docker run --rm -it -v $PWD:/app --name nature naturelang/nature:latest ./main
```

:::tip
镜像基于 alpine 构建，通过 apk add 可以安装其他软件，如 apk add vim
:::

## 交叉编译

执行编译命令 `nature build main.n` 时，默认的目标运行平台与当前的构建平台一致，可以通过环境变量 BUILD_OS 和 BUILD_ARCH 来指定编译的目标平台，示例

`BUILD_OS=linux BUILD_ARCH=amd64 nature build main.n`
