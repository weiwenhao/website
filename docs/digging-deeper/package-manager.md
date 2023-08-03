---
title: Package Management
sidebar_position: 50
---

The proposal for package management can be found at https://github.com/nature-lang/nature/issues/10, which contains specific ideas and implementation details. Package management support was introduced in nature starting from version 0.3.0. Apart from addressing dependency management issues, nature's package management also introduces changes to the import mechanism by adding support for importing packages alongside files.

To enable package management, you need to create a `package.toml` file in the root directory of your project. Let's first introduce the format of this file:

## package.toml

```toml
# Basic Information
name = "test" # Project name (used in imports)
version = "1.0.0" # Project version
authors = ["Alice <a@example.com>", "Bob <b@example.com>"]
description = "Your package description"
license = "MIT"
type = "bin" # lib or bin
entry = "rand" # Optional, custom entry file, currently only used when type = lib to find the entry file. Default value is "main".

# Dependency Information, type can be either "git" or "local"
[dependencies]
rand = { type = "git", version = "v1.0.1", url = "jihulab.com/nature-lang/rand" }
syscall = { type = "git", version = "v1.0.1", url = "jihulab.com/nature-lang/syscall" }
os = { type = "git", version = "v1.0.1", url = "jihulab.com/nature-lang/os" }
local = { type = "local", version = "v1.0.0", path = "./mock/local" }
```

After defining the relevant files, execute `npkg sync` to synchronize the related packages. This command will download the packages (type=git) or move them (type=local) to the `$HOME/.nature/package` directory.

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

> ❗️ To enable package management synchronization, you must execute `npkg sync` in the directory where `package.toml` is located. Similarly, `nature build` should also be executed in the project's root directory to find the `package.toml` file!!!

## Importing Packages

Now you can import the relevant dependency packages using the import statement.

```nature
import rand // When directly importing the package name, it is equivalent to importing the rand.main module
import rand.utils.seed // Importing rand@v1.0.1/utils/seed.n

int res = rand.dump()
rand.seed.dump()
```

For the import syntax `import rand`, nature will search for the package using three dimensions. First, it checks if it matches the current package name, as determined by the `name` field in `package.toml`. Next, it checks if it matches any of the keys defined in the `dependencies` section of `package.toml`. Finally, it checks if it is a standard library package.

By default, the last level in the import statement is used as the module name. For example, in the above example, `seed.dump()` can be customized using `as`: `import rand.utils.seed as custom`.

Let's further explain how the import package finds modules. When you directly import `rand`, it means that `rand` is the package name. After determining the package's root directory through the three dimensions mentioned earlier, it starts looking for the specific module file. In fact, `import rand` is just a shorthand for `import rand.main`.

Assuming the root directory of `rand` is `/root/.nature/package/sources/rand`:

`import rand` searches for `/root/.nature/package/sources/rand/main.n` module. This can be configured in `package.toml`.

`import rand.other` searches for `/root/.nature/package/sources/rand/other.n` module.

`import rand.utils.seed` searches for `/root/.nature/package/sources/rand/utils/seed.n` module.

In the module chapter, we mentioned that `import 'file.n'` directly does not allow us to import files from the parent directory. With package management, we can now treat the current project as a package (must define `package.toml`). For example, if our project name is `test`, we can access any file within the project using `import test.dir1.dir2.module`.

But what if there is a naming conflict between the current project's package name and a dependency package's name or if different dependencies require different versions of the same package? In such cases, you can customize the import name by adjusting the dependency package keys:

```toml
rand = { type = "git", version = "v1.0", url = "jihulab.com/nature-lang/rand" }
rand2 = { type = "git", version = "v2.0", url = "jihulab.com/nature-lang/rand" }
```

Use `import rand2` and `import rand` to differentiate between the two.

## Cross Build

Cross-compilation is a common scenario, for instance, when a module like `syscall.n` has different system calls for Linux and Darwin systems, requiring different implementations. In this case, the filename can be used for differentiation, based on the os + arch dimensions. When searching for a file, nature follows a priority order. For example, when compiling for os = linux and arch = amd64, it will search in the order of syscall.linux_amd64.n -> syscall.linux.n -> syscall.n.

Note that `import 'syscall.n'` cannot be used with this cross-compilation mode; it can only be used when importing `package.module`.

Currently supported os: linux

Currently supported arch: amd64