import fs from 'fs'
import Mode from 'frontmatter-markdown-loader/mode'
import MarkdownIt from 'markdown-it'
import MarkdownItPrism from 'markdown-it-prism'
const path = require('path')

// 生成静态路由文件
const paths = []
function fileResolve(filePath) {
  const files = fs.readdirSync(filePath)
  files.forEach(fileName => {
    const fileDir = path.join(filePath, fileName)
    const stats = fs.statSync(fileDir)
    const isDir = stats.isDirectory()
    if (isDir) {
      fileResolve(fileDir)
    } else {
      const name = `/blog/${path.basename(fileDir).replace('.md', '')}`
      paths.push(name)
    }
  })
}
const generatePath = () => {
  const filePath = path.resolve(__dirname, 'contents')
  fileResolve(filePath)
  return paths
}

const md = MarkdownIt({ html: true })

const defaultRender = md.renderer.rules.link_open || function (tokens, idx, options, env, self) {
  return self.renderToken(tokens, idx, options)
}

// markdown 设置 a 标签 target=_blank
md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
  const aIndex = tokens[idx].attrIndex('target')

  if (aIndex < 0) {
    tokens[idx].attrPush(['target', '_blank'])
  } else {
    tokens[idx].attrs[aIndex][1] = '_blank'
  }

  return defaultRender(tokens, idx, options, env, self)
}
// markdown 设置代码高亮
md.use(MarkdownItPrism)

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
          // markdownIt: MarkdownIt({ html: true }).use(MarkdownItPrism),
          markdownIt: md,
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
