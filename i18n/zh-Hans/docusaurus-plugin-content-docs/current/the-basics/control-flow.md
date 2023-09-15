---
title: 控制流
sidebar_position: 20
---

## if 表达式

示例
```nature
int foo = 23

if foo > 100 {
    print('foo > 100')
    
} else if foo > 20 {
    print('foo > 20')
    
} else {
    print('else handle')
}
```

else if 中间需要用空格隔开。`if expr`  expr 部分必须为 bool 类型的表达式，不支持隐式类型转换。if 后面的表达式不需要使用括号包裹。

`if foo as bool {}`  可以通过 as 进行显示类型转换将值转换为 bool，false/0/null 会转换为 false，其余表达式总是转换为 true。

> print/println 是内置函数，支持对 string/bool/number 类型数据进行打印，多个参数使用逗号分隔，无格式化功能，主要用来调试。

## for 表达式

### 经典循环

```nature
var sum = 0
for int i = 1; i <= 100; i += 1 {
	sum += i
}
println('1 +..+100 = ', sum)
```

编译并输出后可以得到以下结果

```shell
> nature build main.n && ./main
1 +..+100 = 5050
```

> ❗️nature 中没有 ++ 语法，请使用 i += 1 代替 i++ 。for 后面的表达式不需要括号包裹。

### 条件循环

依旧使用 1+..100 做一个类比
```nature
var sum = 0
var i = 0
for i <= 100 {
	sum += i
	i += 1
}

println('1 +..+100 = ', sum)
```

编译正确的话，会得到和经典循环一样的输出结果。 此时 for 后面需要接 bool 类型的表达式才能进行条件循环。

> 💡  其实就是 c 语言中的 while 表达式，nature 将其集成在了 for 关键字中


### 迭代循环
先来看看相关语法
```nature
var list = [1, 1, 2, 3, 5, 8, 13, 21]

// 对 vec 结构迭代时，生成的是 v
for v in list {
	println(v)
}

var map = {1:10, 2:20, 3:30, 4:40}

// 对 map 结构迭代时生成的是 k
for k in map {
    println(k)
}

// 如果同时需要 k 和 v 只需要生成两个值即可
for k,v in iter {
	println(k, v)
}
```

迭代用于对 vec/map/string 类型的遍历，目前只支持这三种类型。需要注意的是 k,v，这里其实是变量定义的语法糖。完整的概念上的语法应该是 `for var (k,v) in list` 这太复杂了，所以在做语法解析时省略掉了 `var ()`，`var (expr)`这种形式的声明在后面的 tuple 中会详细说明。

并且 k 和 v 定义的作用域是在循环的内部。所以类似

```nature
var k = 1 
for k,v in list { 
    // ...
} 
```

这里的 k 和 v 是新的变量定义，但是作用域是在循环内部中，不会与 var k = 1 冲突。

### 循环中断与跳过

关键字 break 用于退出当前循环，continue 则跳过本次循环逻辑立刻进入到循环判断逻辑。使用示例

```nature
var list = [1, 1, 2, 3, 5, 8, 13, 21]
var sum = 0
for k, v in list {
    if sum > 20 {
        break
    }
    sum += v
}
println(sum)


var sum2 = 0
for int i = 0; i < 100; i += 1 {
    if i % 2 == 0 {
        continue
    }

    sum2 += i
}
println(sum2)
```

编译输出结果

```shell
> nature build main.n && ./main
33
2500
```