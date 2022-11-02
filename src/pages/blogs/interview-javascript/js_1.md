---
title: 'JS 数据类型'
date: '2022-11-02'
thumbnail: 'javascript/index.png'
type: 'interview-javascript'
---

JS 数据类型分为 基本类型（值类型）和 引用类型（复杂数据类型）

---
#### 基本类型（值类型）

基本类型在内存中占据固定大小，保存在栈内存中

- Number
- String
- Boolean
- Symbol
- null
- undefined

---

#### 引用类型（复杂数据类型）

引用类型指的是 Object 类型，所有其他的如 Array、Date 等数据类型都可以理解为 Object 类型的子类型。

引用类型的值保存在堆内存中。

- Object
- Function
- Array
- Date
- RegExp
- ...

---

#### 二者的区别

- 基本数据类型的值直接保存在栈中
- 复杂数据类型的值保存在堆中，通过使用在栈中保存对应的指针来获取堆中的值

---

#### 如何获取数据类型

1. **typeof**

优点：能够快速区分基本数据类型

缺点：不能将 Object、Array 和 Null 区分，都返回 object

```js
console.log(typeof 1);               // number
console.log(typeof true);            // boolean
console.log(typeof 'mc');            // string
console.log(typeof Symbol)           // function
console.log(typeof function(){});    // function
console.log(typeof console.log());   // undefined
console.log(typeof []);              // object 
console.log(typeof {});              // object
console.log(typeof null);            // object
console.log(typeof undefined);       // undefined
```

2. **instanceof**

优点：能够区分 Array、Object 和 Function，适合用于判断自定义的类实例对象

缺点：Number、Boolean、String 基本数据类型不能判断

```js
console.log(1 instanceof Number);                    // false
console.log(true instanceof Boolean);                // false 
console.log('str' instanceof String);                // false  
console.log([] instanceof Array);                    // true
console.log(function(){} instanceof Function);       // true
console.log({} instanceof Object);                   // true
```

3. **Object.prototype.toString.call()**

优点：精准判断数据类型

```js
var toString = Object.prototype.toString;
console.log(toString.call(1));                      //[object Number]
console.log(toString.call(true));                   //[object Boolean]
console.log(toString.call('mc'));                   //[object String]
console.log(toString.call([]));                     //[object Array]
console.log(toString.call({}));                     //[object Object]
console.log(toString.call(function(){}));           //[object Function]
console.log(toString.call(undefined));              //[object Undefined]
console.log(toString.call(null));                   //[object Null]
```
