---
title: 'NodeJS 爬网页数据'
date: '2020-01-14'
thumbnail: 'nodejs/index.png'
type: 'nodejs'
---
### Table of Contents
```toc
```
---
最近需要着手毕业设计, 但图书数据需要购买且数据量过大，因此利用两款插件([request](https://github.com/request/request), [cheerio](https://github.com/cheeriojs/cheerio))来爬网页数据，下面展示一下:
以[豆瓣读书](https://book.douban.com/subject/34894380/)为例

### request 获取整个页面的 HTML
1. **首先打开控制台, 找到所需的部分**

![pic_1](/blogs/nodejs/nodejs_1_pic_1.png)

2. **观察 HTML 标签和 class**

```javascript
<div class="subject clearfix">
  <div id="mainpic" class="">
    <a class="nbg" href="https://img9.doubanio.com/view/subject/l/public/s33547055.jpg" title="雾行者">
      <img src="https://img9.doubanio.com/view/subject/l/public/s33547055.jpg" title="点击看大图" alt="雾行者" rel="v:photo" style="width: 135px;max-height: 200px;">
    </a>
  </div>
  <div id="info" class="">
    <span>
      <span class="pl"> 作者</span>:
        <a class="" href="/author/573172">路内</a>
    </span><br>
    <span class="pl">出版社:</span> 理想国 | 上海三联书店<br>
    <span class="pl">出品方:</span>&nbsp;<a href="https://book.douban.com/series/39057?brand=1">理想国</a><br>
    <span class="pl">出版年:</span> 2020-1<br>
    <span class="pl">页数:</span> 580<br>
    <span class="pl">定价:</span> 88.00<br>
    <span class="pl">装帧:</span> 精装<br>
    <span class="pl">ISBN:</span> 9787542668547<br>
  </div>
</div>
```

3. **用 request 抓取页面 HTML**

```javascript
const request = require('request')
const url = 'https://book.douban.com/subject/34894380'

request(url, (err, res, body) => {
  console.log(body)
})
```
可看到 request 拿到了整个网页的 body, 这是可以利用 cheerio 来截取需要的部分了

![pic_2](/blogs/nodejs/nodejs_1_pic_2.png)

### cheerio 从 HTML 中截取需要的资料

**观察 HTML 结构, 发现只需要取 div.subject 下的 div#info 的信息就可以了, 但需要过滤掉 span.pl**

```javascript
const request = require('request')
const cheerio = require('cheerio')
const { trim } = require('../utils')  // 自己分装的函数, 用来格式化取出的文字

request(url, (err, res, body) => {
  const $ = cheerio.load(body)
  let details = []
  
  // 拷贝基本信息
  $('.pl').remove()
  $('.subject #info').each(function(i, el) {
    let item = ''
    item = $(this).text().split('\n').filter(n => trim(n))
    item = item.map(n => trim(n))
    details = Object.assign([], item)
  })
  console.log(details)
})
```

可看到已经获取到图书的基本信息

![pic_3](/blogs/nodejs/nodejs_1_pic_3.png)
![pic_4](/blogs/nodejs/nodejs_1_pic_4.png)

这样我们就可以建下数据库, 把数据存进去了，省事～

---
**本文参考自**
- https://larrylu.blog/nodejs-request-cheerio-weather-414e33f45c7d
- https://cheerio.js.org/