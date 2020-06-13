---
title: '前端性能审查 —— Audits'
date: '2020-04-18'
thumbnail: 'javascript/index.png'
type: 'frontend'
---
### Table of Contents
```toc
```
---
### 前期准备
**1. 审查网站**
每当我们想优化一个网站,提高站点的负载性能是, Audit 有以下两个重要功能:

  1. Audit 创建了一个基准,以衡量后续的更改
  2. Audit 提供了可行的提示,说明那些更改将产生最大的影响

**2. 准备一个现成的网站, 这里以这个[项目](https://glitch.com/edit/#!/tony)为例**
  1. 打开这个项目

  ![pic_1](/blogs/frontend/frontend_2_pic_1.png#pic_center)

  2. 点击 tony, Remix Project. 它会拷贝这个项目, 随机生成一个项目名, 我们可以在上面直接进行更改

  ![pic_2](/blogs/frontend/frontend_2_pic_2.png#pic_center)
  ![pic_3](/blogs/frontend/frontend_2_pic_3.png#pic_center)

  3. 点击 Show, 预览网站

  ![pic_4](/blogs/frontend/frontend_2_pic_4.png#pic_center)

---

### 建立基准
**基准记录是在进行任何性能改进之前,网站的运行情况**\

1. 在 DevTools 点击 Audits 选项

  ![pic_5](/blogs/frontend/frontend_2_pic_5.png#pic_center)

2. 关于面板中的配置:
    - **Device**

    可以设置所需分析的设备类型

    - **Audits**

    这里可以审查以下几个选项的类型,如果不想审查可以将其禁用.禁用类别会稍微加快审核过程

    - **Throttling**

    这里设置为 Simulated Fast 3G, 4x CPU Slowdown 来模拟移动设备的浏览状态.这里之所以是 Simulated 是因为 Audit 在审核过程中实际上并未节流, 相反, 它只是推断在移动条件下页面加载所需的时间

    - **Clear Storage**

    如果要审查首次访问的体验, 请保留此项.若需要审查重复访问体验, 请禁用次项
    
3. 点击 Run Audits, 大概 10 - 30 秒后,面板上会显示这个网站的性能报告

---

### 处理报告错误
**如果得到的报告面板显示 Error, 请尝试在无痕模式下运行该网站, 这样可以确保在干净环境下运行, 特别是 Chrome 扩展程序经常会干扰审查过程**

1. **理解报告**

右上角的分数代表着网站总体性能的分数, 在之后我们进行优化后, 你将会看到分数会提高. 分数越高代表着网站性能越好

  ![pic_6](/blogs/frontend/frontend_2_pic_6.png#pic_center)

  - **Metrics 指标** 中提供了站点性能的定量度量.每个指标都可以洞悉性能的不同方面. 例如 Firtst Contentful Paint 会告诉你, 页面什么时候第一次将内容绘制到屏幕上. Time To Interactive 标志这页面加载完以处理用户交互的时间点

  ![pic_7](/blogs/frontend/frontend_2_pic_7.png#pic_center)

  Metrics 下方是屏幕截图的集合, 这些截图显示了页面加载时的外观.

  ![pic_8](/blogs/frontend/frontend_2_pic_8.png#pic_center)

  - **Opportunities** 提供了有关改善页面加载性能的特定指示

  ![pic_9](/blogs/frontend/frontend_2_pic_9.png#pic_center)

  - **Diagnostics 诊断程序** 提供了有关影响页面加载时间的因素的更多信息

  ![pic_10](/blogs/frontend/frontend_2_pic_10.png#pic_center)

  - **Passed Audits** 显示了该站点通过审核的部分

  ![pic_11](/blogs/frontend/frontend_2_pic_11.png#pic_center)

2. **实践**

**Enable text compression**

在报告中显示了 enable text compression 是提高页面性能的方式之一. 文本压缩是指在网络发送文本之前减小或压缩文本文件的大小
以下有两种方法可以手动检查文本资源是否已压缩:

- 打开 Network, 查看 Enable text compression 提示的文件

  可以看到在 size 这一列中有两个值, 上面的值代表着下载资源的大小, 下面的值代表着未压缩文件的大小, 如果这两个值相同, 则说明在发起网络请求前并未对其进行压缩.
  
  我们也可以通过查看 HTTP Header 来检查文件压缩情况:
  1. 点击 bundle.js
  2. 点击 Headers 标签

  ![pic_12](/blogs/frontend/frontend_2_pic_12.png#pic_center)

  查看 Response Headers 这一项的 content-encoding. 如果没有看到, 代表着 bundle.js 并未压缩. 如果文本被压缩过, 此部分通常设置为 gzip/deflate/br.

  接下来调开代码, 点击 server.js

  ![pic_13](/blogs/frontend/frontend_2_pic_13.png#pic_center)
  在 app.use(express.static('build')) 前面增加 app.use(compression())

  ```js
  const fs = require('fs');
  const compression = require('compression');
  app.use(compression());
  app.use(express.static('build'));
  ```

  对 文本进行压缩之后, 在 Network 查看 bundle.js, 发现网络发送只有 150KB, 为文本原本大小是 1.2MB

  ![pic_14](/blogs/frontend/frontend_2_pic_14.png#pic_center)

  查看 Response Headers 发现多了 content-encodeing: gzip, 也就是文本已经被压缩

  ![pic_15](/blogs/frontend/frontend_2_pic_15.png#pic_center)

  再次审核页面, 衡量文本压缩对页面的负载性能有什么影响:

  ![pic_16](/blogs/frontend/frontend_2_pic_16.png#pic_center)

  可以看到网站的总体评分上升了!

**Properly size images**

  在审核报告中有 Properly size images 这一项, 调整图片大小可以减少页面加载时间.

  - 展开 Properly size images 查看有哪些图片需要进行调整

    1. 

  ![pic_17](/blogs/frontend/frontend_2_pic_17.png#pic_center)

  2. 打开代码, 到 src/model.js
  3. 将 const dir = 'big' 替换为 const dir = 'small', 此目录包含已调整大小的相同图像副本.
  4. 再次审核页面性能

  ![pic_18](/blogs/frontend/frontend_2_pic_18.png#pic_center)

  可以看到性能总分提高了一点

  在实际情况中,对于小型项目来说这已经足够了,对于大型项目可以通过以下几点进行图像优化:
  - 在构建过程中调整图片大小
  - 在构建过程中为每个图像创建多个大小, 然后在代码中使用 srcset. 在运行时, 浏览器会选择最适合其运行设备的大小
  - 使用图像 CDN, 该 CDN 可让你在请求图像时动态调整其大小

**Eliminate render-blocking resources**

  截止到目前, 性能报告中显示当前的首要任务是阻止渲染资源. 渲染资源指的是外部 JavaScript 或 CSS 文件, 浏览器在显示页面之前必选下载, 解析和执行该文件.目标是运行仅显示页面所需的核心 CSS 和 JavaScript 代码

  首先, 我们需要找到不需要在页面执行的代码
  1. 展开 Eliminate render-blocking resources 查看正在阻止的资源: lodash.js 和 jquery.js

  ![pic_19](/blogs/frontend/frontend_2_pic_19.png#pic_center)

  2. Command+Shift+P (Mac) 或 Control+Shift+P (Windows, Linux, Chrome OS) 打开命菜单, 输入并选择 Show Coverage

  3. 点击 Reload. Coverage 概述了页面加载时正在执行的代码的情况.如图中指出lodash.js 和 jquery.js 分别有 30.3% 和 75.9% 的代码没有执行

  ![pic_20](/blogs/frontend/frontend_2_pic_20.png#pic_center)

  4. 点击 jquery.js, 会显示 jquery.js 的代码, 代码旁边的绿条表示代码已执行, 红色条表示代码未执行且绝对不需要在页面加载时使用

  ![pic_21](/blogs/frontend/frontend_2_pic_21.png#pic_center)

  加载页面是否需要 jquery.js 和 lodash.js 呢? Request Blocking 可以显示资源不可用时会发生什么
  1. 打开 Network
  2. Command+Shift+P (Mac) 或者 Control+Shift+P (Windows, Linux, Chrome OS) 打开命令菜单
  3. 输入并打开 Show Request Blocking

  ![pic_22](/blogs/frontend/frontend_2_pic_22.png#pic_center)

  4. 点击 +, 输入 /libs/*, 回车

  ![pic_23](/blogs/frontend/frontend_2_pic_23.png#pic_center)

  5. 刷新页面, 可以看到在 Network 面板下 jQuery.js 和 lodash.js 是红色的, 代表着它们已经被阻止了. 而该页面仍处于加载状态并且是交互式的, 因此看起来好像不需要这些资源

  ![pic_24](/blogs/frontend/frontend_2_pic_24.png#pic_center)

  6. 点击#:no_entry_sign删除 阻止 /libs/* 资源

  那么现在从代码中删除对这些文件的引用, 然后再次审核页面:
  1. 进入代码编辑器, 打开 template.html
  2. 删除 ```<script src="/libs/lodash.js">``` 和 ```<script src="/libs/jquery.js"></script>```
  3. 再次审核, 可以看到性能总分有所提高

  ![pic_25](/blogs/frontend/frontend_2_pic_25.png#pic_center)

**Do less main thread work**

  在最后的性能报告中显示, 我们可以缩小 JavaScript, 但是在 Diagnostics 中可看到当前最大的问题似乎是主线程活动过多.
  主线程是浏览器完成显示页面所需的大部分工作的地方, 例如解析和执行 HTML, CSS 和 JavaScript
  那么当前的任务就是使用 Performance 面板来分析页面加载时主线程正在执行的工作, 并找到推迟或删除不必要工作的方法
  1. 打开 Performance 面板
  2. 点击 Capture Settings ✲
  3. 设置 Network: Slow 3G, CPU: 6x slowdown (与笔记本电脑或台式机相比, 移动设备通常具有更多的硬件限制, 因此这些设置可以模拟在配置较低的设备时的页面加载体验)
  4. 点击 Reload

  ![pic_26](/blogs/frontend/frontend_2_pic_26.png#pic_center)

  通过图中的各个模块可以看出每秒的帧数, CPU 和 NET 的情况, 而轨道中黄色部分代表着 CPU 完全忙碌于 JavaScript 执行, 这表明我们可以减少 JavaScript 来加快页面加载速度

  我们可以调查跟踪以找到减少 JavaScript 工作量的方法:
  1. 展开 Timing, 可以看到 Timing 中 React 占据了许多, 似乎应用程序正在使用 React 的开发模式, 切换到 React 的生成模式可能会提高性能

  ![pic_27](/blogs/frontend/frontend_2_pic_27.png#pic_center)

  2. 展开 Main 面板, 该面板从左到右显示了主线程活动的时间顺序日志. y 轴显示事件发生的原因, 上面的事件执行导致下面事件的发生

  ![pic_28](/blogs/frontend/frontend_2_pic_28.png#pic_center)

  4. 滚动到 Main 面板下面, 应用程序引起的活动通常在底部. 在此应用程序中, 似乎一个名为 App 的函数引起了对 mineBitcoin 函数的大量调用

  5. 在 Bottom-up 面板中, 展示了哪些活动占用最多的时间.

  ![pic_29](/blogs/frontend/frontend_2_pic_29.png#pic_center)

  在 Self Time 这一列中显示了每个活动花费了多少时间, 可以看到主线程大约花费了 78.4% 的时间花费在 mineBitcoin 函数上

  那么现在看看使用生产模式并减少 JavaScript 活动是否会加快页面加载速度, 首先开启生产模式:
  1. 打开代码编辑器, 打开 webpack.config.js
  2. 将 "mode": "development" 改为 "mode": "production" 
  3. 再次审核页面

  ![pic_30](/blogs/frontend/frontend_2_pic_30.png#pic_center)

  接下来通过删除对 mineBitcoin 的调用来减少 JavaScript 活动:
  1. 打开代码编辑器, 打开 src/App.jsx
  2. 在 constructor 注释 this.minBitcoin(1500)
  3. 再次审核页面

  ![pic_31](/blogs/frontend/frontend_2_pic_31.png#pic_center)

  可以看到性能总分大大提升了!

---
**转载自**
[https://developers.google.com/web/tools/chrome-devtools/speed/get-started](https://developers.google.com/web/tools/chrome-devtools/speed/get-started)