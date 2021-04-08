---
title: '前端性能审查 —— 基础篇'
date: '2020-04-01'
thumbnail: 'javascript/index.png'
type: 'frontend'
---

```toc
```
---

### 前期准备

**1. 在 chrome 开启无痕模式，确保 chrome 运行环境没有被其他的状态或者拓展干扰**

**2. 打开以下链接， 这个页面会出现很多小蓝方框，可调节小蓝方框的运动速率**

[https://googlechrome.github.io/devtools-samples/jank/](https://googlechrome.github.io/devtools-samples/jank/)

**3. 打开控制台 Performance 选项**
**模拟移动设备**
**移动设备 CPU 比台式机和笔记本电脑相比要少得多. 因此调试的时候，通过设置 CPU 来模拟移动端.**
  1. 在控制台打开 Performance 选项
  2. 勾选 Screenshots 选项
  3. 点击 ✲:，打开设置模板
  4. 把 CPU 调低 4 倍， DevTools 会限制 CPU, 使其比平时慢 2 倍 

![pic_1](/blogs/frontend/frontend_1_pic_1.png#pic_center)

### 设置 Demo

**1. 点击 Add 10 直到小蓝方框的移动速度比之前慢许多，加入你的设备配置比较好的话，估计得点击 20 下**

**2. 点击 Optimize, 小蓝方框的移动会变得更快更顺畅**

**3. 点击 Un-Optimize, 小蓝方框的移动又会变得又慢又卡**

### 运行 Performance
**在点击 Optimize 之后， 小蓝方框会的移动会变的又快又平滑. 这是为什么呢，在这两个场景中都应该在相同的时间内将每个正方形移动相同的空间. 这是我们可以在 Performance 面板中进行录制，以了解如何检测未优化版本中的性能瓶颈.**

**1. 在 DevTools 中点击 Recode ● 进行录制**
![pic_2](/blogs/frontend/frontend_1_pic_2.png#pic_center)

**2. 等待几秒**

**3. 点击暂停， 你会得到海量数据**

![pic_3](/blogs/frontend/frontend_1_pic_3.png#pic_center)

### 分析数据
**1. 分析每秒的帧数**

**衡量任何动画性能的主要指标是每秒帧数(FPS), 当动画以 60 FPS 运行时，用户体验感是最佳的.**
  1. 查看 FPS 图表，若 FPS 上方显示的是红色条， 就表示帧速率下降得很低，以至于可能降低用户体验感. 通常的绿色条越高， FPS 越高.

  ![pic_4](/blogs/frontend/frontend_1_pic_4.png#pic_center)

  2. 在 FPS 图标下方，会看到 CPU 图表. CPU 图表中的颜色与 Performance 面板底部的 Summary 选项卡中的颜色相对应. CPU 图表充满色彩意味着在记录过程中 CPU 已满. 每当你看到 CPU 长时间处于负荷状态，就可以找到减少工作量的方法.

  ![pic_5](/blogs/frontend/frontend_1_pic_5.png#pic_center)

  3. 把鼠标悬浮于 FPS、CPU、NET 图表上，你会看到对应时间点的页面截图.

  ![pic_6](/blogs/frontend/frontend_1_pic_6.png#pic_center)

  4. 在 Frame 图表中，将鼠标悬浮绿色区域之一, DevTools 会显示对应的 FPS， 你会发现帧数远低于 60 FPS 的目标.

  ![pic_7](/blogs/frontend/frontend_1_pic_7.png#pic_center)

**2. 打开 FPS meter**
**另外一款检测工具是 FPS meter, 可以实时估算页面运行时的 FPS.**
  1. Command + Shift + P (Mac) 或者 Control + Shift + P (Windows, Linux) 打开命令菜单
  2. 输入并选择 Show Rendering
  3. 在 Rendering 面板中选择 FPS meter

  ![pic_8](/blogs/frontend/frontend_1_pic_8.png#pic_center)

### 寻找问题
**在得到数据后，要进行的下一件事就是寻找影响页面性能的问题**
  1. 根据 Summary 面板可得出，该页面花费了大部分时间进行渲染，因此你的目标是减少花费在进行渲染工作上的时间.

  ![pic_9](/blogs/frontend/frontend_1_pic_9.png#pic_center)

  2. 展开 Main 部分， DevTools 显示了主线程随时间变化的活动图表. x 轴表示一段时间内的记录.每个条形代表一个事件. 宽条表示改时间花费了更长的时间. y 轴表示调用堆栈，若事件相互叠加时，表示较高的事件导致较低的事件.

  ![pic_10](/blogs/frontend/frontend_1_pic_10.png#pic_center)

  3. 通过单击放大一个 "动画帧触发" 事件, Main 和 Summary 都会仅显示选定部分的信息.

  4. 若 "动画帧触发" 事件右上角出现红色三角形，这警告你可能与事件有关.

  5. 点击 "动画帧触发" 事件. Summary 选项卡会显示该事件的相关信息， 注意点击 app.js: 95 链接会跳转至代码中的相关行.

  ![pic_11](/blogs/frontend/frontend_1_pic_11.png#pic_center)

  6. 点击 app.update 事件，有一堆紫色事件， 在 Summary 选项卡中会显示这个事件的相关信息，是关于强制回流(布局)的警告.

  7. 点击 Summary 选项卡，点击 app.js: 70 链接， DevTools 会进入强制布局的代码行

  ![pic_12](/blogs/frontend/frontend_1_pic_12.png#pic_center)

---
**转载自**
[https://developers.google.com/web/tools/chrome-devtools/evaluate-performance](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance)