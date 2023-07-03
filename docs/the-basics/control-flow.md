---
title: Control Flow
sidebar_position: 20
---

## if Expression

Example:

```nature
var foo = 23

if foo > 100 {
    print('foo > 100')
    
} else if foo > 20 {
    print('foo > 20')
    
} else {
    print('else handle')
}
```

There should be a space between `else` and `if`. The expression in `if expr` must be a boolean expression and does not support implicit type conversion. The expression following `if` does not need to be enclosed in parentheses.

`if foo as bool {}` can be used to explicitly convert a value to a boolean. `false/0/null` will be converted to `false`, while all other expressions will be converted to `true`.

> `print` and `println` are built-in functions used to print string/boolean/number data. Multiple arguments are separated by commas, and there is no formatting capability. They are mainly used for debugging purposes.

## for Expression

### Classic Loop

```nature
var sum = 0
for int i = 1; i <= 100; i += 1 {
	sum += i
}
println('1 +..+100 = ', sum)
```

After compiling and running, you will get the following result:

```shell
> nature build main.n && ./main
1 +..+100 = 5050
```

> ❗️There is no `++` syntax in nature. Please use `i += 1` instead of `i++`. The expression following `for` does not need to be enclosed in parentheses.

### Conditional Loop

Using the analogy of summing numbers from 1 to 100:

```nature
var sum = 0
var i = 0
for i <= 100 {
	sum += i
	i += 1
}

println('1 +..+100 = ', sum)
```

If compiled correctly, it will produce the same output as the classic loop. In this case, the expression following `for` must be a boolean expression in order to perform a conditional loop.

> 💡 It is actually equivalent to the `while` expression in the C language. Nature integrates it into the `for` keyword.


### Iteration Loop

Let's take a look at the related syntax:
```nature
var list = [1, 1, 2, 3, 5, 8, 13, 21]

for k,v in list {
	println(k, ' ', v)
}

// Omitting the value
for (k in list) {
	println(k)
}
```

Iteration is used for traversing list and map structures, and currently, only these two structures are supported. Note that `k,v` is actually a syntactic sugar for variable declaration. The complete syntax conceptually should be `for var (k,v) in list`, but that would be too complex, so `var ()` and `var (expr)` declarations are omitted during syntax parsing, which will be explained in detail in the tuples section later.

Furthermore, the scope of `k` and `v` is within the loop. So, for example:

```nature
var k = 1 
for k,v in list { 
    // ...
} 
```

The `k` and `v` here are new variable declarations, but their scope is limited to the loop and will not conflict with `var k = 1`.

### Loop Termination and Skipping

The `break` keyword is used to exit the current loop, while `continue` skips the current iteration and immediately proceeds to the loop condition check. Here are some examples:

```nature
var list = [1, 1, 2, 3, 5, 8, 13, 21]
var sum = 0
for k, v in list {
    if sum > 20 {
        break
    }
    sum += v
}
println(sum)


var sum2 = 0
for int i = 0; i < 100; i += 1 {
    if i % 2 == 0 {
        continue
    }

    sum2 += i
}
println(sum2)
```

After compiling, the output will be:

```shell
> nature build main.n && ./main
33
2500
```