---
title: Hello World
sidebar_position: 30
---

## First Program

:::tip
The following code is compiled and executed on a Linux device. If you don't have a Linux device, you can try it using Docker.
:::

First, create a Nature source code file with a .n extension. You can choose any name for the file. Let's call it `main.n`. Create the file and add the following content:

```nature title="main.n"
print('hello world')
```

Compile the code:

```shell
> nature build main.n
```

Now you should see an executable file named `main` in your directory. `main` is the default name, but you can use the `-o` parameter to specify a different name for the output executable file, such as `nature build -o hello main.n`.

Run the program:

```shell
> ./main
hello world
```

🎉 This is a milestone for you!

## Something a Bit More Complex

Let's take a look at the Fibonacci sequence example shown on the homepage. First, create a file called `fib.n` and add the following content:

```nature title='fib.n'
fn fib(int n):int {
    if (n <= 1) {
        return n
    }

    return fib(n - 1) + fib(n - 2)
}

var result = fib(10)
println(result)
```

Compile and execute the code:

```shell
> nature build fib.n && ./main
55
```

In the above example, we declare a function using the `fn` keyword called `fib`. This function calculates the value of the Fibonacci sequence at position `n`.

Since Nature is a statically-typed language, we need to declare the types of the function parameters and return value. The `if` keyword is a control flow statement that checks if the condition expression is true and uses the `return` keyword to return the value of the parameter variable `n`. `fib(n - 1)` is a recursive call to the `fib` function, which is a more complex way of calling a function within itself called recursion.

Outside the function, we call `fib(10)` again and assign its result to the variable `result`. In Nature, you can use the `var` keyword for automatic type inference if you don't explicitly declare the type of the variable. 

Finally, the `println` function is used to output the value of `result` with an automatic line break.

> 💡 `println` is a built-in function that will be explained in more detail in subsequent sections.

## Summary

With the two examples above, you have already covered most of the syntax in Nature. By this point, you have already started learning Nature, and the subsequent chapters will mainly cover the details of the language syntax.
