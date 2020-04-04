<template>
  <div class="default relative h-full">
    <Header class="absolute z-50 top-0 left-0" />

    <div
      ref="scrollArea"
      class="scroll-area"
    >
      <nuxt />

      <Footer />
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
          this.$store.commit('SET_HEADER_STATUS', true)
        } else {
          this.$store.commit('SET_HEADER_STATUS', false)
        }
      }, 300)
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
