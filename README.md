# 令狐少侠的博客

> 使用 Nuxt.js 构建 [Nuxt.js docs](https://nuxtjs.org)

## 在线访问

[码云 Pages](https://chinesee.gitee.io/blog-nuxt/)  
[Netlify](https://hrspider.netlify.app/)

## 项目运行

``` bash
# 安装依赖
$ yarn install

# 启动项目
$ yarn serve

# 构建项目
$ yarn build
$ yarn start
```

## 文章格式

字段 | 描述
---- | ---
title | 标题
time | 发布事件
category | 分类
description | 摘要或描述
cover | 封面图
type | 类型，可选值为 ['original', 'translate', 'reprint']
from | 文章来源
from_url | 文章源地址
author | 作者昵称
last_edited_time | 最后编辑时间

## 如何部署至 GitHub Pages？

```sh
# 生成静态页面
yarn generate:gh-pages
# 部署到 Github Pages
yarn deploy
```

## 自定义域名

解析域名，添加 `@` 和 `www` 记录，解析到 `<你的GitHub账号名>.github.io`

## 启用 Https

申请证书，等待部署成功

[详情](https://zh.nuxtjs.org/faq/github-pages)