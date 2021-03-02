---
title: Typrscript 记录
date: '2020-01-10'
thumbnail: 'typescript/index.png'
type: 'typescript'
---
### 目录
```toc
```
---

### {}, object, Object 有什么区别

这三种类型表示你的值是**一个没有任何自定义属性**的对象，只从 Object.prototype 继承了基本的方法:
```typescript
let user: object = { name: 'Jelly' }
user.toString() // correct
user.name // error: Property 'name' does not exist on type 'object'
```

分析以下代码：
```typescript
let title: {}
title = {}  // correct
title = []  // correct
title = 123 // correct

let content: object
content = {}  // correct
content = []  // correct
content = 123 // error: Type '123' is not assignable to type 'object'.
```
**如果一个变量的值是 object 类型，那么它可以是任何非原始类型值**

**{}类型不仅包含非原始类型，还包含除 null | undefined 之外的其他原始类型**

(Object 与 {} 基本一致)

原始类型:
  - string
  - boolean
  - number
  - bigint
  - symbol
  - null
  - undefined

---

### type alias 与 interface 的差异
  1. 同一个作用域中同名的 interface 会合并声明, 相反 type alias 则会报错
  2. type alias 的右值可以是任何类型, 包括原始类型和类型表达式
  3. interface 可以继承其他 shape 类型(非原始类型 object)

---

### 泛型
观察以下代码：
```typescript
type Arrayify = <T>(data: T) => T[] // 1
type Arrayify<T> = (data: T) => T[] // 2
```
1 和 2 实际上泛型覆盖的作用域不同(**简单的说,泛型定义的位置决定了他涵盖的作用域**)
例如下面的例子就一目了然了
```typescript
type Arrayify = {
  <T>(data: T): T[]
  customProp: string
}
type Arrayify<T> = {
  (data: T): T[]
  customProp: T
}
```