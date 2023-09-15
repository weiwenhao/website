---
title: 模板
sidebar_position: 60
---

nature 基于 c 语言进行开发，整个 runtime 都是基于 musl libc 实现，所以 nature 中默认已经引入了 libc.a 静态库，这里面有非常多有用且高性能的函数。我们有义务在 nature 中开放对这些函数的访问，从而减轻 nature 使用者的编码负担。

并且不止于此，nature 虽然是对 c 语言的改进，但这不代表我们应该抛弃 c 语言，c 语言在业界有非常多成熟且高性能的标准库值得我们学习和使用。所以 nature 应该存在一种可以和 c 语言交互的方式。

基于 c 语言中 header.h 文件的启示，nature 将采用类似的方式和其他的编程语言或者静态库进行交互。nature 中 xxx_temp.n 文件声明一个模板，用于和其他语言或者静态库进行交互。当前版本主要集成了对静态库的交互。来看看标准库中的典型 temp 文件

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

// 标准库函数, 返回值是静态值，不用处理 gc 但是线程不安全
fn localtime(ptr<i64> timestamp):ptr<libc_tm_t>

// 将 time_info_t 转换为时间戳
fn mktime(ptr<libc_tm_t> time_info):i64

// strftime(buf.ref(), buf.len, '%Y-%m-%d %H:%M:%S', &tp)
fn strftime(cptr s, i64 size, cptr format, ptr<libc_tm_t> time_info):i64

// 通过空值 options 实现阻塞和非阻塞模式
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

这是标准库中内置的 libc_temp.n 里面包含了非常多 libc.a 这个静态库中的函数，如果你熟悉 c 语言你将非常熟悉这些函数声明，有了 temp 声明，我们就可以通过 import 进行使用，我们可以不带任何前缀的方式 import 标准库中定义的 [temp](https://github.com/nature-lang/nature/tree/master/std/temps) 文件，不需要携带 .n 后缀。

```nature
import libc_temp // std temp 可以直接引入，不需要携带前缀

sleep(12) // 阻塞当前进程的执行
```

这里有几个特殊的地方，首先为什么我们不需要通过 `libc_temp.sleep()` 的方式访问 sleep 呢？在 c 语言中其实没有作用域的概念，所有的符号都是全局符号，所以继承到 anture 中，所有的 temp 声明都是全局声明。只需要 import 进来就可以不带前缀的访问 libc_temp 中声明的所有函数。

## 自定义 temp 文件

熟练使用 c 语言的开发者也可以自己扩展 temp 文件，但需要注意的是自定义 temp 是有风险的事情，你需要注意的有

1. 你必须非常的熟悉 nature 中的类型的内存布局以及 c 语言中的内存布局，才能够正确的模板函数声明
2. 模板函数中只支持 type alias 和 fn 的声明，并且两者的声明都不需要值，具体可以参考标准库中已经声明的 [temp](https://github.com/nature-lang/nature/tree/master/std/temps) 模块
3. nature 已经引入了 [musl libc](https://www.musl-libc.org/) 所以你可以结构体中声明其中包含的所有函数和结构体。
4. temp 中的所有函数和 type alias 都是全局的，所以这非常容易出现名称冲突，nature 对于 temp 中的名称冲突的处理方式是后者覆盖前者。
5. 所有的 temp 文件必须以 \_temp.n 后缀结尾
6. temp 文件必须在包管理中进行声明才能 import

这是 temp 的声明示例

```toml
name = "server"
version = "1.0.0"
license = "MIT"
type = "bin"

[templates]
zlib_temp = { path = 'temps/zlib_temp.n' }

# 支持 .o 或者 .a link 文件, key 中需要包含 .a 或者 .o 从而能够方便的进行类型识别，从而判断不同的 key
# 填写相对路径以当前 package.toml 为准
[links]
libz = { linux_amd64 = 'temps/libz.a' }

[dependencies]
```

使用示例，直接通过 package 名称 + temp key 引入即可。

```nature
import syscall
import server.zlib_temp

var gzfile = gzopen() // 调用 temp 中的函数
```

当然，nature 也支持自己链接静态库，同样需要借助 package.toml，可以看到上面的 `[links]` table 就是一个典型的引入静态库的方式。不仅仅是 `type = bin` 支持 templates 和 links，编写 nature lib 时同样可以使用静态库。

:::danger 注意
[links] 中 .a 文件必须使用 musl-gcc 进行静态编译。
:::

如果你在 dependencies 中引入的 lib 包含 links, 为了安全起见，默认情况下是不会链接相关 links 的，你可以通过参数 use_links 参数进行引入，示例

```toml
name = "package"
version = "1.0.0"
license = "MIT"
type = "bin"


[dependencies]
compress = { type = "git", version = "v1.0.0", url = "github.com/weiwenhao/compress", use_links = true }
```

## std temp

nature 已经声明的基于 libc 的可用 temp 可以在源码中看到，默认你已经熟悉相关函数才能够使用，所以暂时不提供相关的文档

👉 [https://github.com/nature-lang/nature/tree/master/std/temps](https://github.com/nature-lang/nature/tree/master/std/temps)

其中的 builtin_temp.n 进行了全局 import， 所以不需要进行 import 也可以访问其中的符号，入 errort/println/print 等都定义在该 temp 中
