---
title: '前端二进制'
date: '2020-09-01'
thumbnail: 'javascript/index.png'
type: 'frontend'
---
### Table of Contents
```toc
```
---

本文将按照以下的流程来介绍前端如何进行图片处理，然后穿插介绍二进制、Blob、Blob URL、Base64、Data URL、ArrayBuffer、TypedArray、DataView 和图片压缩相关的知识点。

### 选择本地图片，图片预览
1. **FileReader API**

FileReader 对象允许 Web 应用程序异步读取存储在用户计算机上的文件(或原始数据缓冲区)的内容，使用 File 或 Blob 对象指定要读取的文件或数据。[关于 FileReader 的知识可以看这~](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader)

通过 [caniuse](https://caniuse.com/) 可以查到 FileReader API 兼容性较好，所以可以放心使用。
![pic_1](/blogs/frontend/frontend_4_pic_1.png#pic_center)
通过下面例子，可以实现本地图片的预览，具体代码如下：

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>图片本地预览示例</title>
</head>
<body>
  <h3>图片本地预览示例</h3>
  <input type="file" accept="image/*" onchange="loadFile(event)" />
  <img id="previewContainer" />

  <script>
    const loadFile = function (event) {
      const reader = new FileReader()
      reader.onload = function () {
        const output = document.querySelector("#previewContainer")
        output.src = reader.result
      }
      reader.readAsDataURL(event.target.files[0])
    }
  </script>
</body>
</html>
```
上面示例中，给 file 类型的输入框绑定 onchange 事件处理函数 loadFile。在该函数中，创建了一个 FileReader 对象并为该对象绑定 onload 相应的事件处理函数，然后调用 FileReader 对象的 readAsDataURL() 方法，把本地图片对应的 File 对象转换为 Data URL。

当文件读取完成后，会触发绑定的 onload 事件处理函数，在该处理函数内部会把获取 Data URL 数据赋给 img 元素的 src 属性，从而实现图片本地预览。

![pic_2](/blogs/frontend/frontend_4_pic_2.png#pic_center)

可以看到 img 元素 src 属性值是一串很长的字符串：

```
data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAhAAAAIwCAYAAADXrFK...
```
这串奇怪的字符串被称为 Data URL, 它由四个部分组成：前缀(data:)、指示数据类型的 MIME 类型、如果非文本则为可选的 base64 标记、数据本身：
```
data:[<mediatype>][;base64],<data>
```
mediatype 是个 MIME 类型的字符串，例如 "image/jpeg" 表示 JPEG 图像文件。如果被省略，则默认值为 text/plain;charset=US-ASCII

如果数据是文本类型，你可以直接将文本嵌入 (根据文档类型，使用合适的实体字符或转义字符)。如果是二进制数据，你可以将数据进行base64编码之后再进行嵌入。

下面是一些示例：
```
data:,Hello%2C%20World!
简单的 text/plain 类型数据

data:text/plain;base64,SGVsbG8sIFdvcmxkIQ%3D%3D
上一条示例的 base64 编码版本

data:text/html,%3Ch1%3EHello%2C%20World!%3C%2Fh1%3E
一个HTML文档源代码 <h1>Hello, World</h1>

data:text/html,<script>alert('hi');</script>
一个会执行 JavaScript alert 的 HTML 文档。注意 script 标签必须封闭。
```

2. **Base64**

Base64 是一种基于 64 个可打印字符来表示二进制数据的表示方法，由于 **2^6 = 64**，所以每 6 个比特为一个单元。

3 byte = 24 bit = 4 个 base64 单元 (1 byte = 8 bit)，即 3 个字节可由 4 个可打印字符来表示。如下图所示：

![pic_3](/blogs/frontend/frontend_4_pic_3.png#pic_center)

Base64 常用于在处理文本数据的场合，表示、传输、存储一些二进制数据，包括 MIME 的电子邮件及 XML 的一些复杂数据。

Base64 相应的索引表如下：
![pic_4](/blogs/frontend/frontend_4_pic_4.png#pic_center)

下面以编码 Man 为例，了解一下编码过程，M、a、n 对应 ASCII 码 77、97、110
![pic_5](/blogs/frontend/frontend_4_pic_5.png#pic_center)

转换为 base64 则为：
![pic_6](/blogs/frontend/frontend_4_pic_6.png#pic_center)

由图可知，Man （3 字节）编码的结果为 TWFu（4 字节），很明显经过 base64 编码后体积会增加 1/3。Man 这个字符串的长度刚好是 3，我们可以用 4 个 base64 单元来表示。但如果待编码的字符串长度不是 3 的整数倍时，应该如何处理呢?

**如果要编码的字节数不能被 3 整除，最后会多出 1 个或 2 个字节，那么可以使用下面的方法进行处理：先使用 0 字节值在末尾补足，使其能够被 3 整除，然后再进行 base64 的编码。**

以编码字符 A 为例，其所占的字节数为 1，不能被 3 整除，需要补 2 个字节，具体如下图所示：
![pic_7](/blogs/frontend/frontend_4_pic_7.png#pic_center)

在 Javascript 中，有两个函数分别用来解码和编码 base64 字符串：
- btoa(): 该函数能够基于二进制数据'字符串'创建一个 base64 编码的 ASCII 字符串
- atob(): 该函数能够解码通过 base64 编码的字符串数据

**btoa 示例：**
**blob (二进制) to a (ASCII) 编码**
```javascript
const name = 'Semlinker';
const encodedName = btoa(name);
console.log(encodedName); // U2VtbGlua2Vy
```

**atob 示例：**
**a (ASCII) to blob (二进制) 解码**
```javascript
const encodedName = 'U2VtbGlua2Vy';
const name = atob(encodedName);
console.log(name); // Semlinker
```

**注意：**

**base64 只是一种数据编码方式，目的是为了保障数据的安全传输。但标准的 base64 编码无需额外的信息，即可以进行解码，是完全可逆的。因此在涉及传输私密数据时，并不能直接使用 base64 编码，而是要使用专门的对称或非对称加密算法。**

---
### 网络下载图片 -> 图片预览
除了可以从本地获取图片外，也可以使用 fetch API 从网络上获取图片，然后进行图片预览。也可以直接把地址赋给 img 元素, 如果需要对图片进行特殊处理，比如解密图片数据时，也可以考虑再 Web Worker 中使用 fetch API 获取图片数据并进行解密操作。

首先看一下 fetch API 的兼容性：
![pic_8](/blogs/frontend/frontend_4_pic_8.png#pic_center)

然后使用 fetch API 从网上获取一张图片：

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>获取远程图片预览示例</title>
</head>
<body>
  <h3>获取远程图片预览示例</h3>
  <img id="previewContainer" style="width: 50%;" />
</body>
<script>
  const url = 'http://storage.zone.photo.sina.com.cn/zone/1000_0/20200901/43f73f972a12a7f9210bf957881f2f4f_2000_1334.jpg?&ssig=yvSmMQl9vg&KID=sina,slidenews&Expires=1599581409'
  const image = document.querySelector('#previewContainer')
  fetch(url)
    .then((response) => {
      response.blob().then((blob) => {
        const objectURL = URL.createObjectURL(blob)
        image.src = objectURL
      })
    })
</script>
</html>
```

上面例子中，通过 fetch API 从网上获取一张图片，当请求成功后把响应对象转换为 Blob 对象，然后使用 URL.createObjectURL 方法创建 Object URL 并把它赋给 img 元素的 src 属性，从而实现图片的显示。

我们可以看到 img 元素的 src 属性值是一串非常**特殊**的字符串:

```
blob:null/ab24c171-1c5f-4de1-a44e-568bc1f77d7b
```

以上字符串被称为 Object URL，相比前面介绍的 Data URL 要简洁的多，接下来需要认识一下 Object URL 这种协议。

1. **Object URL**

Object URL 是一种伪协议，也被称为 Blob URL。它允许 Blob 或 File 对象用作图像，下载二进制数据链接等的 URL 源。在浏览器中，我们使用 URL.createObjectURL 方法来创建 Blob URL，该方法接收一个 Blob 对象，并为其创建一个唯一的 URL，其形式为 **blob:<origin>/<uuid>**，对应示例如下：

```
blob:https://example.org/40a5fb5a-d56d-4a33-b4e2-0acf6a8e5f641
```

浏览器内部为每个通过 URL.createObjectURL 生成的 URL 存储了一个 「URL → Blob」 映射。因此，此类 URL 较短，但可以访问 Blob。生成的 URL 仅在当前文档打开的状态下才有效。但如果你访问的 Blob URL 不再存在，则会从浏览器中收到 404 错误。

上述的 Blob URL 看似很不错，但实际上它也有副作用。虽然存储了 URL → Blob 的映射，但 Blob 本身仍驻留在内存中，浏览器无法释放它。映射在文档卸载时自动清除，因此 Blob 对象随后被释放。但是，如果应用程序寿命很长，那不会很快发生。因此，如果我们创建一个 Blob URL，即使不再需要该 Blob，它也会存在内存中。

针对这个问题，我们可以调用 URL.revokeObjectURL(url) 方法，从内部映射中删除引用，从而允许删除 Blob（如果没有其他引用），并释放内存。

2. **Blob**

Blob（Binary Large Object）表示二进制类型的大对象。在数据库管理系统中，将二进制数据存储为一个单一个体的集合。Blob 通常是影像、声音或多媒体文件。「在 JavaScript 中 Blob 类型的对象表示不可变的类似文件对象的原始数据。」 为了更直观的感受 Blob 对象，我们先来使用 Blob 构造函数，创建一个 myBlob 对象，具体如下图所示：

![pic_9](/blogs/frontend/frontend_4_pic_9.png#pic_center)

blob 对象含有两个属性：size 和 type。size 用于表示数据的大小(以字节为单位)，type 是 MIME 类型的字符串。Blob 表示的不一定是 JavaScript 原生格式的数据。比如 File 接口基于 Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。

Blob 由一个可选的字符串 type（通常是 MIME 类型）和 blobParts 组成：

![pic_10](/blogs/frontend/frontend_4_pic_10.png#pic_center)

**Blob 构造函数的语法为：**

```javascript
const blob = new Blob(blobParts, options)
```

- blobParts：它是一个由 ArrayBuffer，ArrayBufferView，Blob，DOMString 等对象构成的数组。DOMStrings 会被编码为 UTF-8。
- options：一个可选的对象，包含以下两个属性：
  - type —— 默认值为 ""，它代表了将会被放入到 blob 中的数组内容的 MIME 类型。
  - endings —— 默认值为 "transparent"，用于指定包含行结束符 \n 的字符串如何被写入。它是以下两个值中的一个："native"，代表行结束符会被更改为适合宿主操作系统文件系统的换行符，或者 "transparent"，代表会保持 blob 中保存的结束符不变。

**示例一： 从字符串创建 Blob**

```javascript
let myBlobParts = ['<html><h2>Hello Semlinker</h2></html>']; // an array consisting of a single DOMString
let myBlob = new Blob(myBlobParts, {type : 'text/html', endings: "transparent"}); // the blob

console.log(myBlob.size + " bytes size");
// Output: 37 bytes size
console.log(myBlob.type + " is the type");
// Output: text/html is the type
```

**示例二：从类型化数组和字符串创建 Blob**

```javascript
let hello = new Uint8Array([72, 101, 108, 108, 111]); // 二进制格式的 "hello"
let blob = new Blob([hello, ' ', 'semlinker'], {type: 'text/plain'});
```

**Blob 方法：**
- slice([start[, end[, contentType]]])：返回一个新的 Blob 对象，包含了源 Blob 对象中指定范围内的数据。
- stream()：返回一个能读取 blob 内容的 ReadableStream。
- text()：返回一个 Promise 对象且包含 blob 所有内容的 UTF-8 格式的 USVString。
- arrayBuffer()：返回一个 Promise 对象且包含 blob 所有内容的二进制格式的 ArrayBuffer。

**Blob 对象是不可改变的。**我们不能直接在一个 Blob 中更改数据，但是我们可以对一个 Blob 进行分割，从其中创建新的 Blob 对象，将它们混合到一个新的 Blob 中。这种行为类似于 JavaScript 字符串：我们无法更改字符串中的字符，但可以创建新的更正后的字符串。

---

### ArrayBuffer 与 TypedArray

ArrayBuffer 对象用来表示「通用的、固定长度的」原始二进制数据缓冲区。「ArrayBuffer 不能直接操作，而是要通过类型数组对象 或 DataView 对象来操作」，它们会将缓冲区中的数据表示为特定的格式，并通过这些格式来读写缓冲区的内容。

**语法**
```javascript
new ArrayBuffer(length)
```
- 参数：length 表示要创建的 ArrayBuffer 的大小，单位为字节。
- 返回值：一个指定大小的 ArrayBuffer 对象，其内容被初始化为 0。
- 异常：如果 length 大于 Number.MAX_SAFE_INTEGER（>= 2 ** 53）或为负数，则抛出一个  RangeError  异常。

**示例**
下面的例子创建了一个 8 字节的缓冲区，并使用一个 Int32Array 来引用它：
```javascript
let buffer = new ArrayBuffer(8);
let view   = new Int32Array(buffer);
```

**Unit8Array**
Uint8Array 数组类型表示一个 8 位无符号整型数组，创建时内容被初始化为 0。创建完后，可以以**对象的方式或使用数组下标索引的方式**引用数组中的元素。

**语法**
```javascript
new Uint8Array(); // ES2017 最新语法
new Uint8Array(length); // 创建初始化为0的，包含length个元素的无符号整型数组
new Uint8Array(typedArray);
new Uint8Array(object);
new Uint8Array(buffer [, byteOffset [, length]]);
```

**示例**
```javascript
// new Uint8Array(length); 
var uint8 = new Uint8Array(2);
uint8[0] = 42;
console.log(uint8[0]); // 42
console.log(uint8.length); // 2
console.log(uint8.BYTES_PER_ELEMENT); // 1

// new TypedArray(object); 
var arr = new Uint8Array([21,31]);
console.log(arr[1]); // 31

// new Uint8Array(typedArray);
var x = new Uint8Array([21, 31]);
var y = new Uint8Array(x);
console.log(y[0]); // 21

// new Uint8Array(buffer [, byteOffset [, length]]);
var buffer = new ArrayBuffer(8);
var z = new Uint8Array(buffer, 1, 4);
```

**ArrayBuffer 与 TypedArray 之间的关系**

ArrayBuffer 本身只是一行 0 和 1 串。ArrayBuffer 不知道该数组中第一个元素和第二个元素之间的分隔位置。

```
010010111010000110...
```
为了提供上下文，实际上要将其分解为多个盒子，我们需要将其包装在所谓的视图中，可以使用类型数组添加这些数据视图，并且可以使用许多不同类型的类型数组。

例如，有一个 Int8 类型的数据，它可以把这个数据分为 8-bit 的字节数组。

![pic_11](/blogs/frontend/frontend_4_pic_11.png#pic_center)

或者你也可以有一个无符号 Int16 数组，它会把数组分成 16-bit 的字节数组，并且把它当作无符号整数来处理。

![pic_12](/blogs/frontend/frontend_4_pic_12.png#pic_center)

甚至可以在同一基本缓冲区上拥有多个视图。对于相同的操作，不同的视图会给出不同的结果。

例如，如果我们从这个 ArrayBuffer 的 Int8 视图中获取 0 & 1 元素的值（-19 & 100），它将给我们与 Uint16 视图中元素 0 （25837）不同的值，即使它们包含完全相同的位。

![pic_13](/blogs/frontend/frontend_4_pic_13.png#pic_center)


### Blob vs ArrayBuffer

**ArrayBuffer** 对象用于表示通用的，固定长度的原始二进制数据缓冲区。你不能直接操纵 ArrayBuffer 的内容，而是需要创建一个类型化数组对象或 DataView 对象，该对象以特定格式表示缓冲区，并使用该对象读取和写入缓冲区的内容。

**Blob** 类型的对象表示不可变的类似文件对象的原始数据。Blob 表示的不一定是 JavaScript 原生格式的数据。File 接口基于 Blob，继承了Blob 功能并将其扩展为支持用户系统上的文件。

**Blob 与 ArrayBuffer 的区别**
- 除非你需要使用 ArrayBuffer 提供的写入/编辑的能力，否则 Blob 格式可能是最好的。
- Blob 对象是不可变的，而 ArrayBuffer 是可以通过 TypedArrays 或 DataView 来操作。
- ArrayBuffer 是存在内存中的，可以直接操作。而 Blob 可以位于磁盘、高速缓存内存和其他不可用的位置。
- 虽然 Blob 可以直接作为参数传递给其他函数，比如 window.URL.createObjectURL()。但是，你可能仍需要 FileReader 之类的 File API 才能与 Blob 一起使用。
- Blob 与 ArrayBuffer 对象之间是可以相互转化的：
  - 使用 FileReader 的 readAsArrayBuffer() 方法，可以把 Blob 对象转换为 ArrayBuffer 对象；
  - 使用 Blob 构造函数，如 new Blob([new Uint8Array(data]);，可以把 ArrayBuffer 对象转换为 Blob 对象。

**转换过程示例**
1. Blob 转换为 ArrayBuffer
```javascript
var blob = new Blob(["\x01\x02\x03\x04"]),
  fileReader = new FileReader(),
  array;

fileReader.onload = function() {
  array = this.result;
  console.log("Array contains", array.byteLength, "bytes.");
};

fileReader.readAsArrayBuffer(blob);
```

2. ArrayBuffer 转 Blob
```javascript
var array = new Uint8Array([0x01, 0x02, 0x03, 0x04]);
var blob = new Blob([array]);
```
---
### DataView 与 ArrayBuffer

DataView 视图是一个可以从二进制 ArrayBuffer 对象中读写多种数值类型的底层接口，使用它时，不用考虑不同平台的字节序问题。

**DataView 构造函数**
```javascript
new DataView(buffer [, byteOffset [, byteLength]])
```
相关的参数说明如下：

- buffer：一个已经存在的 ArrayBuffer 或 SharedArrayBuffer 对象，DataView 对象的数据源。
- byteOffset（可选）：此 DataView 对象的第一个字节在 buffer 中的字节偏移。如果未指定，则默认从第一个字节开始。
- byteLength：此 DataView 对象的字节长度。如果未指定，这个视图的长度将匹配 buffer 的长度。

**DataView 返回值**

使用 new 调用 DataView 构造函数后，会返回一个表示指定数据缓存区的新 DataView 对象。你可以把返回的对象想象成一个二进制字节缓存区 array buffer 的 “解释器” —— 它知道如何在读取或写入时正确地转换字节码。这意味着它能在二进制层面处理整数与浮点转化、字节顺序等其他有关的细节问题。

**DataView 使用示例**
```javascript
const buffer = new ArrayBuffer(16);

// Create a couple of views
const view1 = new DataView(buffer);
const view2 = new DataView(buffer, 12, 4); //from byte 12 for the next 4 bytes
view1.setInt8(12, 42); // put 42 in slot 12

console.log(view2.getInt8(0)); // expected output: 42
```

**DataView 属性**
所有 DataView 实例都继承自 DataView.prototype，并且允许向 DataView 对象中添加额外属性。

- DataView.prototype.buffer（只读）：指向创建 DataView 时设定的 ArrayBuffer 对象；
- DataView.prototype.byteLength（只读）：表示 ArrayBuffer 或 SharedArrayBuffer 对象的字节长度；
- DataView.prototype.byteOffset（只读）：表示从 ArrayBuffer 读取时的偏移字节长度。

**DataView 方法**
DataView 对象提供了 getInt8()、getUint8()、setInt8() 和 setUint8() 等方法来操作数据。具体每个方法的使用，我们就不详细介绍。这里我们来看个简单的例子：
```javascript
const buffer = new ArrayBuffer(16);
const view = new DataView(buffer, 0);

view.setInt8(1, 68);
view.getInt8(1); // 68
```

![pic_14](/blogs/frontend/frontend_4_pic_14.png#pic_center)

---
### 图像灰度化

1. **getImageData 方法**
针对上述问题，我们可以利用 CanvasRenderingContext2D 提供的 getImageData 来获取图片像素数据，其中 getImageData() 返回一个 ImageData 对象，用来描述 canvas 区域隐含的像素数据，这个区域通过矩形表示，起始点为（sx, sy）、宽为 sw、高为 sh。其中 getImageData 方法的语法如下：

```javascript
ctx.getImageData(sx, sy, sw, sh);
```

相应的参数说明如下：
- sx：将要被提取的图像数据矩形区域的左上角 x 坐标。
- sy：将要被提取的图像数据矩形区域的左上角 y 坐标。
- sw：将要被提取的图像数据矩形区域的宽度。
- sh：将要被提取的图像数据矩形区域的高度。

2. **putImageData 方法**
在获取到图片的像素数据之后，我们就可以对获取的像素数据进行处理，比如进行灰度化或反色处理。当完成处理后，若要在页面上显示处理效果，则我们需要利用 CanvasRenderingContext2D 提供的另一个 API —— putImageData。

该 API 是 Canvas 2D API 将数据从已有的 ImageData 对象绘制到位图的方法。如果提供了一个绘制过的矩形，则只绘制该矩形的像素。此方法不受画布转换矩阵的影响。putImageData 方法的语法如下：

```javascript
void ctx.putImageData(imagedata, dx, dy);
void ctx.putImageData(imagedata, dx, dy, dirtyX, dirtyY, dirtyWidth, dirtyHeight);
```

相应的参数说明如下：

- imageData：ImageData ，包含像素值的数组对象。
- dx：源图像数据在目标画布中的位置偏移量（x 轴方向的偏移量）。
- dy：源图像数据在目标画布中的位置偏移量（y 轴方向的偏移量）。
- dirtyX（可选）：在源图像数据中，矩形区域左上角的位置。默认是整个图像数据的左上角（x 坐标）。
- dirtyY（可选）：在源图像数据中，矩形区域左上角的位置。默认是整个图像数据的左上角（y 坐标）。
- dirtyWidth（可选）：在源图像数据中，矩形区域的宽度。默认是图像数据的宽度。
- dirtyHeight（可选）：在源图像数据中，矩形区域的高度。默认是图像数据的高度。

3. **图片灰度化处理**
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>获取远程图片并灰度化</title>
  </head>
  <body>
    <h3>阿宝哥：获取远程图片并灰度化示例</h3>
    <div>
      <button id="grayscalebtn">灰度化</button>
      <div style="display: flex;">
        <div style="flex: 50%;">
          <p>预览容器</p>
          <img
            id="previewContainer"
            width="230"
            height="230"
            style="border: 2px dashed blue;"
          />
        </div>
        <div style="flex: 50%;">
          <p>Canvas容器</p>
          <canvas
            id="canvas"
            width="230"
            height="230"
            style="border: 2px dashed grey;"
          ></canvas>
        </div>
      </div>
    </div>
    <script>
      const image = document.querySelector("#previewContainer");
      const canvas = document.querySelector("#canvas");

      fetch("https://avatars3.githubusercontent.com/u/4220799")
        .then((response) => response.blob())
        .then((blob) => {
          const objectURL = URL.createObjectURL(blob);
          image.src = objectURL;
          image.onload = () => {
            draw();
          };
        });

      function draw() {
        const ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0, 230, 230);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        const grayscale = function () {
          for (let i = 0; i < data.length; i += 4) {
            const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
            data[i] = avg; // red
            data[i + 1] = avg; // green
            data[i + 2] = avg; // blue
          }
          ctx.putImageData(imageData, 0, 0);
        };
        const grayscalebtn = document.querySelector("#grayscalebtn");
        grayscalebtn.addEventListener("click", grayscale);
      }
    </script>
  </body>
</html>
```
---

### 图片压缩
在一些场合中，我们希望在上传本地图片时，先对图片进行一定的压缩，然后再提交到服务器，从而减少传输的数据量。在前端要实现图片压缩，我们可以利用 Canvas 对象提供的 toDataURL() 方法，该方法接收 type 和 encoderOptions 两个可选参数。

其中 type 表示图片格式，默认为 image/png。而 encoderOptions 用于表示图片的质量，在指定图片格式为 image/jpeg 或 image/webp 的情况下，可以从 0 到 1 的区间内选择图片的质量。如果超出取值范围，将会使用默认值 0.92，其他参数会被忽略。

```html
<button id="compressbtn">图片压缩</button>
<div style="display: flex;">
   <div style="flex: 33.3%;">
      <p>预览容器</p>
      <img id="previewContainer" width="230" height="230"
         style="border: 2px dashed blue;" />
   </div>
   <div style="flex: 33.3%;">
      <p>Canvas容器</p>
      <canvas id="canvas" width="230" height="230"
         style="border: 2px dashed grey;">
      </canvas>
   </div>
   <div style="flex: 33.3%;">
      <p>压缩预览容器</p>
      <img id="compressPrevContainer" width="230" height="230"
         style="border: 2px dashed green;" />
   </div>
</div>

<script>
   const compressbtn = document.querySelector("#compressbtn");
   const compressImage = document.querySelector("#compressPrevContainer");
   compressbtn.addEventListener("click", compress);
  
   function compress(quality = 80, mimeType = "image/webp") {
     const imageDataURL = canvas.toDataURL(mimeType, quality / 100);
     compressImage.src = imageDataURL;
   }
</script>
```

---
### 图片上传

在获取压缩后图片对应的 Data URL 数据之后，可以把该数据直接提交到服务器。针对这种情形，服务端需要做一些相关处理，才能正常保存上传的图片，这里以 Express 为例，具体处理代码如下：

```javascript
const app = require('express')();

app.post('/upload', function(req, res){
    let imgData = req.body.imgData; // 获取POST请求中的base64图片数据
    let base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
    let dataBuffer = Buffer.from(base64Data, 'base64');
    fs.writeFile("abao.png", dataBuffer, function(err) {
        if(err){
          res.send(err);
        }else{
          res.send("图片上传成功！");
        }
    });
});
```

然而对于返回的 Data URL 格式的图片数据一般都会比较大，为了进一步减少传输的数据量，我们可以把它转换为 Blob 对象：

```javascript
function dataUrlToBlob(base64, mimeType) {
  let bytes = window.atob(base64.split(",")[1]);
  let ab = new ArrayBuffer(bytes.length);
  let ia = new Uint8Array(ab);
  for (let i = 0; i < bytes.length; i++) {
    ia[i] = bytes.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeType });
}
```

在转换完成后，我们就可以压缩后的图片对应的 Blob 对象封装在 FormData 对象中，然后再通过 AJAX 提交到服务器上：
```javascript
function uploadFile(url, blob) {
  let formData = new FormData();
  let request = new XMLHttpRequest();
  formData.append("imgData", blob);
  request.open("POST", url, true);
  request.send(formData);
}
```