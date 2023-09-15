---
title: strings
sidebar_position: 25
---

`import strings`

## 内容

https://github.com/nature-lang/nature/blob/master/std/strings/main.n

## 使用示例

https://github.com/nature-lang/nature/blob/master/tests/blackbox/cases/20230901_00_strings.n

### fn from(cptr p):string

基于 c 字符串创建一个 nature 字符串 

### fn find_char(string s, u8 char, int after):int

### fn find(string s, string sub, int after):int

### fn reverse(string s):string

### fn rfind(string s, string sub, int before):int

从右侧开始查找，且 index < before 的 sub str

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