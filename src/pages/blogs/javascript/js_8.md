---
title: '设计模式'
date: '2020-07-11'
thumbnail: 'javascript/index.png'
type: 'javascript'
---
### Table of Contents
```toc
```
---

## 工厂模式
- 定义：简单工厂模式是由一个方法来决定到底要创建哪个类的实例，而这些类通常都拥有相同的接口(属性和方法)
- 使用场景：
  1. 对象的构建十分复杂
  2. 需要依赖具体环境创建不同实例
  3. 处理大量具有相同属性的小对象
- 举例：
  - 计算器(加、减、乘、除)
  - 自行车售卖(山地、公路)
  - 饮料机(咖啡、牛奶、水)
  - RPG 中职业(战士、法师、射手)
这里以 RPG 中职业(战士、法师、射手)来做说明：
```javascript
// 先创建各个角色的构造函数
function Warrior() {
  this.skill = '回血'
  this.blood = 150  // 初始化生命值
  this.hit = 8 // 普通攻击伤害
  console.log(this)
}

function Mage() {
  this.skill = '冰冻'
  this.blood = 120  // 初始化生命值
  this.hit = 3  // 普通攻击伤害
  console.log(this)
}

function Archer() {
  this.skill = '消耗'
  this.blood = 110  // 初始化生命值
  this.hit = 10 // 普通攻击伤害
  console.log(this)
}

const RoleFactory = {
  createRole (role) {
    let roler
    switch (role) {
      case '战士':
        roler = new Warrior()
        break
      case '法师':
        roler = new Mage()
        break
      case '射手':
        roler = new Archer()
        break
      default:
        roler = new Warrior()
    }
  }
}

Object.freeze(RoleFactory)  // 冻结该对象，防止他人操作

// 创建各个角色的实例
var warrior1 = RoleFactory.createRole('战士') // 创建一个战士
var mage1 = RoleFactory.createRole('法师') // 创建一个法师
var arche1 = RoleFactory.createRole('射手') // 创建一个射手
```

运行结果:

```javascript
Warrior { skill: '回血', blood: 150, hit: 8 }
Mage { skill: '冰冻', blood: 120, hit: 3 }
Archer { skill: '消耗', blood: 110, hit: 10 }
```

---
## 单例模式
- 定义：单例就是保证一个类只有一个实例，实现的方法一般是先判断实例存在与否，如果存在直接返回，如果不存在就创建了再返回，这就确保了一个类只有一个实例对象

在 JavaScript 里，单例作为一个命名空间提供者，从全局命名空间里提供一个唯一的访问点来访问该对象
- 举例：模态框、登录控件、注销控件

下面均已登录模态框做说明

1. **引入代理实现单例模式**

```javascript
var CreateDiv = function (html) {
  this.html = html
  this.init()
}

CreateDiv.prototype.init = function () {
  var div = document.createElement('div')
  div.innerHTML = this.html
  document.body.appendChild(div)
}

var ProxySingletonCreateDiv = (function () {
  var instance
  return function (html) {
    if (!instance) {
      instance = new CreateDiv(html)
    }
    return instance
  }
})()

var a = new ProxySingletonCreateDiv('seven1')
var b = new ProxySingletonCreateDiv('seven2')

console.log(a === b)  // true
```

PS：我们负责管理单例的逻辑移到了代理类ProxySingletonCreateDiv中。

这样一来，CreateDiv就变成了一个普通的类，他跟ProxySingletonCreateDiv组合起来可以达到单例模式的效果。

2. **通用的单例模式**

```javascript
// 通用的单例验证方法
const getSingle = function (fn) {
  let result
  return function () {
    return result || (result = fn.apply(this, arguments))
  }
}

// 创建登录模态框
const createLoginLayer = function () {
  const div = document.createELement('div')
  div.innerHTML = '我是登录模态框'
  document.body.appendChild(div)
  return div
}

// 为登录模态框使用单例模式
const createSingleLoginLayer = getSingle(createLoginLayer)
const loginLayer1 = createSingleLoginLayer()
const loginLayer2 = createSignleLoginLayer()

console.log(loginLayer1 === loginLayer2)  // true
```

这时不管你执行多少次 createSingleLoginLoyer() 方法，都只会生产一个 div 节点。

我们的通用单例模式就完成了。

3. **惰性单例**
- 惰性单例指的是在需要的时候才创建对象的实例

以创建登录模态框为例

```javascript
const createLoginLayer = (function () {
  let div
  return function () {
    if (!div) {
      div = document.createELement('div')
      div.innerHTML = '我是登录模态框'
    }
    return div
  }
})()

// 在点击按钮时才创建节点
document.getElementById('login-btn').onclick = function () {
  var loginLayer = createLoginLayer()
  loginLayer.style.display = 'block'
}
```

这里的对惰性单例的实现主要是只有单例了网页上的登录按钮，才会去创建，登录框的dom节点，并且只是创建一次。

---
## 策略模式
- 定义：定义一系列的算法，把他们一个个封装起来，并且使他们可以互相替换
- 使用场景：表单校验(是否为空、长度、手机号、邮箱等等)
- 示例：

计算年终奖(工资、绩效)

比如公司的年终奖是根据员工的工资和绩效来考核的，绩效为A的人，年终奖为工资的4倍，
绩效为B的人，年终奖为工资的3倍，绩效为C的人，年终奖为工资的2倍；

```javascript
// 一组策略类封装具体的算法
const Bouns = {
  A(salary) {
    return salary * 4
  },
  B(salary) {
    return salary * 3
  },
  C(salary) {
    return salary * 2
  }
}
Object.freeze(Bouns)

/*
* 计算年终奖 环境类Context
* @param {String} A 效绩等级
* @param {Number} 10000 每月工资
* @returns {Number} 40000 年终奖
*/
const calculateBouns = function (type, salary) {
  return Bouns[type](salary)
}

// 测试年终奖计算方式
const demo1 = calculateBouns('A', 10000)
const demo2 = calculateBouns('B', 80000)
console.log(demo1, demo2) // 40000, 240000
```

PS：
策略模式指的是定义一系列的算法，把它们一个个封装起来，将不变的部分和变化的部分隔开，实际就是将算法的使用和实现分离出来；算法的使用方式是不变的，都是根据某个算法取得计算后的奖金数，而算法的实现是根据绩效对应不同的绩效规则；

一个基于策略模式的程序至少由2部分组成，第一个部分是一组策略类，策略类封装了具体的算法，并负责具体的计算过程。第二个部分是环境类Context，该Context接收客户端的请求，随后把请求委托给某一个策略类。

复合开放-封闭原则，可变的部分为策略类（一组算法），不变的部分为执行具体算法的方式。

---
## 代理模式
- 定义：为一个对象提供一个代用品或占位符，以便控制对他的访问。代理对象和本体对象实现了同样的接口，并且会把任何方法调用传递给本体对象。
- 使用场景：
  - 图片预加载、图片懒加载
  - 合并 HTTP 请求(代理收集一定时间内的所有 HTTP 请求，然后一次性发给服务器)
  - 惰性加载(通过代理处理和收集一些基本操作，然后仅在真正需要本体的时候才加载本体)
  - 缓存代理(缓存请求结果、计算结果)

1. **缓存代理**

```javascript
// 先实现具体的两个算法
const mult = function () {
  let a = 1
  for (let i = 0; i < arguments.length; i++) {
    a *= arguments[i]
  }
  return a
}
const plus = function () {
  let a = 0
  for (let i = 0; i < arguments.length; i++) {
    a += arguments[i]
  }
  return a
}

// 创建缓存代理
const createProcyFactory = function (fn) {
  let cache = {}  // 保存计算的结果
  // 使用闭包在内存中保留对 cache 的引用
  return function() {
    let args = Array.from(arguments).join(',')  // 将所有参数转化为字符串作为缓存的 key
    if (args in cache) {
      return cache[args]
    } else {
      return cache[args] = fn.apply(this.arguments)
    }
  }
}

// 使用代理对象
const proxyMult = createProxyFactory(mult)
const proxyPlus = createProxyFactory(plus)
console.log(proxyMult(1, 2, 3, 4))  // 24
console.log(proxyPlus(1, 2, 3, 4))  // 10
```

PS：这里每次进行同类的计算时（乘法和加法两类），先判断缓存对象cache中是否存在该参数连接成的字符串作为key的属性。

如果有，则直接从cache中读取，否则就进行计算并保存其结果。