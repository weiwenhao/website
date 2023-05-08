---
title: 变量
sidebar_position: 10
---

:::info
后续主要通过示例来进行讲解，其中 `v` 表示语法正确， `x` 表示语法不正确，但是请记住语法正确不代表推荐这么写。
:::

```nature
var foo = 1 // v 声明变量 foo 并赋值，foo 类型自动推导为 int

var foo = 1 // x 同一作用域下，不允许重复声明变量

if (true) {
	var foo = 2 // v 不同作用域下允许重复声明
}
```

不使用类型推导

```nature
int foo = 1 // v
float bar = 2.2 // v
string car = "hello world" // v

foo = 2 // v 变量允许重新定值
foo = "hello world" // x foo 已经定义为 int 类型变量，不允许使用字符串赋值
```

> 👉 [更多类型](type.md)

```nature
int foo // v 仅声明，不赋值，此时 bar 有默认值 0
float bar // v bar 有默认值 0.0
bool car // v car 有默认值 false
```

string 类型以及后面的 list/map/set 等复合类型如果采用仅声明方式时需要注意其默认值

```nature
string foo // v ❗️foo 此时的默认值为 null, 而不是空字符串 “”
string bar = "" // v 请使用这种方式声明一个空的字符串

[int] baz // v baz 此时的默认值为 null, 如果需要声明一个空 list
[int] baz = [] // v 声明空 list
```

仅声明变量时需要为变量声明确定的类型

```nature
var foo // x foo 此时的类型是不确定的
```

> 💡 上面代码段中多次出现的 `//` 双斜杠是 nature 中单行注释的方式，目前也仅支持这一种注释方式。