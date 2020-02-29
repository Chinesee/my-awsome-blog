<template>
  <div>
    <div>
      <BlogSection :blogs="blogs" />
    </div>
  </div>
</template>

<script>
import BlogSection from '~/components/blog/BlogSection.vue'

export default {
  components: { BlogSection },

  asyncData() {
    const resolve = require.context('~/contents/', true, /\.md$/)
    const blogs = resolve.keys().map(key => {
      const { attributes, meta } = resolve(key)
      return { attributes, meta }
    })

    return { blogs }
  },
}
</script>

<style>
</style>
