import MarkdownIt from 'markdown-it'

export default function markdownRenderer() {
  const md = new MarkdownIt({ html: true })

  const defaultRender = md.renderer.rules.link_open || function (tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options)
  }

  // 设置 a 标签 target=_blank
  md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
    const aIndex = tokens[idx].attrIndex('target')

    if (aIndex < 0) {
      tokens[idx].attrPush(['target', '_blank'])
    } else {
      tokens[idx].attrs[aIndex][1] = '_blank'
    }

    return defaultRender(tokens, idx, options, env, self)
  }

  md
    .use(require('markdown-it-highlight-lines')) // 代码行高亮
    .use(require('markdown-it-prism')) // 代码高亮
    .use(require('markdown-it-abbr')) // 添加标注
    .use(require('markdown-it-image-lazy-loading')) // 图片懒加载

  md.render('![](example.png "image title")')

  return md
}
