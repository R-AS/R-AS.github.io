---
title: '页面跳转相关'
date: '2020-01-13'
thumbnail: 'javascript/index.png'
type: 'javascript'
---
### Table of Contents
```toc
```
---
**本文记录一些页面跳转以及监听 URL 的知识**

### 1. window.open(strUrl, strWindowName, [strWindowFeatures])
window.open() 可以用来新开窗口加载指定资源，它有三个参数:
- strUrl: 要在新打开的窗口中加载的 URL
- strWindowName: 新开窗口的名称
- strWindowFeatres: 一个可选参数, 列出新窗口的特征(大小、位置、滚动条等)作为一个 DOMString

```md
**let windowObjectReference = window.open(strUrl, strWindowName, [strWindowFeatrues])**
**返回的是新窗口对象的引用，若调用失败，返回值会是 null**
如下:
```
![pic_1](/blogs/javascript/js_1_pic_1.png#pic_center)

**注意这三个参数：**
1. **strUrl**: 新窗口需要载入的 url 地址. strUrl 可以是 web 上的 html 页面也可以是图片文件或其他任何浏览器支持的文件格式
2. **strWindowName**: 新窗口的名称.该字符串可以用来作为超链接 `<a>` 或表单 `<form>` 元素的目标属性值. 字符串中不能含有空白字符. 
    - **strWindowName 并不是新窗口的标题, 可以理解成每个窗口的 id, 假如跳转窗口的名称一样， 则是覆盖同名称的窗口, 反之亦然**， 如下图:

    ![pic_2](/blogs/javascript/js_1_pic_2.png#pic_center)
    - strWindowName 与 `<a>` 标签的应用：
    ```html
      <body>
        <!--点击 window_1 后会新开页面到 www.baidu.com-->
        <a href="https://www.baidu.com" target="window_1">window_1</a>
      </body>
      <script>
        let windowObjectReference = window.open('', 'window_1')
      </script>
    ```
3. **strWindowFeatures**: 可选参数. 是一个字符串值, 这个值列出了将要打开的窗口的一些特性(窗口功能和工具栏). 字符串中不能包含任何空白字符, 特性之间用逗号分隔开. 参考[位置和尺寸特征](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/open#Position%20and%20size%20features)

---
### 2. 单页应用
单页应用是的页面可以在无刷新的条件下重新渲染, 可通过 hash 或者 history 使 url 改变但不刷新页面

**1. hash**

window.location 是一个只读属性, 返回一个 Location 对象, 其中包含有关文档当前位置的信息.hash 是他的一个属性
可通过以下操作来实现单页跳转:
```javascript
window.location.hash = 'edit' // 不会刷新页面
```
或者
```javascript
<a href='#edit'>edit</a>
```

**2.history**

Window.history 是一个只读属性, 用来获取 History 对象的引用, History 对象提供了操作浏览器会话历史（浏览器地址栏中访问的页面, 以及当前页面中通过框架加载的页面）的接口

**History 的属性:**
- length: 返回在会话历史中有多少条记录, 包含了当前会话页面
- state: 保存了会触发 popState 事件的方法, 所传递过来的属性对象(**如果不进行 pushState() or replaceState() 两种类型的调用，state 的值将会是 null**)

**History 的方法:**
- back(): 在 history 中向后跳转
- forward(): 在 history 中向前跳转
- go(): 跳转到 history 中指定的一个点
  - window.history.go(-1) // 相当于 back()
  - window.history.go(1)  // forward()
- pushState(): pushState 可以将给定的数据压入到浏览器会话历史栈中, pushState 后会改变当前页面 url, 但不会伴随着刷新

  例如: url 产生了变化(https://www.xxx.com/bar.html)，history 的 state 被推入了 { foo: 'bar' }, 但页面不会刷新
  ```javascript
  let stateObj = {
    foo: "bar",
  };
  history.pushState(stateObj, "page 2", "bar.html");
  ```
- replaceState(): replaceState将当前的会话页面的url替换成指定的数据, replaceState后也会改变当前页面的url, 但是也不会刷新页面

**pushState 和 replaceState 的异同:**
- 同: 都会改变当前页面显示的 url, 但不会刷新页面
- 异: pushState是压入浏览器的会话历史栈中, 会使得History.length加1, 而replaceState是替换当前的这条会话历史, 因此不会增加History.length

---
### 3. 监听 url 中的 hash 变化
通过 hash 改变了 url, 会触发 hashchange 事件, 可通过监听 hashchange 事件来捕获到通过 hash 改变 url 的行为

```javascript
window.onhashchange = function(event) {
  console.log(event)
}
// 或者
window.addEventListener('hashchange', function(event) {
  console.log(event)
})
```
当 hash 值改变时, 输出一个 HashChangeEvent
```javascript
{isTrusted: true, oldURL: "http://localhost:3000/", newURL:   "http://localhost:3000/#teg", type: "hashchange".....}
```
可通过监听事件, 加入回调展示或隐藏不同 UI 显示的功能等

---
**本文参考自**
- https://developer.mozilla.org/zh-CN/docs/Web/API/Window/open
- https://developer.mozilla.org/zh-CN/docs/Web/API/Window/location
- https://developer.mozilla.org/zh-CN/docs/Web/API/History_API
- https://juejin.im/post/5c2708cd6fb9a049f06a5744

