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
string car = 'hello world' // v 字符串使用单引号包裹

foo = 2 // v 变量允许重新定值
foo = 'hello world' // x foo 已经定义为 int 类型变量，不允许使用字符串赋值

i8 f2 = 12 // v 字面量能够根据类型进行自动转换
i16 f3 // x 变量声明必须赋值
```

> 👉 [更多类型](type.md)

复合类型 string/list/map/set 同样需要再声明时赋默认值

```nature
string bar = '' // v 请使用这种方式声明一个空的字符串
[int] baz = [] // v 声明空 list

bar = null // x 不允许将 null 赋值给各种类型
```

如何赋值为 null?

```
string|null bar = null // v 使用联合类型声明，让 bar 的值允许为 null
bar = '' // v 后续章节中会深入学习联合类型
```


> 💡 上面代码段中多次出现的 `//` 双斜杠是 nature 中单行注释的方式，目前也仅支持这一种注释方式。
