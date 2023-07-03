---
title: Closure
sidebar_position: 30
---

A **closure** is a combination of a function and the environment (local variables) it is bound to. In other words, a closure allows developers to access the scope of an outer function from within an inner function, without worrying about the issue of variables in the outer scope being lost as the stack exits.

In Nature, when a function references the environment it was defined in, the function automatically becomes a closure. This is transparent in syntax, and you can use closures just like regular functions. So, the key point to remember is:

:::info 
**In Nature, functions can be used as arguments, return values, and assigned to variables, making them higher-order functions.**
:::

Now, let's dive deeper into closures and explore a scenario where a function references the outer environment but **does not get compiled into a closure**. Consider the module file `test.n` as an example:

```nature title='test.n'
int count = 0 // This is a global variable

fn test() { // This is a global function
	count += 1 // Reference to the global count
}

```

Does the `test` function, which references the outer environment variable `count`, get compiled into a closure? No. Since `count` is a global variable, it will never be destroyed regardless of the situation.

Thus, we can determine that the `test` function does not use any external environment and therefore will not be compiled into a closure. Furthermore, we can infer that all global functions (functions defined in modules) exist in the top-level scope and cannot reference variables outside their scope. Therefore, **global functions will never be compiled into closures**.

Now let's look at a typical example that references the outer environment. We'll define a function that returns another function and references the local variable `cash`.

```nature title='main.n'
fn make_atm(): fn(int): int {
	var cash = 1000
	return fn(int amount): int { // Anonymous function
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

Let's compile and observe the output:

```shell
> nature build main.n && ./main
900
700
900
```

In the example, the anonymous function references the local variable `cash` from its defining scope. When compiling the function, Nature converts it into a closure, which is similar to the structure `closure(fn_code, env[cash])`.

Why do we do this? Since `cash` is a local variable with a lifespan limited to `make_atm`, the local variables are destroyed when the call stack of `make_atm()` exits. Assuming the anonymous function is represented as `f`, if we don't capture the outer environment during compilation, when calling `f` (e.g., `atm_foo(100)` in the example), the reference to the already destroyed local variable `cash` would cause an access exception.

By using closures, we collect the referenced outer environment when compiling the function. This prevents a reference exception caused by missing outer environment references when calling `f`. That's the main purpose of closures. The example above also demonstrates a function being returned as a value.

In Nature, functions can also be passed as parameters, allowing us to achieve dependency injection.

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

```nature
> ./main
hello world
hello world
// ...output omitted
haha nature
haha nature
// ...output omitted
```

This demonstrates the use of closures or higher-order functions as function parameters. Through closures or higher-order functions, we can write more concise and elegant code.

---

This concludes our Nature tutorial. 👋
