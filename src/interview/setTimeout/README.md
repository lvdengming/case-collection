# 面试官：前端倒计时有误差怎么解决？

解决方案如下：

1. 监听 `document` 的 `visibilitychange` 事件，在切回标签页时修正定时器
2. 修改定时器回调函数，每次执行函数时修正定时器
3. 使用 `web worker`(worker 中的定时器不受切换标签、最小化窗口影响)

参考：[https://juejin.cn/post/7478687361737768986](https://juejin.cn/post/7478687361737768986)
