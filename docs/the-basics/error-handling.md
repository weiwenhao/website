---
title: Error Handling
sidebar_position: 69
---

## Compile-time Errors

Nature is a strongly-typed language, where syntax errors and type inconsistencies can be detected at the compilation stage. It provides readable compile-time error messages. For example, here is a typical type mismatch error:

```nature title=main.n showLineNumbers
fn test():int {
    var a = 12
    return a as f32
}
```

Compilation:

```bash
> nature build main.n
xxx/main.n:3:12: type inconsistency, expect=int(i64), actual=f32
```

As can be seen, the issue arises because the `return` type on line 3 is `f32`, but the function is expected to return an `int`. The `3` indicates the line number and `12` indicates the column number.

## Runtime Errors

Runtime errors are errors that cannot be detected during compilation. The most typical example is an out-of-bounds access of a dynamic array:

```nature title=main.n showLineNumbers
fn foo():int {
    var list = [1, 2, 3] // Declare a vec dynamic array with a length of 3
    return list[4] // Out-of-bounds access
}

foo()
```

Compile and Run:

```bash
> ./main
catch error: 'index out of vec [4] with length 3' at nature-test/main.n:3:17
stack backtrace:
0:	main.foo_0
		at nature-test/main.n:3:17
1:	main
		at nature-test/main.n:6:0
```

The first line shows the cause of the runtime error and its specific location. Subsequent lines show the error call stack for easier debugging. Besides built-in runtime errors, we can also throw runtime errors manually using the `throw` keyword. Further details on handling runtime errors will be discussed below.

## Runtime Error Handling

Runtime error handling is a complex concept, involving both handleable and unhandleable errors, as well as both expected and unexpected errors.

Should we be concerned about errors every time we make a call? Not necessarily. **We should only care about errors that we can handle.** For errors that are either unhandleable or unexpected, we shouldn't intercept or handle them. Instead, we should let them propagate up the call stack until they reach a caller that can handle them.

```nature
fn call():int {
	// logic...call->call1->call2->call3...
	return 1
}

// The call chain for 'call' could be very deep, and there might be an exception, such as a bug causing memory access issues. However, as a mere caller, all I can do is read the data from 'call'. I cannot handle issues like bugs in the memory, so I will only proceed if 'call' returns successfully. Otherwise, I won't do anything.
// The error will propagate up the call chain until it reaches a caller that can handle it.
var foo = call()
```

In Nature, we use the `throw` and `try` keywords along with the `tup` type to handle errors. Using the `throw` keyword will cause the function to exit immediately and propagate the error up the call chain.

```nature
fn rem(int dividend, int divisor):int {
	if (divisor == 0) {
		throw 'divisor cannot zero'
	}

	return dividend % divisor
}

// v Here, since the second argument is 0, it causes a division-by-zero error, throwing an exception. Because we do not catch this exception, it will continue to propagate up the call stack until it is caught or the program exits.
// Therefore, the subsequent statement 'println('hello world')' will not be executed.
var result = rem(10, 0)
println('hello world')
```

When we check the output, we find that the error propagates up to the runtime, which intercepts the error and dumps it out. The statement `println('hello world')` does not get executed as expected.

```shell
> ./main
catch error: 'divisor cannot zero' at nature-test/main.n:3:27
stack backtrace:
0:	main.rem_0
		at nature-test/main.n:3:27
1:	main
		at nature-test/main.n:11:22
```

Now, let's look at how we can proactively intercept errors using the `try` keyword.

```nature
fn rem(int dividend, int divisor):int {
	if (divisor == 0) {
		throw 'divisor cannot zero'
	}

	return dividend % divisor
}

// v Use the try keyword to catch any potential errors; Nature does not have null values by default.
// When no error occurs, err is an empty errort structure, and err.has contains the default value of false.
var (result, err) = try rem(10, 0)
if err.has {
	// error handling, the errort structure contains a msg field storing the error message.
	println(err.msg)
} else {
	println(result)
}

// v Use try when no exception occurs.
(result, err) = try rem(10, 3)
if err.has {
	println(err.msg)
} else {
	println(result)
}
```

Check the output:

```shell
> ./main
divisor cannot zero
1
```

The `try` keyword can only be used before a function call, checking if the function throws an error.

**When the original function has a return value, `try` will create a tuple containing two elements: the original return value and an `errort` type error data. When the original function has no return value, `catch` simply returns an `errort` type data.**

:::info
When the function has no return value, you can understand it like this: Since Nature does not support single-element tuples, `var (err) = try void_fn()` is reduced to `var err = try void_fn()`.
:::

This is the definition of the `errort` type:

```nature
type tracet = struct {
    string path
    string ident
    int line
    int column
}

type errort = struct {
    string msg
    [tracet] traces
    bool has
}
```

The `try` keyword is not limited to function calls; it can follow longer and more complex expressions. Essentially, it's similar to traditional languages' `try-catch` but with a slightly simplified syntax sugar.

```nature
var (foo, err) = try foo[1] // v index out of range
var err = try foo().bar().car() // v chain call
var (bar, err) = try foo as int // v union assert assertion error
var (car, err) = try foo.bar[1] // v chain call
```

> 💡 Observe that err can be redefined; the rule is that as long as the variable receiving error information from the `try` expression is not checked for redefinition.

🎉 Hopefully, you now have a good understanding of how to use the `throw` and `try` keywords in Nature. That covers all the syntax for error handling in Nature. While the syntax is simple, error handling is not. It involves designing, capturing, logging, and processing errors in your