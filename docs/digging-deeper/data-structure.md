---
title: Data Structures
sidebar_position: 10
---

Nature includes four commonly used built-in data structures: list/map/set/tuple. Let's learn about them below.

## vec

`vec` is a dynamically resizable array structure that supports `for` loop iteration. Its elements are stored contiguously in memory. The syntax API is as follows:

```nature
var list = [1, 2, 3] // Declaration and initialization, type automatically inferred as int
var foo = list[0] // Access
list[0] = 4 // Assignment

// Push an element from the end, push index = list.len
list.push(5)

// Get the length of the list
var len = list.len // Return value is of int type
var cap = list.cap // Get the capacity of the list

// k is list index, v is list value
for (k, v in list) {
    // ..
}

// Use the original vec structure for instantiation declaration
vec<u8> list = vec<u8>{} // Equivalent to [u8] list = [], [u8] is an alias for vec<u8>

// In general, we can declare using [u8], only when we need to explicitly declare vec attributes do we need to declare through the struct
var list = vec<u8>{len=20, cap=1024} // Declare the length and capacity of vec

var list = vec<u8>{len=expr} // Allows the use of expressions for attribute assignment, the rules are the same as for structs
```

When automatically inferring the type, as in `var list = [1, 2, 3]`, **the type of the first element in the list determines the type `T` in `[T]`**. All elements in the list must follow the type corresponding to T, or be implicitly convertible to that type. In this example, the first element is a literal int, so the inferred list complete type is `[int]`.

Declaration-related considerations:

```nature
var list = [] // x Cannot determine type
[int] list = [] // v Initialize an empty list of type int

var list = [1, 1.2] // x Inconsistent types

[int] list = [1.1, 1.2] // x Same as above, inconsistent types

fn test([int] list) {} // Declaration in a function
```

Details of vec type:

```
type vec<t1> = struct {
    u64 len
    u64 cap
    fn(t1) push
    fn(int, int):[t1] slice // Slice on the original ref
    fn([t1]):[t1] concat // Concatenate two vecs and return a new vec
    fn():cptr ref // Return the ref of the data part
}
```

## arr

`arr` is a fixed-length array, consistent with the data structure in C language. Generally, `arr` is not used, and `vec` is preferred. Currently, `arr` is mainly used for interaction with C language.

```nature
arr<u8,12> array = [1, 2, 3] // Declare an array of length 12 and element type u8
array[0] = 12
array[1] = 24
var a = array[7]
```

The biggest difference between `arr` and `list` is that `arr` is allocated on the stack by default, while `list` only saves a pointer on the stack. For example, using `struct`:

```nature
type t1 = struct {
    arr<u8,12> array
}

var size = sizeof(t1) // 12 * 1 = 12byte

type t2 = struct {
    [u8] list
}

var size = sizeof(t2) // list is pointer size = 8byte
```

## map

`map` is a hash table structure with O(1) time complexity for lookups. It supports `for` loop iteration. The syntax API is as follows:

```nature
// Declare and assign, inferred type is {int:string}
var map = {1: 'hello', 2: 'world', 3: 'hello', 4: 'haha'}

// Declare an empty map
{int:string} m1 = {}

var foo = map[1] // Access map element
map[1] = 'hello' // Modify or add a new element

map.del(1) // Delete an element from the map using a key
var len = map.len // Get the number of elements in the map, return value is of int type

// Iteration k = map key, v = map value
for k, v in map {
    //...
}

fn test({int:int} map) {} // Declaration in a function
```

Currently, `map` keys only support `number` and `string` types. More types will be opened based on reflection in the future.

## set

`set` is similar to `map` and is also a hash table structure. The difference is that it only retains the `key` part of the `map`. Currently, `set` elements only support `number` and `string` types and do not support iteration through `for`. The syntax API is as follows:

```nature
var s = {1, 2, 3} // v Declare a set type

s.add(4) // v Add an element
var exists = s.contains(1)  // v Check if an element is in the set, returns bool type
s.del(4) // v Delete an element from the set

s[0] = 1 // x No assignment syntax
var f = s[0] // x No access syntax

fn test({int} s) {} //

 v Declaration in a function

if ({1, 2, 3}.contains(2)) { // v Use directly in an if statement
    // ..
}
```

Declaration-related considerations:

```
var s = {} as {u8} // Can use as to constrain the set type
```

## tup

`tup` uses `()` to aggregate a group of different types of data into one structure. It is somewhat similar to `struct`, but compared to `struct`, it lacks a `key`, so the declaration will be more concise. Also, `tup` is a heap memory data structure, and only a pointer is saved on the stack. The syntax API is as follows:

```nature
var tup = (1, 1.1, true) // v Declare and assign, multiple elements separated by commas

var tup = (1) // x tuple must contain at least two elements

var foo = tup[0] // v Literal 0 represents the first element in the tuple, and so on

var foo = tup[1 + 1] // x Element access in tuple does not allow expressions, only int literals are allowed

tup[0] = 2 // v Modify the value in the tuple
```

Tuple destructuring assignment syntax, through which you can simulate multiple return values from functions, or quickly swap variables:

```nature
var list = [1, 2, 3]

// 1. Variable creation
var (foo, bar, car) = (1, 2, true) // v Values can be automatically type-inferred to create multiple variables in sequence
(custom_type, int, bool) (foo, bar, car) = (1, 2, true) // x Type declaration is not allowed, only automatic type inference through var is allowed
var (foo, (bar, car)) = (1, (2, true)) // v Nested form of creating multiple variables
var (list[0], list[1]) = (2, 4) // x When creating variables, the left side cannot use expressions

// 2. Variable assignment
(foo, bar) = (bar, foo) // v Modify the values of variables foo, bar, can quickly swap variable values
(foo, (bar, car)) = (2, (4, false)) // v Nested form of modifying variable values
(foo, bar, car) = (2, (4, false)) // x Left value and right value types do not match

(list[0], list[2]) = (1, 2) // v tuple assignment operation allows the use of left-value expressions ident/ident[T]/ident.T are such left-value expressions
(1 + 1, 2 + 2) = (1, 2) // x 1+1 is a right-value expression
```
