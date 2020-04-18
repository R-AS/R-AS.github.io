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

### 建立基准
基准记录是在进行任何性能改进之前,网站的运行情况
1. 在 DevTools 点击 Audits 选项

  ![pic_5](/blogs/frontend/frontend_2_pic_5.png#pic_center)

2. 关于面板中的配置:
  - Device
    可以设置所需分析的设备类型
  - Audits
    这里可以审查以下几个选项的类型,如果不想审查可以将其禁用.禁用类别会稍微加快审核过程
  - Throttling
    这里设置为 Simulated Fast 3G, 4x CPU Slowdown 来模拟移动设备的浏览状态.这里之所以是 Simulated 是因为 Audit 在审核过程中实际上并未节流, 相反, 它只是推断在移动条件下页面加载所需的时间
  - Clear Storage
    如果要审查首次访问的体验, 请保留此项.若需要审查重复访问体验, 请禁用次项
3. 点击 Run Audits, 大概 10 - 30 秒后,面板上会显示这个网站的性能报告

### 处理报告错误
如果得到的报告面板显示 Error, 请尝试在无痕模式下运行该网站, 这样可以确保在干净环境下运行, 特别是 Chrome 扩展程序经常会干扰审查过程

1. 理解报告
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

2. 实践
**Enable text compression**
在报告中显示了 enable text compression 是提高页面性能的方式之一. 文本压缩是指在网络发送文本之前减小或压缩文本文件的大小
以下有两种方法可以手动检查文本资源是否已压缩:

- 打开 Network, 查看 Enable text compression 提示的文件

  可以看到在 size 这一列中有两个值, 上面的值代表着下载资源的大小, 下面的值代表着未压缩文件的大小, 如果这两个值相同, 则说明在发起网络请求前并未对其进行压缩.
