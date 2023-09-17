---
title: compress
sidebar_position: 60
---

未集成到标准库，需要使用 package.toml 的 dependencies 引入

```toml
[dependencies]
compress = { type = "git", version = "v1.0.0", url = "github.com/weiwenhao/compress", use_links = true }
```

## 使用示例

https://github.com/nature-lang/nature/blob/master/tests/blackbox/cases/20230830_00_compress/main.n

使用

`import compress.tgz`

### fn encode(string workdir, string tgz_path, [string] sources)

@sources 是具体的文件夹或者目录名称，不支持按通配符号，如 \* 或者 . 来匹配所有文件
@workdir 表示具体的工作目录, 相关 sources 都是在 workdir 中被找到的

### fn decode(string workdir, string tgz_path)
