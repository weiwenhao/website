---
title: Union Types
sidebar_position: 25
---

## Nullable

Let's first look at a [billion-dollar mistake](https://hinchman-amanda.medium.com/null-pointer-references-the-billion-dollar-mistake-1e616534d485), null pointer references. Since Nature currently doesn't support pointers, we'll use Golang as an example.

```go
var foo *int // The value can be decoded to a pointer type because the pointer type can express the meaning of nil
foo = nil
println(foo)

var a := []int{1, 2, 3}
a = nil
println(a)

bar := a[0]
```

In Golang, composite types have a default value of nil, and you can also assign nil to a composite type. Therefore, the last line `bar := a[0]` will produce a runtime panic, which is not easily detectable at compile time.

**So, in Golang, whether a composite type is null is only known to the user themselves.** When developers are sure that a composite type is not null, they can confidently write code without additional assertions.

## Union Type

Nature currently does not support pointers, so it won't choose the same way as Golang to represent null. Instead, you need to explicitly declare that null is allowed before you can assign a null value to a variable. The mechanism used is union type.

:::info
Union types are a concept in type systems that allow a value to have multiple possible types. Many programming languages, including TypeScript and Python's type hints, support union types. So although union types have multiple types, they only have one value. The opposite of this is Product type.
:::

Here's a basic usage example:

```nature
i8|null nat

// logic...

if nat is null {
	// .. handle null
}

// When you are sure that nat is not null, you can use the type assertion syntax 'as' to assert the type of nat as i8
// However, note that if nat is not of type int at this time, a runtime panic will occur
// Of course, you can use 'try' for runtime error interception
foo := (nat as i8) + 1
```

Union types can also be used in type aliases:

```nature
type numbers = int|float|uint
```

Nature composite types are not allowed to be assigned null:

```nature
[i8] list = null // x, null cannot be assigned to type [i8]
[i8] list // x, this is equivalent to [i8] list = null, so variable declaration must be accompanied by assignment

[i8]|null list // x, even if null is allowed, it should be explicitly assigned
[i8]|null list = null // v
```

> ❗️The 'as' here is used for type assertion. The 'as' keyword is also used for forced type conversion syntax.

## as/is/let Syntax

In TypeScript, which is a dynamically typed language at runtime, you can do something like this:

```ts
let foo: number|string = "hello"

console.log(foo.length); // 5

foo = 24

console.log(foo.length) // Property 'length' does not exist on type 'number'.
```

But in compiled languages, it's almost impossible to determine the type of a variable at a certain stage during compile time, unless foo is an immutable variable.

```nature
int|string foo = 'hello'

if (...) {
	foo = 'int'
} else {
	foo = 24
}

// Is foo an int or a string?
```

So we need to use type assertions to assist in determining the specific value and type within union types:

```nature
fn foo(int|string foo) {
	// Use the 'is' keyword to determine the current saved type in union types
	if foo is int  {
		// Use the 'as' keyword to assert foo as type int and assign the result to f1
		// Note that after the assertion, the variable foo is still a union type
		int f1 = foo as int 
		return
	}

	// Declare that int type is checked and returned, so the type of foo is always string now
	var f2 = foo as string

	// Use the 'let' syntax to "temporarily assert foo as type string in the current local scope"
	let foo as string 

	string bar = foo + "bar" // v, foo is now explicitly of type string

	// x, foo now has an explicit string type, so you can no longer assign an int type to the foo variable
	foo = 23 
}
```

The above example introduced three syntax sugars for assisting with union types: as/is/let. The first two are common in other languages, so they won't be discussed in detail. Now let's talk about the 'let' syntax.

The syntax `let foo as string` allows foo to have an explicit string type in the current scope. Essentially, it's the same as `var foo = foo as string`, but you can't use 'var' for assignment in actual coding, as it would throw a variable redefinition error.

```nature
type foot = struct {
	int|null bar
}

var foo = foot {
	bar = 12
}

// You can't use this syntax to assert foo.bar as an int type because
// var foo.bar = foo.bar as int is an illegal syntax declaration
let foo.bar as int // x
var bar = foo.bar as int // v
```