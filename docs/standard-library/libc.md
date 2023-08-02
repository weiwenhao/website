---
title: libc
sidebar_position: 20
---

`import libc`

The `libc` module is mainly used for interacting with C in nature. It addresses the issue of differences between nature's data structures and C language data structures. More helper functions for interacting with C will be added in the future.

## Contents

[https://github.com/nature-lang/nature/blob/master/std/libc/main.n](https://github.com/nature-lang/nature/blob/master/std/libc/main.n)

## Usage Examples

### `fn encode(any v):cptr`

```nature
type sockaddr_in = struct { // Occupies 8 bytes on linux_amd64
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
    // 108 bytes
    [u8,104] sun_path
}

type sockaddr_t = gen sockaddr_in|sockaddr_un

fn bind(int sockfd, sockaddr_t addr) {
    // Convert nature struct to C struct
     cptr p = libc.encode(addr)
     var len = 16 as cptr // in and unix have a length of 16 bytes
     call6(SYS_BIND, sockfd as cptr, p, len, 0, 0, 0)
}

fn bind(int sockfd, sockaddr_in6 addr) {
    cptr p = libc.encode(addr)
    var len = 28 as cptr
    call6(SYS_BIND, sockfd as cptr, p, len, 0, 0, 0)
}
```

`encode` function converts nature's struct or list into a C-compatible struct with proper alignment. For example, the `sockaddr_in` in the above example will be converted into the following C structure. It is essential to note that `encode` generates a new memory space and assigns the initial address to `p`, making `p` and `addr` data spaces independent of each other.

```c
struct sockaddr_in {
    uint16_t sin_family;
    uint16_t sin_port;
    uint32_t sin_addr;
    uint8_t sin_zero[8];
}
```

### `fn decode(cptr p, any v)`

`decode` is the opposite process of `encode`. It can decode a `cptr` type pointer into a nature's struct. In the example below, `addr` is an empty struct with pre-allocated memory space. After `p` is assigned by the system call, the `decode` function is called to align and copy the data in `p` to the `addr` struct.

```nature
fn accept(int sockfd, sockaddr_t addr):int {
    var p = libc.encode(addr)
    var len = 16
    ptr<int> len_ptr = &len

    int fd = call6(SYS_ACCEPT, sockfd as cptr, p, len_ptr as cptr, 0, 0, 0)

    // Assign values from p to addr, p will be garbage-collected
    libc.decode(p, addr)
    return fd
}
```

### `fn htons(u16 host):u16`

Converts little-endian numbers to big-endian network byte order.

```nature
var addr = syscall.sockaddr_in {
    sin_family = syscall.AF_INET as u16,
    sin_addr = 0x00000000,
    sin_port = libc.htons(8080),
    sin_zero = [] as [u8,8]
}
```