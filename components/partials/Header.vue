<template>
  <div
    class="header"
    style="opacity: 0.92;"
    :class="{'is-hidden': !isHeaderShow, 'px-6 justify-end': isHeaderShow}"
    @mouseenter="onHeaderShow"
    @mouseleave="onHeaderHide"
  >
    <!-- 博客 Logo -->
    <img
      alt="LOGO"
      class="w-12 absolute left-0  transition cursor-pointer"
      src="~/assets/images/logo.png"
      :class="isHeaderShow ? 'ml-6' : 'ml-4'"
      @click="$router.push('/')"
    >

    <!-- 菜单项 -->
    <ul
      class="menu"
      :class="[isHeaderShow ? '' : 'is-hidden', activeMenuItemClass]"
    >
      <li
        v-for="({ route, text, href }, i) in nav"
        :key="i"
        class="menu-item hover:primary"
      >
        <nuxt-link
          v-if="route"
          class="menu-item hover:primary"
          :class="{'primary': route === $route.path}"
          :to="route"
        >
          {{ text }}
        </nuxt-link>
        <a
          v-else-if="href"
          target="_blank"
          :href="href"
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
    isMouseHover: false, // 菜单栏收起时，控制鼠标悬浮展开菜单栏
  }),

  computed: {
    isHeaderShow() {
      return this.$store.state.isHeaderShow || this.isMouseHover
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
            this.activeMenuItemClass = 'none-active'
            return false
          }
        })
      },
      immediate: true,
    },
  },

  methods: {
    onHeaderShow() {
      if (!this.isHeaderShow) {
        this.isMouseHover = true
      }
    },

    onHeaderHide() {
      if (this.isHeaderShow) {
        setTimeout(() => {
          this.isMouseHover = false
        }, 400)
      }
    },

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
    @apply relative flex text-gray-700 select-none;
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

      &.none-active {
        &::after {
          display: none;
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
