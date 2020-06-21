---
title: 'B站列表页视频缩略图实现'
date: '2020-06-21'
thumbnail: 'css/index.png'
type: 'css'
---

---
今天逛 B 站的时候发现列表页视频缩略图有一个效果，如下：

![pic_1](/blogs/css/css_3_pic_1.gif#pic_center)

光标在悬浮滑动的同时会显示每一帧的页面，**其实实现原理很简单，只是通过计算鼠标偏移量来计算出图片应该移动至哪个位置，**
而且并不是渲染每一帧的页面，而只是给出大致的缩略图 #:point_down:，拼接成一张图，达到这效果

![pic_3](/blogs/css/css_3_pic_3.png#pic_center)

废话不多说，直接上代码：

**HTML**
```html
<div class="avatar-wrapper">
  <div class="pic">
    <div class="lazy-img">
      <img
          src="./bg-single.png">
    </div>
    <i class="icon medal "></i>
    <div class="cpm show">
      <div class="cover"></div>
      <div class="progress-bar"><span style="width: 10%;"></span></div>
    </div>
    <div class="mask-video"></div>
  </div>
</div>
```

**JS**
```javascript
var data = {
  "len_x": 20,  // 图片一行的张数
  "width": 203, // 图片展示单张宽度
  "height": 360, // 图片展示单张高度
};

$(".pic").mousemove(function (event) {
  var t = event.offsetX; // 鼠标偏移量
  this.width = 203;
  this.height = 360;

  var a = 83;  // 图片总数
  var e = data.height / data.width * this.width;
  this.progress = Math.floor(t / this.width * 100) // 进度
  this.size = this.width * data.len_x;  // 横轴图片长度
  var i = Math.floor(t / this.width * a); // 在 83 张图片中的偏移量
  this.x = -i % data.len_x * this.width;  // 水平坐标
  this.y = -Math.floor(i / data.len_x) * e; // 纵轴坐标

  var self = this;

  $('.cover').css({
    backgroundImage: "url(./bg-mult.png)",
    backgroundPosition: self.x + "px " + self.y + "px",
    backgroundSize: self.size + "px"
  })

  $('.progress-bar span').css({
    width: self.progress + "%"
  })
});
```

**最终效果**

![pic_2](/blogs/css/css_3_pic_2.gif#pic_center)

---
**参考自： https://juejin.im/post/5ced4d90e51d457755550851**