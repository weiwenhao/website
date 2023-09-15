---
title: 错误处理
sidebar_position: 69
---

## 编译时操作

nature 是强类型语言包括语法解析，类型推断等步骤，所以所以的语法错误，类型等异常都能在编译阶段发现，比如一个典型的类型不匹配错误

```nature title=main.n showLineNumbers
fn test():int {
    var a = 12
    return a as f32
}
```

编译

```bash
> nature build main.n
xxx/main.n:3:12: type inconsistency, expect=int(i64), actual=f32
```
可以看到第三行的 return 返回的类型是 f32, 但是函数期望得到的返回类型是 int。其中 3 表示行号， 12 表示第几列

## 运行时错误

运行时错误则是一些无法在编译时进行识别的错误，最典型的例子就是对动态数组的越界访问

```nature title=main.n showLineNumbers
fn foo():int {
    var list = [1, 2, 3] // 声明一个 vec 动态数组，其长度为 3
    return list[4] // 进行越界访问
}

foo()
```

编译并运行

```bash
> ./main
catch error: 'index out of vec [4] with length 3' at nature-test/main.n:3:17
stack backtrace:
0:	main.call_0
		at nature-test/main.n:3:17
1:	main
		at nature-test/main.n:6:0
```


## 运行时错误处理

在编程语言中，错误处理是一个广泛且复杂的概念，需要考虑处理和无法处理的错误、预期和非预期的错误等等。

但是我们应该时时刻刻的在每一次 call 时关心错误么？其实并不需要，**我们应该只关心我们能够处理的错误**，对于不能处理或者预料之外的错误，我们没有必要去拦截或者处理它，应该将它继续向上传递，直到遇到一个能够处理这种错误的 caller。

```nature
fn call():int {
	// logic...call->call1->call2->call3...
	return 1
}

// call 的调用链可能非常的深，并存在了一个异常，比如有一个虫子钻进了内存中导致的内存访问异常
// 但是我只是一个小小的 caller，我能做的就是读取 call 中的数据，我无法处理类似虫子钻进了内存中导致的错误，所以只有当 call 能够返回时我才继续向下执行，否则我将不做任何的处理。
// 错误将沿着调用链向上级传递，直到遇到了一个能够处理这个错误的 caller
var foo = call()
```

在 nature 语言中，我们采用 throw 和 try 关键字以及 tup 类型来处理错误。使用 throw 关键字可以抛出错误，使得函数立即退出，并将错误信息传递到调用链上游。

```nature
fn rem(int dividend, int divisor):int {
	if (divisor == 0) {
		throw 'divisor cannot zero'
	}

	return dividend % divisor
}

// v 由于第二个参数为 0，会导致除数为 0，从而抛出异常。因为我们没有捕获该异常，它会继续向上传递，直到遇到 catch 块或程序退出。
// 因此，后面的语句 println('hello world') 不会被执行。
var result = rem(10, 0)
println('hello world')
```

通过输出我们发现，error 一直像上传递直到 runtime，runtime 拦截了这个错误并 dump 出来。`println('hello world')` 也和预期一样没有执行。

```shell
> ./main
runtime catch error: divisor cannot zero
```

:::tip
调用栈追踪已经优雅错误提示预计在 v0.4.0-beta 中完善并发布。
:::

我们再来看看使用 try 关键字主动拦截错误的情况

```nature
fn rem(int dividend, int divisor):int {
	if (divisor == 0) {
		throw 'divisor cannot zero'
	}

	return dividend % divisor
}

// v 对可能出现的错误使用 try 关键字进行拦截，nature 中默认不包含 null 值
// 当不存在错误时 err 是空的 errort 结构体,err.has 包含默认值 false
var (result, err) = try rem(10, 0)
if err.has {
	// error handle， errort 结构中包含 msg 字段存储了错误的信息
	println(err.msg)
} else {
	println(result)
}

// v 不存在异常的情况下使用 try 拦截
(result, err) = try rem(10, 3)
if err.has {
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

try 关键字只能用于函数调用的前面，其读取本次函数调用是否 throw 了 error。

**当原函数包含返回值时，try 将创建一个拥有两个元素的 tuple，第一个元素是函数原来的返回值，第二个元素则是 errort 类型的错误数据。 当原函数没有返回值时，catch 直接返回一个 errort 类型的数据。**

:::info
当函数没有返回值时，可以这么理解，由于 nature 不支持单元素的 tuple，所以 `var (err) = try void_fn()` 降级为 `var err = try void_fn()`
:::

这是 errort 类型的定义

```nature
type errort = struct {
    string msg
    bool has
}
```

不仅是在函数调用中，try 后面可以接更多更长的表达式。本质上和传统语言的 try catch 没有什么区别，只是稍微简化了一下语法糖。

```nature
var (foo, err) = try foo[1] // v index out of range
var err = try foo().bar().car() // v 链式调用
var (bar, err) = try foo as int // v union assert 断言异常时
var (car, err) = try foo.bar[1] // v 链式调用
```

> 💡 观察上面的代码可以发现，err 是可以重复定义的， 规则是只要是 try 表达式的对应的错误信息接受变量就不会进行重复定义的检测。

🎉 相信你已经掌握了 throw 和 try 语法关键字的使用，这就是 nature 中错误处理的所有语法概念。语法简单不代表错误处理是一件简单的事情，它涉及到如何在程序中设计、捕获、记录和处理错误，是编写健壮、可靠和高质量软件的关键。
