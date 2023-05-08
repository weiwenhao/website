---
title: 模块
sidebar_position: 30
---


之前的示例中我们一直围绕着 main.n 这个文件，但是如果所有的代码都放在一个文件中会让代码管理变得困难。我们可以把代码按照功能组织在不同文件中，这就是模块 (module) 都基础思想，由于包管理还在设计中。所以 nature 目前都模块功能较为有限且比较简单。来看看示例吧

以 user.n 也就是用户模块为例子
```nature
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

> ❗️ module 中声明变量时不支持类型推导

这种组织代码的方式很像 struct，但是多了自定义 type，且 module 不需要实例化只需要 import 就可以直接是使用，所以其中的变量信息是全局共享的，类似于 class 中的 static 变量。接下来看看如何使用 user 模块吧，我们声明 main.n 并声明如下代码

```nature
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

`import` 关键字通过以相对于当前 nature 源文件路径的方式引入 module，import 之后默认以文件名作为 module 的使用标识，也可以通过 as 关键字指定使用标识，如 `import "user.n" as user_model` 。

> ❗️由于包管理还在构思中，所以 module 目前是基于路径的引入，所以仅开放了最小的能力的模块路径 import，也就是基于当前文件的相对路径引入。不支持通过绝对路径或 `./` 、`../` 的模式引入 module

使用 `module_ident.property` 语法可以访问 module 中定义的变量/函数/类型，例如示例中的 `user.register` 访问了 user 模块中的 register 函数。

> 💡 nature 目前没有访问控制的概念，在 module 中定义的所有属性都是全局开放的。

当执行 nature build foo.n 时，foo.n 被视作一个入口文件，其中可以编写控制流表达式等各种语法，且 foo.n 无法被其他文件 import，这是因为 nature 会将 main.n 中所有的语句都包裹在 fn main() {} 中。让我们有种在写脚本一样的错觉。