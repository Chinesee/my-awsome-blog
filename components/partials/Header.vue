<template>
  <div
    class="header"
    style="opacity: 0.92;"
    :class="{'is-hidden': isHeaderHidden, 'px-6 justify-end': !isHeaderHidden}"
  >
    <!-- 博客 Logo -->
    <img
      class="w-12 absolute left-0  transition cursor-pointer"
      :class="isHeaderHidden ? 'ml-4' : 'ml-6'"
      src="~/assets/images/logo.png"
      alt="LOGO"
      @click="$router.push('/')"
    >

    <!-- 菜单项 -->
    <ul
      class="menu select-none"
      :class="[isHeaderHidden ? 'is-hidden' : '', activeMenuItemClass]"
    >
      <li
        v-for="({ route, text, href }, i) in nav"
        :key="i"
        class="menu-item hover:primary"
      >
        <nuxt-link
          v-if="route"
          :to="route"
          class="menu-item hover:primary"
          :class="{'primary': route === $route.path}"
        >
          {{ text }}
        </nuxt-link>
        <a
          v-else-if="href"
          :href="href"
          target="_blank"
        >{{ text }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data: () => ({
    activeMenuItemClass: '',
    nav: [
      { text: '笔记', route: '/notes' },
      { text: '文章', route: '/articles' },
      { text: '作品', route: '/creations' },
      { text: '项目仓库', href: 'https://gitee.com/chinesee' },
    ],
  }),

  computed: {
    isHeaderHidden() {
      return this.$store.state.isHeaderHidden
    },
  },

  watch: {
    '$route.path': {
      handler(path) {
        this.nav.some((el, i) => {
          if (el.route === this.$route.path) {
            this.activeMenuItemClass = `active-${i}`
            return true
          } else {
            this.activeMenuItemClass = ''
            return false
          }
        })
      },
      immediate: true,
    },
  },

  methods: {
    // setActiveClass(route, i) {
    //   if (route === this.$route.path) {

    //   }
    //   if (this.$route.path === 'index') {
    //     this.activeMenuItemClass = 'active'
    //   }
    // },
  },
}
</script>

<style lang="scss" scoped>
.header {
  @apply w-full h-16 flex items-center bg-white overflow-hidden;
  height: $header-height;
  line-height: $header-height;
  transition: $transition;
  box-shadow: 0 0 25px 15px rgba(var(--ns-primary), 0.05);

  &.is-hidden {
    @apply px-2 justify-center;
    width: 5rem;
    border-radius: $lg-radius;
  }

  .menu {
    @apply relative flex text-gray-700;
    &.is-hidden {
      @apply hidden;
    }

    @each $i in 0, 1, 2 {
      &.active-#{$i} {
        &::after {
          opacity: 1;
          left: $menu-item-width * $i;
        }
      }
    }

    &::after {
      @apply absolute bottom-0 mb-2 opacity-0;
      content: "";
      width: $menu-item-width / 2;
      height: 0.25rem;
      border-radius: 1.5rem;
      background: setColor(primary, 0.9);
      transform: translateX(50%);
      transition: $transition;
    }

    .menu-item {
      @apply text-center cursor-pointer transition whitespace-no-wrap;
      width: $menu-item-width;
      a {
        display: block;
      }
    }
  }
}
</style>
