---
title: 'JS 继承方式'
date: '2022-11-17'
thumbnail: 'javascript/index.png'
type: 'interview-javascript'
---
```toc
```
---
#### 原型链继承
1. 示例：

```js
// child1.__prototype -> Child.prototype -> parent -> parent.__proto__ -> Parent.prototype
function Parent() {
  this.name = 'kevin'
}

Parent.prototype.getName = function() {
  console.log(this.name)
}

function Child() {}

Child.prototype = new Parent()

const child1 = new Child()

console.log(child1.getName()) // kevin
```

2. 缺点：
    - 引用类型的属性被所有实例共享：

    ```js
      function Parent () {
        this.names = ['kevin', 'daisy']
      }

      function Child () {}

      Child.prototype = new Parent()

      var child1 = new Child()

      child1.names.push('yayu')

      console.log(child1.names) // ["kevin", "daisy", "yayu"]

      var child2 = new Child()

      console.log(child2.names) // ["kevin", "daisy", "yayu"]
    ```
    - 在创建 Child 实例时，不能向 Parent 传参

---

#### 构造函数继承

1. 示例：

```js
function Parent() {
  this.names = ['kevin', 'daisy']
}

function Child() {
  Parent.call(this)
}

const child1 = new Child()
child1.names.push('yayu')
console.log(child1.names) // ["kevin", "daisy", "yayu"]

const child2 = new Child()
console.log(child2.names) // ["kevin", "daisy"]
```

2. 优点：
    - 避免了引用类型的属性被所有实例共享
    - 可以在 Child 中向 Parent 传参：
    
    ```js
      function Parent (name) {
        this.name = name
      }

      function Child (name) {
          Parent.call(this, name)
      }

      var child1 = new Child('kevin')

      console.log(child1.name) // kevin

      var child2 = new Child('daisy')

      console.log(child2.name) // daisy
    ```

3. 缺点：方法都在构造函数中定义，每次创建实例都会创建一遍方法

---

#### 组合继承（原型链继承 + 构造函数继承）

1. 示例：

```js
function Parent(name) {
  this.name = name
  this.colors = ['red', 'blue', 'green']
}

Parent.prototype.getName = function() {
  console.log(this.name)
}

function Child(name, age) {
  Parent.call(this, name)
  this.age = age
}

Child.prototype = new Parent()
Child.prototype.constructor = Child

const child1 = new Child('kevin', '18')
child1.colors.push('black')

console.log(child1.name) // kevin
console.log(child1.age) // 18
console.log(child1.colors) // ["red", "blue", "green", "black"]

const child2 = new Child('daisy', '20')

console.log(child2.name) // daisy
console.log(child2.age) // 20
console.log(child2.colors) // ["red", "blue", "green"]
```

2. 优点：融合原型链继承和构造函数的优点，是 JavaScript 中最常用的继承模式。

---

#### 原型式继承

1. 示例

```js
function createObj(o) {
  function F(){}
  F.prototype = o
  return new F()
}

const person = {
  name: 'kevin',
  friends: ['daisy', 'kelly'],
}
const person1 = createObj(person)
const person2 = createObj(person)

person1.name = 'person1'
console.log(person2.name) // kevin

person1.friends.push('taylor')
console.log(person2.friends) // ['daisy', 'kelly', 'taylor']
```

2. 缺点：包含引用类型的属性值始终都会共享相应的值，这点跟原型链继承一样。

3. tips: 
> 修改 person1.name 的值，person2.name 的值并未发生改变。是因为 person1.name = 'person1' 给 person1 添加了 name 值，并非修改了原型上的 name 值。person2.name 实际上访问的是原型上的 name。

---

#### 寄生式继承

创建一个仅用于封装继承过程的函数，该函数在内部以某种形式来做增强对象，最后返回对象。

1. 示例：

```js
function createObj(o) {
  const clone = Object.create(o)
  clone.sayName = function() {
    console.log('hi')
  }
  return clone
}
```

2. 缺点：跟借用构造函数模式一样，每次创建对象都会创建一遍方法。

#### 寄生组合式继承

1. 示例

```js
function object(o) {
  function F() {}
  F.prototype = o
  return new F()
}

function prototype(child, parent) {
  const prototype = object(parent.prototype)
  prototype.constructor = child
  child.prototype = prototype
}

prototype(Child, Parent)
```

2. 优点：
    - 只调用一次 Parent 构造函数，避免在 Parent.prototype 上面创建不必要的、多余的属性
    - 原型链保持不变
    - 能够正常使用 instanceof 和 isPrototypeof

---

**摘抄自**
- [JavaScript深入之继承的多种方式和优缺点](https://github.com/mqyqingfeng/Blog/issues/16)