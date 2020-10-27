<template>
  <div
    class="app-header"
    :class="[{ 'is-hidden': !isHeaderShow }, isMobile ? 'px-4' : 'px-10']"
  >
    <!-- Logo -->
    <div
      class="mr-auto cursor-pointer"
      @click="$router.push('/')"
    >
      <!-- <p class="text-lg font-bold">LeoKu's &nbsp;blog</p> -->
      <img
        alt="logo"
        class="w-12"
        src="~/assets/images/logo.png"
      >
    </div>

    <!-- 菜单项 -->
    <div class="relative">
      <div
        v-if="isMenuCollapse"
        @click="showMenu()"
      >
        <i class="toggle-btn bx bx-menu-alt-right text-3xl"></i>
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
      { text: 'About', route: '/about' },
      // { text: '笔记', route: '/notes' },
      { text: 'Blog', route: '/articles' },
      { text: 'Projects', route: '/creations' },
      // { text: '项目仓库', href: 'https://gitee.com/chinesee' },
    ],
    activeClass: '',
    isMenuCollapseShow: false,
    whiteList: ['index', 'articles', 'creations'], // 白名单内的页面菜单不收起
    isMouseHover: false, // 菜单栏收起时，控制鼠标悬浮展开菜单栏
  }),

  computed: {
    isMobile() {
      return this.$store.state.isMobile
    },

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
    showMenu() {
      this.isMenuCollapseShow = !this.isMenuCollapseShow
    },
  },
}
</script>

<style lang="scss" scoped>
.app-header {
  @apply w-full h-full flex items-center;
  transition: $transition;
  background-color: hsla(0, 0%, 100%, 0.8);
  backdrop-filter: saturate(180%) blur(5px);

  &.is-hidden {
    transform: translateY(-100%);
  }

  .menu {
    @apply relative z-50 flex text-gray-700 select-none;
    &.is-hidden {
    }

    .menu-item {
      @apply text-center cursor-pointer transition whitespace-no-wrap;
      width: $menu-item-width;
    }
  }
}

.menu.is-collapse {
  @apply absolute top-0 right-0 z-50 w-32 flex-col items-center bg-white overflow-hidden;
  margin-top: $header-height - 0.5rem;
  border-radius: $md-radius;
  box-shadow: $base-shadow;
  &.show {
    animation: menuShow 0.2s ease-out forwards;
  }
  &.hide {
    animation: menuHide 0.2s ease-out forwards;
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
