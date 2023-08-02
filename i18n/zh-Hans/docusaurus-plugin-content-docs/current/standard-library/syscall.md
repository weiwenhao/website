---
title: syscall
sidebar_position: 10
---

`import syscall`

syscall 底层的系统维度的标准库，其用于和操作系统交互，会深入到与 C 语言交互的层面。基本都还原了 linux 系统调用，与系统调用参数一致，所以不详细介绍每个系统调用的作用。其中每一个系统调用都会受到操作系统的影响产生错误，可以使用 try 捕获错误。

## 内容

https://github.com/nature-lang/nature/blob/master/std/syscall/main.linux.n


## 使用示例 

[20230728_00_fork_exec.n](https://github.com/nature-lang/nature/blob/master/tests/blackbox/cases/20230728_00_fork_exec.n)

[20230725_00_syscall](https://github.com/nature-lang/nature/tree/master/tests/blackbox/cases/20230725_00_syscall)

[20230727_01_syscall](https://github.com/nature-lang/nature/tree/master/tests/blackbox/cases/20230727_01_syscall)

[20230728_01_stat.n](https://github.com/nature-lang/nature/blob/master/tests/blackbox/cases/20230728_01_stat.n)

[20230728_02_syscall.n](https://github.com/nature-lang/nature/blob/master/tests/blackbox/cases/20230728_02_syscall.n)

[20230729_00_syscall.n](https://github.com/nature-lang/nature/blob/master/tests/blackbox/cases/20230729_00_syscall.n)

[20230729_01_syscall.n](https://github.com/nature-lang/nature/blob/master/tests/blackbox/cases/20230729_01_syscall.n)

[20230730_00_net.n](https://github.com/nature-lang/nature/blob/master/tests/blackbox/cases/20230730_00_net.n)



### fn read(int fd, [u8] buf):int

```nature
var buf = [] as [u8,20]
var (len, err) = try syscall.read(fd, buf)
```

### fn write(int fd, [u8] buf):int

```nature
var buf = 'hello world'
syscall.write(fd, buf)
```

### fn open(string filename, int flags, u32 perm): int

```nature
var fd = syscall.open('./mock/stat.txt', syscall.O_RDONLY, 0666)
```

### fn close(int fd)

```nature
syscall.close(fd)
```

### fn unlink(string path)

### fn seek(int fd, int offset, int whence):int

`syscall.seek(fd, 0, syscall.SEEK_SET)`

### fn fork():int 

```nature
var (pid, err) = try syscall.fork()
if err.has {
    return print('fork err: ', err.msg, '\n')
}

if pid > 0 {
    // 主进程
} else {
    // 子进程
}
```

### fn exec(string path, [string] argv, [string] envp)

```nature
syscall.exec('/bin/echo', ['echo', 'hello world'], ['env1=v', 'env2=2'])
```

exec 基于 execvp 实现，无返回值，会占用当前进程空间。

### fn stat(string filename):stat_t 

### fn fstat(int fd):stat_t

```nature
var s = syscall.stat('./mock/stat.txt')
println(s.dev)
println(s.ino)
println(s.nlink)
println(s.rdev)
println(s.size)
println(s.blksize)
println(s.blocks)
println(s.mode)
println(s.uid)
println(s.gid)
println(s.atim.sec)
println(s.atim.nsec)
println(s.mtim.sec)
println(s.mtim.nsec)
println(s.ctim.sec)
println(s.ctim.nsec)
```

### fn mkdir(string path, u32 mode)

```nature
var err = try syscall.mkdir(path, 0755)
if err.has {
    print('mkdir err: ', err.msg, '\n')
}
```

### fn rmdir(string path) 

```nature
syscall.rmdir(path)
```

### fn rename(string oldpath, string newpath)

### fn exit(int status) 

### fn getpid():int

### fn getppid():int

### fn kill(int pid, int sig)

### fn wait(int pid):int

### fn chdir(string path) 

### fn chroot(string path) 

### fn chown(string path, u32 uid, u32 gid) 

### fn chmod(string path, u32 mode)

### fn getcwd():string 

### fn socket(int domain, int t, int protocol):int 

```nature
int sockfd = syscall.socket(syscall.AF_INET, syscall.SOCK_STREAM, 0)
```

### fn bind(int sockfd, sockaddr_t addr)

```nature
var addr = syscall.sockaddr_in {
    sin_family = syscall.AF_INET as u16,
    sin_addr = 0x00000000,
    sin_port = libc.htons(8080),
    sin_zero = [] as [u8,8]
}

var err = try syscall.bind(sockfd, addr)
if err.has {
    return print('bind error: ', err.msg)
}
```

### fn listen(int sockfd, int backlog)

```nature
// 监听链接
var err = try syscall.listen(sockfd, 10)
if err.has {
    return print('listen error: ', err.msg, '\n')
}
```

### fn accept(int sockfd, sockaddr_t addr):int

```nature
var client_addr = syscall.sockaddr_in{} // 初始化一个空的地址，等待 callee 赋值

var (client_fd,err) = try syscall.accept(sockfd, client_addr)
if err.has {
    return print('accept error: ', err.msg, '\n')
}
```

### fn recvfrom(int sockfd, [u8] buf, int flags):int

```nature
var recv_buf = [] as [u8]
syscall.recvfrom(client_fd, recv_buf, 0)
```

### fn sendto(int sockfd, [u8] buf, int flags):int

```nature
var resp_str = 'HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: 12\r\n\r\nHello, World!'
var (bytes, err) = try syscall.sendto(client_fd, resp_str as [u8], 0)
```

### fn call6(int number, cptr a1, cptr a2, cptr a3, cptr a4, cptr a5, cptr a6):int 

该函数直接透传给了系统调用原始函数，可以通过系统调用编号触发相关系统调用。上面的系统调用中大部分都是基于该函数完成，使用示例

```nature
import syscall

string s = 'hello world!'
var raw_str = s.raw()
int result = syscall.call6(syscall.SYS_WRITE, syscall.STDOUT_FILENO as cptr, raw_str, s.len() as cptr, 0, 0, 0)

// read
var fd = syscall.open('./mock/stat.txt', syscall.O_RDONLY, 0666)
var buf = [] as [u8,100] // 预先申请好了空间, 便于 syscall 中将相应的值回写
print('buf len: ', buf.len(), ', buf cap: ', buf.cap(), '\n')

result = syscall.call6(syscall.SYS_READ, fd as cptr, buf.raw(), buf.len() as cptr, 0, 0, 0)

print('read result: ', result, '\n')
print('buf: ', buf as string, '!!!', '\n')
```