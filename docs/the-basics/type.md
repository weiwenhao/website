---
title: Types
sidebar_position: 30
---

In Nature, every variable has a data type. The amount of memory occupied by different types varies. Types are divided into simple types and compound types.

## Simple Types

| Keyword | Storage Size in bytes | Description                                                           |
| ------- | --------------------- | --------------------------------------------------------------------- |
| int     | -                     | Signed integer, aligned with the CPU's bit-width of the running platform, e.g., 8 bytes = 64 bits on 64-bit systems |
| i8      | 1                     | Signed 8-bit integer                                                  |
| i16     | 2                     | Signed 16-bit integer                                                 |
| i32     | 4                     | Signed 32-bit integer                                                 |
| i64     | 8                     | Signed 64-bit integer                                                 |
| uint    | -                     | Unsigned integer, aligned with the CPU's bit-width of the target platform       |
| u8      | 1                     | Unsigned 8-bit integer                                                |
| u16     | 2                     | Unsigned 16-bit integer                                               |
| u32     | 4                     | Unsigned 32-bit integer                                               |
| u64     | 8                     | Unsigned 64-bit integer                                               |
| float   | -                     | Floating-point number, aligned with the CPU's bit-width of the executing platform, e.g., 8 bytes on 64-bit CPUs, equivalent to f64 |
| f32     | 4                     | Single-precision floating-point number                                |
| f64     | 8                     | Double-precision floating-point number                                |
| bool    | 1                     | Boolean type, values are true and false                               |

Values for the `bool` type are **lowercase** true and false.

:::caution
On 64-bit systems, C language's float = f32, while in Nature, float = f64
:::

Since simple types are stored on the stack, they are passed by **value** in assignments, function parameters, etc.

## Compound Types

Compound types can be understood as structures built into Nature, composed of simple types. They don't require manual definition, for example, the `string` type is composed of multiple `u8` types.

![](https://raw.githubusercontent.com/weiwenhao/pictures/main/blogs20230627185345.png)

Most compound types are stored on the heap, and only their pointers are stored on the stack. Types stored on the heap are passed by **reference** during assignments, function parameter passing, etc., meaning that the pointer is passed, and data on the heap is neither modified nor copied.

| Type Name | Storage Location | Keyword    | Example                                   | Description                           |
| --------- | ---------------- | ---------- | ----------------------------------------- | ------------------------------------- |
| string    | heap             | string     | `string str = 'hello world'`              |                                       |
| vec       | heap             | `[T]`      | `[int] list = [1, 2, 3, 4]`               |                                       |
| map       | heap             | `{T:T}`    | `{int:string} map = {1: 'a', 2: 'b'}`     | Only supports integer/float/string as key type |
| set       | heap             | `{T}`      | `{int} set = {1, 2, 3, 4}`                |                                       |
| tup       | heap             | `(T)`      | `(int, bool) t = (1, true)`               |                                       |
| fn        | heap             | fn(T):T    | `fn(int,int):int f = fn(int a, int b):int {}` |               |
| struct    | stack            | struct {}  |                                           |                                       |
| arr       | stack            | arr<T,len> | `arr<u8,12> array = [1, 2, 3, 4]`         |                                       |

:::info
This section mainly demonstrates the ways to define types; the specifics will be discussed in subsequent chapters. If you are declaring variables, it's recommended to use the `var` keyword for type inference. The above examples use explicit type declaration for demonstration.
:::

## Special Types

### self

Used within a struct to refer to the struct itself, for example:

```nature
type square = struct {
    int length
    int width
    var area = fn(self s):int {
        return s.length * s.width
    }
}
```

Here `self` is equivalent to `ptr<square>`

### ptr

Safe pointer. Currently, Nature does not support taking pointers of variables, so its use is limited, mainly for interfacing with C language. Example:

```nature
type person = struct {}
ptr<person> = new person // v Instance of `person` is initialized on the heap using the `new` keyword
ptr<person> = null // x, safe pointers cannot be assigned null
```

### any

Syntax example:

```nature
int foo = 1
int bar = 2
any car = foo // v Implicit type conversion from `int` to `any`
int baz = car // x `any` is a compound type and cannot be assigned to `int` without type assertion
int baz = car as int // v `as` is used for type assertion here, sharing the keyword with type conversion

bool isint = car is int // v Using `is` to check the actual type stored in `any`/union types
```

### Union Types

```nature
int|null foo = null
foo = 1
```

Union types are essentially `any`, but with a more limited set of choices. In scope, larger union types can be assigned to smaller ones, like so:

```nature
int|float foo = null
int|float|null bar = foo // v `bar` has a larger type scope than `foo`

int|null baz = bar // x `bar` has a larger type scope than `baz`, assignment is not allowed

any car = baz // v `any` encompasses all types, so it can accept any value
```

### null

The type definition and value of null are both the keyword `null`.

### cptr

A general pointer type, the essence of which is of the `uint64` type. `cptr` is similar to the `void*` in C, often used for interfacing with C. For example:

```nature
string s = 'hello world'
cptr p = s.ref() // What you get is a cptr

cptr a = 0 as cptr // Any type can be cast to cptr
```

### Null pointer `cptr<T>`

`cptr<T>` is a special form of `ptr<T>`, which supports being assigned to `null`. Its essence is similar to `ptr<T>|null`, but its memory structure differs from a union type. It only occupies 8 bytes in length.

```nature
type person = struct {
    string name
}

ptr<person> p = new person{}
cptr<person> p2 = null // v
cptr<person> p3 = p // v

println(p2.name) // v
println(p3.name) // x, cptr needs to be asserted with 'as' to be used

let p3 as ptr<person> // v
println(p3.name) // v

let p3 as null // v, but runtime error occurs
```

## Type Alias

```nature
type myint = int
```

The keyword `type` can define a type alias, generally used in combination with `struct`. Type aliases also support parameters, like:

```nature
type nullable<t0> = t0|null
```

You will see the use of type parameters again in generics later.

## Type Conversion

Nature does not support implicit type conversion for the time being. Please use `expr as type` for explicit type conversion. For example, `bool a = 12 as bool`.

## Literal Types

```nature
var foo = 1 // The literal 1 defaults to int type
u8 bar = 1  // Since the literal 1 is judged to be of u8 type when assigning to bar, and the range of the literal fits within u8, 1 defaults to u8 type, and no type conversion is needed.

u8 bar = 0x1A // Hexadecimal literal

var car = 1.1 // Literal float defaults to float type

var baz = true  // bool type
var baq = false // bool type
```

> 💡 Currently does not support binary literals and octal literals.


## Strings

In Nature, strings can be enclosed by either single or double quotes, with single quotes recommended for simplicity.

Here is an example of declaring a string literal:

```nature
var str = 'hello world' // Now str is of string type, equivalent to string str = 'hello world'
```

### String Escaping

Both single and double quotes will escape the string. For example, `println('hello\nworld')` when compiled will produce:

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
\n: Newline
\r: Carriage return
\t: Tab
\b: Backspace (move cursor one position left)
\f: Form feed
\v: Vertical tab
\a: Bell (emits a beep sound)
\0: Null character (ASCII code 0)
```

### String Operations

You can use logical and comparison operators to manipulate strings:

```nature
string s = 'hello world'
string s2 = s + ' one piece'
println(s2) // hello world one piece

// String comparison
println('hello world' == 'hello world') // true
println('hello world' != 'hello world') // false
println('a' < 'b') // true
println('a' > 'b') // false
```

### String Handling

Strings and `vec` share the same data structure, so you can directly operate on `string` similar to `vec`. You can also use `as` for type conversion.

```nature
string s = 'hello world'
(s[1], s[2]) = (s[2], s[1]) // Swap string characters

println(s[0], s[1]) // Directly access items in the string
var l = s as [u8] // Convert string to [u8] type
l[0] = 110 // ASCII code for 'n'
```

When interacting with C, you usually need a C-style string, i.e., a string that ends with `\0` and does not contain header information. You can call the string method `ref()` to get a C-style string. It returns a general pointer type `cptr`.

```nature
string s = 'hello world'

cptr p = s.ref()
```

`s.ref()` gets a reference to the original string data, so modifying the data pointed by `p` in C will also affect the data in string `s`.
