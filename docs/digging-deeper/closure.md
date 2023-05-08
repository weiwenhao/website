---
title: 闭包
sidebar_position: 40
---

**闭包**（closure）是一个函数以及其捆绑的周边环境(局部变量)的的组合。换而言之，闭包让开发者可以从内部函数访问外部函数的作用域，而不用担心外部作用域中的变量随着 stack 退出丢失的问题。

在 nature 中，函数引用了定义时外部的环境时，函数会自动转换为闭包，当然这在语法上是无感知的，你可以像普通的函数一样使用闭包。所以你只需要知道

:::info
**在 nature 中，函数可以作为另外一个函数的参数，返回值，也可以作为值赋值给变量，这也称为高阶函数**。
:::

接下来是与编译原理有关的，关于什么是闭包的深入了解。先来看一种引用了外部环境但**不会被编译成闭包**的情况，以模块文件 test.n 为例子

```nature title='test.n'
int count = 0 // 这是全局变量

fn test() { // 这是全局函数
	count += 1 // 对全局 count 的引用
}
```

test 函数引用了外部的环境 count，那 test 此时可以会被编译为闭包吗? No，count 作为全局变量，无论什么情况下都不会被销毁。

所以此时可以判定 test 函数没有使用任何的外部环境，并不会编译成一个闭包。并且我们可以进一步推断，所有的全局函数(在 module 中定义的函数) 处在最顶层的作用域中，其不可能再引用作用域外的局部变量，所以**全局函数永远不会被编译成闭包**。

现在看一个典型的引用了外部环境的例子，将函数作为一个另外一个函数的返回值，并引用了局部变量 cash。

```nature title='main.n'
fn make_atm():fn(int):int {
	var cash = 1000
	return fn(int amount):int { // 匿名函数
		cash -= amount
		return cash
	}
}

var atm_foo = make_atm()
println(atm_foo(100))
println(atm_foo(200))

var atm_bar = make_atm()
println(atm_bar(100))
```

编译输出看看是否和我们的预期一致呢

```shell
> nature build main.n && ./main
900
700
900
```

示例中匿名函数在定义中引用了其定义域外部环境中的局部变量 cash，所以 nature 在编译该函数时，会将其转换成闭包，也就是类似 `clsoure(fn_code, env[cash])` 的结构。

为什么要这么做呢？ cash 作为局部变量，其生命周期仅在 make_atm 中，make_atm() 调用栈退出时，其中的局部变量就会被销毁。我们先假设匿名函数为 f，假设在编译时不进行外部环境引用的封闭处理，那么在调用 f 时，也就是示例中的 `atm_foo(100)` 时将无法找到已经被销毁的局部变量 cash，造成访问异常。

而通过闭包转换，将 f 引用的外部环境收集起来，避免在调用 f 时其引用的外部环境缺失造成引用异常，这就是闭包做的主要事情。同时上面的示例中也演示了函数作为返回值时的示例。

nature 中函数同样可以作为参数传递，我们可以基于此实现依赖注入。

```nature
fn timing(fn() callback) {
	for (int i = 0; i < 10; i += 1) {
		callback()
		sleep(1) // 内置函数，阻塞当前进程 1 秒
	}
}

timing(fn() {
	println("hello world")
})

timing(fn () {
	println("haha nature")
})
```

编译并输出

```nature
> ./main
hello world
hello world
// ...输出省略
haha nature
haha nature
// ...输出省略
```

这就是闭包在函数参数中应用。通过闭包或者说高阶函数，我们能够编写更加简洁优雅的代码。

---

我们的 nature 教程到这里就告一段落了 👋
