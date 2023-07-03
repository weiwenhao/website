---
title: Types
sidebar_position: 30
---

In Nature, every variable has a data type, and different types occupy different amounts of memory. Types can be categorized into simple types and composite types.

## Simple Types

|Keyword|Storage Size (bytes)|Description|
|---|---|---|
|int|-|Signed integer type, size is consistent with the CPU bit width of the target platform. For example, on a 64-bit system, `int` occupies 8 bytes = 64 bits.|
|i8|1|Signed integer type|
|i16|2|Signed integer type|
|i32|4|Signed integer type|
|i64|8|Signed integer type|
|uint|-|Unsigned integer type, size is consistent with the CPU bit width of the target platform.|
|u8|1|Unsigned integer type|
|u16|2|Unsigned integer type|
|u32|4|Unsigned integer type|
|u64|8|Unsigned integer type|
|float|-|Floating-point type, size is consistent with the CPU bit width of the target platform. For example, on a 64-bit system, `float` occupies 8 bytes, equivalent to `f64`.|
|f32|4|Single-precision floating-point type|
|f64|8|Double-precision floating-point type|
|bool|1|Boolean type, with values `true` and `false`|

The values of the `bool` type are **lowercase** `true` and `false`.

:::caution
In a 64-bit system, C language uses `float` for `f32`, while in Nature, `float` corresponds to `f64`.
:::

Since simple types are stored outside the heap, all operations involving assignment and function parameter passing are done by **value**.

## Composite Types

Composite types are structures built into Nature, combining simple types. They do not need to be defined manually. For example, the `string` type consists of multiple `u8` types.

Currently, composite types are stored in the heap, and the stack stores a pointer to the corresponding heap's starting address. The diagram below illustrates this:

![](https://raw.githubusercontent.com/weiwenhao/pictures/main/blogs20230627185345.png)

Since the main body of composite types is stored in the heap, the stack stores a pointer instead. Therefore, all operations involving assignment and function parameter passing are done by **reference**, passing the pointer without modifying or copying the data in the heap.

|Type Name|Keyword|Example|Description|
|---|---|---|---|
|string|string|`string str = 'hello world'`||
|list|`[T]`|`[int] list = [1, 2, 3, 4]`||
|map|`{T:T}`|`{int:string} map = {1: 'a', 2: 'b'}`|Key type only supports `integer`/`float`/`string`|
|set|`{T}`|`{int} set = {1, 2, 3, 4}`||
|tuple|`(T)`|`(int, bool) t = (1, true)`||
|struct|struct|-|It is generally not used directly; it will be explained in detail when custom types are introduced later.|
|fn|fn(T):T|`fn(int,int):int f = fn(int a, int b) {}`||

:::info
Here, we mainly demonstrate the way to define types. The specific usage will be explained in subsequent sections. If it is variable declaration, it is recommended to use the `var` keyword for type inference. The examples above use explicit type declarations for demonstration purposes. 
:::

## Special Types

### self

When declaring a function directly in a struct, `self` is used to refer to the struct itself. Example:

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
any car = foo // Implicit type conversion occurs here, converting the int type `foo` to any type
int baz = car // Implicit conversion is not allowed for compound types like any; you need to use type assertions to perform assignments
int baz = car as int // `as` is used here as an assert type assertion, it is shared with type conversion using the keyword `as`

bool isint = car is int // The `is` keyword can be used to determine the actual storage type of `any`/union type
```


### 联合类型

```
int|null foo = null
foo = 1
```

Union types are essentially `any`, but with a smaller selection range. If the range is included, it is allowed to assign a union type with a larger range to a union type with a smaller range. For example:

```
int|float foo = null
int|float|null bar = foo // `bar` has a type range larger than `foo`

int|null baz = bar // Assigning `bar` to `baz` is not allowed because `bar` has a larger type range than `baz`; you need to use `any` to accept any value

any car = baz // `any` can accept any type, so it can accept any value
```

### null

The type definition and value of `null` are both the keyword `null`.

## Type Aliases

```nature
type myint = int
```

The `type` keyword can be used to define custom types, usually used in combination with `struct`. Type aliases also support parameters, such as:

```nature
type nullable<t0> = t0|null
```

Type parameters will be seen again in generics.


## ## Type Casting

Nature currently does not support implicit type conversion. Please use the `expr as type` syntax for explicit type conversion. For example, `bool a = 12 as bool`.

Currently, the target of type conversion only supports simple types, such as `bool` and `number`. All types can be converted to `bool`, and `number` conversion is only supported when the original type is also a `number` primitive type.

## Literal Types

```nature
var foo = 1 // The literal `1` defaults to the int type
u8 bar = 1 // Since the literal `1` is assigned to `bar` and the type of `bar` is determined to be `u8`, and the range of the literal matches the range of `u8`, the `1` is automatically treated as the `u8` type without the need for explicit type conversion.

var car = 1.1 // The floating-point literal defaults to the float type

var baz = true  // bool type
var baq = false // bool type
```

> 💡 Binary literals and hexadecimal literals are not supported at the moment. The syntax is still under development.

### String Literals

String literals are enclosed in single quotes `''`. Currently, only this form of string literal declaration is supported.

```nature
var str = 'hello world'
```
