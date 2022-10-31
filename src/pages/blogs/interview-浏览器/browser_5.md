---
title: '为什么 transform 能够提高性能'
date: '2022-10-31'
thumbnail: 'web/index.png'
type: 'interview-浏览器'
---
```toc
```
---

平时在背面试题或者在实现动画位移时，我们都知道可以利用 transform 来提高性能，避免卡顿。那其中的原理是什么呢？

---

#### 浏览器渲染

![pic_1](/blogs/interview-浏览器/browser_5_pic_1.png#pic_center)

回顾一下浏览器的渲染过程，浏览器构建 DOM 树 和 CSSOM 树，再将这二者组合成一个 Render 树，然后用于计算每个可见元素的布局，在将其绘制在屏幕上。Render Tree 并非最终的数据，从 DOM 到浏览器的画面，中间还会经历许多的步骤，诸如 <font color=#f0764c>Render Object</font>、<font color=#f0764c>RenderLayer</font>、<font color=#f0764c>Graphics Layer</font>。

![pic_2](/blogs/interview-浏览器/browser_5_pic_2.png#pic_center)

---

#### Render Object Tree

CSSOM 树 和 DOM 树组合成 Render Tree，计算每个可见元素的布局。这个可见元素的界定和存储由 Render Object 工作。

DOM 树中的每一个可视节点都与一个 Render Object 对应。Render Object 存储在称为渲染树的并行树结构中，可以简单理解 Render Object Tree 就是 DOM 和 CSSOM 的合成并剔除了不可视节点的产物。

![pic_3](/blogs/interview-浏览器/browser_5_pic_3.png#pic_center)

生成 Render Object 的规则：
1. DOM 树中的 Document 节点
2. 可视节点
3. 某些情况下生成的匿名 Render Object 对象

**不可视节点：** 诸如 meta、head、script 等没有可视意义的节点。display: none 的节点（visibility: hidden 是可视的）

**匿名 Render Object：** 某些情况下浏览器会主动生成匿名 Render Object, 例如根据 CSS 规范，inline 元素只能包含 block 元素或 inline 元素中的一种。如果包含多种，会自动创建一个匿名盒模型，这个盒模型也对应一个 Anonymous RenderObject。

---

#### Render Layer

Render Layer 帮助浏览器去存储关于层的信息（z-index 的层级关系，overflow 的包含、裁剪等）。

Render Layer 和 Render Object 并非一一对应。共享相同坐标空间（例如受相同CSS变换影响的 Render Object 属于同一个 Render Layer。每个 Render Object 都直接或通过祖先 Render Object 间接与 Render Layer 关联。

![pic_4](/blogs/interview-浏览器/browser_5_pic_4.png#pic_center)

RenderObject 关联 RenderLayer 的常见情况：
- 页面的根对象。
- 具有明确的 CSS 位置属性（relative，absolute, transform）。
- 是透明的 (opacity < 1)。
- 有 overflow，alpha mask 或 reflection 属性。
- 有一个 CSS filter 过滤器。
- ```<canvas>``` 2D / 3D 上下文（WebGL）。
- ```<video>``` 元素。

---

#### Graphics Layer

浏览器将 DOM 分隔成多个 Render Layer 并栅格化，独立绘制进位图中，然后作为纹理上传到 GPU 进行复合。但如果栅格化的 Render Layer 中包含视频、Web GL 等高耗内容时，一个小小的更新就可能让浏览器遭遇性能瓶颈。

为了避免此种情况，浏览器会为特定的 RenderLayer 提供后端存储（Graphics Layer），对于这些操作，可以跳过 重排(reflow) 和 重绘(repaint)，直接在 GPU 进行 Composite(合成)。

每一个 Graphics Layer（图形层，也叫合成层）都有一个 GraphicsContext 供关联 的 RenderLayer 绘制。浏览器会在随后的过程中通过合成器将 GraphicsContext 的位图作为纹理上传到 GPU 中并合成到最终的屏幕图像中。既解放了主线程，也利用了 GPU 对图形处理的极大优势。

目前满足以下条件的 Render Layer 能拥有自己的 Graphics Layer:
- 3D 或透视变换 (perspective, transform) CSS 属性。
- 使用加速视频解码的元素。
- 拥有 3D (WebGL) 上下文或加速的 2D 上下文的元素。
- 混合插件(如 Flash)。
- 对 opacity 做 CSS 动画或使用一个transform变换动画的元素。
- 拥有加速 CSS 过滤器（filter）的元素。
- iframe或含有position: fixed的元素。

---

#### transform 为什么能提高性能？

应用了 transform 动画的容器会被提升为 Graphics Layer(合成层)，针对合成层，合成器能在合成前使用 GPU 对纹理（上传的位图）进行处理，这样的操作也就导致了动画容器跳过了重排重绘的阶段，直接进行合成。且合成器对主线程的数据的副本进行操作，即使主线程忙于其他 JS 操作，合成器也不会被阻塞。

---

**摘抄自：**
- [经典性能优化面试题: 从一个 Transform 动画引发的关于浏览器渲染的深度思考
](https://juejin.cn/post/6940980426437558285)