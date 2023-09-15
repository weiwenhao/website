---
title: Hello World
sidebar_position: 30
---

## 第一个程序

:::tip
以下代码编译与执行都在 linux 设备上完成，如果你没有 linux 设备，可以使用 docker 进行尝试。
:::

首先编写一个 nature 源码文件，总是以 .n 结尾，名称随意。这里我们就叫 main.n， 创建文件并写入以下内容

```nature title="main.n"
print('hello world')
```

编译

```shell
> nature build main.n
```

现在能够在目录下看到一个可执行文件 main, main 是默认名称，可以使用 -o 参数调整输出的可执行文件的名称，如 `nature build -o hello main.n`

运行

```shell
> ./main
hello world
```

🎉 这是属于你的里程碑

## 复杂一点

以首页展示的 fib 数列求值示例，首先创建一个 fib.n 文件并写入以下内容

```nature title='fib.n'
import fmt

fn fib(int n):int {
    if n <= 1 {
        return n
    }
    return fib(n - 1) + fib(n - 2)
}

var result = fib(30)
fmt.printf('fib result is %d', result)
```

编译并执行

```shell
> nature build fib.n && ./main
fib result is 832040
```

在上面的示例中，首先通过 import 将 fmt package 引入了进来，这是一个对字符串格式化并输出的库。 接着我们**通过 `fn` 关键字声明了一个函数**，函数名称为 fib，该函数的主要功能是计算斐波那契数列第 n 位的值。

由于是强类型语言，所以需要声明参数的类型以及返回值的类型。函数内部的 `if` 关键字是控制流语句，其判断条件表达式是否为 true， 并通过 `return` 关键字返回参数变量 n 的值。`fib(n - 1)` 是对 fib 函数的调用，这是一种比较复杂的在函数内部自己调用自己的方式，称为递归调用。

在函数的外部再次通过 `fib(30)` 调用该函数，通并将其结果赋值给 result 变量，如果你写过 c 语言，那么此时 result 同样需要声明类型，但是在 nature 中可以通过 **var 关键字进行自动类型推导**。

最后通过 fmt 关键字我们可以调用其中的 printf 方法对字符串进行格式化并输出，%d 标识将 result 格式化成 int 类型。

## 总结

👍 通过上面的两个示例，已经展现了 nature 的大部分语法了，到这里其实你已经入门 nature 了，后续章节主要是介绍一些语法的细节。
