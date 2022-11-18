---
title: 'JS 执行上下文'
date: '2022-11-04'
thumbnail: 'javascript/index.png'
type: 'interview-javascript'
---
```toc
```
---
JS 引擎并非一行行地分析和执行程序的，而是一段段分析执行。当执行一段代码的时候，会进行一个“准备工作”。

例如下面的例子，在第一个例子中进行变量提升，第二个例子进行函数提升。这里的“准备工作”就叫做执行上下文。

```js
var foo = function() {
  console.log('foo1')
}
foo() // foo1

var foo = function() {
  console.log('foo2')
}
foo() // foo2
```

```js
function foo() {
  console.log('foo1')
}
foo() // foo2

function foo() {
  console.log('foo2')
}
foo() // foo2
```

---

#### 执行上下文栈

JS 引擎创建了执行上下文栈来管理执行上下文，我们可以把执行上下文栈定义为一个数组来模拟执行上下文栈的行为。

```js
ECStack = []
```

JS 开始要解释执行代码的时候，最先遇到的就是全局代码，所以初始化的时候首先会向执行上下文栈压入一个全局执行上下文，并且只有当整个应用程序结束的时候，ECStack 才会被清空。

```js
ECStack = [
  globalContext
]
```

当执行一个函数的时候，就会创建一个执行上下文，并且压入执行上下文栈，当函数执行完毕的时候，就会将函数的执行上下文从栈中弹出。

知道了这个原理，我们来分析下以下代码是怎么处理的：

```js
function fun3() {
  console.log('fun3')
}

function fun2() {
  fun3()
}

function fun1() {
  fun2()
}

fun1()
```

```js
ECStack.push(<fun1> functionContext)

// fun1 中调用了 fun2，创建 fun2 的执行上下文
ECStack.push(<fun2> functionContext)

// fun2 中调用了 fun3，创建 fun3 的执行上下文
ECStack.push(<fun3> functionContext)

// fun3 执行完毕
ECStack.pop()

// fun2 执行完毕
ECStack.pop()

// fun1 执行完毕
ECStack.pop()

// javascript接着执行下面的代码，但是ECStack底层永远有个globalContext
```

---

#### 思考

```js

var scope = "global scope";
function checkscope(){
    var scope = "local scope";
    function f(){
        return scope;
    }
    return f();
}
checkscope();

var scope = "global scope";
function checkscope(){
    var scope = "local scope";
    function f(){
        return scope;
    }
    return f;
}
checkscope()();
```

以上两段代码的执行结果是一样的，但是它们的执行上下文栈的变化不同。

```js
ECStack.push(<checkscope> functionContext)
ECStack.push(<f> functionContext)
ECStack.pop()
ECStack.pop()
```

```js
ECStack.push(<checkscope> functionContext)
ECStack.pop()
ECStack.push(<f> functionContext)
ECStack.pop()
```

---

**摘抄自**
- [JavaScript深入之执行上下文栈](https://github.com/mqyqingfeng/Blog/issues/4)
