<template>
  <div class="nav-links">
    <div
      v-if="isMenuCollapse"
      @click="showMenu()"
    >
      <i class="toggle-btn bx bx-menu-alt-right text-3xl"></i>
    </div>

    <ul
      class="menu"
      :class="[
        isMenuCollapse ? 'is-collapse' : '',
        isMenuCollapseShow ? 'show' : 'hide',
      ]"
    >
      <li
        v-for="({ link, text }) in nav"
        :key="text"
        class="menu-item hover:primary"
      >
        <nuxt-link
          v-if="!isExternal(link)"
          class="py-2"
          :class="{ 'primary': link === $route.path }"
          :to="link"
        >
          {{ text }}
        </nuxt-link>
        <a
          v-else
          class="py-2"
          rel="noopener noreferrer"
          target="_blank"
          :href="link"
        >{{ text }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
import { isExternal } from '~/utils'

export default {
  data: () => ({
    nav: [
      { text: 'About', link: '/about' },
      { text: 'Blog', link: '/articles' },
      { text: 'Projects', link: '/creations' },
      { text: 'GitHub', link: 'https://github.com/chinesee' },
    ],
    isMenuCollapseShow: false,
  }),

  computed: {
    isMenuCollapse() {
      return this.$store.state.isMenuCollapse
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

    isExternal(link) {
      return isExternal(link)
    },
  },
}
</script>

<style lang="scss" scoped>
.nav-links {
  @apply relative;

  .menu {
    @apply relative z-50 flex text-gray-700 select-none;

    .menu-item {
      @apply text-center transition whitespace-no-wrap;
      width: $menu-item-width;
    }
  }

  .menu.is-collapse {
    @apply absolute top-0 right-0 px-2 py-1 flex-col items-center bg-white overflow-hidden;
    z-index: 999;
    border-radius: $md-radius;
    box-shadow: $base-shadow;
    transition: 0.2s;
    .menu-item {
      @apply py-1;
    }
    &.show {
      top: 0;
      visibility: visible;
      opacity: 1;
    }
    &.hide {
      top: -10px;
      visibility: hidden;
      opacity: 0;
    }
  }
}
</style>
