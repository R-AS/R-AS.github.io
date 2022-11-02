---
title: 'CSS 选择器及优先级'
date: '2022-10-18'
thumbnail: 'css/index.png'
type: 'css'
---
<!---->
```toc
```
---

#### 选择器

1. 基础选择器

| 基础选择器 ||
|---|---|
| 标签选择器 | div、span |
| ID 选择器 | #id |
| 类选择器 | .class |
| 伪类选择器 | :hover、:first-of-type、:before |
| 属性选择器 | [attr=val]、[attr~=val]、[attr^=val] |

2. 组合选择器

| 组合选择器 | 名称 | 描述 |
|---|---|---|
| E,F | 多元素选择器 | 选择所有 E 元素和 F 元素 |
| E F | 后代选择器 | 选择 E 元素内部的所有 F 元素 |
| E>F | 子选择器 | 选择父元素为 E 元素的所有 F 元素 |
| E+F | 相邻兄弟选择器 | 选择紧接在 E 元素之后的所有 F 元素 |
| E~F | 通用兄弟选择器 | 选择前面有 E 元素的每个 F 元素 |

---

#### 选择器优先级

1. 优先级权重

| 优先级 | 描述 | 权重 |
|---|---|---|
| 1 | !important | 无 |
| 2 | 内联样式，如：style="xxx" | 1000 |
| 3 | ID 选择器，如：#id | 100 |
| 4 | 类、伪类和属性选择器，如：class、：hover、[attr] | 10 |
| 5 | 标签选择器，如：div、p | 1 |
| 6 | 通用选择器、子选择器和相邻兄弟选择器等，如：*、>、+ | 0 |

2. 优先级权重计算

```css
/* 权值计算 100(#content) + 1(div) + 100(#main-content) + 1(h2) = 202 */
#content div#main-content h2{
  color:red;
}
```

```css
/* 权值计算 100(#main-content) + 1(div) + 10(.paragraph) + 1(h2) = 112 */
#main-content div.paragraph h2 {
  color:orange;
}
```

```css
/* 权值计算 100(#main-content) + 10(class="paragraph") + 1(h2) = 111 */
#main-content [class="paragraph"] h2 {
  color:yellow;
}
```

```html
<div id="content">
  <div id="main-content">
    <h2>CSS简介</h2>
    <p>CSS（Cascading Style Sheet，可译为“层叠样式表”或“级联样式表”）是一组格式设置规则，用于控制Web页面的外观。</p>
    <div class="paragraph">
      <h2 class="first">使用CSS布局的优点</h2>
      <p>1、表现和内容相分离 2、提高页面浏览速度 3、易于维护和改版 4、使用CSS布局更符合现在的W3C标准.</p>
    </div>
  </div>
</div>
```

---
**摘抄自**
- [CSS 选择器优先级](https://tate-young.github.io/2018/01/29/css-priority.html)