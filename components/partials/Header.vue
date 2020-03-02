<template>
  <div
    class="header"
    style="opacity: 0.92;"
    :class="{'px-2 flex justify-center radius': isHeaderHidden, 'px-6 justify-between': !isHeaderHidden}"
    :style="isHeaderHidden ? 'width: 5rem': 'opacity: 0.92'"
  >
    <img
      class="w-12 cursor-pointer"
      src="~/assets/images/logo.png"
      alt="LOGO"
      @click="$router.push('/')"
    >
    <ul
      class="flex text-gray-700"
      :class="{'hidden': isHeaderHidden}"
    >
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

  computed: {
    isHeaderHidden() {
      return this.$store.state.isHeaderHidden
    },
  },
}
</script>

<style lang="scss" scoped>
.header {
  @apply w-full h-16 flex items-center bg-white overflow-hidden;
  line-height: 4rem;
  transition: $transition;
  box-shadow: 0 0 25px 15px rgba(var(--ns-primary), 0.05);

  .li-item {
    @apply mr-6 cursor-pointer transition;
  }
}
</style>
