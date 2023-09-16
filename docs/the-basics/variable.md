---
title: Variables
sidebar_position: 10
---

:::info
The explanations will primarily be given through examples hereafter. The symbol `v` indicates that the syntax is correct, while `x` indicates that it is not. But remember, correct syntax doesn't mean it is recommended to write that way.
:::

```nature
var foo = 1 // v Declare variable foo and assign a value; foo's type is automatically inferred as int

var foo = 1 // x Duplicate variable declaration is not allowed within the same scope

if (true) {
	var foo = 2 // v Redefining is allowed in a different scope
}
```

Without type inference:

```nature
int foo = 1 // v
float bar = 2.2 // v
string car = 'hello world' // v Strings are enclosed with single quotes

foo = 2 // v Variables can be reassigned
foo = 'hello world' // x foo is already defined as an int type variable, string assignment is not allowed

i8 f2 = 12 // v The literal will be automatically converted based on the type
i16 f3 // x Variable declaration must include assignment
```

> 👉 [More Types](type.md)

Composite types like string/vec/map/set also require a default value at the time of declaration:

```nature
string bar = '' // v Please declare an empty string in this way
[int] baz = [] // v Declare an empty vec
var baz = [] // x, Cannot determine the specific type of vec

bar = null // x Assigning null to various types is not allowed
```

How to assign `null`?

```nature
string|null bar = null // v Declare using union type to allow bar to be null
bar = '' // v More about union types will be explored in later sections
```

💡 The `//` seen multiple times in the above code blocks is the way to do single-line comments in Nature. Nature also supports block comments through `/****/`.

```nature
/**
This is a comment block
**/
```