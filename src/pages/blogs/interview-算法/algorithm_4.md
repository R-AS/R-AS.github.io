---
title: '检查括号是否有效'
date: '2022-12-13 10:59'
thumbnail: 'web/index.png'
type: 'interview-算法'
---
```toc
```
---

- 描述：
  > 给定一个仅包含字符 '(', ')', '{', '}', '[' 和 ']' 的字符串 s，确定输入字符串是否有效
  > 输入字符串在以下情况下有效：
  > - 括号必须用相同类型的括号闭合
  > - 括号必须以正确的顺序闭合

- 约束：
  > 1 <= s.length <= 104
  > s 仅包含括号 '()[]{}'

- 示例：

```txt
Input: s = "()"
Output: true

Input: s = "()[]{}"
Output: true

Input: s = "(]"
Output: false

Input: s = "([)]"
Output: false

Input: s = "{[]}"
Output: true
```

---

#### 思路

- 使用堆栈(后进先出)，遍历整个字符串
- 如果找到左括号，则将其添加到堆栈中
- 如果找到右括号，则弹出堆栈中顶部的一个元素，确定当前的右括号是否与他匹配

![pic_1](/blogs/interview-算法/algorithm_4_pic_1.png#pic_center)

---

#### 实现

```js
const leftToRight = {
  '(': ')',
  '{': '}',
  '[': ']',
}
const isValid = function(s) {
  if (!s) {
    return true
  }

  // 创建堆栈
  const stack = []
  const len = s.length

  // 遍历字符串
  for (let i = 0; i < len; i++) {
    const ch = s[i]

    // 如果当前字符与条件约束一致，则将对应的右括号推进堆栈
    if (ch === '(' || ch === '{' || ch === '[') {
      stack.push(leftToRight[ch])
    } else {
      // 如果字符中没有与条件约束一致的字符 或者 右括号不与堆栈中顶部括号匹配(不对称)，则返回 false
      if (!stack.length || stack.pop() !== ch) {
        return false
      }
    }
  }

  return !stack.length
}
```