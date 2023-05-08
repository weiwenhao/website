---
title: 贡献指南
sidebar_position: 20
---

## 错误与建议

如果你希望提交错误报告，你的问题应包含标题和清晰的问题描述。你还应尽可能提供相关信息和演示问题的代码示例。错误报告的目的是使自己和其他人能够轻松地重现错误并开发修复程序。

提交建议时尽量阐述清楚自己的想法，最好带上有说服力的资料，让你建议能够得到更好的采纳。无论是语法，编译器设计，编码规范，学习资料等等都希望大家能够提供建议。

你可以通过 issue 来提交你的错误报告或者建议 [nature-lang/nature](https://github.com/nature-lang/nature/issues)


## 源码编译

目录结构

```shell
├── CMakeLists.txt
├── LICENSE
├── README.md
├── VERSION // 版本号，遵守语义化版本规范
├── examples // 包含了我对语法设计的一些思考，即将删除废弃
├── cmake // cmake 构建相关文件
├── cmd // cmd 如 nature build 入口文件
├── config // 编译时配置
├── lib // 编译 nature 源文件以及打包 nature 安装包时引用库文件
├── main.c // 入口
├── runtime // runtime 源码代码
├── src // 编译器源码
├── std // nature 标准库
├── tests // 测试文件
└── utils // 工具函数
```

编译 runtime

> 目前只有 linux-amd64 目标平台，所以只需要编译一次，构建完成后会写入到 lib/linux-amd64 目录下的 libruntime.a 文件。编译 nature 时会将该目录安装到指定位置

1. `cmake -B build-runtime -S runtime -DCMAKE_TOOLCHAIN_FILE=$(pwd)/cmake/linux-amd64-toolchain.cmake -DCMAKE_BUILD_TYPE=Release`
2. `cmake --build build-runtime --target runtime`

编译 nature

> linux-amd64-toolchain.cmake 使用了 musl-gcc 进行静态编译，推荐静态编译。
> 如果想要编译 darwin/amd64 更好工具链为 darwin-amd64-toolchain.cmake 即可

1. `cmake -B build-release -DCMAKE_TOOLCHAIN_FILE=$(pwd)/cmake/linux-amd64-toolchain.cmake -DCMAKE_BUILD_TYPE=Release`
2. 测试 `cmake --build build-release --target test`
3. 安装 `cmake --build build-release --target install` 默认安装到 `/usr/local/nature` 目录下
4. 打包 `cmake --build build-release --target package`


## 相关资料

主要是我学习编译原理以及编写 nature 时的一些资料，希望能够帮助你参与一起构建 nature (按学习的先后顺序粗略整理)
1. sicp (有 python 和 js 版本)，推荐和配套视频一起观看。
2. 编译器设计(第二版)，部分章节，推荐看英文版，中文版实在是看不懂。
3. 现代编译原理-C 语言描述(虎书)，部分章节，主要是 ssa 部分。
4. [crafting interpreters](https://craftinginterpreters.com/) 非常推荐
5. 自己动手构造编译系统 —— 编译、汇编、与连接，主要看了汇编部分
6. Linear Scan Register Allocation for the Java HotSpotTM Client Compiler 线性扫描寄存器分配是基于该论文编写
7. Linear Scan Register Allocation on SSA Form 由于 nature 中的 lir 是 ssa 形式的，所以参考这篇文章改进为基于 ssa 形式的寄存器分配
8. [Writing a Memory Allocator](http://dmitrysoshnikov.com/compilers/writing-a-memory-allocator/) 内存分配与垃圾回收课程
9. golang/tcmalloc，内存分配和垃圾回收实现上参考，不过我源码阅读能力有限，所以看的都是细碎的文章解析。
10. [bspaans/jit-compiler](https://github.com/bspaans/jit-compiler) 汇编器部分参考实现，具体指令编码参考 intel 手册第二卷
11. 程序员的自我修养——链接装载与库，学习连接器与 ELF 文件构成
12. [Tiny C Compiler](https://bellard.org/tcc/) 连接器部分参考实现

> 协程与范型功能开发中，有优秀的相关资料欢迎推荐。


## 编码规范

👷 施工中 

## 参与编码

请等待编码风格确定后再开始提交源码贡献，如果你有想法或者建议可以通过 github issue 提交或者发送到我的邮箱 MTEwMTE0MDg1N0BxcS5jb20= (临时邮箱 base64 编码)
