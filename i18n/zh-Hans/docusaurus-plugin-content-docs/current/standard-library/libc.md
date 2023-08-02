---
title: libc
sidebar_position: 20
---

`import libc`

主要用于 nature 和 c 交互。填补了 nature 中的数据结构与 c 语言数据结构不同的问题。后续将会增加更多 nature 与 c 语言交互相关的帮助函数。

## 内容

https://github.com/nature-lang/nature/blob/master/std/libc/main.n

## 使用示例

### fn encode(any v):cptr

```nature
type sockaddr_in = struct { // linux_amd64 占用 8 个字节
    u16 sin_family
    u16 sin_port
    u32 sin_addr

    [u8,8] sin_zero
}

type sockaddr_in6 = struct {
    u8 sin6_len
    u8 sin6_family
    u16 sin6_port
    u32 sin6_flowinfo
    // ipv6 address(128-bit)
    [u32,4] sin6_addr
    u32 sin6_scope_id
}

type sockaddr_un = struct {
    u8 sun_len
    u8 sun_family
    // 108 byte
    [u8,104] sun_path
}

type sockaddr_t = gen sockaddr_in|sockaddr_un

fn bind(int sockfd, sockaddr_t addr) {
    // 将 nature struct 转换为 c struct
     cptr p = libc.encode(addr)
     var len = 16 as cptr // in 和 unix 长度为 16byte
     call6(SYS_BIND, sockfd as cptr, p, len, 0, 0, 0)
}

fn bind(int sockfd, sockaddr_in6 addr) {
    cptr p = libc.encode(addr)
    var len = 28 as cptr
    call6(SYS_BIND, sockfd as cptr, p, len, 0, 0, 0)
}
```

encode 将 nature 中的 struct 或者 list 转换并对齐成和 c 结构，如上面示例中的 sockaddr_in 将会转换成 c 语言中下面的示例。需要注意 encode 会重新生产一个新的内存空间并将初始地址赋值给 p，所以 p 和 addr 的数据空间是相互独立的

```c
struct sockaddr_in {
    uint16_t sin_family;
    uint16_t sin_port;
    uint32_t sin_addr;
    uint8_t sin_zero[8];
}
```

### fn decode(cptr p, any v)

decode 和 encode 的相反过程，可以将 cptr 类型的指针解码成 nature 中的结构体。下面的示例中 addr 是一个已经申请好内存空间的空结构体。当 p 被系统调用赋值以后，再反向调用 decode 将 p 中的数据对齐 copy 到 addr 结构中

```nature
fn accept(int sockfd, sockaddr_t addr):int {
    var p =  libc.encode(addr)
    var len = 16
    ptr<int> len_ptr = &len

    int fd = call6(SYS_ACCEPT, sockfd as cptr, p, len_ptr as cptr, 0, 0, 0)

    // 将 p 中的值赋值给 addr, p 会被垃圾回收回收
    libc.decode(p, addr)
    return fd
}
```

### fn htons(u16 host):u16

将小端序数字转换成大端序网络传输

```nature
var addr = syscall.sockaddr_in {
    sin_family = syscall.AF_INET as u16,
    sin_addr = 0x00000000,
    sin_port = libc.htons(8080),
    sin_zero = [] as [u8,8]
}
```
