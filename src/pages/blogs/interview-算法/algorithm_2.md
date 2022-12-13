---
title: '二分查找'
date: '2022-12-12 17:10'
thumbnail: 'web/index.png'
type: 'interview-算法'
---
```toc
```
---

在有序的数组中，寻找目标值的位置，可以用到二分查找。

#### 思路

- 以数组的中间元素于目标值对比
- 如果目标值等于中间元素，则返回索引
- 如果目标值小于中间元素，则将区间缩小到上半部分
- 否则将区间缩小到下半部分
- 从第二个步骤开始反复检查，直到找到值或者区间为空

![pic_1](/blogs/interview-算法/algorithm_2_pic_1.png#pic_center)

---

#### 实现

```js
function binarySearch(arr, target) {
  // 左指针
  let l = 0
  // 右指针
  let r = arr.length - 1
  // 中间指针
  let mid

  // r 永远都大于等于 l
  while (r >= l) {
    mid = l + Math.floor((r - l) / 2)

    // 如果目标值等于中间值，则返回
    if (arr[mid] === target) {
      return mid
    }

    // 如果目标值小于中间值，则将范围缩小到上半部分
    if (target < arr[mid]) {
      r = mid - 1
    }

    // 如果目标值大于中间值，则将范围缩小到下半部分
    if (target > arr[mid]) {
      l = mid + 1
    }
  }

  // 没找到则返回 -1
  return -1
}
```