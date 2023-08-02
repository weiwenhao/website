---
title: 包管理
sidebar_position: 50
---

包管理的提案 https://github.com/nature-lang/nature/issues/10 里面有具体的想法和实现细节，nature 在 0.3.0 开始支持包管理。nature 的包管理除了解决的依赖管理的问题外，也改变了 import 的引入方式，在原有的 import file 的基础上增加了 import package 的方式。

想要启用包管理需要在项目的根目录下创建一个 package.toml 文件，接下来首先介绍一下该文件的格式

## package.toml

```toml
# 基础信息
name = "test" # 项目名称 (import 需要用到)
version = "1.0.0" # 项目的版本号
authors = ["Alice <a@example.com>", "Bob <b@example.com>"]
description = "Your package description"
license = "MIT"
type = "bin" # lib or bin
entry = "rand" # 非必填， 自定义入口文件，目前仅实现用于 type = lib 时 查找入口文件，默认值为 main

# 依赖信息, type 支持 git 和 local 两种
[dependencies]
rand = { type = "git", version = "v1.0.1", url = "jihulab.com/nature-lang/rand" }
syscall = { type = "git", version = "v1.0.1", url = "jihulab.com/nature-lang/syscall" }
os = { type = "git", version = "v1.0.1", url = "jihulab.com/nature-lang/os" }
local = { type = "local", version = "v1.0.0", path = "./mock/local" }
```

定义好相关文件后，执行 `npkg sync` 同步相关的 package，该命令会将相关的 package 下载 (type=git) 或者移动 (type=local) 到 $HOME/.nature/package 目录下

```bash
$HOME/.nature/package
├── caches
└── sources
    ├── jihulab.com.nature-lang.os@v1.0.1
    │   ├── main.n
    │   └── package.toml
    ├── jihulab.com.nature-lang.rand@v1.0.1
    │   ├── other.n
    │   ├── package.toml
    │   ├── rand.n
    │   └── utils
    │       ├── pool.n
    │       ├── seed.n
    │       └── seed.sub.n
    ├── jihulab.com.nature-lang.syscall@v1.0.1
    │   ├── main.n
    │   └── package.toml
    └── local@v1.0.0
        ├── main.linux_amd64.n
        ├── main.linux.n
        ├── main.n
        └── package.toml

7 directories, 14 files
```

> ❗️ 必须在 package.toml 所在目录执行 npkg sync 才能进行包管理的同步， 同理 nature build 也需要在项目根目录下执行才能找到 package.toml 文件！！！

## import package

现在就可以通过 import 引入相关的 dep package 了

```nature
import rand // 当直接引入包名时相当于引入了 rand.main module
import rand.utils.seed // 引入了 rand@v1.0.1/utils/seed.n

int res = rand.dump()
rand.seed.dump()
```

对于语法 import rand， nature 会进行三个维度去查找 package，首先判断是否为当前 package name，通过 package.toml 的 name 字段判断，然后是判断是否为 package.toml 中定义的 dependencies key。 最后再判断是否为 std 标准库中的 package。

默认情况下使用 import 的最后一级的名称作为名称， 比如示例中 seed.dump() ，可以通过 as 自定义名称，`import rand.utils.seed as custom` 。再详细说明一下 import package 寻找 module 的方式。

当直接 import rand 时，rang 就是 package 的名称，通过上面的三个维度确定 package 根目录后，开始进行具体 module 文件的查找，而 import rand 则为 import rand.main 的缩写。

假设 rand 的根目录是 `/root/.nature/package/sources/rand`

`import rand` 查找 `/root/.nature/package/sources/rand/main.n` module

`import rand.other` 查找 `/root/.nature/package/sources/rand/other.n` module

`import rand.utils.seed` 查找 `/root/.nature/package/sources/rand/utils/seed.n` module

在模块一章中，我们说过 import 'file.n' 的方式是无法 import 上一级目录中的文件的，有了包管理后，我们可以将当前项目视为一个 package (必须定义 package.toml)， 比如我们的项目名称是 test, 那么通过 `import test.dir1.dir2.module1` 的方式，我们就可以到达当前项目中的任意文件。 

那如果当前项目的 package name 和  dep package name 名称冲突或者我依赖同一个 package 的不同版本时怎么办? 此时可以通过调整 dep package key 来自定义 import 的名称

```toml
rand = { type = "git", version = "v1.0", url = "jihulab.com/nature-lang/rand" }
rand2 = { type = "git", version = "v2.0", url = "jihulab.com/nature-lang/rand" }
```

使用上 `import rand2` 即可。


## cross build

一个常见的场景是，比如 syscall.n 这个 module 在 linux 和 darwin 系统下存在不同的系统调用，需要不同的实现，此时可以通过文件名称进行区分，区分粒度主要是 os + arch 两个维度。import 查找文件时会按照优先级进行查找。比如当前编译的 os = linux，arch = amd64，查找顺序是 syscall.linux_amd64.n -> syscall.linux.n -> syscall.n。

`import 'syscall.n'` 的方式无法使用该模式，仅仅 import package.module 时才能够使用 cross build。

目前支持的 os: linux

目前支持的 arch: amd64

