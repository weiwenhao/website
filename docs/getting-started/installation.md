---
title: Installation
sidebar_position: 20
---

## Platform Support

Build Platforms: linux/amd64, darwin/amd64

Target Run Platforms: linux/amd64

## Binary Installation

Download the installation package that matches your build platform from GitHub releases and unzip it. It is recommended to move the unzipped `nature` folder to `/usr/local/` and add the `/usr/local/nature/bin` directory to the system environment variables.

To check if the installation was successful, execute the `nature --version` command to see the following output:

```shell
> nature --version
nature version x.x.x - release build xxxx-xx-xx
```

## Docker Method

The image `docker pull naturelang/nature:latest` already has the nature environment installed. Create a nature source code directory on the host machine and go into that directory to execute the following:

```shell
# Enter the container; you can directly execute various commands now.
docker run --rm -it -v $PWD:/app --name nature naturelang/nature:latest sh

# Check the version directly from the host machine
docker run --rm -it -v $PWD:/app --name nature naturelang/nature:latest nature --version

# Compile directly from the host machine
docker run --rm -it -v $PWD:/app --name nature naturelang/nature:latest nature build main.n

# Execute directly from the host machine
docker run --rm -it -v $PWD:/app --name nature naturelang/nature:latest ./main
```

:::tip
The image is built on Alpine. You can install other software via `apk add`, such as `apk add vim`.
:::

## Cross-Compilation

When executing the compilation command `nature build main.n`, the default target run platform is the same as the current build platform. You can specify the target platform for compilation using the `BUILD_OS` and `BUILD_ARCH` environment variables, for example:

`BUILD_OS=linux BUILD_ARCH=amd64 nature build main.n`