---
title: 'Typescript 技巧记录'
date: '2021-04-08'
thumbnail: 'typescript/index.png'
type: 'typescript'
---

```toc
```
---
### 函数重载
当因函数参数不同而返回不同类型的场景时, 可以使用函数重载, 为同一个函数定义多个类型即可, 如下所示:
```typescript
declare function test(a: number): number
declare function test(a: string): string

const resS = test('Hello World') // res 被推断出类型为 string
const resN = test(1234) // res 被推断出类型为 number
```

当我们需要遇到以下场景时可以利用函数重载来实现：

**假设函数 test(p, f), 当 p 的类型为 User 时, 不允许输入参数 f, 当 p 为 number 时, 允许输入参数 f**

代码如下:

```typescript
interface User {
  name: string
  age: number
}

declare function test(p: User): number
declare function test(p: number, f: boolean): number

const user = {
  name: 'Jack',
  age: 666,
}

const res = test(user, false) // Argument of type '{ name: string; age: number; }' is not assignable to parameter of type 'number'.
```
---

### ThisType
通过 ThisType 我们可以在对象字面量中键入 this, 并提供通过上下文类型控制 this 类型的便捷方式。**它只有在 --noImplicitThis 的选项下才有效。** 例如:
```typescript
// Compile with --noImplicitThis

type Point = {
  x: number
  y: number
  moveBy(dx: number, dy: number): void
}

let p: Point = {
  x: 10,
  y: 20,
  moveBy(dx, dy) {
    this.x += dx // this has type Point
    this.y += dy // this has type Point
  }
}

// 如果方法由带 this 参数的签名进行上下文键入, 那么 this 具有该参数的类型, 如下:
let foo = {
  x: 'hello',
  f(n: number) {
    this // { x: string, f(n: number): void }
  },
}

// 如果方法显式指定了 this 参数, 那么 this 具有该参数的类型, 如下:
let bar = {
  x: 'hello',
  f(this: { message: string }) {
    this // { message: string }
  }
}
```

类似的方式, 当使用 --noImplicitThis 时, 函数表达式赋值给 obj.xxx 或者 obj[xxx] 的目标时, 在函数中 this 的类型将会是 obj:
```typescript
// Compile with --noImplicitThis

obj.f = function(n) {
  return this.x - n // 'this' has same type as 'obj'
}

obj['f'] = function(n) {
  return this.x - n // 'this' has same type as 'obj'
}
```

通过 API 转换参数的形式来生成 this 的值的情境下, 可以通过创建一个新的 ThisType<T> 标记接口, 可用于在上下文中表明转换后的类型。尤其是当字面量中的上下文类型为 ThisType<T> 或者是包含 ThisType<T> 的交集时, 显得尤为有效, 对象字面量方法中 this 的类型即为 T。
```typescript
// Compile with --noImplicitThis

type ObjectDescriptor<D, M> = {
  data?: D
  methods?: M & ThisType<D & M> // Type of 'this' in methods is D & M
}

function makeObject<D, M>(desc: ObjectDescriptor<D, M>): D & M {
  let data: object = desc.data || {}
  let methods: object = desc.methods || {}
  return { ...data, ...methods } as D & M
}

let obj = makeObject({
  data: { x: 0, y: 0 },
  methods: {
    moveBy(dx: number, dy: number) {
      this.x += dx // Strongly typed this
      this.y += dy // Strongly typed this
    }
  }
})

obj.x = 10
obj.y = 20
obj.moveBy(5, 5)
```
如果 --noImplicitThis 选项已经启用, 并且对象字面量中包含由 ThisType<T> 键入的上下文类型, 那么 this 的类型为 T(如果不包含由 ThisType<T> 键入的上下文类型, 那么 this 的类型为该上下文类型)。

在上面的例子中, makeObject 参数中的对象属性 methods 具有包含 ThisType<D & M> 的上下文类型, 因此对象中 methods 属性下的方法的 this 类型为 { x: number, y: number } & { moveBy(dx: number, dy: number): number }

---

### 字面量类型
在 JS 基础上, TS 扩展了一系列字面量类型, 用来确保类型的准确性。

如下:
```typescript
const a = 'hello' // const a: "hello"
a = 'world' // Error
```
以上代码中, 因为 a 是常量, a 被判断的类型是 hello, 可以理解成以下代码:
```typescript
let a: 'hello' = 'hello'
a = 'world' // Error
```

**对象字面量类型**

对于对象字面量的类型, TS 有一个被称之为 **Freshness** 的概念, 它也被称为更严格的对象字面量检查, 如下例子:

```typescript
let someThing: { name: string }
someThing = { name: 'hello' } // ok
someThing = { name: 'hello', age: 123 } // Type '{ name: string; age: number; }' is not assignable to type '{ name: string; }'.Object literal may only specify known properties, and 'age' does not exist in type '{ name: string; }'.
let otherThing = { name: 'hello', age: 123 }
someThing = otherThing
```
TS 任务创建的每个对象字面量都是**fresh**状态, 当一个 **fresh** 对象字面量赋值给一个变量时, 如果对象的类型与变量类型不兼容时, 会出现报错(如上例子中 **someThing = { name: 'hello', age: 123 }** 的错误)。当对象字面量的类型变宽, 对象字面量的 **fresh** 状态会消失(如上例子中 **someThing = otherThing**), 赋值以后, **someThing 的类型变宽**。

---

### 泛型
泛型的使用有两种, 一种是传入泛型类型, 另一种是使用类型判断, 即编译器根据其他参数类型来判断泛型类型。如下:
```typescript
declare function fn<T>(arg: T): T
const fn1 = fn<string>('hello') // 传入泛型类型 string
const fn2 = fn(1) // 编译器根据参数来判断泛型类型
```
**实现 Vue Type**
```typescript
type Options<T> = {
  [P in keyof T]: T[P]
}
declare function test<T>(o: Options<T>): T
test({ name: 'Hello' }).name // string
```
test 函数将传入参数的所有属性取出来, 现在我们来一步一步加工, 实现想要的功能。

首先, 更改传入参数的形式, 由 **{ name: 'Hello' }** 的形式变更为 **{ data: { name: 'Hello' } }**, 调用函数的返回值类型不变, 即 **test({ data: { name: 'Hello' } })** name 的值也是 string 类型。

这并不复杂, 这只需要把传入参数的 data 类型设置为 T 即可:
```typescript
declare function test<T>(o: { data: Options<T> }): T
test({ data: { name: 'Hello' } }).name // string
```
接着, 考虑一种特殊的函数情景, 像 Vue 中 Computed 一样, 不调用函数, 也能取出函数的返回值类型。现在传入参数的形式变更为:
```typescript
const params = {
  data: {
    name: 'Hello',
  },
  computed: {
    age() {
      return 20
    }
  }
}
```
一个函数的类型可以简单的看成是 () => T 的形式, 对象中的方法类型, 可以看成 a: () => T 的形式, 在反向推导时（由函数返回值, 来推断类型 a 的类型）, 可以利用它, 现在, 需要添加一个映射类型 Computed<T>, 用来处理 computed 里的函数:
```typescript
type Options<T> = {
  [P in keyof T]: T[P]
}
type Computed<T> = {
  [P in keyof T]: () => T[P]
}

interface Params<T, M> {
  data: Options<T>
  computed: Computed<M>
}

declare function test<T, M>(o: Params<T, M>): T & M

const param = {
  data: {
    name: 'Hello',
  },
  computed: {
    age() {
      return 20
    },
  },
}

test(param).name // string
test(param).age // number
```
最后可以使用 **ThisType** 映射类型, 可以轻松的实现在 computed age 方法下访问 data 中的数据:
```typescript
type Options<T> = {
  [P in keyof T]: T[P]
}
type Computed<T> = {
  [P in keyof T]: () => T[P]
}

interface Params<T, M> {
  data: Options<T>
  computed: Computed<M>
}

declare function test<T, M>(o: Params<T, M> & ThisType<T & M>): T & M

test({
  data: {
    name: 'Hello'
  },
  computed: {
    age() {
      this.name    // string
      return 20
    }
  }
})
```
至此, 只有 data, computed 简单版的 Vue Type 已经实现。

---

### infer
infer 表示在 extends 条件语句中待推断的类型变量。

简单示例如下:
```typescript
type ParamType<T> = T extends (param: infer P) => any ? P : T
```
在这个条件语句 **T extends (param: infer P) => any ? P : T** 中, infer P 表示待推断的函数参数。

整句表示为: 如果 T 能赋值给 **(param: infer P) => any**, 则结果是 **(param: infer P) => any** 类型中的参数 P, 否则返回为 T。

```typescript
interface User {
  name: string
  age: number
}

type Func = (user: User) => void
type Param = ParamType<Func> // Param = User
type AA = ParamType<string>  // string 
```
---
**摘抄自:**
- [https://jkchao.cn/article/5c8a4d99e53a054fad647c15](https://jkchao.cn/article/5c8a4d99e53a054fad647c15)
- [https://jkchao.cn/article/5bb9c63963a5d23d5ce3091b](https://jkchao.cn/article/5bb9c63963a5d23d5ce3091b)

