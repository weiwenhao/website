---
title: Built-in Functions
sidebar_position: 70
---

Built-in functions can be called directly without the need for import and can also be referred to as global functions.

## print/println

Definition

```nature
fn print(...[any] args) {}

fn println(...[any] args) {}
```

Printing is only supported for bool/string/number data types.  `println` function appends a newline character. Example: `println("hello", true, "world")`

## set

Definition

```
fn set(...[T] keys):{T} {}
```

Initialize a set data structure. Examples: `var s = set()` or `var s = set(1, 2, 3)`

## sleep

Definition

```
fn sleep(int second)
```

Pause the program for a specified number of seconds before executing the next logic.

## errort

Definition

```
type errort = struct {
    string msg
    bool has
}
```

Further understanding of this structure will be gained in subsequent error handling.

---

🎉 Congratulations on completing the basic syntax concepts of Nature! You are now able to develop software using Nature. If you wish to further advance, please continue your journey.
