---
title: 'Typescript 技巧记录'
date: '2021-04-08'
thumbnail: 'typescript/index.png'
type: 'typescript'
---

```toc
```
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