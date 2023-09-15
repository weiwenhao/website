---
title: struct
sidebar_position: 11
---

## new structo

在基础章节我们介绍了 struct 的使用，在这里我们将继续深入 struct。我们已经知道 struct 模式是在 stacke 上进行分配，如果我们希望让 struct 在 heap 中进行分配，可以使用 new 关键字进行声明。

```nature
type person_t = struct {
    string name
}

ptr<person_t> d = new person_t
```

为了在类型上区分 struct 是在 heap 上声明还是在 stack 上声明，我们使用 `ptr<person_t>` 这样的指针形式标识 struct 在堆上进行声明，此时变量 d 的类型是一个指针。指针中存储的内容是 person_t

但是在使用方式上，heap 和 stack 分配的 struct 并没有什么区别，都是通过 '.' 进行 struct 的属性访问

```nature
d.name = 'weiwenhao'
var b = d.name
```

能够这么使用的基础原理时，即使 struct 在栈上分配，如

```nature
person_t ds = person_t{}
```

但是此时 ds 中存储的依旧是一个指针，只不过其指向了栈内存区域而已。内存如图所示

![](https://raw.githubusercontent.com/weiwenhao/pictures/main/blogs20230915185416.png)

## 对比 c 语言结构体

```c
struct dirent {
	uint64_t d_ino;
	int64_t d_off;
	uint16_t d_reclen;
	uint8_t d_type;
	char d_name[256];
};
```

这是 c 语言标准库中的 dirent 解构，nature 中默认已经引入了 musl libc, 所以可以通过 temp 机制访问到其相关结构，这里我们先来看看如何使用 nature 声明一个 dirent 结构

> temp 章节会详细介绍 temp

```nature
type dirent_t = struct {
    u64 ino
    i64 off
    u16 reclen
    u8 t
    arr<u8,256> name
}
```

如果你足够熟悉 nature 和 c 语言，那么你可以知道这两个 struct 在内存中的数据结构与对齐方式完全相同，可以通过 temp 机制进行相互调用
