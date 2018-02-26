# 技术栈
 + ES6 + Webpack + Sass + Nodejs + Express + Babel + Cors + Request

# 实现功能
 + 移动 web 端模仿 QQ 音乐，采用原生 JS 实现推荐页、排行榜页和搜索页
 + 数据通过伪造请求获取 QQ 音乐的数据，实现推荐页、排行榜页和搜索页的同步,以及获取歌曲歌词
 + 歌词解析 - 正则 歌词转义
 + 分析接口 - 伪造请求 request request-promise fetch
 + 播放器页面显示可以进行播放、暂停、循环播放以及歌词同步高亮显示
 + 采用模块化的思想实现: Tab组件、推荐页组件、排行榜组件、搜索组件、播放器组件、歌词组件和进度条组件
 + 图片加载采用 lazyload，对于滚动优化使用 throttle 函数或 IntersectionObserver

# 安装
1. 将项目克隆到本地
`git clone git@github.com:silvia-YQY/QQ-music.git`

2. 启动本地后台服务器
`npm start`
3. 启动项目
`npm run server`

**备注：** server.js 的服务器端口为4000，当前端进行数据获取时存在跨域，因此引入 CORS 解决跨域问题。

# 其他
若要修改项目内容，可在当前目录下运行以下命令
```
npm run dist
```
该命令操作
1. 编译Sass：Css；
`mkdir dist && sass --style compressed ./sass/app.scss:./dist/app.css`

2. CSS自动化前缀（autoprefixer）
`autoprefixer-cli -o ./dist/app.css  ./dist/app.css`

3. 以及打包压缩JS文件
`webpack -p`
