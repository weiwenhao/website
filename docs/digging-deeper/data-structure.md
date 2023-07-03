---
title: Data structure
sidebar_position: 10
---

In Nature, there are four built-in data structures: list, map, set, and tuple. Let's explore each of them.

## list

A list is a dynamically resizable array structure that supports iteration with `for` loops. Its elements are stored contiguously in memory. The syntax and API for lists are as follows:

```nature
var list = [1, 2, 3] // Declaration and initialization
var foo = list[0] // Accessing elements
list[0] = 4 // Assigning values

// Pushing elements to the end of the list
list.push(5)

// Getting the length of the list
var len = list.len() // Returns an integer

// Iterating over the list
for (k,v in list) {
    // ...
}

```

Currently, only the `push` and `len` functions are available for lists. Let's focus on type inference:

When using `var list = [1, 2, 3]`, the type of `list` is inferred based on the type of the first element in the list. All elements in the list must have the same type as the first element or be implicitly convertible to that type. In this example, since the first element is the integer literal `1`, the inferred type of the `list` is `[int]`.

Here are some important considerations when declaring lists:

```nature
var list = [] // x Unable to determine the type
[int] list = [] // v Initializing an empty list of type int

var list = [1, 1.2] // x Inconsistent types

[int] list = [1.1, 1.2] // x Inconsistent types

fn test([int] list) {} // Declaration in a function
```

## map

A map is a hash table structure with O(1) lookup time complexity. It supports iteration with `for` loops. The syntax and API for maps are as follows:

```nature
// Declaration and assignment, with type inference as {int:string}
var map = {1: 'hello', 2: 'world', 3: 'hello', 4: 'haha'}

// Declaring an empty map
{int:string} m1 = {}

var foo = map[1] // Accessing map elements
map[1] = 'hello' // Modifying or adding elements

map.del(1) // Deleting elements by key
var len = map.len() // Getting the number of elements in the map, returns an integer

// Iterating over the map
for k,v in map {
    // ...
}

fn test({int:int} map) {} // Declaration in a function
```

Currently, map keys are only supported for number and string types. More types will be supported in the future using reflection.

## set

A set is similar to a map structure, also based on a hash table. However, a set only retains the keys from the map. Currently, set elements are only supported for number and string types. Set does not support iteration with `for` loops. The syntax and API for sets are as follows:

```nature
var s = {1, 2, 3} // Declaring a set

s.add(4) // Adding elements
var exists = s.has(1)  // Checking if an element exists in the set, returns a boolean
s.del(4) // Deleting elements from the set

s[0] = 1 // x No assignment syntax
var f = s[0] // x No access syntax

fn test({int} s) {} // Declaration in a function

if ({1, 2, 3}.

```

Here are some important considerations when declaring sets:

```
{int} s = {} // x 不能使用 {} 声明一个空 set, {} 留给了空 map
{int} s = set() // v 可以通过内置函数 set 声明一个空 set，
```

> ❗Note: `set()` is a built-in function.

## tuple

A tuple is a structure that aggregates a group of elements of different types using `()`. It is similar to a struct but without keys, resulting in a more concise declaration. The syntax and API for tuples are as follows:

```nature
var tup = (1, 1.1, true) // Declaration and assignment, elements separated by commas

var tup = (1) // x A tuple should contain at least two elements

var foo = tup[0] // Accessing tuple elements, literal 0 represents the first element, and so on

var foo = tup[1 + 1] // x Expressions are not allowed when accessing tuple elements, only integer literals are allowed

tup[0] = 2 // Modifying values in a tuple
```

Tuple destructuring assignment allows simulating functions with multiple return values or quickly swapping variable values:

```nature
var list = [1, 2, 3]

// 1. Variable creation
var (foo, bar, car) = (1, 2, true) // v Multiple variables can be created in succession using the `var` keyword for type inference
(custom_type, int, bool) (foo, bar, car) = (1, 2, true) // x Type declarations are not allowed, only type inference with `var` is permitted
var (foo, (bar, car)) = (1, (2, true)) // v Nested variable creation

var (list[0], list[1]) = (2, 4) // x Expressions are not allowed on the left side of the assignment


// 2. Variable assignment
(foo, bar) = (bar, foo) // v Modifying the values of variables for quick value swapping
(foo, (bar, car)) = (2, (4, false)) // v Modifying values in nested variables
(foo, bar, car) = (2, (4, false)) // x Type mismatch between the left and right values


(list[0], list[2]) = (1, 2) // v Tuple assignment allows using left-hand side expressions like ident/ident[T]/ident.T
(1 + 1, 2 + 2) = (1, 2) // x 1 + 1 is a right-hand side expression
```

These are the basic data structures available in Nature.
