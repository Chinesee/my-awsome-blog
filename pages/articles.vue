<template>
  <div class="p-5 sm:p-8 md:p-10">
    <ul class="sm:w-full md:w-1/2">
      <nuxt-link
        v-for="({ path, title, description }, i) in articles"
        :key="i"
        :to="routeTo(path)"
        tag="li"
        class="mb-6 p-6 radius bg-gray-100 cursor-pointer w-full"
      >
        <h2 class="mb-1 text-xl truncate">{{ title }}</h2>
        <p class="text-gray-600 truncate text-sm">{{ description }}</p>
      </nuxt-link>
    </ul>
  </div>
</template>

<script>
export default {
  asyncData() {
    const resolve = require.context('~/contents/', true, /\.md$/)
    const articles = resolve.keys().map(key => {
      const { attributes: { title, description }, meta: { resourcePath } } = resolve(key)
      const paths = resourcePath.split('\\')
      const path = paths.slice(paths.indexOf(`${process.env.blogRoot}`) + 1).join('/').replace('.md', '')
      return { path, title, description }
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
