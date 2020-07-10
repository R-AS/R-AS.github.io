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