---
title: Installation
sidebar_position: 20
---

## Platform Support

Build Platform: linux/amd64, darwin/amd64

Target Platform: linux/amd64

## Installation via Binary

Download the installation package from the GitHub releases that matches your build platform and extract it. It is recommended to move the extracted `nature` folder to `/usr/local/` and add the `/usr/local/nature/bin` directory to the system's environment variable.

To check if the installation was successful, run the command `nature --version` and you should see the following output:

```shell
> nature --version
nature version x.x.x - release build xxxx-xx-xx
```

## Installation via Docker

The Docker image `naturelang/nature:latest` already has the Nature environment installed. Create a directory for your Nature source code on the host machine and navigate to that directory. Then, execute the following commands:

```shell
# Enter the container, where you can directly execute various commands
docker run --rm -it -v $PWD:/app --name nature naturelang/nature:latest sh

# View the version directly from the host machine
docker run --rm -it -v $PWD:/app --name nature naturelang/nature:latest nature --version

# Compile directly from the host machine
docker run --rm -it -v $PWD:/app --name nature naturelang/nature:latest nature build main.n

# Execute directly from the host machine
docker run --rm -it -v $PWD:/app --name nature naturelang/nature:latest ./main
```

:::tip
The image is built on Alpine. You can use `apk add` to install other software within the container, such as `apk add vim`.
:::

## Cross-Compilation

By default, when you execute the `nature build main.n` command, the target platform is the same as the current build platform. However, you can specify the target platform by using the environment variables `BUILD_OS` and `BUILD_ARCH`. Here's an example:

`BUILD_OS=linux BUILD_ARCH=amd64 nature build main.n`
