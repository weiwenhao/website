---
title: Control Flow
sidebar_position: 20
---

## if Expression

Example:
```nature
int foo = 23

if foo > 100 {
    print('foo > 100')
    
} else if foo > 20 {
    print('foo > 20')
    
} else {
    print('else handle')
}
```

In the `else if` statement, spaces are required between the keywords. The expression after `if` must be of type `bool`, and implicit type conversion is not supported. The expression after `if` does not need to be enclosed in parentheses.

`if foo as bool {}` can be used to explicitly cast the value to a `bool`. `false/0/null` will be cast to `false`, while all other expressions will be cast to `true`.

> `print/println` are built-in functions that support printing `string/bool/number` type data. Multiple arguments are separated by commas, and no formatting is available. They are mainly used for debugging purposes.

## for Expression

### Classic Loop

```nature
var sum = 0
for int i = 1; i <= 100; i += 1 {
	sum += i
}
println('1 +..+100 = ', sum)
```

After compiling and running the code, the following result will be obtained:

```shell
> nature build main.n && ./main
1 +..+100 = 5050
```

> ❗️Note that nature does not have the `++` syntax; use `i += 1` instead of `i++`. The expression after `for` does not need to be enclosed in parentheses.

### Conditional Loop

Let's do the same example using 1+..100 to demonstrate the comparison:

```nature
var sum = 0
var i = 0
for i <= 100 {
	sum += i
	i += 1
}

println('1 +..+100 = ', sum)
```

The output will be the same as the classic loop. In this case, the expression after `for` must be of type `bool` to perform a conditional loop.

> 💡  It is similar to the `while` loop in C, but nature has integrated it into the `for` keyword.

### Iteration Loop

Now, let's look at the relevant syntax:

```nature
var list = [1, 1, 2, 3, 5, 8, 13, 21]

// When iterating over the `list` structure, the variable `v` represents each element in the list.
for v in list {
	println(v)
}

var map = {1:10, 2:20, 3:30, 4:40}

// When iterating over the `map` structure, the variable `k` represents each key in the map.
for k in map {
    println(k)
}

// If you need both the key and value, you can define two variables within the loop parentheses.
for k,v in iter {
	println(k, v)
}
```

Iteration is used to traverse list and map structures, and currently, only these two types of structures are supported. Note that `k,v` is just a variable definition syntax sugar. The complete syntax concept would be `for var (k,v) in list`, but that is too complex, so the `var ()` part is omitted when parsing the syntax. More detailed explanations on the syntax of tuple will be provided later.

The scope of `k` and `v` is limited to the loop. So, for example:

```nature
var k = 1 
for k,v in list { 
    // ...
} 
```

The `k` and `v` here are new variable definitions, but their scope is limited to the loop and will not conflict with the previous `var k = 1`.

### Loop Interruption and Skipping

The `break` keyword is used to exit the current loop, while the `continue` keyword is used to skip the current iteration and proceed to the next iteration. Here are some examples:

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

After compiling and running the code, the output will be:

```shell
> nature build main.n && ./main
33
2500
```