---
title: 贡献指南
sidebar_position: 20
---

有多种方式参与 nature 的贡献，包括但不限于提交 BUG、分享想法、社区讨论、编码参与、文档改进、规范制定、资料贡献、捐赠等。

:::tip
🎉 nature 社区可用版本即将发布，邀你一起构建标准库，相关标准库都会合并至 nature 主仓库。
:::

## 错误与建议

如果你希望提交错误报告，你的问题应包含标题和清晰的问题描述。你还应尽可能提供相关信息和演示问题的代码示例。错误报告的目的是使自己和其他人能够轻松地重现错误并开发修复程序。

提交建议时尽量阐述清楚自己的想法，最好带上有说服力的资料，让你建议能够得到更好的采纳。无论是语法，编译器设计，编码规范，学习资料等等都希望大家能够提供建议。

你可以通过 issue 来提交你的错误报告或者建议 [nature-lang/nature](https://github.com/nature-lang/nature/issues)

对于功能改进与开发贡献，请务必先通过 issue 进行沟通，通过后将会为该 issue 打上相关 tag，此时你可以安心的进行代码开发而不要担心冲突问题。

## 社区交流

想法和问题推荐使用 github issue 进行讨论让更多人能够关注并参与。

微信群: 添加微信号 `nature-lang` 备注 “申请加群”

github 讨论社区: [https://github.com/nature-lang/nature/discussions](https://github.com/nature-lang/nature/discussions)

## 源码编译

目录结构

```shell
├── CMakeLists.txt
├── LICENSE
├── README.md
├── VERSION # 版本号，遵守语义化版本规范
├── cmake # cmake 构建相关文件
├── cmd # cmd 如 nature build 入口文件
├── config # 编译时配置
├── lib # 编译 nature 源文件以及打包 nature 安装包时引用库文件
├── main.c # 入口
├── runtime # runtime 源码代码
├── src # 编译器源码
├── std # 标准库
├── tests # 测试文件
└── utils # 工具函数
```

编译 runtime

> 目前 runtime 只有 linux-amd64 目标平台，所以只需要编译一次，构建完成后会写入到 lib/linux-amd64 目录下的 libruntime.a 文件。编译 nature 时会将该目录安装到指定位置。

```shell
cmake -B build-runtime -S runtime -DCMAKE_TOOLCHAIN_FILE=$(pwd)/cmake/linux-amd64-toolchain.cmake -DCMAKE_BUILD_TYPE=Release

cmake --build build-runtime --target runtime
```

编译 nature

:::info
linux-amd64-toolchain.cmake 使用了 musl-gcc 进行静态编译，推荐静态编译。
如果想要编译 darwin/amd64 更换工具链为 darwin-amd64-toolchain.cmake 即可
:::info

```shell
# mkdir -p release && mkdir -p build-release
cmake -B build-release -DCMAKE_TOOLCHAIN_FILE=$(pwd)/cmake/linux-amd64-toolchain.cmake -DCMAKE_VERBOSE_MAKEFILE=ON -DCMAKE_BUILD_TYPE=Release -DCPACK_OUTPUT_FILE_PREFIX=$(pwd)/release

# build
cmake --build build-release

# test
cmake --build build-release --target test

# install 默认安装到 /usr/local/nature 目录下
cmake --build build-release --target install

# 打包
cmake --build build-release --target package
```

## 相关资料

主要是我学习编译原理以及编写 nature 时的一些资料，希望能够帮助你参与贡献。 (按学习的先后顺序粗略整理)

1. sicp (有 python 和 js 版本)，推荐和视频一起观看。
2. 编译器设计(第二版)，部分章节，推荐看英文版，中文版实在是看不懂。
3. 现代编译原理 —— C 语言描述，部分章节，主要是 ssa 部分。
4. [crafting interpreters](https://craftinginterpreters.com/) 非常推荐
5. 自己动手构造编译系统 —— 编译、汇编、与连接，主要看了汇编部分
6. Linear Scan Register Allocation for the Java HotSpotTM Client Compiler，线性扫描寄存器分配基于该论文编写
7. Linear Scan Register Allocation on SSA Form，ssa 形式线性扫描寄存器分配
8. [Writing a Memory Allocator](http://dmitrysoshnikov.com/compilers/writing-a-memory-allocator/) 内存分配与垃圾回收课程
9. golang/tcmalloc，内存分配和垃圾回收实现上参考，不过我源码阅读能力有限，所以看的都是文章解析。
10. [bspaans/jit-compiler](https://github.com/bspaans/jit-compiler) 汇编器部分参考实现，具体指令编码参考 intel 手册第二卷
11. 程序员的自我修养——链接装载与库，学习连接器与 ELF 文件构成
12. [Tiny C Compiler](https://bellard.org/tcc/) 连接器部分参考实现

## 编码规范

nature 源代码基于 ANSI C11 和 musl libc 进行开发。

1. 源码上追求简单可读，不使用复杂的第三方库
2. 文件名/目录名/关键字采用小写 + 下划线分词，唯一的例外是宏定义使用大写 + 下划线分词。
3. 相关的功能改进与 bug 修复需要提供 ctest 测试用例，相关测试用例都放在 `tests/blackbox` 目录中 
