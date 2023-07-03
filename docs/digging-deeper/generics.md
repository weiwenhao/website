---
title: Generics
sidebar_position: 27
---

The first version of generics in Nature will only support basic functionality and strict restrictions, allowing for more possibilities in the future without too much historical burden.

## Type Parameters

The term "generics" used to describe type reuse in type aliases is not accurate; "type parameters" is a more precise term. It is similar to function parameters. In the previous syntax, we already have `type alias = ...`, which is very similar to variable definitions `var v = ...`.

So, type parameters can be further optimized by emulating the `fn f() = ...` syntax for `type alias` declarations.

```nature
type box<t> = struct {
	t width
	t length
}

type case<t> = (t, t, string)

type nullable<t> = t|null

type errorable<t> = t|errort
```

Although similar to function calls, custom type parameters are enclosed in angle brackets. On one hand, this helps distinguish them from function definitions, and on the other hand, most programming languages use angle brackets as generic parameters. It is also straightforward to use.

```nature
// Instantiating box as a small box of type i8
var b = box<i8> {
	width = 13,
	length = 26
}

case<u8> c = (1, 1, "hello world")

nullable<i8> foo = null
foo = 12
```

Here is an actual test case that you can run to see the output.

```nature title=main.n
// nullable
type nullable<t> = t|null

nullable<[i8]> foo = null
println(foo)

foo = [1 as i8, 2, 3]
let foo as [i8]
println(foo[0], foo[1], foo[2])

// struct box
type box<t0, t1> = struct {
	t0 width
	t1 length
	var area = fn(self s):t0 {
	    return s.width * s.length as i8
	}
}

// Instantiating box
var b = box<i8, i16> {
    width = 5,
    length = 10
}

println('self area=', b.area())
println('area=', b.width * b.length as i8)
```

Compile and execute:

```shell
> nature build main.n && main
null
123
self area=50
area=50
```


## Generic Functions

Let's first take a look at a simple example of using generics in Go and Rust.

```go title=golang
package main

import "fmt"

type Case[T int | uint | float32] struct {
	Width  T
	Length T
}

// Generic function definition
func area[T int | uint | float32](c Case[T]) T {
	return c.Width * c.Length
}

func main() {
	fcase := Case[float32]{
		Width:  1.15,
		Length: 2.15,
	}

	icase := Case[int]{
		Width:  10,
		Length: 20,
	}

	fmt.Printf("%f\n", area(fcase))
	fmt.Printf("%d\n", area(icase))
}
```


```rust title=rust
struct Case<T> {
    width: T,
    length: T,
}

fn area<T: std::ops::Mul<Output = T> + Copy>(case: &Case<T>) -> T {
    case.width * case.length
}

fn main() {
    let fcase = Case {
        width: 1.15f32,
        length: 2.15f32,
    };

     let icase: Case<i16> = Case {
        width: 10,
        length: 20,
    };

    println!("{:?}", area(&fcase));
    println!("{:?}", area(&icase));
}
```

Generic function design has already matured, and most people have accepted these design patterns. Therefore, Nature will continue to use and reference these design approaches.

However, considering that function declarations are frequent operations, I do not want to further increase the syntax in function declarations, such as generic parameter syntax `<T, E>`. Instead, I choose to extract type parameters and constraints from generic functions into type alias syntax.

```nature
// Define a generic type numbert and specify its constraints
type numbert = gen i8|i16|i32|i64|u8|u16|u32|u64|f32|f64

// Use numbert type to declare a function
fn sum(numbert a, numbert b): numbert {
	return a + b
}
```

The "gen" keyword can only be used in type aliases and can be understood as "generic," but its more accurate meaning is "generate."

Generics are a feature of the compiler's front end. In Nature, all generic parameters in the "sum" function will be parsed, and the compiler will generate functions for all possible types. Calling a generic function is no longer a search process; it becomes a "params type match" process.

:::caution
Generic function declarations can only be used in global functions. 
:::


Is it possible to write something like `type t0 = generic any` to allow "t0" to have no constraints? 🙅‍♂️ This is not allowed.

So, are type constraints necessary? Yes, type constraints let us know that it is a strongly-typed function call with constraints, rather than allowing the caller to pass any type and have the callee generalize to that type.

Generic functions fundamentally assist developers in reducing duplicate code writing, eliminating the need to write repetitive functions like "sumi8()," "sumi16()," "sumi32()," and so on. Therefore, we cannot treat types as parameters, such as `fn box(t v)`. This would make type constraints optional.

On the other hand, type parameters, such as `nullable<t>`, will always be passed a specific type when called, so they do not violate the principles of the type system. Declarations like "nullable" imply that "t" can be any value and does not need any constraints because types are originally used to constrain values, so there is no need for redundant constraints.

In contrast, if the "t" part in a declaration like `fn box(t v)` is based on the type passed by the caller, such a declaration has no meaning and is better off declared as `fn box(v)`.

Now let's take a look at some specific examples of using generic functions.

```nature title=mod.n
// Define a gen type
type numbert = gen i8|i16|i32|i64|u8|u16|u32|u64|f32|f64

fn sum(numbert a, numbert b): numbert {
    return a + b
}

fn list_sum([numbert] list): numbert {
    numbert sum = 0
   	for k,v in list {
   		sum += v
   	}
   	return sum
}

type box<t0, t1> = struct {
	t0 width
	t1 length
}

// This is a duplicate declaration for testing purposes.
type numbert2 = gen i8|i16|i32|i64|u8|u16|u32|u64|f32|f64
fn area(box<numbert, numbert2> b): numbert {
    return b.width * b.length as numbert
}
```

Using the "mod" module:

``` title=main.n
import 'mod.n'

// int 
var r1 = mod.sum(12, 13)
println(r1)

// Default is float = f64
var r2 = mod.sum(12.5, 13.5)
println(r2)

var r3 = mod.sum(2.5 as f32, 3.7 as f32)
println(r3)


// The type of the list is determined by the type of the first element, [int]
var l = [1, 2, 3, 4, 5]
var r4 = mod.list_sum(l)
println(r4)

var f = [1.2 as f32, 2.3, 3.4]
var r5 = mod.list_sum(f)
println(r5)

// Generic function as a type_param parameter, the generic function will be expanded first
var b = mod.box<i8, i16> {
    width = 5,
    length = 8
}

var r6 = mod.area(b)
println(r6)
```

After compiling and executing, we get the following output:

```shell
> nature build main.n && main
25
26.000000
6.2000000
15
6.900000
40
```


## Overloading

Although overloading was planned from the beginning in Nature, it is surprising that it was developed so quickly. Overloading is an additional feature that arises from the development of generic functions, allowing the declaration of functions with the same name but different parameter types. Since the type of the parameters is specified upfront, it is likely that value overloading similar to Haskell will be introduced in the future. However, please use overloaded functions with caution, as they can significantly impact code readability.

Example usage:

```mod.n title=mod.n
fn foo(i8 a) {
    println("this is foo(i8 a)")
}

fn foo(i16 a) {
    println("this is foo(i16 a)")
}

fn foo() {
    println("this is foo()")
}

fn foo(i8 a, f64 b) {
    println("this is foo(i8 a, f64 b)")
}
```

Calling the functions:

```nature title=main.n
import 'mod.n'  
  
mod.foo(12 as i8)  
  
mod.foo(11 as i8, 3.1415926)  
  
mod.foo(12 as i16)  
  
mod.foo()
```

Output:

```shell
> nature build main.n && main
this is foo(i8 a)
this is foo(i8 a, f64 b)
this is foo(i16 a)
this is foo()
```
