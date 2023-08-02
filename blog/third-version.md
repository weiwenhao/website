---
slug: third-version
title: 0.3.0-beta is Released!
authors: WEIWENHAO
---

I can't believe that in just two versions, nature has already added support for generics and package management, much faster than I anticipated. The basic syntax of nature has been mostly finalized, and there should be no more new syntax added according to the release plan. The next steps will involve two more beta versions, in which I will focus on optimizing error messages and code highlighting features in nature. I will also be delving into learning about Language Server Protocol (LSP) development. After that, I plan to work on a small test project, codenamed "onepack," and its features are currently kept confidential.

The passing of Mr. [陈皓 (Chen Hao)](https://coolshell.cn/haoel) has inspired new ideas for my future goals and prompted me to take some time to contemplate what I should do next. During this period, I have also set up a graphics card for myself and took advantage of the Steam summer sale to buy many games. I also got my hands on a Nintendo Switch during the 618 sales and started playing "王国之泪" (Tears of the Kingdom). I finally managed to play all the games I had been wanting to play.

The result of my contemplation is that I don't have the ability to change the tide of the times, and my abilities and personality might not be enough to obtain a ticket that aligns with the current trend. Life is short, so I want to do things that bring me happiness as much as possible. However, this doesn't mean I will fall into nihilism or hedonism. I believe more in the ideology of Master Wang Yangming's "知行合一" (Unity of Knowledge and Action). Writing code makes me happy, and playing games also brings me joy, so I will combine these two sources of happiness. Therefore, the standard library and practical projects of nature 0~1+ will mainly be oriented towards game engines and game development. I already have an interesting idea brewing in my mind, and I will announce it at the appropriate time.

I guess there's nothing else to share for now, so I'll share the TODO LIST of the nature project from the past three versions to fill in the space.

## TODO LIST

This is the main way I manage project features, primarily based on Obsidian for editing.

### 0.1.0-beta

Please help me translate the above markdown into English while preserving the original format.

- [x] Compiler custom assign, supporting map/list/struct assign and access ✅ 2023-03-27
- [x] Remove map and set keywords ✅ 2023-04-05
- [x] Pointer declaration syntax `p<type>` support ✅ 2023-04-12
- [x] addr_of and value_of syntax support, currently not exposed in the frontend, only supported at the AST level ✅ 2023-04-12
- [x] self keyword and type support ✅ 2023-04-12
- [x] Infer type refactoring ✅ 2023-04-07
- [x] Decompose ast_select, override moduel.select with module_name + select key as the globally unique symbol name, and infer list.select, set.select, map.selct, redefine struct_access as instance.select, instance = new(struct) ✅ 2023-04-07
- [x] Remove TYPE_VOID (void expression is expressive enough, so let's keep it for now) ✅ 2023-04-07
- [x] Struct type inference and default assignment syntax support, along with self initialization ✅ 2023-04-12
- [x] Support defining builtin.n declaration files, which include only global labels and are not restricted by module names. These files only need frontend scanner/parser/analysis/infer. ✅ 2023-04-05
- [x] Infer support for list_push, list_length, map_length, set_add, set_contains, set_delete special struct access ✅ 2023-04-07
- [x] Compiler support for ast_for_cond_stmt/ast_for_tradition_stmt/ast_for_iterator_stmt ✅ 2023-04-07
- [x] Compiler support for ast_throw_stmt/ast_expr_catch ✅ 2023-04-09
- [x] Compiler support for tuple_new/ast_set_new ✅ 2023-04-12
- [x] Compiler support for struct call and special struct call (list.push) ✅ 2023-04-12
- [x] Compiler support for tuple_destr ✅ 2023-04-12
- [x] Compiler support for list/map/set select (shortened differences in infer) ✅ 2023-04-12
- [x] set() or set(1, 2, 3) builtin runtime call and syntax support (parser phase converts set to set_new, smoothing out the differences) ✅ 2023-04-12
- [x] fn env syntax refactoring, associating it with fn->name (temporarily not implemented), writing first-level runtime call ✅ 2023-04-12
- [x] Optimization for scope issues, order of ident definitions in modules should not affect the use of vardef/typedef/fndef in the current module. (symbol pre-registration is already done in analysis, and finally the right side is analyzed) ✅ 2023-04-06
- [x] Attempt to unify the names of type_decl, var_decl, typedef, fn_decl, etc. ✅ 2023-04-12
- [x] Basic mathematical operators support, currently only addition can be used, + - * / % ✅ 2023-04-12
- [x] Complete basic types, including u8/u16/u32/u64 i8/i16/i32/i64 f32/f64, etc. ✅ 2023-04-13
- [x] += -= *= operators (improvements based on parser, just need to make parser changes) ✅ 2023-04-13
- [x] Logical operators improvements ✅ 2023-04-14
- [x] Improvements to implicit type conversions (including support for `any a = 12`), need runtime support ✅ 2023-04-14
- [x] Complete assembly opcode ✅ 2023-04-29
- [x] Add simple gc trigger flow ✅ 2023-05-03
- [x] Rename analysis to analyser ✅ 2023-04-14
- [x] Cross-compilation code optimization ✅ 2023-04-14
- [x] Optimize names of all traversals since some type names are frequently changed, preferring single characters or words. ✅ 2023-04-14
- [x] Complete import syntax ✅ 2023-04-14
- [x] Enhance test module, covering all syntax cases, and categorize into smaller modules for easier reference ✅ 2023-04-23
- [x] Write a packaging tool (preferably using cpack) to support packaging for macOS and Linux platforms, currently only supporting amd64 target platform ✅ 2023-04-15
- [x] Simple initialization for variables of the form `int a` (if size == 8, move 0 -> var, otherwise use syscall to clear) ✅ 2023-04-23
- [x] Escape problem handling - If a fn env references a variable, when

 the referenced side is pushed out, it should move its own referenced variable to the heap and update the env ✅ 2023-04-24
- [x] Write README.md ✅ 2023-04-23
- [x] Test - Type system and implicit type conversion for numbers ✅ 2023-04-29
- [x] Test - Closure test (including escape problem handling) ✅ 2023-04-26
- [x] Place custom link in a separate object file, and then load it as usual like module.o. ✅ 2023-04-29
- [x] Test - Import base module ✅ 2023-05-03
- [x] Memove optimization, as data size is always less than 8 bytes, no need to use call memory_move (reserved for 0.1 version) ✅ 2023-04-29
- [x] Provide Docker image since only linux/amd64 is currently supported, and Docker is the best choice ✅ 2023-05-11
- [x] Lower code optimization ✅ 2023-04-29
- [x] Shift code to right in infer should only be for numbers, no need for type conversion ✅ 2023-04-29
- [x] Bitwise operation support ✅ 2023-04-29
- [x] set() built-in call ✅ 2023-05-04
- [x] Large memory allocation test ✅ 2023-05-04
- [x] Automatic gc algorithm implementation ✅ 2023-05-03
- [x] Test nested form of ssa ✅ 2023-05-03

#### Optional Features
- [ ] nature 0.1 Issue Summary #23. Advanced fn design, such as fn to_string, fn private, fn hook, etc.
- [ ] Write a small project using the input function from the tests to perform a comprehensive syntax test.
- [ ] Support for break and continue syntax
- [x] Dockerfile building ✅ 2023-05-11
- [ ] Opcode matching optimization using column matching + weighted sorting
- [ ] Support for `import "syscall"` module, requiring support from builtins.
- [ ] Should we support syntax like `fn sum(int a, int b): int = a + b`? In the VM, without writing types, it would be `fn sum(a, b) = a + b`.
- [x] Implicit type conversion for int literals? Based on bit width? Or should it be like in C, where it can be freely converted? Considering there is no explicit type conversion feature now, for example, `u8(12)` is not distinguishable as type conversion or function call. Unless only basic types are implicitly converted. `12.(type)` is type inference from Golang, which can also be used for type conversion syntax. `(int)12` is the way in C, but it feels like an unnecessary syntax addition. So, let's allow free conversion for now. Perhaps only basic types need type conversion... ✅ 2023-04-29
- [ ] Support for binary and hexadecimal literals, such as `0b1011011` and `0x1F2D`
- [ ] Support for string concatenation syntax
- [x] Division defaults to converting both sides to floating-point numbers for calculation? For this default behavior, if integer types are really needed, it becomes difficult to declare them. ✅ 2023-04-28

#### Documentation
- [x] Confirm primary color scheme [[nature ui design]] ✅ 2023-05-11
- [x] Design logo ✅ 2023-05-11
- [x] Write GitHub README ✅ 2023-04-20
- [x] Choose documentation tool, currently options include ✅ 2023-05-11
   - https://github.com/facebook/docusaurus (pure markdown)
   - https://www.gitbook.com/ (similar to Notion)
   - https://vercel.com/ (not yet fully understood)
   - https://github.com/shuding/nextra
- [x] Write documentation ✅ 2023-05-11

---

### 0.2.0-beta

- [x] continue/break syntax support ✅ 2023-06-07
- [x] as type coercion and is type inference syntax support ✅ 2023-06-12
- [x] When performing type_compare in infer assign, it should be compatible with any assignment to any, and union assignment to any, allowing a narrower union to be assigned to a wider one. ✅ 2023-06-09
- [x] infer call now needs to consider overloading ✅ 2023-06-11
- [x] Should var decl in the form `int a` without explicit assignment still be supported? Strictly require explicit assignment, and then gradually allow default values. (Strict restrictions have been added in the infer phase) ✅ 2023-06-12
- [x] null type and value support ✅ 2023-06-12
- [x] boom syntax support (currently not feasible, requires runtime to determine exactly which zero values need to be initialized) ✅ 2023-06-11
- [x] Union type support ✅ 2023-06-11
- [x] Type parameter support ✅ 2023-06-08
- [x] Type parameter support in infer stage ✅ 2023-06-07
- [x] Generic function support with `gen` ✅ 2023-06-08
- [x] `let xxx as t` stmt support ✅ 2023-06-13
- [x] Parentheses in `if ()` or `for ()` are not mandatory, removing them can reduce some input burden. ✅ 2023-06-05
- [x] Should compiler check if a struct is zero? If so, it can determine whether to add default zero values based on markings. (Too cumbersome, postpone to next version) ✅ 2023-06-19
- [x] Change builtin length to len ✅ 2023-06-07
- [x] Implicit type conversions and overloading conflict, need to further restrict the use of implicit type conversions or temporarily disable them in this version. This allows more time for thoughtful consideration. Strict restrictions are more conducive to future development. Temporarily disable all implicit type conversions. ✅ 2023-06-19
- [x] Support module-level select for type alias, such as `foo.bar a = 12` ✅ 2023-06-13
- [x] Improve README, showcasing coding features to the maximum extent ✅ 2023-07-07
- [x] Use a shorter `try` to replace `catch` ✅ 2023-06-15

#### Optional Features

- [ ] Binary literal support for `0b` and hexadecimal number support for `0x`
- [ ] Package management
- [x] Single-quote string support, which is more concise and easier to read. E.g., `map['

key']` vs. `map["key"]` ✅ 2023-06-19
- [ ] String concatenation syntax support
- [ ] Overloading causes the existence of functions with the same name. If cross-platform modules are also integrated, it will lead to even more functions with the same name. It is recommended to use file names to distinguish cross-platform compilation, as done in Golang.
- [x] Variable argument optimization, `fn println(...[any] args)` optimized to `fn println(...any args)`? TS uses the former ✅ 2023-06-19

#### Documentation Improvements

1. Add a development plan section
2. Improve the contribution guidelines

---

### 0.3.0-beta

- [x] Package management ✅ 2023-07-27
- [x] Sub-modules (postponed) ✅ 2023-07-27
- [x] String processing optimization (can convert between `[u8]` and strings, native string concatenation, string logical comparison (`strcmp`)) ✅ 2023-08-01
- [x] Support for `0x` 16-bit numbers ✅ 2023-07-27
- [x] Adjust default behavior for `for` loop, with different defaults for map and list ✅ 2023-07-27
- [x] Syscall package ✅ 2023-08-01
- [x] OS package (postponed) ✅ 2023-08-01
- [x] Do not check for duplicate assignments of `err` generated by `try` ✅ 2023-07-27
- [x] Support `return void_expr()` ✅ 2023-07-29
- [x] Generic `cptr` type that can be converted to any type except float ✅ 2023-08-01
- [x] `var list = [] as [int,5]` to generate an array with a specified length without introducing other symbols or syntax concepts ✅ 2023-08-01
- [x] String escape, such as `\n` for newline output ✅ 2023-08-01

Please note that some of the tasks have been postponed to future versions. If you have any questions or need more information, please let me know.