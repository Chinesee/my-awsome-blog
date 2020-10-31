<template>
  <section class="introduction">
    <div class="avatar-bg xs:w-24 xs:h-24 md:w-32 md:h-32 mb-10 p-6 flex justify-center items-center rounded-full">
      <img
        alt="avatar"
        class="xs:w-16 md:w-20"
        src="~/assets/images/avatar.png"
      >
    </div>
    <p class="xs:text-lg md:text-2xl font-bold">
      Hi, I'm LeoKu 🖖
    </p>
    <p class="my-10 xs:text-2xl md:text-6xl font-extrabold">
      <span :class="{ 'point': !isMobile }">Good at</span> dreaming <br>
      Indulge in programming <br>
      Love to contribute
    </p>
    <p class="xs:text-base md:text-lg font-bold">
      A front-end developer by now <br>
      Trying various programming languages <br>
      Keep moving
    </p>

    <div
      style="width: 10rem; height: 3rem; border-radius: 1.5rem; line-height: 3rem;"
      class="mt-16 bg-gray-700 text-white rounded-lg cursor-pointer"
    >
      更多关于我
    </div>
    <div class="mt-5 flex items-center text-3xl">
      <a
        v-for="({ icon, link }) in [
          { icon: 'github', link:'https://github.com/Chinesee' },
          { icon: 'twitter', link:'https://twitter.com/Jack59846322' },
          { icon: 'codepen', link:'https://codepen.io/chinesee' },
        ]"
        :key="icon"
        :href="link"
        class="mx-2"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i
          class="bx"
          :class="[`bxl-${icon}`]"
        ></i>
      </a>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HomeIntroduction',

  computed: {
    isMobile() {
      return this.$store.state.isMobile
    },
  },
}
</script>

<style lang="scss" scoped>
.introduction {
  @apply flex flex-col justify-center items-center text-center;
  min-height: calc(100vh - #{$header-height});

  .avatar-bg {
    background-color: lighten($primary, 40%);
  }

  .point {
    @apply relative;
    &::after {
      @apply absolute;
      top: 15px;
      left: -25px;
      z-index: -1;
      content: url(~assets/images/underscore.png);
    }
  }
}
</style>
