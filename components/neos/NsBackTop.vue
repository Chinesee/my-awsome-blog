<template>
  <div
    ref="backTop"
    class="ns-back-top"
    :class="{ 'show': isBackTopShow }"
    :style="backTopStyle"
    @click="$emit('scroll-top')"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'NsBackTop',

  props: {
    right: {
      type: String,
      default: '4%',
    },
    bottom: {
      type: String,
      default: '5%',
    },

    visibleOffset: {
      type: String,
      default: '500',
    },
  },

  computed: {
    isBackTopShow() {
      return this.$store.state.isBackTopShow
    },

    backTopStyle() {
      return {
        right: this.right,
        bottom: this.bottom,
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.ns-back-top {
  @apply fixed;
  opacity: 0;
  transition: $transition;

  &.show {
    opacity: 1;
  }
}
</style>
