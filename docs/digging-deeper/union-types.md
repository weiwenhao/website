---
title: Union Types
sidebar_position: 25
---

## nullable

Let's start by looking at [a billion-dollar mistake](https://hinchman-amanda.medium.com/null-pointer-references-the-billion-dollar-mistake-1e616534d485): null pointer references. Since Nature doesn't support pointers, we'll use Golang as an example.

```go
var foo *int // Values can be decoded into pointer types, as pointer types can express the meaning of nil
foo = nil
println(foo)

var a := []int{1, 2, 3}
a = nil
println(a)

bar := a[0]
```


In Golang, composite types have a default value of nil, and nil can be assigned to a composite type. Therefore, the last line, `bar := a[0]`, will cause a runtime panic. This error is not easily detectable during compilation.

**In Golang, whether a composite type's value is null is known only to the developer**. When a developer is certain that a composite type is not null, they can write code confidently without additional assertion handling.

In actual coding, we often deal with weakly typed languages such as MySQL/JSON. For example, when storing network NAT (Network Address Translation) data in MySQL, how should we define the default value for NAT if it has not been detected yet?

> Here, NAT refers to network type data, which has 5 types ranging from 0 to 4. Since we often encounter it in work, let's use NAT as an example.

- 0 🤔 NAT = 0 is an allowed value, so we cannot set the default value to 0.
- -1 🤔 NAT is always a value greater than or equal to 0. We cannot change all u8 types to i8 types just to store one data.
- null 😄 Yes, null effectively expresses the case where the value doesn't exist yet.

So, how should we store a nullable type in Golang?

```go
var nat *int8 // Values can be decoded into pointer types, as pointer types can express the meaning of nil

// logic...
if nat == nil {
    // handle nil
}

// if foo == nil
// panic: runtime error: invalid memory address or nil pointer dereference
foo := *nat + 1
```

When a value is allowed to be null, Golang typically uses pointers to store that data because pointers encapsulate the meaning of nil. When you are certain that a `*nat` type data is not null, you can confidently use `*nat` to access its specific value without worrying about null pointer references. Therefore, Golang provides developers with maximum freedom to write concise code.

As we can see, Golang doesn't have a specific null type corresponding to null in MySQL. Instead, pointers are often used to simulate nullable situations. Even experienced programmers can inadvertently cause an "invalid memory address or nil pointer dereference" error.

As a result, more and more strongly typed languages treat null as a special value and do not allow null to be assigned to types other than null. This increases the complexity of code writing but significantly reduces runtime errors caused by null references and improves the expressiveness of the language.

## union type

Nature currently doesn't support pointers like Golang does to represent null, so null values need to be explicitly declared to be assigned to a variable. The way to achieve this is through union types.

:::info
Union types are a concept in type systems that allow a value to have multiple possible types. Many programming languages, including TypeScript and Python's type hints, support union types. In union types, although there are multiple types, there is only one value. It is the opposite of Product type.
:::

Let's take a look at basic usage examples.

```nature
i8|null nat

// logic...

if nat is null {
    // handle null
}

// If it is known that nat is not null, you can use the type assertion syntax "as" to assert the type of nat as i8
// However, it should be noted that if nat is not an int type at this point, it will cause a panic at runtime
// Of course, you can use "try" to intercept runtime errors
foo := (nat as i8) + 1

// If you will frequently use it later, you can assign it to a variable for ease of use
// But you cannot use the same name "nat" here, so you need to come up with a new name
var n = nat as i8
```

In the previous version, there already exists the any type, which is actually a union of all types. Union types can also be used in type aliases.

```nature
type numbers = int|float|uint
```

In Nature, composite types cannot be assigned null values.

```nature
[i8] list = null // x, null cannot be assigned to the [i8] type
[i8] list // x, this is equivalent to [i8] list = null, so variable declaration must be accompanied by assignment

[i8]|null list // x, even if null is allowed, it should be explicitly assigned
[i8]|null list = null // v


string str // x, same as above, this is not allowed
string str = '' // v, this is allowed
string|null str = null // v, this is allowed

var s = str as string // v, when you are certain that str does not contain null, you can use the "as" syntax for assertion

var (s, err) = try str as string // v, if you are not sure, you can use "try" to intercept runtime errors
```

> ❗️ "as" here is used for type assertion. The "as" keyword is also used for forced type conversion syntax.

## as/is/let Syntax

TypeScript is a dynamically-typed language at runtime and includes an evaluation environment model to track the current actual type of variables. Therefore, similar syntax as the one shown below is possible in TypeScript:
```ts
let foo: number|string = "hello"

console.log(foo.length); // 5

foo = 24

console.log(foo.length) // Property 'length' does not exist on type 'number'.
```

However, in compiled languages, it is almost impossible to determine the type of a variable at a certain stage during compilation, unless `foo` is an immutable variable.

```nature
int|string foo = 'hello'

if (...) {
	foo = 'int'
} else {
	foo = 24
}

// Is foo an int or a string?
```

Therefore, we need to use type assertions to assist in determining the specific value and type in union types.

```nature
fn foo(int|string foo) {
    // Use the "is" keyword to determine the currently stored type in union types
    if foo is int {
        // Use the "as" keyword to assert foo as an int type and assign the result to f1
        // It should be noted that after the assertion, the variable foo still has a union type
        int f1 = foo as int
        return
    }

    // After declaring and returning for the int type above, foo is always a string type. If you will frequently use the value in foo, it is usually asserted and assigned to a new string variable.
    var f2 = foo as string

    // Here, we need to think of a new variable name to receive the asserted value of the local variable foo. Thinking of a variable name is not an easy task, so through the "let" syntax sugar, we can "temporarily let foo be asserted as an int type within the current local scope"
    let foo as string

    string bar = foo + "bar" // v, foo is now explicitly of string type

    // x, foo now has a specific string type, so an int type cannot be assigned to foo variable.
    foo = 23
}
```

The above code introduces three syntactic sugars used to assist in using union types: as/is/let. The first two syntaxes are common in other languages, so they won't be discussed in depth. Now let's talk about the usage of the let syntax.

The syntax `let foo as string` allows foo to have an explicit string type in the current scope. Essentially, it is equivalent to `var foo = foo as string`. However, in actual coding, you cannot use var for assignment, as it will throw an error of variable redefinition. It is worth noting that

```nature
type foot = struct {
    int|null bar
}

var foo = foot {
    bar = 12
}

// It is not possible to declare foo.bar as an int type using this syntax because
// var foo.bar = foo.bar as int is an illegal syntax declaration
let foo.bar as int // x
var bar = foo.bar as int // v
```
