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

复合类型目前阶段数据都存储在堆(heap) 中，复合类型在栈(stack) 中存储的是一个指针，指向对应的 heap 的起始地址。如下图示例

![](https://raw.githubusercontent.com/weiwenhao/pictures/main/blogs20230627185345.png)

由于复合类型的主体都存储在了堆中，堆外存储的是指针。所以其在各种赋值操作，函数参数传递等操作时都是**引用传递**，也就是传递了指针，不会修改或复制堆上的数据

| 类型名称 | 关键字  | 示例                                          | 说明                                                       |
| -------- | ------- | --------------------------------------------- | ---------------------------------------------------------- |
| string   | string  | `string str = 'hello world'`                  |                                                            |
| list     | `[T]`   | `[int] list = [1, 2, 3, 4]`                   |                                                            |
| map      | `{T:T}` | `{int:string} map = {1: 'a', 2: 'b'}`         | key 类型仅支持 integer/float/string                        |
| set      | `{T}`   | `{int} set = {1, 2, 3, 4}`                    |                                                            |
| tuple    | `(T)`   | `(int, bool) t = (1, true)`                   |                                                            |
| struct   | struct  | -                                             | 一般不会直接使用 struct 类型，后续自定义类型时再做详细介绍 |
| fn       | fn(T):T | `fn(int,int):int f = fn(int a, int b):int {}` |                                                            |

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

```
int|null foo = null
foo = 1
```

联合类型本质就是 any，只是具有更小的选择范围。再范围包含的情况下，可以允许大范围的联合类型赋值给小范围的联合类型，如

```
int|float foo = null
int|float|null bar = foo // v bar 的类型范围大于 foo

int|null baz = bar // x bar 的类型范围大于 baz, 所以不允许赋值

any car = baz // v any 包含所有类型，所以可以接受任意值

```

### null

null 的类型定义和值都是关键字 null

## 类型别名

```nature
type myint = int
```

使用关键字 type 可以自定义类型，一般与 struct 组合使用。类型别名同样也支持参数，如

```nature
type nullable<t0> = t0|null
```

后续在泛型中会再次见到类型参数的使用。


## 类型转换

nature 暂时不支持隐式类型转换。请使用 `expr as type` 的方式进行显示的类型转换。如 `bool a = 12 as bool` 

目前隐式类型转换的目标仅支持简单类型，如 bool/number。所有的类型都可以转换为 bool 类型。 number 仅支持原始类型同样为 number 时才能够转换。

## 字面量类型

```nature
var foo = 1 // 字面量 1 默认为 int 类型
u8 bar = 1 // 由于字面量 1 在赋值时判断到 bar 为 u8 类型，且字面量范围符合 u8 范围，所以此时 1 默认为 u8 类型，并不需要进行类型转换。

var car = 1.1 // 字面量浮点型默认为 float 类型

var baz = true  // bool 类型
var baq = false // bool 类型

```

> 💡 2 进制字面量与 16 进制字面量暂不支持，语法开发中。

### 字符串字面量

字符串字面量使用单引号 `''` 包裹，目前也仅支持这一种字符串字面量的声明方式

```nature
var str = 'hello world'
```
