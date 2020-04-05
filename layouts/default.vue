<template>
  <div class="default relative h-full">
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
</template>

<script>
import Header from '~/components/partials/Header.vue'
import Footer from '~/components/partials/Footer.vue'

export default {
  components: { Header, Footer },

  data: () => ({
    timer: null,
  }),

  watch: {
    '$route.name': {
      handler(routeName) {
        if (routeName === 'index') {
          document.getElementById('__nuxt').classList.remove('full-screen')
        } else {
          document.getElementById('__nuxt').classList.add('full-screen')
        }
      },
      immediate: true,
    },
  },

  mounted() {
    this.$refs.scrollArea.addEventListener('scroll', this.scrollY)
  },

  methods: {
    // 控制头部菜单栏的展开和收起
    scrollY({ target: { scrollTop } }) {
      if (typeof this.timer === 'number') {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        if (scrollTop > 800) {
          this.$store.commit('SET_BACK_TOP_STATUS', true)
          this.$store.commit('SET_HEADER_STATUS', false)
        } else {
          this.$store.commit('SET_BACK_TOP_STATUS', false)
          this.$store.commit('SET_HEADER_STATUS', true)
        }
      }, 300)
    },

    // 回到顶部
    onScrollTop() {
      const scrollDelay = setTimeout(this.onScrollTop, 10)

      this.$refs.scrollArea.scrollTop -= 150

      if (this.$refs.scrollArea.scrollTop <= 0) {
        clearTimeout(scrollDelay)
      }
    },
  },

  head: {
    title: process.env.npm_package_description,
  },
}
</script>

<style lang="scss" scoped>
.scroll-area {
  @apply pt-16 h-full overflow-y-scroll;
  overflow: overlay;
}
</style>
