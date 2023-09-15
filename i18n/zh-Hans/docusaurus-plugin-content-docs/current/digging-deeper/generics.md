---
title: 泛型
sidebar_position: 27
---

nature 的首个泛型版本只会支持简单的功能与严格的限制，这样才能在未来有更多的可能，而没有太多的历史负担。

## 类型参数

再 type alias 中的类型复用称之为泛型其实并不准确，类型参数应该是更加准确的叫法。就像函数参数一样。在之前的语法中，我们已经有 `type alias = ...` 这是和变量定义非常相似 `var v = ...` 。 

所以类型参数，只需要进一步模仿 `fn f() = ...` 对  `type alias`  声明进行优化即可。

``` nature
type box<t> = struct {
	t width
	t length
}

type case<t> = (t, t, string)

type nullable<t> = t|null

type errorable<t> = t|errort
```

虽然类似函数调用，但是自定义类型参数部分选择了尖括号作为参数，一方面是和函数定义能够更好的区分，另外则是大多数编程语言都使用了尖括号作为泛型参数。使用起来也非常的简单。

```nature
// 对 box 进行实例化，这是一个 i8 类型的小盒子
var b = box<i8> {
	width = 13,
	length = 26
}

case<u8> c = (1, 1, "hello world")

nullable<i8> foo = null
foo = 12
```

下面是一个实际的测试用例，你可以直接运行查看输出

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

// 实例化 box
var b = box<i8, i16> {
    width = 5,
    length = 10
}

println('self area=', b.area())
println('area=', b.width * b.length as i8)
```

编译并执行

```shell
> nature build main.n && main
null
123
self area=50
area=50
```


## 泛型函数

我们先来看看 golang 和 rust 中的一个简单的泛型的使用示例

```go title=golang
package main

import "fmt"

type Case[T int | uint | float32] struct {
	Width  T
	Length T
}

// 泛型函数定义
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

     // 在参数足够的情况下， rust 可以自主推断出类型。
     let icase: Case<i16> = Case {
        width: 10,
        length: 20,
    };

    println!("{:?}", area(&fcase));
    println!("{:?}", area(&icase));
}
```

泛型函数的设计基本上已经有成熟的方式，大家也都能接受这种方式，所以 nature 也将沿用并参考这些设计方案。

不过考虑到函数声明是非常频繁的操作，所以我**不希望在函数声明中进一步增加语法**，如泛型参数语法 `<T, E>` ，所以我们选择简单地将泛型函数中的类型参数与约束进行提取到 type alias 语法中。

```nature
// 定义了一个泛型类型 numbert, 并限定了其约束
type numbert = gen i8|i16|i32|i64|u8|u16|u32|u64|f32|f64

// 使用 numbert 类型声明函数
fn sum(numbert a, numbert b):numbert {
	return a + b
}
```

gen 关键字只能用于 type alias 中，其可以理解为 generic，但是更准确的含义应该是 generate。 

泛型是属于编译器前端的工作， nature 中会解析 sum 函数中的所有泛型参数，进行求积后生成所有的可能类型的函数。对于泛型函数而言的调用也不再是一个 search 的过程，而是一个 params type match 的过程。

:::caution
泛型函数的声明只能用于全局函数中。
:::


能不能编写如 `type t0 = generic any`，让此时 t0 不受到任何的约束? 🙅‍♂️ 这是不允许的。

所以类型约束是必须的? Yes，类型约束让我们知道这是一个强类型且具有约束的函数调用，而不是 caller 传入什么类型，callee 就泛化成什么类型。

泛形函数本质上依旧是协助开发者减少重复代码编写的特性，让开发者不需要编写如 sumi8(),sumi16(),sumi32() ... 这样重复的工作。所以我们不能将类型当做一种可以传入的参数，如 `fn box(t v)`，这会使得类型约束变得可有可无。

而类型参数，如 `nullable<t>` 再调用时总是会传入一个确定的类型，所以不违反类型系统的原则。类似 nullable 这种声明，t 可以是任意值，而不需要受到任何的约束，因为类型本来就是用来约束值的，所以没有必要重复的约束。

相反的，类似 `fn box(t v)` 声明中的 t 部分如果是基于 caller 传递的类型，那这样的声明没有任何意义，不如直接声明成 `fn box(v)` 。

再来看看泛型函数的具体使用示例

```nature title=mod.n
// 定义一个 gen 类型
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

// 这里为了测试，所以进行了重复的声明测试。
type numbert2 = gen i8|i16|i32|i64|u8|u16|u32|u64|f32|f64
fn area(box<numbert, numbert2> b):numbert {
    return b.width * b.length as numbert
}
```

使用 mod

```nature title=main.n
import 'mod.n'

// int 
var r1 = mod.sum(12, 13)
println(r1)

 // 默认是 float = f64
var r2 = mod.sum(12.5, 13.5)
println(r2)

var r3 = mod.sum(2.5 as f32, 3.7 as f32)
println(r3)


// 由首个元素的类型决定整个 list 的类型，为 [int]
var l = [1, 2, 3, 4, 5]
var r4 = mod.list_sum(l)
println(r4)

var f = [1.2 as f32, 2.3, 3.4]
var r5 = mod.list_sum(f)
println(r5)

// 泛型函数作为 type_param 参数，此时会优先进行泛型函数的展开
var b = mod.box<i8, i16> {
    width = 5,
    length = 8
}

var r6 = mod.area(b)
println(r6)
```

编译并执行后我们能够得到如下输出

```shell
> nature build main.n && main
25
26.000000
6.2000000
15
6.900000
40
```


## 重载

nature 中的重载虽然一开始就在规划中，但是没想到这么快就能开发出来。 重载是泛型函数开发过程中的附加产物，能够通过对参数类型的重载来声明同名的**全局函数**。由于参数的类型前置，所以后续很有可能开放类似 haskell 一样的值的重载。 另外请慎重使用重载函数，其大概率会影响代码的可读性。

使用示例

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

调用

```nature title=main.n
import 'mod.n'  
  
mod.foo(12 as i8)  
  
mod.foo(11 as i8, 3.1415926)  
  
mod.foo(12 as i16)  
  
mod.foo()
```

输出

```shell
> nature build main.n && main
this is foo(i8 a)
this is foo(i8 a, f64 b)
this is foo(i16 a)
this is foo()
```
