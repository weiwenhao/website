---
title: Control Flow
sidebar_position: 20
---

## if Expressions

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

A space is required between `else` and `if`. The expression part `expr` following `if` must be of boolean type; implicit type conversion is not supported. Parentheses are not needed after the `if`.

To explicitly type-cast the value to a boolean, you can use `as`, like so: `if foo as bool {}`. Here, `false/0/null` will be converted to `false`, and all other expressions will be converted to `true`.

> `print/println` are built-in functions designed mainly for debugging. They only support string/bool/number types and separate multiple arguments by commas. No formatting functionality is included.

## for Expressions

### Classic Loop

```nature
var sum = 0
for int i = 1; i <= 100; i += 1 {
	sum += i
}
println('1 +..+100 = ', sum)
```

After compilation and running, the output should be:

```shell
> nature build main.n && ./main
1 +..+100 = 5050
```

> ❗️ In Nature, there's no `++` syntax; use `i += 1` instead of `i++`. Parentheses are also not required after the `for`.

### Conditional Loop

Here's another example using the sum 1+..+100:

```nature
var sum = 0
var i = 0
for i <= 100 {
	sum += i
	i += 1
}

println('1 +..+100 = ', sum)
```

If compiled correctly, the output should be the same as that of the classic loop. The expression following `for` needs to be of boolean type for the loop to work.

> 💡 This is similar to the `while` loop in C language, but Nature integrates it under the `for` keyword.

### Iteration Loop

Let's take a look at the syntax:

```nature
var list = [1, 1, 2, 3, 5, 8, 13, 21]

// When iterating over a vec structure, it generates v
for v in list {
	println(v)
}

var map = {1:10, 2:20, 3:30, 4:40}

// When iterating over a map structure, it generates k
for k in map {
    println(k)
}

// If you need both k and v, simply generate two variables
for k,v in list {
	println(k, v)
}
```

Iteration is for traversing vec/map/string types and currently only supports these three types. Note that `k, v` here is syntactic sugar for variable declaration. The complete, conceptual syntax should be `for var (k,v) in list`, which is omitted for simplicity.

Also, the scope of `k` and `v` is limited to the loop body. So, code like this will not cause conflicts:

```nature
var k = 1 
for k,v in list { 
    // ...
} 
```

### Loop Interruption and Skip

The `break` keyword is used to exit the current loop, and `continue` skips the current iteration and moves directly to the next loop evaluation. Here's how you use them:

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

The compiled output would be:

```shell
> nature build main.n && ./main
33
2500
```
