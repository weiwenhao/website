---
title: Package Management
sidebar_position: 50
---

The proposal for package management can be found at [https://github.com/nature-lang/nature/issues/10](https://github.com/nature-lang/nature/issues/10), which contains specific ideas and implementation details. Starting from version 0.3.0, Nature supports package management. In addition to solving dependency management issues, Nature's package management also changes the way imports work, adding the ability to import packages in addition to importing files.

To enable package management, you need to create a `package.toml` file in the root directory of your project. Let's first introduce the format of this file.

## package.toml

```toml
# Basic Information
name = "test" # Project name (needed for import)
version = "1.0.0" # Project version
authors = ["Alice <a@example.com>", "Bob <b@example.com>"]
description = "Your package description"
license = "MIT"
type = "bin" # lib or bin
entry = "rand" # Optional, custom entry file, currently only used to find the entry file when type = lib, default is main

# Dependency Information, type supports git and local
[dependencies]
rand = { type = "git", version = "v1.0.1", url = "jihulab.com/nature-lang/rand" }
syscall = { type = "git", version = "v1.0.1", url = "jihulab.com/nature-lang/syscall" }
os = { type = "git", version = "v1.0.1", url = "jihulab.com/nature-lang/os" }
local = { type = "local", version = "v1.0.0", path = "./mock/local" }
```

After defining the relevant files, execute `npkg sync` to synchronize the related packages. This command will download (type=git) or move (type=local) the relevant packages to the `$HOME/.nature/package` directory.

```bash
$HOME/.nature/package
├── caches
└── sources
    ├── jihulab.com.nature-lang.os@v1.0.1
    │   ├── main.n
    │   └── package.toml
    ├── jihulab.com.nature-lang.rand@v1.0.1
    │   ├── other.n
    │   ├── package.toml
    │   ├── rand.n
    │   └── utils
    │       ├── pool.n
    │       ├── seed.n
    │       └── seed.sub.n
    ├── jihulab.com.nature-lang.syscall@v1.0.1
    │   ├── main.n
    │   └── package.toml
    └── local@v1.0.0
        ├── main.linux_amd64.n
        ├── main.linux.n
        ├── main.n
        └── package.toml

7 directories, 14 files
```

> ❗️ You must execute `npkg sync` in the directory where `package.toml` is located to synchronize package management. Similarly, `nature build` also needs to be executed in the project root directory to find the `package.toml` file.

## import package

Now you can import the relevant dep packages via import.

```nature
import rand // When directly importing the package name, it is equivalent to importing the rand.main module
import rand.utils.seed // Imported rand@v1.0.1/utils/seed.n

int res = rand.dump()
rand.seed.dump()
```

For the syntax `import rand`, Nature will look for the package in three dimensions: first, it checks if it's the current package name, determined by the `name` field in `package.toml`. Then it checks if it's a key defined in the `dependencies` in `package.toml`. Finally, it checks if it's a package in the std library.

By default, the last level of the import is used as the use name, such as in the example `seed.dump()`. You can customize the name using `as`, like `import rand.utils.seed as custom`.

Let's explain in more detail how `import package` finds the module. When directly importing `rand`, `rand` is the package name. After determining the package root directory through the above three dimensions, it starts to look for the specific module file. In this case, `import rand` is actually shorthand for `import rand.main`.

Assuming the root directory of `rand` is `/root/.nature/package/sources/rand`:

- `import rand` looks for `/root/.nature/package/sources/rand/main.n` module, which can be configured in `package.toml`.
- `import rand.other` looks for `/root/.nature/package/sources/rand/other.n` module. If not found, it continues to look for `/root/.nature/package/sources/rand/other/main.n` module.
- `import rand.utils.seed` looks for `/root/.nature/package/sources/rand/utils/seed.n` module. If not found, it continues to look for `/root/.nature/package/sources/rand/utils/seed/main.n` module.

In the Modules chapter, we mentioned that `import 'file.n'` cannot import files from the parent directory. With package management, we can treat the current project as a package (a `package.toml` must be defined). For example, if our project name is `test`, then through `import test.dir1.dir2.module`, we can reach any file in the current project.

What if the current project's package name conflicts with the dep package name or depends on different versions of the same package? In this case, you can adjust the dep package key to customize the import name.

```toml
rand = { type = "git", version = "v1.0", url = "jihulab.com/nature-lang/rand" }
rand2 = { type = "git", version = "v2.0", url = "jihulab.com/nature-lang/rand" }
```

You can distinguish them by using `import rand2` and `import rand`.

## cross build

A common scenario for cross-compilation is that the syscall.n module has different system calls on Linux and Darwin systems and requires different implementations. You can distinguish them by file name, mainly based on the os + arch dimensions. When importing a file, it will be searched for in order of priority. For example, if the current compilation os = linux, arch = amd64, the search order is syscall.linux_amd64.n -> syscall.linux.n -> syscall.n.

The import 'syscall.n' method cannot use this cross-compilation mode; only import package.module can use cross build.

Currently supported os: linux

Currently supported arch: amd64
