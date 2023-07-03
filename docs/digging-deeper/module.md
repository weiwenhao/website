---
title: Modules
sidebar_position: 40
---

In practical software development, organizing code into different files based on functionality allows for easier code management and maintenance. This is the basic idea behind modular development. Although Nature's package management functionality is still in the design phase and the modular functionality is relatively simple, it can still help us organize code effectively.

Let's take a look at a simple example using the user module.

```nature title='user.n'
// Global type
type user = struct {
   int id
   string username
   string password
}

// Global variables (type inference not supported for now)
int id = 1
[user] list = []
{string:user} userof = {}

// Global functions
fn register(string username, string password) {
   if (userof[username]) {
      throw 'The user has already registered'
   }

   var u = user {
      id = id,
      username = username,
      password = password
   }

   list.push(u)
   userof[username] = u
   id += 1
}

fn find(string username):user {
   if (!userof[username]) {
      throw 'User not found'
   }

   return userof[username]
}
```

In a module, we can declare types, variables, and functions. However, control flow statements, variable assignments, and tuple destructuring assignments are not allowed in modules.

:::caution
Type inference is not supported when declaring variables in modules.
:::

This way of organizing code is similar to using a struct, but with the addition of custom types. Modules do not need to be instantiated; they can be directly used after importing. The variables defined in the module are globally shared, similar to static properties in classes. Now let's see how we can use the user module.

```nature title='main.n'
import 'user.n'   // Import based on the relative path from the current main.n file

user.register('xiaowei', 'hahaha123')

user.register('xiaoyou', 'nanana456')

var err = try user.register('xiaoyou', 'nanana789')
if err.has {
   println(err.msg)
}

var foo = user.find('xiaoyou')
println(foo.username, '-', foo.password)

println('current user count=', user.list.len())
```

Place `user.n` and `main.n` in the same directory. After compiling and executing `main.n`, we get the following output:

```shell
> ./main
The user has already registered
xiaoyou-nanana456
current user count=2
```

The `import` keyword is used to import a module using a path relative to the current Nature source file. After importing, the file name is used as the identifier for the module by default. Alternatively, you can specify an identifier using the `as` keyword, such as `import "user.n" as user_model`.

:::caution
Since package management is still under consideration, module imports are currently based on paths and only support relative paths from the current file. Absolute paths or patterns like `./` and `../` are not supported for module imports.
:::

The syntax `module_ident.property` is used to access variables, functions, and types defined in a module. In the example, `user.register` accesses the `register` function in the user module.

> 💡 Nature does not have the concept of access control in its basic syntax. Variables, functions, and types defined in modules are globally accessible.

When running `nature build main.n`, `main.n` is treated as an entry file. Inside this file, you can write control flow expressions and other syntax elements. However, `main.n` cannot be imported by other files. This is because Nature wraps all statements defined in `main.n` inside `fn main() {}`, giving us a scripting-like experience.
