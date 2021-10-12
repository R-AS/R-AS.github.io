---
title: 'CSS面试考点'
date: '2021-10-12'
thumbnail: 'css/index.png'
type: 'css'
---
<!---->
```toc
```
---

### 介绍下 BFC 以及其应用
**1. 概念：**
**块格式化上下文(Block Formatting Context)**是 Web 页面的可视 CSS 渲染的一部分，是块盒子的布局过程发生的区域，也是浮动元素与其他元素交互的区域。

**具有 BFC 特性的元素可以看作是隔离了的独立容器，容器里面的元素不会在布局上影响到外面的元素，并且 BFC 具有普通容器没有的一些特性。**

下列方式会创建块 **BFC**：
- 根元素（<html>）
- 浮动元素（元素的 float 不是 none）
- 绝对定位元素（元素的 position 为 absolute 或 fixed）
- 行内块元素（元素的 display 为 inline-block）
- 表格单元格（元素的 display 为 table-cell，HTML表格单元格默认为该值）
- 表格标题（元素的 display 为 table-caption，HTML表格标题默认为该值）
- 匿名表格单元格元素（元素的 display 为 table、table-row、 table-row-group、table-header-group、table-footer-group（分别是HTML table、row、tbody、- thead、tfoot 的默认属性）或 inline-table）
- overflow 计算值(Computed)不为 visible 的块元素
- display 值为 flow-root 的元素
- contain 值为 layout、content 或 paint 的元素
- 弹性元素（display 为 flex 或 inline-flex 元素的直接子元素）
- 网格元素（display 为 grid 或 inline-grid 元素的直接子元素）
- 多列容器（元素的 column-count 或 column-width (en-US) 不为 auto，包括 column-count 为 1）
- column-span 为 all 的元素始终会创建一个新的BFC，即使该元素没有包裹在一个多列容器中（标准变更，Chrome bug）。

**2. 特性及应用**
- **同一个 BFC 下外边距会发生折叠**
```html
<head>
  div {
    width: 100px;
    height: 100px;
    background: lightblue;
    margin: 100px;
  }
</head>
<body>
  <div></div>
  <div></div>
</body>
```

![pic_1](/blogs/css/css_4_pic_1.png#pic_center)

因为两个 div 元素都处于同一个 BFC 容器下（body 元素）,所以 div1 的下边距和 div2的上边距发生重叠，所以这两个盒子之间距离只有 100px。

如果要避免重叠，可以将其放在不同 BFC 容器中。
```html
<div class="container">
    <p></p>
</div>
<div class="container">
    <p></p>
</div>
```
```css
.container {
    overflow: hidden;
}
p {
    width: 100px;
    height: 100px;
    background: lightblue;
    margin: 100px;
}
```
这样两个盒子边距就变成了 200px。

![pic_2](/blogs/css/css_4_pic_2.png#pic_center)

- **BFC 可以包含浮动的元素（清除浮动）**
下面例子由于容器内元素浮动，脱离了文档流，所以容器只剩下 2px 的边距高度。
```html
<div style="border: 1px solid #000;">
  <div style="width: 100px;height: 100px;background: #eee;float: left;"></div>
</div>
```
![pic_3](/blogs/css/css_4_pic_3.png#pic_center)

如果触发容器的 BFC，那么容器将会包裹着浮动元素。
```html
<div style="border: 1px solid #000;overflow: hidden">
  <div style="width: 100px;height: 100px;background: #eee;float: left;"></div>
</div>
```
![pic_4](/blogs/css/css_4_pic_4.png#pic_center)

- **BFC 可以阻止元素被浮动元素覆盖**
先来看一个文字环绕效果：
```html
<div style="height: 100px;width: 100px;float: left;background: lightblue">我是一个左浮动的元素</div>
<div style="width: 200px; height: 200px;background: #eee">我是一个没有设置浮动, 
也没有触发 BFC 元素, width: 200px; height:200px; background: #eee;</div>
```
![pic_5](/blogs/css/css_4_pic_5.png#pic_center)

这时候其实第二个元素有部分被浮动元素所覆盖，(但是文本信息不会被浮动元素所覆盖) 如果想避免元素被覆盖，可触第二个元素的 BFC 特性，在第二个元素中加入 overflow: hidden，就会变成：

![pic_6](/blogs/css/css_4_pic_6.png#pic_center)

这个方法可以用来实现两列自适应布局，效果不错，这时候左边的宽度固定，右边的内容自适应宽度(去掉上面右边内容的宽度)。

---
