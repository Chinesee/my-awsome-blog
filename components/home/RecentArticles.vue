<template>
  <div class="py-2 xs:p-3 sm:px-4 md:px-10 lg:px-16 xl:px-24">
    <ul>
      <nuxt-link
        v-for="({title, time, description, path}, i) in articles"
        :key="i"
        class="mb-16"
        :to="routeTo(path)"
        tag="li"
      >
        <p class="mb-2">
          <span class="title mr-4 text-2xl font-bold transition cursor-pointer">{{ title }}</span>
          <span class="text-sm text-gray-400">{{ time }}</span>
        </p>
        <p class="text-gray-500">{{ description }}</p>
      </nuxt-link>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    articles: {
      type: Array,
      default: () => ([]),
    },
  },

  data: () => ({
  }),

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
</style>
