<template>
  <div id="default-layout">
    <div id="layout-container">
      <app-header />

      <div
        ref="scrollArea"
        class="scroll-area"
      >
        <nuxt />

        <app-footer />

        <ns-back-top
          style="z-index: 999;"
          visible-offset="500"
          @scroll-top="onScrollTop"
        >
          <div class="w-12 h-12 flex flex-col justify-center items-center shadow-lg rounded-full cursor-pointer">
            <i class="bx bx-up-arrow-alt text-2xl"></i>
          </div>
        </ns-back-top>
      </div>
    </div>
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

  watch: {
    $route() {
      // 跳转到新路由是滚动到顶部
      this.$refs.scrollArea.scrollTop = 0
    },
  },

  mounted() {
    console.log('用自己的方式发布热爱的事物')

    this.onResize()
    window.addEventListener('resize', _debounce(this.onResize, RESIZE_DELAY))
    this.$refs.scrollArea.addEventListener('scroll', _debounce(this.onScroll, SCROLL_DELAY))
  },

  methods: {
    // 回到顶部
    onScrollTop() {
      this.$refs.scrollArea.scrollTop = 0
    },

    // 控制头部菜单栏的展开和收起
    onScroll({ target: { scrollTop } }) {
      if (scrollTop > SCROLL_TOP) {
        this.$store.commit('SET_BACK_TOP_STATUS', true)
        this.$store.commit('SET_HEADER_STATUS', false)
      } else {
        this.$store.commit('SET_BACK_TOP_STATUS', false)
        this.$store.commit('SET_HEADER_STATUS', true)
      }
    },

    onResize() {
      if (document.body.clientWidth < CLIENT_WIDTH) {
        this.$store.commit('SET_HEADER_MENU_STATUS', true)
      } else {
        this.$store.commit('SET_HEADER_MENU_STATUS', false)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.scroll-area {
  @apply pt-16 h-full overflow-y-scroll;
  scroll-behavior: smooth; // 暂仅支持 Chrome, Edge, Firefox
  overflow: overlay;
}
</style>
