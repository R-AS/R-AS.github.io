---
title: '设计模式的六大原则'
date: '2020-07-17'
thumbnail: 'javascript/index.png'
type: 'javascript'
---
### Table of Contents
```toc
```
---
## 前言
设计模式是一套经过前人总结、业务验证并适合于特定业务开发的代码组织方式，对我们的业务开发起到一定的指导作用。其实我们日常开发中或多或少都使用过设计模式，只是我们没注意到而已。(比如绑定事件和触发事件这就是一个简单的发布 - 订阅模式)。

为了更好的理解设计模式，首先需要了解设计模式的六大原则：单一职责模式、开放封闭原则、里氏替换原则、依赖倒置原则、接口隔离原则、迪米特法则。

---
## 单一职责原则

- 定义：不要存在多于一个导致类变更的原因。即一个类只负责一项职责。
- 问题由来：类 T 负责两个不同的职责：职责 P1，职责 P2。当由于职责 P1 需求发生改变而需要修改类 T 时，有可能会导致原本运行正常的职责 P2 功能发生故障。
- 解决方案： 遵循单一职责原则。分别建立两个类 T1、T2，使 T1 完成职责 P1 功能，T2 完成职责 P2 功能。这样，当修改类 T1(T2) 时就不会使职责 P2(P1) 发生故障风险。
- 示例：

用一个描述动物呼吸的场景：

```javascript
function Animal() {
  this.breathe = function (animal) {
    console.log(`${animal} 呼吸空气`)
  }
}

function Client() {
  const animal = new Animal()
  animal.breathe('牛')
  animal.breathe('羊')
  animal.breathe('猪')
}
```

运行结果：

```text
牛 呼吸空气
羊 呼吸空气
猪 呼吸空气
```
程序上线后，发现问题了，并不是所有的动物都呼吸空气的，比如鱼就是呼吸水的。修改时如果遵循单一职责原则，需要将 Animal 类细分为陆生动物类 Terrestrial，水生动物 Aquatic，代码如下：

```javascript
function Terrestrial() {
  this.breathe = function (animal) {
    console.log(`${animal} 呼吸空气`)
  }
}

function Aquatic() {
  this.breathe = function (animal) {
    console.log(`${animal} 呼吸水`)
  }
}

function Client() {
  const terrestrial = new Terrestrial()
  terrestrial.breathe('牛')
  terrestrial.breathe('羊')
  terrestrial.breathe('猪')

  const aquatic = new Aquatic()
  aquatic.breathe('鱼')
}
```

运行结果：
```text
牛 呼吸空气
羊 呼吸空气
猪 呼吸空气
鱼 呼吸水
```

我们会发现如果这样修改花销是很大的，除了将原来的类分解之外，还需要修改客户端。而直接修改类Animal来达成目的虽然违背了单一职责原则，但花销却小的多，代码如下：

```javascript
function Animal() {
  this.breathe = function (animal) {
    if ('鱼'.equals(animal)) {
      console.log(`${animal} 呼吸水`)
    } else {
      console.log(`${animal} 呼吸空气`)
    }
  }
}

function Client() {
  const animal = new Animal()
  animal.breathe('牛')
  animal.breathe('羊')
  animal.breathe('猪')
  animal.breathe('鱼')
}
```
可以看到，这种修改方式要简单的多。但是却存在着隐患：有一天需要将鱼分为呼吸淡水的鱼和呼吸海水的鱼，则又需要修改Animal类的breathe方法，而对原有代码的修改会对调用“猪”“牛”“羊”等相关功能带来风险，也许某一天你会发现程序运行的结果变为“牛呼吸水”了。这种修改方式直接在代码级别上违背了单一职责原则，虽然修改起来最简单，但隐患却是最大的。还有一种修改方式：
```javascript
function Animal() {
  this.breathe = function (animal) {
    console.log(`${animal} 呼吸空气`)
  }

  this.breathe2 = function (animal) {
    console.log(`${animal} 呼吸水`)
  }
}

function Client() {
  const animal = new Animal()
  animal.breathe('牛')
  animal.breathe('羊')
  animal.breathe('猪')
  animal.breathe2('鱼')
}
```
可以看到，这种修改方式没有改动原来的方法，而是在类中新加了一个方法，这样虽然也违背了单一职责原则，但在方法级别上却是符合单一职责原则的，因为它并没有动原来方法的代码。这三种方式各有优缺点，那么在实际编程中，采用哪一中呢？其实这真的比较难说，需要根据实际情况来确定。我的原则是：只有逻辑足够简单，才可以在代码级别上违反单一职责原则；只有类中方法数量足够少，才可以在方法级别上违反单一职责原则。

**遵循单一职责原的优点有：**

- **可以降低类的复杂度，一个类只负责一项职责，其逻辑肯定要比负责多项职责简单的多**
- **提高类的可读性，提高系统的可维护性**
- **变更引起的风险降低，变更是必然的，如果单一职责原则遵守的好，当修改一个功能时，可以显著降低对其他功能的影响**

---
## 里氏替换原则
- 定义：如果对每一个类型为 T1的对象 o1，都有类型为 T2 的对象o2，使得以 T1定义的所有程序 P 在所有的对象 o1 都代换成 o2 时，程序 P 的行为没有发生变化，那么类型 T2 是类型 T1 的子类型。
- 问题由来：有一功能P1，由类A完成。现需要将功能P1进行扩展，扩展后的功能为P，其中P由原有功能P1与新功能P2组成。新功能P由类A的子类B来完成，则子类B在完成新功能P2的同时，有可能会导致原有功能P1发生故障。
- 解决方案：当使用继承时，遵循里氏替换原则。类B继承类A时，除添加新的方法完成新增功能P2外，尽量不要重写父类A的方法，也尽量不要重载父类A的方法。
- 示例：

举例说明继承的风险，我们需要完成一个两数相减的功能，由类A来负责：

```javascript
function A() {
  this.func1 = function (a, b) {
    return a - b
  }
}

function Client() {
  const a = new A()
  console.log('100 - 50 = ', a.func1(100, 50))
  console.log('100 - 80 = ', a.func1(100, 80))
}
```

运行结果：
```text
100 - 50 =  50
100 - 80 =  20
```
后来，我们需要增加一个新的功能：完成两数相加，然后再与100求和，由类B来负责。即类B需要完成两个功能：
- 两数相减
- 两数相加，然后再加 100
由于类A已经实现了第一个功能，所以类B继承类A后，只需要再完成第二个功能就可以了，代码如下：

```javascript
function A() {
  this.func1 = function (a, b) {
    return a - b
  }
}

function B() {
  this.func1 = function (a, b) {
    return a + b
  }
  this.func2 = function (a, b) {
    return func1(a, b) + 100
  }
}

B.prototype = new A()

function Client() {
  const b = new B()
  console.log('100 - 50 = ', b.func1(100, 50))
  console.log('100 - 80 = ', b.func1(100, 80))
  console.log('100 + 20 + 100 = ', b.func1(100, 20))
}
```

运行结果：
```text
100 - 50 =  150
100 - 80 =  180
100 + 20 + 100 =  120
```

我们发现原本运行正常的相减功能发生了错误。原因就是类B在给方法起名时无意中重写了父类的方法，造成所有运行相减功能的代码全部调用了类B重写后的方法，造成原本运行正常的功能出现了错误。在本例中，引用基类A完成的功能，换成子类B之后，发生了异常。在实际编程中，我们常常会通过重写父类的方法来完成新的功能，这样写起来虽然简单，但是整个继承体系的可复用性会比较差，特别是运用多态比较频繁时，程序运行出错的几率非常大。如果非要重写父类的方法，比较通用的做法是：原来的父类和子类都继承一个更通俗的基类，原有的继承关系去掉，采用依赖、聚合，组合等关系代替。

**里氏替换原则通俗的来讲就是：子类可以扩展父类的功能，但不能改变父类原有的功能。它包含以下4层含义：**

- **子类可以实现父类的抽象方法，但不能覆盖父类的非抽象方法**
- **子类中可以增加自己特有的方法**
- **当子类的方法重载父类的方法时，方法的前置条件(即方法的形参)要比父类方法的输入参数更宽松**
- **当子类的方法实现父类的抽象方法时，方法的后置条件(即方法的返回值)要比父类更严格**