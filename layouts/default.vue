<template>
  <div
    id="default-layout"
    :class="{'full-screen': isFullScreen}"
  >
    <div id="layout-container">
      <Header class="absolute z-50 top-0 left-0" />

      <div
        ref="scrollArea"
        class="scroll-area"
      >
        <nuxt />

        <Footer />

        <ns-back-top
          visible-offset="500"
          @scrollTop="onScrollTop"
        >
          <ns-button>
            <img
              class="text-white"
              src="~/assets/icons/arrow-up.svg"
            >
          </ns-button>
        </ns-back-top>
      </div>
    </div>
  </div>
</template>

<script>
import _debounce from 'lodash.debounce'

import Header from '~/components/partials/Header.vue'
import Footer from '~/components/partials/Footer.vue'

export default {
  components: { Header, Footer },

  data: () => ({
  }),

  computed: {
    isFullScreen() {
      return this.$route.name !== 'index'
    },
  },

  mounted() {
    this.onResize()
    window.addEventListener('resize', _debounce(this.onResize, 300))
    this.$refs.scrollArea.addEventListener('scroll', _debounce(this.onScroll, 300))
  },

  methods: {
    // 回到顶部
    onScrollTop() {
      const scrollDelay = setTimeout(this.onScrollTop, 10)
      this.$refs.scrollArea.scrollTop -= 150
      if (this.$refs.scrollArea.scrollTop <= 0) {
        clearTimeout(scrollDelay)
      }
    },

    // 控制头部菜单栏的展开和收起
    onScroll({ target: { scrollTop } }) {
      if (scrollTop > 800) {
        this.$store.commit('SET_BACK_TOP_STATUS', true)
        this.$store.commit('SET_HEADER_STATUS', false)
      } else {
        this.$store.commit('SET_BACK_TOP_STATUS', false)
        this.$store.commit('SET_HEADER_STATUS', true)
      }
    },

    onResize() {
      if (document.body.clientWidth < 400) {
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
  overflow: overlay;
}
</style>
