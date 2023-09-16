---
title: Operator
sidebar_position: 50
---

Currently Supported Operators

| Priority | Keyword | Example Usage  | Description            |
| -------- | ------- | -------------- | ---------------------- |
| 1        | ()      | (1 + 1)        | (expr)                 |
| 2        | -       | -12            | -number_expr (Negation)|
| 2        | !       | !true          | !bool_expr (Logical NOT)|
| 2        | ~       | ~12            | ~integer_expr (Bitwise NOT)|
| 3        | /       | 1 / 2          | Division               |
| 3        | *       | 1 * 2          | Multiplication         |
| 3        | %       | 5 % 2          | Remainder              |
| 4        | +       | 1 + 1          | Addition               |
| 4        | -       | 1 - 1          | Subtraction            |
| 5        | <<      | 100 << 2       | Bitwise Left Shift     |
| 5        | >>      | 100 >> 2       | Bitwise Right Shift    |
| 6        | >       | 1 > 2          | Greater Than           |
| 6        | >=      | 1 >= 2         | Greater Than or Equal  |
| 6        | <       | 1 < 2          | Less Than              |
| 6        | <=      | 1 <= 2         | Less Than or Equal     |
| 7        | ==      | 1 == 2         | Equal To               |
| 7        | !=      | 1 != 2         | Not Equal To           |
| 8        | &       | 1 & 2          | Bitwise AND            |
| 9        | ^       | 1 ^ 2          | Bitwise XOR            |
| 10       | \|      | 1 \| 2         | Bitwise OR             |
| 11       | &&      | true && true   | Logical AND            |
| 12       | \|\|    | true \|\| true | Logical OR             |
| 13       | =       | a = 1          | Assignment             |
| 13       | %=      | a %= 1         | Equivalent to a = a % 1|
| 13       | *=      | a *= 1         | a = a * 1              |
| 13       | /=      | a /= 1         | a = a / 1              |
| 13       | +=      | a += 1         | a = a + 1              |
| 13       | -=      | a -= 1         | a = a - 1              |
| 13       | \|=     | a \|= 1        | a = a \| 1             |
| 13       | &=      | a &= 1         | a = a & 1              |
| 13       | ^=      | a ^= 1         | a = a ^ 1              |
| 13       | <<=     | a <<= 1        | a = a << 1             |
| 13       | >>=     | a >>= 1        | a = a >> 1             |

:::tip
Due to the numerous `int` data types, subsequent documentation will use "integer" to represent integers, "float" to represent floating-point numbers, and "number" to include both types.
:::

#### Points to Note

- Operators are grouped by priority. When the priority is the same, they are evaluated from left to right.

- Binary operators (operators with two operands) currently support binary operations of the number and string types, where string only supports '+' and comparison operator signs

- Bitwise operations only support the "integer" type.



