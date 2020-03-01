<template>
  <div class="default relative h-full">
    <Header
      class="absolute z-50 w-full bg-white"
      style="opacity: 0.92;"
    />
    <VuePerfectScrollbar
      class="h-full pt-16"
      :settings="{
        maxScrollbarLength: 160,
        wheelSpeed: 0.60,
      }"
    >
      <nuxt />
      <Footer />
    </VuePerfectScrollbar>
  </div>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import Header from '~/components/partials/Header.vue'
import Footer from '~/components/partials/Footer.vue'

export default {
  components: { Header, Footer, VuePerfectScrollbar },
}
</script>

<style lang="scss" scoped>
.scroll-area {
  @apply overflow-hidden;
  height: calc(100%);
}
</style>
