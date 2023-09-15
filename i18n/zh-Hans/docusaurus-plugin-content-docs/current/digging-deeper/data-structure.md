---
title: 数据结构
sidebar_position: 10
---

nature 中内置了常用的 4 种数据结构 list/map/set/tuple 下面来一起学习一下吧

## vec

vec 是一种能够动态扩容的数组结构，支持 for 迭代遍历，其元素在内存上连续存储。语法 api 如下

```nature
var list = [1, 2, 3] // 声明并初始化, 类型自动推导为 int
var foo = list[0] // 访问
list[0] = 4 // 赋值

// 从尾部 push 元素，push index = list.len
list.push(5)

// 获取 list 长度
var len = list.len // 返回值为 int 类型
var cap = list.cap // 获取 list 容量

// k 是 list index, v 是 list value
for (k,v in list) {
    // ..
}

// 使用原始 vec 解构进行实例化声明
vec<u8> list = vec<u8>{} // 等同于 [u8] list = [], [u8] 就是 vec<u8> 的别名

// 一般情况下我们使用 [u8] 进行声明即可，如果需要主动声明 vec 的属性时才需要通过结构体进行声明
var list = vec<u8>{len=20,cap=1024} // 声明 vec 的长度和容量

var list = vec<u8>{len=expr} // 允许使用表达式进程属性赋值，和结构体的规则是一样的
```

如 `var list = [1, 2, 3]` 在自动类型推导时，**按照 list 首个元素的类型确定 `[T]` 中 T 的元素的类型**，list 中所有元素的类型都必须遵循 T 对应的类型，或者能够隐式转换到该类型，本例中首个元素是字面量 int，所以推导出的 list 完整类型为 `[int]` 。

声明相关的注意事项

```nature
var list = [] // x 无法确定类型
[int] list = [] // v 初始化一个空的 int 类型的 list

var list = [1, 1.2] // x 类型不一致

[int] list = [1.1, 1.2] // x 同上，类型不一致

fn test([int] list) {} // 在函数中的声明
```

vec 类型详情

```
type vec<t1> = struct {
    u64 len
    u64 cap
    fn(t1) push
    fn(int, int):[t1] slice // 在原始 ref 上进行 slice
    fn([t1]):[t1] concat // 连接两个 vec，并返回一个新的 vec
    fn():cptr ref // 返回 data 部分的 ref
}
```

## arr

arr 是定长数组，和 c 语言中的数据结构一致。一般情况下不使用 arr 而是使用 vec，目前 arr 主要用于和 c 语言进行交互

```nature
arr<u8,12> array = [1, 2, 3] // 声明一个长度为 12，元素为 u8 类型的数组
array[0] = 12
array[1] = 24
var a = array[7]
```

arr 和 list 最大的区别是，arr 默认在栈上进行分配。而 list 在 stack 上仅仅保存了一个指针。以 struct 为例子

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

map 是一种 hash 表结构，具有 O(1) 时间复杂度的查找效率。 支持 for 迭代遍历，语法 api 如下

```nature
// 声明并赋值，推导类型为 {int:string}
var map = {1: 'hello', 2: 'world', 3: 'hello', 4: 'haha'}

// 声明一个空 map
{int:string} m1 = {}

var foo = map[1] // map 元素访问
map[1] = 'hello' // 修改或者添加新的元素

map.del(1) // 使用 key 删除 map 中的元素
var len = map.len // 获取 map 中元素的数量, 返回值为 int 类型

// 迭代 k = map key, v = map value
for k,v in map {
    //...
}

fn test({int:int} map) {} // 在函数中的声明
```

目前 map key 仅支持 number 和 string 两种类型，后续会基于反射开放更多类型。

## set

set 和 map 结构类似也是一个 hash 表结构，和 map 不同的是其仅保留了 map 中的 key 的部分，set 的元素目前也仅支持 number 和 string 类型，且不支持通过 for 进行迭代遍历。语法 api 如下

```nature
var s = {1, 2, 3} // v 声明一个 set 类型

s.add(4) // v 添加元素
var exists = s.contains(1)  // v 检测元素是在 set 中，返回 bool 类型
s.del(4) // v 从 set 中删除元素

s[0] = 1 // x 没有赋值语法
var f = s[0] // x 没有访问语法

fn test({int} s) {} // v 在函数中声明

if ({1, 2, 3}.contains(2)) { // v 直接在 if 语句中使用
    // ..
}
```

声明相关的注意事项

```
var s = {} as {u8} // 可以通过 as 对 set 进行类型约束
```

## tup

tup 使用 `()` 将一组不同类型的数据聚合在一个结构中，有一些类似 struct，但是相比于 struct 少了 key，所以声明上会更加的简洁， 并且 tup 是一个堆内存数据解构，在栈上只保存了一个指针。 语法 api 如下

```nature
var tup = (1, 1.1, true) // v 声明并赋值，多个元素使用逗号分隔

var tup = (1) // x tuple 中至少需要包含两个元素

var foo = tup[0] // v 字面量 0 表示 tuple 中的第一个元素，以此类推

var foo = tup[1 + 1] // x tuple 中的元素访问不允许出现表达式，只允许通过 int 字面量访问

tup[0] = 2 // v 修改 tuple 中的值
```

tup 解构赋值语法，通过该语法可以模拟函数多返回值，或者快速的进行变量交换

```nature
var list = [1, 2, 3]

// 1. 变量创建
var (foo, bar, car) = (1, 2, true) // v 值允许通过 var 进行自动类型推导来连续创建多个变量
(custom_type, int, bool) (foo, bar, car) = (1, 2, true) // x 禁止声明类型，只允许通过 var 自动类型推导
var (foo, (bar, car)) = (1, (2, true)) // v 嵌套形式的创建多个变量
var (list[0], list[1]) = (2, 4) // x 创建变量时，左侧不允许使用表达式


// 2. 变量赋值
(foo, bar) = (bar, foo) // v 修改变量 foo,bar 的值，可以进行快速变量值交换
(foo, (bar, car)) = (2, (4, false)) // v 嵌套形式修改变量的值操作
(foo, bar, car) = (2, (4, false)) // x 左值与右值的类型不匹配


(list[0], list[2]) = (1, 2) // v tuple 赋值操作中允许使用左值表达式 ident/ident[T]/ident.T 这样的表达式为左值表达式
(1 + 1, 2 + 2) = (1, 2) // x 1+1 属于右值表达式
```
