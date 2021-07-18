---
title: '小程序基础知识记录'
date: '2021-07-18'
thumbnail: 'mini_program/index.png'
type: '小程序'
---

```toc
```
---
#### setData 工作原理？
![pic_1](/blogs/mini_program/mini_1_pic_1.png#pic_center)
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
3. 超过如何处理：
例如有这种小程序使用了长列表，需要分页，有以下写法：

```js
this.setData({ list: [...list1, ...list2] })
```

以上写法有可能造成 list 超过 1024kb 的限制。因此可以把 list 改成二维数组，把每一页的数据变成数组的每一项，例如：

```js
this.setData({ [`list[${page}]`]: [...] })
```
---
#### 小程序页面间有哪些传递数据的方法？
1. **通过 url 方式传递数据**

```js
// 传递数据
wx.navigateTo({
  url: `/pages/listDetail/listDetail?id=${id}&title=${title}`,
})
```
```js
// 接收数据
Page({
  onLoad: function (options) {
    const { id, title } = options
  }
})
```
**注意：此方法有一定的局限性，不适宜传入复杂的数据，例如：数组、对象，适合参数比较少的情况**

2. **使用全局 app 页面定义的变量实现数据的传递**

全局页面 app.js

```js
App({
  onLaunch: function() {
    this.globalData = {
      token: 'token',
      userInfo: {},
    }
  }
})
```
使用页面
```js
const app = getApp()
Page({
  onGetGlobal() {
    // 获取全局变量
    const { token, userInfo } = app.globalData
  }
})
```
**注意：**
1. App() 必须在 app.js 中注册，且不能注册多个
2. 不要在定义 App() 内的函数调用 getApp()，使用 this 就可以拿到 App 下的实例
3. 不要在 App.onLaunch 的时候调用 getCurrentPages()，此时 page 还没有生成
4. 通过 getApp() 获取到全局页面的实例后，就不要私自调用生命周期函数了的

3. **使用 eventChannel 向被打开页面传送数据**

```js
// 父(当前)页面向子(目标)页面传递数据
Page({
  data: {
    parentPageData: {
      name: '川川',
      url: 'http://coder.itclan.cn',
      vx: 'itclanCoder',
    },
  },

  onEventChannel() {
    const parentPageData = this.data.parentPageData; // 当前页面的数据
    wx.navigateTo({
      url: `/pages/listDetail/listDetail`, // 打开的目标页面
      success: (res) => {
        // 通过eventChannel向被打开页面传送数据,目标页面是listDetail,这个data名字是你自己取的任意,在目标页面中有个参数接收就可以
        res.eventChannel.emit('parentPageEmit', { data: parentPageData });
      },
    });
  },
});
```
```html
<!--被打开(上/父级)页面的wxml,绑定事件-->
<view bindtap="onEventChannel">打开跳转到目标页面</view>
```
```js
// 打开(目标)页面
Page({
  data: {
    acceptParentData: {},
  },

  onLoad: function(options) {
    // 通过getOpenerEventChannel对象,对`parentPageEmit`进行监听
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.on('parentPageEmit', (data) => {
      console.log(data);
      this.setData({
        acceptParentData: data,
      });
    });
  },
});
```

---
#### 小程序路由 API 有哪些？页面栈最高多少？超过页面数如何处理？

**1. wx.switchTab**
跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面

```json
// app.json
{
  "tabBar": {
    "list": [{
      "pagePath": "index",
      "text": "首页"
    },{
      "pagePath": "other",
      "text": "其他"
    }]
  }
}
```
```js
wx.switchTab({
  url: '/index'
})
```

**2. wx.reLaunch**

关闭所有页面，打开到应用内的某个页面

```js
wx.reLaunch({
  url: 'test?id=1',
})
```
```js
// test
Page({
  onLoad (option) {
    console.log(option.query)
  }
})
```

**4. wx.redirectTo**

关闭当前页面，跳转到应用内的某个页面。但是不允许跳转到 tabbar 页面。

```js
wx.redirectTo({
  url: 'test?id=1'
})
```

**5. wx.navigateTo**

保留当前页面，跳转到应用内的某个页面。但是不能跳到 tabbar 页面。使用 wx.navigateBack 可以返回到原页面。**小程序中页面栈最多十层。**

```js
wx.navigateTo({
  url: 'test?id=1',
  events: {
    // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
    acceptDataFromOpenedPage: function(data) {
      console.log(data)
    },
    someEvent: function(data) {
      console.log(data)
    }
    ...
  },
  success: function(res) {
    // 通过eventChannel向被打开页面传送数据
    res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'test' })
  }
})
```

**6. wx.navigateBack**

关闭当前页面，返回上一页面或多级页面。可通过 getCurrentPages 获取当前的页面栈，决定需要返回几层。

```js

// 注意：调用 navigateTo 跳转时，调用该方法的页面会被加入堆栈，而 redirectTo 方法则不会。见下方示例代码

// 此处是A页面
wx.navigateTo({
  url: 'B?id=1'
})

// 此处是B页面
wx.navigateTo({
  url: 'C?id=1'
})

// 在C页面内 navigateBack，将返回A页面
wx.navigateBack({
  delta: 2
})
```

**超过页面数如何处理?**

**微信小程序页面栈不能超过10层，所以使用wx.navigateTo()的时候需要注意是否会超过10个页面栈，给出对应的处理方法:**
1. 使用 wx.reLaunch() 代替 wx.navigateTo() 关闭所有页面跳转，一般用于自己做的 tabbar 组件跳转直接把用到 wx.navigateTo 替换为 wx.reLaunch 
2. 可以在页面加载的时候就调用getCurrentPages() 监听当前页面栈的个数内容，判断当前页面栈中是否存在即将要跳转的页面路径，如果有，直接用 wx.navigateBack() 返回到该页面
3. 这个方法类似于方法一，可以在页面加载的时候就调用getCurrentPages() 监听当前页面栈的个数内容，在页面要跳转的时候，判断当前页面栈的个数是否超过10，如果超过10个，就给wx.reLaunch（） 关闭所有页面，重新进行页面栈个数统计

---
#### 小程序包限制多少？如何分包？如何优化包大小？

**1. 小程序包限制？**

目前小程序分包大小有以下限制：
- 整个小程序所有分包大小不超过 20M
- 单个分包/主包大小不能超过 2M

某些情况下，开发者需要将小程序划分成不同的子包，在构建时打包成不同的分包，用户在使用时按需进行加载。

在构建小程序分包项目时，构建会输出一个或多个分包。每个使用分包小程序必定含有一个主包。所谓的主包，即放置默认启动页面/TabBar 页面，以及一些所有分包都需用到公共资源/JS 脚本；而分包则是根据开发者的配置进行划分。

在小程序启动时，默认会下载主包并启动主包内页面，当用户进入分包内某个页面时，客户端会把对应分包下载下来，下载完成后再进行展示。

**2. 如何分包？**

- 配置方法：

假设支持分包的小程序目录结构如下：

```json
├── app.js
├── app.json
├── app.wxss
├── packageA
│   └── pages
│       ├── cat
│       └── dog
├── packageB
│   └── pages
│       ├── apple
│       └── banana
├── pages
│   ├── index
│   └── logs
└── utils
```

开发者通过在 app.json subpackages 字段声明项目分包结构：

```json
{
  "pages":[
    "pages/index",
    "pages/logs"
  ],
  "subpackages": [
    {
      "root": "packageA",
      "pages": [
        "pages/cat",
        "pages/dog"
      ]
    }, {
      "root": "packageB",
      "name": "pack2",
      "pages": [
        "pages/apple",
        "pages/banana"
      ]
    }
  ]
}
```

subpackages 中，每个分包的配置有以下几项：

|字段|类型|说明|
|-|-|-|
|root|String|分包根目录|
|name|String|分包别名，分包预下载时可以使用|
|pages|StringArray|分包页面路径，相对与分包根目录|
|independent|Boolean|分包是否是独立分包|

- 打包原则
  - 声明 subpackages 后，将按 subpackages 配置路径进行打包，subpackages 配置路径外的目录将被打包到 app（主包） 中
  - app（主包）也可以有自己的 pages（即最外层的 pages 字段）
  - subpackage 的根目录不能是另外一个 subpackage 内的子目录
  - tabBar 页面必须在 app（主包）内

- 引用原则
  - packageA 无法 require packageB JS 文件，但可以 require app、自己 package 内的 JS 文件；使用 分包异步化 时不受此条限制
  - packageA 无法 import packageB 的 template，但可以 require app、自己 package 内的 template
  - packageA 无法使用 packageB 的资源，但可以使用 app、自己 package 内的资源

---

#### 如何分析小程序的性能？常见的性能优化有哪些？
**1. 首屏时间**

首屏时间是指用户从打开小程序看到第一屏主要内容的时间，首屏时间太长会导致用户长时间看到的都是白屏，影响使用体验。

优化首屏时间，可以分为以下几种情况：

- 首屏渲染的内容较多，需要集合多份数据进行渲染。这种情况需要开发者把内容分优先级，把优先级高的内容做优先展示，缩短白屏时间；
- 首屏内容依赖的数据从服务端请求的时间太长。开发者需要从服务端侧具体分析服务端数据返回的时间长的原因；
- 一次性渲染数据太大或依赖的计算过于复杂。减少渲染的数据量、优化渲染相关数据的算法可以解决这类问题。

**得分条件：首屏时间不超过 5 秒**

**2. 渲染时间**

渲染时间指的是首次渲染或因数据变化带来的页面结构变化的渲染花费的时间。

渲染界面的耗时过长会让用户觉得卡顿，体验较差，出现这一情况时，需要校验下是否同时渲染的区域太大（例如列表过长），或渲染依赖的计算是否过于复杂。

**得分条件：渲染时间不超过 500ms**

**3. 脚本执行时间**

脚本执行时间是指JS脚本在一次同步执行中消耗的时间，比如生命周期回调、事件处理函数的同步执行时间。

执行脚本的耗时过长会让用户觉得卡顿，体验较差，出现这一情况时，需要确认并优化脚本的逻辑

**得分条件：一个执行周期内脚本运行时间不超过 1 秒**

**4. setData调用频率**

setData接口的调用涉及逻辑层与渲染层间的线程通信，通信过于频繁可能导致处理队列阻塞，界面渲染不及时而导致卡顿，应避免无用的频繁调用。

**得分条件：每秒调用setData的次数不超过 20 次**

**5. setData数据大小**

由于小程序运行逻辑线程与渲染线程之上，setData的调用会把数据从逻辑层传到渲染层，数据太大会增加通信时间。

**得分条件：setData的数据在JSON.stringify后不超过 256KB**

**6. WXML节点数**

建议一个页面使用少于 1000 个 WXML 节点，节点树深度少于 30 层，子节点数不大于 60 个。一个太大的 WXML 节点树会增加内存的使用，样式重排时间也会更长，影响体验。

**得分条件：页面WXML节点少于 1000 个，节点树深度少于 30 层，子节点数不大于 60 个**

**7. 图片缓存**

开启 HTTP 缓存控制后，下一次加载同样的图片，会直接从缓存读取，大大提升加载速度。

**得分条件：所有图片均开启 HTTP 缓存**

**8. 图片大小**

图片太大会增加下载时间和内存的消耗，应根据显示区域大小合理控制图片大小。

**得分条件：图片宽高乘积 <= 实际显示宽高乘积 * (设备像素比 ^ 2)**

**9. 请求耗时**

请求的耗时太长会让用户一直等待甚至离开，应当优化好服务器处理时间、减小回包大小，让请求快速响应。

**得分条件：所有网络请求都在 1 秒内返回结果**

**10. 网络请求数**

短时间内发起太多请求会触发小程序并行请求数量的限制，同时太多请求也可能导致加载慢等问题，应合理控制请求数量，甚至做请求的合并等。

**得分条件：通过wx.request发起的耗时超过 300ms 的请求并发数不超过 10 个**

**11. 图片请求数**

短时间内发起太多图片请求会触发浏览器并行加载的限制，可能导致图片加载慢，用户一直处理等待。应该合理控制数量，可考虑使用雪碧图技术或在屏幕外的图片使用懒加载。

**得分条件：同域名耗时超过 100ms 的图片请求并发数不超过 6 个**

**12. 网络请求缓存**

发起网络请求总会让用户等待，可能造成不好的体验，应尽量避免多余的请求，比如对同样的请求进行缓存

**得分条件：3 分钟以内同一个url请求不出现两次回包大于 128KB 且一模一样的内容**

---
**转载自：**
- [https://developers.weixin.qq.com/miniprogram/dev/framework/audits/performance.html](https://developers.weixin.qq.com/miniprogram/dev/framework/audits/performance.html)
- [https://godbasin.github.io/2018/10/05/wxapp-set-data](https://godbasin.github.io/2018/10/05/wxapp-set-data)
- [https://juejin.cn/post/6870004953478496264](https://juejin.cn/post/6870004953478496264)
- [https://juejin.cn/post/6893650440228241416](https://juejin.cn/post/6893650440228241416)
