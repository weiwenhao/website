---
title: Data Structures
sidebar_position: 10
---

In nature, there are four built-in data structures: list, map, set, and tuple. Let's learn about them together.

## list

A list is a dynamically resizable array structure that supports for-loop iteration. Its elements are stored continuously in memory. The syntax API is as follows:

```nature
var list = [1, 2, 3] // Declaration and initialization
var foo = list[0] // Accessing an element
list[0] = 4 // Assigning a value

// Pushing elements from the tail
list.push(5)

// Getting the length of the list
var len = list.len() // Returns an int value

// k is the list index, v is the list value
for (k, v in list) {
    // ...
}
```

When using auto-type inference, the type of `[T]` is determined based on the type of the first element in the list. All elements in the list must adhere to the type `T` or be implicitly convertible to that type. In the example `var list = [1, 2, 3]`, since the first element is an integer, the inferred type of the list is `[int]`.

Some important notes on declarations:

```nature
var list = [] // x Type cannot be determined
[int] list = [] // v Initialize an empty list of type int

var list = [1, 1.2] // x Inconsistent types

[int] list = [1.1, 1.2] // x Same as above, inconsistent types

fn test([int] list) {} // Declaration in a function signature
```

With the help of forced type conversion syntax, some hack-like operations can be achieved before macros are introduced.

```nature
var list = [] as [u8] // v Declare an empty list with elements of type u8

// v Declare a fixed-length list with length and capacity both equal to 5.
// Since list.length = 5, executing list.push will increase the length of the list and set the element at the sixth position.
var list = [] as [u8, 5]

// This is a new built-in function that converts the list to a C language array form, equivalent to uint8_t list[5] in C.
// It is commonly used for interacting with C code.
// Note that this operation is unsafe, and modifying the data pointed to by the `p` pointer will directly affect the data in the list.
cptr p = list.raw()
```

## map

A map is a hash table structure with an O(1) time complexity for lookup operations. It also supports for-loop iteration. The syntax API is as follows:

```nature
// Declaration and assignment, with inferred type {int:string}
var map = {1: 'hello', 2: 'world', 3: 'hello', 4: 'haha'}

// Declaring an empty map
{int:string} m1 = {}

var foo = map[1] // Accessing an element in the map
map[1] = 'hello' // Modifying or adding a new element

map.del(1) // Deleting an element from the map using the key
var len = map.len() // Getting the number of elements in the map, returns an int value

// Iterating over k = map key, v = map value
for k, v in map {
    // ...
}

fn test({int:int} map) {} // Declaration in a function signature
```

Currently, map keys only support number and string types, and more types will be supported based on reflection in the future.

## set

A set is similar to a map in that it is a hash table structure. However, it only retains the keys of the map and does not have values. Currently, set elements also support only number and string types, and it does not support for-loop iteration. The syntax API is as follows:

```nature
var s = {1, 2, 3} // Declaration of a set

s.add(4) // Adding an element
var exists = s.has(1) // Checking if an element exists in the set, returns a bool value
s.del(4) // Deleting an element from the set

s[0] = 1 // x There is no assignment syntax for sets
var f = s[0] // x There is no access syntax for sets

fn test({int} s) {} // Declaration in a function signature

if ({1, 2, 3}.has(2)) { // Using the set directly in an if statement
    // ...
}
```

Some important notes on declarations:

```nature
{int} s = {} // x Cannot use {} to declare an empty set, {} is reserved for empty maps
{int} s = set() // v Can use the built-in function set() to declare an empty set
```

> ❗set is a built-in function

## tuple

A tuple aggregates a group of elements of different types using `()`. It is somewhat similar to a struct but without keys, making its declaration more concise. The syntax API is as follows:

```nature
var tup = (1, 1.1, true) // Declaration and assignment, elements separated by commas

var tup = (1) // x A tuple must contain at least two elements

var foo = tup[0] // Accessing the first element of the tuple using the literal 0, and so on

var foo = tup[1 + 1] // x Expressions are not allowed when accessing tuple elements, only int literals are allowed

tup[0] = 2 // v Modifying the value in the tuple
```

Tuple destructuring assignment allows for simulating functions with multiple return values or quickly swapping variable values:

```nature
var list = [1, 2, 3]

// 1. Variable creation
var (foo, bar, car) = (1, 2, true) // v Values can be automatically inferred and used to create multiple variables using var
(custom_type, int, bool) (foo, bar, car) = (1, 2, true) // x Declaring types is not allowed, only var is allowed for auto-type inference
var (foo, (bar, car)) = (1, (2, true)) // v Nested variable creation

// 2. Variable assignment
(foo, bar) = (bar, foo) // v Modifying the values of variables foo and bar, allowing for quick variable swapping
(foo, (bar, car)) = (2, (4, false)) // v Nested variable assignment
(foo, bar, car) = (2, (4, false)) // x Types of left and right sides don't match

(list[0], list[2]) = (1, 2) // v In tuple assignment, left-hand side expressions ident/ident[T]/ident.T are allowed as left-hand side expressions
(1 + 1, 2 + 2) = (1, 2) // x 1+1 is a right-hand side expression and is not allowed
```