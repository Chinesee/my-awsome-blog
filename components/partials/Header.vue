<template>
  <div
    class="header"
    :class="{'is-hidden': !isHeaderShow, 'px-6 justify-end': isHeaderShow}"
    @mouseenter="onHeaderShow"
    @mouseleave="onHeaderHide"
  >
    <!-- 博客 Logo -->
    <img
      alt="LOGO"
      class="w-12 absolute left-0 z-50 transition cursor-pointer"
      src="~/assets/images/logo.png"
      :class="isHeaderShow ? 'ml-6' : 'ml-4'"
      @click="$router.push('/')"
    >

    <!-- 菜单项 -->
    <div class="relative">
      <div
        v-if="isMenuCollapse"
        @click="showMenu()"
      >
        <img
          class="toggle-btn"
          src="~/assets/icons/menu.svg"
        >
      </div>

      <ul
        class="menu"
        :class="[
          isHeaderShow ? '' : 'is-hidden',
          isMenuCollapse ? 'is-collapse' : '',
          isMenuCollapseShow ? 'show' : 'hide',
          activeClass,
        ]"
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
            rel="noopener noreferrer"
            target="_blank"
            :href="href"
          >{{ text }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    nav: [
      { text: '笔记', route: '/notes' },
      { text: '文章', route: '/articles' },
      { text: '作品', route: '/creations' },
      { text: '项目仓库', href: 'https://gitee.com/chinesee' },
    ],
    activeClass: '',
    isMenuCollapseShow: false,
    whiteList: ['index', 'articles', 'creations'], // 白名单内的页面菜单不收起
    isMouseHover: false, // 菜单栏收起时，控制鼠标悬浮展开菜单栏
  }),

  computed: {
    isHeaderShow() {
      return this.$store.state.isHeaderShow || this.isMouseHover || this.whiteList.includes(this.$route.name)
    },

    isMenuCollapse() {
      return this.$store.state.isMenuCollapse
    },
  },

  watch: {
    '$route.path': {
      handler(path) {
        // 控制导航菜单的激活状态
        for (const [i, v] of this.nav.entries()) {
          if (v.route === path) {
            this.activeClass = `active-${i}`
            return true
          } else {
            this.activeClass = 'none-active'
          }
        }
      },
      immediate: true,
    },
  },

  mounted() {
    window.onclick = ({ target }) => {
      if (!target.matches('.toggle-btn')) {
        this.isMenuCollapseShow = false
      }
    }
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

    showMenu() {
      this.isMenuCollapseShow = !this.isMenuCollapseShow
    },
  },
}
</script>

<style lang="scss" scoped>
.header {
  @apply absolute top-0 left-0 w-full h-16 flex items-center bg-white;
  z-index: 999999;
  height: $header-height;
  line-height: $header-height;
  transition: $transition;
  box-shadow: 0 0 25px 15px rgba(var(--ns-primary), 0.05);
  background-color: hsla(0, 0%, 100%, 0.8);
  backdrop-filter: saturate(180%) blur(5px);

  &.is-hidden {
    @apply px-2 justify-center bg-white;
    width: 5rem;
    border-radius: 0 0 $lg-radius 0;
  }

  .menu {
    @apply relative z-50 flex text-gray-700 select-none overflow-hidden;
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
      z-index: 999999;
      width: 2.5em;
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

.menu.is-collapse {
  @apply absolute top-0 right-0 z-50 w-32 flex-col items-center bg-white;
  margin-top: $header-height - 0.5rem;
  border-radius: $md-radius;
  box-shadow: $base-shadow;
  &.show {
    animation: menuShow 0.3s ease-out forwards;
  }
  &.hide {
    animation: menuHide 0.3s ease-out forwards;
  }
  @keyframes menuShow {
    from {
      max-height: 0;
      opacity: 0;
    }
    to {
      max-height: 400px;
      opacity: 1;
    }
  }
  @keyframes menuHide {
    from {
      max-height: 400px;
      opacity: 1;
    }
    to {
      max-height: 0;
      opacity: 0;
    }
  }
  &::after {
    display: none;
  }
}
</style>
