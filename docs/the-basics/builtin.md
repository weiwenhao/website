---
title: Builtin
sidebar_position: 70
---

Built-in functions are globally accessible and do not need to be imported. They are generally declared in the `builtin_temp.n` file.

## print/println

Definition:

```nature
fn print(...[any] args) {}

fn println(...[any] args) {}
```

Only bool/string/number types are supported for printing. Compared to `print`, `println` adds a newline character `\n` and separates each argument with a space.

Example:

```nature
println("hello", true, "world")

// output:
// > hello true world
// >
```

## errort

Definition:

```nature
type tracet = struct {
    string path
    string ident
    int line
    int column
}

type errort = struct {
    string msg
    [tracet] traces
    bool has
}
```

We have already encountered this structure in the error-handling section.

## sizeof

```nature
int len = sizeof(int) // 8
int len = sizeof(f32) // 4
```

`sizeof` is not a built-in function per se because its argument is a type. You can think of `sizeof` as a built-in macro. Essentially, it is equivalent to writing `sizeof int`.

## Reserved Keywords

```nature
continue
break
arr
vec
map
set
tup
ptr
cptr
true
false
type
null
any
self
struct
for
in
if
else
else if
var
string
bool
float
f32
f64
int
i8
i16
i32
i64
uint
u8
u16
u32
u64
fn
return
catch
try
throw
let
gen
import
as
is
sizeof
```

---

🎉 Congratulations! If you've reached this point, you've mastered the basic syntax and concepts of the Nature language and are ready for software development using Nature. If you want to go further, please continue your journey.
