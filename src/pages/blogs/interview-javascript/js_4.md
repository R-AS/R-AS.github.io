---
title: 'JS 闭包'
date: '2022-11-05'
thumbnail: 'javascript/index.png'
type: 'interview-javascript'
---
```toc
```
---
#### 定义

1. **理论定义：**

MDN 对闭包的定义为：能够访问自由变量的函数。

自由变量指的是在函数中使用的，但既不是函数参数也不是函数的局部变量的变量。

因此，闭包 = 函数 + 函数能够访问的自由变量。

举个例子：
```js
var a = 1;

function foo() {
  console.log(a)
}

foo()
```

2. **实践定义：**

满足闭包的条件为：
- 即使创建它的上下文已经销毁，它仍然存在（比如，内部函数从父函数中返回）
- 在代码中引用了自由变量

---

#### 分析

```js
var scope = "global scope";
function checkscope(){
    var scope = "local scope";
    function f(){
        return scope;
    }
    return f;
}

var foo = checkscope();
foo();
```

分析以上代码执行过程：
1. 进入全局代码，创建全局执行上下文，全局上下文压入执行上下文栈
2. 全局执行上下文初始化
3. 执行 checkscope 函数，创建 checkscope 函数执行上下文，checkscope 执行上下文被压入执行上下文栈
4. checkscope 执行上下文初始化，创建变量对象、作用域链、this 等
5. checkscope 函数执行完毕，checkscope 执行上下文从执行上下文栈中弹出
6. 执行 f 函数，创建 f 函数执行上下文，f 执行上下文被压入执行上下文栈
7. f 执行上下文初始化，创建变量对象、作用域链、this 等
8. f 函数执行完毕，f 函数上下文从执行上下文栈中弹出

了解了以上执行过程，就会有一个疑问，当 f 函数执行的时候，checkscope 函数上下文已经被销毁了，那怎么还会读取到 checkscope 作用域下的 scope 值？

答案就在作用域链里，f 执行上下文维护了一个作用域链：
```js
fContext = [
  Scope: [AO, checkscopeContext.AO, globalContext.VO]
]
```

当 checkscopeContext 被销毁了，JS 依然会让 checkscopeContext 活在内存中，f 函数依然可以通过 f 函数的作用域链找到它，从而实现闭包这个概念。

---

### 必刷题

```js
var data = [];

for (var i = 0; i < 3; i++) {
  data[i] = function () {
    console.log(i);
  };
}

data[0](); // 3
data[1](); // 3
data[2](); // 3
```

分析：

当执行到 data[0] 函数之前，此时全局上下文的 VO 为：
```js
globalContext = {
  VO: {
    data: [...],
    i: 3,
  }
}
```

当执行 data[0] 函数的时候，data[0] 函数的作用域链为：
```js
data[0]Context = {
  Scope: [AO, globalContext.VO]
}

```
data[0]Context 的 AO 并没有 i 值，所以会从 globalContext.VO 中查找，i 为 3，所以打印的结果就是 3。

data[1] 和 data[2] 是一样的道理。

修改成闭包：

```js
var data = [];

for (var i = 0; i < 3; i++) {
  data[i] = (function (i) {
        return function(){
            console.log(i);
        }
  })(i);
}

data[0]();
data[1]();
data[2]();
```

当执行到 data[0] 函数之前，此时全局上下文的 VO 为：
```js
globalContext = {
    VO: {
        data: [...],
        i: 3
    }
}
```

当执行 data[0] 函数的时候，data[0] 函数的作用域链发生了改变：
```js
data[0]Context = {
    Scope: [AO, 匿名函数Context.AO globalContext.VO]
}
```

匿名函数执行上下文的AO为：
```js
匿名函数Context = {
    AO: {
        arguments: {
            0: 0,
            length: 1
        },
        i: 0
    }
}
```

data[0]Context 的 AO 并没有 i 值，所以会沿着作用域链从匿名函数 Context.AO 中查找，这时候就会找 i 为 0，找到了就不会往 globalContext.VO 中查找了，即使 globalContext.VO 也有 i 的值(值为3)，所以打印的结果就是0。

data[1] 和 data[2] 是一样的道理。

---
**摘抄自**
- [JavaScript深入之闭包](https://github.com/mqyqingfeng/Blog/issues/9)
