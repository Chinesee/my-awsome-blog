<template>
  <div id="default-layout">
    <header class="header">
      <app-header />
    </header>

    <main class="content">
      <nuxt />
    </main>

    <footer class="footer">
      <app-footer />
    </footer>

    <ns-back-top
      style="z-index: 999;"
      visible-offset="500"
      @scroll-top="onScrollTop"
    >
      <div class="w-12 h-12 flex flex-col justify-center items-center shadow-lg rounded-full cursor-pointer">
        <i class="bx bx-up-arrow-alt mt-1 text-2xl"></i>
      </div>
    </ns-back-top>
  </div>
</template>

<script>
import _debounce from 'lodash.debounce'
import { SCROLL_TOP, RESIZE_DELAY, SCROLL_DELAY, CLIENT_WIDTH } from '~/config'

import AppHeader from '~/components/layout/AppHeader.vue'
import AppFooter from '~/components/layout/AppFooter.vue'

export default {
  components: { AppHeader, AppFooter },

  data: () => ({
  }),

  mounted() {
    console.log('%c用自己的方式发布热爱的事物 \n—— LeoKu', 'font-size: 18px; color: #4a5568;')

    this.onResize()

    window.addEventListener('resize', _debounce(this.onResize, RESIZE_DELAY))
    window.addEventListener('scroll', _debounce(this.onScroll, SCROLL_DELAY))
  },

  methods: {
    // 回到顶部
    onScrollTop() {
      document.documentElement.scrollTop = 0
    },

    // 控制回到顶部按钮
    onScroll() {
      if (document.documentElement.scrollTop > SCROLL_TOP) {
        this.$store.commit('SET_BACK_TOP_STATUS', true)
      } else {
        this.$store.commit('SET_BACK_TOP_STATUS', false)
      }
    },

    onResize() {
      if (document.body.clientWidth < CLIENT_WIDTH) {
        this.$store.commit('SET_DEVICES', true)
        this.$store.commit('SET_HEADER_MENU_STATUS', true)
      } else {
        this.$store.commit('SET_DEVICES', false)
        this.$store.commit('SET_HEADER_MENU_STATUS', false)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
