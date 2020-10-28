import { BLOG_ROOT } from './config'
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
  const filePath = path.resolve(__dirname, BLOG_ROOT)
  fileResolve(filePath)
  return paths
}
