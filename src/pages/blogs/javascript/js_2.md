---
title: 'Web Worker'
date: '2020-06-18'
thumbnail: 'javascript/index.png'
type: 'javascript'
---

```toc
```
---
## 1. 简介

由于 JavsScript 是单线程的，所有任务只能在一个线程上完成，如果前面的任务没完成，后面的任务只能等着。而利用 Web Worker 可以创建多线程环境，将任务放在 worker 里面执行，这样可以减少主线程负担，不会被阻塞或拖慢。

Web Worker 有一下几个使用的注意点：
1. 同源选择

    分配给 Worker 线程运行的脚本文件必须与主线程的脚本文件同源

2. DOM 限制

    Worker 线程所在的全局对象与主线程不一样，无法读取主线程所在网页的 DOM 对象，无法使用 document、window、parent 对象。 但是，Worker 线程可以使用 navigator 对象和 location 对象。

3. 通信联系

    Worker 线程和主线程不在同一个上下文环境，它们不能直接通信，必须通过消息完成。

4. 脚本限制

    Worker 线程不能执行 alert() 和 confirm() 方法，但可以使用 XMLHttpRequest 对象发出 AJAX 请求。

5. 文本限制

    Worker 线程无法读取本地文件，即不能打开本机的文件系统(file://)，他所加载的脚本必须来自网络。

---

## 2. 基本用法

**2.1 主线程**

使用 express 搭建，创建 worker.js 文件与 main.js 文件

**main.js**
```javascript
  const worker = new Worker('/javascripts/worker.js')

  worker.onmessage = function(e) {
    console.log('来自 worker:', e.data)
    worker.terminate()  // 关闭 worker
  }
```

**worker.js**
```javascript
  onmessage = (e) => {
    console.log('来自主线程：', e.data)
    postMessage('收到！我是 worker！')
  }
  // self 和 this 代表子线程自身，即子线程的全局对象
  console.log('this or self', self, this)
  console.log('location', location)
```

可看到它们进行通信了：

![pic_1](/blogs/javascript/js_2_pic_1.png#pic_center)


**2.2 Worker 线程**

可以为 Worker 添加监听函数，这样可以根据主线程发来的数据，在 Worker 线程里调用不同的方法。

下面是一个例子：

**worker.js**
```javascript
  addEventListener('message', function (e) {
    var data = e.data
    switch (data.cmd) {
      case 'start':
        postMessage(`${data.msg} -> 好的, 已开启`)
        break
      case 'stop':
        postMessage(`${data.msg} -> 好的, 正在关闭`)
        self.close()  // 关闭 worker
        break
      default:
        postMessage(`${data.msg} -> 抱歉, 我听不懂`)
    }
  })
```

**main.js**
```javascript
  const worker = new Worker('/javascripts/worker.js')

  worker.postMessage({ cmd: 'start', msg: 'worker 快开启' })  
  worker.postMessage({ cmd: 'please', msg: 'worker 倒杯水' })
  worker.postMessage({ cmd: 'stop', msg: '退下吧 worker' })

  worker.addEventListener('message', function(e) {
    console.log(e.data)
  })
```

可以看到 Worker 根据主线程发来的不同的命令调用对应的方法：

![pic_2](/blogs/javascript/js_2_pic_2.png#pic_center)

**2.3 Worker 加载脚本**

Worker 内部如果要加载其他脚本，有一个专门的方法 **importScripts()**

```javascript
  importScripts('script1.js')

  // 同时加载多个脚本
  importScripts('script1.js', 'script2.js')
```

**2.4 错误处理**

主线程可以监听 Worker 是否发生错误，如果发生错误 Worker 会触发主线程的 error 事件。

```javascript
  worker.onerror(function (event) {
    console.log([
      'ERROR: Line ', e.lineno, ' in ', e.filename, ': ', e.message
    ].join(''));
  });

  // 或者
  worker.addEventListener('error', function (event) {
    // ...
  });
```

Worker 内部也可以监听 **error** 事件

**2.5 关闭 Worker**

为了节省资源，使用完毕后记得关闭 Worker

```javascript
// 主线程
worker.terminate()

// worker 线程
self.close()
```
---

## 3. 实例


**3.1 Worker 线程完成轮询**

某种情况下，浏览器需要轮询服务器状态，以便第一时间得知状态改变，这个工作可以放在 Worker 里面。

```javascript
  function createWorker(f) {
    var blob = new Blob(['(' + f.toString() +')()']);
    var url = window.URL.createObjectURL(blob);
    var worker = new Worker(url);
    return worker;
  }

  var pollingWorker = createWorker(function (e) {
    var cache;

    function compare(new, old) { ... };

    setInterval(function () {
      fetch('/my-api-endpoint').then(function (res) {
        var data = res.json();

        if (!compare(data, cache)) {
          cache = data;
          self.postMessage(data);
        }
      })
    }, 1000)
  });

  pollingWorker.onmessage = function () {
    // render data
  }

  pollingWorker.postMessage('init');
```
Worker 每秒钟轮询一次数据，然后跟缓存对比，如果不一致，说明服务端有了新的变化，因此就要通知主线程了。

**3.2 Worker 新建 Worker**

Worker 线程内部还能再新建 Worker 线程(目前只有 Firefox 浏览器支持)。下面的例子是将一个计算密集的任务分配到 10 个 Worker.

**主线程代码**
```javascript
  var worker = new Worker('worker.js');
  worker.onmessage = function (event) {
    document.getElementById('result').textContent = event.data;
  };
```

**Worker 线程代码**
```javascript
  // worker.js

  // settings
  var num_workers = 10;
  var items_per_worker = 1000000;

  // start the workers
  var result = 0;
  var pending_workers = num_workers;
  for (var i = 0; i < num_workers; i += 1) {
    var worker = new Worker('core.js');
    worker.postMessage(i * items_per_worker);
    worker.postMessage((i + 1) * items_per_worker);
    worker.onmessage = storeResult;
  }

  // handle the results
  function storeResult(event) {
    result += event.data;
    pending_workers -= 1;
    if (pending_workers <= 0)
      postMessage(result); // finished!
  }
```

上面代码中，Worker 线程内部新建了10个 Worker 线程，并且依次向这10个 Worker 发送消息，告知了计算的起点和终点。计算任务脚本的代码如下。

```javascript
  // core.js
  var start;
  onmessage = getStart;
  function getStart(event) {
    start = event.data;
    onmessage = getEnd;
  }

  var end;
  function getEnd(event) {
    end = event.data;
    onmessage = null;
    work();
  }

  function work() {
    var result = 0;
    for (var i = start; i < end; i += 1) {
      // perform some complex calculation here
      result += 1;
    }
    postMessage(result);
    close();
  }
```

---

## 4. API

**4.1 主线程**

浏览器原生提供 **Worker()** 构造函数，用来供主线程生成 Worker 线程。
```javascript
var myWorker = new Worker(jsUrl, options);
```

**Worker()** 构造函数，可以接受两个参数。第一个参数是脚本的网址（必须遵守同源政策），该参数是必需的，且只能加载 JS 脚本，否则会报错。第二个参数是配置对象，该对象可选。它的一个作用就是指定 Worker 的名称，用来区分多个 Worker 线程。

```javascript
// 主线程
var myWorker = new Worker('worker.js', { name : 'myWorker' });

// Worker 线程
self.name // myWorker
```

**Worker()** 构造函数返回一个 Worker 线程对象，用来供主线程操作 Worker。Worker 线程对象的属性和方法如下。

- Worker.onerror：指定 error 事件的监听函数。
- Worker.onmessage：指定 message 事件的监听函数，发送过来的数据在Event.data属性中。
- Worker.onmessageerror：指定 messageerror 事件的监听函数。发送的数据无法序列化成字符串时，会触发这个事件。
- Worker.postMessage()：向 Worker 线程发送消息。
- Worker.terminate()：立即终止 Worker 线程。

**4.2 Worker 线程**

Web Worker 有自己的全局对象，不是主线程的 **window**，而是一个专门为 Worker 定制的全局对象。因此定义在 **window** 上面的对象和方法不是全部都可以使用。

Worker 线程有一些自己的全局属性和方法。

- self.name： Worker 的名字。该属性只读，由构造函数指定。
- self.onmessage：指定message事件的监听函数。
- self.onmessageerror：指定 messageerror 事件的监听函数。发送的数据无法序列化成字符串时，会触发这个事件。
- self.close()：关闭 Worker 线程。
- self.postMessage()：向产生这个 Worker 线程发送消息。
- self.importScripts()：加载 JS 脚本。

---
**转载自: http://www.ruanyifeng.com/blog/2018/07/web-worker.html**