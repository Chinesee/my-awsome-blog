<template>
  <div>
    <nuxt-link
      v-for="(blog, i) in blogs"
      :key="i"
      class="mr-10"
      :to="`/blog/${blog.attributes.name}`"
    >
      {{ blog.attributes.name }}
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    blogs: { type: Array, required: true },
  },

  methods: {
    getLink({ attributes }) {
      return {
        name: 'blog-slug',
        params: { slug: attributes.name },
      }
    },
  },
}
</script>
