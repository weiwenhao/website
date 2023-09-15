---
title: struct
sidebar_position: 11
---

## new 

在基础章节我们介绍了 struct 的使用，在这里我们将继续深入 struct。我们已经知道 struct 默认在 stack 上进行分配，如果我们希望 struct 在 heap 上进行分配，可以使用 new 关键字进行实例化。

```nature
type person_t = struct {
    string name
}

ptr<person_t> d = new person_t
```

为了在类型上区分 struct 是在 heap 上声明还是在 stack 上声明，我们使用 `ptr<person_t>` 这样的指针类型表示 struct 在堆上进行声明，此时变量 d 的类型是一个指针。指针中存储的内容是 person_t

但是在使用方式上，heap 和 stack 分配的 struct 并没有什么区别，都是通过 `.` 进行 struct 的属性访问

```nature
d.name = 'naturer'
var b = d.name
```

能够这么使用的基础原理时，即使 struct 在栈上分配，如

```nature
person_t ds = person_t{}
```

实际上此时 ds 中存储的依旧是一个指针，只不过其指向了栈内存区域而已。内存如图所示

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

这是 c 语言标准库中的 dirent 结构，nature 中默认已经引入了 musl libc, 所以可以通过 temp 机制访问 dirent 相关函数，但是相关函数接收的参数是一个结构体时，nature 应该能够声明一个在内存表现上完全相同的结构体才能进行正确的参数传递，所以我们来看看如何使用 nature 声明一个 dirent 结构

```nature
type dirent_t = struct {
    u64 ino
    i64 off
    u16 reclen
    u8 t
    arr<u8,256> name
}
```

此时这两个 struct 在内存中的数据结构与对齐方式完全相同，可以通过 temp 机制进行参数传递
