---
title: '代码生成器 —— plop'
date: '2020-10-24'
thumbnail: 'javascript/index.png'
type: 'frontend'
---
### Table of Contents
```toc
```
---
工作之余对项目进行思考，每次新增组件都前后台都需要复用许多代码。除了公共组件的提取，有没有什么办法能提高工作效率呢？
因此想到如果代码能够直接生成，那每次生成组件模板，就更方便了。

于是找到了 **[plop](https://github.com/plopjs/plop)**，plop 是一个能够依据配置生成代码的库，具体详情可查阅文档。

### 安装

**1. 将 plop 添加到项目中**
```text
npm install --save-dev plop
```

**2. 全局安装 plop** 
```text
npm install -g plop
```
---
### 配置
1. 在根目录中创建 plopfile.js
```js
module.exports = function (plop) {
	// create your generators here
	plop.setGenerator('basics', {
		description: 'this is a skeleton plopfile',
		prompts: [], // array of inquirer prompts
		actions: []  // array of actions
	});
};
```

以上代码创建一个生成器，**description** 表示生成器的描述，**prompts** 设置一些变量提示，**actions** 是对代码的操作(生成、编辑等)

具体咋操作可查看文档

---
### 项目中的应用

**1. 代码结构**

因为项目组件采用 duck 的结构，目录大致如下:

```text
videoComponent
|_ videoComponent
|_ videoContainer
```

因此可以抽出一个模板：
```text
src
|_ templates
   |_ component
   |  |_ compTemplate.jsx
   |  |_ containerTemplate.jsx
   |_ plop.js
```

**plop.js 具体配置如下:**
```js
module.exports = {
  description: 'create component',
  prompts: [{
    type: 'component',
    name: 'name',
    message: '请输入组件主名称，如 video(会自动生成 videoComponent 等)',
  }],
  actions: [
    {
      type: 'addMany',
      destination: "src/components/{{name}}Component",
      paths: [
        'src/templates/comp/{{name}}Component.js',
        'src/templates/comp/{{name}}Container.js',
      ],
      base: 'src/templates/comp',
      transform (content, data) {
        return content.replace(/testContainer|testComponent/g, str => {
          if (str === 'testContainer') {
            return `${data.name}Container`
          } else if (str === 'testComponent') {
            return `${data.name}Component`
          }
          return data.name
        })
      },
      templateFiles: [
        'src/templates/comp/compTemplate.js',
        'src/templates/comp/containerTemplate.js',
      ],
    }
  ]
}
```

**plopfile.js 配置如下**
```js
const common = require('./src/templates/plop.js')

module.exports = plop => {
  plop.setGenerator('common', common)
}
```

**2. 修改源码**

因为这里想要的是生成一个文件夹，并且把代码中的函数名以及文件名改成我们需要的样子。所以使用了 **addMany** 这个 action。但是 addMany 有一个缺陷，他没有属性可以把我们的文件名修改成需要的样子，所以查阅了源码，修改了以下地方。


**node-plop/lib/actions/addMany.js**

![pic_1](/blogs/frontend/frontend_5_pic_1.png#pic_center)
![pic_2](/blogs/frontend/frontend_5_pic_2.png#pic_center)

可以看到这里的文件名其实是让配置里的 templateFile 截取掉和 base 的公共部分，因此得到文件名。


也就是说：
```text
templateFile: 'src/templates/comp/compTemplate.js'
base: 'src/templates/comp'
filename: compTemplate.js
```

因此每次所生成的文件名都和模板的一样。所以我们可以自己设置一个 paths 属性, path 文件名为变量。这样我们得到的文件名就是想要的样子了。(第一张图的注释去掉即可生效)

**3. 看下效果**
```text
npm run plop
```
输入我们的组件名称

![pic_3](/blogs/frontend/frontend_5_pic_3.png#pic_center)

可以看到文件夹、文件名、代码中的组件名都变成我们想要的 videoComponent 了！

![pic_4](/blogs/frontend/frontend_5_pic_4.png#pic_center)

---
**参考自 [https://github.com/plopjs/plop](https://github.com/plopjs/plop)** 