---
title: Meet nature
sidebar_position: 10
---

Nature is a next-generation system-level programming language and compiler, striving for syntactical elegance and focusing on the user experience in both writing and reading code.

In terms of programming language features, Nature offers the following:

- Type system, null safety, generics, union types
- Proprietary compiler/assembler/linker, independent of LLVM, capable of compiling to amd64/riscv64/wasm architectures
- Non-intrusive interaction with C for efficient and high-performance development
- Incremental GC, supporting both automatic and manual GC
- Built-in vec/map/set/tup data structures
- Package and module management
- Function annotations, closures, error hints, runtime stack traces, coroutines
- Integrated SSA, linear-scan register allocation, reflection mechanism, assembler, and linker
  
As the standard library continues to evolve, Nature can be applied to game engine and game development, scientific and AI computing, operating systems and IoT, and web development. Game engines will be a core focus from versions 0.7.0 to 1.0+.

Nature is suitable for open-source creators, independent authors, and educational and research purposes. We not only hope you find convenience in the language but also that you create joyful and interesting projects using Nature.

## 📌 FAQ

1. Does Nature use type prefixing or suffixing?

Nature uniformly uses type prefixing, including the return types of functions. For example, in the initial design `fn sum(int a, int b):int c`, the return type also uses prefixing.

Omitting all identifiers leads to the type declaration of the function `fn(int,int):int f = xxx`. Typically, the identifier for the return value is also omitted in function definitions, resulting in the official function declaration `fn sum(int a, int b):int {}`.

2. What does Nature/logo mean?

The logo is an interstellar spaceship, symbolizing the "Natural Selection" ship in the "Three-Body Problem" series. The name Nature also originates from this.

3. Why are there no performance tests and comparisons?

Nature is still in its beta stage, focusing on core functionality development without any backend optimizations. Therefore, conducting performance tests would be unfair and meaningless.

4. How long has Nature been in development?

The main repository has been in development for nearly three years, with actual time invested nearing six years. What I want to say is that the Nature project will not be abandoned casually and will continue to be developed and maintained energetically.