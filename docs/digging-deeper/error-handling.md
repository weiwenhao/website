---
title: Error handling
sidebar_position: 20
---

In programming languages, error handling is a broad and complex concept that involves dealing with both handled and unhandled errors, expected and unexpected errors, and more.

But do we need to constantly be concerned about errors with every function call? Actually, we don't. **We should only focus on the errors that we can handle**. For errors that cannot be handled or unexpected errors, there is no need to intercept or handle them. Instead, we should propagate them further up the call chain until we encounter a caller that can handle such errors.

```nature
fn call(): int {
	// logic...call->call1->call2->call3...
	return 1
}

// The call chain of 'call' may be deep, and there might be an exception, such as a memory access exception caused by a bug that burrowed into memory.
// But I'm just a small caller, and all I can do is read the data from 'call'. I cannot handle errors like a bug burrowing into memory. So I only proceed with execution when 'call' can return; otherwise, I won't do anything.
// Errors will be propagated up the call chain until they encounter a caller that can handle the error.
var foo = call()
```

In the nature language, we use the 'throw' and 'try' keywords, along with tuple syntax, to handle errors. The 'throw' keyword can be used to throw an error, causing the function to exit immediately and passing the error information up the calling chain.

```nature
fn rem(int dividend, int divisor):int {
	if (divisor == 0) {
		throw 'divisor cannot zero'
	}

	return dividend % divisor
}

// Here, 'result' will throw an exception since the second parameter is 0, resulting in a division by zero error. Since we haven't caught this exception, it will continue to propagate until it encounters a catch block or the program exits. // Therefore, the subsequent statement, println('hello world'), will not be executed. var result = rem(10, 0) println('hello world')
```

By observing the output, we can see that the error keeps propagating until it reaches the runtime, which intercepts the error and dumps it. The execution of `println('hello world')` is also skipped as expected.

```shell
> ./main
runtime catch error: divisor cannot zero
```

:::tip
Call stack tracing and improved error messages are expected to be implemented and released in v0.4.0-beta.
:::

Now let's take a look at a scenario where we actively intercept errors using the 'try' keyword.

```nature
fn rem(dividend: int, divisor: int): int {
	if (divisor == 0) {
		throw 'divisor cannot be zero'
	}

	return dividend % divisor
}

// Here, we use the 'try' keyword to intercept possible errors. By default, nature does not include the null value.
// When there is no error, 'err' will be empty, and the 'err.has' field will have the default value of false.
var (result, err) = try rem(10, 0)
if err.has {
	// Error handling; the 'errort' structure contains the 'msg' field that stores the error message.
	println(err.msg)
} else {
	println(result)
}

// Here, we use 'try' to intercept when there is no exception.
(result, err) = try rem(10, 3)
if err.has {
	println(err.msg)
} else {
	println(result)
}
```

Let's see the output:

```shell
> ./main
divisor cannot zero
1
```

The 'try' keyword can only be used before a function call, and it checks whether an error is thrown during the function call.

**When the original function has a return value, 'try' creates a tuple with two elements: the original function's return value as the first element and the error data of type 'errort' as the second element. When the original function has no return value, 'try' directly returns an error data of type 'errort'.**

:::info 
When a function has no return value, you can think of it as nature not supporting single-element tuples, so `var (err) = try void_fn()` is downgraded to `var err = try void_fn()`. 
:::

This is the definition of the 'errort' type:

```nature
type errort = struct {
    string msg
    bool has
}
```


The 'try' keyword can be used not only in function calls but also with longer and more complex expressions. Essentially, it is not much different from the traditional try-catch in other languages; it just simplifies the syntax a bit.

```nature
var err = try foo[1] // Index out of range
var err = try foo().bar().car() // Chained calls
var err = try foo as int // Union assert exception
var err = try foo.bar[1] // Chained calls
```


🎉 Congratulations! You have now learned the usage of the 'throw' and 'try' syntax keywords. These are all the syntax concepts for error handling in nature. While the syntax is simple, error handling itself is not a simple task. It involves designing, capturing, logging, and handling errors in your program, which are crucial for writing robust, reliable, and high-quality software.
