---
title: Types
sidebar_position: 30
---

In nature, every variable has a data type, and different types occupy different sizes in memory. Types are classified into simple types and compound types.

## Simple Types

| Keyword | Storage Size (bytes) | Description                                                       |
| ------- | -------------------- | ----------------------------------------------------------------- |
| int     | -                    | Signed integer, size is consistent with the platform's CPU        |
| i8      | 1                    | Signed integer                                                    |
| i16     | 2                    | Signed integer                                                    |
| i32     | 4                    | Signed integer                                                    |
| i64     | 8                    | Signed integer                                                    |
| uint    | -                    | Unsigned integer, size is consistent with the platform's CPU      |
| u8      | 1                    | Unsigned integer                                                  |
| u16     | 2                    | Unsigned integer                                                  |
| u32     | 4                    | Unsigned integer                                                  |
| u64     | 8                    | Unsigned integer                                                  |
| float   | -                    | Floating-point number, size is consistent with the platform's CPU |
| f32     | 4                    | Single-precision floating-point number                            |
| f64     | 8                    | Double-precision floating-point number                            |
| bool    | 1                    | Boolean type, values are `true` and `false`                       |

Note that the values of the `bool` type are lowercase `true` and `false`.

:::caution
In a 64-bit system, in C language, `float` corresponds to `f32`, while in nature, `float` corresponds to `f64`.
:::

Since simple types are stored outside the heap, all operations, such as assignment and function parameter passing, are **passed by value**.

## Compound Types

Compound types can be understood as structures composed of simple types and built-in structures in nature. They do not need to be manually defined. For example, the `string` type is composed of multiple `u8` types.

Currently, compound types are stored in the heap, and the stack stores a pointer that points to the starting address of the heap. See the example below:

![](https://raw.githubusercontent.com/weiwenhao/pictures/main/blogs20230627185345.png)

Since the main body of compound types is stored in the heap, and the stack stores a pointer, all operations, such as assignment and function parameter passing, are **passed by reference**, which means that the pointer is passed, and the data on the heap is not modified or copied.

| Type Name | Keyword | Example                                       | Description                                                                                                                 |
| --------- | ------- | --------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| string    | string  | `string str = 'hello world'`                  |                                                                                                                             |
| list      | `[T]`   | `[int] list = [1, 2, 3, 4]`                   |                                                                                                                             |
| map       | `{T:T}` | `{int:string} map = {1: 'a', 2: 'b'}`         | Key type only supports `integer`/`float`/`string`                                                                           |
| set       | `{T}`   | `{int} set = {1, 2, 3, 4}`                    |                                                                                                                             |
| tuple     | `(T)`   | `(int, bool) t = (1, true)`                   |                                                                                                                             |
| struct    | struct  | -                                             | Generally, we do not directly use the `struct` type. It will be explained in detail when custom types are introduced later. |
| fn        | fn(T):T | `fn(int,int):int f = fn(int a, int b):int {}` |                                                                                                                             |

:::info
Here, we mainly demonstrate the definition of types. The specific use cases will be explained in later sections. If it is a variable declaration, it is recommended to use the `var` keyword for type inference. The above examples directly used type declarations for demonstration purposes.
:::

## Special Types

### self

When declaring functions directly in a struct, `self` is used to refer to the struct itself. Example:

```nature
type square = struct {
    int length
    int width
    var area = fn(self s):int {
        return s.length * s.width
    }
}
```

### any

Syntax example:

```nature
int foo = 1
int bar = 2
any car = foo // Implicit type conversion happens here, converting the int type `foo` to the any type
int baz = car // Error: any is a compound type, and it cannot be assigned to the int type baz variable. You need to use type assertion for this assignment
int baz = car as int // Type assertion is used here with the `as` keyword

bool isint = car is int // The `is` keyword can be used to check the actual stored type of any/union types
```

### Union Types

```
int|null foo = null
foo = 1
```

Union types are essentially `any`, but they have a smaller scope of choices. If the scope of the union type includes another union type, a union type with a larger range can be assigned to a union type with a smaller range. For example:

```
int|float foo = null
int|float|null bar = foo // The type range of bar is larger than that of foo

int|null baz = bar // Error: The type range of bar is larger than that of baz, so it is not allowed to assign.

any car = baz // The `any` type includes all types, so it can accept any value.

```

### null

`null` is both a type and a value, and it represents a null reference.

### cptr

A generic pointer type. Pointers are essentially `uint`. `cptr` is similar to `void*` in the C language and is commonly used for interacting with C code. For example:

```nature
string s = 'hello world'
cptr p = s.raw() // Obtain a cptr, more about s.raw() will be explained later
```

## Type Aliases

```nature
type myint = int
```

Type aliases can be defined using the `type` keyword. They are usually used in combination with `struct`. Type aliases also support parameters, such as:

```nature
type nullable<t0> = t0|null
```

Type parameters will be introduced again in the section on generics.

## Type Conversion

Implicit type conversion is not supported in nature. Use `expr as type` for explicit type conversion. For example, `bool a = 12 as bool`.

Currently, type conversion targets only support simple types, such as `bool/number`. All types can be converted to `bool` type. Number can only be converted when it is originally of type `number`.

## Literal Types

```nature
var foo = 1 // The literal 1 defaults to the int type
u8 bar = 1 // Since the literal 1 is determined to be of type u8 during assignment to bar, and the literal range fits within u8, no type conversion is needed.

u8 bar = 0x1A // Hexadecimal literal

var car = 1.1 // The floating-point literal defaults to the float type

var baz = true  // bool type


var baq = false // bool type

```

> 💡 Binary literals and octal literals are not currently supported.

## Strings

In nature, strings can be enclosed in either single quotes or double quotes, but using single quotes is recommended for simplicity.

Here's an example of declaring a string literal:

```nature
var str = 'hello world' // Here, str is of type string, equivalent to `string str = 'hello world'`
```

### String Escaping

Both single and double quotes perform string escaping. For example, `println('hello\nworld')` will output:

```shell
> ./main
hello
world#
```

The currently supported escape characters are:

```
\': Single quote character
\": Double quote character
\\: Backslash character
\n: Newline character
\r: Carriage return character
\t: Tab character
\b: Backspace character (moves the cursor one position to the left)
\f: Form feed character
\v: Vertical tab character
\a: Alert character (produces a "beep" sound)
\0: Null character (NULL character, ASCII code is 0)
```

### String Operations

Strings can be operated on with logical and comparison operators:

```nature
string s = 'hello world'
string s2 = s + ' one piece'
println(s2) // hello world one piece


// String comparison operations
println('hello world' == 'hello world') // true
println('hello world' != 'hello world') // false
println('a' < 'b') // true
println('a' > 'b') // false
```

### String Manipulation

Converting a string to a list allows easy iteration and replacement of strings. A string can only be converted to `[u8]` through type coercion. Tip: At this time, the list shares the heap memory with the string!

```nature
string s = 'hello world'

var l = s as [u8]
l[0] = 110 // ASCII code for 'n'
(l[1], l[2]) = (l[2], l[1]) // String swapping
println(s) // nlelo world
println(l as string) // nlelo world
```

When interacting with the operating system, you often need a C-type string, which is a string ending with `\0` and does not contain header information. You can get a C-string from a string by calling the `raw` method:

```nature
string s = 'hello world'

cptr p = s.raw()
```

`s.raw()` returns a reference to the original string data, so modifying the data in the `p` pointer will also affect the data in the `s` string.
