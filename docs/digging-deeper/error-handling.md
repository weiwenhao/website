---
title: 错误处理
sidebar_position: 20
---


编程语言中错误处理是非常广泛且复杂的概念，能够处理的，不能处理的，意料之内的，意料之外的等等。这里我们不讨论广泛的错误处理的方式，主要还是把 nature 错误处理语法描述清楚。

nature 中使用 throw 和 catch 关键字以及刚刚学习过的 tuple 语法来处理错误。通过 throw 关键字，可以将错误抛出，此时函数将立刻退出，并将错误信息沿着调用链向上丢出去

```nature
fn rem(int dividend, int divisor):int {
	if (divisor == 0) {
		throw "divisor cannot zero"
	}

	return dividend % divisor
}

// v 由于除数为 0， 所以此时一定会出现异常，这里没有拦截该异常，所以代码不会像下执行，而是将错误向上传递，直到遇到 catch 或者到达进程的出口
var result = rem(10, 0)
println("hello world")
```

来看一看输出，最终 error 一直抛到了 runtime 出口，runtime 拦截了这个错误并进行了输出，可以看到后续的 hello world 并没有输出出来。
```
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
// 如果不存在错误， err == null，在 if 判断中会进行隐式类型转换为 false
var (result, err) = catch rem(10, 0) // tuple 解构快速赋值
if (err) {
	// error handle, errort 结构中包含 msg 字段存储了错误的信息
	println(err.msg)
} else {
	println(result)
}

// v 不存在异常的情况下使用 catch 拦截
// 上面已经定义好了 result 和 err 变量，这里就不需要重复定义了，直接使用其值就可以了
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


catch 关键字只能用于函数调用的前面，其读取本次函数调用是否 throw 了 error，无论 error 是否有值，其都将创建一个拥有两个元素的 tuple，第一个元素是函数原来的返回值，第二个元素则是 errort 类型的错误数据。 这是当前版本 errort 类型的定义

```nature
type errort = struct {
    string msg
}
```

上面的示例中都使用了 tuple 解构快速赋值，如果你像， `var tuple = catch rem(10, 0)`  的形式也是可以的。你只需要记住 catch 的返回值是一个两个元素的 tuple 即可。

👏   相信你已经掌握了 throw 和 catch 语法关键字的使用，这就是 nature 中错误处理的所有语法概念。 但是错误处理的哲学远比这两个语法要来的困难且重要。