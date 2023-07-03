---
title: Functions
sidebar_position: 40
---

## Basic Usage

**Functions** are used to encapsulate reusable functionality. Without functions, you would have to repeat a specific set of operations multiple times, whereas with functions, you only need to write the function name and some brief information.

A function typically consists of a function name, input parameters, output parameters, and a function body. In a broad sense, it is a machine that accepts inputs, performs calculations, and returns computed results.

Here is the syntax for function declaration statements in nature, using a basic sum function as an example:

```nature
// Definition
fn sum(int a, int b): int {
    return a + b
}

// Invocation
var s = sum(1, 2)
```

The function name is `sum`, which takes two `int` type formal parameters `a` and `b`, and returns an `int` type. Multiple formal parameters are separated by commas. The types of input parameters and return value parameters in function declarations cannot be omitted, and the type inference keyword `var` cannot be used.

In summary, the syntax is `fn ident(T ident [, T ident...])[: T]`, where the return value type declaration is on the right side of the parentheses, separated by a colon. Only single return values are supported, and only the type needs to be specified.

:::info
`return expr` exits the execution of the function and returns `expr` as the computed result.
:::

`sum(1, 2)` is the syntax for function invocation. `sum` is the function name, and `1` and `2` are the actual arguments. Multiple actual arguments are separated by commas.

Functions can also be assigned to variables as expressions, and they are called in the same way as directly defining functions.

```nature
var f = fn(int a, int b): int {
	return a + b
}


var s = f(1, 2)
```

> 💡 **When functions are used as expressions, it is recommended to omit the original function name, which is known as anonymous function declaration**. This helps to avoid confusing names

## Variadic Parameters

Example:

```nature
fn sum(...[int] list): int {
    var result = 0
    for (k in list) {
        result += list[k]
    }
    return result
}

println(sum(1, 2, 3, 4, 5))
```

The output will be:

```shell
> ./main
15
```

The `...` syntax (rest) allows collecting the arguments passed by the caller as a list in the last parameter of the function. The types of the arguments passed by the caller need to match or be implicitly convertible to the type `...[T]`.

> 💡 The `...` syntax also has an expression-based spreading feature, which will be gradually introduced in the future.

## Multiple Return Values?

It was mentioned earlier that functions only support a single return value, but it is possible to achieve an approximation of multiple return values using tuple destructuring assignment. Here's an example:

```nature
fn buy(int amount):(string, int) {
	amount -= 10
	return ('apple', amount)
}

var (balance, product) = buy(100)

println(balance, ' ', product)
```

In the example, the return value of the function is declared as `(string, int)`, indicating a tuple type. The statement `return ("apple", amount)` creates an instance of a tuple and returns it, which does not violate the single return value scenario.

The line `var (balance, product)` is a new syntax called tuple destructuring assignment. It is designed to simulate functions with multiple return values. In destructuring assignment, automatic type inference with `var` must be used; explicit type specification is not allowed for aesthetic reasons and to avoid confusion.

More detailed usage of tuples will be explained in the upcoming section on data structures.

