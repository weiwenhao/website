---
title: Closures
sidebar_position: 30
---

A **closure** is a combination of a function and its surrounding environment (local variables). In other words, closures allow developers to access the scope of an outer function from an inner function without worrying about the variables in the outer scope being lost when the stack is exited.

In nature, when a function references its external environment at the time of its definition, the function will automatically be converted into a closure. This is syntactically transparent; you can use closures just like regular functions. Therefore, all you need to know is:

:::info
**In nature, functions can serve as parameters for other functions, as return values, or be assigned to variables. This is also known as higher-order functions**.
:::

Next, we'll delve into the topic of closures in relation to compiler theory. First, let's look at a situation where an external environment is referenced but **will not be compiled into a closure**. We'll use the module file `test.n` as an example:

```nature title='test.n'
int count = 0 // This is a global variable

fn test() { // This is a global function
	count += 1 // Reference to the global count
}
```

The `test` function references the external environment `count`. Will `test` be compiled into a closure? No, `count` is a global variable and will never be destroyed under any circumstances.

Therefore, we can conclude that the `test` function does not use any external environment and will not be compiled into a closure. We can further infer that all global functions (functions defined in a module) exist in the top-level scope and cannot reference variables outside of that scope. Therefore, **global functions will never be compiled into closures**.

Now let's look at a typical example that references an external environment, where a function is returned from another function and references the local variable `cash`.

```nature title='main.n'
fn make_atm():fn(int):int {
	var cash = 1000
	return fn(int amount):int { // Anonymous function
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

Let's compile and see if the output matches our expectations:

```shell
> nature build main.n && ./main
900
700
900
```

In the example, the anonymous function references the local variable `cash` from its defining environment. Therefore, nature will compile this function into a closure, essentially like `closure(fn_code, env[cash])`.

Why do this? `cash` is a local variable, and its lifetime is only within `make_atm`. When the call stack for `make_atm()` exits, its local variables will be destroyed. If we assume the anonymous function is `f`, and if `f` is not enclosed with its external environment during compilation, then calling `f`, i.e., `atm_foo(100)` in the example, would result in an access exception as it would not be able to find the already destroyed local variable `cash`.

By converting it into a closure, `f` collects its referenced external environment, preventing reference exceptions when `f` is called. This is the main purpose of closures. The example also demonstrates the use of functions as return values.

In nature, functions can also be passed as parameters, allowing us to implement dependency injection.

```nature
fn timing(fn() callback) {
	for (int i = 0; i < 10; i += 1) {
		callback()
		sleep(1) // Built-in function, blocks the current process for 1 second
	}
}

timing(fn() {
	println('hello world')
})

timing(fn () {
	println('haha nature')
})
```

Compile and output:

```shell
> ./main
hello world
hello world
// ...output omitted
haha nature
haha nature
// ...output omitted
```

This is how closures are applied in function parameters. Through closures, or higher-order functions, we can write more concise and elegant code.