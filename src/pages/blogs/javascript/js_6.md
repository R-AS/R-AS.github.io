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

---
## 依赖倒置原则
- 定义：高层模块不应该依赖低层模块，二者都应该依赖其抽象。抽象不应该依赖细节。细节应该依赖抽象。
- 问题由来：类 A 直接依赖类 B, 假如要将类 A 改为依赖类 C，则必须通过修改类 A 的代码来达成。这种场景下，类 A 一般是高层模块，负责复杂的业务逻辑。类 B 和类 C 是低层模块，负责基本的原子操作。假如修改类 A，会给程序带来不必要的风险。
- 解决方案：将类 A 修改为依赖接口 I，类 B 和类 C 各自实现接口 I，类 A 通过接口 I 间接与类 B 或者类 C 发生联系，则会大大降低修改类 A 的几率。
- 示例：

场景： 母亲给孩子讲故事，只要给她一本书，她就可以照着书给孩子讲故事了。代码如下：
```typescript
class Book {
  getContent() {
    return '很久很久以前有一个阿拉伯的故事......'
  }
}

class Mother {
  narrate(book: Book) {
    console.log('妈妈开始讲故事')
    console.log(book.getContent())
  }
}

class Client {
  constructor() {
    const mother = new Mother()
    mother.narrate(new Book())
  }
}
```

运行结果：

```text
妈妈开始讲故事
很久很久以前有一个阿拉伯的故事......
```

运行良好，假如有一天，需求变成这样：不是给书而是给一份报纸，让这位母亲讲一下报纸上的故事，报纸的代码如下：

```typescript
class Book {
  private readonly brand = 'Book'
  getContent() {
    return '很久很久以前有一个阿拉伯的故事......'
  }
}

class Newspaper {
  private readonly brand = 'Newspaper'
  getContent() {
    return '林书豪38+7领导尼克斯击败湖人……'
  }
}

class Mother {
  narrate(book: Book) {
    console.log('妈妈开始讲故事')
    console.log(book.getContent())
  }
}

class Client {
  constructor() {
    const mother = new Mother()
    mother.narrate(new Book())
    mother.narrate(new Newspaper()) // Argument of type 'Newspaper' is not assignable to parameter of type 'Book'.Types have separate declarations of a private property 'brand'.ts(2345)
  }
}
```

**(这里为什么要给 Book 和 Newspaper 加上私有属性呢，因为 typescript 的类型系统是结构类型的，java 的类型是名义上的，所以如果类型的成员都是一样的，很多时候 typescript 都不会报错)。在这加上私有属性，因为私有属性的限制，A 实例不能赋值给 B，反之亦然**

这位母亲却办不到，因为她居然不会读报纸上的故事，这太荒唐了，只是将书换成报纸，居然必须要修改Mother才能读。假如以后需求换成杂志呢？换成网页呢？还要不断地修改Mother，这显然不是好的设计。原因就是Mother与Book之间的耦合性太高了，必须降低他们之间的耦合度才行。

我们引入一个抽象的接口IReader。读物，只要是带字的都属于读物

Mother类与接口IReader发生依赖关系，而Book和Newspaper都属于读物的范畴，他们各自都去实现IReader接口，这样就符合依赖倒置原则了，代码修改为：

```typescript
interface IReader {
  getContent(): string
}

class Newspaper implements IReader {
  private readonly brand = 'Newspaper'
  getContent() {
    return '林书豪38+7领导尼克斯击败湖人……'
  }
}

class Book implements IReader {
  private readonly brand = 'Book'
  getContent() {
    return '很久很久以前有一个阿拉伯的故事......'
  }
}

class Mother {
  narrate(reader: IReader) {
    console.log('妈妈开始讲故事')
    console.log(reader.getContent())
  }
}

class Client {
  constructor() {
    const mother = new Mother()
    mother.narrate(new Book())
    mother.narrate(new Newspaper())
  }
}
```

运行结果：

```text
妈妈开始讲故事
很久很久以前有一个阿拉伯的故事......
妈妈开始讲故事
林书豪38+7领导尼克斯击败湖人……
```

这样修改后，无论以后怎样扩展Client类，都不需要再修改Mother类了。这只是一个简单的例子，实际情况中，代表高层模块的Mother类将负责完成主要的业务逻辑，一旦需要对它进行修改，引入错误的风险极大。所以遵循依赖倒置原则可以降低类之间的耦合性，提高系统的稳定性，降低修改程序造成的风险。

在实际编程中，我们一般需要做到如下3点：

- 低层模块尽量都要有抽象类或接口，或者两者都有。
- 变量的声明类型尽量是抽象类或接口。
- 使用继承时遵循里氏替换原则。

依赖倒置原则的核心就是要我们面向接口编程，理解了面向接口编程，也就理解了依赖倒置。

---
## 接口隔离原则
- 定义：客户端不应该依赖它不需要的接口，一个类对另一个类的依赖应该建立在最小的接口上。
- 问题由来：类 A 通过接口 I 依赖类 B，类 C 用过接口 I 依赖类 D，如果接口 I 对类 A 和 类 B 来说不是最小接口，则类 B 和类 D 必须去实现他们不需要的方法。
- 解决方案：将臃肿的接口 I 拆分为独立的几个接口，类 A 和类 C 分别与他们需要的接口建立依赖关系。也就是采用接口隔离原则。
- 示例：

如图所示：

![pic_1](/blogs/javascript/js_6_pic_1.png#pic_center)

**(该图未遵循接口隔离原则)**

读图可知，类 A 依赖接口 I 中的方法1、2、3，类 B 是对类 A 依赖的实现。类 C 依赖接口 I 中的方法1、4、5，类 D 是对类 C 依赖的实现。对于类 B 和类 D 来说，虽然他们都存在着用不到的方法(图中红色字体标记的方法)，但由于实现了接口 I，所以也必须要实现这些用不到的方法。如以下代码所示：

```typescript
interface I {
    method1: () => void
    method2: () => void
    method3: () => void
    method4: () => void
    method5: () => void
}

class A {
    public depend1(i: I) {
        i.method1()
    }
    public depend2(i: I) {
        i.method2()
    }
    public depend3(i: I) {
        i.method3()
    }
}

class B implements I {
    public method1() {
        console.log('类B实现接口I的方法1')
    }
    public method2() {
        console.log('类B实现接口I的方法2')
    }
    public method3() {
        console.log('类B实现接口I的方法3')
    }
    public method4() {}
    public method5() {}
}

class C {
    public depend1(i: I) {
        i.method1()
    }
    public depend2(i: I) {
        i.method4()
    }
    public depend3(i: I) {
        i.method5()
    }
}

class D implements I {
    public method1() {
        console.log('类D实现接口I的方法1')
    }
    public method2() {}
    public method3() {}
    public method4() {
        console.log('类D实现接口I的方法4')
    }
    public method5() {
        console.log('类D实现接口I的方法5')
    }
}

class Client {
    constructor() {
        const a = new A()
        a.depend1(new B())
        a.depend2(new B())
        a.depend3(new B())

        const c = new C()
        c.depend1(new D())
        c.depend2(new D())
        c.depend3(new D())
    }
}

new Client()
```

运行结果：

```text
类B实现接口I的方法1
类B实现接口I的方法2
类B实现接口I的方法3
类D实现接口I的方法1
类D实现接口I的方法4
类D实现接口I的方法5
```

可以看到，如果接口过于臃肿，只要接口中出现的方法，不管对依赖于它的类有没有用处，实现类中都必须去实现这些方法，这显然不是好的设计。可以利用接口隔离原则，拆分成如下图的结构：

![pic_2](/blogs/javascript/js_6_pic_2.png#pic_center)

**(该图遵循接口隔离原则)**

代码改成以下所示：

```typescript
interface I1 {
    method1: () => void
}

interface I2 {
    method2: () => void
    method3: () => void
}

interface I3 {
    method4: () => void
    method5: () => void
}

class A {
    public depend1(i: I1) {
        i.method1()
    }
    public depend2(i: I2) {
        i.method2()
    }
    public depend3(i: I2) {
        i.method3()
    }
}

class B implements I1, I2 {
    public method1() {
        console.log('类B实现接口I1的方法1')
    }
    public method2() {
        console.log('类B实现接口I2的方法2')
    }
    public method3() {
        console.log('类B实现接口I2的方法3')
    }
}

class C {
    public depend1(i: I1) {
        i.method1()
    }
    public depend2(i: I3) {
        i.method4()
    }
    public depend3(i: I3) {
        i.method5()
    }
}

class D implements I1, I3 {
    public method1() {
        console.log('类D实现接口I1的方法1')
    }
    public method4() {
        console.log('类D实现接口I3的方法4')
    }
    public method5() {
        console.log('类D实现接口I3的方法5')
    }
}
```

运行结果：

```text
类B实现接口I1的方法1
类B实现接口I2的方法2
类B实现接口I2的方法3
类D实现接口I1的方法1
类D实现接口I3的方法4
类D实现接口I3的方法5
```

接口隔离原则的含义是：建立单一接口，不要建立庞大臃肿的接口，尽量细化接口，接口中的方法尽量少。也就是说，我们要为各个类建立专用的接口，而不要试图去建立一个很庞大的接口供所有依赖它的类去调用。

说到这里，很多人会觉的接口隔离原则跟之前的单一职责原则很相似，其实不然。其一，单一职责原则原注重的是职责；而接口隔离原则注重对接口依赖的隔离。其二，单一职责原则主要是约束类，其次才是接口和方法，它针对的是程序中的实现和细节；而接口隔离原则主要约束接口接口，主要针对抽象，针对程序整体框架的构建。

**采用接口隔离原则对接口进行约束时，要注意以下几点：**

- **接口尽量小，但是要有限度。对接口进行细化可以提高程序设计灵活性是不挣的事实，但是 如果过小，则会造成接口数量过多，使设计复杂化。所以一定要适度。**
- **为依赖接口的类定制服务，只暴露给调用的类它需要的方法，它不需要的方法则隐藏起来。- 只有专注地为一个模块提供定制服务，才能建立最小的依赖关系。**
- **提高内聚，减少对外交互。使接口用最少的方法去完成最多的事情。**

---
## 迪米特法则

```typescript
// 总公司员工
class Employee {
    private id: string = ''
    public setId(id: string): void {
        this.id = id
    }
    public getId(): string {
        return this.id
    }
}

// 分公司员工
class SubEmployee {
    private id: string = ''
    public setId(id: string): void {
        this.id = id
    }
    public getId(): string {
        return this.id
    }
}

class SubCompanyManager {
    public getAllEmployee(): Array<SubEmployee> {
        const list: Array<SubEmployee> = new Array()
        for (let i = 0; i < 100; i++) {
            const emp = new SubEmployee()
            // 为分公司人员按顺序分配一个 ID
            emp.setId('分公司' + i)
            list.push(emp)
        }
        return list
    }
}

class ComponyManager {
    public getAllEmployee(): Array<Employee> {
        const list: Array<Employee> = new Array()
        for (let i = 0; i < 30; i++) {
            const emp = new Employee()
            // 为总公司人员按顺序分配一个 ID
            emp.setId('总公司' + i)
            list.push(emp)
        }
        return list
    }

    public printAllEmployee(sub: SubCompanyManager): void {
        const list1: Array<SubEmployee> = sub.getAllEmployee()
        list1.map(item => {
            console.log(item.getId())
        })

        const list2: Array<Employee> = this.getAllEmployee()
        list2.map(item => {
            console.log(item.getId())
        })
    }
}

class Client {
    constructor() {
        const e = new ComponyManager()
        e.printAllEmployee(new SubCompanyManager())
    }
}

new Client()
```

```typescript
// 总公司员工
class Employee {
    private id: string = ''
    public setId(id: string): void {
        this.id = id
    }
    public getId(): string {
        return this.id
    }
}

// 分公司员工
class SubEmployee {
    private id: string = ''
    public setId(id: string): void {
        this.id = id
    }
    public getId(): string {
        return this.id
    }
}

class SubCompanyManager {
    public getAllEmployee(): Array<SubEmployee> {
        const list: Array<SubEmployee> = new Array()
        for (let i = 0; i < 100; i++) {
            const emp = new SubEmployee()
            // 为分公司人员按顺序分配一个 ID
            emp.setId('分公司' + i)
            list.push(emp)
        }
        return list
    }
    public printEmployee(): void {
        const list: Array<SubEmployee> = this.getAllEmployee()
        list.map(item => {
            console.log(item.getId())
        })
    }
}

class ComponyManager {
    public getAllEmployee(): Array<Employee> {
        const list: Array<Employee> = new Array()
        for (let i = 0; i < 30; i++) {
            const emp = new Employee()
            // 为总公司人员按顺序分配一个 ID
            emp.setId('总公司' + i)
            list.push(emp)
        }
        return list
    }

    public printAllEmployee(sub: SubCompanyManager): void {
        sub.printEmployee()

        const list2: Array<Employee> = this.getAllEmployee()
        list2.map(item => {
            console.log(item.getId())
        })
    }
}

class Client {
    constructor() {
        const e = new ComponyManager()
        e.printAllEmployee(new SubCompanyManager())
    }
}

new Client()
```