import Mode from 'frontmatter-markdown-loader/mode'
import { markdownRenderer, generatePath } from './utils'
import { BLOG_ROOT } from './config/config'
const path = require('path')
console.log(process.env.DEPLOY_ENV === 'GITEE_PAGES')

export default {
  mode: 'spa',

  head: {
    htmlAttrs: { lang: 'cmn-Hans-CN' },
    title: '纪念碑谷 - 令狐聪的个人空间',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
      { hid: 'keywords', name: 'keywords', content: '令狐少侠,个人博客,nuxt blog,blog' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
    script: [
      { src: 'https://cdn.bootcdn.net/ajax/libs/jquery/3.5.0/jquery.min.js' },
    ],
  },

  router: {
    base: process.env.DEPLOY_ENV === 'GITEE_PAGES' ? '/blog-nuxt/' : '/',
  },

  loading: { color: '#2f58ff' },

  css: [
    '@/assets/css/main.scss',
    '@/assets/css/layout.scss',
    '@/assets/hightlight/common.scss',
    '@/assets/hightlight/prism-custom.css',
  ],

  purgeCSS: { enabled: false },

  plugins: [
    '~/plugins/neos',
  ],

  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss',
  ],

  modules: [
    '@nuxtjs/style-resources',
    '@nuxtjs/google-analytics',
  ],

  styleResources: {
    scss: [
      '@/assets/css/variables.scss',
    ],
  },

  googleAnalytics: {
    id: 'UA-165410828-1',
  },

  build: {
    extend(config, ctx) {
      config.module.rules.push({
        test: /\.md$/,
        include: path.resolve(__dirname, BLOG_ROOT),
        loader: 'frontmatter-markdown-loader',
        options: {
          mode: [Mode.VUE_COMPONENT, Mode.META],
          markdownIt: markdownRenderer(),
        },
      })
    },
  },

  env: {
    blogRoot: BLOG_ROOT, // 博客文章存放的根路径
  },

  generate: {
    routes: generatePath(),
  },
}
