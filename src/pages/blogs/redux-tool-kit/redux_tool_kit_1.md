---
title: 'Redux ToolKit 基础篇'
date: '2020-03-18'
thumbnail: 'redux_tool_kit/index.png'
type: 'Redux ToolKit'
---

```toc
```
---
**关于 Redux 的一些缺陷，在这篇[文章](https://github.com/dt-fe/weekly/blob/v2/056.%E7%B2%BE%E8%AF%BB%E3%80%8A%E9%87%8D%E6%96%B0%E6%80%9D%E8%80%83%20Redux%E3%80%8B.md)中有提出， RTK 解决了这些问题**
### RTK 简介

Redux ToolKit 包旨在成为编写 Redux 逻辑的标准方式。他最初是为了帮助解决 Redux 的三个常见问题而创建的:
  - 配置 Redux store 太复杂
  - 必须添加大量的软件包才能让 Redux 做任何有用的事情
  - Redux 需要太多样板代码

Redux ToolKit 工具包对所有的 Redux 用户都是有益的。 无论你是一个全新的 Redux 用户设置了你的第一个项目，还是一个有经验的用户谁想要简化一个现有的应用程序，Redux 工具包可以帮助你使你的 Redux 代码更好。

### 安装 RTK

**1. 使用 npm/yarn 安装**
```js
# NPM
npm install @reduxjs/toolkit

# Yarn
yarn add @reduxjs/toolkit
```
**2. 在脚本标记使用预编译的 UMD 包**
```js
<script src="https://unpkg.com/@reduxjs/toolkit@latest/dist/redux-toolkit.umd.js"></script>
```
---

### Redux 与 RTK 例子对比

**写一个 counter 的例子，对比 Redux 与 RTK (只挑重要部分)**

**以下例子是直接在脚本标记引用编译的 UMD 包，定义一个 window.RTK 全局变量**

**1. Redux**
```js
  // types
  const INCREMENT = 'INCREMENT'
  const DECREMENT = 'DECREMENT'
  const INCREMENT_IF_ODD = 'INCREMENT_IF_ODD'
  
  // actions
  const increment = () => ({ type: INCREMENT })
  const decrement = () => ({ type: DECREMENT })
  const incrementIfOdd = () => ({ type: INCREMENT_IF_ODD })

  // reducers
  const counter = (state = 0, action) => {
    switch (action.type) {
      case INCREMENT:
        return state + 1
      case DECREMENT:
        return state - 1
      case INCREMENT_IF_ODD:
        if (state % 2 !== 0) {
          return state + 1
        } else {
          return state
        }
      default:
        return state
    }
  }

  const store = Redux.createStore(counter)
```

**2. RTK**
```js
  const RTK = window.RTK
  const counterSlice = RTK.createSlice({
    name: 'counter',
    initialState: 0,
    reducers: {
      increment: state => state + 1,
      decrement: state => state - 1,
    },
  })

  const { increment, decrement } = counterSlice.actions

  const store = RTK.configureStore({ reducer: counterSlice.reducer })
```
---

### 使用 createAction

**createAction 接受一个操作类型字符串作为参数，并返回一个使用该类型字符串的操作创建者函数**

因此，这两个例子是等价的:

```js
  // Original approach: write the action type and action creator by hand
  const INCREMENT = 'INCREMENT'

  function incrementOriginal() {
    return { type: INCREMENT }
  }

  console.log(incrementOriginal())
  // {type: "INCREMENT"}

  // Or, use `createAction` to generate the action creator:
  const incrementNew = createAction('INCREMENT')

  console.log(incrementNew())
  // {type: "INCREMENT"}
```

使用 createAction 来简化前面的反例:

```js
  // types
  // const INCREMENT = 'INCREMENT'
  // const DECREMENT = 'DECREMENT'
  // const INCREMENT_IF_ODD = 'INCREMENT_IF_ODD'
  
  // actions
  // const increment = () => ({ type: INCREMENT })
  // const decrement = () => ({ type: DECREMENT })
  // const incrementIfOdd = () => ({ type: INCREMENT_IF_ODD })

  const increment = createAction('INCREMENT')
  const decrement = createAction('DECREMENT')

  function counter(state = 0, action) {
    switch (action.type) {
      case increment.type:
        return state + 1
      case decrement.type:
        return state - 1
      default:
        return state
    }
  }

  const store = Redux.createStore(counter)
  })
```
**这又为我们节省了几行代码，至少我们没有在所有地方重复 INCREMENT 这个词**

---

### 使用 createReducer

Redux Toolkit 包含一个 createReducer 函数，该函数允许您使用“查找表”对象编写还原程序，其中对象中的每个键都是一个 Redux 操作类型的字符串，值是 reducer 函数。 我们可以使用它直接替换现有的计数器函数定义。 因为我们需要使用操作类型字符串作为键，所以我们可以使用 ES6对象“ computed property”语法从类型字符串变量创建键。

```js
  const counter = createReducer(0, {
    [increment]: state => state + 1,
    [decrement]: state => state - 1
  })
```
---

### 使用 createSlice
Createslice 返回一个“slice”对象，其中包含作为名为 reducer 的字段生成的 reducer 函数，以及在名为 actions 的对象中生成的动作创建器。

**它允许我们提供一个包含 reducer 函数的对象，并且它将根据我们列出的 reducer 函数的名称自动生成 action 类型字符串和 action creator 函数。**

```js
  const counterSlice = createSlice({
    name: 'counter',
    initialState: 0,
    reducers: {
      increment: state => state + 1,
      decrement: state => state - 1
    }
  })

  const store = configureStore({
    reducer: counterSlice.reducer
  })

  document.getElementById('increment').addEventListener('click', () => {
    store.dispatch(counterSlice.actions.increment())
  })
```

---
参考自
- https://redux-toolkit.js.org/tutorials/basic-tutorial