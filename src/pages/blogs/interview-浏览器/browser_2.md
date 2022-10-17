---
title: 'script 标签中 defer 和 async 的区别'
date: '2022-10-18'
thumbnail: 'web/index.png'
type: 'interview-浏览器'
---
```toc
```
---

当浏览器加载 HTML 时遇到 <font color=#f0764c>```<script>...</script>```</font> 标签，浏览器就不能继续构建 DOM，必须立刻执行此脚本。对于外部脚本 <font color=#f0764c>```<script src="...">...</script>```</font> 也是一样的：浏览器必须等脚本下载完，并执行结束，之后才能继续处理剩余的页面。

这会导致两个重要的问题：
1. 脚本不能访问到位于它们下面的 DOM 元素，因此脚本无法给它们添加处理程序等。
2. 如果页面顶部有一个笨重等脚本，它会阻塞页面，在该脚本下载并执行结束前，用户都不能看到页面内容：

```js
<p>...content before script...</p>

<script src="https://javascript.info/article/script-async-defer/long.js?speed=1"></script>

<!-- This isn't visible until the script loads -->
<p>...content after script...</p>
```
---

![pic_1](/blogs/interview-浏览器/browser_2_pic_1.png#pic_center)

---

#### defer
defer 特性告诉浏览器不要等待脚本。浏览器将继续处理 HTML，构建 DOM。脚本会“在后台”下载，然后等 DOM 构建完成后，脚本才会执行。

- 具有 defer 特性的脚本不会阻塞页面
- 具有 defer 特性的脚本总是要等到 DOM 解析完毕，但在 DOMContentLoaded 事件之前执行

下面这个示例演示上面所说的第二句话：
```js
<p>...content before scripts...</p>

<script>
  document.addEventListener('DOMContentLoaded', () => alert("DOM ready after defer!"));
</script>

<script defer src="https://javascript.info/article/script-async-defer/long.js?speed=1"></script>

<p>...content after scripts...</p>
```
1. 页面内容立即显示
2. DOMContentLoaded 事件处理程序等待具有 defer 特性的脚本执行完成。它仅在脚本下载且执行结束后才会被触发。

**具有 defer 特性的脚本保持其相对的顺序，就像常规脚本一样**
```html
<script defer src="https://javascript.info/article/script-async-defer/long.js"></script>
<script defer src="https://javascript.info/article/script-async-defer/small.js"></script>
```
例如以上例子，即使 small.js 先加载完成，也需要等到 long.js 执行结束才会被执行。

<font color=#f0764c>
defer 特性仅适用于外部脚本

如果 script 脚本没有 src，则会忽略 defer 特性。
</font>

---
#### async

async 特性意味着脚本是完全独立的：
- 其他脚本不会等待 async 脚本加载完成，同样 async 脚本也不会等待其他脚本
- DOMContentLoaded 和异步脚本不会彼此等待：
  - DOMContentLoaded 可能会发生在异步脚本之前（如果异步脚本在页面完成后才加载完成）
  - DOMContentLoaded 也可能发生在异步脚本之后（如果异步脚本很短，或者是从 HTTP 缓存中加载的）

```html
<p>...content before scripts...</p>

<script>
  document.addEventListener('DOMContentLoaded', () => alert("DOM ready!"));
</script>

<script async src="https://javascript.info/article/script-async-defer/long.js"></script>
<script async src="https://javascript.info/article/script-async-defer/small.js"></script>

<p>...content after scripts...</p>
```

- 页面内容立刻显示出来：加载写有 async 的脚本不会阻塞页面渲染。
- DOMContentLoaded 可能在 async 之前或之后触发，不能保证谁先谁后。
- 较小的脚本 small.js 排在第二位，但可能会比 long.js 这个长脚本先加载完成，所以 small.js 会先执行。虽然，可能是 long.js 先加载完成，如果它被缓存了的话，那么它就会先执行。换句话说，异步脚本以“加载优先”的顺序执行。

<font color=#f0764c>由于添加 async 属性，使 js 在下载完成后立即执行，所以为了在该 js 中不要进行 dom 的相关操作</font>

<font color=#f0764c>
async 特性仅适用于外部脚本

就像 defer 一样，如果 script 标签没有 src 特性（attribute），那么 async 特性会被忽略
</font>

---

#### 总结

- 共同点： 不会阻塞页面的渲染（前提是 async 脚本没有操作 DOM 内容），用户可以立即阅读并下载页面内容
- 区别：

|  | 顺序 | DOMContentLoaded |
| --- | --- | --- |
| async | 加载优先顺序。脚本在文档中的顺序不重要 —— 先加载完成的先执行 | 不相关。可能在文档加载完成前加载并执行完毕。如果脚本很小或者来自于缓存，同时文档足够长，就会发生这种情况 |
| defer | 文档顺序（它们在文档中的顺序） | 在文档加载和解析完成之后（如果需要，则会等待），即在 DOMContentLoaded 之前执行。 |