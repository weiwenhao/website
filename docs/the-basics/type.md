---
title: 类型
sidebar_position: 30
---

在 nature 中每一个变量都有一个数据类型，不同的类型在内存中占用的大小是不相同的。类型分为简单类型与复合类型。

## 简单类型

| 关键字 | 存储大小 byte | 说明                                                                       |
| ------ | ------------- | -------------------------------------------------------------------------- |
| int    | -             | 有符号整型，与运行平台的 cpu 位宽一致,比如 64 位下 int 占用 8byte = 64bit  |
| i8     | 1             | 有符号整型                                                                 |
| i16    | 2             | 有符号整型                                                                 |
| i32    | 4             | 有符号整型                                                                 |
| i64    | 8             | 有符号整型                                                                 |
| uint   | -             | 无符号整型，与目标平台 cpu 位宽 一致                                       |
| u8     | 1             | 无符号整型                                                                 |
| u16    | 2             | 无符号整型                                                                 |
| u32    | 4             | 无符号整型                                                                 |
| u64    | 8             | 无符号整型                                                                 |
| float  | -             | 浮点数，与执行平台的 cpu 位宽一致,比如 64 位 cpu 下占用 8byte, 与 f64 一致 |
| f32    | 4             | 单精度浮点数                                                               |
| f64    | 8             | 双精度浮点数                                                               |
| bool   | 1             | 布尔类型，值有 true 和 false                                               |

bool 类型的值是**小写**的 true 和 false。

:::caution
在 64 位系统下，c 语言的 float = f32, 而 nature 中 float = f64
:::

由于简单类型在堆外存储，所以其在各种赋值操作，函数参数传递等操作时都是**值传递**。

## 复合类型

复杂类型可以理解为由简单类型组合并内置在 nature 中的结构，其不需要手动定义，比如 string 类型，其就是由多个 u8 类型组成。

![](https://raw.githubusercontent.com/weiwenhao/pictures/main/blogs20230627185345.png)

大部分复合类型的主体都存储在了堆中，堆外存储的是指针。存储在 heap 中类型在各种赋值操作，函数参数传递等操作时都是**引用传递**，也就是传递了指针，不会修改或复制堆上的数据

| 类型名称 | 存储位置 | 关键字     | 示例                                          | 说明                                |
| -------- | -------- | ---------- | --------------------------------------------- | ----------------------------------- |
| string   | heap     | string     | `string str = 'hello world'`                  |                                     |
| vec      | heap     | `[T]`      | `[int] list = [1, 2, 3, 4]`                   |                                     |
| map      | heap     | `{T:T}`    | `{int:string} map = {1: 'a', 2: 'b'}`         | key 类型仅支持 integer/float/string |
| set      | heap     | `{T}`      | `{int} set = {1, 2, 3, 4}`                    |                                     |
| tup      | heap     | `(T)`      | `(int, bool) t = (1, true)`                   |                                     |
| fn       | heap     | fn(T):T    | `fn(int,int):int f = fn(int a, int b):int {}` |                                     |
| struct   | stack    | struct {}  |                                               |                                     |
| arr      | stack    | arr<T,len> | `arr<u8,12> array = [1, 2, 3, 4]`             |                                     |

:::info
这里主要演示类型的定义方式，具体使用将会在后续章节说明。另外如果是变量声明的话推荐用 var 关键字进行类型推导，上面是演示示例所以直接使用了类型声明。
:::

## 特殊类型

### self

在结构体中直接声明函数时，用来引导结构体自身，示例

```nature
type square = struct {
    int length
    int width
    var area = fn(self s):int {
        return s.length * s.width
    }
}
```

此时 self 等同于 `ptr<square>`

### ptr

安全指针，nature 中目前不支持对变量的取指针操作，所以使用的场景有限，主要用于和 c 语言进行交互。使用示例

```nature
type person = struct {}
ptr<person> = new person // v 通过 new 关键字进行实例化 person, 此时 person 将会在堆中进行初始化
ptr<person> = null // x, 安全指针不允许赋值为 null
```

### any

语法示例

```nature
int foo = 1
int bar = 2
any car = foo // v 这里发生累隐式类型转换，将 int 类型的 foo 转换成了 any 类型
int baz = car // x any 时复合类型，不能赋值给 int 类型的 baz 变量，这里需要借助类型断言来进行赋值
int baz = car as int // v as 此时表示 assert 类型断言，其与类型转换共用关键字 as

bool isint = car is int // v 使用 is 关键字可以对 any/联合类型当前的实际存储类型进行判断
```

### 联合类型

```nature
int|null foo = null
foo = 1
```

联合类型本质就是 any，只是具有更小的选择范围。再范围包含的情况下，可以允许大范围的联合类型赋值给小范围的联合类型，如

```nature
int|float foo = null
int|float|null bar = foo // v bar 的类型范围大于 foo

int|null baz = bar // x bar 的类型范围大于 baz, 所以不允许赋值

any car = baz // v any 包含所有类型，所以可以接受任意值

```

### null

null 的类型定义和值都是关键字 null

### cptr

一种通用的指针类型，指针的本质就是 uint64 类型。ctpr 和 c 语言的 `void*` 是类似的东西，所以常用于与 c 语言进行交互。 比如

```nature
string s = 'hello world'
cptr p = s.ref() // 得到的就是一个 cptr

cptr a = 0 as cptr // 任何类型都可以转换为 cptr 类型
```

### null 指针 `cptr<T>`

`cptr<T>` 是 `ptr<T>` 的特殊形式，其支持赋值为 null, 其本质类似与 `ptr<T>|null` 但是在内存结构上与 union type 不同。其至占用 8byte 长度。

```nature
type person = struct {
    string name
}

ptr<person> p = new person{}
cptr<person> p2 = null // v
cptr<person> p3 = p // v

println(p2.name) // v
println(p3.name) // x, cptr 需要经过 as 断言才能够使用

let p3 as ptr<person> // v
println(p3.name) // v

let p3 as null // v, 但是会出现运行时错误

```

## 类型别名

```nature
type myint = int
```

使用关键字 type 可以定义类型别名，一般与 struct 组合使用。类型别名同样也支持参数，如

```nature
type nullable<t0> = t0|null
```

后续在泛型中会再次见到类型参数的使用。

## 类型转换

nature 暂时不支持隐式类型转换。请使用 `expr as type` 的方式进行显示的类型转换。如 `bool a = 12 as bool`

## 字面量类型

```nature
var foo = 1 // 字面量 1 默认为 int 类型
u8 bar = 1 // 由于字面量 1 在赋值时判断到 bar 为 u8 类型，且字面量范围符合 u8 范围，所以此时 1 默认为 u8 类型，并不需要进行类型转换。

u8 bar = 0x1A // 16 进制字面量

var car = 1.1 // 字面量浮点型默认为 float 类型

var baz = true  // bool 类型
var baq = false // bool 类型

```

> 💡 暂时不支持 2 进制字面量与 8 进制字面量

## 字符串

nature 可以通过单引号或者双引号来包裹字符串，推荐使用单引号更加简洁。

这是声明一个字符串字面量的示例

```nature
var str = 'hello world' // 此时 str 是 string 类型, 等同于 string str = 'hello world'
```

### 字符串转义

无论是单引号还是双引号都会对字符串进行转义操作， 例如 `println('hello\nworld')` 编译输出将会得到

```shell
> ./main
hello
world#
```

目前支持的转义字符有

```
\': 单引号字符
\": 双引号字符
\\: 反斜杠字符
\n: 换行符
\r: 回车符
\t: 制表符（Tab键）
\b: 退格符（光标左移一格）
\f: 换页符
\v: 垂直制表符
\a: 响铃符（发出一声“哔”）
\0: 空字符（NULL字符，ASCII码为0）
```

### 字符串运算

可以通过逻辑运算符号与比较运算符操作字符串

```nature
string s = 'hello world'
string s2 = s + ' one piece'
println(s2) // hello world one piece


// 字符串比较操作
println('hello world' == 'hello world') // true
println('hello world' != 'hello world') // false
println('a' < 'b') // true
println('a' > 'b') // false
```

### 字符串处理

字符串和 vec 具有相同的数据解构，所以可以直接对 string 进行类似 vec 的操作，也可以通过 as 进行类型转换。

```nature
string s = 'hello world'
(s[1], s[2]) = (s[2], s[1]) // 字符串交换

println(s[0], s[1]) // 可以直接访问 string 中的 item
var l = s as [u8] // 将 string 转换成 [u8] 类型
l[0] = 110 // ascii 编码 n
```

在与 c 语言交互时，通常需要一个 c 类型的字符串，也就是 `\0` 结尾的字符串，且不包含 header 信息。可以调用字符串属性方法 ref() 得到 c 语言字符串。其返回一个通用指针类型 cptr

```nature
string s = 'hello world'

cptr p = s.ref()
```

s.ref() 得到的是对原有字符串数据的引用，所以在 c 中修改 p 指针中的数据也会影响字符串 s 中的数据
