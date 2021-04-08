---
title: 'Typescript 泛型'
date: '2020-10-21'
thumbnail: 'typescript/index.png'
type: 'typescript'
---

```toc
```
---
闲余之时学习 typescript，发现以下几种泛型，记录一下。

### Partial
Partial 的作用是将传入的属性变为可选项。

源码：
```typescript
type Partial<T> = {
  [P in keyof T]?: T[P]
}
```

示例：
```typescript
interface Foo {
  name: string
  age: number
}

type B = Partial<Foo>

// 最多只能定义 name 和 age, 这两个属性是可选的
let b: B = {
  name: '1',
  age: 3,
}
```
---

### Required
Required 的作用是将传入的属性变为必选项。

源码：
```typescript
type Required<T> = {
  [P in keyof T]-?: T[P]
}
```

-? 意思就是把 ? 去掉，也就是设置属性为必选项

---

### Pick

Pick 的作用是从 T 中取出一系列 K 的属性

源码：
```typescript
type Pick<T, K extends keyof T> = {
  [P in K]: T[P]
}
```

示例，总结 Partial、Required、Pick
```typescript
type Partial<T> = {
  [P in keyof T]?: T[P]
}

type Required<T> = {
  [P in keyof T]-?: T[P]
}

type Pick<T, K extends keyof T> = {
  [P in K]: T[P]
}

interface User {
  age: number
  name: string
}

type PartialUser = Partial<User>  // 等同于 type PartialUser = { age? number; name?:string }

type PickUser = Pick<User, 'age' | 'number'>  // 等同于 type PickUser = { age number; name:string }
```

---

### Exclude

Exclude 的作用是用来排除指定项。

源码：
```typescript
type Exclude<T, U> = T extends U ? never : Y
```
以上代码的意思是 如果 T 是 U 的子类型的话，就返回 never，否则返回 Y

示例：
```typescript
const str: Exclude<'a' | '1' | '2', 'a' | 'y' | 'z'> = '1'
```
![pic_1](/blogs/typescript/typescript_2_pic_1.png#pic_center)

Exclude 就是将前面类型的与后面类型对比，过滤出前面独有的属性

---

### Omit

Omit 的作用是省略指定项。

源码：
```typescript
type Omit = Pick<T, Exclude<keyof T, K>>
type Omit<T, K> = Pick<T, Exclude<keyof T, K>>
```

示例：
```typescript
interface User {
  id: number
  age: number
  name: string
}

type OmitUser = Omit<User, 'id'>  // 等同于 type OmitUser = { age: number; name: string }
```

---

最后附上 TS 练习题：
[typescript-exercises.github.io](typescript-exercises.github.io)