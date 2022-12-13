---
title: '反转单链表'
date: '2022-12-13 10:00'
thumbnail: 'web/index.png'
type: 'interview-算法'
---
```toc
```
---

链表是表示一系列节点的数据结构，其中每个节点包含 节点的值 和 指向下一节点的指针。链表末端的节点指向空值 null。

![pic_1](/blogs/interview-算法/algorithm_3_pic_1.png#pic_center)

#### 反转单链表

![pic_2](/blogs/interview-算法/algorithm_3_pic_2.png#pic_center)

---

#### 思路

- 设置三个变量用于存储
  > prev = null;
  > current = 列表头部节点;
  > next = null
- 将 next 赋值 当前节点的下一个节点(用于后面的 current 移动)
  > next = current.next
- 将当前节点的下一节点 指向 当前节点的上一节点
  > current.next = prev
- 将当前节点的上一节点 指向当前节点
  > prev = current
- 将当前节点指向 next(第二步，也就是向后移动)
  > current = next

![pic_3](/blogs/interview-算法/algorithm_3_pic_3.png#pic_center)

---

#### 实现

```js
function reverseList (head) {
  let prev = null
  let next = null
  let current = head

  while(current !== null) {
    next = current.next
    current.next = prev
    prev = current
    current = next
  }
  return prev
}
```
