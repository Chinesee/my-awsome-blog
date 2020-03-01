<template>
  <div class="header px-6 py-2 flex items-center justify-between">
    <img
      class="w-12"
      src="~/assets/images/logo.png"
      alt="LOGO"
    >
    <ul class="flex text-gray-700">
      <nuxt-link
        v-for="(it, i) in nav"
        :key="i"
        :to="it.route"
        tag="li"
        class="mr-5 cursor-pointer transition hover:primary"
      >
        {{ it.text }}
      </nuxt-link>
    </ul>
  </div>
</template>

<script>
export default {
  data: () => ({
    nav: [
      { text: '文章', route: '/articles' },
      { text: '作品', route: '' },
    ],
  }),
}
</script>

<style lang="scss" scoped>
.header {
  box-shadow: 0 0 25px 15px rgba(var(--ns-primary), 0.05);
}
</style>
