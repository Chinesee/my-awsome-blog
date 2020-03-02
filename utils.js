import MarkdownIt from 'markdown-it'
import MarkdownItPrism from 'markdown-it-prism'
const fs = require('fs')
const path = require('path')

export function generatePath() {
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
  const filePath = path.resolve(__dirname, 'contents')
  fileResolve(filePath)
  return paths
}

export function markdownRenderer() {
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

  return md
}
