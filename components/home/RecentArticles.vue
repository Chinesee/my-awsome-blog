<template>
  <div class="py-2 sm:px-4 md:px-10 lg:px-16 xl:px-24">
    <ul>
      <li
        v-for="({title, time, description}, i) in articles"
        :key="i"
        class="mb-16"
      >
        <p class="mb-2">
          <span class="title mr-4 text-2xl font-bold transition cursor-pointer">{{ title }}</span>
          <span class="text-sm text-gray-400">{{ time }}</span>
        </p>
        <p class="text-gray-500">{{ description }}</p>
      </li>
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
}
</script>

<style lang="scss" scoped>
.title {
  &:hover {
    color: setColor(primary, 0.9);
  }
}
</style>
