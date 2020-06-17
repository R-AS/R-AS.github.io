---
title: '两列布局与三列布局'
date: '2020-06-17'
thumbnail: 'css/index.png'
type: 'css'
---
### Table of Contents
```toc
```
---
## 两列布局
如图， 实现一个两列布局，左边固定右边自适应
![pic_1](/blogs/css/css_2_pic_1.png#pic_center)

HTML 结构:
```html
<div class="container">
  <div class="left" />
  <div class="right" />
</div>
```
1. 普通写法
```css
.left {
  float: left;  /* 或者 position： absolute */
  width: 150px;
  height: 600px;
  background-color: red;
}
.right {
  margin-left: 150px;
  height: 600px;
  background-color: blue;
}
```
2. table 写法
```css
.container {
  display: table;
  width: 100%;
}
.left {
  display: table-cell;
  width: 150px;
  height: 600px;
  background-color: red;
}
.right {
  display: table-cell;
  height: 600px;
  background-color: blue;
}
```

3. flex 写法
```css
.container{
  display: flex;
}
.left{
  width: 150px;
  height: 600px;
  background-color: black;
}
.right{
  flex: 1;         
  background-color: brown;
  height: 600px;
}
```

## 三列布局
如图， 实现一个三列布局， 左右固定中间自适应
![pic_1](/blogs/css/css_2_pic_2.png#pic_center)

HTML 结构:
```html
<div class="container">
  <div class="left"></div>
  <div class="main"></div>
  <div class="right"></div>
</div>
```

1. 普通写法
```css
.left{
  position: absolute;
  width: 150px;
  height: 600px;
  left:0;
  top:0;
  background-color: black;
}
.main{
  margin-left: 150px;
  margin-right: 150px;
  background-color: brown;
  height: 600px;
}
.right{
  position: absolute;
  right:0;
  top:0;
  width: 150px;
  height: 600px;
  background-color: black;
}
```

2. table 写法
```css
.container{
  display: table;
  width: 100%;
}
.left{
  display: table-cell;
  width: 150px;
  height: 600px;
  background-color: black;
}
.main{
  display: table-cell;
  background-color: brown;
  height: 600px;
}
.right{
  display: table-cell;
  width: 150px;
  height: 600px;
  background-color: black;
}
```

3. flex 写法
```css
.container{
  display: flex;
}
.left{
  width: 150px;
  height: 600px;
  background-color: black;
}
.main{
  flex:1;
  background-color: brown;
  height: 600px;
}
.right{
  width: 150px;
  height: 600px;
  background-color: black;
}
```