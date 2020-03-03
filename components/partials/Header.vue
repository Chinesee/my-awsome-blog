<template>
  <div
    class="header"
    style="opacity: 0.92;"
    :class="{'is-hidden': isHeaderHidden, 'px-6 justify-end': !isHeaderHidden}"
  >
    <img
      class="w-12 absolute left-0  transition cursor-pointer"
      :class="isHeaderHidden ? 'ml-4' : 'ml-6'"
      src="~/assets/images/logo.png"
      alt="LOGO"
      @click="$router.push('/')"
    >
    <ul
      class="menu"
      :class="{'is-hidden': isHeaderHidden}"
    >
      <nuxt-link
        v-for="({ route, text }, i) in nav"
        :key="i"
        :to="route"
        tag="li"
        class="menu-item hover:primary"
        :class="{'primary': route === $route.path}"
      >
        {{ text }}
      </nuxt-link>
      <li class="menu-item hover:primary">
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

  &.is-hidden {
    @apply px-2 justify-center;
    width: 5rem;
    border-radius: $radius;
  }

  .menu {
    @apply flex text-gray-700;
    &.is-hidden {
      @apply hidden;
    }

    .menu-item {
      @apply mr-6 cursor-pointer transition;
    }
  }
}
</style>
