---
title: strings
sidebar_position: 25
---

`import strings`

## Contents

https://github.com/nature-lang/nature/blob/master/std/strings/main.n

## Examples

https://github.com/nature-lang/nature/blob/master/tests/blackbox/cases/20230901_00_strings.n

### fn from(cptr p):string

Create a nature string based on the C string.

### fn find_char(string s, u8 char, int after):int

### fn find(string s, string sub, int after):int

### fn reverse(string s):string

### fn rfind(string s, string sub, int before):int

Sub str starting from the right and index < before.

### fn ends_with(string s, string ends):bool

### fn starts_with(string s, string starts):bool

### fn contains(string s, string sub):bool

### fn finish(string s, string cap):string

### fn find(string s, string sub):int

### fn slice(string s, int start, int end):string

### fn split(string s, string separator):[string]

### fn join([string] list, string separator):string

### fn ascii(string c):u8

### fn ltrim(string s, [string] list):string

### fn rtrim(string s, [string] list):string

### fn trim(string s, [string] list):string

### fn replace(string s, string sub_old, string sub_new):string