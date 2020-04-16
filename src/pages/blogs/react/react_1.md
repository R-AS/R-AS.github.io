---
title: '使用 Webpack 和 Babel 从零配置 React'
date: '2020-03-17'
thumbnail: 'react/index.png'
type: 'react'
---
### Table of Contents
```toc
```
### 1.创建目录并初始化项目
```js
npm init -y
```

### 2. 安装 webpack 和 webpack-cli 作为 dev 依赖项
```js
npm i webpack@4 webpack-cli@3 -D
```
**-D: --save-dev**
**注：在 webpack 3 中, webpack 和它的 CLI 都是在同一个包中，但在第4版中，他们已经将两者分开来更好地管理它们.所以安装时，最好是 webpack 和 webpack-cli 同时安装.**

### 3. 更新 package.json 文件
```json
{
  "name": "react_project",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "webpack --mode development",
    "build": "webpack --mode production"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "webpack": "^4.17.1",
    "webpack-cli": "^3.1.0"
  }
}
```

---

### 配置 React 和 Babel
**1. 安装 react 和 react-dom 作为依赖**
```js
npm i react@16 react-dom@16 -S
```
**-S: --save**

**2. 安装 babel-loader @babel/core @babel/preset-env @babel/preset-react 作为 dev 依赖项**
```js
npm i babel-loader@8 @babel/core @babel/preset-env @babel/preset-react -D
```

- **babel-loader：使用 Babel 转换 JavaScript依赖关系的 Webpack 加载器**

- **@babel/core：即 babel-core，将 ES6 代码转换为 ES5**

- **@babel/preset-env：即 babel-preset-env，根据您要支持的浏览器，决定使用哪些 transformations /- plugins 和 polyfills，例如为旧浏览器提供现代浏览器的新特性**

- **@babel/preset-react：即 babel-preset-react，针对所有 React 插件的 Babel 预设，例如将 JSX 转换为函数**

**3. 创建 webpack.config.js 和 .babelrc 文件， 并配置 babel-loader babel 选项**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
}
```
```json
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

**4. 在 src 目录下创建 index.js 文件渲染组件**
```js
import React from 'react';
import ReactDOM from 'react-dom';

const Index = () => {
  return <div>Hello React!</div>;
};

ReactDOM.render(<Index />, document.getElementById('index'));
```

**5. 在 src 目录下创建 index.html 文件**
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>React、Webpack4 and Babel 7</title>
</head>
<body>
  <section id="index"></section>
</body>
</html>
```

**6. 安装 html-webpack-plugin 作为 dev 依赖项，并配置 webpack.config.js**
```js
npm i html-webpack-plugin -D
```
```js
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html'
    })
  ]
};
```

**7. 执行 npm run start，生成 dist**

---

### 配置 webpack-dev-server
**1. 安装 webpack-dev-server 作为 dev 依赖项**
```js
npm i webpack-dev-server -D
```

**2. 更新 package.json 的 start 脚本**
```json
{
  "name": "react_project",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "webpack-dev-server --mode development --open",
    "build": "webpack --mode production"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "react": "^16.4.2",
    "react-dom": "^16.4.2"
  },
  "devDependencies": {
    "@babel/core": "^7.0.0",
    "@babel/preset-env": "^7.0.0",
    "@babel/preset-react": "^7.0.0",
    "babel-loader": "^8.0.0",
    "html-webpack-plugin": "^3.2.0",
    "webpack": "^4.17.1",
    "webpack-cli": "^3.1.0",
    "webpack-dev-server": "^3.1.6"
  }
}
```
**3. 执行 npm run start，浏览器自动打开 localhost:8080 页面**

---

### 配置 CSS
**1. 安装 css-loader 和 style-loader 作为 dev 依赖项**
```js
npm i css-loader style-loader -D
```

**2. 配置 webpack.config.js 处理 css**
```js
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html'
    })
  ]
};
```
**注：加载器的顺序很重要。首先，我们需要 css-loader 解析 css 文件（将类似 @import 和 url（...）的方法实现 require 的功能），然后使用 style-loader 将样式添加到 DOM。默认情况下，webpack 使用从右边(数组中的最后一个元素)到左边(数组中的第一个元素)执行加载器。**

**3. 使用 CSS 模块化**
```js
...
module.exports = {
  module: {
    rules: [
      ...
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]_[local]_[hash:base64]',
              sourceMap: true,
              minimize: true
            }
          }
        ]
      }
    ]
  },
  ...
};
```
**要启用 CSS 模块化，我们需要设置 css-loader 的 module 选项为 true。importLoaders 选项表示在 css-loader 之前应用多少个加载器。例如，sass-loader 必须先于 css-loader 出现。localIdentName 允许配置生成的标识：**

- **[name]：css 文件名称**
- **[local]：类/id 的名称**
- **[hash:base64]：随机生成的 hash，它在每个组件的 CSS 中都是唯一的**

---

**转载自 https://imweb.io/topic/5b8699a96a0f1b02454de3c0**