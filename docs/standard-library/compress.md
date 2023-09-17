---
title: compress
sidebar_position: 60
---

Not integrated into the standard library, you need to import it using `package.toml`  dependencies.

```toml
[dependencies]
compress = { type = "git", version = "v1.0.0", url = "github.com/weiwenhao/compress", use_links = true }
```

## Usage Example

https://github.com/nature-lang/nature/blob/master/tests/blackbox/cases/20230830_00_compress/main.n

Usage:

`import compress.tgz`

### fn encode(string workdir, string tgz_path, [string] sources)

@sources are the specific folder or directory names, wildcard characters like `*` or `.` for matching all files are not supported.
@workdir represents the specific working directory, all related sources are found within workdir.

### fn decode(string workdir, string tgz_path)
