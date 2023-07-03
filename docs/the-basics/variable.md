---
title: Variables
sidebar_position: 10
---

:::info
The following examples are used to explain the concepts. In these examples, `v` indicates that the syntax is correct, and `x` indicates that the syntax is incorrect. However, please note that just because the syntax is correct does not mean it is recommended to write code that way.
:::

```nature
var foo = 1 // v Declare variable foo and assign a value to it; the type of foo is automatically inferred as int

var foo = 1 // x It is not allowed to declare the same variable in the same scope

if (true) {
	var foo = 2 // v It is allowed to declare the same variable in a different scope
}
```

Explicit Type Declaration

```nature
int foo = 1 // v
float bar = 2.2 // v
string car = 'hello world' // v Strings are enclosed in single quotes

foo = 2 // v Variables can be reassigned
foo = 'hello world' // x foo is already defined as an int variable, so assigning a string is not allowed

i8 f2 = 12 // v Literal values can be automatically converted based on the type
i16 f3 // x Variable declaration must include an assignment

```

> 👉 [More Types](type.md)

Composite types like string, list, map, and set also need to be assigned default values during declaration.

```nature
string bar = '' // v Please use this format to declare an empty string
[int] baz = [] // v Declare an empty list

bar = null // x It is not allowed to assign null to various types
```

How to assign a value of null?

```nature
string|null bar = null // v Use a union type declaration to allow bar to have a value of null
bar = '' // v Union types will be covered in more detail in subsequent sections
```


>  💡 The double forward slashes `//` in the code snippets above represent single-line comments in Nature. Currently, this is the only supported way of writing comments.
