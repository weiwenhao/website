---
title: 函数
sidebar_position: 40
---

## 基础使用

**函数**用来封装可复用的功能。如果没有函数，一段特定的操作过程用几次就要重复写几次，而使用函数则只需写下函数名和一些简短的信息。

函数通常由函数名称、输入参数、输出参数和函数体组成，广义上就是一台接受输入并经过计算后返回计算结果的机器。

下面是 nature 中的函数声明语句中定义的语法，以基础的求和函数为例

```nature
// 定义
fn sum(int a, int b):int {
	return a + b
}

// 调用
var s = sum(1, 2)
```

函数的名称是 sum，接受两个 int 类型的形式参数 a 和 b 并返回一个 int 类型，多个形式参数之间使用逗号分隔。 在函数声明中的输入参数和返回值参数的类型不可省略，也不可以使用类型推断关键字 var。

总结一下语法 `fn ident(T ident [, T ident...])[:T]` 函数的返回值类型声明在括号右侧，使用冒号隔开。仅支持单返回值，仅需要填写类型。

:::info
`return expr` 退出函数的执行，并将 expr 作为返回计算的结果。
:::

`sum(1, 2)` 是函数的调用语法，sum 为函数名称，1 和 2 称为实际参数，多个实际参数之间使用逗号分隔。

函数也可以作为表达式赋值给变量，调用方式与直接定义函数一样。

```nature
var f = fn(int a, int b): int {
	return a + b
}


var s = f(1, 2)
```

> 💡 **当函数作为表达式时，推荐省略函数的原本的名称，也就是所谓的匿名函数声明**。这样可以避免混乱的名称。

## 可变参数

示例

```nature
fn sum(...[int] list):int {
	var result = 0
	for (k in list) { // 迭代语法
		result += list[k] // list 类型通过 list[index] 的方式访问其中的值
	}
	return result
}

println(result(1, 2, 3, 4, 5))
```

输出如下

```shell
> ./main
15
```

`...` 语法(rest) 只允许在函数的最后一个参数中以 list 的方式收集调用者传递的参数，调用者传递的参数的类型需要与 `...[T]` 中的 T 的类型匹配，或者能够隐式类型转换。

> 💡 `...` 语法还有基于表达式的展开 (spread) 操作，后续会逐步开放出来。

## 多返回值？

上面说函数只支持单个返回值，但是可以基于 tuple 解构赋值实现近似多返回值的效果，用法如下

```nature
fn buy(int amount):(string, int) {
	amount -= 10
	return ('apple', amount)
}

var (balance, product) = buy(100)

println(balance, ' ', product)
```

示例中函数返回值通过 `(string, int)` 声明了一个 tuple 类型。 `return ("apple", amount)` 则是创建了一个 tuple 实例返回，这并不违反单返回值的情况。

`var (balance, product)` 这就是一种新的语法形式，称为 tuple 解构赋值。这是为了能够模拟函数多返回值而开发的一种语法，在解构赋值中必须使用 var 进行自动多类型推导，而不能通过类型类型，因为这很容易造成误导，且无法不美观，所以语法上禁止了这种情况。

后续的[数据结构](docs/digging-deeper/data-structure.md)部分将会更加详细的说明 tuple 的使用方法。
