---
title: '记录网页上一次浏览的位置'
date: '2020-06-27'
thumbnail: 'javascript/index.png'
type: 'javascript'
---
---
我们平时浏览公众号文章时会发现，如果我们中途关闭了文章，下次再打开时会滚动至上次浏览的位置。**实现这个功能很简单，其实就是监听滚动值，下次进入时直接滚动至历史浏览位置。**

那如何存储滚动值呢？写入 cookie 或者传给后端，下次返回呢？这些做法太浪费资源了，为啥不存储在浏览器呢！

存储至浏览器有两种做法，一种是 sessionStorage, 一种是 localStorage。利用 sessionStorage 关闭浏览窗口后数据就会被清除，所以这里利用 localStorage.

**直接上代码**

```html
<body>
  <img src="./1.jpeg" alt="">
  <img src="./2.jpg" alt="">
</body>
```

```javascript
// 节流
const throlle = (fn, timer) => {
  let canRun = true
  return () => {
    if (!canRun) return
    canRun = false
    setTimeout(() => {
      fn()
      canRun = true
    }, timer)
  }
}

$(document).ready(() => {
  const pos = localStorage.getItem('position')
  if (pos) {
    $(this).scrollTop(pos)
  }

  $(this).scroll(throlle(() => {
    const top = $(this).scrollTop()
    localStorage.setItem('position', top)
  }, 1000))
})
```

**效果图**

![pic_1](/blogs/javascript/js_4_pic_1.gif#pic_center)

**每次初始化时获取上次存储的滚动值，并滚动到那个位置，就是这么简单！**

**但是 localStorage 会永久存储于浏览器中，如果想定时清除也是有办法的，首次存储时存入存储时间，待下次页面初始化的时候利用当前时间和存储时间相比，判断是否过期，过期则清除 localStorage.**

