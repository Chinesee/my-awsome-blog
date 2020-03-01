import fs from 'fs'
import Mode from 'frontmatter-markdown-loader/mode'
import MarkdownIt from 'markdown-it'
import MarkdownItPrism from 'markdown-it-prism'
const path = require('path')

const generatePath = () => {
  path.resolve(__dirname, 'contents')
  return fs.readdirSync(path.resolve(__dirname, 'contents')).map(key => {
    const arr = key.split('.')
    const name = arr[arr.indexOf('/') + 1]
    return `/blog/${name}`
  })
}

export default {
  mode: 'spa',

  head: {
    htmlAttrs: { lang: 'cmn-Hans-CN' },
    title: '令狐少侠的个人空间',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
  },

  loading: { color: '#41B883' },

  css: [
    '@/assets/css/main.scss',
    '@/assets/hightlight/common.scss',
    '@/assets/hightlight/prism-nord.css',
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
          markdownIt: MarkdownIt({ html: true }).use(MarkdownItPrism),
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
