---
title: Hello World
sidebar_position: 30
---

## The First Program

:::tip
The code below was compiled and executed on a Linux device. If you don't have a Linux device, you can try using Docker.
:::

First, create a nature source file, which always ends with the .n extension. You can name it anything, but here we'll call it `main.n`. Create the file and write the following content:

```nature title="main.n"
print('hello world')
```

Compile

```shell
> nature build main.n
```

Now, you should see an executable file named `main` in the directory. `main` is the default name, but you can use the `-o` parameter to change the output name of the executable, like so: `nature build -o hello main.n`.

Run

```shell
> ./main
hello world
```

🎉 This is a milestone for you.

## A Bit More Complex

As demonstrated in the Fibonacci sequence example on the homepage, first create a file named `fib.n` and write the following content:

```nature title='fib.n'
import fmt

fn fib(int n):int {
    if n <= 1 {
        return n
    }
    return fib(n - 1) + fib(n - 2)
}

var result = fib(30)
fmt.printf('fib result is %d', result)
```

Compile and execute

```shell
> nature build fib.n && ./main
fib result is 832040
```

In the example above, we first import the `fmt` package, which is a library for string formatting and output. Then we **declare a function using the `fn` keyword**. The function, named `fib`, primarily calculates the Fibonacci sequence value at position n.

As this is a strongly typed language, parameter types and return types must be declared. The `if` keyword is a control flow statement that checks whether a given condition is true, and the `return` keyword returns the value of the variable n. `fib(n - 1)` calls the `fib` function, which is a recursive call.

Outside the function, we again call `fib(30)` and assign its result to the `result` variable. If you have experience with C, you'll know that the `result` variable also needs a type declaration, but in nature, **the `var` keyword allows for type inference**.

Finally, the `printf` method from the `fmt` package formats the string and outputs it, with `%d` indicating that `result` should be formatted as an int.

## Conclusion

👍 Through the above two examples, most of the syntax of nature has been demonstrated. By this point, you have basically gotten the hang of nature. Subsequent chapters will mainly introduce some syntactical details.