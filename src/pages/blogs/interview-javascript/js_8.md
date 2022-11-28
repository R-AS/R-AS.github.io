---
title: 'Event Loop、宏任务、微任务'
date: '2022-11-28'
thumbnail: 'javascript/index.png'
type: 'interview-javascript'
---

#### Event Loop

![pic_1](/blogs/interview-javascript/js_1_pic_1.png#pic_center)

如图所示，由于 JS 是单线程的非阻塞的脚本语言。当 JS 引擎遇到<font color=#f0764c>异步事件(WebAPIS)</font>的时候并不会一直等待其返回结果。而是会先将这个异步事件挂起，继续执行<font color=#f0764c>执行栈(stack)</font>中的其他任务。

当异步事件返回结果后，js 会把这个事件加入到<font color=#f0764c>事件队列中（callback queue）</font>，被放入事件队列后不会立即执行回调，而是等待房前执行栈中的所有任务都执行完毕，主线程处于空闲状态，主线程会去查找事件队列中是否有任务，如果有则把回调放到执行栈中，形成一个无限循环。

**这个过程被称为 事件循环机制（Event Loop）**

---
#### 宏任务 与 微任务

上面描述的异步事件结果会被放到一个任务队列，根据异步事件类型，这个事件会被放到对应的<font color=#f0764c>宏任务队列</font>或者<font color=#f0764c>微任务队列</font>中去。

当前执行栈空闲时，主线程会查看微任务队列是否有事件存在，如果不存在则再去宏任务队列中取出一个事件放到当前执行栈中执行。
如果存在，则会依次执行队列中事件对应的回调，直到微任务队列为空，然后去宏任务队列中取出最前面的一个事件，把对应的回调加入当前执行栈，反复循环。

总而言之，<font color=#f0764c>当当前执行栈执行完毕时会立刻先处理所有微任务队列中的事件，然后再去宏任务队列中取出一个事件。同一次事件循环中，微任务永远在宏任务之前执行</font>。

**宏任务**

![pic_1](/blogs/interview-javascript/js_1_pic_2.png#pic_center)

**微任务**

![pic_1](/blogs/interview-javascript/js_1_pic_3.png#pic_center)

---
#### 示例

```js
setTimeout(_ => console.log(4))

new Promise(resolve => {
  resolve()
  console.log(1)
}).then(_ => {
  console.log(3)
})

console.log(2)

// 结果：1、2、3、4
```

```js
setTimeout(_ => console.log(4))

new Promise(resolve => {
  resolve()
  console.log(1)
}).then(_ => {
  console.log(3)
  Promise.resolve().then(_ => {
    console.log('before timeout')
  }).then(_ => {
    Promise.resolve().then(_ => {
      console.log('also before timeout')
    })
  })
})

console.log(2)

// 结果：1、3、before timeout、also before timeout、4
```

---

**摘抄自**

- [详解JavaScript中的Event Loop（事件循环）机制](https://zhuanlan.zhihu.com/p/33058983)