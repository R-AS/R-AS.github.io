---
title: 'TCP 三次握手、四次挥手'
date: '2022-10-12'
thumbnail: 'web/index.png'
type: '计算机基础'
---
```toc
```
---

#### 三次握手

建立一个 TCP 连接，客户端与服务器交互需要 3 个数据包。握手的主要作用就是为了确认双方的接收和发送能力是否正常，初始序列号、交换窗口大小以及 MSS 等信息。

![pic_1](/blogs/interview-计算机基础/web_2_pic_1.png#pic_center)

1. 第一次握手，客户端发送 <font color=#f0764c>SYN</font> 报文，并进入 <font color=#f0764c>SYN_SENT</font> 状态，等待服务器的确认。
2. 第二次握手，服务器收到 <font color=#f0764c>SYN</font> 报文，需要给客户端发送 <font color=#f0764c>ACK</font> 确认报文，同时服务器也要向客户端发送一个 <font color=#f0764c>SYN</font> 报文，所以也就是向客户端发送 <font color=#f0764c>SYN + ACK</font> 报文，此时服务器进入 <font color=#f0764c>SYN_RCVD</font> 状态。
3. 第三次握手，客户端收到 <font color=#f0764c>SYN + ACK</font> 报文，向服务器发送确认包，客户端进入 <font color=#f0764c>ESTABLISHED</font> 状态。待服务器收到客户端发送的 <font color=#f0764c>ACK</font> 包也会进入 <font color=#f0764c>ESTABLISHED</font> 状态，完成三次握手。

---

#### 四次挥手

![pic_1](/blogs/interview-计算机基础/web_2_pic_2.png#pic_center)

1. 第一次挥手，客户端发起 <font color=#f0764c>FIN</font>包（FIN = 1），客户端进入 <font color=#f0764c>FIN_WAIT_1</font> 状态。
2. 第二次挥手，服务器收到 <font color=#f0764c>FIN</font> 包，发出确认包 <font color=#f0764c>ACK</font>（ack = u + 1），并带上自己的序号 seq=v，服务器进入 <font color=#f0764c>CLOSE_WAIT</font> 状态。这个时候客户端已经没有数据要发送了，不过服务器端有数据发送端话，客户端依然需要接收。客户端接收到服务器端发送端 <font color=#f0764c>ACK</font> 后，进入 <font color=#f0764c>FIN_WAIT_2</font> 状态。
3. 第三次挥手，服务器端数据发送完毕后，向客户端发送 <font color=#f0764c>FIN</font> 包（seq=w, ack=u+1），半连接状态下服务器可能又发送了一些数据，假设发送 seq 为 w。服务器此时进入了 <font color=#f0764c>LAST_ACK</font> 状态。
4. 第四次挥手，客户端收到服务器的 <font color=#f0764c>FIN</font> 包后，发出确认包（ACK=1，ack=w+1）,此时客户端就进入了 <font color=#f0764c>TIME_WAIT</font> 状态。注意此时 TCP 连接还没有释放，必须经过 <font color=#f0764c>2*MSL</font> 后，才进入 <font color=#f0764c>CLOSED</font> 状态。而服务器端收到客户端的确认包 <font color=#f0764c>ACK</font> 后就进入了 <font color=#f0764c>CLOSED</font> 状态，可以看出服务器端结束 TCP 连接的时间要比客户端早一些。