---
title: '页面样式记录'
date: '2020-06-13'
thumbnail: 'css/index.png'
type: 'css'
---
**最近在做弹窗的时候设计要求弹窗主图可自适应缩放，滚动时图片不要离开视窗区域，且当图片高度超出屏幕时滚动可展示剩余图片部分**
**总的来说就是关于吸顶和吸底的问题，然后看似简单，做起来的时候却反而想复杂了...**

以下是 demo 的效果， 右边是搭配商品， 左边是搭配主图

页面初始状态：
![pic_1](/blogs/css/css_1_pic_1.png#pic_center)

当图片高度小于视窗高度时，滚动吸顶
![pic_2](/blogs/css/css_1_pic_2.png#pic_center)

当图片高度大于视窗高度时，滚动展示图片剩余部分，展示完吸底
![pic_3](/blogs/css/css_1_pic_3.png#pic_center)

一开始想复杂了，把主图放到一个可滚动容器，然后先静止滚动，全局滚动时允许图片容器滚动，当时呈现出来的滚动效果不太好，且会存在浏览器兼容的问题。

再之，同事建议我滚动的时候让图片 translateY，这样来达到吸顶的效果，但这样不能展示图片剩余部分，且在一个 overflow: scroll 的容器里让图片 translateY， 有可能会遇到图片高度大于视窗时，overflow 容器一直有图片移除，导致容器一直可滚动。最麻烦的是，测试最后发现在 mac chrome 上 使用滚动值传递给 translateY 会出现抖动的效果，这可能和 mac 触摸板的滚动频率有关。

其实一开始可以使用给主图部分加个绝对定位的，但由于还需要图片自适应，所以就使用了 flex 布局， 绝对定位会脱离文档流，这样自适应就没办法了，最后弃用了 flex **（开发前必须想清楚技术方案，即使是优先级很低的功能，路线走错后带给你的将会是加班...）**

**那接下来谈谈我的解决方案：**
主图部分 fixed, 并且相对右边列表 right, 即可自适应

```html
<html>
  <head>
    <style>
      .content {
        padding: 40px 20px;
      }
      .content-img-wrap {
        display: block;
        position: fixed;
        right: 45%;
      }
      .content-img {
        display: block;
        width: 100%;
        max-width: 800px;
      }
      .content-list {
        display: flex;
        margin-left: 54%;
        width: 582px;
        justify-content: center;
        flex-wrap: wrap;
      }
      .list-item {
        margin: 10px;
        width: 250px;
        height: 300px;
        border: 1px solid;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="close">X</div>
      <div>
        <div class="content">
          <div class="content-img-wrap">
            <img class="content-img" src="./timg.jpeg" alt="" />
          </div>
          <div class="content-list">
            <div class="list-item"></div>
            <div class="list-item"></div>
            <div class="list-item"></div>
            <div class="list-item"></div>
            <div class="list-item"></div>
            <div class="list-item"></div>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>
```
**滚动部分通过 js 计算，有两种情况：**
1. 图片高度超过视窗：
  - 当 滚动值 与 图片与页面顶部距离 的差 <= 0 时， top: 0
  - 当 滚动值 与 图片与页面顶部距离 的差 > 0 时， top: 图片与页面顶部的距离 - 滚动值
2. 图片高度超过视窗：
  - 当 滚动值 + 视窗高度 >= 图片高度 时， top: -(图片高度 - 视窗高度)
  - 当 滚动值 + 视窗高度 <= 图片高度 时， top: 图片与页面顶部的距离 - 滚动值

以下是具体代码：
```javascript
$(document).ready(function() {
  const content = $('.content')
  const imgWrap = $('.content-img-wrap')

  const contentPT = (content.css('paddingTop').split('px'))[0]
  $(window).bind('scroll', function() {
    const imgHeight = imgWrap.height()
    const viewHeight = $(window).height()
    const scrollTop = $(this).scrollTop()
    const miuns = contentPT - scrollTop
    // 图片高度超过视窗，展示剩余图片并吸低，若小于视窗高度则吸顶
    if (imgHeight <= viewHeight) {
      imgWrap.css('top', miuns < 0 ? 0 : miuns)
    } else {
      if (scrollTop + viewHeight >= imgHeight) {
        imgWrap.css('top', `-${imgHeight - viewHeight}px`)
      } else {
        imgWrap.css('top', miuns < 0 ? 0 : miuns)
      }
    }
  })
})
```

**结论： 不要把简单的事情复杂化！** 