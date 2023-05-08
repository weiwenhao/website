---
title: 模块
sidebar_position: 30
---

在实际的软件开发中，把代码按照功能模块组织到不同的文件中可以方便代码管理和维护，这就是模块化开发的基础思想。虽然 nature 的包管理功能目前还在设计中，模块化功能相对较为简单，但它也可以帮助我们更好地组织代码。

来看一个简单的示例，以用户模块为例

```nature title='user.n'
// 全局类型
type user = struct {
   int id
   string username
   string password
}

// 全局变量(暂时不支持类型自动推导)
int id = 1
[user] list = []
{string:user} userof = {}

// 全局函数
fn register(string username, string password) {
   if (userof[username]) {
      throw "The user has already registered"
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
      throw "user notfound"
   }

   return userof[username]
}
```

在 module 中我们可以声明类型/变量/函数，但是不能使用如控制流，变量赋值，tuple 解构赋值都语法。

:::caution
module 中声明变量时不支持类型推导
:::

这种组织代码的方式很像 struct，但是多了自定义 type，且 module 不需要实例化，只需要 import 就可以直接是使用，所以其中定义的变量信息是全局共享的，我们也可以称为全局变量，类似于 class 中的 static 属性。接下来看看如何使用 user 模块吧

```nature title='main.n'
import "user.n"   // 基于当前 main.n 文件的相对路径引入

user.register("xiaowei", "hahaha123")

user.register("xiaoyou", "nanana456")

var err = catch user.register("xiaoyou", "nanana789")
if (err) {
   println(err.msg)
}

var foo = user.find("xiaoyou")
println(foo.username, "-", foo.password)

println("current user count=", user.list.length())
```

将 user.n 和 main.n 放在同一目录下，对 main.n 进行编译执行后可以得到以下输出

```shell
> ./main
The user has already registered
xiaoyou-nanana456
current user count=2
```

`import` 关键字以**相对于当前 nature 源文件**路径的方式引入 module，import 之后默认以文件名作为 module 的使用标识，也可以通过 as 关键字指定使用标识，如 `import "user.n" as user_model` 。

:::caution
由于包管理还在构思中，所以 module 目前是基于路径的引入，仅开放了最小的能力的模块路径 import，也就是基于当前文件的相对路径引入。不支持通过绝对路径或 `./` 、`../` 的模式引入 module
:::

使用 `module_ident.property` 语法可以访问 module 中定义的变量/函数/类型，示例中的 `user.register` 访问了 user 模块中的 register 函数。

> 💡 nature 在基础语法中没有访问控制的概念，在 module 中定义的变量/函数/类型都是全局开放的。

当执行 `nature build main.n` 时，main.n 被视作一个入口文件，其中可以编写控制流表达式等各种语法，且 main.n 无法被其他文件 import，这是因为 nature 会将 main.n 中定义的的语句都包裹在 `fn main() {}` 中。让我们有种在写脚本一样的错觉。
