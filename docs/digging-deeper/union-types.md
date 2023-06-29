---
title: 联合类型
sidebar_position: 25
---

## nullable

先来看看一个价值[十亿美元的错误](https://hinchman-amanda.medium.com/null-pointer-references-the-billion-dollar-mistake-1e616534d485) ，null 指针引用。由于 nature 中暂时不支持指针，所以用 golang 作为示例。

```go
var foo *int // 可以将值 decode 到指针类型，因为指针类型可以表达出 nil 的含义  
foo = nil  
println(foo)  
  
var a := []int{1, 2, 3}  
a = nil  
println(a)

bar := a[0]
```


在 golang 中 复合类型存在默认值 nil 同样也可以将 nil 赋值给一个复合类型，所以最后一行 `bar := a[0]` 会产生一个运行时 panic，在编译时并不能很容易的检测出这种错误。

**所以在 golang 中一个复合类型的值是不是 null 只有我们的用户自己知道**，当开发者明确知道一个复合类型不为 null 时，则可以放心的编写代码，而不需要额外的断言处理。

在实际编码中，我们总是会和弱类型的语言如 mysql/json 打交道，比如使用 mysql 存储网络 nat 类型数据时，如果 nat 还没有探测出来，我们应该如何定义 nat 的默认值呢？

>  nat 此处表示网络类型数据，有 0 ～ 4 5种类型，因为工作中经常接触，所以使用 nat 来举例子。

- 0 🤔 nat = 0 是 nat 允许的值，所以我们不能让默认值为 0
- -1 🤔 nat 总是一个大于等于 0 的值，我们不能为了存储一个数据而将代码中所有的 u8 类型改成 i8 类型
- null 😄 Yes， null 非常好的表达了值还不存在的情况。

在 golang 中应该怎么存储允许为 null 的类型呢

```go
var nat *int8 // 可以将值 decode 到指针类型，因为指针类型可以表达出 nil 的含义

// logic...
if nat == nil {
	// nil handle
}

// if foo == nil
// panic: runtime error: invalid memory address or nil pointer dereference
foo := *nat + 1 
```

当一个值允许为 null 时，golang 中通常使用指针存储这个数据，因为指针包含了 nil 的含义。当你确定一个 `*nat` 类型的数据一定不为 null 时，你可以放心的使用 `*nat` 这样的操作来读取出具体的值，而不需要担心空指针引用的问题。所以其实 golang 给了用户最大的自由，让我们能够编写出足够简洁的代码。

可以看到 golang 中其实没有明确的 nil 类型来对应与 mysql 中的 null。而是通常使用指针来模拟 nullable 的情况。并且即使是经验丰富的程序员也可能会引起 `invalid memory address or nil pointer dereference` 错误。 

所以越来越多的强类型语言已经将 null 值作为一个特殊的值进行处理，即不允许将 null 赋值给除了 null 以为的其他类型。这样虽然增加了代码编写的复杂度(需要键入更多的字符)，但是可以很大程度上避免基于 null 引用而产生的运行时错误，并且提高语言的表达性。

## union type

nature 目前不支持指针，所以不会选择和 golang 一样的方式表示 null，而是需要明确的声明允许为 null 时才能将 null 值赋值给一个变量。使用的方式便是 union type

:::info
Union types（联合类型）是一种类型系统中的概念，它允许一个值具有多个可能的类型。在许多编程语言中，包括 TypeScript 和 Python 的类型提示中，都支持联合类型。所以 union types 中虽然有多个类型，但是只有一个值。与之相对的是 Product type
:::

来看看基础使用示例

```nature
i8|null nat

// logic...

if (nat == null) {  // 这是值比较，后续将会有 nat is T 这样的类型比较
	// .. handle null
}

// 在明确知道不 nat 不为 null 的情况下可以使用类型断言语法 is 将 nat 的类型断言为 i8, 并作为 i8 类型使用
// 如果 nat 此时不是 int 类型，则会在运行时产生一个 panic
foo := (nat as i8) + 1

// 如果后续会频繁的使用，当然也可以这样赋值给一个变量进行使用
var n = nat as i8
```

再上一个版本中已经存在的 any 其实就是一种 union 了所有类型的 union type。union type 同样可以用于 type alias 中

```nature
type numbers = int|float|uint
```

复合类型不再和 golang 一样允许赋值为 null

```nature
[i8] list = null // x， null 不能赋值给 [i8] 类型
[i8] list // x， 这相当于 [i8] list = null, 所以变量的声明必须伴随着赋值

[i8]|null list // x,即使允许为 null 也应该明确进行赋值
[i8]|null list = null // v


string str // x，同上，这是不被允许的
string str = '' // v 这也是被允许的
string|null str = null // v 这是允许的

var s = str as string // v，当你明确 str 不包含 null 时，可以使用 as 语法进行断言

var (s, err) = try str as string // v, 如果你不确定，可以使用 try 进行错误拦截
```

> ❗️as 此处用于类型断言，as 关键字同时也用于强制类型转换语法


## as/is/let 语法

ts 属于运行时的动态语言，所以其包含一个求值环境模型来追踪变量当前的实际类型，所以类似这样的语法是可以做到的
```ts
let foo: number|string = "hello"

console.log(foo.length); // 5

foo = 24

console.log(foo.length) // Property 'length' does not exist on type 'number'.
```

但是在编译形语言中，基本无法在编译时确定某一个阶段变量的值时多少，除非 foo 是一个不可变量。

```nature
int|string foo = 'hello'

if (...) {
	foo = "int"
} else {
	foo = 24
}

// Is foo an int or a string?
```

所以我们需要使用类型断言与类型断言来辅助判断 union types 中的具体值与具体类型

```nature
fn foo(int|string foo) {
	// 使用 is 关键字来判断 union 是否为某一类型。 
	bool b = foo is int 

	if b {
		// 使用 as 关键字 将 foo 断言为 int 类型并将结果赋值给 f1
		// 需要注意断言后 foo 变量依旧为 union type
		int f1 = foo as int 
		return
	}

	// 声明对 int 类型进行判断并返回了，此时 foo 的类型总是 string，如果后续需要频繁使用到 foo 中的值，通常会将 foo 断言后重新赋值给一个 string 类型的变量
	var f2 = foo as string

	// 上面的赋值需要从新思考一个新的变量名称来接收局部变量 foo 的断言值，思考变量名称并不是一个容易的事情，所以通过语法糖 let 我们可以在 "当前局部作用域内临时让 foo 断言为 int 类型"
	let foo as string 

	string bar = foo + "bar" // v, foo 此时明确为 string 类型

	// x, 此时 foo 具有明确的 string 类型，所以不可以再将 int 类型赋值给 foo 变量。
	foo = 23 
}
```

上面一共引用了三个用于 union type 辅助使用的语法糖 as/is/let。前两个语法再其他语言中很常见，所以不会深入介绍。 现在再来说说 let 语法的使用。

语法 `let foo as string` 让 foo 在当前作用域中具备明确的 string 类型。其本质上就是 `var foo = foo as string`  但是实际编码中你不能使用 var 赋值，这会抛出变量的重复定义的错误。 

```nature
type foot = struct {
	int|null bar
}

var foo = foot {
	bar = 12
}

// 不能通过这种语法来让 foo.bar 作为 int 类型，因为
// var foo.bar = foo.bar as int 是一种不合法的语法声明方式
let foo.bar as int // x
var bar = foo.bar as int // v
```
