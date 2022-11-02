---
title: 'JS 原型链'
date: '2022-11-03'
thumbnail: 'javascript/index.png'
type: 'interview-javascript'
---

#### prototype

```js
function Person() {

}
Person.prototype.name = 'Kevin'
const person1 = new Person()
const person2 = new Person()
console.log(person1.name) // Kevin
console.log(person2.name) // Kevin
```

每个函数都有一个 prototype 属性，prototype 指向一个对象，这个对象正是调用该构造函数而创建的实例的原型，也就是这个例子中的 person1 和 person2 的原型。

以下表示构造函数与实例原型之间的关系：
```txt
Person ----prototype--->Person.prototype
(构造函数)                (实例原型)
```

---

#### __proto__

每个 js 对象(除了 null)都具有一个属性，就是 __proto__，这个属性会指向该对象的原型。
```
function Person() {

}
const person = new Person()
console.log(person.__proto__ === Person.prototype) // true
```

以下表示实例与实例原型的关系：
```txt
Person ----prototype--->Person.prototype
(构造函数)                (实例原型)
  |                         ⬆
  |                         |
  |                         |
person ---- __proto__ -------
```
---

#### constructor

每个原型都有一个 constructor 属性指向关联的构造函数。
```js
function Person() {

}

var person = new Person()

console.log(person.__proto__ == Person.prototype) // true
console.log(Person.prototype.constructor == Person) // true
// 顺便学习一个ES5的方法,可以获得对象的原型
console.log(Object.getPrototypeOf(person) === Person.prototype) // true
```

更新关系图：
```txt
Person ----prototype--->Person.prototype
(构造函数)<--constructor---(实例原型)
  |                         ⬆
  |                         |
  |                         |
person ---- __proto__ -------
```
---

#### 原型链

当读取实例的属性时，如果找不到，就会查找与对象关联的原型中的属性，如果还找不到，就去找原型的原型，一直找到最顶层为止。这样形成的链条就是原型链。

```txt
Person ----prototype--->Person.prototype
(构造函数)<--constructor---(实例原型)
  |                         ⬆  ｜
  |                         |   ｜
  |                         |   ｜
person ---- __proto__ -------   ｜
                                ｜ __proto__ 
                                ｜
                                ⬇
Object() ----prototype--->Object.prototype
(构造函数)<--constructor---(实例原型)
                                ｜
                                ｜ __proto__ 
                                ⬇
                                null
```

---
**摘抄自**
- [JavaScript深入之从原型到原型链
](https://github.com/mqyqingfeng/Blog/issues/2)