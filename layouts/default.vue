<template>
  <div class="default relative h-full">
    <Header class="absolute z-50 top-0 left-0" />

    <div
      ref="scrollArea"
      class="pt-16 h-full overflow-y-scroll"
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

  mounted() {
    this.$refs.scrollArea.addEventListener('scroll', this.scrollY)
  },

  methods: {
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
  @apply overflow-hidden;
  height: calc(100%);
}
</style>
