import Mode from 'frontmatter-markdown-loader/mode'
import { markdownRenderer, generatePath } from './utils.js'
const path = require('path')

export default {
  mode: 'spa',

  head: {
    htmlAttrs: { lang: 'cmn-Hans-CN' },
    title: '纪念碑谷 - 令狐聪的个人空间',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
      { hid: 'keywords', name: 'keywords', content: '令狐少侠, 博客, nuxt blog, blog' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
  },

  loading: { color: '#2f58ff' },

  css: [
    '@/assets/css/main.scss',
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
  ],

  styleResources: {
    scss: [
      '@/assets/resource/variables.scss',
    ],
  },

  build: {
    extend(config, ctx) {
      config.module.rules.push({
        test: /\.md$/,
        include: path.resolve(__dirname, 'contents'),
        loader: 'frontmatter-markdown-loader',
        options: {
          mode: [Mode.VUE_COMPONENT, Mode.META],
          markdownIt: markdownRenderer(),
        },
      })
    },
  },
  env: {
    blogRoot: 'contents',
  },
  generate: {
    routes: generatePath(),
  },
}
