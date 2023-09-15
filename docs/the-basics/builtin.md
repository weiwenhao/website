---
title: builtin
sidebar_position: 70
---

内置函数不需要通过 import 引入就可以直接调用，也可以称为全局函数。这些函数一般声明 builtin_temp.n 文件中

## print/println

定义

```nature
fn print(...[any] args) {}

fn println(...[any] args) {}
```

仅支持 bool/string/number 类型数据进行打印。println 相比于 print 多了一个 `\n` 并且每个参数直接通过空格进行分隔

示例

```nature
println("hello", true, "world")

// output:
// > hello true world
// >
```

## errort

定义

```
type tracet = struct {
    string path
    string ident
    int line
    int column
}

type errort = struct {
    string msg
    [tracet] traces
    bool has
}
```

错误处理章节我们已经见过该解构了

## sizeof

```
int len = sizeof(int) // 8
int len = sizeof(f32) // 4
```

sizeof 并不是一个内置函数，因为其参数是一个类型。我们可以将 sizeof 理解成一个内置宏。其本质上等同于 `sizeof int`。


## 保留关键字

```nature
continue
break
arr
vec
map
set
tup
ptr
cptr
true
false
type
null
any
self
struct
for
in
if
else
else if
var
string
bool
float
f32
f64
int
i8
i16
i32
i64
uint
u8
u16
u32
u64
fn
return
catch
try
throw
let
gen
import
as
is
sizeof
```

---

🎉 来到这里说明你已经学习完毕了 nature 的基础语法概念，你已经能够使用 nature 进行软件开发。如果你想要更进一步，请继续走下去。
