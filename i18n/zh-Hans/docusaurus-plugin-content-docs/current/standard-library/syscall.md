---
title: syscall
sidebar_position: 10
---

`import syscall`

syscall 底层的系统维度的标准库，其用于和操作系统交互，会深入到与 C 语言交互的层面。基本都还原了 linux 系统调用，与系统调用参数一致，所以不详细介绍每个系统调用的作用。其中每一个系统调用都会受到操作系统的影响产生错误，可以使用 try 捕获错误。

## 内容

https://github.com/nature-lang/nature/blob/master/std/syscall/main.linux.n


## 使用示例 

https://github.com/nature-lang/nature/blob/master/tests/blackbox/cases/20230728_00_fork_exec.n

https://github.com/nature-lang/nature/tree/master/tests/blackbox/cases/20230725_00_syscall

https://github.com/nature-lang/nature/tree/master/tests/blackbox/cases/20230727_01_syscall

https://github.com/nature-lang/nature/blob/master/tests/blackbox/cases/20230728_01_stat.n

https://github.com/nature-lang/nature/blob/master/tests/blackbox/cases/20230728_02_syscall.n

https://github.com/nature-lang/nature/blob/master/tests/blackbox/cases/20230729_00_syscall.n

https://github.com/nature-lang/nature/blob/master/tests/blackbox/cases/20230729_01_syscall.n

https://github.com/nature-lang/nature/blob/master/tests/blackbox/cases/20230730_00_net.n


### stat_t

```nature
type stat_t = struct {
    u64 dev
    u64 ino
    u64 nlink
    u32 mode
    u32 uid
    u32 gid
    u32 __pad0
    u64 rdev
    i64 size
    i64 blksize
    i64 blocks
    timespec_t atim
    timespec_t mtim
    timespec_t ctim
    arr<i64,3> __unused
}
```

### timespec_t

```nature
type timespec_t = struct {
    i64 sec
    i64 nsec
}
```

### sockaddr_in

```nature
type sockaddr_in = struct {
    u16 sin_family
    u16 sin_port
    u32 sin_addr
    arr<u8,8> sin_zero
}
```

### sockaddr_in6

```nature
type sockaddr_in6 = struct {
    u8 sin6_len
    u8 sin6_family
    u16 sin6_port
    u32 sin6_flowinfo
    // ipv6 address(128-bit)
    arr<u32,4> sin6_addr
    u32 sin6_scope_id
}
```

### sockaddr_un

```nature
type sockaddr_un = struct {
    u8 sun_len
    u8 sun_family
    //  char sun_path[108];
    arr<u8,108> sun_path
}
```

---

### fn call6(int number, cptr a1, cptr a2, cptr a3, cptr a4, cptr a5, cptr a6):int

### fn open(string filename, int flags, u32 perm):int

### fn read(int fd, [u8] buf):int

### fn read(int fd, cptr buf, int len):int

### fn readlink(string file, [u8] buf):int

### fn write(int fd, [u8] buf):int

### fn write(int fd, cptr buf, int len):int

### fn close(int fd)

### fn unlink(string path)

### fn seek(int fd, int offset, int whence):int

### fn fork():int

### fn exec(string path, [string] argv, [string] envp)

### fn stat(string filename):stat_t

### fn fstat(int fd):stat_t

### fn mkdir(string path, u32 mode)

### fn rmdir(string path)

### fn rename(string oldpath, string newpath)

### fn exit(int status)

### fn getpid():int

### fn getppid():int

### fn getcwd():string

### fn kill(int pid, int sig)

### fn wait(int pid, int option):(int, int)

### fn chdir(string path)

### fn chroot(string path)

### fn chown(string path, u32 uid, u32 gid)

### fn chmod(string path, u32 mode)

### fn clock_gettime(int clock_id):timespec_t

### fn socket(int domain, int t, int protocol):int

### fn bind(int sockfd, sockaddr_t addr)

### fn bind(int sockfd, sockaddr_in6 addr)

### fn listen(int sockfd, int backlog)

### fn accept(int sockfd, ptr<sockaddr_t> addr):int

### fn recvfrom(int sockfd, [u8] buf, int flags):int

### fn sendto(int sockfd, [u8] buf, int flags):int

### fn get_envs():[string]

### fn get_env(string key):string

### fn set_env(string key, string value)

### fn unshare(int flags)

### fn mount(string source, string target, string fs_type, u32 flags, string data)

### fn umount(string target, u32 flags)