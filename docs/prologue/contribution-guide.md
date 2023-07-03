---
title: Contribution Guide
sidebar_position: 20
---

There are multiple ways to contribute to Nature, including but not limited to submitting bugs, sharing ideas, participating in community discussions, coding, improving documentation, defining standards, contributing resources, and donations.

## Reporting Bugs and Suggestions

If you wish to submit a bug report, your issue should include a title and a clear description of the problem. Please provide relevant information and demonstrate the issue with code examples whenever possible. The purpose of bug reports is to make it easy for yourself and others to reproduce the error and develop fixes.

When submitting suggestions, try to articulate your ideas clearly and provide compelling evidence to support them, so that your suggestions have a better chance of being adopted. Whether it's about syntax, compiler design, coding conventions, learning materials, or any other aspect, we welcome your suggestions.

You can submit bug reports or suggestions through the issue tracker: [nature-lang/nature](https://github.com/nature-lang/nature/issues).


## Community

For ideas and questions, we recommend using GitHub issues to facilitate broader attention and participation.

discard: [https://discord.gg/xYYkVaKZ](https://discord.gg/xYYkVaKZ)

wechat: 添加微信号 `nature-lang` 备注 “申请加群”

github discussions: [https://github.com/nature-lang/nature/discussions](https://github.com/nature-lang/nature/discussions)


## Compiling the Source Code

目录结构

```shell
├── CMakeLists.txt
├── LICENSE
├── README.md
├── VERSION # Version number, following semantic versioning
├── cmake # CMake-related files
├── cmd # Entry files such as `nature build`
├── config # Compilation configuration
├── lib # Libraries used when compiling Nature source files and packaging the installation package
├── main.c # Entry point
├── runtime # Runtime source code
├── src # Compiler source code
├── std # Standard library
├── tests # Test files
└── utils # Utility functions

```


Compiling the runtime:

> Currently, the runtime only targets linux-amd64. Therefore, it only needs to be compiled once, and the resulting `libruntime.a` file will be written to the `lib/linux-amd64` directory. When compiling Nature, this directory will be installed to the specified location.

```shell
cmake -B build-runtime -S runtime -DCMAKE_TOOLCHAIN_FILE=$(pwd)/cmake/linux-amd64-toolchain.cmake -DCMAKE_BUILD_TYPE=Release

cmake --build build-runtime --target runtime
```

Compiling Nature:

:::info
The `linux-amd64-toolchain.cmake` file uses musl-gcc for static compilation. Static compilation is recommended. If you want to compile for darwin/amd64, you can switch to the `darwin-amd64-toolchain.cmake` toolchain file.
:::info

```shell
# mkdir -p release && mkdir -p build-release
cmake -B build-release -DCMAKE_TOOLCHAIN_FILE=$(pwd)/cmake/linux-amd64-toolchain.cmake -DCMAKE_VERBOSE_MAKEFILE=ON -DCMAKE_BUILD_TYPE=Release -DCPACK_OUTPUT_FILE_PREFIX=$(pwd)/release

# build
cmake --build build-release

# test
cmake --build build-release --target test

# Install (default installation location: /usr/local/nature)
cmake --build build-release --target install

# 打包
cmake --build build-release --target package
```

## Additional Resources

Here are some resources that I found useful while studying compiler theory and working on Nature. I hope they can help you contribute. (Listed roughly in the order of my own learning process)

1. SICP (Structure and Interpretation of Computer Programs) - available in Python and JS versions. I recommend watching the video lectures alongside the book.
2. Compiler Design (2nd Edition) - read selected chapters. I recommend the English version, as the Chinese version can be difficult to understand.
3. Modern Compiler Implementation in C - read selected chapters, focusing on the SSA (Static Single Assignment) part.
4. [Crafting Interpreters](https://craftinginterpreters.com/) - highly recommended.
5. Engineering a Compiler - mainly focused on assembly part.
6. Linear Scan Register Allocation for the Java HotSpotTM Client Compiler - implemented based on the research paper.
7. Linear Scan Register Allocation on SSA Form - linear scan register allocation on SSA form.
8. [Writing a Memory Allocator](http://dmitrysoshnikov.com/compilers/writing-a-memory-allocator/) - memory allocation and garbage collection course.
9. GoLang/tcmalloc - referenced for memory allocation and garbage collection, but my ability to read source code is limited, so I mainly relied on articles that explain the concepts.
10. [bspaans/jit-compiler](https://github.com/bspaans/jit-compiler) - reference implementation for the assembler part, with instruction encoding referenced from the Intel Manual Volume 2.
11. The Art of Linking - learning about linkers and the structure of ELF files.
12. [Tiny C Compiler](https://bellard.org/tcc/) - reference implementation for the linker part.


## Coding Guidelines

The Nature source code is developed using ANSI C11 and musl libc.

1. Strive for simplicity and readability in the source code. Avoid using complex third-party libraries.
2. Use lowercase with underscores for file names, directory names, and keywords. The only exception is macro definitions, which use uppercase with underscores.