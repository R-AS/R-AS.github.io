---
title: '快速排序'
date: '2022-12-12 16:05'
thumbnail: 'web/index.png'
type: 'interview-算法'
---
```toc
```
---

#### 思路

- 在数组中找一个元素作为枢轴
- 小于枢轴的元素移动到枢轴的左边，大于枢轴的元素移动到枢轴的右边
- 对于枢轴左右的两个子集，重复第一步和第二步，直到所有子集中只剩下一个元素

![pic_1](/blogs/interview-算法/algorithm_1_pic_1.png#pic_center)

---

#### 实现

```js
const quickSort = function (arr) {
  if (arr.length <= 1) {
    return arr
  }
  // 选择一个枢轴，这里选择中间点
  const pivotIndex = Math.floor(arr.length / 2)
  // 取出中间点
  const pivot = arr.splice(pivotIndex, 1)[0]
  // 定义左子集
  const left = []
  // 定义右子集
  const right = []

  for (let i = 0; i < arr.length; i++) {
    // 小于中间点，放左边子集
    if (arr[i] < pivot) {
      left.push(arr[i])
    } else {
      // 大于等于中间点，放右边子集
      right.push(arr[i])
    }
  }
  // 递归得出结果后连接
  return quickSort(left).concat([pivot], quickSort(right))
}

/**
* 结果：
* 原数组：[86, 24, 64, 48, 15, 30, 90, 49]
* 排序后：[15, 24, 30, 48, 49, 64, 86, 90]
*/
```
