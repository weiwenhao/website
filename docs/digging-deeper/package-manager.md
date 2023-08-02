---
title: Package Management
sidebar_position: 50
---

Package Management Proposal: [https://github.com/nature-lang/nature/issues/10](https://github.com/nature-lang/nature/issues/10)

Starting from version 0.3.0, Nature supports package management, which not only solves the problem of dependency management but also changes the way imports are handled by introducing the ability to import packages in addition to files.

To enable package management, you need to create a `package.toml` file in the root directory of your project. Here's an explanation of the format of this file:

## package.toml

```toml
# Basic information
name = "test" # Project name (used for imports)
version = "1.0.0" # Project version
authors = ["Alice <a@example.com>", "Bob <b@example.com>"]
description = "Your package description"
license = "MIT"
type = "bin" # lib or bin
entry = "rand" # Optional, custom entry file, used only for type = lib, default value is main

# Dependency information, type supports git and local
[dependencies]
rand = { type = "git", version = "v1.0.1", url = "jihulab.com/nature-lang/rand" }
syscall = { type = "git", version = "v1.0.1", url = "jihulab.com/nature-lang/syscall" }
os = { type = "git", version = "v1.0.1", url = "jihulab.com/nature-lang/os" }
local = { type = "local", version = "v1.0.0", path = "./mock/local" }
```

After defining the `package.toml` file, execute `npkg sync` to synchronize the related packages. This command will download the packages (type=git) or move them (type=local) to the `$HOME/.nature/package` directory.

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

> ❗️ You must execute `npkg sync` in the directory where `package.toml` is located to synchronize the package management. Similarly, `nature build` should also be executed in the project's root directory to locate the `package.toml` file!!!

## Importing a Package

Now you can import the related dependent packages using the import statement:

```nature
import rand // When directly importing the package name, it's equivalent to importing the rand.main module
import rand.utils.seed // Imports rand@v1.0.1/utils/seed.n

int res = rand.dump()
rand.seed.dump()
```

When using the `import package` syntax, Nature looks for the module in three dimensions. First, it checks if it matches the current package name, determined by the `name` field in `package.toml`. Then, it checks if it matches any of the `dependencies` keys defined in `package.toml`. Finally, it checks if it's part of the standard library (`std`).

By default, the last segment of the import statement is used as the module name. For example, in the code `seed.dump()`, you can customize the name using `as`, like this: `import rand.utils.seed as custom`.

Let's now explain in detail how Nature searches for modules when using the import package statement:

- When directly importing `rand`, Nature searches for the `/root/.nature/package/sources/rand/main.n` module.
- When importing `rand.other`, Nature searches for the `/root/.nature/package/sources/rand/other.n` module.
- When importing `rand.utils.seed`, Nature searches for the `/root/.nature/package/sources/rand/utils/seed.n` module.

We mentioned in the module chapter that importing `file.n` would not allow importing files from the parent directory. However, with package management, you can treat the current project as a package (must define `package.toml`). For example, if your project name is `test`, you can use `import test.dir1.dir2.module1` to access any file in the current project.

What if there's a naming conflict between the current project's package name and a dependent package name, or if you have dependencies on different versions of the same package? In such cases, you can adjust the dependent package key to customize the import name:

```toml
rand = { type = "git", version = "v1.0", url = "jihulab.com/nature-lang/rand" }
rand2 = { type = "git", version = "v2.0", url = "jihulab.com/nature-lang/rand" }
```

You can use `import rand2` in this situation.

## Cross-Building

A common scenario is having different implementations for a module like `syscall.n` on Linux and Darwin systems due to different system calls. This can be achieved by naming the files based on the `os` and `arch` dimensions. Nature searches for files based on priority. For example, when compiling for `os = linux` and `arch = amd64`, it searches in the following order: `syscall.linux_amd64.n` -> `syscall.linux.n` -> `syscall.n`.

The syntax `import 'syscall.n'` cannot utilize this cross-building feature; it can only be used when importing `package.module`.

Currently supported `os`: linux

Currently supported `arch`: amd64