---
slug: third-version
title: 0.3.0-beta 发布啦！
authors: weiwenhao
---

想不到两个版本过去 nature 已经支持上了泛型和包管理，这比我预想的要快。nature 的基本语法大概都已经确定了，接下来应该不会再新增语法了，按照发行计划。接下来还会是两个 beta 版本，在这两个版本中我会优化 nature 的错误提示，代码着色功能。并学习 lsp 的开发，然后是一个小型的测试项目，项目的名字我大概会是 onepack，功能暂时保密。

[陈皓](https://coolshell.cn/haoel) 先生的去世让我对接下来的目标产生了新的想法，也让我停下来了一段时间去思考我接下来应该做什么。在这一段时间里，我把显卡安排上了，并且趁着 steam 夏促买了很多游戏，也趁着 618 入手了 switch 玩上了王国之泪，总算是把之前一直想玩的游戏都玩了起来。

最终思考的结果大概是，我没有能力去改变时代的洪流，以我的能力和性格甚至不足以让我拿到一张顺应洪流的船票。人生苦短，所以我要尽可能的做让我觉得快乐的事情。但是这不代表我会陷入到虚无和享乐主义中。我更加信奉的思想准则是王阳明先生的知行合一。写代码让我快乐，玩游戏同样让我快乐，那我便将这两种快乐结合起来。因此 nature 0~1+ 的标准库和实践项目都将主要像游戏引擎与游戏开发靠拢，并且一个有趣的想法已经在我脑海中孕育了，我会在合适的时间将其公布出来。

好像没有其他东西分享了，那我分享一下过去的三个版本中 nature 项目的 TODO LIST 来凑一下字数

## TODO LIST

这是我管理项目功能的主要方式，主要是基于 Obsidian 进行编辑

### 0.1.0-beta

- [x] compiler custom assingn, 支持 map/list/struct 的 assign 和 access ✅ 2023-03-27
- [x] 删掉 map 和 set 关键字 ✅ 2023-04-05
- [x] 指针声明语法 `p<type>` 支持 ✅ 2023-04-12
- [x] addr_of 和 value_of 语法支持，目前不开放前端支持，仅在 ast 维度支持即可 ✅ 2023-04-12
- [x] self 关键字与类型支持 ✅ 2023-04-12
- [x] infer type 重构 ✅ 2023-04-07
- [x] ast_select 进行拆解, analysis 阶段将 moduel.select 覆写成 module_name + select key 的全局符号唯一名称即可, infer 阶段类型明确后再拆解出 list.select, set.select, map.selct, 对 struct_access 重新定义为 instance.select, instance = new(struct) ✅ 2023-04-07
- [x] 删掉 TYPE_VOID (void 的表达性还不错,先保留吧) ✅ 2023-04-07
- [x] struct 类型推导与默认赋值语法支持,以及 self 初始化的问题 ✅ 2023-04-12
- [x] 支持定义 builtin.n 这样的声明文件，其包括的都是 global label，且没有 module name 做限定,且该类型的文件仅仅需要做编译器前端的 scanner/parser/analysis/infer 即可. ✅ 2023-04-05
- [x] infer 支持 list_push,list_length,map_length,set_add,set_contains,set_delete 这些特殊 struct access infer ✅ 2023-04-07
- [x] compiler 支持 ast_for_cond_stmt/ast_for_tradition_stmt/ast_for_iterator_stmt ✅ 2023-04-07
- [x] compiler 支持 ast_throw_stmt/ast_expr_catch ✅ 2023-04-09
- [x] compiler 支持 tuple_new/ast_set_new ✅ 2023-04-12
- [x] compiler 支持 struct call 和 special struct call(list.push) ✅ 2023-04-12
- [x] compiler 支持 tuple_destr ✅ 2023-04-12
- [x] compiler 支持 list/map/set select (在 infer 简短做了差异抹平) ✅ 2023-04-12
- [x] set() or set(1, 2, 3) builtin runtime 调用以及语法上的支持(parser 阶段将 set 转换成了 set_new, 磨平了了这种差异) ✅ 2023-04-12
- [x] fn env 语法重构，通过 fn->name 关联 (暂时不接入了), 一级 runtime call 编写 ✅ 2023-04-12
- [x] 作用域问题优化,在 module 中定义的 ident 的顺序将类似 struct 中的 property 一样不影响当前 module 中 vardef/typedef/fndef 的使用. (analysis 中已经进行了符号提前注册,最后再对右值进行 analysis) ✅ 2023-04-06
- [x] 尝试将 type_decl, var_decl,typedef,fn_decl 等等名称做统一化处理 ✅ 2023-04-12
- [x] 基础数学运算符支持，现在只有加法可以使用, + - \* / % ✅ 2023-04-12
- [x] 基础类型完善，包括 u8/u16/u32/u64 i8/i16/i32/i64 f32/f64 等 ✅ 2023-04-13
- [x] += -= \*= 运算符(基于 parser 完善, parser 做个改写就行) ✅ 2023-04-13
- [x] 逻辑运算符完善 ✅ 2023-04-14
- [x] 隐式类型转换完善(包括 any a = 12 也要支持一下), 需要 runtime 中需要支持 ✅ 2023-04-14
- [x] 完善 assemply opcode ✅ 2023-04-29
- [x] 增加简单的 gc 触发流程 ✅ 2023-05-03
- [x] analysis -> analyser ✅ 2023-04-14
- [x] cross 编译部分的代码优化 ✅ 2023-04-14
- [x] 由于一些类型名称经常改,所以统一对所有遍历的名字做一次优化,优先使用单字,或者单词. ✅ 2023-04-14
- [x] import 语法最终完善 ✅ 2023-04-14
- [x] 完善测试模块，覆盖基础情况下是所有语法。归纳到更小的模块，方便记忆 ✅ 2023-04-23
- [x] 打包工具编写(优先使用 cpack 构建)，支持打包到 macos 和 linux 平台，编译目标平台目前只支持 amd64 ✅ 2023-04-15
- [x] int a 类似这样形式的变量定义进行简单初始化(if size == 8, move 0 -> var, 否则进行系统调用清理) ✅ 2023-04-23
- [x] 逃逸问题处理,如果 fn env 引用了变量，则被引用的一方推出时，应该将自身被应用到变量移动到堆中，并更新 env ✅ 2023-04-24
- [x] README.md 编写 ✅ 2023-04-23
- [x] 测试 - 类型系统与数值的隐式类型转换 ✅ 2023-04-29
- [x] 测试 - 闭包测试(包括逃逸问题处理) ✅ 2023-04-26
- [x] 将 custom link 像 module .o 一样分配到一个专门到 object 文件中，然后再通过 load 进行加载。 ✅ 2023-04-29
- [x] 测试 - import base module ✅ 2023-05-03
- [x] memove 优化，目前数据的大小都是小于 8 个字节的，所以没必要走 call memory_move (0.1 版本暂时做) ✅ 2023-04-29
- [x] 还是需要提供 docker 镜像，毕竟目前只支持 linux/amd64 那 docker 就是最好的选择 ✅ 2023-05-11
- [x] lower 代码优化 ✅ 2023-04-29
- [x] infer 时如果 shift code 到 right 只要是 number 就行，不需要做类型转换 ✅ 2023-04-29
- [x] 位运算支持 ✅ 2023-04-29
- [x] set() built in call ✅ 2023-05-04
- [x] 大内存申请测试 ✅ 2023-05-04
- [x] 自动 gc 算法编写 ✅ 2023-05-03
- [x] 测试嵌套形式的 ssa ✅ 2023-05-03

#### 可选功能

- [ ] nature 0.1 问题汇总#23. 高级 fn 设计，如 fn to_string, fn private，fn hook 等
- [ ] 借助测试的 input 函数，写一个小项目，做一个全面的语法测试
- [ ] break 和 continue 语法支持
- [x] Dockerfile 构建 ✅ 2023-05-11
- [ ] opcode 匹配优化成列匹配 + 权重排序的方式
- [ ] import "syscall" 模块支持，需要借助 builtin 的支持。
- [ ] fn sum(int a, int b):int = a + b 需要支持这样的语法么？在 vm 中不写类型则有 fn sum(a, b) = a + b
- [x] int literal 支持自动隐式类型转换？按位宽？还是和 c 一样可以随意转换？鉴于现在没有强制类型转换功能,比如 u8(12) 由于 u8 是类型，所以这种方式无法区分是类型转换还是函数调用？除非只支持 basic 类型的自动转换。 12.(type)，这是 golang 中的类型推断，用来做类型转换语法也不是不可以？ (int)12 这是 c 语言中的方式，总感觉发明了一个可有可无的语法。。， 所以先允许自由转换。 也许只有基础类型需要进行类型转换呢。。 ✅ 2023-04-29
- [ ] 2 进制与 16 进制数值支持 0b1011011 和 0x1F2D
- [ ] string + string 运算支持
- [x] 除法的两侧默认转换成浮点数进行计算？对于这种默认的行为，如果真的需要整形就比较难声明 ✅ 2023-04-28

#### 文档

- [x] 确认主色调 [[nature ui 设计]] ✅ 2023-05-11
- [x] logo 设计 ✅ 2023-05-11
- [x] github readme 编写 ✅ 2023-04-20
- [x] 选定文档工具，目前可选的有 ✅ 2023-05-11
      https://github.com/facebook/docusaurus 纯 markdown
      https://www.gitbook.com/ 类似 notion
      https://vercel.com/ 还没看明白是啥
      https://github.com/shuding/nextra
- [x] 文档编写 ✅ 2023-05-11

---

### 0.2.0-beta

- [x] continue/break 语法支持 ✅ 2023-06-07
- [x] as 强制类型转换与 is 类型推断语法支持 ✅ 2023-06-12
- [x] infer assign 中进行 type_compare 时应该兼容 any 赋值给 any， union 赋值给 any 等，union 小范围可以赋值给大范围。 ✅ 2023-06-09
- [x] infer call 就需要考虑重载问题 ✅ 2023-06-11
- [x] var decl 这样的仅声明不赋值的形式是否还要支持？先严格要求必须主动赋值，然后在逐步开放允许默认值的情况。(已经在 infer 阶段添加了严格限制) ✅ 2023-06-12
- [x] null 类型与值支持 ✅ 2023-06-12
- [x] boom 语法支持,(暂时无法支持，需要在运行时才能判断出来具体哪些是零值需要初始化) ✅ 2023-06-11
- [x] 联合类型支持 ✅ 2023-06-11
- [x] 类型参数支持 ✅ 2023-06-08
- [x] infer 阶段对类型参数支持 ✅ 2023-06-07
- [x] 泛型函数支持 gen ✅ 2023-06-08
- [x] let xxx as t stmt supportc ✅ 2023-06-13
- [x] if () 或者 for () 这里的括号不是必须的，能省略的话可以减少一定的输入负担。 ✅ 2023-06-05
- [x] compiler zero struct 时通过标记的形式判断值是否进行过初始化，只有没有初始化的值才需要添加默认的 zero 值 (太麻烦了，下个版本再做) ✅ 2023-06-19
- [x] builtin length -> len ✅ 2023-06-07
- [x] 隐式类型转换功能与重载功能冲突了，需要进一步限定隐式类型转换的使用范围或者在当前版本暂时关闭隐式类型转换。这样能够有更多的思考时间。严格的限制更利于后续的发展。后续一定会以一种更加合理的方式支持隐式类型转换。暂时关闭所有的隐式类型转换。 ✅ 2023-06-19
- [x] type alis 支持模块化 select, 比如 foo.bar a = 12 ✅ 2023-06-13
- [x] readme 完善，最大程度展示编码特点 ✅ 2023-07-07
- [x] 使用更简短的 try 来代替 catch ✅ 2023-06-15

#### 可选功能

- [ ] 字面量 int 0b 和 0x 支持
- [ ] 包管理
- [x] 单引号字符串支持，其更加简洁且方便阅读。如 `map['key']` vs `map["key"]` ✅ 2023-06-19
- [ ] 字符串链接语法支持
- [ ] 重载功能导致了同名函数的存在，如果跨平台模块也集成进来则会导致更加多的同名的函数，建议和 golang 一样通过文件名称区分跨平台编译。
- [x] 可变参数优化， `fn println(...[any] args) {}` 优化成 `fn println(...any args)` ? ts 中是前者 ✅ 2023-06-19

#### 文档优化

1. 增加研发计划栏目
2. 完善贡献指南

---

### 0.3.0-beta

- [x] 包管理 ✅ 2023-07-27
- [x] sub module (延后) ✅ 2023-07-27
- [x] 字符串处理优化 (可以和 `[u8]` 互相做类型转换, 字符串原生连接, 字符串逻辑判断(strcmp)) ✅ 2023-08-01
- [x] 支持 0x 16 进制 number ✅ 2023-07-27
- [x] for 默认值调整, 再 map 和 list 下的默认行为将会有所区别 ✅ 2023-07-27
- [x] syscall package ✅ 2023-08-01
- [x] os package (延后) ✅ 2023-08-01
- [x] try 产生的 err 不进行重复赋值检测? ✅ 2023-07-27
- [x] 支持 return void_expr() ✅ 2023-07-29
- [x] 通用的 cptr 类型，可以被除了 float 以外的任意类型转换过去 ✅ 2023-08-01
- [x] `var list = [] as [int,5]` 在不引入其他符号和语法概念的情况下生成一个指定 length 的数组 ✅ 2023-08-01
- [x] 字符串转义， 如 `\n` 输出换行操作 ✅ 2023-08-01
