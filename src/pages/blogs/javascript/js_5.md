---
title: 'WebSocket'
date: '2020-06-28'
thumbnail: 'javascript/index.png'
type: 'javascript'
---
### Table of Contents
```toc
```
---
## 一、引言
上次在餐厅点菜，一张桌子有一个二维码，小伙伴们扫了二维码之后可以一起点菜(在你的设备上或实施更新你们一起点的菜)。这种场景前端可以怎样实现呢？

其实挺简单，**只是共同访问一个购物车 id,并实时更新而已**

这样可以通过 Web Worker 进行轮询，实时更新。但想了下，为啥不用 WebSocket 呢，避免性能上的损耗。

---
## 二、为什么需要 WebSocket
我们已经有了 HTTP 协议，为什么还需要另外一个协议？

答案很简单，因为 HTTP 协议有一个缺陷： 通信只能由客户端发起

例如天气预报的更新，只能由客户端进行轮询更新。轮询的效率低且非常浪费资源，这是就需要 WebSocket 了

---
## 三、简介
WebSocket 协议在2008年诞生，2011年成为国际标准。所有浏览器都已经支持了。

它的最大特点就是，服务器可以主动向客户端推送信息，客户端也可以主动向服务器发送信息，是真正的双向平等对话，属于服务器推送技术的一种。

![pic_1](/blogs/javascript/js_5_pic_1.png#pic_center)

其他特点包括：

- 建立在 TCP 协议之上，服务器端的实现比较容易。
- 与 HTTP 协议有着良好的兼容性。默认端口也是80和443，并且握手阶段采用 HTTP 协议，因此握手时不容易屏蔽，能通过各种 HTTP 代理服务器。
- 数据格式比较轻量，性能开销小，通信高效。
- 可以发送文本，也可以发送二进制数据。
- 没有同源限制，客户端可以与任意服务器通信。
- 协议标识符是ws（如果加密，则为wss），服务器网址就是 URL。
```javascript
ws://example.com:80/some/path
```

---
## 四、客户端的简单示例
```javascript
var ws = new WebSocket("wss://echo.websocket.org");

ws.onopen = function(evt) { 
  console.log("Connection open ..."); 
  ws.send("Hello WebSockets!");
};

ws.onmessage = function(evt) {
  console.log( "Received Message: " + evt.data);
  ws.close();
};

ws.onclose = function(evt) {
  console.log("Connection closed.");
};  
```
---

## 五、客户端 API

**1. WebSocket 构造函数**

WebSocket 对象作为一个构造函数，用于新建 WebSocket 实例。
```javascript
var ws = new WebSocket('ws://localhost:8080');
```
执行上面语句之后，客户端就会与服务器进行连接。

**2. webSocket.readyState**

readyState属性返回实例对象的当前状态，共有四种。

- CONNECTING：值为0，表示正在连接。
- OPEN：值为1，表示连接成功，可以通信了。
- CLOSING：值为2，表示连接正在关闭。
- CLOSED：值为3，表示连接已经关闭，或者打开连接失败。

**3. webSocket.onopen**

实例对象的onopen属性，用于指定连接成功后的回调函数

```javascript
ws.onopen = function () {
  ws.send('Hello Server!');
}
```
如果要指定多个回调函数，可以使用addEventListener方法。
```javascript
ws.addEventListener('open', function (event) {
  ws.send('Hello Server!');
});
```

**4. webSocket.onclose**

实例对象的onclose属性，用于指定连接关闭后的回调函数。
```javascript
ws.onclose = function(event) {
  var code = event.code;
  var reason = event.reason;
  var wasClean = event.wasClean;
  // handle close event
};

ws.addEventListener("close", function(event) {
  var code = event.code;
  var reason = event.reason;
  var wasClean = event.wasClean;
  // handle close event
});
```

**5. webSocket.onmessage**

实例对象的onmessage属性，用于指定收到服务器数据后的回调函数。
```javascript
ws.onmessage = function(event) {
  var data = event.data;
  // 处理数据
};

ws.addEventListener("message", function(event) {
  var data = event.data;
  // 处理数据
});
```

**6. webSocket.send()**

实例对象的send()方法用于向服务器发送数据。
```javascript
ws.send('your message');
```

**7. webSocket.bufferedAmount**

实例对象的bufferedAmount属性，表示还有多少字节的二进制数据没有发送出去。它可以用来判断发送是否结束。
```javascript
var data = new ArrayBuffer(10000000);
socket.send(data);

if (socket.bufferedAmount === 0) {
  // 发送完毕
} else {
  // 发送还没结束
}
```

**8. webSocket.onerror**

实例对象的onerror属性，用于指定报错时的回调函数。
```javascript
socket.onerror = function(event) {
  // handle error event
};

socket.addEventListener("error", function(event) {
  // handle error event
});
```

---
## 六、服务端的实现
常用的 Node 实现有以下三种。

- [µWebSockets](https://github.com/uWebSockets/uWebSockets)
- [Socket.IO](http://socket.io/)
- [WebSocket-Node](https://github.com/theturtle32/WebSocket-Node)

---
## 七、点餐例子实现
以下通过一个简单的 demo 模拟点餐过程，服务器使用的是 express, 需要安装 socket.io

**HTML**
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>点菜</title>
  <script src="/socket.io/socket.io.js"></script>
</head>
<body>
  <ul id="list">
    <li class="list-item">红烧牛肉</li>
    <li class="list-item">鱼香肉丝</li>
    <li class="list-item">黄焖鸡</li>
    <li class="list-item">白灼虾</li>
    <li class="list-item">蒜香青菜</li>
    <li class="list-item">凉拌皮蛋</li>
  </ul>
  <div>
    已点：
    <ul id="car"></ul>
  </div>
</body>
<script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
<script type="text/javascript">
  const list = $('#list')
  const listItem = $('.list-item')
  const car = $('#car')
  const socket = io()

  listItem.click(function(e) {
    const { target: { innerText = '' } = {} } = e
    socket.emit('add food', innerText)
  })

  socket.on('add food', function(food) {
    car.append(`<li>${food}</li>`)
  })
</script>
</html>
```
**Node.js**
```javascript
var app = require('express')()
var http = require('http').createServer(app)
var io = require('socket.io')(http)

io.on('connection', (socket) => {
  socket.on('add food', (msg) => {
    io.emit('add food', msg)
  })
})

http.listen(3000, () => {
  console.log('listening on *:3000')
})
```

**效果如下：**
![pic_2](/blogs/javascript/js_5_pic_2.gif#pic_center)

---
**转载自 [http://www.ruanyifeng.com/blog/2017/05/websocket.html](http://www.ruanyifeng.com/blog/2017/05/websocket.html)**