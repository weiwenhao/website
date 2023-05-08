---
title: 错误处理
sidebar_position: 20
---

在编程语言中，错误处理是一个广泛且复杂的概念，需要考虑处理和无法处理的错误、预期和非预期的错误等等。

在 nature 语言中，我们采用 throw 和 catch 关键字以及 tuple 语法来处理错误。使用 throw 关键字可以抛出错误，使得函数立即退出，并将错误信息传递到调用链上游。

```nature
fn rem(int dividend, int divisor):int {
	if (divisor == 0) {
		throw "divisor cannot zero"
	}

	return dividend % divisor
}

// v 由于第二个参数为 0，会导致除数为 0，从而抛出异常。因为我们没有捕获该异常，它会继续向上传递，直到遇到 catch 块或程序退出。
// 因此，后面的语句 println("hello world") 不会被执行。
var result = rem(10, 0)
println("hello world")
```

通过输出我们发现，error 一直像上传递直到 runtime，runtime 拦截了这个错误并 dump 出来。`println("hello world")` 也和预期一样没有执行。

```shell
> ./main
runtime catch error: divisor cannot zero
```

我们再来看看使用 catch 关键字主动拦截错误的情况

```nature
fn rem(int dividend, int divisor):int {
	if (divisor == 0) {
		throw "divisor cannot zero"
	}

	return dividend % divisor
}

// v 对可能出现的错误使用 catch 关键字进行拦截
// 当不存在错误时 err == null，在 if 判断中, null 会进行隐式类型转换为 false
// 同时利用了 tuple 解构快速赋值来将 catch 的返回结果进行解构
var (result, err) = catch rem(10, 0)
if (err) {
	// error handle， errort 结构中包含 msg 字段存储了错误的信息
	println(err.msg)
} else {
	println(result)
}

// v 不存在异常的情况下使用 catch 拦截
// 上面已经定义好了 result 和 err 变量，这里就不需要重复定义了，直接赋值即可
(result, err) = catch rem(10, 3)
if (err) {
	println(err.msg)
} else {
	println(result)
}
```

输出看看

```shell
> ./main
divisor cannot zero
1
```

catch 关键字只能用于函数调用的前面，其读取本次函数调用是否 throw 了 error。

**当原函数包含返回值时，catch 将创建一个拥有两个元素的 tuple，第一个元素是函数原来的返回值，第二个元素则是 errort 类型的错误数据。 当原函数没有返回值时，catch 直接返回一个 errort 类型的数据。**

:::info
当函数没有返回值时，由于 nature 不支持单元素的 tuple，所以 `var (err) = catch void_fn()` 降级为 `var err = catch void_fn()`
:::

这是 errort 类型的定义

```nature
type errort = struct {
    string msg
}
```

👏 相信你已经掌握了 throw 和 catch 语法关键字的使用，这就是 nature 中错误处理的所有语法概念。语法简单不代表错误处理是一件简单的事情，它涉及到如何在程序中设计、捕获、记录和处理错误，是编写健壮、可靠和高质量软件的关键。
