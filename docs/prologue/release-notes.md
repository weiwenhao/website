---
title: Release Notes
sidebar_position: 10
---

The versioning of nature follows [Semantic Versioning](https://semver.org/). Versions 0.1 ~ 1.0 consist of two parts:

The upper half always carries a beta tag, indicating it's not ready for production use.

The lower half has a stable and backward-compatible syntax API. At this point, nature can be used for individual independent/open-source projects, but no LTS version is provided.

When version 1.0 is released, nature will officially be used for open-source/commercial projects and will have an LTS version.

| Version     | Content                     | Estimated Release Time |
| ----------- | --------------------------- | ---------------------- |
| v0.1.0-beta | Basic Syntax Release        | 2023-05                |
| v0.2.0-beta | Type System/Basic Syntax    | 2023-07                |
| v0.3.0-beta | Package Management/Syntax   | 2023-09                |
| v0.4.0-beta | Basic Standard Library      | 2023-11                |
| v0.5.0-beta | Small Test Cases/Bug Fixes  | 2024-02                |
| v0.6.0-beta | LSP Development/Editor Support | 2024-04            |
| v0.7.0      | Medium Test Cases/Stable API | 2024-07              |
| v0.8.0+     | Preparations for Official Release | 2024-09          |
| v1.0.0      | Official Release            | 2025-                 |

Core features that are still in planning will be gradually integrated into subsequent versions.

- Integration and optimization of key syntax like switch/try
- wasm architecture compilation
- Coroutine feature support
- Compilation for darwin systems
- Function label feature support
- Progressive GC improvements
- Compilation for riscv architecture
- Compilation for windows systems

### Changelog

Release history: https://github.com/nature-lang/nature/releases

Version: v0.4.0-beta

Release: 2023-09

Features

1. Compile-time error optimization, displaying filename and line number, type errors show original type identifiers
2. Runtime error provides stack trace
3. Multi-line comments `/****/` support
4. Import supports prefix-less import `import utils as *`
5. Small test cases [parker](https://github.com/weiwenhao/parker)
6. Parameter destructuring support, example `call(...vec)`
7. Generic type supports recursion `type numbert = gen intergert|flotert`
8. Binary operators `||` `&&` support
9. Package management import dir support, will automatically find dir's main.n
10. Package management import xxx_temp support, can define temp files to interact with static libraries
11. nature struct adjusted to be isomorphic with C, can directly pass nature struct to C language
12. Data type `arr<T,len>` support, allocated on the stack, isomorphic to C's `T ident[len]`
13. New syntax support, nature struct defaults to stack allocation, can get a heap-allocated p through `ptr<person> p = new person`
14. Type constraints after as, like `var s = {} as {u8}`, declares a set type constrained to `{u8}`, equivalent to `{u8} s = {}`
15. Package management supports declaring links for static library linking and temps for template declaration
16. New standard library for strings `import strings`
17. To better interact with C, new types `cptr` and `cptr<T>` added
18. Added built-in syntax keyword sizeof to calculate type size, usage example `int s = sizeof(person)`
19. New standard libraries fmt/os/path/strings/time
20. New template files (for interacting with C) builtin_temp (default import), dirent_temp, libc_temp, strings_temp, syscall_temp

Adjustments

1. Type param can only be defined globally
2. Global variables support type inference
3. Removed set function, declare an empty set through as constraint
4. List type definition adjusted to vec, supports declaring vec with original struct and specifying length, example `var terms = vec<u8>{len=12,cap=24}`
5. String type adjusted to be isomorphic with vec, supports accessing and assigning through `str[0]`, and supports for-in iteration
6. Vec type method list.len() adjusted to type attribute, list.len, and supports type methods like slice/concat
7. For loop expression errors and break and continue redeclaration errors
8. Generic type i = gen int|int64 basic types consistent when repeatedly generated
9. Register allocation interval_add_range adds range error
10. set.contains() calculates hash slot error
11. Defining fn in struct exception
12. Linker elf rela addend calculation exception, addend = next_inst_offset - current_inst_rel offset
13. ssa rename exception, some linear var def not renamed
14. If multi-line expression parser parsing exception
15. Automatic GC trigger time exception, adjusted GC trigger point to user mode
16. malloc allocates repeated memory areas, causing GC exception due to not clearing the area, malloc actively clears the allocated area
17. Import priority exception, local ident can override import ident
18. Fixed gcc11 global variable redefinition error #16