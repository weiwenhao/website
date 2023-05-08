---
title: struct
sidebar_position: 60
---

nature 虽然已经内置了复合数据类型，但不能表达所有的情况。而通过 struct 我可以组合任何自己想要的类型，比如

```nature
type rectangle = struct {
	int length
	int width
	var area = fn(self s):int {
		return s.length * s.width
	}
	var perimeter = fn(self s):int {
		return (s.length + s.width) * 2
	}
}

var box = rectangle {
	length = 10,
	width = 20
}

var banner = rectangle {
	length = 120,
	width = 25
}


println(box.area())
println(box.perimeter())

println(banner.area())
println(banner.perimeter())
```

输出结果

```shell
> ./main
200
60
3000
290
```

struct 通常和自定义类型语法 `type ident = ...` 一起使用。示例中使用 struct 关键字声明了一种新的类型 rectangle，这个类型拥有 4 个属性，首先声明了 length 和 width 属性，多个 struct 属性之间使用换行符 `\n` 进行分隔。接下来声明了两个属性 area 和 perimeter，其**包含默认值，所以可以使用 var 自动类型推导。**

通过类型关键字 rectangle 可以对 struct 进行实例化，上面的代码中声明了两个 rectangle 实例，box 和 banner，通过输出结果可以看出来两者都独享 length 和 width 属性，这是 struct 实例化的特点之一。在实例化过程中，缺省的值则会检测 struct 中是否存在默认值，并传递到实例化后的 struct 中，如果某个属性两边都没有声明值，则该属性初始化为零值。

**实例化时多个属性的赋值使用逗号进行分隔**。对于实例化后的 struct, 比如 box, 可以通过 `.` dot 语法来访问其中的属性，如 `box.width`。结构体中的属性可以通过该语法自由的读取或者赋值，如 `box.width = 123`

另外需要注意示例中 area 属性的值是一个匿名函数，匿名函数中的首个参数的类型被声明为了 self， 前面说过该 self 类型对应的变量 s 可以访问当前 struct 中的其他属性。如 s.width。这是 **self 语法首个也是唯一个使用位置 ———— struct 中 fn 默认声明时的首个参数的类型**。self 并不是必须的，如果你不需要访问 struct 中的其他属性，则不需要声明该类型以及对应的值。编译器会判断首个参数的类型是否为 self，并传入合适的值。下面是几个关于 self 使用的语法示例

```nature
type foo = struct {
	var bar = fn(self s):int {} // v 正确使用方式
	var car = fn(int a):int {} // v 正确的使用方式，此时不需要访问 struct 中的其他属性
	var baz = fn(int a, self s):int {} // x 只允许在首个参数声明 self 类型
	fn(self s, int a):int baq // x 只能在 fn 类型的默认值中使用 self 声明
}

var f = foo{}
f.bar = fn(self s):in {} // x 只能在 fn 类型的默认值中使用 self 声明
```

相较于 fn，使用 struct 我们能够更近一步的组织我们的代码，struct 也是 nature 中最接近面相对象编程的语法概念之一，之二是 module。
