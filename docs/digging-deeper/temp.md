---
title: Templates
sidebar_position: 60
---

Nature is developed based on the C language, and its entire runtime is implemented based on musl libc. Therefore, Nature has already included the libc.a static library by default, which contains many useful and high-performance functions. It is our responsibility to make these functions accessible in Nature to ease the coding burden for Nature users.

Moreover, although Nature is an improvement over C, it doesn't mean we should abandon C. C has many mature and high-performance standard libraries that are worth learning and using. Therefore, Nature should have a way to interact with C.

Inspired by the header.h files in C, Nature will adopt a similar approach to interact with other programming languages or static libraries. In Nature, xxx_temp.n files declare a template for interacting with other languages or static libraries. The current version mainly integrates interaction with static libraries. Let's take a look at a typical temp file in the standard library.

```nature title=libc_temp.n
type t1 = gen any

fn std_args():[string]

fn htons(u16 host):u16

/* ISO C `broken-down time' structure.  */
type libc_tm_t = struct {
    i32 tm_sec
    i32 tm_min
    i32 tm_hour
    i32 tm_mday
    i32 tm_mon
    i32 tm_year
    i32 tm_wday
    i32 tm_yday
    i32 tm_isdst
    i64 tm_gmtoff
    cptr tm_zone
}

// Standard library functions, the return value is a static value, no need to handle GC but not thread-safe
fn localtime(ptr<i64> timestamp):ptr<libc_tm_t>

// Convert time_info_t to timestamp
fn mktime(ptr<libc_tm_t> time_info):i64

// strftime(buf.ref(), buf.len, '%Y-%m-%d %H:%M:%S', &tp)
fn strftime(cptr s, i64 size, cptr format, ptr<libc_tm_t> time_info):i64

// Block and non-blocking modes are implemented through null options
fn waitpid(int pid, ptr<int> status, int options):int

fn sleep(int second)

fn usleep(u32 usec):i32

fn strtol(cptr str, cptr endptr, i32 base):i64

fn prctl(int option, u64 arg2, u64 arg3, u64 arg4, u64 arg5):int

fn srand(u32 seed)

fn rand():int

fn clock():int
```

## import

This is the built-in libc_temp.n in the standard library, which contains many functions from the libc.a static library. If you are familiar with C, you will recognize these function declarations. With temp declarations, we can use them through import. We can import the [temp](https://github.com/nature-lang/nature/tree/master/std/temps) files defined in the standard library without any prefix and without carrying the .n suffix.

```nature
import libc_temp // std temp can be directly imported without carrying a prefix

sleep(12) // Block the current process
```

Here are some special points. First, why don't we need to access sleep through `libc_temp.sleep()`? In C, there is actually no concept of scope; all symbols are global symbols. Inherited into Nature, all temp declarations are global declarations. You only need to import them to access all the functions declared in libc_temp without a prefix.

## Custom temp Files

Developers proficient in C can also extend temp files themselves, but there are risks. You need to be aware of:

1. You must be very familiar with the memory layout of types in Nature and in C to correctly declare template functions.
2. Template functions only support the declaration of type alias and fn, and neither requires a value. You can refer to the already declared [temp](https://github.com/nature-lang/nature/tree/master/std/temps) modules in the standard library for specifics.
3. Nature has already included [musl libc](https://www.musl-libc.org/), so you can declare all the functions and structs contained in it in your structs.
4. All functions and type aliases in temp are global, so it's very easy to have naming conflicts. Nature's way of handling naming conflicts in temp is that the latter overrides the former.
5. All temp files must end with _temp.n.
6. Temp files must be declared in package management to be imported.

Here is an example of a temp declaration:

```toml
name = "server"
version = "1.0.0"
license = "MIT"
type = "bin"

[templates]
zlib_temp = { path = 'temps/zlib_temp.n' }

# Support .o or .a link files, the key needs to contain .a or .o to easily identify the type, thereby determining different keys
# Fill in the relative path based on the current package.toml
[links]
libz = { linux_amd64 = 'temps/libz.a' }

[dependencies]
```

Usage example, directly import through package name + temp key.

```nature
import syscall
import server.zlib_temp

var gzfile = gzopen() // Call the function in temp
```

Of course, Nature also supports linking your own static libraries, which also requires the help of package.toml. You can see that the `[links]` table above is a typical way to introduce static libraries. Not only `type = bin` supports templates and links, but you can also use static libraries when writing a Nature lib.

:::danger Note
[links] The .a file must be statically compiled using musl-gcc.
:::

If the lib you imported in dependencies contains links, for safety reasons, the related links will not be linked by default. You can import them through the use_links parameter, as shown below:

```toml
name = "package"
version = "1.0.0"
license = "MIT"
type = "bin"


[dependencies]
compress = { type = "git", version = "v1.0.0", url = "github.com/weiwenhao/compress", use_links = true }
```

## std temp

Nature has already declared usable temps based on libc, which can be seen in the source code. Since you are expected to be familiar with the relevant functions to use them, no documentation is provided for now.

👉 [https://github.com/nature-lang/nature/tree/master/std/temps](https://github.com/nature-lang/nature/tree/master/std/temps)

The builtin_temp.n is globally imported, so you don't need to import it to access its symbols. For example, errort/println/print, etc., are all defined in this temp.
