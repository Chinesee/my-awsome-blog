<template>
  <div class="p-5 sm:p-8 md:p-10">
    <ul>
      <nuxt-link
        v-for="({ path, title, description }, i) in articles"
        :key="i"
        :to="routeTo(path)"
        tag="li"
        class="mb-6 p-5 radius base-shadow cursor-pointer"
      >
        <h2 class=" text-xl">{{ title }}</h2>
        <small>{{ description }}</small>
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
      const path = paths.slice(paths.indexOf(`${process.env.blogRoot}`) + 1).join('/')
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
