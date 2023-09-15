---
title: Contribution Guide
sidebar_position: 20
---

There are multiple ways to contribute to nature, including but not limited to submitting BUGs, sharing ideas, community discussions, coding contributions, documentation improvements, standardization, resource contributions, and donations.

:::tip
🎉 The community version of nature is about to be released. You're invited to help build the standard library. The relevant standard libraries will be merged into the main nature repository.
:::

## Errors and Suggestions

If you wish to submit a bug report, your issue should include a title and a clear description of the problem. You should also provide as much relevant information as possible and a code example that demonstrates the issue. The purpose of a bug report is to make it easy for yourself and others to reproduce the error and develop a fix.

When submitting suggestions, try to clarify your ideas and preferably provide persuasive materials so that your suggestions can be better adopted. Suggestions for syntax, compiler design, coding standards, learning materials, etc., are all welcome.

You can submit your bug reports or suggestions via issues at [nature-lang/nature](https://github.com/nature-lang/nature/issues).

For feature improvements and development contributions, please make sure to communicate through issues first. Once approved, a relevant tag will be added to the issue, and you can then proceed with code development without worrying about conflicts.

## Community Interaction

Ideas and issues are recommended to be discussed via GitHub issues to allow more people to focus and participate.

GitHub Discussion Community: [https://github.com/nature-lang/nature/discussions](https://github.com/nature-lang/nature/discussions)

## Source Code Compilation

Directory Structure

```shell
├── CMakeLists.txt
├── LICENSE
├── README.md
├── VERSION # Version number, follows semantic versioning
├── cmake # cmake build-related files
├── cmd # cmd like nature build entry files
├── config # Compilation configuration
├── lib # Source files for compiling nature and libraries referenced when packaging nature
├── main.c # Entry point
├── runtime # runtime source code
├── src # Compiler source code
├── std # Standard library
├── tests # Test files
└── utils # Utility functions
```

Compile runtime

> Currently, the runtime only targets linux-amd64, so you only need to compile it once. After building, it will be written to the lib/linux-amd64/libruntime.a file. This directory will be installed to the specified location when compiling nature.

```shell
cmake -B build-runtime -S runtime -DCMAKE_TOOLCHAIN_FILE=$(pwd)/cmake/linux-amd64-toolchain.cmake -DCMAKE_BUILD_TYPE=Release

cmake --build build-runtime --target runtime
```

Compile nature

:::info
linux-amd64-toolchain.cmake uses musl-gcc for static compilation, and static compilation is recommended.
If you want to compile for darwin/amd64, switch the toolchain to darwin-amd64-toolchain.cmake
:::info

```shell
# mkdir -p release && mkdir -p build-release
cmake -B build-release -DCMAKE_TOOLCHAIN_FILE=$(pwd)/cmake/linux-amd64-toolchain.cmake -DCMAKE_VERBOSE_MAKEFILE=ON -DCMAKE_BUILD_TYPE=Release -DCPACK_OUTPUT_FILE_PREFIX=$(pwd)/release

# build
cmake --build build-release

# test
cmake --build build-release --target test

# install (default installation to /usr/local/nature)
cmake --build build-release --target install

# package
cmake --build build-release --target package
```

## Additional Resources

These are some of the resources I used while learning compiler theory and writing nature, hoping they can help you contribute. (Roughly organized in the order of learning)

1. sicp (available in Python and JS versions), recommended to watch along with videos.
2. Compiler Design (2nd Edition), selected chapters, recommended in English as the Chinese version is hard to understand.
3. Modern Compiler Implementation in C, selected chapters, mainly the SSA part.
4. [crafting interpreters](https://craftinginterpreters.com/) Highly recommended
5. Writing a Compiler System from Scratch — Compilation, Assembly, and Linking, mainly read the assembly part.
6. Linear Scan Register Allocation for the Java HotSpotTM Client Compiler, based on this paper.
7. Linear Scan Register Allocation on SSA Form, SSA form linear scan register allocation.
8. [Writing a Memory Allocator](http://dmitrysoshnikov.com/compilers/writing-a-memory-allocator/) Memory allocation and garbage collection course.
9. golang/tcmalloc, referenced for memory allocation and garbage collection implementation, though my code reading skills are limited, so I read article analyses.
10. [bspaans/jit-compiler](https://github.com/bspaans/jit-compiler) Referenced for the assembler part, specific instruction encoding referenced from Intel manual volume 2.
11. Linkers and Loaders — Understanding Linkers and ELF File Structure.
12. [Tiny C Compiler](https://bellard.org/tcc/) Referenced for the linker part.

## Coding Standards

Nature's source code is developed based on ANSI C11 and musl libc.

1. The source code aims for simplicity and readability, avoiding complex third-party libraries.
2. Filenames/directory names/keywords use lowercase + underscore for word separation, the only exception being macro definitions, which use uppercase + underscore.
3. Relevant feature improvements and bug fixes should provide ctest test cases, which are all placed in the `tests/blackbox` directory.
