---
title: struct
sidebar_position: 60
---

Although nature has built-in composite data types, they can't cover all scenarios. By using struct, I can combine any types I want, such as:

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

Output result

```shell
> ./main
200
60
3000
290
```

struct is usually used with the custom type syntax `type ident = ...`. The example uses the struct keyword to declare a new type called rectangle, which has 4 properties. Firstly, length and width properties are declared. Multiple struct attributes are separated by newline characters `\n`. Next, two properties, area and perimeter, are declared **with default values, so type inference with var is possible.**

By using the keyword rectangle, instances of the struct can be created. The code above declares two instances of rectangle, box and banner. As can be seen from the output, both instances have their own length and width properties, one of the features of struct instantiation. During the instantiation process, default values in the struct will be checked and passed to the instantiated struct. If neither side declares a value for a property, it will be initialized to zero.

**During instantiation, properties are assigned values separated by commas**. For instantiated structs like box, properties can be accessed using the dot `.` syntax, like `box.width`. Properties in the struct can be freely read or written using this syntax, such as `box.width = 123`.

It's also worth noting that the value of the area property in the example is an anonymous function. The type of the first parameter in the anonymous function is declared as self. As mentioned earlier, this self type's corresponding variable, s, can access other properties in the current struct, like s.width. This is the **first and only use case of the self syntax —— in the default declaration of the type of the first parameter in a struct fn**. Self is not mandatory. If you don't need to access other properties in the struct, you don't need to declare this type and its corresponding value. The compiler will determine whether the first parameter's type is self and pass in the appropriate value. Below are a few examples of the correct usage of self:

```nature
type foo = struct {
	var bar = fn(self s):int {} // v Correct usage
	var car = fn(int a):int {} // v Correct usage, no need to access other properties in the struct
	var baz = fn(int a, self s):int {} // x Self type can only be declared in the first parameter
	fn(self s, int a):int baq // x Self can only be used in the default value declaration of fn type
}

var f = foo{}
f.bar = fn(self s):in {} // x Self can only be used in the default value declaration of fn type
```

Compared to fn, using struct allows us to better organize our code. Struct is also one of the syntax concepts in nature that is closest to object-oriented programming, the other being module.

More in-depth details about struct will be covered in later advanced chapters.