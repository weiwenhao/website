---
title: Generics
sidebar_position: 27
---

The first version of generics in Nature will only support basic features and strict limitations. This approach allows for more possibilities in the future without carrying too much historical burden.

## Type Parameters

Referring to type reuse in type aliases as generics is not accurate. A more accurate term would be type parameters, similar to function parameters. In previous syntax, we already have `type alias = ...`, which is very similar to variable definition `var v = ...`.

So for type parameters, we just need to further mimic `fn f() = ...` to optimize the `type alias` declaration.

``` nature
type box<t> = struct {
	t width
	t length
}

type case<t> = (t, t, string)

type nullable<t> = t|null

type errorable<t> = t|errort
```

Although it resembles function invocation, custom type parameters use angle brackets for parameters. This helps distinguish it from function definitions and is also consistent with most programming languages that use angle brackets for generic parameters. Usage is also straightforward.

```nature
// Instantiate box, this is an i8 type small box
var b = box<i8> {
	width = 13,
	length = 26
}

case<u8> c = (1, 1, "hello world")

nullable<i8> foo = null
foo = 12
```

Below is an actual test case; you can run it directly to see the output.

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

// Instantiate box
var b = box<i8, i16> {
    width = 5,
    length = 10
}

println('self area=', b.area())
println('area=', b.width * b.length as i8)
```

Compile and execute

```shell
> nature build main.n && main
null
123
self area=50
area=50
```

## Generic Functions

First, let's look at a simple example of using generics in Golang and Rust.

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

    // Rust can infer the type when enough parameters are provided.
    let icase: Case<i16> = Case {
        width: 10,
        length: 20,
    };

    println!("{:?}", area(&fcase));
    println!("{:?}", area(&icase));
}
```

The design of generic functions is already mature, and everyone can accept this approach. Therefore, Nature will also adopt and refer to these design solutions.

However, considering that function declarations are very frequent operations, I **do not want to further increase syntax in function declarations**, such as generic parameter syntax `<T, E>`. So we choose to simply extract the type parameters and constraints of generic functions into the type alias syntax.

```nature
// Defined a generic type numbert, and limited its constraints
type numbert = gen i8|i16|i32|i64|u8|u16|u32|u64|f32|f64

// Use numbert type to declare function
fn sum(numbert a, numbert b):numbert {
	return a + b
}
```

The `gen` keyword can only be used in type aliases. It can be understood as generic, but a more accurate meaning should be generate.

Generics are part of the compiler frontend's work. In Nature, the `sum` function will parse all generic parameters, generate all possible types of functions after multiplication, and the call to the generic function is no longer a search process, but a params type match process.

:::caution
The declaration of generic functions can only be used in global functions.
:::

Can you write something like `type t0 = generic any`, so that t0 is not subject to any constraints? 🙅‍♂️ This is not allowed.

So are type constraints mandatory? Yes, type constraints let us know that this is a strongly typed and constrained function call, rather than a function that generalizes to whatever type the caller passes in.

The essence of generic functions is still to assist developers in reducing repetitive code writing, so that developers do not need to write repetitive work like sumi8(), sumi16(), sumi32()... Therefore, we cannot treat types as parameters that can be passed in, like `fn box(t v)`. This would make type constraints optional.

And type parameters, like `nullable<t>`, always pass in a specific type when called, so it does not violate the principles of the type system. Similar to the `nullable` declaration, `t` can be any value without any constraints, because types are originally used to constrain values, so there is no need to constrain them repeatedly.

On the contrary, if the `t` part in declarations like `fn box(t v)` is based on the type passed by the caller, then such a declaration has no meaning. It's better to declare it directly as `fn box(v)`.

Let's take a look at the specific use example of generic functions.

```nature title=mod.n
// Define a gen type
type numbert = gen i8|i16|i32|i64|u8|u16|u32|u64|f32|f64

fn sum(numbert a, numbert b):numbert {
    return a + b
}

fn list_sum([numbert] list):numbert {
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

// For testing purposes, redundant declarations are made here.
type numbert2 = gen i8|i16|i32|i64|u8|u16|u32|u64|f32|f64
fn area(box

<numbert, numbert2> b):numbert {
    return b.width * b.length as numbert
}
```

Use mod

```nature title=main.n
import 'mod.n'

// int 
var r1 = mod.sum(12, 13)
println(r1)

 // Default is float = f64
var r2 = mod.sum(12.5, 13.5)
println(r2)

var r3 = mod.sum(2.5 as f32, 3.7 as f32)
println(r3)


// The type of the entire list is determined by the first element, as [int]
var l = [1, 2, 3, 4, 5]
var r4 = mod.list_sum(l)
println(r4)

var f = [1.2 as f32, 2.3, 3.4]
var r5 = mod.list_sum(f)
println(r5)

// Generic function as type_param parameter, it will first expand the generic function
var b = mod.box<i8, i16> {
    width = 5,
    length = 8
}

var r6 = mod.area(b)
println(r6)
```

After compiling and executing, we can get the following output

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

Overloading in Nature was planned from the beginning, but it was surprising that it could be developed so quickly. Overloading is a byproduct of the development process of generic functions. It allows you to declare same-named **global functions** by overloading parameter types. Since the types of parameters are prefixed, similar overloading of values like in Haskell may be opened up in the future. Please use overloaded functions cautiously as they are likely to affect code readability.

Usage example

```nature title=mod.n
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

Invocation

```nature title=main.n
import 'mod.n'  
  
mod.foo(12 as i8)  
  
mod.foo(11 as i8, 3.1415926)  
  
mod.foo(12 as i16)  
  
mod.foo()
```

Output

```shell
> nature build main.n && main
this is foo(i8 a)
this is foo(i8 a, f64 b)
this is foo(i16 a)
this is foo()
```
