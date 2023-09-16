---
slug: third-version
title: 0.3.0-beta is Released!
authors: WEIWENHAO
---

I never thought that in just two versions, nature would already support generics and package management, which is faster than I expected. The basic syntax of nature has largely been confirmed, and according to the release plan, no new syntax will be added. The next two versions will be beta versions. In these two versions, I will optimize nature's error prompts and code coloring functions. I will also learn about LSP development. Following that, there will be a small test project, tentatively named "onepack," the functionality of which is confidential for now.

Mr. [Chen Hao](https://coolshell.cn/haoel)'s passing has made me rethink my upcoming goals and led me to pause for a moment to contemplate what I should do next. During this time, I set up my graphics card and took advantage of Steam's summer sale to purchase many games. I also grabbed a Switch during the 618 sale to play Tears of the Kingdom, finally playing the games I've always wanted to play.

The conclusion I reached is that I don't have the ability to change the tide of the times. With my ability and personality, I may not even be able to get a ticket to ride with the tide. Life is short, so I want to do things that make me happy. However, this doesn't mean I will sink into nihilism or hedonism. The philosophical principle that I believe in more is Wang Yangming's "Unity of Knowledge and Action." Writing code makes me happy, and so does playing games, so I will combine these two sources of joy. As a result, nature's 0~1+ standard library and practical projects will mainly lean towards game engine and game development, and an interesting idea is already brewing in my mind, which I will announce at the right time.

Lastly, I would like to share the TODO LIST for the past three versions of the nature project.

## TODO LIST

This is the main way I manage project features, primarily edited in Obsidian.

Certainly! Here's your TODO List translated into English, while keeping the original format intact:

## TODO LIST

This is the main way I manage project features, primarily edited in Obsidian.

### 0.1.0-beta

- [x] Custom compiler assignment, supports map/list/struct assignment and access ✅ 2023-03-27
- [x] Removed map and set keywords ✅ 2023-04-05
- [x] Support for pointer declaration syntax `p<type>` ✅ 2023-04-12
- [x] Support for addr_of and value_of syntax, frontend support is currently not open, just support at the ast level ✅ 2023-04-12
- [x] Support for the self keyword and type ✅ 2023-04-12
- [x] Infer type refactor ✅ 2023-04-07
- [x] Decompose ast_select, rewrite `moduel.select` to unique global symbol names in the analysis phase, infer phase to decompose into list.select, set.select, map.select, redefine struct_access as instance.select, instance = new(struct) ✅ 2023-04-07
- [x] Removed TYPE_VOID (void expression is quite good, keep it for now) ✅ 2023-04-07
- [x] Support for struct type inference and default assignment syntax, as well as the problem of self initialization ✅ 2023-04-12
- [x] Support for defining `builtin.n` type declaration files that include global labels without module name limitations, and only need frontend scanner/parser/analysis/infer ✅ 2023-04-05
- [x] Infer support for special struct access like list_push, list_length, map_length, set_add, set_contains, set_delete ✅ 2023-04-07
- [x] Compiler support for ast_for_cond_stmt/ast_for_tradition_stmt/ast_for_iterator_stmt ✅ 2023-04-07
- [x] Compiler support for ast_throw_stmt/ast_expr_catch ✅ 2023-04-09
- [x] Compiler support for tuple_new/ast_set_new ✅ 2023-04-12
- [x] Compiler support for struct call and special struct call (list.push) ✅ 2023-04-12
- [x] Compiler support for tuple_destr ✅ 2023-04-12
- [x] Compiler support for list/map/set select (differences are flattened in infer) ✅ 2023-04-12
- [x] Support for set() or set(1, 2, 3) builtin runtime call and syntax support (parser stage converts set to set_new, leveling the difference) ✅ 2023-04-12
- [x] Syntax refactor for fn env, linked through fn->name (not currently connected), primary runtime call writing ✅ 2023-04-12
- [x] Scope issue optimization, the order of ident defined in the module will not affect the use of vardef/typedef/fndef in the current module (symbols are pre-registered in analysis, final right-hand value analysis is done later) ✅ 2023-04-06
- [x] Attempt to unify names like type_decl, var_decl, typedef, fn_decl etc. ✅ 2023-04-12
- [x] Basic mathematical operator support, currently only addition is available, + - * / % ✅ 2023-04-12
- [x] Basic type improvements, including u8/u16/u32/u64 i8/i16/i32/i64 f32/f64 etc ✅ 2023-04-13
- [x] += -= *= operators (based on parser improvement, just need to rewrite in parser) ✅ 2023-04-13
- [x] Logical operator improvements ✅ 2023-04-14
- [x] Implicit type conversion improvements (including support for any a = 12), requires support in runtime ✅ 2023-04-14
- [x] Improve assembly opcode ✅ 2023-04-29
- [x] Add simple gc triggering process ✅ 2023-05-03
- [x] Analysis -> analyser ✅ 2023-04-14
- [x] Code optimization for cross-compilation ✅ 2023-04-14
- [x] Name optimization due to frequent type name changes, prefer using single letters or words ✅ 2023-04-14
- [x] Final improvements to import syntax ✅ 2023-04-14
- [x] Test module improvements, cover all syntax under basic conditions. Condense into smaller modules for easier memory ✅ 2023-04-23
- [x] Packaging tool writing (preferably using cpack), support for packaging to macOS and Linux platforms, compilation target currently only supports amd64 ✅ 2023-04-15
- [x] Simple initialization for variable definitions like int a (if size == 8, move 0 -> var, otherwise system call to clear) ✅ 2023-04-23
- [x] Handle escape issues, if fn env references a variable, when the referenced party exits, it should move the referenced variable to the heap and update the env ✅ 2023-04-24
- [x] README.md writing ✅ 2023-04-23
- [x] Test - Type system and numerical implicit type conversion ✅ 2023-04-29
- [x] Test - Closure tests (including escape issue handling) ✅ 2023-04-26
- [x] Move custom link like a module .o to a specialized object file and then load it through load ✅ 2023-04-29
- [x] Test - Import base module ✅ 2023-05-03
- [x] Optimize memove, currently data size is always less than 8 bytes, so there is no need to make a call to memory_move (for version 0.1) ✅ 2023-04-29
- [x] Need to provide Docker image, after all, currently only supports linux/amd64 so Docker is the best choice ✅ 2023-05-11
- [x] Code optimization for lower ✅ 2023-04-29
- [x] During infer, if shift code to right, it's fine as long as it's a number, no need for type conversion ✅ 2023-04-29
- [x] Bitwise operation support ✅ 2023-04-29
- [x] Support for set() built-in call ✅ 2023-05-04
- [x] Test for large memory allocation ✅ 2023-05-04
- [x] Writing of automatic gc algorithm ✅ 2023-05-03
- [x] Test nested forms of ssa ✅ 2023-05-03

#### Optional Features

- [ ] Summary of issues for nature 0.1 #23. Advanced `fn` design, such as `fn to_string`, `fn private`, `fn hook`, etc.
- [ ] Using the test's `input` function, write a small project to conduct a comprehensive syntax test.
- [ ] Support for `break` and `continue` syntax.
- [x] Dockerfile build ✅ 2023-05-11
- [ ] Optimize opcode matching into column matching + weighted sorting.
- [ ] Support for importing the "syscall" module, which requires the support of `builtin`.
- [ ] Should the syntax `fn sum(int a, int b):int = a + b` be supported? In the VM, if the types are not specified, then you have `fn sum(a, b) = a + b`.
- [x] Automatic implicit type conversion support for `int literal`? By bit-width? Or as freely convertible as in C? Given that there is currently no type casting feature, such as `u8(12)`, since `u8` is a type, this method cannot distinguish whether it's type conversion or function calling. Should we only support automatic conversion for basic types? `12.(type)` is Go's way of type inference and could also be used for type conversion. `(int)12` is the way in C, but it seems like an optional syntax... So, for now, allow free conversion. Maybe only basic types need to be type-converted? ✅ 2023-04-29
- [ ] Support for binary and hexadecimal numbers, like `0b1011011` and `0x1F2D`.
- [ ] Support for `string + string` operations.
- [x] By default, convert both sides of the division to floating-point numbers for calculation? For such default behavior, if you really need integers, it's hard to declare ✅ 2023-04-28


#### Documentation

- [x] Confirm primary color scheme [[nature ui design]] ✅ 2023-05-11
- [x] Logo design ✅ 2023-05-11
- [x] GitHub README writing ✅ 2023-04-20
- [x] Select documentation tool, current options are ✅ 2023-05-11
      https://github.com/facebook/docusaurus Pure markdown
      https://www.gitbook.com/ Similar to Notion
      https://vercel.com/ Not yet clear what it is
      https://github.com/shuding/nextra
- [x] Documentation writing ✅ 2023-05-11

---

### 0.2.0-beta

- [x] Support for continue/break syntax ✅ 2023-06-07
- [x] Support for 'as' type casting and 'is' type inference syntax ✅ 2023-06-12
- [x] In 'infer assign', compatibility for 'any' assigned to 'any', 'union' assigned to 'any', etc., and smaller union scopes can be assigned to larger ones ✅ 2023-06-09
- [x] 'Infer call' needs to consider overloading ✅ 2023-06-11
- [x] Should 'var decl' forms that only declare without assignment still be supported? Strict requirements for active assignment are first imposed, then gradually open to allowing default values. (Strict restrictions have already been added in the infer stage) ✅ 2023-06-12
- [x] Support for null type and value ✅ 2023-06-12
- [x] Support for 'boom' syntax (temporarily unfeasible, runtime determination required) ✅ 2023-06-11
- [x] Support for union types ✅ 2023-06-11
- [x] Support for type parameters ✅ 2023-06-08
- [x] 'Infer' stage support for type parameters ✅ 2023-06-07
- [x] Support for generic functions 'gen' ✅ 2023-06-08
- [x] Support for 'let xxx as t stmt' ✅ 2023-06-13
- [x] Parentheses in 'if()' or 'for()' are not mandatory, omitting them can reduce some input burden ✅ 2023-06-05
- [x] When the compiler zeros a struct, use tags to determine if the value has been initialized. Only uninitialized values need to be given a default zero value (Too complicated, to be done in the next version) ✅ 2023-06-19
- [x] Builtin 'length' -> 'len' ✅ 2023-06-07
- [x] Implicit type conversion feature conflicts with overloading, needs further limitation or temporary deactivation in the current version. Stricter limitations are more conducive to future development. Implicit type conversions will definitely be supported in a more reasonable way in the future. Temporarily disable all implicit type conversions ✅ 2023-06-19
- [x] Support for modularized 'type alis' select, e.g., 'foo.bar a = 12' ✅ 2023-06-13
- [x] Enhance README to showcase coding features at the maximum extent ✅ 2023-07-07
- [x] Use a shorter 'try' to replace 'catch' ✅ 2023-06-15


#### Optional Features

- [ ] Support for `int` literals with `0b` and `0x`.
- [ ] Package management.
- [x] Support for single-quoted strings for brevity and readability. For example, `map['key']` vs `map["key"]` ✅ 2023-06-19.
- [ ] Support for string concatenation syntax.
- [ ] Overloading leads to the existence of functions with the same name. If cross-platform modules are also integrated, it will lead to more functions with the same name. Suggest distinguishing cross-platform compilation through file names, similar to Golang.
- [x] Optimization for variadic parameters, `fn println(...[any] args) {}` optimized to `fn println(...any args)`? In TypeScript, it is the former ✅ 2023-06-19.

#### Documentation Improvements

1. Add a Research & Development plan section.
2. Improve the contribution guide.

---

### 0.3.0-beta

- [x] Package management ✅ 2023-07-27.
- [x] Sub-module (postponed) ✅ 2023-07-27.
- [x] String handling optimization (can be type-cast to and from `[u8]`, native string concatenation, string logic judgment via `strcmp`) ✅ 2023-08-01.
- [x] Support for `0x` hexadecimal numbers ✅ 2023-07-27.
- [x] Adjustment for default values in `for`, different default behaviors under `map` and `list` ✅ 2023-07-27.
- [x] Syscall package ✅ 2023-08-01.
- [x] OS package (postponed) ✅ 2023-08-01.
- [x] No duplicate assignment check for `err` generated by `try`? ✅ 2023-07-27.
- [x] Support for `return void_expr()` ✅ 2023-07-29.
- [x] General `cptr` type, can be converted from any type except `float` ✅ 2023-08-01.
- [x] `var list = [] as [int, 5]` to generate an array with a specified length without introducing other symbols and syntactic concepts ✅ 2023-08-01.
- [x] Support for string escape characters, like `\n` for new line ✅ 2023-08-01.
