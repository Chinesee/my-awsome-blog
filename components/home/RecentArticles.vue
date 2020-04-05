<template>
  <div class="py-2 sm:px-4 md:px-10 lg:px-16 xl:px-24">
    <ul>
      <li
        v-for="({title, time, description}, i) in articles"
        :key="i"
        class="mb-8"
      >
        <p class="mb-2">
          <span class="mr-4 text-xl font-bold">{{ title }}</span>
          <span class="text-sm text-gray-400">{{ time }}</span>
        </p>
        <p class="text-sm text-gray-500">{{ description }}</p>
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
