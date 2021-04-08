---
title: 'Web Component'
date: '2021-03-31'
thumbnail: 'javascript/index.png'
type: 'frontend'
---

```toc
```
---
日常工作中，我们必定会接触到公共组件的提起及复用。如果不依赖 React 和 Vue 的话，Web Components 也可实现自定义组件。相比第三方框架，原生组件简单直接，不用加载任何外部模块，代码量小。它主要分为以下三个部分：

### Custom element(自定义元素)
1. 简介：一组JavaScript API，允许您定义 custom elements 及其行为，然后可以在您的用户界面中按照需要使用它们。
2. 示例：
  实现一个用户卡片。

  ![pic_1](/blogs/frontend/frontend_6_pic_1.png#pic_center)

  跟我们平时使用组件一样，只需要写入以下代码，便可显示用户卡片。

  ```html
  <user-card></use-card>
  ```
  
  这种自定义的 HTML 标签被称为自定义元素(custom element), 需要注意的是 **custom element 的名称不能是单个单次，且其中必须要有横短线。例如不能是 userCard, 应该是 user-card**。

  自定义元素需要 JavaScript 定义一个类，来创造出组件的模样。然后通过以下代码来给定义这个组件。

  ```javascript
  window.customElements.define('user-card', UserCard) // 存在第三个参数，可用来定义继承与什么元素，例如 customElements.define('word-count', WordCount, { extends: 'p' })
  ```

  接下来我们需要给 UserCard 添加这个元素的内容:
  
  ```javascript
  class UserCard extends HTMLElement {
    constructor() {
      super()

      var image = document.createElement('img')
      image.src = 'https://semantic-ui.com/images/avatar2/large/kristy.png'
      image.classList.add('image')

      var container = document.createElement('div')
      container.classList.add('container')

      var name = document.createElement('p')
      name.classList.add('name')
      name.innerText = 'User Name'

      var email = document.createElement('p')
      email.classList.add('email')
      email.innerText = 'yourmail@some-email.com'

      var button = document.createElement('button')
      button.classList.add('button')
      button.innerText = 'Follow'

      container.append(name, email, button)
      this.append(image, container)
    }
  }
  ```

  这样我们自定义元素内部的 DOM 结构就已经生成了。

---

### HTML templates(HTML 模板)
1. 简介：```<template>``` 和 ```<slot>``` 元素使您可以编写不在呈现页面中显示的标记模板。然后它们可以作为自定义元素结构的基础被多次重用。
2. 示例：
  如果觉得向上面一样使用 JavaScript 来写 DOM 结构很麻烦的话，那我们可以使用 Web Components API 提供的 ```<template>``` 标签，可以在它里面使用 HTML 定义 DOM。
  
```html
<template id="userCardTemplate">
  <img src="https://semantic-ui.com/images/avatar2/large/kristy.png" class="image">
  <div class="container">
    <p class="name">User Name</p>
    <p class="email">yourmail@some-email.com</p>
    <button class="button">Follow</button>
  </div>
</template>
```
  
  然后为自定义元素加载 ```<template>```
  
```javascript
class UserCard extends HTMLElement {
  constructor() {
    super()

    var templateElem = document.getElementById('userCardTemplate')
    var content = templateElem.content.cloneNode(true)
    this.appendChild(content)
  }
}  
```

  完整代码如下：

```html
<body>
<user-card></user-card>
<template>...</template>

<script>
  class UserCard extends HTMLElement {
    constructor() {
      super();

      var templateElem = document.getElementById('userCardTemplate');
      var content = templateElem.content.cloneNode(true);
      this.appendChild(content);
    }
  }
  window.customElements.define('user-card', UserCard);    
</script>
</body>
```

  复用组件还有一步就是可以从外向内传参，那我们可以这样做:

```html
<user-card
  image="https://semantic-ui.com/images/avatar2/large/kristy.png"
  name="User Name"
  email="yourmail@some-email.com"
></user-card>
<template id="userCardTemplate">
  <img class="image">
  <div class="container">
    <p class="name"></p>
    <p class="email"></p>
    <button class="button">Follow John</button>
  </div>
</template>
```

```javascript
class UserCard extends HTMLElement {
  constructor() {
    super()

    var templateElem = document.getElementById('userCardTemplate')
    var content = templateElem.content.cloneNode(true)
    content.querySelector('img').setAttribute('src', this.getAttribute('image'))
    content.querySelector('.container>.name').innerText = this.getAttribute('name')
    content.querySelector('.container>.email').innerText = this.getAttribute('email')
    this.appendChild(content)
  }
}
window.customElements.define('user-card', UserCard)
```

---
### Shadow DOM(影子 DOM)
1. 简介：一组JavaScript API，用于将封装的“影子”DOM树附加到元素（与主文档DOM分开呈现）并控制其关联的功能。通过这种方式，您可以保持元素的功能私有，这样它们就可以被脚本化和样式化，而不用担心与文档的其他部分发生冲突。
2. 示例：
  如果我们不希望自定义元素受到外部的影响，我们可以使用 Shadow DOM:
```javascript
class UserCard extends HTMLElement {
  constructor() {
    super()
    var shadow = this.attachShadow( { mode: 'closed' } )

    var templateElem = document.getElementById('userCardTemplate')
    var content = templateElem.content.cloneNode(true)
    content.querySelector('img').setAttribute('src', this.getAttribute('image'))
    content.querySelector('.container>.name').innerText = this.getAttribute('name')
    content.querySelector('.container>.email').innerText = this.getAttribute('email')

    shadow.appendChild(content)
  }
}
window.customElements.define('user-card', UserCard)
```

  this.attachShadow() 方法的参数{ mode: 'closed' }, 表示 Shadow DOM 是封闭的, 不允许外部访问。

---
**参考自：**
- **[Web Components](https://developer.mozilla.org/zh-CN/docs/Web/Web_Components)**
- **[Web Components 入门实例教程](http://www.ruanyifeng.com/blog/2019/08/web_components.html)**