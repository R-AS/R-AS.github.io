---
title: '重排(回流)与重绘'
date: '2022-10-20'
thumbnail: 'web/index.png'
type: 'interview-浏览器'
---
```toc
```
---

#### 重排(回流)与重绘的区别

- 重排/回流（reflow）：当 DOM 的变化影响了元素的几何信息，浏览器需要重新计算元素的几何属性，将其安放在界面中的正确位置，这个过程叫做重排。表现为重新生成布局，重新排列元素。
- 重绘（repaint）：当一个元素的外观发生改变，但没有改变布局，重新把元素外观绘制出来的过程，叫做重绘。表现为某些元素的外观被改变。

**<font color=#f0764c>重绘 不一定会出现 重排，重排 必然会出现 重绘。</font>**

---

#### 触发重排(回流)和重绘？

任何改变用来构建渲染树的信息都会导致一次重排或重绘：
- 添加、删除、更新 DOM 节点
- 通过 display: none 隐藏一个 DOM 节点（触发重排和重绘）
- 通过 visibility: hidden 隐藏一个 DOM 节点（只触发重绘）
- 移动或给页面中的 DOM 节点添加动画
- 添加一个样式表，调整样式属性
- 用户行为，例如调整窗口大小、改变字号，或者滚动

---

#### 如何避免重绘或重排？

- 集中改变样式，不要一条条地改变 DOM 的样式
- 不要把 DOM 结点的属性值放在循环里当成循环里的变量
- 为动画的 HTML 元件使用 fixed 或 absoult 的 position，那么修改他们的 CSS 是不会 reflow 的
- 不使用 table 布局。因为可能很小的一个小改动会造成整个 table 的重新布局
- 尽量只修改position：absolute或fixed元素，对其他元素影响不大
- 动画开始GPU加速，translate使用3D变化
- 提升为合成层
  - 将元素提升为合成层有以下优点：
      - 合成层的位图，会交由 GPU 合成，比 CPU 处理要快
      - 当需要 repaint 时，只需要 repaint 本身，不会影响到其他的层
      - 对于 transform 和 opacity 效果，不会触发 layout 和 paint
  - 提升合成层的最好方式是使用 CSS 的 will-change 属性：
  ```css
  #target {
    will-change: transform;
  }
  ```

---

**摘抄自：**
- [🔥 连八股文都不懂还指望在前端混下去么](https://juejin.cn/post/7016593221815910408#heading-13)