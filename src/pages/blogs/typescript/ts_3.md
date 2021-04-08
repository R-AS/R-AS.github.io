---
title: 'Typescript记录 —— 减少重复代码'
date: '2021-02-23'
thumbnail: 'typescript/index.png'
type: 'typescript'
---
<!--  -->
```toc
```
---
**DRY —— Don't repeat yourself**, 以下记录在 typescript 开发中有那些可以提取出公共逻辑：
### 1
```typescript
function distance(a: {x: number, y: number}, b: {x: number, y: number}) {
  return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2))
}
```
从以上代码可以发现，重复使用了 **{x:number, y: number}** 来定义 a 和 b 的类型，因此我们可以定义一个接口 Point2D 接口：
```typescript
interface Point2D {
  x: number
  y: number
}

function distance(a: Point2D, b: Point2D) {/*...*/}
```

然而在实际开发中，重复的类型有可能会被语法所覆盖，导致不容易被发现。例如：
```typescript
function get(url: string, opts: Options): Promise<Response> {/*...*/}
function post(url: string, opts: Options): Promise<Response> {/*...*/}
```
对于上面的 get 和 post 方法，为了避免重复的代码，可以提取统一的类型签名：
```typescript
type HTTPFunction = (url: string, opts: Options) => Promise<Response>

const get: HTTPFunction = (url, opts) => {/*...*/}
const post: HTTPFunction = (url, opts) => {/*...*/}
```
---
### 2
```typescript
interface Person {
  firstName: string
  lastName: string
}

interface PersonWithBirthDate {
  firstName: string
  lastName: string
  birth: Date
}
```
上面例子中 **PersonWithBirthDate** 相对于 **Person** 来说只多了一个 **birth** 属性，其他属性相同，那我们可以这样改造：
```typescript
interface Person {
  firstName: string
  lastName: string
}
interface PersonWithBirthDate extends Person {
  birthDate
}
// 或者
type PersonWithBirthDate = Person & { birth: Date }
```
---
### 3 
```typescript
interface State {
  userId: string
  pageTitle: string
  recentFiles: string[]
  pageContents: string
}
interface TopNavState {
  userId: string
  pageTitle: string
  recentFiles: string[]
}
```
以上例子中 **TopNavState** 相比 **State** 只是缺少了 **pageContents** 属性，但我们却重复声明其他三个相同的属性。那可以这样做：
```typescript
type TopNavState = {
  userId: State['userId']
  pageTitle: State['pageTitle']
  recentFiles: State['recentFiles']
}
// 或者
type TopNavState = {
  [k in 'userId' | 'pageTitle' | 'recentFiles']: State[k]
}
// 或者
type TopNavState = Pick<State, 'userId', 'pageTitle', 'recentFiles'>
```
---
### 4
```typescript
interface Options {
  width: number
  height: number
  color: string
  label: string
}

interface OptionsUpdate {
  width?: number
  height?: number
  color?: string
  label?: string
}
```
改造：
```typescript
type OptionsUpdate = {[k in keyof Options]?: Options[k]}
// 或者
type OptionsUpdate = Partial<OptionsUpdate>
```