---
title: 'setState 的一些考点'
date: '2021-10-12'
thumbnail: 'react/index.png'
type: 'react'
---
```toc
```
---

先看以下一段简单的代码，点击按钮后，count 是加 2 吗？
```js
class NextPage extends Component<Props> {
  static navigatorStyle = {
    tabBarHidden: true
  };

  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  add() {
    this.setState({
      count: this.state.count + 1
    });
    this.setState({
      count: this.state.count + 1
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => {
            this.add();
          }}
        >
          <Text style={styles.btnText}>点击+2</Text>
        </TouchableOpacity>

        <Text style={styles.commonText}>当前count {this.state.count}</Text>
      </View>
    );
  }
}
```
公布结果，结果只加 1。
---

### setState 机制。

在 React 中 setState 通过一个队列机制来实现 state 更新，当执行 setState() 时，会将需要更新的 state 浅合并后放入状态队列，而不会立即更新 state，队列机制可以高效的批量更新 stat。而如果不通过 setState，直接修改 this.state 的值，则不会放入状态队列，当下一次调用 setState 对状态队列进行合并时，之前对 this.state 的修改将会被忽略，造成无法预知的错误。

React通过状态队列机制实现了 setState 的异步更新，避免重复的更新 state。

```js
setState(nextState, callback)
```

在 setState 官方文档中介绍：将 nextState 浅合并到当前 state。这是在事件处理函数和服务器请求回调函数中触发 UI 更新的主要方法。不保证 setState 调用会同步执行，考虑到性能问题，可能会对多次调用作批处理。

举个例子：
```js
// 假设 state.count === 0
this.setState({count: state.count + 1});
this.setState({count: state.count + 1});
this.setState({count: state.count + 1});
// state.count === 1, 而不是 3
```

本质上等同于：
```js
// 假设 state.count === 0
Object.assign(state,
              {count: state.count + 1},
              {count: state.count + 1},
              {count: state.count + 1}
             )
// {count: 1}

```

---
- [https://github.com/sisterAn/blog/issues/26](https://github.com/sisterAn/blog/issues/26)
- [https://imweb.io/topic/5b189d04d4c96b9b1b4c4ed6](https://imweb.io/topic/5b189d04d4c96b9b1b4c4ed6)