---
title: Modules
sidebar_position: 40
---

In actual software development, organizing code into different files based on functional modules can facilitate code management and maintenance. This is the basic idea of modular development. Although Nature's package management feature is still under design, its modular functionality, albeit simple, can help us better organize code.

Let's look at a simple example, taking the user module as an example.

```nature title='user.n'
// Global type
type user = struct {
   int id
   string username
   string password
}

// Global variables (type inference is not supported for now)
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
      throw 'user not found'
   }

   return userof[username]
}
```

In a module, we can declare types/variables/functions, but we cannot use syntax like control flow, variable assignment, or tuple destructuring.

:::caution
Type inference is not supported when declaring variables in a module.
:::

This way of organizing code is similar to a struct, but it also allows custom types. Moreover, a module does not need to be instantiated; it only needs to be imported to be used directly. Therefore, the variable information defined in it is globally shared, which can also be called global variables, similar to static properties in a class. Let's see how to use the user module next.

```nature title='main.n'
import 'user.n'   // Import based on the relative path of the current main.n file

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

Place `user.n` and `main.n` in the same directory. After compiling and executing `main.n`, you can get the following output:

```shell
> ./main
The user has already registered
xiaoyou-nanana456
current user count=2
```

The `import` keyword imports a module **relative to the current Nature source file**. After importing, the filename is used by default as the module's usage identifier. You can also specify the usage identifier using the `as` keyword, such as `import "user.n" as user_model`.

:::caution
Since package management is still under consideration, module importation is currently based on paths. Only the minimal capability of module path import is opened, which is based on the relative path of the current file. Importing modules through absolute paths or `./`, `../` patterns is not supported.
:::

Using `module_ident.property` syntax, you can access variables/functions/types defined in the module. For example, `user.register` accesses the `register` function in the user module.

> 💡 Nature does not have the concept of access control in its basic syntax. Variables/functions/types defined in a module are globally open.

When executing `nature build main.n`, `main.n` is considered an entry file. It can contain control flow expressions and various other syntax, and `main.n` cannot be imported by other files. This is because Nature will wrap all the statements defined in `main.n` within `fn main() {}`, giving us the illusion of writing a script.
