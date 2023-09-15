---
title: time
sidebar_position: 30
---

`import time`

## Contents

https://github.com/nature-lang/nature/blob/master/std/time/main.n

## Examples

https://github.com/nature-lang/nature/blob/master/tests/blackbox/cases/20230810_00_time.n

```nature
type time_t = struct {
    i64 sec
    i64 nsec
    ptr<libc_tm_t> tm
    var timestamp = fn(self s):i64  
    var datetime = fn(self s):string
}
```

### fn now():time_t