---
title: Operators
sidebar_position: 50
---

The currently supported operators are as follows:

| Precedence | Operator | Example        | Description                       |
| ---------- | -------- | -------------- | --------------------------------- |
| 1          | ()       | (1 + 1)        | (expr)                            |
| 2          | -        | -12            | -number_expr Negation of a number |
| 2          | ！       | !true          | !bool_expr Logical NOT            |
| 2          | ~        | ~12            | ~integer_expr Bitwise NOT         |
| 3          | /        | 1 / 2          | Division                          | 
| 3          | \*       | 1 \* 2         | multiply                              |
| 3          | %        | 5 % 2          | Modulo                              |
| 4          | +        | 1 + 1          | Addition                                |
| 4          | -        | 1 - 1          | Subtraction                                |
| 5          | <<       | 100 << 2       | Bitwise left shift                          |
| 5          | >>       | 100 >> 2       | Bitwise right shift                          |
| 6          | >        | 1 > 2          | Greater than                              |
| 6          | >=       | 1 >= 2         | Greater than or equal to                          |
| 6          | <        | 1 < 2          | Less than                              |
| 6          | <=       | 1 <= 2         | Less than or equal to                          |
| 7          | ==       | 1 == 2         | Equal to                              |
| 7          | !=       | 1 != 2         | Not equal to                            |
| 8          | &        | 1 & 2          | Bitwise AND                            |
| 9          | ^        | 1 ^ 2          | Bitwise XOR                          |
| 10         | \|       | 1 \| 2         | Bitwise OR                            |
| 11         | &&       | true && true   | Logical AND                            |
| 12         | \|\|     | true \|\| true | Logical OR                            |
| 13         | =        | a = 1          | Assignment operator                        |
| 13         | %=       | a %= 1         |  a = a % 1                  |
| 13         | \*=      | a \*= 1        | a = a \* 1                        |
| 13         | /=       | a /= 1         | a = a / 1                         |
| 13         | +=       | a += 1         | a = a + 1                         |
| 13         | -=       | a -= 1         | a = a - 1                         |
| 13         | \|=      | a \|= 1        | a = a \| 1                        |
| 13         | &=       | a &= 1         | a = a & 1                         |
| 13         | ^=       | a ^= 1         | a = a ^ 1                         |
| 13         | <<=      | a <<= 1        | a = a << 1                        |
| 13         | >>=      | a >>= 1        | a = a >> 1                        |

:::tip
Due to the large number of integer data types, in order to represent them uniformly, the term "integer" will be used in the following documentation to refer to the integer types, "float" will be used for floating-point types, and "number" will be used to encompass both types.
:::

Here are some important details to note:

- Operators associate according to their precedence and are evaluated from left to right when they have the same precedence.
- Binary operators (operators that take two operands) currently only support the number type. However, support for the + and == operators with string types will be added in the future.
- Bitwise operators only work with the integer type.


