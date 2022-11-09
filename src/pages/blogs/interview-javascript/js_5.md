---
title: 'call、apply、bind'
date: '2022-11-06'
thumbnail: 'javascript/index.png'
type: 'interview-javascript'
---

#### call

1. 作用：call() 方法在使用一个指定的 this 值和若干个指定的参数值的前提下调用某个函数或方法。
2. 示例：

```js
var foo = {
  value: 1,
}

function bar() {
  console.log(this.value)
}

bar.call(foo) // 1
```

3. 代码转换：
    - call 改变了 this 的指向，指向到 foo
    - bar 函数执行了

```js
// 以上代码等同于
var foo = {
  value: 1,
  bar: function() {
    console.log(this.value)
  }
}
foo.bar() // 1
```

4. 功能分析：
    - 有若干个参数，参数1 为指定的 this 值
    - 将 this 指向参数1
    - this 参数可以传 null，当为 null 的时候，视为指向 window
    - 函数可以有返回值
 
5. 模拟实现：

```js
/**
* 1. 改变 this 指向
* 2. 给定参数执行函数
* 3. this 为 null时 指向 window
* 4. 函数返回值
**/

Function.prototype.call2 = function(context) {
  var context = context || window
  context.fn = this

  var args = []
  for (var i = 1, len = arguments.length; i < len; i++) {
    args.push('arguments[' + i + ']')
  }

  var result = eval('context.fn(' + args + ')')

  delete context.fn
  return result
}

// 测试一下
var value = 2;

var obj = {
    value: 1
}

function bar(name, age) {
    console.log(this.value);
    return {
        value: this.value,
        name: name,
        age: age
    }
}

bar.call2(null); // 2

console.log(bar.call2(obj, 'kevin', 18));
// 1
// Object {
//    value: 1,
//    name: 'kevin',
//    age: 18
// }
```

---

#### apply

1. 作用：apply() 方法调用一个具有给定 this 值的函数，以及以一个数组（或一个类对象）的形式提供的参数。
2. 示例：

```js
const numbers = [5, 6, 2, 3, 7]
const max = Math.max.apply(null, numbers)

console.log(max) // 7
```
3. 模拟实现

```js
Function.prototype.apply = function(context, arr) {
  const context = Object(context) || window
  context.fn = this

  let result
  if (!arr) {
    result = context.fn()
  } else {
    var args = []
    for (let i = 0, len = arr.length; i < len; i++) {
      arr.push('arr[' + i + ']')
    }
    result = eval('context.fn(' + args + ')')
  }

  delete context.fn
  return result
}
```

---

#### bind
1. 作用：bind() 方法会创建一个新函数。当这个新函数被调用时，bind() 的第一个参数将作为它运行时的 this，之后的一序列参数将会在传递的实参前传入作为它的参数。

2. 示例：

```js
var value = 2

var foo = {
  value: 1
}

function bar(name, age) {
  this.habit = 'shopping'
  console.log(this.value)
  console.log(name)
  console.log(age)
}

bar.prototype.friend = 'kevin'

var bindFoo = bar.bind(foo, 'daisy')

var obj = new bindFoo('18')
// undefined
// daisy
// 18
console.log(obj.habit) // shopping
console.log(obj.friend) // kevin
```

3. 功能分析：
    - 返回一个函数
    - 可以传入参数
    - 执行返回的函数的时候，可以在传入另外的参数
    - 当 bind 返回的函数作为构造函数的时候，bind 时指定的 this 值会失效，但传入的参数依然生效

4. 模拟实现：

```js
Function.prototype.bind2 = function(context) {
  const self = this
  // 截取 bind2函数 第二个到最后一个参数
  const args = Array.prototype.slice.call(arguments, 1)

  const fNOP = function() {}

  const fBound = function() {
    const bindArgs = Array.prototype.slice.call(arguments)
    // 当作为构造函数时，this 指向实例，此时结果为 true，将绑定函数的 this 指向该实例，可以让实例获得来自绑定函数的值
    // 
    return self.apply(this instanceof fBound ? this : context, args.concat(bindArgs))
  }

  fNOP.prototype = this.prototype
  fBound.prototype = new fNOP()
  return fBound
}
```

---

**摘抄自**
- [JavaScript深入之从原型到原型链](https://github.com/mqyqingfeng/Blog/issues/2)
