---
title: '浏览器缓存机制'
date: '2022-10-19'
thumbnail: 'web/index.png'
type: 'interview-浏览器'
---
```toc
```
---

#### 缓存的大概流程

![pic_1](/blogs/interview-浏览器/browser_3_pic_1.png#pic_center)
由上图可得知：
- 浏览器每次发起请求，都会 先在浏览器缓存中查找该请求的结果以及缓存标识
- 浏览器每次拿到返回的请求结果都会 将该结果和缓存标识存入浏览器缓存中

---

#### 强制缓存
<font color=#f0764c>强制缓存就是向浏览器缓存查找该请求结果，并根据该结果的缓存规则来决定是否使用该缓存结果的过程。</font>

强制缓存的情况主要有三种：

1. 不存在该缓存结果和缓存标识，强制缓存失效，则直接向服务器发起请求（跟第一次发起请求一致）：
![pic_1](/blogs/interview-浏览器/browser_3_pic_2.png#pic_center)

2. 存在该缓存结果和缓存标识，但该结果已失效，强制缓存失效，则使用协商缓存：
![pic_1](/blogs/interview-浏览器/browser_3_pic_3.png#pic_center)

3. 存在该缓存结果和缓存标识，且该结果尚未失效，强制缓存生效，直接返回该结果：
![pic_1](/blogs/interview-浏览器/browser_3_pic_4.png#pic_center)

> 强制缓存的规则：当浏览器向服务器发起请求时，服务器会将缓存规则放入 HTTP 响应报文的 HTTP 头中和请求结果一起返回给浏览器，控制强制缓存的字段分别时 Expires 和 Cache-Control，其中 Cache-Control 优先级比 Expires 高。

Expires 为服务器返回该请求结果 **缓存的到期时间**，即再次发起该请求时，如果客户端的时间小于 Expires 的值时，直接使用缓存结果。

但如时区不同，客户端和服务器端有一方的时间不准确，导致误差，那么强制缓存则会直接失效。所以 Expire 被 Cache-Control 取代。

<font color=#f0764c>Cache-Control</font>

Cache-Control 的主要取值为：

- public：所有内容都将被缓存（客户端和代理服务器都可缓存）
- private：所有内容只有客户端可以缓存，Cache-Control的默认取值
- no-cache：客户端缓存内容，但是是否使用缓存则需要经过协商缓存来验证决定
- no-store：所有内容都不会被缓存，即不使用强制缓存，也不使用协商缓存
- max-age=xxx (xxx is numeric)：缓存内容将在xxx秒后失效

![pic_1](/blogs/interview-浏览器/browser_3_pic_5.png#pic_center)
由上面的例子我们可以知道：
- HTTP 响应报文中 expires 的时间值，是一个绝对值
- HTTP 响应报文中 Cache-Control 为 max-age=600，是相对值

由于 Cache-Control 的优先级比 expires 高，那么直接根据Cache-Control的值进行缓存，意思就是说在600秒内再次发起该请求，则会直接使用缓存结果，强制缓存生效。

---

#### 协商缓存

<font color=#f0764c>协商缓存就是强制缓存失效后，浏览器携带缓存标识向服务器发起请求，由服务器根据缓存标识决定是否使用缓存的过程。</font>

主要有一下两种情况：

- 协商缓存生效，返回 304:
![pic_1](/blogs/interview-浏览器/browser_3_pic_6.png#pic_center)

- 协商缓存失效，返回 200:
![pic_1](/blogs/interview-浏览器/browser_3_pic_7.png#pic_center)

控制协商缓存的字段分别是：<font color=#f0764c>Last-Modified/If-Modified-Since</font> 和 <font color=#f0764c>Etag/If-None-Match</font>，其中 <font color=#f0764c>Etag/If-None-Match</font> 的优先级比 <font color=#f0764c>Last-Modified/If-Modified-Since</font> 高。

<font color=#f0764c>Last-Modified/If-Modified-Since</font> 

Last-Modified 是服务器响应请求时，返回该资源文件在服务器最后被修改的时间：
![pic_1](/blogs/interview-浏览器/browser_3_pic_8.png#pic_center)

Last-Modified-Since 是客户端再次发起该请求时，携带上次请求返回的 Last-Modified 值。服务器通过对该修改时间进行对比，如果服务器资源最后被修改时间大于 If-Modified-Since 的字段值，则重新返回资源，状态码为 200。否则返回 304，继续使用缓存文件。

<font color=#f0764c>Etag</font> 

Etag是服务器响应请求时，返回当前资源文件的一个唯一标识(由服务器生成)
![pic_1](/blogs/interview-浏览器/browser_3_pic_9.png#pic_center)

If-None-Match 是客户端再次发起该请求时，携带上次请求返回的唯一标识 Etag 值，服务器通过对比，如果 If-None-Match 值与 Etag 一致，则返回 304，继续使用缓存文件。不一致则重新返回资源文件，状态码为 200。

---

#### 总结
浏览器缓存分为强制缓存和协商缓存，强制缓存优先于协商缓存进行。

- 若强制缓存(Expires和Cache-Control,Cache-Control优先级高于Expires)生效则直接使用缓存
- 若不生效则进行协商缓存(Last-Modified / If-Modified-Since和Etag / If-None-Match，其中Etag / If-None-Match的优先级比Last-Modified / If-Modified-Since高)，协商缓存由服务器决定是否使用缓存
- 若协商缓存失效，那么代表该请求的缓存失效，重新获取请求结果，再存入浏览器缓存中；生效则返回304，继续使用缓存。

主要流程如下：

![pic_1](/blogs/interview-浏览器/browser_3_pic_10.png#pic_center)

---

**摘抄自**
- [彻底理解浏览器的缓存机制](https://juejin.cn/post/6992843117963509791)
