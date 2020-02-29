---
name: 'README'
title: Bacon Ipsum
year: 28 May 2019
id: 'bacon-ipsum'
description: |
  Bacon ipsum dolor amet spare ribs ham t-bone buffalo prosciutto, frankfurter bresaola short ribs cupim ground round filet mignon shoulder pork chuck strip steak.
---

# 意想课表

> 华软教务系统信息查询小程序

## 提交符号
🚀 代码优化 ⚡️ 性能优化 🏆 新增功能 🎨 样式调整 🔧 修改配置 🛠️ 修复BUG
🎉 发布版本 ⛔️ 删除文件 ✅ 添加文件 🔔 更新通知 ⚠️ 警告通知 ✔️ 临时提交

更多符号请看：[符号大全](https://twemoji.maxcdn.com/2/test/preview.html)


## 界面展示
<div align="center">
<img src="https://gitee.com/chinesee/images/raw/master/img/img_004.jpg" width="22%" style="margin:0 10px;" alt="首页" >
<img src="https://gitee.com/chinesee/images/raw/master/img/img_005.jpg" width="22%" style="margin:0 10px;" alt="课表页" >
<img src="https://gitee.com/chinesee/images/raw/master/img/img_006.jpg" width="22%" style="margin:0 10px;" alt="个人中心页" >
<img src="https://gitee.com/chinesee/images/raw/master/img/img_007.jpg" width="22%" style="margin:0 10px;" alt="登录页" >
</div>



## 项目运行
``` bash
# 安装依赖
yarn 或 npm install

# 开发时构建
npm run dev

# 打包构建
npm run build

# 指定平台的开发时构建(微信、百度、头条、支付宝)
npm run dev:wx
npm run dev:swan
npm run dev:tt
npm run dev:my

# 指定平台的打包构建
npm run build:wx
npm run build:swan
npm run build:tt
npm run build:my

# 生成 bundle 分析报告
npm run build --report
```

```javascript
import blogsEn from '~/contents/en/blogsEn.js'
import blogsEs from '~/contents/es/blogsEs.js'

async asyncData ({app}) {
  const blogs = app.i18n.locale === 'en' ? blogsEn : blogsEs
  
  async function asyncImport (blogName) {
    const wholeMD = await import(`~/content/${app.i18n.locale}/blog/${blogName}.md`)
    return wholeMD.attributes
  }

  return Promise.all(blogs.map(blog => asyncImport(blog)))
  .then((res) => {
    return {
      blogs: res
    }
  })
}
```
```css
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Hello world</title>
  <link href='http://fonts.googleapis.com/css?family=Roboto:400,400italic,700,700italic' rel='stylesheet' type='text/css'>
  <link rel="stylesheet" href="index.css" />
</head>
<body>
  <div id="app"></div>
  <script src="//cdnjs.cloudflare.com/ajax/libs/less.js/2.5.1/less.min.js"></script>
  <script src="vendor/prism.js"></script>
  <script src="examples.bundle.js"></script>
</body>
</html>
```
123`Redcarpet.new("Hello World!")`