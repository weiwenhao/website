---
title: 内置函数
sidebar_position: 70
---

内置函数不需要通过 import 引入就可以直接调用，也可以称为全局函数。

## print/println

定义

```nature
fn print(...[any] args) {}

fn println(...[any] args) {}
```

仅支持 bool/string/number 类型数据进行打印。println 相比于 print 多了一个 `\n`
示例 `println("hello", true, "world")`

## set

定义

```
fn set(...[T] keys):{T} {}
```

初始化一个 set 结构数据，示例 `var s = set()` 或者 `var s = set(1, 2, 3)`

## sleep

定义

```
fn sleep(int second)
```

可以让程序暂停一段时间后继续执行后续逻辑

## errort

定义

```
type errort = struct {
    string msg
    bool has
}
```

后续的错误处理中会进一步了解该结构体

---

🎉 来到这里说明你已经学习完毕了 nature 的基础语法概念，你已经能够使用 nature 进行软件开发。如果你想要更进一步，请继续走下去。
