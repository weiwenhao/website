---
title: 控制流
sidebar_position: 20
---

## if 表达式
示例
```nature
int foo = 23
if (foo > 100) {
    print("foo > 100")
} else if (foo > 20) {
    print("foo > 20")
} else {
    print("else handle")
}
```

if 是比较常见的语法，else if 中间需要用空格隔开。`if (expr)`  expr 部分为 bool 类型的表达式，但是 nature 目前支持隐式类型转换，所以传入非 bool 类型的表达式会自动转换为 bool 类型，下一章将会介绍类型转换。

> print/println 是内置函数，支持对 string/bool/number 类型数据进行打印，多个参数使用逗号分隔，无格式化功能，主要用来调试。

## for 表达式

### 经典循环
```nature
var sum = 0
for (int i = 1; i <= 100; i += 1) {
	sum += i
}
println("1 +..+100 = ", sum)
```

编译并输出后可以得到以下结果
```shell
> nature build main.n && ./main
1 +..+100 = 5050
```

> ❗️nature 中没有 ++ 语法，请使用 i += 1 代替 i++

### 条件循环

依旧使用 1+..100 做一个类比
```nature
var sum = 0
var i = 0
for (i <= 100) {
	sum += i
	i += 1
}

println("1 +..+100 = ", sum)
```

编译正确的话，会得到和经典循环一样的输出结果

> 💡  其实就是 c 语言中的 while 表达式，nature 将其集成在了 for 关键字中


### 迭代循环
先来看看相关语法
```nature
var list = [1, 1, 2, 3, 5, 8, 13, 21]

for (k,v in list) {
	println(k, " ", v)
}

// 省略 value
for (k in list) {
	println(k)
}
```

迭代用于对 list 和 map 结构的遍历，目前也只支持这两种结构。语法上引入了新的关键字 `in`。需要注意的是 k,v， 这里其实是变量定义的语法糖。完整的概念上的语法应该是 `for (var (k,v) in list)` 这太复杂了，所以在做语法解析时省略掉了 `var ()`，`var (expr)`这种形式的声明在后面的 tuple 中会详细说明。

这就需要注意，k 和 v 是变量的定义，定义的作用域是在循环的内部。所以类似

```nature
var k = 1 
for (k,v in list) { 
    // ...
} 
```

这里的 k 和 v 是新的变量定义，但是作用域是在循环内部中，所以不会与 var k = 1 冲突。

### 循环中断

👷 施工中... 

> 准备收工才想起来忘记开发这个语法了 😮‍💨