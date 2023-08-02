---
title: syscall
sidebar_position: 10
---

`import syscall`

The `syscall` module provides low-level system-level functionalities to interact with the operating system. It delves into the realm of interacting with C language and largely replicates Linux system calls, using the same parameters as the system calls. Therefore, we won't go into detail about the purpose of each system call. Each system call is influenced by the operating system and can produce errors, which can be caught using `try` to handle exceptions.

## Contents

[https://github.com/nature-lang/nature/blob/master/std/syscall/main.linux.n](https://github.com/nature-lang/nature/blob/master/std/syscall/main.linux.n)

## Usage Examples

- [20230728_00_fork_exec.n](https://github.com/nature-lang/nature/blob/master/tests/blackbox/cases/20230728_00_fork_exec.n)
- [20230725_00_syscall](https://github.com/nature-lang/nature/tree/master/tests/blackbox/cases/20230725_00_syscall)
- [20230727_01_syscall](https://github.com/nature-lang/nature/tree/master/tests/blackbox/cases/20230727_01_syscall)
- [20230728_01_stat.n](https://github.com/nature-lang/nature/blob/master/tests/blackbox/cases/20230728_01_stat.n)
- [20230728_02_syscall.n](https://github.com/nature-lang/nature/blob/master/tests/blackbox/cases/20230728_02_syscall.n)
- [20230729_00_syscall.n](https://github.com/nature-lang/nature/blob/master/tests/blackbox/cases/20230729_00_syscall.n)
- [20230729_01_syscall.n](https://github.com/nature-lang/nature/blob/master/tests/blackbox/cases/20230729_01_syscall.n)
- [20230730_00_net.n](https://github.com/nature-lang/nature/blob/master/tests/blackbox/cases/20230730_00_net.n)

### `fn read(int fd, [u8] buf):int`

```nature
var buf = [] as [u8,20]
var (len, err) = try syscall.read(fd, buf)
```

### `fn write(int fd, [u8] buf):int`

```nature
var buf = 'hello world'
syscall.write(fd, buf)
```

### `fn open(string filename, int flags, u32 perm): int`

```nature
var fd = syscall.open('./mock/stat.txt', syscall.O_RDONLY, 0666)
```

### `fn close(int fd)`

```nature
syscall.close(fd)
```

### `fn unlink(string path)`

### `fn seek(int fd, int offset, int whence):int`

```nature
syscall.seek(fd, 0, syscall.SEEK_SET)
```

### `fn fork():int`

```nature
var (pid, err) = try syscall.fork()
if err.has {
    return print('fork err: ', err.msg, '\n')
}

if pid > 0 {
    // Parent process
} else {
    // Child process
}
```

### `fn exec(string path, [string] argv, [string] envp)`

```nature
syscall.exec('/bin/echo', ['echo', 'hello world'], ['env1=v', 'env2=2'])
```

The `exec` function is based on `execvp` and does not return a value. It will replace the current process with the specified executable.

### `fn stat(string filename):stat_t`

### `fn fstat(int fd):stat_t`

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

### `fn mkdir(string path, u32 mode)`

```nature
var err = try syscall.mkdir(path, 0755)
if err.has {
    print('mkdir err: ', err.msg, '\n')
}
```

### `fn rmdir(string path)`

```nature
syscall.rmdir(path)
```

### `fn rename(string oldpath, string newpath)`

### `fn exit(int status)`

### `fn getpid():int`

### `fn getppid():int`

### `fn kill(int pid, int sig)`

### `fn wait(int pid):int`

### `fn chdir(string path)`

### `fn chroot(string path)`

### `fn chown(string path, u32 uid, u32 gid)`

### `fn chmod(string path, u32 mode)`

### `fn getcwd():string`

### `fn socket(int domain, int t, int protocol):int`

```nature
int sockfd = syscall.socket(syscall.AF_INET, syscall.SOCK_STREAM, 0)
```

### `fn bind(int sockfd, sockaddr_t addr)`

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

### `fn listen(int sockfd, int backlog)`

```nature
// Listen for connections
var err = try syscall.listen(sockfd, 10)
if err.has {
    return print('listen error: ', err.msg, '\n')
}
```

### `fn accept(int sockfd, sockaddr_t addr):int`

```nature
var client_addr = syscall.sockaddr_in{} // Initialize an empty address, waiting for callee to assign values

var (client_fd,err) = try syscall.accept(sockfd, client_addr)
if err.has {
    return print('accept error: ', err.msg, '\n')
}
```

### `fn recvfrom(int sockfd, [u8] buf, int flags):int`

```nature
var recv_buf = [] as [u8]
syscall.recvfrom(client_fd, recv_buf, 0)
```

### `fn sendto(int sockfd, [u8] buf, int flags):int`

```nature
var resp_str = 'HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: 12\r\n\r\nHello, World!'
var (bytes, err) = try syscall.sendto(client_fd, resp_str as [u8], 0)
```

### `fn call6(int number, cptr a1, cptr a2, cptr a3, cptr a4, cptr a5, cptr a6):int`

This function directly passes through to the raw system call function, allowing you to trigger specific system calls using the system call number. Most of the above system calls are implemented based on this function. Here is an example of how to use it:

```nature
import syscall

string s = 'hello world!'
var raw_str = s.raw()

int result = syscall.call6(syscall.SYS_WRITE, syscall.STDOUT_FILENO as cptr, raw_str, s.len() as cptr, 0, 0, 0)

// read
var fd = syscall.open('./mock/stat.txt', syscall.O_RDONLY, 0666)
var buf = [] as [u8,100] // Preallocate buffer space to facilitate the syscall writing back the corresponding value
print('buf len: ', buf.len(), ', buf cap: ', buf.cap(), '\n')

result = syscall.call6(syscall.SYS_READ, fd as cptr, buf.raw(), buf.len() as cptr, 0, 0, 0)

print('read result: ', result, '\n')
print('buf: ', buf as string, '!!!', '\n')
```