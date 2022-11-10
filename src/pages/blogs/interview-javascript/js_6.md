---
title: 'new 模拟实现'
date: '2022-11-10'
thumbnail: 'javascript/index.png'
type: 'interview-javascript'
---

1. new：new 运算符创建一个用户自定义的对象类型的实例或具有构造函数的内置对象类型之一

2. 示例：

```js
// Otaku 御宅族，简称宅
function Otaku (name, age) {
  this.name = name;
  this.age = age;

  this.habit = 'Games';
}

// 因为缺乏锻炼的缘故，身体强度让人担忧
Otaku.prototype.strength = 60;

Otaku.prototype.sayYourName = function () {
  console.log('I am ' + this.name);
}

var person = new Otaku('Kevin', '18');

console.log(person.name) // Kevin
console.log(person.habit) // Games
console.log(person.strength) // 60

person.sayYourName(); // I am Kevin
```

**构造函数有返回值 对象**

```js
function Otaku (name, age) {
  this.strength = 60
  this.age = age

  return {
    name: name,
    habit: 'Games'
  }
}

var person = new Otaku('Kevin', '18');

console.log(person.name) // Kevin
console.log(person.habit) // Games
console.log(person.strength) // undefined
console.log(person.age) // undefined
```

**构造函数返回值为 基本类型**

```js
function Otaku (name, age) {
  this.strength = 60
  this.age = age

  return 'handsome boy'
}

var person = new Otaku('Kevin', '18')

console.log(person.name) // undefined
console.log(person.habit) // undefined
console.log(person.strength) // 60
console.log(person.age) // 18
```

3. 功能分析：
    - 实例 person 能访问到 构造函数Otaku 里的属性
    - 实例 person 能访问到 Otaku.prototype 中的属性
    - 如果构造函数返回的值为对象，则返回这个对象，否则该返回什么就返回什么

4. 模拟实现：

```js
function objectFactory() {
  // 创建一个新对象 obj
  const obj = new Object()
  // 取出第一个参数(参数1 为构造函数)，因为 shift 会改变原数组，所以使用 call 创建一个新数组
  const Constructor = [].shift.call(arguments)
  // 将 obj 的原型指向构造函数，让 obj 可以访问到构造函数原型中的属性
  obj.__proto__ = Constructor.prototype
  // 改变构造函数 this 的指向到新建的对象，让 obj 可以访问到构造函数中的属性
  const ret = Constructor.apply(obj, arguments)
  // 如果构造函数返回的值为对象，则返回这个对象，否则该返回什么就返回什么
  return typeof ret === 'object' ? ret : obj
}

// 应用
const person = objectFactory(Otaku, 'Kevin', '18')
```

---

**摘抄自**
- [JavaScript深入之new的模拟实现](https://github.com/mqyqingfeng/Blog/issues/13)
