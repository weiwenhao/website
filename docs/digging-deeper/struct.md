---
title: Struct
sidebar_position: 11
---

## new

In the basic chapter, we introduced the use of structs. Here, we will delve deeper into structs. We already know that structs are allocated on the stack by default. If we want to allocate a struct on the heap, we can use the `new` keyword for instantiation.

```nature
type person_t = struct {
    string name
}

ptr<person_t> d = new person_t
```

To distinguish whether a struct is declared on the heap or the stack, we use the pointer type `ptr<person_t>` to indicate that the struct is declared on the heap. In this case, the type of variable `d` is a pointer. The content stored in the pointer is of type `person_t`.

However, there is no difference in usage between structs allocated on the heap and those on the stack. Both are accessed through the `.` operator.

```nature
d.name = 'naturer'
var b = d.name
```

The underlying principle that allows this usage is that even if the struct is allocated on the stack, as in:

```nature
person_t ds = person_t{}
```

The variable `ds` still stores a pointer, but this pointer points to a region in the stack memory. The memory layout is shown in the diagram below.

![](https://raw.githubusercontent.com/weiwenhao/pictures/main/blogs20230915185416.png)

## Comparison with C Language Structs

```c
struct dirent {
	uint64_t d_ino;
	int64_t d_off;
	uint16_t d_reclen;
	uint8_t d_type;
	char d_name[256];
};
```

This is the `dirent` structure in the C standard library. Nature has already included musl libc by default, so you can access dirent-related functions through the temp mechanism. However, when the related functions receive a struct as a parameter, Nature should be able to declare a struct that is identical in memory representation to pass the parameters correctly. Let's see how to declare a `dirent` structure in Nature.

```nature
type dirent_t = struct {
    u64 ino
    i64 off
    u16 reclen
    u8 t
    arr<u8,256> name
}
```

Now, these two structs have the same memory layout and alignment, allowing for parameter passing through the 'temp' mechanism.