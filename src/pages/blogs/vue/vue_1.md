---
title: 'Webpack 搭建 Vue 开发环境'
date: '2020-10-23'
thumbnail: 'vue/index.png'
type: 'vue'
---
### Table of Contents
```toc
```
---
### Webpack 基本配置
**1.初始化项目**
```
npm init -y
```

**2.安装 webpack、webpack-cli**
```
npm install webpack webpack-cli --save-dev
```

**3.设置 package.json 用来执行 webpack，在 "script" 中加入 build 的规则**
```
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "build": "webpack"
},
```

**4. 创建项目目录**

大概目录如下，src 用来存放我们的代码，dist 存在打包后的代码
```
vue-demo
|_ dist
|_ node_modules
|_ src
|_ package-lock.json
|_ package.json
```

**5. 在 src 下新建 index.js，测试打包**
```
npm run build
```
**6. 在 dist 下新建 index.html，引入 main.js**
```html
<!DOCTYPE html>
<html>
<head>
<title> Webpack and Vue </title>
</head>
<body>
<div id = "app"></div>
<script src = "main.js"></script>
</body>
</html>
```
---
### Vue 搭建

**1. npm 安装 vue**
```
npm install vue
```

**2. 在 index.js import Vue**
```js
import Vue from 'vue'

new Vue({
  el: '#app',
  mounted : function(){
    console.log('Hello Webpack and Vue !');  
  }
});
```

**3. 打包并打开 index.html 测试**
```
npm run build
```

![pic_1](/blogs/vue/vue_1_pic_1.jpg#pic_center)

---
### 设置 vue 文件打包 和 Vue-components

**1.安装 Babel 相关插件用来编译 js 框架中复杂的语法**

安装 **babel-core** 和 **babel-loader**

```
npm install babel-core babel-loader --save-dev
```

**2.安装 babel-preset-env 和 babel-preset-vue**
```
npm install babel-preset-env babel-preset-vue --save-dev
```

**3.安装 Vue-loader 相关插件，协助编译 .vue 中的语法 和 vue template**

安装 **vue-loader, vue-style-loader, css-loader, file-loader, vue-template-compiler**

```
npm install vue-loader vue-style-loader css-loader file-loader vue-template-compiler --save-dev
```

**4.在 package.json 中加入以下设定**
```
"babel": {
  "presets": ["env", "vue"]
}
```

**5. 在根目录下创建 webpack.config.js**
```js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```

**6. 在 webpck.config.js 中加入 babel-loader 、vueLoaderPlugin、file-loader**
```js
const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /.js$/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
}
```

**7.在 webpack.config.js 中设置模板的编译**
```js
resolve: { 
  alias: { 
    'vue': 'vue/dist/vue.js' 
  } 
}
```

**8.在 src 下创建 hello.vue**
```js
<template>
  <div class="hello">Hello {{ who }}</div>
</template>

<script>
module.exports = {
  data: function() {
    return {
      who: 'Vue and Webpack !!'
    }
  }
};
</script>

<style scoped>
.hello {
  padding: .5em;
  font-size: 2em;
  background-color: #fcf;
}
</style>
```

**index.js 引入 hello.vue**
```js
import Vue from 'vue'
import hello from './hello.vue'

new Vue({
  el: '#app',
  mounted : function(){
    console.log('Hello World');

  },
  components: { hello },
  template: '<hello/>'
})
```

**9.打包并打开 index.html 测试**
```js
npm run build
```

---
**转载自 [https://devs.tw/post/60](https://devs.tw/post/60)**