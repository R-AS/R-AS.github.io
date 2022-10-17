---
title: '从浏览器地址栏输入 url 到请求返回发生了什么？'
date: '2022-10-17'
thumbnail: 'web/index.png'
type: 'interview-浏览器'
---
```toc
```
---

#### 过程
1. 输入 URL 后解析协议、主机、端口、路径等信息，并构造一个 HTTP 请求
2. DNS 域名解析，获取目标 ip 地址
![pic_1](/blogs/interview-浏览器/browser_1_pic_1.png#pic_center)
3. TCP 连接（三次握手）
[TCP 三次握手](https://r-as.github.io/blogs/interview-%E8%AE%A1%E7%AE%97%E6%9C%BA%E5%9F%BA%E7%A1%80/web_2/#%E4%B8%89%E6%AC%A1%E6%8F%A1%E6%89%8B)
4. 发送 HTTP 请求（TCP 三次握手结束后，开始发送 HTTP 请求报文）
5. 服务器处理请求并返回 HTTP 报文
6. 浏览器解析渲染页面（下文讲解）
7. TCP 断开连接（四次挥手）
[TCP 四次挥手](https://r-as.github.io/blogs/interview-%E8%AE%A1%E7%AE%97%E6%9C%BA%E5%9F%BA%E7%A1%80/web_2/#%E5%9B%9B%E6%AC%A1%E6%8C%A5%E6%89%8B)

---

#### 浏览器渲染页面的过程
1. 浏览器获取到 html 资源后开始解析 html，构建 DOM Tree
2. 解析到 css 后根据 css 生成 css 规则树（style rules）
3. 在 DOM Tree 和 css 规则树都生成完后，通过 DOM Tree 和 css 规则树生成渲染树（Render Tree）
4. 渲染树构建完成后，浏览器开始计算元素的大小和位置（layout）
5. 根据计算好的节点信息将内容绘制到屏幕上(painting)

