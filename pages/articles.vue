<template>
  <div class="p-5 sm:p-8 md:p-10">
    <ul class="sm:w-full">
      <li
        class="article-item"
        v-for="({ path, cover,title, description, time }, i) in articles"
        :key="i"
      >
        <div class="w-1/3 mr-20">
          <img
            class="w-full h-full object-cover shadow-light"
            alt="文章封面"
            :src="cover"
          >
        </div>
        <div class="w-1/3">
          <nuxt-link
            tag="li"
            class="w-full cursor-pointer"
            :to="routeTo(path)"
          >
            <h2
              class="mb-1 text-xl font-bold truncate"
              style="letter-spacing: 0.1rem;"
            >
              {{ title }}
            </h2>
          </nuxt-link>
          <p class="mt-4 mb-5 text-gray-600 truncate text-sm">{{ description }}</p>
          <p class="text-gray-500 text-sm">—— {{ time }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
// import Prismic from 'prismic-javascript'
// import PrismicDom from 'prismic-dom'
// import PrismicConfig from '~/prismic.config.js'

import head from '~/mixins/head'

export default {
  mixins: [head({ title: '文章' })],

  asyncData() {
    // const api = await Prismic.getApi(PrismicConfig.apiEndpoint)
    // const results = await api.query(
    //   Prismic.Predicates.at('document.type', 'blog-post'),
    // )
    // console.log(results)

    const resolve = require.context('~/contents/', true, /\.md$/)
    const articles = resolve
      .keys()
      .reduce((res, key) => {
        const { attributes: { cover, title, description, time, status }, meta: { resourcePath } } = resolve(key)
        const paths = resourcePath.split('\\')
        const path = paths
          .slice(paths.indexOf(`${process.env.blogRoot}`) + 1)
          .join('/')
          .replace('.md', '')
        if (status !== 0) {
          res.push({ cover, path, title, description, time })
        }
        return res
      }, [])
    return { articles }
  },

  methods: {
    routeTo(path) {
      return {
        name: 'blog-slug',
        params: { slug: path },
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.article-item {
  @apply w-full mb-6 p-10 flex items-center justify-center;
  max-width: 1400px;
  margin: 0 auto;
  // border-bottom: 1px solid #eee;
}
</style>
