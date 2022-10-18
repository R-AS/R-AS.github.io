- 八股文：https://juejin.cn/post/7016593221815910408
- 进阶：https://daijl.cn/39558/

项目需要了解的点：
- 喜茶
  - 小程序如何缩包（独立分包、分包预加载）
  >【分包异步化】例如我的页，把页面内容封装成一个自定义组件，放于分包，我的页使用该组件，减少包体积。设置占位组件，在分包还没加载出来进行替代，使得页面自然。
  > 商详也是同样做法。
  > 独立分包可以独立于主包和其他分包运行，从独立分包中页面进入小程序时，不需要下载主包。而从普通分包或主包内进入页面时，主包才会被下载。【项目中没用到】
  > 分包预加载，指定进入某个页面，由框架自动预下载可能要的分包，提升进入后续分包页面时的启动速度。【与锁包无关】

  - 首页预加载点单页 + loading 图缓存
  > 在首页挂载的时候，更具定位请求附近门店，如果没定位这请求默认门店。这样首次进入点单页时就能立刻进行页面的展示，再进行请求，刷新菜单。
  > loading 图缓存，避免请求 loading 图到渲染中间的白屏时间

  - Git 规范化（husky, commit lint）
  > husky 为 git hooks，可以在每次触发 git 命令时执行
  > pre commit 的时候，执行 lint-staged，lint-staged 只检查暂存区的代码
  > lint-staged 指定对哪些文件进行检查，进行 eslint 检查，prettier 进行简单对修复
  > commit 时执行 commitlint.config.js，检查 commit 规范

  - 小程序自动部署（gitlab, docker）
    1. inquirer 获得 CI/本地 打包，分支，平台
    2. CI 部署：
      - 走 ci.js，执行 triggerPipeline，带上打包的平台及分支，请求 trigger/pipeline 接口
      - 执行 gitlab-ci.yml 的 job, build-wechat-miniapp
      - job build-wechat-miniapp 设置变量（环境等）
      - 执行 build-mini-weapp.sh，进行 taro 打包，打包后压缩成 zip 上传七牛云
      - 如果需要预览，运行 generate_preview.js
      - 应用 miniprogram-ci 进行预览，二维码放至 dist 目录下，将二维码上传至七牛云
      - 钉钉通知，返回包地址以及预览码
    3. 本地打包：
      - 执行 build-mini-weapp.sh，进行 taro 打包，打包后压缩成 zip 上传七牛云
      - 如果需要预览，运行 generate_preview.js
      - 应用 miniprogram-ci 进行预览，二维码放至 dist 目录下
      - 利用 qrcode-terminal 将二维码绘制于终端
    4. 上传代码：
      - 选择平台，输入版本
      - 走 ci.js，执行 triggerUploadMiniApp 设置版本变量，执行 triggerPipeline，请求 trigger/pipeline 接口
      - 执行 gitlab-ci.yml 的 job, upload-wechat-miniapp
      - job upload-wechat-miniapp 设置变量（环境、平台等）
      - 执行 upload-miniapp.sh，进行 taro 打包，打包后压缩成 zip 上传七牛云
      - 运行 uploadMiniApp.js，利用 miniprogram-ci 进行代码上传，并生成预览图
      - 钉钉通知上传成功
  - 字体脚本
    1. DOM 埋入 style={{ fontFamily: xxx }}
    2. font 目录下放入字体源包
    3. 执行脚本，截取该 DOM 下的文字，写入 json 中去重
    4. 利用 Fontmin 提取字体包
    5. 将字体包上传至七牛云，并在根样式文件声明字体

  - 会员公共配置
    1. 将会员标签、主题色、活动氛围图提取出来，抽成公共模块
    2. 每当活动需要修改时可快速定位，进行换肤

  - 小程序公告通知
    1. cheerio 抓取微信小程序公告第一页的帖子标题及连接
    2. 每次请求在 json 中过滤去重，得出新公告
    3. gitlab 配置定时任务，以及缓存
    4. 每天 10 点定时执行，如果有更新则通知钉钉群

- saas
  - 第三方平台调研
  - saas 基本流程
  - 封装组件，css variables 实现 UI 统一管理
  - CI 构建与脚本完善

- 专题活动管理后台


---
项目中遇到的难点：