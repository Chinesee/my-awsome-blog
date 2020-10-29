<template>
  <div class="p-5 sm:p-8 md:p-10">
    <ul class="sm:w-full">
      <li
        class="article-item"
        v-for="({ path, title, description, time }, i) in articles"
        :key="i"
      >
        <div class="">
          <nuxt-link
            tag="li"
            class="w-full cursor-pointer"
            :to="routeTo(path)"
          >
            <h2
              class="mb-1 text-3xl font-bold truncate"
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
import head from '~/mixins/head'

export default {
  mixins: [head({ title: '文章' })],

  asyncData() {
    const resolve = require.context('~/contents/', true, /\.md$/)
    const articles = resolve
      .keys()
      .reduce((res, key) => {
        const { attributes: { title, description, time, status }, meta: { resourcePath } } = resolve(key)
        const paths = resourcePath.split('\\')
        const path = paths
          .slice(paths.indexOf(`${process.env.blogRoot}`) + 1)
          .join('/')
          .replace('.md', '')

        if (status !== 0) {
          const timestamp = new Date(time.replace(/[(年)|(月)|(日)]/g, '/')).getTime()
          res.push({ path, title, description, time, timestamp })
        }
        return res
      }, [])

    articles.sort((a, b) => {
      return a.timestamp > b.timestamp ? -1 : 1
    })
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
  @apply w-full mb-6 p-10;
  max-width: 1400px;
  margin: 0 auto;
}
</style>
