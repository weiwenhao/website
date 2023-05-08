---
title: 数据结构
sidebar_position: 10
---


nature 中内置了常用的 4 种数据结构 list/map/set/tuple 下面来一起学习一下吧

## list

list 是一种动态扩容数组结构，支持 for 迭代遍历，其元素在内存上连续存储。语法 api 如下

```nature
var list = [1, 2, 3] // v 声明并初始化
var foo = list[0] // 访问
list[0] = 4 // 赋值

// 从尾部 push 元素
list.push(5)

// 获取 list 长度
var len = list.length() // 返回值为 int 类型

// k 是 list index, v 是 list value
for (k,v in list) {

}
```

目前对 list 操作，仅开放了 push 和 length 函数，重点关注一下自动推导

如 `var list = [1, 2, 3]` 自动类型推导时，按照 list 首个元素的类型确定 `[T]` 中 T 的元素的类型，list 中所有元素的类型都必须遵循 T 对应的类型，或者能够隐式转换到该类型，本例中首个元素是字面量默认类型 int，所以推导出的 list 完整类型为 `[int]` 。

再来看看声明相关的注意事项

```nature
[int] list // v 仅声明但是不做初始化，此时 list == null

var list  // x 无法确定类型

var list = [] // x 无法确定类型
[int] list = [] // v 初始化一个空 list 类型

var list = [1, 1.2] // v 第二个元素会隐式转换成 int 类型

[int] list = [1.1, 1.2] // v 同上，虽然语法上支持，但是这非常的难以理解！

fn test([int] map) {} // 在函数中的声明
```

## map

map 是一种 hash 表结构，具有 O(1)  时间复杂度的查找效率。 支持 for 迭代遍历，语法 api 如下 

```
// 声明并初始化，推导类型为 {int:"string"}， 需要类型推导时同样是基于元素的类型
var map = {1: "hello", 2: "world", 3: "hello", 4: "haha"}

// 声明一个空 map
{int:string} m1 = {}

var foo = map[1] // 元素访问
map[1] = "hello" // 修改或者添加新的元素

map.delete(1) // 使用 key 删除 map 中的元素
var len = map.length() // 获取 map 中元素的数量, 返回值为 int 类型

// 迭代 k = map key, v = map value
for (k,v in map) {
}

fn test({int:int} map) {} // 在函数中的声明
```

目前 map key 仅支持 number 和 string 简单类型，后续会基于反射开放更多类型。

## set

set 和 map 结构类似也是一个 hash 表结构，和 map 不同的是其仅保留了 map 中的 key 的部分，set 的元素目前也仅支持 number 和 string 简单类型，不支持通过 for 进行迭代遍历。语法 api

```nature
var s = {1, 2, 3} // v


s.add(4) // v 添加元素
var exists = s.contains(1)  // v 返回 bool 类型
s.delete(4) // v 从 set 中删除元素

s[0] = 1 // x 没有修改操作

fn test({int} s) {} // v 在函数中声明

if ({1, 2, 3}.contains(2)) { // v 在 if 语句中使用
}
```

声明相关的注意事项

```
{int} s = {} // x 不能使用 {} 声明一个空 set, {} 留给了空 map
{int} s = set() // v 可以通过内置函数 set 声明一个空 set，
```

> ❗set 为保留关键字


## tuple

tuple 是用 `()`  将一组数据聚合在一个结构中，有一些类似 struct，但是相比于 struct 少了 key ，所以声明上会更加的简洁， 基础使用

```nature
var tup = (1, 1.1, true) // v 多个元素使用逗号分隔

var tup = (1) // x tuple 中至少需要包含两个元素

var foo = tup[0] // v 字面量 0 表示 tuple 中的第一个元素，以此类推

var foo = tup[expr] // x tuple 中的元素访问不允许出现表达式，只允许通过字面量访问

tup[0] = 2 // v 修改 tuple 中的值
```

tuple 解构赋值语法

```nature
[int] list = [1, 2, 3]

// 1. 变量创建
var (foo, bar, car) = (1, 2, true) // v 值允许通过 var 进行自动类型推导来连续创建多个变量
(custom_type, int, bool) (foo, bar, car) = (1, 2, true) // x 语法上禁止
var (foo, (bar, car)) = (1, (2, true)) // v 嵌套形式的创建多个变量
var (list[0], list[1]) = (2, 4) // x 创建变量时，左侧不允许使用表达式只能是 ident


// 2. 变量赋值
(foo, bar) = (bar, foo) // v 修改变量 foo,bar 的值，可以进行快速变量值交换
(foo, (bar, car)) = (2, (4, false)) // v 修改变量的值操作
(foo, bar, car) = (2, (4, false)) // x 左值与右值的类型不匹配


(list[0], list[2]) = (1, 2) // v tuple 赋值操作中允许使用左值表达式 ident/ident[T]/ident.T 这样的表达式为左值表达式
(1 + 1, 2 + 2) = (1, 2) // x 1+1 属于右值表达式
```