---
title: Struct
sidebar_position: 60
---

While Nature already provides built-in composite data types, they may not cover all scenarios. By using `struct`, I can combine any types I want. For example:

```nature
type rectangle = struct {
	int length
	int width
	var area = fn(self s):int {
		return s.length * s.width
	}
	var perimeter = fn(self s):int {
		return (s.length + s.width) * 2
	}
}

var box = rectangle {
	length = 10,
	width = 20
}

var banner = rectangle {
	length = 120,
	width = 25
}


println(box.area())
println(box.perimeter())

println(banner.area())
println(banner.perimeter())
```

Output:

```shell
> ./main
200
60
3000
290
```

`struct` is typically used together with the custom type syntax `type ident = ...`. In the example above, a new type `rectangle` is declared using the `struct` keyword. This type has four properties: `length` and `width`, separated by a newline character `\n`, and two properties, `area` and `perimeter`, **which include default values and thus can be inferred using the `var` keyword**.

Instances of the struct can be created using the type keyword `rectangle`. In the provided code, two instances of the `rectangle`, `box` and `banner`, are declared. The output shows that both instances have their own `length` and `width` properties, which is one of the characteristics of struct instantiation. During instantiation, missing values are checked for default values in the struct and assigned to the instantiated struct. If a property is not assigned a value on either side, it is initialized to the zero value.

**Multiple property assignments during instantiation are separated by commas**. For an instantiated struct, such as `box`, its properties can be accessed using the dot `.` notation, such as `box.width`. The properties within the struct can be freely accessed or assigned using this syntax, such as `box.width = 123`.

It is worth noting that the value of the `area` property in the example is an anonymous function. The first parameter of the anonymous function is declared as `self`, and it has the type of the self, as mentioned earlier. The variable `s` in the function can access other properties within the current struct, such as `s.width`. This is the **only usage of the `self` syntax as the first and only parameter type in the default declaration of an `fn` type**. The `self` parameter is not mandatory; if you don't need to access other properties within the struct, you don't need to declare this type or its corresponding value. The compiler will determine whether the first parameter type is `self` and pass the appropriate value. Here are a few examples of using `self`:

```nature
type foo = struct {
	var bar = fn(self s): int {} // v Correct usage
	var car = fn(int a): int {} // v Correct usage; no need to access other properties in the struct
	var baz = fn(int a, self s): int {} // x Only allowed in the declaration of the first parameter as self
	fn(self s, int a): int baq // x Only allowed in the default value of the fn type declaration
}

var f = foo{}
f.bar = fn(self s): int {} // x Only allowed in the default value of the fn type declaration
```

With `struct`, we can further organize our code. `struct` is one of the syntax concepts in Nature that is closest to object-oriented programming, with the other being modules.
