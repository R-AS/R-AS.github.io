---
title: '设计模式 —— 工厂模式'
date: '2020-07-10'
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

1. 引入代理实现单例模式
