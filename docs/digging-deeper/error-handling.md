---
title: Error Handling
sidebar_position: 20
---

In programming languages, error handling is a broad and complex concept that involves dealing with handled and unhandled errors, expected and unexpected errors, and more.

But do we need to constantly worry about errors every time we make a function call? Not really. **We should only concern ourselves with errors that we can handle**. For errors that we cannot handle or that are unexpected, there is no need to intercept or process them. Instead, we should continue propagating them up the call chain until we encounter a caller that can handle such errors.

```nature
fn call(): int {
	// logic...call->call1->call2->call3...
	return 1
}

// The call chain may be very deep, and there could be an exception, such as a memory access violation caused by a bug in the code.
// But as a small caller, all I can do is read data from the call. I cannot handle errors like a bug causing a memory access violation.
// So, I will only continue executing when call can return; otherwise, I will not do anything.
// Errors will propagate up the call chain until they reach a caller that can handle them.
var foo = call()
```

In the nature language, we use the `throw` and `try` keywords, as well as tuple syntax, to handle errors. The `throw` keyword is used to throw an error, causing the function to exit immediately and passing the error information up the call chain.

```nature
fn rem(int dividend, int divisor): int {
	if (divisor == 0) {
		throw 'divisor cannot be zero'
	}

	return dividend % divisor
}

// v will throw an exception since the second argument is 0, resulting in a division by zero error. Since we haven't caught the exception, it will continue propagating up the chain until it reaches a catch block or the program exits.
// As a result, the statement println('hello world') will not be executed as expected.
var result = rem(10, 0)
println('hello world')
```

When we run the code, we can see that the error continues to propagate until the runtime catches it and dumps the error message. The `println('hello world')` statement is also not executed.

```shell
> ./main
runtime catch error: divisor cannot be zero
```

:::tip
The call stack tracing and improved error messages are expected to be available in v0.4.0-beta.
:::

Now, let's look at the situation where we actively catch errors using the `try` keyword.

```nature
fn rem(int dividend, int divisor): int {
	if (divisor == 0) {
		throw 'divisor cannot be zero'
	}

	return dividend % divisor
}

// v We use the try keyword to catch possible errors. In nature, null values are not included by default.
// When there is no error, the `err` will be an empty `errort` structure, and `err.has` will have the default value `false`.
var (result, err) = try rem(10, 0)
if err.has {
	// error handle, the `errort` structure contains the `msg` field, storing the error message.
	println(err.msg)
} else {
	println(result)
}

// v When there is no exception, `err` will be of the `errort` type with a default value. It is a way to ensure the value of the `err` variable is always available.
(result, err) = try rem(10, 3)
if err.has {
	println(err.msg)
} else {
	println(result)
}
```

The output will be:

```shell
> ./main
divisor cannot be zero
1
```

The `try` keyword can only be used before function calls, and it reads whether the current function call throws an error or not.

**When the original function has a return value, the `try` keyword will create a tuple with two elements. The first element is the original return value, and the second element is the `errort` type data for the error. When the original function has no return value, the `try` expression directly returns an `errort` type data.**

:::info
When a function has no return value, it can be understood that, since nature does not support single-element tuples, `var (err) = try void_fn()` is downgraded to `var err = try void_fn()`.
:::

Here's the definition of the `errort` type:

```nature
type errort = struct {
    string msg
    bool has
}
```

The `try` keyword can also be used with longer expressions after it. Essentially, it is similar to the traditional `try-catch` in other languages, just with a slightly simplified syntax.

```nature
var (foo, err) = try foo[1] // v index out of range
var err = try foo().bar().car() // v chained calls
var (bar, err) = try foo as int // v union assert
var (car, err) = try foo.bar[1] // v chained calls
```

> 💡 Notice that the variable `err` can be redefined without any issues, as long as it corresponds to different `try` expressions.

🎉 Congratulations! You have learned how to use the `throw` and `try` syntax in nature. However, simplicity in syntax does not mean that error handling is a straightforward task. It involves designing, capturing, logging, and processing errors in the program, and is crucial for writing robust, reliable, and high-quality software.