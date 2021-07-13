---
title: '小程序基础知识记录'
date: '2021-07-13'
thumbnail: 'mini_program/index.png'
type: '小程序'
---

```toc
```
---
#### setData 工作原理？
![pic_1](/blogs/frontend/frontend_1_pic_1.png#pic_center)
如上图所示，小程序的视图层使用 WebView 作为渲染载体，而逻辑层由独立的 JavaScriptCore 作为运行环境。在架构上 WebView 和 JavaScriptCore 都是独立的模块，并不具备数据直接共享的通道。当前，视图层和逻辑层的数据运输，实际上通过两边提供的 evaluateJavaScript 所实现。即用户传输的数据，需要将其转换为字符串形式传递，同时转换后的数据内容拼接成一份 JS 脚本，再通过执行 JS 脚本的形式传递到两边独立环境。

而 evaluateJavaScript 的执行会受很多方面的影响，数据到达视图层并不是实时的。

了解 setData 工作原理后，可得知频繁的使用 setData 会消耗性能。例如，用户的一次交互，如点击某个按钮，开发者的逻辑层要处理一些事情，然后再通过 setData 引起界面变化。这样一个过程需要四次通信：
```text
1. 渲染层 -> Native(点击事件)
2. Native -> 逻辑层(点击事件)
3. 逻辑层 -> Native(setData)
4. Native -> 渲染层(setData)
```

---
#### setData 调用频率？setData 数据最大多少？超过如何处理？
1. setData 调用频率：setData 接口的调用涉及逻辑层与渲染层间的线程通信，通信过于频繁可能导致处理队列阻塞，界面渲染不及时而导致卡顿，应避免无用的频繁调用。
**得分条件：每秒调用 setData 的次数不超过 20 次**
2. setData 数据大小：
由于小程序运行逻辑线程与渲染线程之上，setData的调用会把数据从逻辑层传到渲染层，数据太大会增加通信时间。
**得分条件：setData的数据在JSON.stringify后不超过 256KB**

---
#### 小程序页面间有哪些传递数据的方法？

#### 小程序路由 API 有哪些？页面栈最高多少？超过页面数如何处理？

#### 小程序包限制多少？如何分包？如何优化包大小？

#### 如何分析小程序的性能？常见的性能优化有哪些？