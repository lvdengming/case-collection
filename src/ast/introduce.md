# 功能介绍

通过手写编译执行过程，将 LISP 代码编译成 C 代码，流程如下：

![process.png](./process.png)

LISP 源代码：`(add 2 (subtract 4 2))`

C 目标代码：`add(2, subtract(4, 2))`

> 代码实现中，JSDoc 使用不熟练没有深入使用
