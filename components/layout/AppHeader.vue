<template>
  <div
    class="app-header"
    :class="[isMobile ? 'px-4' : 'px-10']"
  >
    <!-- Logo -->
    <div
      class="mr-auto flex items-center cursor-pointer"
      @click="$router.push('/')"
    >
      <img
        alt="logo"
        class="w-10 md:w-12 mr-4"
        src="~/assets/images/logo.png"
      >
      <p class="text-lg md:text-2xl font-bold">LeoKu</p>
    </div>

    <!-- 导航菜单 -->
    <nav-links />
  </div>
</template>

<script>
import NavLinks from '~/components/NavLinks'

export default {
  components: { NavLinks },

  computed: {
    isMobile() {
      return this.$store.state.isMobile
    },
  },
}
</script>

<style lang="scss" scoped>
.app-header {
  @apply w-full h-full flex items-center;
  background-color: hsla(0, 0%, 100%, 0.8);
  backdrop-filter: saturate(180%) blur(5px);
}
</style>
