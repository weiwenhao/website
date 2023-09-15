---
title: 发行说明
sidebar_position: 10
---

nature 版本号遵循[语义化版本](https://semver.org/)，️其中 0.1 ~ 1.0 包含上下两个部分

上半部分总是携带 beta 标识，表示生产不可用。

下半部分则具有稳定且向下兼容的语法 api，此时 nature 可以用于个人的独立/开源项目，但不提供 LTS 版本。

1.0 版本发布时，nature 将正式用于开源/商业项目使用，且具有 LTS 版本。

| 版本号      | 内容                      | 预计发布时间 |
| ----------- | ------------------------- | ------------ |
| v0.1.0-beta | 基础语法版本发布          | 2023-05      |
| v0.2.0-beta | 类型系统/基础语法完善     | 2023-07      |
| v0.3.0-beta | 包管理/基础语法完善       | 2023-09      |
| v0.4.0-beta | 基础标准库/基础语法完善   | 2023-11      |
| v0.5.0-beta | 小型测试用例/ bug 修复    | 2024-02      |
| v0.6.0-beta | lsp 开发与编辑器支持      | 2024-04      |
| v0.7.0      | 中型测试用例/稳定语法 api | 2024-07      |
| v0.8.0+     | 正式版本发布相关准备工作  | 2024-09      |
| v1.0.0      | 正式版本发布              | 2025-        |

当前还在规划的核心功能，将会在后续的版本中逐步集成。

- switch/try 等关键语法集成及优化
- wasm 架构编译
- 协程功能支持
- darwin 系统编译
- 函数标签功能支持
- 渐进式 GC 完善
- riscv 架构编译
- windows 系统编译

### 更新日志

历史记录: https://github.com/nature-lang/nature/releases

当前版本: v0.4.0-beta

发布时间: 2023-09

新增

1. 编译时错误优化，显示文件名和行号，类型错误显示类型原始标识
2. 运行时 error 提供堆栈追踪
2. 多行注释 `/****/` 支持
3. import 支持不带前缀的导入方式 `import utils as *`
4. 小型测试用例 [parker](https://github.com/weiwenhao/parker)
5. 参数解构功能支持，示例 `call(...vec)`
6. 泛型类型支持递归 `type numbert = gen intergert|flotert`
7. 二元运算符 `||` `&&` 支持
8. 包管理 import dir 支持, 此时会自动查找 dir 下的 main.n
9. 包管理 import xxx_temp 支持，能够定义 temp 文件与静态库进行交互
10. nature struct 调整为与 C 语言同构，能够直接将 nature struct 传递给 c 语言
12. 数据类型 `arr<T,len>` 支持，其在 stack 中进行分配，和 C 语言中 `T ident[len]` 同构
13. new 语法支持，nature struct 默认为 stack 分配，可以通过 `ptr<person> p = new person` 得到一个 heap 分配的 p
14. as 后的类型支持约束，如 `var s = {} as {u8}` 声明了一个 set 类型将会被约束为 `{u8}` 类型，等同于 `{u8} s = {}`
15. 包管理支持声明 links 静态库链接 和 temps 模板声明
16. 新增标准库字符串库 `import strings`
17. 为了更好的和 C 语言进行交互，新增类型 `cptr` 和 `cptr<T>`
18. 增加内置语法关键字 sizeof 用来计算类型的 size，使用示例 `int s = sizeof(person)`
19. 新增标准库 fmt/os/path/strings/time
20. 新增模板文件(用于和 C 语言交互) builtin_temp(默认 import)，dirent_temp, libc_temp, strings_temp, syscall_temp

调整

1. type param 只能在全局进行定义
2. 全局变量支持类型推导
3. 删除 set 函数，通过 as 约束声明一个空的 set
4. list 类型定义调整为 vec, 支持使用 vec 原始结构体声明并指定长度，示例 `var terms = vec<u8>{len=12,cap=24}`
5. string 类型调整为与 vec 同构，支持通过 `str[0]` 的方式访问以及赋值，并支持 for in 遍历
6. vec 类型方法 list.len() 调整为类型属性，list.len, 并支持类型方法 slice/concat 等类型函数
7. for 迭代表达式错误与 break 和 continue 无法重复声明错误
8. 泛型 type i = gen int|int64 基本类型一致时重复生成
9. 寄存器分配时  interval_add_range 添加 range 错误
10. set.contains() 计算 hash slot 错误
11. struct 中定义 fn 异常
12. 链接器 elf rela addend 计算异常，addend = next_inst_offset - current_inst_rel offset
13. ssa rename 异常，部分线性 var def 未进行 rename
14. if 多行表达式 parser 解析异常
15. 自动 GC 触发时间异常，调整 GC 触发时间点为 user mode
16. malloc 分配重复的内存区域时，由于没有清空该区域导致 GC 异常，malloc 分配区域主动进行清空处理
17. import 优先级异常，local ident 可以覆盖 import ident
18. 修复 gcc11 下全局变量重复定义错误 #16



