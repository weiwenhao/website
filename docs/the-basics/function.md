---
title: Function
sidebar_position: 40
---

## Basic Usage

**Functions** are used to encapsulate reusable features. Without functions, a specific operation process would need to be rewritten multiple times, while using functions requires only writing down the function name and some brief information.

Functions are usually composed of a function name, input parameters, output parameters, and the function body. Broadly speaking, a function is a machine that takes input and returns computed results after calculations.

Below is the syntax for defining a function in Nature, using a basic sum function as an example.

```nature
// Definition
fn sum(int a, int b):int {
	return a + b
}

// Invocation
var s = sum(1, 2)
```

The function's name is `sum`, it takes two `int` type formal parameters `a` and `b` and returns an `int` type. Multiple formal parameters are separated by commas. The type of input parameters and return values cannot be omitted and the `var` keyword for type inference is not allowed.

To summarize the syntax: `fn ident(T ident [, T ident...])[:T]`. The function's return type is declared to the right of the parenthesis, separated by a colon. Only single return values are supported; you only need to fill in the type, without needing an ident declaration.

:::info
`return expr` exits the function and returns `expr` as the computed result.
:::

`sum(1, 2)` is the syntax for calling the function, where `sum` is the function name and `1` and `2` are the actual parameters. Multiple actual parameters are separated by commas.

Functions can also be assigned to variables as expressions. The way to invoke them is the same as directly defining the function.

```nature
var f = fn(int a, int b):int {
	return a + b
}

var s = f(1, 2)
```

> 💡 **When functions are used as expressions, it's recommended to omit the function's original name, also known as anonymous function declaration, to avoid confusing names.**

## Variable Arguments

Example:

```nature
fn sum(...[int] list):int {
	var result = 0
	for (k in list) { // Iteration syntax
		result += list[k] // Access values in list type through list[index]
	}
	return result
}

println(result(1, 2, 3, 4, 5))
```

Output:

```shell
> ./main
15
```

The `...` syntax (rest) is only allowed in the last argument of a function to collect the arguments passed by the caller into a `vec` type. The type of the arguments passed by the caller must match the type `T` in `...[T]` or be implicitly convertible.

When invoking the function, you can use the `...` syntax to destructure a `vec`. The destructuring syntax can also only be used in the last argument and must have a corresponding variable argument to match. For example,

```nature
fn sprintf(string fmt, ...[any] args):string {}

fn printf(string fmt, ...[any] args) {
    var str = sprintf(fmt, ...args)
    print(str)
}
```

## Multiple Return Values?

As mentioned earlier, functions only support single return values, but you can simulate multiple return values through tuple destructuring assignments. Here's how it works:

```nature
fn buy(int amount):(string, int) {
	amount -= 10
	return ('apple', amount)
}

var (product, balance) = buy(100)

println(product, ' ', balance)
```

In the example, the function's return type is declared as a tuple type `(string, int)`. `return ('apple', amount)` creates and returns a tuple instance, which doesn't violate the single return value rule.

`var (product, balance)` is a new syntax form known as tuple destructuring assignment. This syntax was developed to simulate multiple return values from functions. In destructuring assignments, you must use `var` for automatic multi-type inference, and explicit typing is not allowed as it could be misleading and is not aesthetically pleasing. Therefore, this is forbidden in the syntax.

More details on the use of tuples will follow in subsequent sections.