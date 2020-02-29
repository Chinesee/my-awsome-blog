<template>
  <div>
    <nuxt-link
      v-for="(blog, i) in blogs"
      :key="i"
      :to="getLink(blog)"
    >
      首页
    </nuxt-link>
    <!-- <div
      v-for="
      (blog,
      i)
      in
      blogs"
      @click="getLink(blog)"
    >
      123
    </nuxt-link>
  </div> -->
  </div>
</template>

<script>
export default {
  props: {
    blogs: { type: Array, required: true },
  },

  methods: {
    getLink({ meta }) {
      const paths = meta.resourcePath.split('\\')
      const index = paths.indexOf(process.env.blogRoot)
      const path = paths.slice(index + 1).join('/')
      return {
        name: 'blog-slug',
        params: { path },
      }
    },
  },
}
</script>
