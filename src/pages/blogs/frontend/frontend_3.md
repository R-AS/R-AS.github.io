---
title: 'MediaSession'
date: '2020-07-21'
thumbnail: 'javascript/index.png'
type: 'frontend'
---
### Table of Contents
```toc
```
---
## 简介
Media Session API提供了一种自定义媒体通知的方法。它通过提供元数据以供Web应用程序正在播放的媒体的用户代理显示来实现此目的，并允许您创建事件处理程序，为用户代理回放控件定义自己的行为。**其目的是允许用户知道正在播放的内容并对其进行控制，而无需打开启动该页面的特定页面。**

Media Session API 的 MediaSession 接口允许页面为标准媒体交互提供自定义行为。

在 Chrome 最新版本中的媒体控制菜单就可通过 MediaSession 来实现，如下图：

![pic_1](/blogs/frontend/frontend_3_pic_1.png#pic_center)

1. 属性：
    - MediaSession.metadata： 指向一个 MediaMetadata 的实例,其包含富媒体的元数据. 该数据将用于平台显示.
    - MediaSession.playbackState： 展示当前mediasession是否处于播放状态. 有效值为"none", "paused",  "playing".

2. 方法：
    - MediaSession.setActionHandler()： 设置一个监听mediasession动作(如 play 或者 pause)的事件句柄. 浏览方法页以获取所有动作的列表.
3. 示例：

  下面的例子创建了一个新的 media session, 并且给其绑定了一些动作句柄:

  ```javascript
    if ('mediaSession' in navigator){
      navigator.mediaSession.metadata = new MediaMetadata({
        title: "Podcast Episode Title",
        artist: "Podcast Host",
        album: "Podcast Name",
        artwork: [{src: "podcast.jpg"}]
      });
      navigator.mediaSession.setActionHandler('play', function() {});
      navigator.mediaSession.setActionHandler('pause', function() {});
      navigator.mediaSession.setActionHandler('seekbackward', function() {});
      navigator.mediaSession.setActionHandler('seekforward', function() {});
      navigator.mediaSession.setActionHandler('previoustrack', function() {});
      navigator.mediaSession.setActionHandler('nexttrack', function() {});
    }
  ```
  下面例子为暂停和播放设置了时间句柄:

  ```javascript
    var audio = document.querySelector("#player");
    audio.src = "song.mp3";

    navigator.mediaSession.setActionHandler('play', play);
    navigator.mediaSession.setActionHandler('pause', pause);

    function play() {
      audio.play();
      navigator.mediaSession.playbackState = "playing";
    }

    function pause() {
      audio.pause();
      navigator.mediaSession.playbackState = "Paused";
    }
  ```

---
## 实现 Chrome 媒体控制菜单

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="//cdn.jsdelivr.net/bootstrap/3.3.6/css/bootstrap.min.css"/>
  <title>Document</title>
  <style type="text/css">
    html {
      font-family: sans-serif;
      -ms-text-size-adjust: 100%;
      -webkit-text-size-adjust: 100%;
      font-size: 62.5%;
      -webkit-tap-highlight-color: transparent;
    }
    body {
      font-family: 'Helvetica Neue', '\5FAE\8F6F\96C5\9ED1', '\9ED1\4F53', sans-serif;
      letter-spacing: .01rem;
      font-size: 15px;
      line-height: 1.75em;
      color: #3A4145;
      -webkit-font-feature-settings: 'kern'1;
      -moz-font-feature-settings: 'kern'1;
      -o-font-feature-settings: 'kern'1;
    }
    h1 {
      padding-top: 40px;
      text-align: center;
    }
    .main {
      max-width: 720px;
      margin: 80px auto;
      text-align: center;
    }
    .main video {
      max-width: 100%;
      height: auto;
    }
</style>

  
<script src="https://lib.baomitu.com/jquery/3.4.1/jquery.min.js"></script>
</head>
<body>
  <div class="main">
    <video controls poster="https://img1.wxzxzj.com/vpc-example-cover-your-name-c.png" src="https://media.vued.vanthink.cn/sparkle_your_name_am360p.mp4"></video>
  </div>
</body>
<script type="text/javascript">
  const mediaList = [
    {
      src: 'https://media.vued.vanthink.cn/CJ7%20-%20Trailer.mp4',
      cover: 'https://img1.wxzxzj.com/vpc-example-cover-CJ7-c.jpg',
      title: '长江七号-周星驰导演作品，关于外星人的童话故事',
    },
    {
      src: 'https://media.vued.vanthink.cn/sparkle_your_name_am360p.mp4',
      cover: 'https://img1.wxzxzj.com/vpc-example-cover-your-name-c.png',
      title: '你的名字-新海诚导演作品，穿越彼此的身体，遇见不可思议',
    },
    {
      src: 'https://media.vued.vanthink.cn/the_garden_of_words_trailer_english__1080p.mp4',
      cover: 'https://img1.wxzxzj.com/vpc-example-cover-the-garden-c.jpg',
      title: '言叶之庭-新海诚导演作品，下雨天静谧的动静也有唯美的相遇',
    },
  ]

  $(function() {
    const $video = document.querySelector('video')
    let index = 1

    function playNext() {
      index = index === 2 ? 0 : index + 1
      setMediaSession(index)
      $video.src = mediaList[index].src
      $video.play()
    }

    function playPrev() {
      index = index === 0 ? 2 : index - 1
      setMediaSession(index)
      $video.src = mediaList[index].src
      $video.play()
    }

    initMediaSession()

    function setMediaSession(index) {
      if ('mediaSession' in navigator) {
        const data = mediaList[index]
        navigator.mediaSession.metadata = new MediaMetadata({
          title: data.title,
          artist: data.director,
          artwork: [
            { src: data.cover, sizes: '192x192' },
          ],
        })
      }
    }

    function initMediaSession() {
      if ('mediaSession' in navigator) {
        const ms = navigator.mediaSession
        setMediaSession(index)

        ms.setActionHandler('play', function() {
          $video.play()
        })

        ms.setActionHandler('nexttrack', function() {
          playNext()
        })

        ms.setActionHandler('previoustrack', function() {
          playPrev()
        })
      }
    }
  })
</script>
</html>
```

效果如下：

![pic_2](/blogs/frontend/frontend_3_pic_2.gif#pic_center)

---
参考自：
- [https://developer.mozilla.org/zh-CN/docs/Web/API/MediaSession](https://developer.mozilla.org/zh-CN/docs/Web/API/MediaSession)
- [https://mp.weixin.qq.com/s?__biz=MjM5MTA1MjAxMQ==&mid=2651238215&idx=1&sn=8737856499f6f65f389a119d595727e5&chksm=bd4976c38a3effd5ec9e58be8e0ebcc8a635e6ffbb5b2724e6235c2b217b701f4b81b67be65d&mpshare=1&scene=1&srcid=0721k4k727KA9bE9DrnT1AjC&sharer_sharetime=1595291404895&sharer_shareid=b9a271b67b2f2091410af5c978d6974d#rd](https://mp.weixin.qq.com/s?__biz=MjM5MTA1MjAxMQ==&mid=2651238215&idx=1&sn=8737856499f6f65f389a119d595727e5&chksm=bd4976c38a3effd5ec9e58be8e0ebcc8a635e6ffbb5b2724e6235c2b217b701f4b81b67be65d&mpshare=1&scene=1&srcid=0721k4k727KA9bE9DrnT1AjC&sharer_sharetime=1595291404895&sharer_shareid=b9a271b67b2f2091410af5c978d6974d#rd)