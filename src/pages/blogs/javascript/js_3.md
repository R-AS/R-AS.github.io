---
title: 'async await 是把双刃剑'
date: '2020-06-22'
thumbnail: 'javascript/index.png'
type: 'javascript'
---
### Table of Contents
```toc
```
---
在 async/await 语法糖出现之后，使得我们在写异步函数的时候少了许多不优雅的代码，解决了回调地狱的问题。**但如果对 async/await 理解的不清楚时，虽然能达到异步的效果，但却会降低代码的性能！**


## 概述

```javascript
(async () => {
  const pizzaData = await getPizzaData() // async call
  const drinkData = await getDrinkData() // async call
  const chosenPizza = choosePizza() // sync call
  const chosenDrink = chooseDrink() // sync call
  await addPizzaToCart(chosenPizza) // async call
  await addDrinkToCart(chosenDrink) // async call
  orderItems() // async call
})()
```
这个示例中 await 语法本身没有问题，但有时候可能使用者用错了。当 prizzaData 与 drinkData 之间没有依赖时，顺序的 await 会最多让执行时间增加一倍的 getPizzaData 函数时间，因为 getPizzaData 与 getDrinkData 应该并行执行。**在这里为了语法简化而带来了性能问题，直接影响用户体验！**
**正确做法应该是先同时执行函数，在 await 返回值， 这样可以并行执行异步函数**

```javascript
(async () => {
  const pizzaPromise = selectPizza()
  const drinkPromise = selectDrink()
  await pizzaPromise
  await drinkPromise
  orderItems() // async call
})()

// 或者使用 Promise.all 可以让代码更可读：
(async () => {
  Promise.all([selectPizza(), selectDrink()]).then(orderItems) // async call
})()
```

## 分析

那为啥 async/await 会被滥用，这应该是他的功能比较反直觉导致的。
现在回看回调地狱带来的灾难：
```javascript
a(() => {
  b(() => {
    c()
  })
})
```

利用 async/await 解决回调地狱：
```javascript
await a()
await b()
await c()
```

虽然解决了回调地狱，但实际上还是嵌套关系，接下来看下一个例子：

```javascript
a(() => {
  b()
})

c(() => {
  d()
})
```
如果写成下面的方法，虽然能保证功能一致，但变成了最低效的执行方式：
```javascript
await a()
await b()
await c()
await d()
```
最后翻译成回调，就变成了：
```javascript
a(() => {
  b(() => {
    c(() => {
      d()
    })
  })
})
```
然而我们发现在原始代码中， c 可以与 a 同时执行，但 async/await 语法会让我们倾向于在 b 执行后在执行 c

所以可以这样写，优化一下性能
```javascript
const resA = a()
const resC = c()

await resA
b()
await resC
d()
```

但其实这个逻辑也无法达到回调的效果，虽然 a 与 c 同时执行了，但 d 原本只要等待 c 执行完，现在如果 a 执行时间比 c 长，就变成了：
```javascript
a(() => {
  d()
})
```
可以隔离成两个函数或者利用 Promise.all 解决
```javascript
(async () => {
  await a()
  b()
})()

(async () => {
  await c()
  d()
})()

// Promise.all
async function ab() {
  await a()
  b()
}

async function cd() {
  await c()
  d()
}

Promise.all([ab(), cd()])
```

所以说，我们利用了 async/await 语法糖减少代码量，但我们也得反过来翻译代码，看实际上是否优化了，否则就踩坑了...

---
**参考自： https://github.com/dt-fe/weekly/blob/v2/055.%E7%B2%BE%E8%AF%BB%E3%80%8Aasync%20await%20%E6%98%AF%E6%8A%8A%E5%8F%8C%E5%88%83%E5%89%91%E3%80%8B.md** 
