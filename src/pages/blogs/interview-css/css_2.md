---
title: 'BFC(块级格式上下文)'
date: '2022-11-01'
thumbnail: 'css/index.png'
type: 'css'
---
```toc
```
---

#### BFC 是什么？
BFC（Block Formatting Context），即块级格式化上下文。BFC 是 CSS 布局的一个概念，是一个独立的渲染区域，规定了内部 box 如何布局，并且这个区域的子元素不会影响到外面的元素。

---

#### BFC 布局规则
- 内部的 Box 会在垂直方向，一个接一个地放置
- Box 垂直方向的距离由 margin 决定。属于同一个 BFC 的两个相邻 Box 的 margin 会发生重叠
- 每个元素的 margin box 的左边，与包含块 border box 的左边相接触(对于从左往右的格式化，否则相反)
- BFC 的区域不会与 float box 重叠
- BFC 是一个独立容器，容器里面的子元素不会影响到外面的元素
- 计算 BFC 的高度时，浮动元素也参与计算高度

---

#### BFC 使用场景
- 分属于不同的 BFC 时可以阻止 margin 重叠
- 清除浮动（让父元素的高度包含子浮动元素）
- 避免某元素被浮动元素覆盖
- 自适应两栏布局

---

#### 如何触发 BFC
- 根元素，即 HTML 元素
- float 的值不为 none
- position 为 absolute 或 fixed
- display 的值为 inline-box、table-cell、table-caption
- overflow 的值不为 visible

---

#### 详细栗子🌰

1. **同一个 BFC 的两个相邻 Box 的 margin 会发生重叠**

```html
<style>
  .parent {
    background-color: #f0f0f0;
  }
  .child1 {
    margin-bottom: 50px;
    width: 100px;
    height: 100px;
    background-color: red;
  }
  .child2 {
    margin-top: 50px;
    width: 100px;
    height: 100px;
    background-color: blue;
  }
</style>

<div class='parent'>
  <div class='child1'></div>
  <div class='child2'></div>
</div>
```
![pic_1](/blogs/interview-css/css_2_pic_1.jpg#pic_center)

2. **阻止 margin 重叠**

当两个相邻块级子元素分属于不同的 BFC 时可以阻止 margin 重叠

```html
<style>
.parent {
  background-color: #f0f0f0;
  overflow: hidden; /* 触发 BFC */
}
.child1 {
  margin-bottom: 50px;
  width: 100px;
  height: 100px;
  background-color: red;
}
.parent1 {
  margin-top: 50px;
  width: 100px;
  height: 100px;
  background-color: blue;
}
</style>

<div class='parent'>
  <div class='child1'></div>
</div>
<div class='parent1' />
```

![pic_2](/blogs/interview-css/css_2_pic_2.jpg#pic_center)

3. **清除内部浮动**

触发父元素的 BFC 属性，使子元素都处在父元素的同一个 BFC 区域之内，实现清除浮动。

![pic_3](/blogs/interview-css/css_2_pic_3.jpg#pic_center)

4. **BFC 的区域不会与 float box 重叠**

```html
<style>
  .parent {
    background-color: #f0f0f0;
  }
  .bfc {
    overflow: hidden; /*触发 BFC，不影响外部元素*/
  }
  .child1 {
    float: left;
    width: 100px;
    height: 100px;
    background-color: red;
  }
  .child2 {
    width: 300px;
    height: 100px;
    background-color: blue;
  }
</style>

<div class='parent'>
  <div class='bfc'>
    <div class='child1'></div>
  </div>
  <div class='child2'></div>
</div>
```

![pic_4](/blogs/interview-css/css_2_pic_4.jpg#pic_center)


5. **自适应两栏布局**

增减 child1 的宽度，child2 会自适应。因为 BFC 区域不会与 float box 重叠，因此会根据包含块（父 div）的宽度，和 child1 的宽度，自适应宽度。
```html
<style>
  .parent {
    background-color: #f0f0f0;
  }
  .child1 {
    width: 100px;
    height: 100px;
    float: left;
    background: #f66;
  }
  .child2 {
      height: 200px;
      overflow: hidden; /*触发 BFC*/
      background: blue;
  }
  .box {
    width: 500px;
  }
</style>
<div class='parent'>
  <div class='child1'></div>
  <div class='box'>
      <div class='child2'></div>
  </div>
</div>
```

![pic_5](/blogs/interview-css/css_2_pic_5.jpg#pic_center)

---

**摘抄自：**
- [布局概念] 关于CSS-BFC深入理解](https://juejin.cn/post/6844903476774830094)