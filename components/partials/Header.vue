<template>
  <div class="header px-6 py-2 flex items-center justify-between">
    <img
      class="w-12 cursor-pointer"
      src="~/assets/images/logo.png"
      alt="LOGO"
      @click="$router.push('/')"
    >
    <ul class="flex text-gray-700">
      <nuxt-link
        v-for="({ route, text }, i) in nav"
        :key="i"
        :to="route"
        tag="li"
        class="li-item hover:primary"
        :class="{'primary': route === $route.path}"
      >
        {{ text }}
      </nuxt-link>
      <li class="li-item hover:primary">
        <a
          href="https://gitee.com/chinesee"
          target="_blank"
        >项目仓库</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data: () => ({
    nav: [
      { text: '文章', route: '/articles' },
      { text: '作品', route: '/creations' },
    ],
  }),
}
</script>

<style lang="scss" scoped>
.header {
  box-shadow: 0 0 25px 15px rgba(var(--ns-primary), 0.05);

  .li-item {
    @apply mr-5 cursor-pointer transition;
  }
}
</style>
