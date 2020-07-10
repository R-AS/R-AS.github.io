---
title: 'javascript 继承方式'
date: '2020-07-10'
thumbnail: 'javascript/index.png'
type: 'javascript'
---
### Table of Contents
```toc
```
---
太久没有练习 javaScript，基础都忘光了，现在回顾 javaScript 的集中继承方式，主要有 原型链继承、构造函数继承、组合继承、原型式继承、寄生式继承 和 寄生组合继承。

## 原型链继承
```javascript
// 父类
function Person(name) {
  this.name = name
  this.setName = function() {
    console.log(this.name)
  }
}

Person.prototype.age = 10

// 原型链继承
function Per() {
  this.name = 'ker'
}

Per.prototype = new Person()

var per = new Per()

console.log(per)
console.log(per instanceof Person)
```
结果如下：

![pic_1](/blogs/javascript/js_7_pic_1.png#pic_center)

- 重点：将父类的实例赋值给新实例的原型
- 特点：实例可继承的属性有 实例的构造函数的属性、父类构造函数属性、父类原型的属性
- 缺点：
  1. 新实例无法向父类构造函数传参
  2. 继承单一
  3. 所有新实例都会共享父类实例的属性(原型上的属性是共享的，一个实例修改了原型属性，另一个实例的原型属性也会被修改)

---
## 构造函数继承
```javascript
function Con() {
  Person.call(this, 'jer')
  this.age = 12
}

var con = new Con()

console.log(con)
console.log(con instanceof Person)
```

结果如下：

![pic_2](/blogs/javascript/js_7_pic_2.png#pic_center)

- 重点：用 call() 和 apply() 将父类构造函数引入子类函数(在子类函数中做了父类的复制)
- 特点：
  1. 只继承了父类构造函数的属性，没有继承父类原型的属性
  2. 可以继承多个构造函数属性(call 多个)
  3. 在子实例中可向父实例传参
- 缺点：
  1. 只能继承父类构造函数的属性
  2. 无法实现构造函数的复用
  3. 每个新实例都有父类构造函数的副本

---
## 组合继承(组合原型链继承和构造函数继承)

```javascript
function SubType(name) {
  Person.call(this, name)
}

SubType.prototype = new Person()

var sub = new SubType('gar')

console.log(sub)
```

结果如下：
![pic_3](/blogs/javascript/js_7_pic_3.png#pic_center)

- 重点：结合了两种模式的有点，传参和复用
- 特点：
  1. 可以继承父类原型上的属性，可以传参，可复用
  2. 每个新实例引入的构造函数属性是私有的
- 缺点：
  调用了两次父类构造函数(耗内存)，子类的构造函数会替代原型上的那个父类构造函数

---
## 原型式继承
```javascript
function inherit(obj) {
  function F() {}
  F.prototype = obj
  return new F()
}

var sup = new inherit(new Person()) 
console.log(sup)
```

结果如下：

![pic_４](/blogs/javascript/js_7_pic_4.png#pic_center)

- 重点：用一个函数包装一个对象，然后返回这个函数的调用，这个函数就变成了个可以随意增添属性的实例或对象。object.create()就是这个原理
- 特点：类似于复制一个对象，用函数来包装
- 缺点：
  1. 所有实例都会继承原型上的属性
  2. 无法实现复用(新实例属性都是后面添加的)

---
## 寄生式继承

```javascript
function inherit(obj) {
  function F() {}
  F.prototype = obj
  return new F()
}

function subobject(obj) {
  var sub = inherit(obj)
  sub.name = 'gar'
  return sub
}

var sup = new subobject(new Person)

console.log(sup)
```

结果如下：

![pic_5](/blogs/javascript/js_7_pic_5.png#pic_center)

- 重点：就是给原型式继承外面套了个壳子
- 优点：没有创建自定义类型，因为只是套了个壳子返回对象(这个)，这个函数顺理成章就成了创建的新对象
- 缺点：没用到原型，无法复用

---
## 寄生组合式继承

```javascript
function inherit(obj) {
  function F() {}
  F.prototype = obj
  return new F()
}

var con = inherit(Person.prototype)

function Sub() {
  Person.call(this)
}

Sub.prototype = con
con.constructor = Sub

var sub1 = new Sub()

console.log(sub1)
```

结果如下：

![pic_6](/blogs/javascript/js_7_pic_6.png#pic_center)

- 重点：修复了组合继承的问题